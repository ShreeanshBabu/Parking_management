import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Car, ArrowRight, ArrowLeft, AlertCircle, Sun, Moon, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../../components/common/Button';

export function LoginSelectionPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState('user'); // 'renter' or 'user'

  const [renterEmail, setRenterEmail] = useState('owner@parksmart.io');
  const [renterPassword, setRenterPassword] = useState('password123');
  const [renterLoading, setRenterLoading] = useState(false);
  const [renterError, setRenterError] = useState('');

  const [userEmail, setUserEmail] = useState('user@parksmart.io');
  const [userPassword, setUserPassword] = useState('password123');
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState('');

  const handleRenterLogin = async (e) => {
    e.preventDefault();
    setRenterError('');
    setRenterLoading(true);
    try {
      const loggedInUser = await login(renterEmail, renterPassword);
      if (loggedInUser.role === 'owner' || loggedInUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        setRenterError('Account does not have owner/renter permissions.');
      }
    } catch (err) {
      setRenterError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setRenterLoading(false);
    }
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    setUserError('');
    setUserLoading(true);
    try {
      await login(userEmail, userPassword);
      navigate('/app/home');
    } catch (err) {
      setUserError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setUserLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090B] text-zinc-900 dark:text-zinc-50 flex flex-col justify-between transition-colors">
      
      {/* Top Header */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 flex items-center justify-center font-bold text-sm shadow-sm transition-transform group-hover:scale-105">
            P
          </div>
          <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-display">
            Park Smart
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors"
            title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
            aria-label="Toggle dark/light theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-zinc-200" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>
          
          <Link
            to="/"
            className="text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Split Layout */}
      <main className="max-w-6xl w-full mx-auto px-6 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Side: Rich Visual Panel */}
        <div className="lg:col-span-5 relative hidden lg:flex flex-col justify-between rounded-3xl overflow-hidden min-h-[580px] p-8 bg-zinc-900 text-white shadow-xl">
          {/* Architectural Background */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center opacity-40 pointer-events-none"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=2070&auto=format&fit=crop')"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent pointer-events-none" />

          {/* Top Pill */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono tracking-widest text-zinc-300 uppercase backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>SECURE ACCESS PORTAL</span>
            </div>
          </div>

          {/* Bottom Narrative */}
          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl font-extrabold font-display leading-tight text-white">
              Access your parking space or manage your garage.
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed font-normal">
              A unified platform connecting verified office bays with urban drivers across the city.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span>• Instant QR Check-in</span>
              <span>• Automated Billing</span>
            </div>
          </div>
        </div>

        {/* Right Side: Account Selection & Authentication */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-display">
              Welcome back.
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Choose how you want to continue to access the right dashboard.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="grid grid-cols-2 gap-3 p-1.5 rounded-xl bg-zinc-200/70 dark:bg-zinc-800/70 border border-zinc-300/60 dark:border-zinc-700/60">
            <button
              onClick={() => setActiveTab('user')}
              className={`py-2.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'user'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>LOGIN AS USER</span>
            </button>

            <button
              onClick={() => setActiveTab('renter')}
              className={`py-2.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'renter'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>LOGIN AS RENTER</span>
            </button>
          </div>

          {/* Active Card Form */}
          {activeTab === 'user' ? (
            <div className="p-8 rounded-2xl bg-white dark:bg-[#141418] border border-zinc-200 dark:border-zinc-800 shadow-card hover:shadow-elevated transition-all space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
                  Driver & Commuter Account
                </span>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-display">
                  Find parking and manage your sessions.
                </h2>
              </div>

              {userError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{userError}</span>
                </div>
              )}

              <form onSubmit={handleUserLogin} className="space-y-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 dark:text-zinc-400 block mb-1 font-semibold">
                    User Email
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="user@parksmart.io"
                    className="w-full p-3 bg-zinc-50 dark:bg-[#1C1C22] rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 dark:text-zinc-400 block mb-1 font-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-3 bg-zinc-50 dark:bg-[#1C1C22] rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full font-bold py-3.5"
                  loading={userLoading}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Continue to Driver Portal
                </Button>
              </form>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
                <span>Demo User Account:</span>
                <button
                  type="button"
                  onClick={() => {
                    setUserEmail('user@parksmart.io');
                    setUserPassword('password123');
                  }}
                  className="text-zinc-900 dark:text-zinc-100 font-bold underline hover:no-underline"
                >
                  user@parksmart.io
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-white dark:bg-[#141418] border border-zinc-200 dark:border-zinc-800 shadow-card hover:shadow-elevated transition-all space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-bold">
                  Space Owner & Facility Account
                </span>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-display">
                  Manage parking spaces and track activity.
                </h2>
              </div>

              {renterError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{renterError}</span>
                </div>
              )}

              <form onSubmit={handleRenterLogin} className="space-y-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 dark:text-zinc-400 block mb-1 font-semibold">
                    Renter / Owner Email
                  </label>
                  <input
                    type="email"
                    value={renterEmail}
                    onChange={(e) => setRenterEmail(e.target.value)}
                    placeholder="owner@parksmart.io"
                    className="w-full p-3 bg-zinc-50 dark:bg-[#1C1C22] rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 dark:text-zinc-400 block mb-1 font-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    value={renterPassword}
                    onChange={(e) => setRenterPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-3 bg-zinc-50 dark:bg-[#1C1C22] rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full font-bold py-3.5"
                  loading={renterLoading}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Continue to Facility Operations
                </Button>
              </form>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
                <span>Demo Owner Account:</span>
                <button
                  type="button"
                  onClick={() => {
                    setRenterEmail('owner@parksmart.io');
                    setRenterPassword('password123');
                  }}
                  className="text-zinc-900 dark:text-zinc-100 font-bold underline hover:no-underline"
                >
                  owner@parksmart.io
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800/60">
        Park Smart • Shared Parking Infrastructure
      </footer>
    </div>
  );
}
