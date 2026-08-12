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
  FaArrowRight,
} from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';

// Safe icon renderer
const IconRenderer = ({
  icon: Icon,
  size,
  className,
}: {
  icon: any;
  size?: number;
  className?: string;
}) => {
  return <Icon size={size} className={className} />;
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Track scroll position for a stronger shadow once the page scrolls
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header
      className={`sticky top-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b transition-all duration-300 ${
        isScrolled
          ? 'shadow-lg dark:shadow-gray-900/40 border-gray-200 dark:border-gray-700'
          : 'shadow-sm dark:shadow-gray-900/30 border-gray-200/50 dark:border-gray-700/50'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group flex-shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2EAD32] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
          >
            <img
              src="/Muger_Cement2.jpg"
              alt="Mugher Cement"
              className="h-8 w-auto sm:h-9 md:h-10 rounded-sm transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-xl sm:text-2xl font-heading font-bold tracking-tight leading-none">
              <span className="text-[#1A3C91] dark:text-[#4A7DB4]">Mugher</span>{' '}
              <span className="text-[#2EAD32] dark:text-[#4ADE80]">Cement</span>
              <span className="hidden md:block text-[10px] font-medium tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase mt-0.5">
                Building Ethiopia, Together
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center text-gray-600 dark:text-gray-300 font-medium">
            <div className="flex items-center space-x-1 xl:space-x-1.5 mr-2 xl:mr-4">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2EAD32] focus-visible:ring-offset-1 ${
                      active
                        ? 'text-[#2EAD32] dark:text-[#4ADE80] bg-[#2EAD32]/10 dark:bg-[#4ADE80]/10'
                        : 'hover:text-[#2EAD32] dark:hover:text-[#4ADE80] hover:bg-gray-100 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <IconRenderer icon={item.icon} size={16} />
                    <span className="text-sm font-medium">{item.label}</span>
                    {active && (
                      <span className="absolute -bottom-0.5 left-3 right-3 h-0.5 bg-[#2EAD32] dark:bg-[#4ADE80] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            <Link
              to="/contact"
              className="group flex items-center gap-1.5 bg-[#2EAD32] hover:bg-[#278f2b] dark:bg-[#4ADE80] dark:hover:bg-[#3fc972] text-white dark:text-gray-900 text-sm font-semibold px-4 py-2 rounded-full shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A3C91] focus-visible:ring-offset-2"
            >
              Get a Quote
              <IconRenderer
                icon={FaArrowRight}
                size={12}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>

            <div className="ml-3">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Toggle + Theme Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              className="text-gray-600 dark:text-gray-300 hover:text-[#1A3C91] dark:hover:text-[#4A7DB4] transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2EAD32]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
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
          aria-hidden="true"
        />

        {/* Mobile Menu – Slide-in Panel */}
        <div
          id="mobile-menu"
          className={`lg:hidden fixed left-0 right-0 top-16 sm:top-20 z-50 bg-white dark:bg-gray-800 shadow-2xl border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
            isOpen
              ? 'max-h-[calc(100vh-4rem)] opacity-100 translate-y-0'
              : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
          } overflow-y-auto`}
        >
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navItems.map((item, index) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{ transitionDelay: isOpen ? `${index * 40}ms` : '0ms' }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                  } ${
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

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 mt-3 bg-[#2EAD32] hover:bg-[#278f2b] dark:bg-[#4ADE80] text-white dark:text-gray-900 text-base font-semibold px-4 py-3 rounded-xl shadow-sm transition-colors duration-200"
            >
              Get a Quote
              <IconRenderer icon={FaArrowRight} size={13} />
            </Link>

            <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
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