import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Car, Building2, ExternalLink } from 'lucide-react';

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-[#09090B] text-zinc-400 border-t border-zinc-800/80 transition-colors">
      {/* Subtle Pre-Footer Action Banner */}
      <div className="border-b border-zinc-800/60">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base font-bold text-white font-display">
              Ready to find a bay or list your facility?
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
              Join hundreds of drivers and property managers optimizing urban parking every day.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/app/explore')}
              className="px-4 py-2 rounded-lg bg-white text-zinc-900 text-xs font-semibold hover:bg-zinc-100 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Car className="w-3.5 h-3.5" />
              <span>Find Parking</span>
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium border border-zinc-700 transition-colors flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>List Facility</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Links Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Brand & Mission Column (Span 2 on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-white text-zinc-900 flex items-center justify-center font-bold text-xs shadow-xs font-display">
                P
              </div>
              <span className="text-sm font-bold tracking-tight text-white font-display">
                Park Smart
              </span>
            </Link>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Making unused parking accessible when people need it. Built to connect off-hours corporate capacity with urban drivers for stress-free parking.
            </p>

            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational • Real-time Telemetry</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
              Product
            </h5>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link to="/app/explore" className="hover:text-white transition-colors">
                  Find Parking
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing Plans
                </a>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* For Drivers */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
              For Drivers
            </h5>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link to="/app/explore" className="hover:text-white transition-colors">
                  Live Deck Map
                </Link>
              </li>
              <li>
                <Link to="/app/session" className="hover:text-white transition-colors">
                  Active Session
                </Link>
              </li>
              <li>
                <Link to="/app/wallet" className="hover:text-white transition-colors">
                  Digital Wallet
                </Link>
              </li>
              <li>
                <Link to="/app/profile" className="hover:text-white transition-colors">
                  Driver Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* For Renters / Building Owners */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
              For Renters
            </h5>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link to="/admin/dashboard" className="hover:text-white transition-colors">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/parking" className="hover:text-white transition-colors">
                  Bay Management
                </Link>
              </li>
              <li>
                <Link to="/admin/sessions" className="hover:text-white transition-colors">
                  Live Sessions
                </Link>
              </li>
              <li>
                <Link to="/admin/pricing" className="hover:text-white transition-colors">
                  Dynamic Pricing
                </Link>
              </li>
              <li>
                <Link to="/admin/earnings" className="hover:text-white transition-colors">
                  Revenue & Payouts
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Legal Line */}
      <div className="border-t border-zinc-800/80 py-6 bg-black/40">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            © 2026 Park Smart Technologies Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-[11px] font-mono">
            <span className="text-zinc-400 hover:text-zinc-200 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="text-zinc-400 hover:text-zinc-200 cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="text-zinc-400 hover:text-zinc-200 cursor-pointer transition-colors">
              Security
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
