import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
} from 'react-icons/fa';

// Safe icon wrapper (bypasses React 19 type issues)
const Icon = ({ icon: IconComponent, className, size }: any) => (
  <IconComponent className={className} size={size} />
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-300">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand / About */}
          <div className="space-y-3">
            <h4 className="text-2xl font-heading font-bold tracking-tight">
              <span className="text-[#1A3C91] dark:text-[#4A7DB4]">Mugher</span>{' '}
              <span className="text-[#2EAD32] dark:text-[#4ADE80]">Cement</span>
            </h4>
            <p className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              Building Ethiopia's future with quality cement since 1984.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              <a
                href="https://www.facebook.com/mughercement"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#1877F2] flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Icon icon={FaFacebookF} className="text-white text-sm" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#1DA1F2] flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Icon icon={FaTwitter} className="text-white text-sm" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#0A66C2] flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Icon icon={FaLinkedinIn} className="text-white text-sm" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#E4405F] flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Icon icon={FaInstagram} className="text-white text-sm" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#FF0000] flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <Icon icon={FaYoutube} className="text-white text-sm" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h5 className="text-white font-semibold text-lg mb-4 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-8 after:h-0.5 after:bg-[#2EAD32]">
              Products
            </h5>
            <ul className="space-y-2 text-sm text-gray-300 dark:text-gray-400">
              <li>
                <Link to="/products/ordinary-portland-cement" className="hover:text-[#2EAD32] transition">
                  Ordinary Portland Cement
                </Link>
              </li>
              <li>
                <Link to="/products/portland-pozzolana-cement" className="hover:text-[#2EAD32] transition">
                  Portland-Pozzolana Cement
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#2EAD32] transition">
                  Specialty Grades
                </Link>
              </li>
              <li>
                <Link to="/quality" className="hover:text-[#2EAD32] transition">
                  Quality Assurance
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-white font-semibold text-lg mb-4 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-8 after:h-0.5 after:bg-[#2EAD32]">
              Company
            </h5>
            <ul className="space-y-2 text-sm text-gray-300 dark:text-gray-400">
              <li>
                <Link to="/about" className="hover:text-[#2EAD32] transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/about#leadership" className="hover:text-[#2EAD32] transition">
                  Leadership
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-[#2EAD32] transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/media" className="hover:text-[#2EAD32] transition">
                  News & Media
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-white font-semibold text-lg mb-4 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-8 after:h-0.5 after:bg-[#2EAD32]">
              Contact
            </h5>
            <ul className="space-y-2 text-sm text-gray-300 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <Icon icon={FaMapMarkerAlt} className="text-[#2EAD32] mt-0.5 flex-shrink-0" />
                <span>Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon={FaPhone} className="text-[#2EAD32] mt-0.5 flex-shrink-0" />
                <a href="tel:+251111234567" className="hover:text-[#2EAD32] transition">
                  +251 11 123 4567
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon={FaEnvelope} className="text-[#2EAD32] mt-0.5 flex-shrink-0" />
                <a href="mailto:info@mughercement.com" className="hover:text-[#2EAD32] transition">
                  info@mughercement.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon={FaClock} className="text-[#2EAD32] mt-0.5 flex-shrink-0" />
                <span>Mon – Fri, 8:00 – 17:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
          <span>
            &copy; {currentYear} Mugher Cement Enterprise. All rights reserved.
          </span>
          <div className="flex space-x-4 text-xs">
            <Link to="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <span className="text-gray-600 dark:text-gray-600">|</span>
            <Link to="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
            <span className="text-gray-600 dark:text-gray-600">|</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-white transition"
            >
              ↑ Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}