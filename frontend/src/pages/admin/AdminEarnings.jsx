import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useParking } from '../../context/ParkingContext';
import { useTheme } from '../../context/ThemeContext';
import { HOURLY_REVENUE_DATA } from '../../services/mockData';
import { formatCurrency } from '../../utils/formatters';

export function AdminEarnings() {
  const { selectedBuilding } = useParking();
  const { isDark } = useTheme();

  return (
    <div className="space-y-10 w-full">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider font-semibold">
          Financial Summary
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-zinc-900 dark:text-zinc-50">
          {selectedBuilding.name} Earnings
        </h1>
      </div>

      {/* 3 Metric Blocks with Card Hover */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 space-y-1.5 shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all">
          <span className="text-[11px] font-mono uppercase text-zinc-500 font-semibold">Today's Revenue</span>
          <div className="text-3xl font-extrabold font-mono text-zinc-900 dark:text-zinc-100">
            {formatCurrency(8420)}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 space-y-1.5 shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all">
          <span className="text-[11px] font-mono uppercase text-zinc-500 font-semibold">Weekly Aggregate</span>
          <div className="text-3xl font-extrabold font-mono text-zinc-900 dark:text-zinc-100">
            {formatCurrency(64340)}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 space-y-1.5 shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all">
          <span className="text-[11px] font-mono uppercase text-zinc-500 font-semibold">Net Operator Payout (95%)</span>
          <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
            {formatCurrency(61123)}
          </div>
        </div>
      </div>

      {/* Hourly Trend Chart */}
      <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-card">
        <h2 className="text-xs font-bold font-mono uppercase text-zinc-900 dark:text-zinc-100">
          24-Hour Revenue Trend
        </h2>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={HOURLY_REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="hour" stroke={isDark ? '#71717A' : '#A1A1AA'} fontSize={11} tickLine={false} />
              <YAxis stroke={isDark ? '#71717A' : '#A1A1AA'} fontSize={11} tickLine={false} tickFormatter={(v) => `?${v}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#18181B' : '#FFFFFF',
                  borderColor: isDark ? '#27272A' : '#E4E4E7',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  color: isDark ? '#FAFAFA' : '#09090B',
                }}
                formatter={(value) => [`?${value}`, 'Revenue']}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={isDark ? '#FAFAFA' : '#09090B'}
                strokeWidth={2}
                fill={isDark ? '#27272A' : '#E4E4E7'}
                fillOpacity={0.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
