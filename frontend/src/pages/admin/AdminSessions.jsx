import React, { useState } from 'react';
import { useParking } from '../../context/ParkingContext';
import { formatCurrency } from '../../utils/formatters';

export function AdminSessions() {
  const { adminSessions } = useParking();
  const [search, setSearch] = useState('');

  const filtered = adminSessions.filter(s => {
    return s.user.toLowerCase().includes(search.toLowerCase()) ||
           s.vehiclePlate.toLowerCase().includes(search.toLowerCase()) ||
           s.slot.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider font-semibold">
            Live Stream
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-zinc-900 dark:text-zinc-50">
            Parking Sessions
          </h1>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search plate, user, slot..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72 px-3.5 py-2.5 bg-white dark:bg-[#121215] text-xs font-mono rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 shadow-xs"
          />
        </div>
      </div>

      {/* Sessions Table */}
      <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-50 dark:bg-[#18181B] border-b border-zinc-200 dark:border-zinc-800 text-zinc-500">
              <tr>
                <th className="py-3.5 px-5 font-semibold">VEHICLE</th>
                <th className="py-3.5 px-5 font-semibold">DRIVER</th>
                <th className="py-3.5 px-5 font-semibold">SLOT</th>
                <th className="py-3.5 px-5 font-semibold">CHECK-IN</th>
                <th className="py-3.5 px-5 font-semibold">DURATION</th>
                <th className="py-3.5 px-5 font-semibold">RATE</th>
                <th className="py-3.5 px-5 font-semibold">ACCRUED</th>
                <th className="py-3.5 px-5 font-semibold">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-zinc-50 dark:hover:bg-[#18181B] transition-colors">
                  <td className="py-4 px-5 font-bold text-zinc-900 dark:text-zinc-100">{s.vehiclePlate}</td>
                  <td className="py-4 px-5 text-zinc-600 dark:text-zinc-400">{s.user}</td>
                  <td className="py-4 px-5 text-emerald-600 dark:text-emerald-400 font-bold">{s.slot}</td>
                  <td className="py-4 px-5 text-zinc-500">{s.checkIn}</td>
                  <td className="py-4 px-5 text-zinc-900 dark:text-zinc-100">{s.durationMinutes}m</td>
                  <td className="py-4 px-5 uppercase text-zinc-700 dark:text-zinc-300">{s.rateType}</td>
                  <td className="py-4 px-5 font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(s.accruedAmount, true)}</td>
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] ${
                      s.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.status === 'active' ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
                      <span className="capitalize">{s.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
