import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useParking } from '../../context/ParkingContext';
import { Button } from '../../components/common/Button';

export function Profile() {
  const { user, updateVehicle } = useAuth();
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

  return (
    <div className="space-y-6 pb-6 w-full">
      {/* Profile Header */}
      <div className="flex items-center gap-3.5">
        <div className="w-14 h-14 rounded-xl bg-[#8E2B44] flex items-center justify-center text-[#FAF7F5] text-xl font-bold font-mono shadow-sm">
          SM
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#FAF7F5]">
            {user?.name || 'Surya M.'}
          </h1>
          <p className="text-xs text-[#D1C7C9] font-mono">
            {user?.email || 'surya.m@parksmart.io'}
          </p>
        </div>
      </div>

      {/* Vehicle Registration Card */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#240812] border border-[rgba(247,214,220,0.1)] space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(247,214,220,0.08)]">
          <h2 className="text-xs font-bold font-mono uppercase text-[#FAF7F5]">
            Vehicle Registration
          </h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs font-mono text-[#F7D6DC] hover:underline"
          >
            {isEditing ? 'Cancel' : 'Edit Plate'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSaveVehicle} className="space-y-3.5 text-xs font-mono">
            <div>
              <label className="text-[#D1C7C9] block mb-1">License Plate Number</label>
              <input
                type="text"
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                className="w-full p-2.5 bg-[#1A050C] rounded-lg border border-[rgba(247,214,220,0.12)] text-[#FAF7F5] font-bold"
              />
            </div>
            <div>
              <label className="text-[#D1C7C9] block mb-1">Vehicle Model</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full p-2.5 bg-[#1A050C] rounded-lg border border-[rgba(247,214,220,0.12)] text-[#FAF7F5]"
              />
            </div>
            <Button variant="primary" size="md" type="submit" className="w-full font-bold">
              Save Changes
            </Button>
          </form>
        ) : (
          <div className="space-y-2.5 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-[rgba(247,214,220,0.04)]">
              <span className="text-[#D1C7C9]">Plate Number:</span>
              <span className="font-bold text-[#FAF7F5] bg-[#1A050C] px-2.5 py-0.5 rounded border border-[rgba(247,214,220,0.08)]">
                {user?.vehiclePlate || 'KA 01 MJ 7291'}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#D1C7C9]">Vehicle Model:</span>
              <span className="text-[#FAF7F5] font-medium">{user?.vehicleModel || 'Tesla Model 3'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Switch to Admin */}
      <div
        onClick={() => navigate('/admin/login')}
        className="p-5 rounded-xl bg-[#240812] border border-[rgba(247,214,220,0.1)] hover:border-[#B23C59] transition-all cursor-pointer flex items-center justify-between text-xs shadow-sm"
      >
        <div>
          <div className="font-bold text-[#FAF7F5]">
            Building Operator Portal
          </div>
          <div className="text-[11px] text-[#D1C7C9]">
            Switch to facility operations control
          </div>
        </div>
        <span className="text-[#F7D6DC] font-mono text-sm">→</span>
      </div>
    </div>
  );
}