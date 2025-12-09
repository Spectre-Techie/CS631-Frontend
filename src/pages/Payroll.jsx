import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Payroll() {
  const [payrolls, setPayrolls] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    gross: "",
    period: ""
  });

  const fetchPayroll = async () => {
    try {
      const res = await api.get("/payroll");
      setPayrolls(res.data);
    } catch (error) {
      console.error("Error fetching payroll:", error);
    }
  };

  useEffect(() => {
    fetchPayroll();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/payroll/run", form);

      setForm({
        employee_id: "",
        gross: "",
        period: ""
      });

      fetchPayroll();
    } catch (error) {
      console.error("Error submitting payroll:", error);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2">💰 Payroll Management</h1>
        <p className="text-sm sm:text-base text-slate-600">Process and manage employee payroll with automatic tax calculations</p>
      </div>

      {/* CREATE PAYROLL FORM */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Run Payroll</h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Employee ID *</label>
              <input
                type="number"
                placeholder="e.g., 1"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                value={form.employee_id}
                onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Gross Salary *</label>
              <input
                type="number"
                placeholder="e.g., 5000"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                value={form.gross}
                onChange={(e) => setForm({ ...form, gross: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Period *</label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                value={form.period}
                onChange={(e) => setForm({ ...form, period: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Tax Breakdown:</span> Federal 10% | State 5% | Other 3% | Net = Gross - Total Tax
            </p>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 active:scale-95"
          >
            ✓ Submit Payroll
          </button>
        </form>
      </div>

      {/* PAYROLL TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8 border-b border-slate-200">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Payroll History</h2>
          <p className="text-slate-600 text-sm mt-1">{payrolls.length} payroll record{payrolls.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Employee</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Gross</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Federal Tax</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">State Tax</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Other Tax</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Net Pay</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Period</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {payrolls.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{p.employee_name}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">${Number(p.gross).toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">${Number(p.federal_tax).toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">${Number(p.state_tax).toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">${Number(p.other_tax).toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">${Number(p.net).toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{p.period?.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {payrolls.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-slate-500 text-lg">No payroll records found. Submit your first payroll above.</p>
            </div>
          )}
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden divide-y divide-slate-200">
          {payrolls.map((p) => (
            <div key={p.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-slate-900">{p.employee_name}</p>
                  <p className="text-sm text-slate-500">{p.period?.slice(0, 10)}</p>
                </div>
                <span className="text-sm font-semibold text-green-600">${Number(p.net).toFixed(2)} net</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-slate-500">Gross:</span>
                  <span className="ml-1 font-semibold text-slate-900">${Number(p.gross).toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-slate-500">Federal:</span>
                  <span className="ml-1 text-slate-900">${Number(p.federal_tax).toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-slate-500">State:</span>
                  <span className="ml-1 text-slate-900">${Number(p.state_tax).toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-slate-500">Other:</span>
                  <span className="ml-1 text-slate-900">${Number(p.other_tax).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}

          {payrolls.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-slate-500">No payroll records found. Submit your first payroll above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
