import React, { useState } from 'react';
import { useParking } from '../../context/ParkingContext';
import { Button } from '../../components/common/Button';
import { formatCurrency } from '../../utils/formatters';

export function AdminPricing() {
  const { pricingRules, setPricingRules, showToast, selectedBuilding } = useParking();

  const [baseRate, setBaseRate] = useState(pricingRules.baseRate || 32);
  const [fixedPremium, setFixedPremium] = useState(pricingRules.fixedRatePremium || 10);
  const [lowDiscount, setLowDiscount] = useState(pricingRules.lowDemandDiscount || 20);
  const [highSurge, setHighSurge] = useState(pricingRules.highDemandSurge || 30);

  const previewLowRate = Math.round(baseRate * (1 - lowDiscount / 100));
  const previewNormalRate = baseRate;
  const previewHighRate = Math.round(baseRate * (1 + highSurge / 100));
  const previewFixedRate = Math.ceil(baseRate * (1 + fixedPremium / 100));

  const handleSave = (e) => {
    e.preventDefault();
    setPricingRules({
      baseRate,
      fixedRatePremium: fixedPremium,
      lowDemandDiscount: lowDiscount,
      highDemandSurge: highSurge,
      weekendSurge: 15,
      peakHourSurge: 10,
      peakHoursEnabled: true,
    });
    showToast('Pricing parameters updated.');
  };

  return (
    <div className="space-y-10 w-full">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider font-semibold">
          Pricing Control
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-zinc-900 dark:text-zinc-50">
          {selectedBuilding.name} Rates
        </h1>
      </div>

      {/* 3 Balanced Preview Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 space-y-1.5 shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all">
          <span className="text-[11px] font-mono uppercase text-zinc-500 font-semibold">Off-Peak Rate</span>
          <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
            {formatCurrency(previewLowRate)}<span className="text-xs font-normal text-zinc-400">/hr</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Low occupancy discount</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 space-y-1.5 shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all">
          <span className="text-[11px] font-mono uppercase text-zinc-500 font-semibold">Base Hourly</span>
          <div className="text-3xl font-extrabold font-mono text-zinc-900 dark:text-zinc-100">
            {formatCurrency(previewNormalRate)}<span className="text-xs font-normal text-zinc-400">/hr</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Standard operating rate</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 space-y-1.5 shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all">
          <span className="text-[11px] font-mono uppercase text-zinc-500 font-semibold">Fixed Rate Lock</span>
          <div className="text-3xl font-extrabold font-mono text-zinc-900 dark:text-zinc-100">
            {formatCurrency(previewFixedRate)}<span className="text-xs font-normal text-zinc-400">/hr</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Guaranteed stay rate</p>
        </div>
      </div>

      {/* Adjust Rates Form */}
      <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-card">
        <h2 className="text-xs font-bold font-mono uppercase text-zinc-900 dark:text-zinc-100 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          Adjust Parameters
        </h2>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <label className="text-zinc-700 dark:text-zinc-300 font-medium">Base Rate (?)</label>
                <span className="text-zinc-900 dark:text-zinc-100 font-bold">{formatCurrency(baseRate)}/hr</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                value={baseRate}
                onChange={(e) => setBaseRate(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-white"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <label className="text-zinc-700 dark:text-zinc-300 font-medium">Fixed Rate Premium (%)</label>
                <span className="text-zinc-900 dark:text-zinc-100 font-bold">+{fixedPremium}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={fixedPremium}
                onChange={(e) => setFixedPremium(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-white"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <label className="text-zinc-700 dark:text-zinc-300 font-medium">Low Demand Discount (%)</label>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">-{lowDiscount}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                value={lowDiscount}
                onChange={(e) => setLowDiscount(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <label className="text-zinc-700 dark:text-zinc-300 font-medium">Peak Demand Surge (%)</label>
                <span className="text-zinc-900 dark:text-zinc-100 font-bold">+{highSurge}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                value={highSurge}
                onChange={(e) => setHighSurge(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-white"
              />
            </div>

          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
            <Button type="submit" variant="primary" size="md">
              Save Pricing Settings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
