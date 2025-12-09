import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    project_number: "",
    name: "",
    budget: "",
    start_date: "",
    end_date: "",
    manager_id: ""
  });
  const [assign, setAssign] = useState({
  project_id: "",
  employee_id: "",
  role: "",
  hours: "",
  start_date: "",
  end_date: ""
});

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/projects", form);

      setForm({
        project_number: "",
        name: "",
        budget: "",
        start_date: "",
        end_date: "",
        manager_id: ""
      });

      fetchProjects();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2">📁 Projects</h1>
        <p className="text-sm sm:text-base text-slate-600">Create and manage projects with team assignments</p>
      </div>

      {/* CREATE FORM */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Create New Project</h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Project Number *</label>
              <input
                type="text"
                placeholder="PRJ-2024-001"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={form.project_number}
                onChange={(e) => setForm({ ...form, project_number: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Project Name *</label>
              <input
                type="text"
                placeholder="Website Redesign"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Budget</label>
              <input
                type="number"
                placeholder="50000"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={form.start_date}
                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">End Date</label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Manager ID *</label>
              <input
                type="number"
                placeholder="e.g., 1"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={form.manager_id}
                onChange={(e) => setForm({ ...form, manager_id: e.target.value })}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 active:scale-95"
          >
            + Create Project
          </button>
        </form>
      </div>

      {/* PROJECTS TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8 border-b border-slate-200">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Project Directory</h2>
          <p className="text-slate-600 text-sm mt-1">{projects.length} active project{projects.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Number</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Manager</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Budget</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Start Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">End Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {projects.map((p) => (
                <tr key={p.project_id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-900 font-medium">#{p.project_id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">{p.project_number}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">{p.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{p.manager_name || '-'}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">${Number(p.budget).toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{p.start_date?.slice(0, 10)}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{p.end_date?.slice(0, 10) || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {projects.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-slate-500 text-lg">No projects found. Create your first project above.</p>
            </div>
          )}
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-slate-200">
          {projects.map((p) => (
            <div key={p.project_id} className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-slate-900">{p.name}</p>
                  <p className="text-sm font-medium text-blue-600">{p.project_number}</p>
                </div>
                <span className="text-sm text-slate-500">#{p.project_id}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-slate-500">Manager:</span>
                  <span className="ml-1 text-slate-900">{p.manager_name || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-500">Budget:</span>
                  <span className="ml-1 font-semibold text-slate-900">${Number(p.budget).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500">Start:</span>
                  <span className="ml-1 text-slate-900">{p.start_date?.slice(0, 10) || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-500">End:</span>
                  <span className="ml-1 text-slate-900">{p.end_date?.slice(0, 10) || '-'}</span>
                </div>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-slate-500">No projects found. Create your first project above.</p>
            </div>
          )}
        </div>
      </div>

      {/* ASSIGN EMPLOYEE FORM */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Assign Employee to Project</h2>

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            try {
              await api.post(`/projects/${assign.project_id}/assign`, assign);
              setAssign({
                project_id: "",
                employee_id: "",
                role: "",
                hours: "",
                start_date: "",
                end_date: ""
              });
            } catch (error) {
              console.error("Error assigning employee:", error);
            }
          }}
          className="space-y-4 sm:space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Project ID *</label>
              <input
                type="number"
                placeholder="e.g., 1"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={assign.project_id}
                onChange={(e) => setAssign({ ...assign, project_id: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Employee ID *</label>
              <input
                type="number"
                placeholder="e.g., 1"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={assign.employee_id}
                onChange={(e) => setAssign({ ...assign, employee_id: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Role *</label>
              <input
                type="text"
                placeholder="Developer, Designer, etc."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={assign.role}
                onChange={(e) => setAssign({ ...assign, role: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Hours *</label>
              <input
                type="number"
                placeholder="40"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={assign.hours}
                onChange={(e) => setAssign({ ...assign, hours: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={assign.start_date}
                onChange={(e) => setAssign({ ...assign, start_date: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">End Date</label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={assign.end_date}
                onChange={(e) => setAssign({ ...assign, end_date: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 active:scale-95"
          >
            ✓ Assign Employee
          </button>
        </form>
      </div>
    </div>
  );
}
