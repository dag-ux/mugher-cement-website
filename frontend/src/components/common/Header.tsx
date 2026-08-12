import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { 
  FaHome, 
  FaInfoCircle, 
  FaIndustry, 
  FaLeaf, 
  FaNewspaper, 
  FaBriefcase, 
  FaEnvelope,
} from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';

// Safe icon renderer
const IconRenderer = ({ icon: Icon, size, className }: { icon: any; size?: number; className?: string }) => {
  return <Icon size={size} className={className} />;
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/about', label: 'About', icon: FaInfoCircle },
    { path: '/products', label: 'Products', icon: FaIndustry },
    { path: '/quality', label: 'Quality', icon: FaLeaf },
    { path: '/media', label: 'Media', icon: FaNewspaper },
    { path: '/careers', label: 'Careers', icon: FaBriefcase },
    { path: '/contact', label: 'Contact', icon: FaEnvelope },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-sm dark:shadow-gray-900/30 border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
            <img
              src="/Muger_Cement2.jpg"
              alt="Mugher Cement"
              className="h-8 w-auto sm:h-9 md:h-10 transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-xl sm:text-2xl font-heading font-bold tracking-tight">
              <span className="text-[#1A3C91] dark:text-[#4A7DB4]">Mugher</span>{' '}
              <span className="text-[#2EAD32] dark:text-[#4ADE80]">Cement</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-gray-600 dark:text-gray-300 font-medium">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all duration-200 ${
                    active
                      ? 'text-[#2EAD32] dark:text-[#4ADE80] bg-[#2EAD32]/10 dark:bg-[#4ADE80]/10'
                      : 'hover:text-[#2EAD32] dark:hover:text-[#4ADE80] hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <IconRenderer icon={item.icon} size={17} />
                  <span className="text-sm font-medium">{item.label}</span>
                  {active && (
                    <span className="absolute -bottom-0.5 left-3 right-3 h-0.5 bg-[#2EAD32] dark:bg-[#4ADE80] rounded-full" />
                  )}
                </Link>
              );
            })}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Toggle + Theme Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              className="text-gray-600 dark:text-gray-300 hover:text-[#1A3C91] dark:hover:text-[#4A7DB4] transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <IconRenderer icon={HiX} size={26} /> : <IconRenderer icon={HiMenu} size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu – Overlay */}
        <div
          className={`lg:hidden fixed inset-0 top-16 sm:top-20 z-40 bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Mobile Menu – Slide-in Panel */}
        <div
          className={`lg:hidden fixed left-0 right-0 top-16 sm:top-20 z-50 bg-white dark:bg-gray-800 shadow-2xl border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
            isOpen
              ? 'max-h-[calc(100vh-4rem)] opacity-100 translate-y-0'
              : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
          } overflow-y-auto`}
        >
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    active
                      ? 'text-[#2EAD32] dark:text-[#4ADE80] bg-[#2EAD32]/10 dark:bg-[#4ADE80]/10'
                      : 'text-gray-600 dark:text-gray-300 hover:text-[#2EAD32] dark:hover:text-[#4ADE80] hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <IconRenderer icon={item.icon} size={20} />
                  <span className="text-base font-medium">{item.label}</span>
                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2EAD32] dark:bg-[#4ADE80]" />
                  )}
                </Link>
              );
            })}
            <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="px-4 py-2 text-xs text-gray-400 dark:text-gray-500">
                © {new Date().getFullYear()} Mugher Cement
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}