import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full navbar-glass">
      <div className="w-full px-6 md:px-12 lg:px-16 h-20 flex items-center justify-between">
        
        {/* 1. LOGO AREA (Left anchor) */}
        <div className="flex items-center shrink-0">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-[#8E2B44] flex items-center justify-center font-bold text-[#FAF7F5] text-sm group-hover:bg-[#B23C59] transition-colors shadow-sm">
              P
            </div>
            <span className="text-base font-bold tracking-tight text-[#FAF7F5] font-display">
              Park Smart
            </span>
          </Link>
        </div>

        {/* 2. NAVIGATION AREA (Central usable space) */}
        <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-12 text-sm font-medium text-[#D1C7C9]">
          <Link
            to="/app/home"
            className="hover:text-[#FAF7F5] transition-colors tracking-wide py-1"
          >
            Find Parking
          </Link>
          <a
            href="#how-it-works"
            className="hover:text-[#FAF7F5] transition-colors tracking-wide py-1"
          >
            How It Works
          </a>
          <a
            href="#for-buildings"
            className="hover:text-[#FAF7F5] transition-colors tracking-wide py-1"
          >
            For Buildings
          </a>
          <a
            href="#rates"
            className="hover:text-[#FAF7F5] transition-colors tracking-wide py-1"
          >
            Rates
          </a>
        </nav>

        {/* 3. ACTION AREA (Right anchor) */}
        <div className="hidden md:flex items-center justify-end gap-5 shrink-0">
          <Link
            to="/admin/login"
            className="text-sm font-medium text-[#D1C7C9] hover:text-[#FAF7F5] transition-colors px-3 py-1.5"
          >
            Admin Login
          </Link>
          <Button
            onClick={() => navigate('/app/home')}
            variant="primary"
            size="md"
            icon={ArrowRight}
            iconPosition="right"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#D1C7C9] hover:text-[#FAF7F5] hover:bg-[#2E0B17] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1E060D] border-b border-[rgba(247,214,220,0.1)] px-6 py-6 space-y-5">
          <div className="flex flex-col gap-4 text-base font-medium text-[#D1C7C9]">
            <Link
              to="/app/home"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#FAF7F5]"
            >
              Find Parking
            </Link>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#FAF7F5]"
            >
              How It Works
            </a>
            <a
              href="#for-buildings"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#FAF7F5]"
            >
              For Buildings
            </a>
            <a
              href="#rates"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#FAF7F5]"
            >
              Rates
            </a>
          </div>

          <div className="pt-4 border-t border-[rgba(247,214,220,0.1)] flex flex-col gap-3">
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/app/home');
              }}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Get Started
            </Button>
            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2 text-sm font-mono text-[#D1C7C9] hover:text-[#FAF7F5]"
            >
              Building Admin Login →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}