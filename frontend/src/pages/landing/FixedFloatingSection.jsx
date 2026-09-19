import React from 'react';

export function FixedFloatingSection() {
  return (
    <section id="rates" className="py-32 w-full border-t border-[rgba(247,214,220,0.08)] bg-[#1A050C]">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 space-y-3">
          <div className="text-xs md:text-sm font-mono tracking-widest text-[#F7D6DC] uppercase">
            04 / RATE MODELS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#FAF7F5] font-display">
            Fixed vs. Floating.
          </h2>
          <p className="text-base sm:text-lg text-[#D1C7C9] leading-relaxed">
            Choose predictable locked rates or take advantage of lower prices when demand is calm.
          </p>
        </div>

        {/* 50% / 50% Balanced Rate Models */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* FIXED (50%) */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#240812] border border-[rgba(247,214,220,0.1)] space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase text-[#F7D6DC] tracking-wider block">
                Option A
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FAF7F5] font-display">
                Fixed Rate
              </h3>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#FAF7F5]">
                ₹35<span className="text-sm font-normal text-[#D1C7C9]"> / hour</span>
              </div>
              <p className="text-sm sm:text-base text-[#D1C7C9] leading-relaxed pt-2">
                Your hourly rate is locked at entry and never changes during your stay, regardless of peak surges or incoming traffic.
              </p>
            </div>

            <div className="pt-6 border-t border-[rgba(247,214,220,0.1)] text-xs font-mono text-[#A8989C]">
              Ideal for long office days and scheduled appointments.
            </div>
          </div>

          {/* FLOATING (50%) */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#240812] border border-[rgba(247,214,220,0.1)] space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase text-[#F7D6DC] tracking-wider block">
                Option B
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FAF7F5] font-display">
                Floating Rate
              </h3>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#F7D6DC]">
                ₹28–32<span className="text-sm font-normal text-[#D1C7C9]"> / hour</span>
              </div>
              <p className="text-sm sm:text-base text-[#D1C7C9] leading-relaxed pt-2">
                Your rate adjusts dynamically according to building occupancy. When lots of stalls are open, rates drop so you pay less.
              </p>
            </div>

            <div className="pt-6 border-t border-[rgba(247,214,220,0.1)] text-xs font-mono text-[#A8989C]">
              Ideal for quick stops, off-peak evenings, and maximum savings.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}