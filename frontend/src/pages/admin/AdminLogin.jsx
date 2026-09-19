import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, ArrowRight, AlertCircle, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../../components/common/Button';

export function AdminLogin() {
  const [email, setEmail] = useState('owner@parksmart.io');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      const loggedInUser = await login(email, password);
      if (loggedInUser.role === 'owner' || loggedInUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        setError('Unauthorized: Account does not have facility owner permissions.');
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090B] text-zinc-900 dark:text-zinc-50 flex flex-col justify-between p-6 md:p-10 transition-colors">
      {/* Top Simple Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 flex items-center justify-center font-bold text-xs shadow-xs">
            P
          </div>
          <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 font-display">
            Park Smart
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-zinc-200" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>
          <Link
            to="/login"
            className="text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            ← Login Selection
          </Link>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-sm w-full mx-auto my-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-900 dark:text-zinc-100">
            <Shield className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold font-display text-zinc-900 dark:text-zinc-50 tracking-tight">
            Building Admin
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Sign in to manage parking capacity and view earnings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase text-zinc-500 dark:text-zinc-400 block">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="owner@parksmart.io"
              className="w-full p-2.5 bg-zinc-50 dark:bg-[#18181B] rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase text-zinc-500 dark:text-zinc-400 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 bg-zinc-50 dark:bg-[#18181B] rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full mt-2 font-medium"
            loading={loading}
            icon={ArrowRight}
            iconPosition="right"
          >
            Authenticate & Open Dashboard
          </Button>

          {/* Quick Demo Credentials Helper */}
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 text-center">
            <span>Demo: </span>
            <button
              type="button"
              onClick={() => {
                setEmail('owner@parksmart.io');
                setPassword('password123');
              }}
              className="text-zinc-900 dark:text-zinc-100 underline hover:no-underline"
            >
              owner@parksmart.io
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-zinc-500 dark:text-zinc-400">
        Protected by JWT session authentication
      </div>
    </div>
  );
}
