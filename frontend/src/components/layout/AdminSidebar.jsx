import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Grid,
  ListOrdered,
  Sliders,
  TrendingUp,
  Settings,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import { useParking } from '../../context/ParkingContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export function AdminSidebar() {
  const { selectedBuilding, setSelectedBuildingId, buildings } = useParking();
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const links = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/parking', label: 'Parking Bays', icon: Grid },
    { to: '/admin/sessions', label: 'Live Sessions', icon: ListOrdered },
    { to: '/admin/pricing', label: 'Rate Engine', icon: Sliders },
    { to: '/admin/earnings', label: 'Earnings', icon: TrendingUp },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-60 bg-white dark:bg-[#121215] border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between p-4 shrink-0 transition-colors">
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center justify-between px-2">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 flex items-center justify-center font-bold text-xs shadow-xs">
              P
            </div>
            <div>
              <div className="text-xs font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-display">
                PARK SMART
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                Renter Operations
              </div>
            </div>
          </Link>

          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-zinc-200" /> : <Moon className="w-3.5 h-3.5 text-zinc-700" />}
          </button>
        </div>

        {/* Building Selector */}
        <div className="px-1">
          <label className="text-[10px] uppercase font-mono text-zinc-500 dark:text-zinc-400 block mb-1">
            Managed Facility
          </label>
          <select
            value={selectedBuilding.id}
            onChange={(e) => setSelectedBuildingId(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-[#18181B] text-xs text-zinc-900 dark:text-zinc-100 p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-zinc-500"
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
                  `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
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
      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-1">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
