import React from 'react';
import { useParking } from '../../context/ParkingContext';
import { Parking3DGrid } from '../../components/3d/Parking3DGrid';

export function AdminDashboard() {
  const { selectedBuilding, slots, adminSessions } = useParking();

  const activeSessions = adminSessions.filter(s => s.status === 'active');
  const availableSlotsTotal = slots.filter(s => s.status === 'available').length;
  const occupiedSlotsTotal = slots.filter(s => s.status === 'occupied').length;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-12 w-full">
      {/* Top Header */}
      <div className="space-y-1">
        <span className="text-xs font-mono uppercase text-[#F7D6DC] tracking-wider font-semibold">
          {greeting}, Operator
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#FAF7F5]">
          {selectedBuilding.name}
        </h1>
        <p className="text-xs sm:text-sm text-[#D1C7C9]">
          Public Operating Hours: {selectedBuilding.operatingHours}
        </p>
      </div>

      {/* 4 Clean Metric Blocks (Balanced 25% Split on Desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* AVAILABLE */}
        <div className="bg-[#240812] border border-[rgba(247,214,220,0.1)] rounded-xl p-6 shadow-sm">
          <div className="text-xs font-mono uppercase text-[#D1C7C9] tracking-wider">
            Available Spaces
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#FAF7F5] mt-3">
            {availableSlotsTotal} <span className="text-sm font-normal text-[#A8989C]">/ {slots.length}</span>
          </div>
        </div>

        {/* OCCUPIED */}
        <div className="bg-[#240812] border border-[rgba(247,214,220,0.1)] rounded-xl p-6 shadow-sm">
          <div className="text-xs font-mono uppercase text-[#D1C7C9] tracking-wider">
            Occupied Spaces
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#B23C59] mt-3">
            {occupiedSlotsTotal} <span className="text-sm font-normal text-[#A8989C]">/ {slots.length}</span>
          </div>
        </div>

        {/* ACTIVE SESSIONS */}
        <div className="bg-[#240812] border border-[rgba(247,214,220,0.1)] rounded-xl p-6 shadow-sm">
          <div className="text-xs font-mono uppercase text-[#D1C7C9] tracking-wider">
            Active Sessions
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#FAF7F5] mt-3">
            {activeSessions.length}
          </div>
        </div>

        {/* TODAY'S REVENUE */}
        <div className="bg-[#240812] border border-[rgba(247,214,220,0.1)] rounded-xl p-6 shadow-sm">
          <div className="text-xs font-mono uppercase text-[#D1C7C9] tracking-wider">
            Today's Earnings
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#FAF7F5] mt-3">
            ₹2,840
          </div>
        </div>

      </div>

      {/* LIVE PARKING GRID */}
      <div className="w-full">
        <Parking3DGrid />
      </div>

      {/* ACTIVE SESSIONS TABLE */}
      <div className="bg-[#240812] border border-[rgba(247,214,220,0.1)] rounded-xl p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[rgba(247,214,220,0.08)]">
          <h3 className="text-sm font-bold text-[#FAF7F5] uppercase font-mono tracking-wider">
            Active Parking Sessions
          </h3>
          <span className="text-xs font-mono text-[#D1C7C9]">
            {activeSessions.length} vehicles currently parked in facility
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[rgba(247,214,220,0.08)] text-[#A8989C]">
                <th className="pb-3 font-medium">VEHICLE</th>
                <th className="pb-3 font-medium">SPACE</th>
                <th className="pb-3 font-medium">DURATION</th>
                <th className="pb-3 font-medium">RATE MODEL</th>
                <th className="pb-3 font-medium">ACCRUED AMOUNT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(247,214,220,0.05)]">
              {adminSessions.slice(0, 6).map((s) => (
                <tr key={s.id} className="hover:bg-[#2E0B17]/60 transition-colors">
                  <td className="py-3.5 font-bold text-[#FAF7F5]">{s.vehiclePlate}</td>
                  <td className="py-3.5 text-emerald-300 font-bold">{s.slot}</td>
                  <td className="py-3.5 text-[#D1C7C9]">{s.durationMinutes}m</td>
                  <td className="py-3.5 uppercase text-[#F7D6DC]">{s.rateType} (₹{s.currentRate}/hr)</td>
                  <td className="py-3.5 font-bold text-[#FAF7F5]">₹{s.accruedAmount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TODAY'S EARNINGS SUMMARY */}
      <div className="bg-[#240812] border border-[rgba(247,214,220,0.1)] rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h3 className="text-sm font-bold text-[#FAF7F5] uppercase font-mono tracking-wider">
          Revenue Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2 text-xs font-mono">
          <div className="p-4 bg-[#1A050C] rounded-xl border border-[rgba(247,214,220,0.08)]">
            <span className="text-[#A8989C]">Gross Revenue</span>
            <div className="text-lg font-bold text-[#FAF7F5] mt-1">₹2,840.00</div>
          </div>
          <div className="p-4 bg-[#1A050C] rounded-xl border border-[rgba(247,214,220,0.08)]">
            <span className="text-[#A8989C]">Total Vehicle Sessions</span>
            <div className="text-lg font-bold text-[#FAF7F5] mt-1">18 sessions</div>
          </div>
          <div className="p-4 bg-[#1A050C] rounded-xl border border-[rgba(247,214,220,0.08)]">
            <span className="text-[#A8989C]">Net Operator Payout</span>
            <div className="text-lg font-bold text-emerald-300 mt-1">₹2,698.00 (95%)</div>
          </div>
        </div>
      </div>
    </div>
  );
}