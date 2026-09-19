import React from 'react';
import { useParking } from '../../context/ParkingContext';
import { Parking3DGrid } from '../../components/3d/Parking3DGrid';
import { formatCurrency } from '../../utils/formatters';

export function AdminDashboard() {
  const { selectedBuilding, slots, adminSessions } = useParking();

  const activeSessions = adminSessions.filter(s => s.status === 'active');
  const availableSlotsTotal = slots.filter(s => s.status === 'available').length;
  const occupiedSlotsTotal = slots.filter(s => s.status === 'occupied').length;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-10 w-full">
      {/* Top Header */}
      <div className="space-y-1">
        <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider font-semibold">
          {greeting}, Operator
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-zinc-900 dark:text-zinc-50">
          {selectedBuilding.name}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          Public Operating Hours: {selectedBuilding.operatingHours}
        </p>
      </div>

      {/* 4 Clean Metric Blocks with Hover Elevation */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* AVAILABLE */}
        <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all">
          <div className="text-xs font-mono uppercase text-zinc-500 dark:text-zinc-400 tracking-wider font-semibold">
            Available Spaces
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mt-3">
            {availableSlotsTotal} <span className="text-sm font-normal text-zinc-400">/ {slots.length}</span>
          </div>
        </div>

        {/* OCCUPIED */}
        <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all">
          <div className="text-xs font-mono uppercase text-zinc-500 dark:text-zinc-400 tracking-wider font-semibold">
            Occupied Spaces
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-zinc-700 dark:text-zinc-300 mt-3">
            {occupiedSlotsTotal} <span className="text-sm font-normal text-zinc-400">/ {slots.length}</span>
          </div>
        </div>

        {/* ACTIVE SESSIONS */}
        <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all">
          <div className="text-xs font-mono uppercase text-zinc-500 dark:text-zinc-400 tracking-wider font-semibold">
            Active Sessions
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-zinc-900 dark:text-zinc-50 mt-3">
            {activeSessions.length}
          </div>
        </div>

        {/* TODAY'S REVENUE */}
        <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all">
          <div className="text-xs font-mono uppercase text-zinc-500 dark:text-zinc-400 tracking-wider font-semibold">
            Today's Earnings
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-zinc-900 dark:text-zinc-50 mt-3">
            {formatCurrency(2840)}
          </div>
        </div>

      </div>

      {/* LIVE PARKING GRID */}
      <div className="w-full">
        <Parking3DGrid />
      </div>

      {/* ACTIVE SESSIONS TABLE */}
      <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase font-mono tracking-wider">
            Active Parking Sessions
          </h3>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            {activeSessions.length} vehicles currently parked in facility
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800 text-zinc-500">
                <th className="pb-3 font-semibold">VEHICLE</th>
                <th className="pb-3 font-semibold">SPACE</th>
                <th className="pb-3 font-semibold">DURATION</th>
                <th className="pb-3 font-semibold">RATE MODEL</th>
                <th className="pb-3 font-semibold">ACCRUED AMOUNT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
              {adminSessions.slice(0, 6).map((s) => (
                <tr key={s.id} className="hover:bg-zinc-50 dark:hover:bg-[#18181B] transition-colors">
                  <td className="py-3.5 font-bold text-zinc-900 dark:text-zinc-100">{s.vehiclePlate}</td>
                  <td className="py-3.5 text-emerald-600 dark:text-emerald-400 font-bold">{s.slot}</td>
                  <td className="py-3.5 text-zinc-500 dark:text-zinc-400">{s.durationMinutes}m</td>
                  <td className="py-3.5 uppercase text-zinc-700 dark:text-zinc-300">{s.rateType} ({formatCurrency(s.currentRate)}/hr)</td>
                  <td className="py-3.5 font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(s.accruedAmount, true)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TODAY'S EARNINGS SUMMARY */}
      <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-card">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase font-mono tracking-wider">
          Revenue Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2 text-xs font-mono">
          <div className="p-4 bg-zinc-50 dark:bg-[#18181B] rounded-xl border border-zinc-200/60 dark:border-zinc-800">
            <span className="text-zinc-500 font-semibold">Gross Revenue</span>
            <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-1">{formatCurrency(2840, true)}</div>
          </div>
          <div className="p-4 bg-zinc-50 dark:bg-[#18181B] rounded-xl border border-zinc-200/60 dark:border-zinc-800">
            <span className="text-zinc-500 font-semibold">Total Vehicle Sessions</span>
            <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-1">18 sessions</div>
          </div>
          <div className="p-4 bg-zinc-50 dark:bg-[#18181B] rounded-xl border border-zinc-200/60 dark:border-zinc-800">
            <span className="text-zinc-500 font-semibold">Net Operator Payout</span>
            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1">{formatCurrency(2698, true)} (95%)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
