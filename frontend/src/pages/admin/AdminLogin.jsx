import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, ArrowRight, AlertCircle, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

export function AdminLogin() {
  const [email, setEmail] = useState('owner@parksmart.io');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
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
    <div className="min-h-screen bg-[#120306] text-[#FDF2F4] flex flex-col justify-between p-6">
      {/* Top Simple Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-[#8E2B44] flex items-center justify-center font-bold text-[#FDF2F4] text-xs">
            P
          </div>
          <span className="text-sm font-semibold tracking-tight text-[#FDF2F4]">
            Park Smart
          </span>
        </Link>

        <Link
          to="/"
          className="text-xs font-mono text-[#C5A5AC] hover:text-[#FDF2F4] transition-colors"
        >
          ← Return to Public View
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="max-w-sm w-full mx-auto my-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#240911] border border-[#4B0F1E] flex items-center justify-center mx-auto text-[#F7D6DC]">
            <Shield className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold font-display text-[#FDF2F4] tracking-tight">
            Building Admin
          </h1>
          <p className="text-xs text-[#C5A5AC]">
            Sign in to manage parking capacity and view earnings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-[#1B060C] border border-[rgba(247,214,220,0.1)] space-y-4 shadow-xl">
          {error && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/40 flex items-center gap-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase text-[#C5A5AC] block">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="owner@parksmart.io"
              className="w-full p-2.5 bg-[#120306] rounded-lg border border-[rgba(247,214,220,0.1)] text-xs text-[#FDF2F4] placeholder-[#C5A5AC] focus:outline-none focus:border-[#8E2B44] transition-colors"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase text-[#C5A5AC] block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 bg-[#120306] rounded-lg border border-[rgba(247,214,220,0.1)] text-xs text-[#FDF2F4] placeholder-[#C5A5AC] focus:outline-none focus:border-[#8E2B44] transition-colors"
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
          <div className="pt-3 border-t border-[rgba(247,214,220,0.06)] text-[11px] font-mono text-[#C5A5AC] text-center">
            <span>Demo: </span>
            <button
              type="button"
              onClick={() => {
                setEmail('owner@parksmart.io');
                setPassword('password123');
              }}
              className="text-[#F7D6DC] underline hover:text-white"
            >
              owner@parksmart.io
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-[#C5A5AC]">
        Protected by JWT session authentication
      </div>
    </div>
  );
}