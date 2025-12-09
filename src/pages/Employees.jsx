import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: "",
    employee_type: "SALARY",
    title: "",
    department_id: "",
    office_id: ""
  });

  // Load employees on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/employees", form);
      setForm({
        name: "",
        employee_type: "SALARY",
        title: "",
        department_id: "",
        office_id: ""
      });
      fetchEmployees();
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  const deactivateEmployee = async (id) => {
    try {
      await api.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">👥 Employees</h1>
        <p className="text-slate-600">Manage and view all employee information</p>
      </div>

      {/* CREATE FORM */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Add New Employee</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Employment Type *</label>
              <select
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                value={form.employee_type}
                onChange={(e) => setForm({...form, employee_type: e.target.value})}
              >
                <option value="SALARY">Salaried</option>
                <option value="HOURLY">Hourly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Job Title</label>
              <input
                type="text"
                placeholder="Software Engineer"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Department ID</label>
              <input
                type="number"
                placeholder="e.g., 1"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={form.department_id}
                onChange={(e) => setForm({...form, department_id: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Office ID</label>
              <input
                type="number"
                placeholder="e.g., 1"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={form.office_id}
                onChange={(e) => setForm({...form, office_id: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 active:scale-95"
          >
            + Add Employee
          </button>
        </form>
      </div>

      {/* EMPLOYEE TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Employee Directory</h2>
          <p className="text-slate-600 text-sm mt-1">{employees.length} total employee{employees.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Department</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Office</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {employees.map((emp) => (
                <tr key={emp.employee_id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-900 font-medium">#{emp.employee_id}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">{emp.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${emp.employee_type === 'SALARY' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                      {emp.employee_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{emp.title || '-'}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{emp.department_name || '-'}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{emp.office_number || '-'}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${emp.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {emp.is_active ? '● Active' : '● Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => deactivateEmployee(emp.employee_id)}
                      className="px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm"
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {employees.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-slate-500 text-lg">No employees found. Create your first employee above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
