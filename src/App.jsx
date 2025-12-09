import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Employees from "./pages/Employees";
import Projects from "./pages/Projects";
import Payroll from "./pages/Payroll";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        {/* Modern Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CS</span>
                </div>
                <h1 className="text-xl font-bold text-slate-900">Personnel System</h1>
              </div>
              
              <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                <Link 
                  to="/" 
                  className="px-4 py-2 rounded-md font-medium transition-all duration-200 hover:bg-white text-slate-700 hover:text-blue-600 hover:shadow-sm"
                >
                  👥 Employees
                </Link>
                <Link 
                  to="/projects" 
                  className="px-4 py-2 rounded-md font-medium transition-all duration-200 hover:bg-white text-slate-700 hover:text-blue-600 hover:shadow-sm"
                >
                  📁 Projects
                </Link>
                <Link 
                  to="/payroll" 
                  className="px-4 py-2 rounded-md font-medium transition-all duration-200 hover:bg-white text-slate-700 hover:text-blue-600 hover:shadow-sm"
                >
                  💰 Payroll
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Pages */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Employees />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/payroll" element={<Payroll />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
