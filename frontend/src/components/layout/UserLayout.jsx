import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Compass, Clock, Wallet, User, QrCode } from 'lucide-react';
import { useParking } from '../../context/ParkingContext';
import { QRScannerModal } from '../common/QRScannerModal';

export function UserLayout() {
  const { activeSession, startSession, sessionCostInfo } = useParking();
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
    <div className="min-h-screen bg-[#1A050C] text-[#FAF7F5] flex flex-col pb-20 md:pb-6">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#1A050C]/90 backdrop-blur-md border-b border-[rgba(247,214,220,0.08)] px-6 py-3.5">
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-7 h-7 rounded-md bg-[#8E2B44] flex items-center justify-center font-bold text-[#FAF7F5] text-xs group-hover:bg-[#B23C59] transition-colors">
              P
            </div>
            <div>
              <div className="text-xs font-bold tracking-tight text-[#FAF7F5] font-display">
                PARK SMART
              </div>
              <div className="text-[10px] text-[#A8989C]">
                Bangalore CBD
              </div>
            </div>
          </button>

          <button
            onClick={() => setIsQRScannerOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#8E2B44] hover:bg-[#B23C59] text-[#FAF7F5] text-xs font-semibold transition-all shadow-sm"
          >
            <QrCode className="w-4 h-4" />
            <span>Scan Gate</span>
          </button>
        </div>

        {/* Active Session Notification Sticky Banner */}
        {activeSession && location.pathname !== '/app/session' && (
          <div
            onClick={() => navigate('/app/session')}
            className="w-full max-w-5xl mx-auto mt-2.5 bg-[#2E0B17] border border-[#6D1D32] rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-[#380B18] transition-all"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#E07A94] animate-ping" />
              <div>
                <div className="text-xs font-bold text-[#FAF7F5]">
                  Active at {activeSession.buildingName} ({activeSession.slot})
                </div>
                <div className="text-[10px] text-[#D1C7C9]">
                  {activeSession.rateType === 'fixed' ? 'Fixed Rate' : 'Floating Rate'} • Ticking
                </div>
              </div>
            </div>
            <div className="text-right font-mono">
              <div className="text-xs font-bold text-[#FAF7F5]">
                {sessionCostInfo.formattedDuration}
              </div>
              <div className="text-[10px] text-[#A8989C]">
                ₹{sessionCostInfo.totalCost.toFixed(2)}
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
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#1E060D]/95 backdrop-blur-xl border-t border-[rgba(247,214,220,0.08)] md:hidden px-3 py-1.5 shadow-2xl">
        <div className="grid grid-cols-5 items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center py-1.5 rounded-lg transition-all relative ${
                    isActive
                      ? 'text-[#FAF7F5] font-semibold'
                      : 'text-[#A8989C] hover:text-[#FAF7F5]'
                  }`
                }
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E07A94] animate-pulse" />
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