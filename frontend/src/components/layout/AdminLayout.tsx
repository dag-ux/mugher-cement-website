import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  FaSignOutAlt,
  FaChartBar,
  FaBox,
  FaNewspaper,
  FaEnvelope,
  FaUser,
  FaBriefcase,
  FaUsers,
  FaCog,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import ThemeToggle from '../common/ThemeToggle';

const Icon = ({ icon: IconComponent, className, size }: any) => (
  <IconComponent className={className} size={size} />
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const adminNav = [
    { path: '/admin', label: 'Dashboard', icon: FaChartBar },
    { path: '/admin/products', label: 'Products', icon: FaBox },
    { path: '/admin/news', label: 'News', icon: FaNewspaper },
    { path: '/admin/jobs', label: 'Jobs', icon: FaBriefcase },
    { path: '/admin/applications', label: 'Applications', icon: FaUsers },
    { path: '/admin/messages', label: 'Messages', icon: FaEnvelope },
    { path: '/admin/settings', label: 'Settings', icon: FaCog },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

      {/* ===== TOP NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1A3C91] to-[#2EAD32] dark:from-gray-800 dark:to-gray-900 shadow-lg h-16 flex items-center justify-between px-4 md:px-6 transition-colors duration-300">
        {/* Left: Hamburger (mobile only) */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white hover:text-gray-200 transition md:hidden"
          aria-label="Toggle sidebar"
        >
          <Icon icon={sidebarOpen ? FaTimes : FaBars} size={22} />
        </button>

        {/* Center: Logo + Mugher Cement */}
        <div className="flex items-center justify-center flex-1 gap-2">
          <img src="/Muger_Cement2.jpg" alt="Mugher Cement" className="h-8 w-auto" />
          <span className="text-xl font-bold text-white tracking-tight">
            Mugher Cement
          </span>
        </div>

        {/* Right: Theme Toggle + Logout */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-200 transition"
            aria-label="Logout"
          >
            <Icon icon={FaSignOutAlt} size={18} />
          </button>
        </div>
      </nav>

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-gradient-to-b 
          from-[#1A3C91] to-[#2EAD32] dark:from-gray-800 dark:to-gray-900 
          text-white shadow-2xl z-40 overflow-y-auto transition-transform 
          duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Brand area */}
        <div className="p-5 border-b border-white/10 dark:border-gray-700">
          
          <p className="text-xs text-white/60 dark:text-gray-400 font-body">Administration Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 mt-2">
          {adminNav.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  active
                    ? 'bg-white/20 dark:bg-white/10 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10 dark:hover:bg-white/5'
                }`}
              >
                <Icon
                  icon={item.icon}
                  size={18}
                  className={`transition-transform duration-200 ${
                    active ? 'scale-110' : 'group-hover:scale-110'
                  }`}
                />
                <span className="font-medium text-sm">{item.label}</span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Version */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 dark:border-gray-700 text-xs text-white/40 dark:text-gray-500 text-center">
          v1.0.0
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main
        className={`pt-16 min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'md:ml-64' : 'md:ml-0'
        }`}
      >
        <div className="p-4 md:p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700 p-4 md:p-6 min-h-[calc(100vh-8rem)] transition-colors duration-300">
            {children}
          </div>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer
        className={`py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300 ${
          sidebarOpen ? 'md:ml-64' : 'md:ml-0'
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 max-w-7xl mx-auto">
          <span>
            &copy; {new Date().getFullYear()} Mugher Cement Enterprise. All rights reserved.
          </span>
          <span className="flex items-center gap-4 text-xs">
            <a href="/" className="hover:text-[#2EAD32] transition">Home</a>
            <a href="/about" className="hover:text-[#2EAD32] transition">About</a>
            <a href="/contact" className="hover:text-[#2EAD32] transition">Contact</a>
          </span>
        </div>
      </footer>
    </div>
  );
}