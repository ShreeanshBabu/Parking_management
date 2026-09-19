import React, { useState } from 'react';
import { useParking } from '../../context/ParkingContext';

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
          <span className="text-xs font-mono uppercase text-[#F7D6DC] tracking-wider font-semibold">
            Live Stream
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#FAF7F5]">
            Parking Sessions
          </h1>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search plate, user, slot..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72 px-3.5 py-2.5 bg-[#240812] text-xs font-mono rounded-lg border border-[rgba(247,214,220,0.12)] text-[#FAF7F5] placeholder-[#D1C7C9] focus:outline-none focus:border-[#B23C59]"
          />
        </div>
      </div>

      {/* Sessions Table */}
      <div className="bg-[#240812] border border-[rgba(247,214,220,0.1)] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#1A050C] border-b border-[rgba(247,214,220,0.08)] text-[#A8989C]">
              <tr>
                <th className="py-3.5 px-5 font-medium">VEHICLE</th>
                <th className="py-3.5 px-5 font-medium">DRIVER</th>
                <th className="py-3.5 px-5 font-medium">SLOT</th>
                <th className="py-3.5 px-5 font-medium">CHECK-IN</th>
                <th className="py-3.5 px-5 font-medium">DURATION</th>
                <th className="py-3.5 px-5 font-medium">RATE</th>
                <th className="py-3.5 px-5 font-medium">ACCRUED</th>
                <th className="py-3.5 px-5 font-medium">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(247,214,220,0.05)]">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-[#2E0B17]/60 transition-colors">
                  <td className="py-4 px-5 font-bold text-[#FAF7F5]">{s.vehiclePlate}</td>
                  <td className="py-4 px-5 text-[#D1C7C9]">{s.user}</td>
                  <td className="py-4 px-5 text-emerald-300 font-bold">{s.slot}</td>
                  <td className="py-4 px-5 text-[#D1C7C9]">{s.checkIn}</td>
                  <td className="py-4 px-5 text-[#FAF7F5]">{s.durationMinutes}m</td>
                  <td className="py-4 px-5 uppercase text-[#F7D6DC]">{s.rateType}</td>
                  <td className="py-4 px-5 font-bold text-[#FAF7F5]">₹{s.accruedAmount.toFixed(2)}</td>
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] ${
                      s.status === 'active'
                        ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                        : 'bg-[#1A050C] text-[#A8989C] border border-[rgba(247,214,220,0.06)]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.status === 'active' ? 'bg-emerald-400' : 'bg-zinc-400'}`} />
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