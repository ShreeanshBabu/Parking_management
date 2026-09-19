import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Grid,
  ListOrdered,
  Sliders,
  TrendingUp,
  Settings,
  LogOut
} from 'lucide-react';
import { useParking } from '../../context/ParkingContext';
import { useAuth } from '../../context/AuthContext';

export function AdminSidebar() {
  const { selectedBuilding, setSelectedBuildingId, buildings } = useParking();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/parking', label: 'Parking', icon: Grid },
    { to: '/admin/sessions', label: 'Sessions', icon: ListOrdered },
    { to: '/admin/pricing', label: 'Pricing', icon: Sliders },
    { to: '/admin/earnings', label: 'Earnings', icon: TrendingUp },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <aside className="w-56 bg-[#1B060C] border-r border-[rgba(247,214,220,0.08)] flex flex-col justify-between p-4 shrink-0">
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-7 h-7 rounded-md bg-[#8E2B44] flex items-center justify-center text-[#FDF2F4] font-bold text-xs">
            P
          </div>
          <div>
            <div className="text-xs font-bold tracking-tight text-[#FDF2F4] font-display">
              PARK SMART
            </div>
            <div className="text-[10px] text-[#C5A5AC]">
              Facility Admin
            </div>
          </div>
        </div>

        {/* Building Selector */}
        <div className="px-1">
          <label className="text-[10px] uppercase font-mono text-[#C5A5AC] block mb-1">
            Facility
          </label>
          <select
            value={selectedBuilding.id}
            onChange={(e) => setSelectedBuildingId(e.target.value)}
            className="w-full bg-[#120306] text-xs text-[#FDF2F4] p-2 rounded-lg border border-[rgba(247,214,220,0.1)] focus:outline-none focus:border-[#8E2B44]"
          >
            {buildings.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#8E2B44] text-[#FDF2F4]'
                      : 'text-[#C5A5AC] hover:text-[#FDF2F4] hover:bg-[#240911]'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Log Out */}
      <div className="pt-4 border-t border-[rgba(247,214,220,0.08)] space-y-1">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#C5A5AC] hover:text-[#FDF2F4] hover:bg-[#240911] transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}