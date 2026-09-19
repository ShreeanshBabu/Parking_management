import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useParking } from '../../context/ParkingContext';
import { HOURLY_REVENUE_DATA } from '../../services/mockData';

export function AdminEarnings() {
  const { selectedBuilding } = useParking();

  return (
    <div className="space-y-10 w-full">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-mono uppercase text-[#F7D6DC] tracking-wider font-semibold">
          Financial Summary
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#FAF7F5]">
          {selectedBuilding.name} Earnings
        </h1>
      </div>

      {/* 3 Metric Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-xl bg-[#240812] border border-[rgba(247,214,220,0.1)] space-y-1.5 shadow-sm">
          <span className="text-[11px] font-mono uppercase text-[#A8989C]">Today's Revenue</span>
          <div className="text-3xl font-extrabold font-mono text-[#FAF7F5]">
            ₹8,420
          </div>
        </div>

        <div className="p-6 rounded-xl bg-[#240812] border border-[rgba(247,214,220,0.1)] space-y-1.5 shadow-sm">
          <span className="text-[11px] font-mono uppercase text-[#A8989C]">Weekly Aggregate</span>
          <div className="text-3xl font-extrabold font-mono text-[#FAF7F5]">
            ₹64,340
          </div>
        </div>

        <div className="p-6 rounded-xl bg-[#240812] border border-[rgba(247,214,220,0.1)] space-y-1.5 shadow-sm">
          <span className="text-[11px] font-mono uppercase text-[#A8989C]">Net Operator Payout (95%)</span>
          <div className="text-3xl font-extrabold font-mono text-emerald-300">
            ₹61,123
          </div>
        </div>
      </div>

      {/* Hourly Trend Chart */}
      <div className="bg-[#240812] border border-[rgba(247,214,220,0.1)] rounded-xl p-6 sm:p-8 space-y-5 shadow-sm">
        <h2 className="text-xs font-bold font-mono uppercase text-[#FAF7F5]">
          24-Hour Revenue Trend
        </h2>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={HOURLY_REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="hour" stroke="#D1C7C9" fontSize={11} fontMono tickLine={false} />
              <YAxis stroke="#D1C7C9" fontSize={11} fontMono tickLine={false} tickFormatter={(v) => `₹${v}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#240812',
                  borderColor: 'rgba(247,214,220,0.15)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  color: '#FAF7F5',
                }}
                formatter={(value) => [`₹${value}`, 'Revenue']}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#B23C59"
                strokeWidth={2}
                fill="#4B0F1E"
                fillOpacity={0.4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}