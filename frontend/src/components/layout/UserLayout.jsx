import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Compass, Clock, Wallet, User, QrCode, Sun, Moon } from 'lucide-react';
import { useParking } from '../../context/ParkingContext';
import { useTheme } from '../../context/ThemeContext';
import { QRScannerModal } from '../common/QRScannerModal';
import { formatCurrency } from '../../utils/formatters';

export function UserLayout() {
  const { activeSession, startSession, sessionCostInfo } = useParking();
  const { isDark, toggleTheme } = useTheme();
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScanSuccess = (scanData) => {
    startSession({
      buildingId: scanData.buildingId,
      rateType: scanData.rateType,
      slot: scanData.slot,
      vehiclePlate: 'KA 01 MJ 7291'
    });
    navigate('/app/session');
  };

  const navItems = [
    { to: '/app/home', label: 'Home', icon: Home },
    { to: '/app/explore', label: 'Explore', icon: Compass },
    { to: '/app/session', label: 'Session', icon: Clock, badge: !!activeSession },
    { to: '/app/wallet', label: 'Wallet', icon: Wallet },
    { to: '/app/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090B] text-zinc-900 dark:text-zinc-50 flex flex-col pb-20 md:pb-8 transition-colors">
      {/* Top Header */}
      <header className="sticky top-0 z-30 navbar-glass px-6 py-3.5 transition-colors">
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-7 h-7 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 flex items-center justify-center font-bold text-xs shadow-sm">
              P
            </div>
            <div>
              <div className="text-xs font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-display">
                PARK SMART
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                Driver Portal
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `transition-colors py-1 flex items-center gap-1.5 ${
                    isActive ? 'text-zinc-900 dark:text-white font-semibold' : 'hover:text-zinc-900 dark:hover:text-white'
                  }`
                }
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors"
              aria-label="Toggle dark/light theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-zinc-200" /> : <Moon className="w-4 h-4 text-zinc-700" />}
            </button>

            <button
              onClick={() => setIsQRScannerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
              aria-label="Scan gate QR code"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Scan Gate</span>
            </button>
          </div>
        </div>

        {/* Active Session Notification Sticky Banner */}
        {activeSession && location.pathname !== '/app/session' && (
          <div
            onClick={() => navigate('/app/session')}
            className="w-full max-w-5xl mx-auto mt-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-amber-500/15 transition-all text-zinc-900 dark:text-zinc-100 shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <div>
                <div className="text-xs font-bold">
                  Active at {activeSession.buildingName} ({activeSession.slot})
                </div>
                <div className="text-[10px] text-zinc-600 dark:text-zinc-400">
                  {activeSession.rateType === 'fixed' ? 'Fixed Rate' : 'Floating Rate'} • Running
                </div>
              </div>
            </div>
            <div className="text-right font-mono">
              <div className="text-xs font-bold">
                {sessionCostInfo.formattedDuration}
              </div>
              <div className="text-[10px] text-zinc-600 dark:text-zinc-400">
                {formatCurrency(sessionCostInfo.totalCost, true)}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-6">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#121215]/90 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 md:hidden px-3 py-1.5 shadow-xl">
        <div className="grid grid-cols-5 items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center py-1.5 rounded-lg transition-colors relative ${
                    isActive
                      ? 'text-zinc-900 dark:text-white font-semibold'
                      : 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                  }`
                }
              >
                <div className="relative">
                  <Icon className="w-4 h-4" />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  )}
                </div>
                <span className="text-[10px] mt-1">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* QR Scanner Modal */}
      <QRScannerModal
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
        mode="checkin"
      />
    </div>
  );
}
