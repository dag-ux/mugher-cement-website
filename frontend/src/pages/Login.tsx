import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaEnvelope, FaLock, FaSignInAlt, FaEye, FaEyeSlash, FaHome } from 'react-icons/fa';
import ThemeToggle from '../components/common/ThemeToggle';
import API from '../services/api';

const Icon = ({ icon: IconComponent, className, size }: any) => (
  <IconComponent className={className} size={size} />
);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response = await API.post('/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleBlur = (field: 'email' | 'password') => {
    setTouched({ ...touched, [field]: true });
  };

  const isEmailValid = () => {
    if (!touched.email) return true;
    return email.length > 0 && email.includes('@');
  };

  const isPasswordValid = () => {
    if (!touched.password) return true;
    return password.length > 0;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#1A3C91] to-[#2EAD32] transition-colors duration-300">
      <Helmet>
        <title>Admin Login | Mugher Cement</title>
        <meta
          name="description"
          content="Secure admin login for Mugher Cement website management."
        />
      </Helmet>

      {/* ===== Top Navbar (Simplified) ===== */}
      <nav className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md border-b border-white/20 dark:border-gray-700 h-16 flex items-center justify-between px-6 sticky top-0 z-50">
        <Link to="/" className="flex items-center space-x-2 group">
          <img src="/Muger_Cement2.jpg" alt="Mugher Cement" className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" />
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-[#1A3C91] dark:text-[#4A7DB4]">Mugher</span>{' '}
            <span className="text-[#2EAD32] dark:text-[#4ADE80]">Cement</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-1 text-gray-700 hover:text-[#1A3C91] dark:text-gray-300 dark:hover:text-white transition text-sm font-medium"
          >
            <Icon icon={FaHome} size={16} />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* ===== Login Form (Centered) ===== */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700 p-8 transition-colors duration-300">
          {/* Logo and heading */}
          <div className="text-center">
            <img
              src="/Muger_Cement2.jpg"
              alt="Mugher Cement"
              className="h-16 w-auto mx-auto mb-4 hover:scale-105 transition-transform duration-300"
            />
            <h2 className="text-3xl font-heading font-extrabold text-[#1A3C91] dark:text-white">
              Admin Login
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-body">
              Enter your credentials to access the admin panel.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 rounded">
                <p className="text-sm text-red-700 dark:text-red-400 font-body">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              {/* Email field */}
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon={FaEnvelope} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition sm:text-sm font-body ${
                      touched.email && !isEmailValid()
                        ? 'border-red-500 dark:border-red-400'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Email address"
                  />
                </div>
                {touched.email && !isEmailValid() && (
                  <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                    Please enter a valid email address.
                  </p>
                )}
              </div>

              {/* Password field */}
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon={FaLock} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => handleBlur('password')}
                    className={`block w-full pl-10 pr-12 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition sm:text-sm font-body ${
                      touched.password && !isPasswordValid()
                        ? 'border-red-500 dark:border-red-400'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                  >
                    <Icon icon={showPassword ? FaEyeSlash : FaEye} size={20} />
                  </button>
                </div>
                {touched.password && !isPasswordValid() && (
                  <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                    Password is required.
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#1A3C91] hover:bg-[#163a7a] dark:bg-[#2EAD32] dark:hover:bg-[#4ADE80] dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2EAD32] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white dark:text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <Icon icon={FaSignInAlt} size={18} />
                  Sign in
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-sm">
              <Link
                to="/"
                className="font-medium text-[#2EAD32] hover:text-emerald-700 dark:text-[#4ADE80] dark:hover:text-emerald-400 transition"
              >
                ← Back to Home
              </Link>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
              >
                Forgot password?
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ===== Footer ===== */}
      <footer className="bg-dark dark:bg-gray-900 text-white dark:text-gray-200 pt-8 pb-4 border-t border-gray-700">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <img src="/Muger_Cement2.jpg" alt="Mugher Cement" className="h-8 w-auto" />
              <span className="text-lg font-bold">Mugher Cement</span>
            </div>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Mugher Cement Enterprise. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-gray-400">
              <a href="/" className="hover:text-white transition">Home</a>
              <a href="/about" className="hover:text-white transition">About</a>
              <a href="/contact" className="hover:text-white transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}