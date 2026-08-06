import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

// Safe icon renderer (bypasses React 19 type issue)
const Icon = ({ icon: IconComponent, className, size }: any) => (
  <IconComponent className={className} size={size} />
);

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Icon icon={FaMoon} size={18} />
      ) : (
        <Icon icon={FaSun} size={18} />
      )}
    </button>
  );
}