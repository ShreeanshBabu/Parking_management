import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useParking } from '../../context/ParkingContext';
import { Button } from '../../components/common/Button';
import { LogOut, ArrowRight, Building2 } from 'lucide-react';

export function Profile() {
  const { user, updateVehicle, logout } = useAuth();
  const { showToast } = useParking();
  const navigate = useNavigate();

  const [plate, setPlate] = useState(user?.vehiclePlate || 'KA 01 MJ 7291');
  const [model, setModel] = useState(user?.vehicleModel || 'Tesla Model 3');
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveVehicle = (e) => {
    e.preventDefault();
    updateVehicle(plate, model);
    setIsEditing(false);
    showToast('Vehicle details saved for fast barrier access.');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="space-y-6 pb-6 w-full">
      {/* Profile Header */}
      <div className="flex items-center gap-3.5">
        <div className="w-14 h-14 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 flex items-center justify-center text-xl font-bold font-mono shadow-sm">
          SM
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 font-display">
            {user?.name || 'Surya M.'}
          </h1>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono">
            {user?.email || 'surya.m@parksmart.io'}
          </p>
        </div>
      </div>

      {/* Vehicle Registration Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-card hover:shadow-elevated transition-all">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <h2 className="text-xs font-bold font-mono uppercase text-zinc-900 dark:text-zinc-100">
            Vehicle Registration
          </h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:underline font-semibold"
          >
            {isEditing ? 'Cancel' : 'Edit Plate'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSaveVehicle} className="space-y-3.5 text-xs font-mono">
            <div>
              <label className="text-zinc-600 dark:text-zinc-400 block mb-1 font-semibold">License Plate Number</label>
              <input
                type="text"
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                className="w-full p-2.5 bg-zinc-50 dark:bg-[#18181B] rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-bold focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="text-zinc-600 dark:text-zinc-400 block mb-1 font-semibold">Vehicle Model</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full p-2.5 bg-zinc-50 dark:bg-[#18181B] rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>
            <Button variant="primary" size="md" type="submit" className="w-full font-bold">
              Save Changes
            </Button>
          </form>
        ) : (
          <div className="space-y-2.5 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
              <span className="text-zinc-600 dark:text-zinc-400">Plate Number:</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-[#18181B] px-2.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
                {user?.vehiclePlate || 'KA 01 MJ 7291'}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-zinc-600 dark:text-zinc-400">Vehicle Model:</span>
              <span className="text-zinc-900 dark:text-zinc-100 font-medium">{user?.vehicleModel || 'Tesla Model 3'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Switch to Renter & Sign Out */}
      <div className="space-y-3">
        <div
          onClick={() => navigate('/admin/dashboard')}
          className="p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors cursor-pointer flex items-center justify-between text-xs shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-zinc-900 dark:text-zinc-100">
                Renter & Facility Portal
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Switch to facility operations control
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-500" />
        </div>

        <Button
          onClick={handleLogout}
          variant="outline"
          size="md"
          icon={LogOut}
          className="w-full text-zinc-600 dark:text-zinc-400"
        >
          Sign Out of Account
        </Button>
      </div>
    </div>
  );
}
