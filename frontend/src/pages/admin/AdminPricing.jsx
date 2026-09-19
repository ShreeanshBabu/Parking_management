import React, { useState } from 'react';
import { useParking } from '../../context/ParkingContext';
import { Button } from '../../components/common/Button';

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
        <span className="text-xs font-mono uppercase text-[#F7D6DC] tracking-wider font-semibold">
          Pricing Control
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#FAF7F5]">
          {selectedBuilding.name} Rates
        </h1>
      </div>

      {/* 3 Balanced Preview Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-xl bg-[#240812] border border-[rgba(247,214,220,0.1)] space-y-1.5 shadow-sm">
          <span className="text-[11px] font-mono uppercase text-[#A8989C]">Off-Peak Rate</span>
          <div className="text-3xl font-extrabold font-mono text-emerald-300">
            ₹{previewLowRate}<span className="text-xs font-normal text-[#D1C7C9]">/hr</span>
          </div>
          <p className="text-xs text-[#D1C7C9]">Low occupancy discount</p>
        </div>

        <div className="p-6 rounded-xl bg-[#240812] border border-[rgba(247,214,220,0.1)] space-y-1.5 shadow-sm">
          <span className="text-[11px] font-mono uppercase text-[#A8989C]">Base Hourly</span>
          <div className="text-3xl font-extrabold font-mono text-[#FAF7F5]">
            ₹{previewNormalRate}<span className="text-xs font-normal text-[#D1C7C9]">/hr</span>
          </div>
          <p className="text-xs text-[#D1C7C9]">Standard operating rate</p>
        </div>

        <div className="p-6 rounded-xl bg-[#240812] border border-[rgba(247,214,220,0.1)] space-y-1.5 shadow-sm">
          <span className="text-[11px] font-mono uppercase text-[#A8989C]">Fixed Rate Lock</span>
          <div className="text-3xl font-extrabold font-mono text-[#F7D6DC]">
            ₹{previewFixedRate}<span className="text-xs font-normal text-[#D1C7C9]">/hr</span>
          </div>
          <p className="text-xs text-[#D1C7C9]">Guaranteed stay rate</p>
        </div>
      </div>

      {/* Adjust Rates Form */}
      <div className="bg-[#240812] border border-[rgba(247,214,220,0.1)] rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
        <h2 className="text-xs font-bold font-mono uppercase text-[#FAF7F5] pb-4 border-b border-[rgba(247,214,220,0.08)]">
          Adjust Parameters
        </h2>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <label className="text-[#D1C7C9]">Base Rate (₹)</label>
                <span className="text-[#FAF7F5] font-bold">₹{baseRate}/hr</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                value={baseRate}
                onChange={(e) => setBaseRate(Number(e.target.value))}
                className="w-full h-1.5 bg-[#1A050C] rounded-lg appearance-none cursor-pointer accent-[#B23C59]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <label className="text-[#D1C7C9]">Fixed Rate Premium (%)</label>
                <span className="text-[#F7D6DC] font-bold">+{fixedPremium}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={fixedPremium}
                onChange={(e) => setFixedPremium(Number(e.target.value))}
                className="w-full h-1.5 bg-[#1A050C] rounded-lg appearance-none cursor-pointer accent-[#B23C59]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <label className="text-[#D1C7C9]">Low Demand Discount (%)</label>
                <span className="text-emerald-300 font-bold">-{lowDiscount}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                value={lowDiscount}
                onChange={(e) => setLowDiscount(Number(e.target.value))}
                className="w-full h-1.5 bg-[#1A050C] rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <label className="text-[#D1C7C9]">Peak Demand Surge (%)</label>
                <span className="text-[#F7D6DC] font-bold">+{highSurge}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                value={highSurge}
                onChange={(e) => setHighSurge(Number(e.target.value))}
                className="w-full h-1.5 bg-[#1A050C] rounded-lg appearance-none cursor-pointer accent-[#B23C59]"
              />
            </div>

          </div>

          <div className="pt-4 border-t border-[rgba(247,214,220,0.08)] flex justify-end">
            <Button type="submit" variant="primary" size="md">
              Save Pricing Settings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}