import { useState } from 'react';
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

// Helper to render icons safely (bypasses React 19 type issue)
const IconRenderer = ({ icon: Icon, size, className }: { icon: any; size?: number; className?: string }) => {
  return <Icon size={size} className={className} />;
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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
    <header className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/30 sticky top-0 z-50 transition-shadow duration-300">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <img
            src="/Muger_Cement2.jpg"
            alt="Mugher Cement"
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-[#1A3C91] dark:text-[#4A7DB4]">Mugher</span>{' '}
            <span className="text-[#2EAD32] dark:text-[#4ADE80]">Cement</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 text-gray-600 dark:text-gray-300 font-medium">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center space-x-1.5 transition-colors duration-200 ${
                  active ? 'text-[#2EAD32] dark:text-[#4ADE80]' : 'hover:text-[#2EAD32] dark:hover:text-[#4ADE80]'
                }`}
              >
                <IconRenderer icon={item.icon} size={18} />
                <span>{item.label}</span>
                {/* Active underline */}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#2EAD32] dark:bg-[#4ADE80] transition-all duration-300 ${
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
          {/* Theme Toggle */}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="text-gray-600 dark:text-gray-300 text-2xl hover:text-[#1A3C91] dark:hover:text-[#4A7DB4] transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <IconRenderer icon={HiX} size={28} /> : <IconRenderer icon={HiMenu} size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 space-y-3 text-gray-600 dark:text-gray-300 font-medium">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 py-2 border-b border-gray-50 dark:border-gray-700 transition-colors duration-200 ${
                isActive(item.path) ? 'text-[#2EAD32] dark:text-[#4ADE80]' : 'hover:text-[#2EAD32] dark:hover:text-[#4ADE80]'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <IconRenderer icon={item.icon} size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
          {/* No admin or logout links – accessible only via hidden URLs */}
        </div>
      </div>
    </header>
  );
}