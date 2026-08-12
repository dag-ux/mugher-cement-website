import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  FaSignOutAlt,
  FaChartBar,
  FaBox,
  FaNewspaper,
  FaEnvelope,
  FaBriefcase,
  FaUsers,
  FaCog,
  FaBars,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaUserCircle,
} from 'react-icons/fa';
import ThemeToggle from '../common/ThemeToggle';

const Icon = ({ icon: IconComponent, className, size }: any) => (
  <IconComponent className={className} size={size} />
);

const adminNav = [
  { path: '/admin', label: 'Dashboard', icon: FaChartBar },
  { path: '/admin/products', label: 'Products', icon: FaBox },
  { path: '/admin/news', label: 'News', icon: FaNewspaper },
  { path: '/admin/jobs', label: 'Jobs', icon: FaBriefcase },
  { path: '/admin/applications', label: 'Applications', icon: FaUsers },
  { path: '/admin/messages', label: 'Messages', icon: FaEnvelope },
  { path: '/admin/settings', label: 'Settings', icon: FaCog },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Separate state for mobile drawer vs. desktop collapse — these are two
  // different behaviors and shouldn't share one variable.
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Close the mobile drawer automatically whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent background scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const isActive = (path: string) => location.pathname === path;
  const currentPage =
    adminNav.find((item) => isActive(item.path))?.label ?? 'Dashboard';

  const sidebarWidth = collapsed ? 'md:w-20' : 'md:w-64';
  const contentOffset = collapsed ? 'md:ml-20' : 'md:ml-64';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* ===== TOP NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1A3C91] to-[#2EAD32] dark:from-gray-800 dark:to-gray-900 shadow-lg h-16 flex items-center justify-between px-4 md:px-6 transition-colors duration-300">
        {/* Left: Hamburger (mobile only) */}
        <div className="flex items-center gap-3 md:w-64 flex-shrink-0">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white hover:text-gray-200 transition p-1 -ml-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:hidden"
            aria-label={mobileOpen ? 'Close sidebar' : 'Open sidebar'}
            aria-expanded={mobileOpen}
          >
            <Icon icon={mobileOpen ? FaTimes : FaBars} size={20} />
          </button>

          <Link to="/admin" className="flex items-center gap-2 min-w-0">
            <img
              src="/Muger_Cement2.jpg"
              alt="Mugher Cement"
              className="h-8 w-auto rounded-sm flex-shrink-0"
            />
            <span className="text-lg md:text-xl font-bold text-white tracking-tight truncate">
              Mugher Cement
            </span>
          </Link>
        </div>

        {/* Center: current page breadcrumb (desktop only) */}
        <div className="hidden md:flex flex-1 items-center justify-center text-sm text-white/80 font-medium">
          Admin / <span className="text-white ml-1">{currentPage}</span>
        </div>

        {/* Right: Theme Toggle + user badge + Logout */}
        <div className="flex items-center gap-2 md:gap-3 md:w-64 flex-shrink-0 justify-end">
          <ThemeToggle />
          <div className="hidden sm:flex items-center gap-2 text-white/90 border-l border-white/20 pl-3 ml-1">
            <Icon icon={FaUserCircle} size={20} />
            <span className="text-sm font-medium">Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-200 transition p-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Logout"
            title="Logout"
          >
            <Icon icon={FaSignOutAlt} size={18} />
          </button>
        </div>
      </nav>

      {/* ===== MOBILE BACKDROP ===== */}
      <div
        className={`md:hidden fixed inset-0 top-16 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`fixed left-0 top-16 bottom-0 z-40 w-64 ${sidebarWidth} bg-gradient-to-b from-[#1A3C91] to-[#2EAD32] dark:from-gray-800 dark:to-gray-900 text-white shadow-2xl overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Brand area */}
        <div className="p-5 border-b border-white/10 dark:border-gray-700 flex items-center justify-between gap-2">
          <div className={`min-w-0 ${collapsed ? 'md:hidden' : ''}`}>
            <p className="font-heading font-bold text-white truncate">Admin Panel</p>
            <p className="text-xs text-white/60 dark:text-gray-400 font-body truncate">
              Administration Dashboard
            </p>
          </div>

          {/* Desktop-only collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon icon={collapsed ? FaChevronRight : FaChevronLeft} size={12} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 mt-2">
          {adminNav.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  collapsed ? 'md:justify-center md:px-0' : ''
                } ${
                  active
                    ? 'bg-white/20 dark:bg-white/10 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10 dark:hover:bg-white/5'
                }`}
              >
                <Icon
                  icon={item.icon}
                  size={18}
                  className={`flex-shrink-0 transition-transform duration-200 ${
                    active ? 'scale-110' : 'group-hover:scale-110'
                  }`}
                />
                <span className={`font-medium text-sm truncate ${collapsed ? 'md:hidden' : ''}`}>
                  {item.label}
                </span>
                {active && (
                  <span
                    className={`ml-auto w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse flex-shrink-0 ${
                      collapsed ? 'md:hidden' : ''
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Version */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 dark:border-gray-700 text-xs text-white/40 dark:text-gray-500 text-center ${
            collapsed ? 'md:hidden' : ''
          }`}
        >
          v1.0.0
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className={`pt-16 min-h-screen transition-all duration-300 ${contentOffset}`}>
        <div className="p-4 md:p-6">
          {/* Mobile breadcrumb */}
          <div className="md:hidden mb-3 text-sm text-gray-500 dark:text-gray-400 font-medium">
            Admin / <span className="text-gray-700 dark:text-gray-200">{currentPage}</span>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700 p-4 md:p-6 min-h-[calc(100vh-10rem)] transition-colors duration-300">
            {children}
          </div>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer
        className={`py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 transition-all duration-300 ${contentOffset}`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 max-w-7xl mx-auto">
          <span>
            &copy; {new Date().getFullYear()} Mugher Cement Enterprise. All rights reserved.
          </span>
          <span className="flex items-center gap-4 text-xs">
            <a href="/" className="hover:text-[#2EAD32] transition-colors duration-200">
              Home
            </a>
            <a href="/about" className="hover:text-[#2EAD32] transition-colors duration-200">
              About
            </a>
            <a href="/contact" className="hover:text-[#2EAD32] transition-colors duration-200">
              Contact
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}