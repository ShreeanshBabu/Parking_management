import React from 'react';
import { Clock, CreditCard, Sparkles } from 'lucide-react';

export function WhatWeDoSection() {
  const points = [
    {
      icon: Clock,
      tag: 'AVAILABLE WHEN NEEDED',
      title: 'Off-Peak Capacity Unlocked',
      desc: 'Corporate office parking becomes accessible during otherwise empty off-hours, weekends, and holidays.'
    },
    {
      icon: CreditCard,
      tag: 'PAY FOR WHAT YOU USE',
      title: 'Minute-by-Minute Billing',
      desc: 'No expensive full-day commitments or parking meters. Settle payments automatically upon barrier checkout.'
    },
    {
      icon: Sparkles,
      tag: 'ONE UNIFIED PLATFORM',
      title: 'End-to-End Automation',
      desc: 'Commuters discover and park. Facility owners monitor capacity. Digital gates handle security and access.'
    }
  ];

  return (
    <section className="py-24 md:py-32 w-full border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#121215] transition-colors">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase font-semibold">
            WHAT WE DO
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-display">
            Turning unused parking into useful space.
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
            Office buildings and private parking structures often have hundreds of bays sitting completely empty during off-demand periods. Park Smart connects that unused capacity directly with commuters who need convenient, guaranteed parking.
          </p>
        </div>

        {/* 3 Balanced Visual Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white dark:bg-[#18181B] border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all hover:border-zinc-300 dark:hover:border-zinc-700 space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1">
                      {pt.tag}
                    </span>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-display">
                      {pt.title}
                    </h3>
                  </div>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
