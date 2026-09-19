import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, User, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const { isAuthenticated, isOwner } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleUserIconClick = () => {
    if (isAuthenticated) {
      if (isOwner) {
        navigate('/admin/dashboard');
      } else {
        navigate('/app/home');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full navbar-glass transition-colors duration-200">
      <div className="w-full px-6 md:px-12 lg:px-16 h-20 flex items-center justify-between">
        
        {/* 1. LOGO AREA (Left anchor) */}
        <div className="flex items-center shrink-0">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 flex items-center justify-center font-bold text-sm shadow-sm transition-transform group-hover:scale-105">
              P
            </div>
            <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-display">
              Park Smart
            </span>
          </Link>
        </div>

        {/* 2. NAVIGATION AREA (Center: Home & Login) */}
        <nav className="hidden md:flex items-center justify-center gap-10 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link
            to="/"
            className={`transition-colors py-1 hover:text-zinc-900 dark:hover:text-white ${
              location.pathname === '/' ? 'text-zinc-900 dark:text-white font-semibold' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/login"
            className={`transition-colors py-1 hover:text-zinc-900 dark:hover:text-white ${
              location.pathname.startsWith('/login') ? 'text-zinc-900 dark:text-white font-semibold' : ''
            }`}
          >
            Login
          </Link>
        </nav>

        {/* 3. ACTION AREA (Right: Theme Toggle + User Icon) */}
        <div className="hidden md:flex items-center justify-end gap-3 shrink-0">
          {/* Dark/Light Mode Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors"
            title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-zinc-200" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>

          {/* User / Login Icon Button */}
          <button
            onClick={handleUserIconClick}
            className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors flex items-center gap-2 text-xs font-medium"
            title={isAuthenticated ? "Go to Dashboard" : "Sign In"}
            aria-label="User account"
          >
            <User className="w-4 h-4" />
            <span className="hidden lg:inline">{isAuthenticated ? 'Account' : 'Sign In'}</span>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-zinc-200" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#121215]/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col gap-3 text-base font-medium text-zinc-700 dark:text-zinc-300">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-zinc-900 dark:hover:text-white"
            >
              Home
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-zinc-900 dark:hover:text-white"
            >
              Login
            </Link>
          </div>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleUserIconClick();
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>{isAuthenticated ? 'Open Account' : 'Sign In'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
