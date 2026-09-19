import React from 'react';
import { Layers, ShieldCheck, Zap } from 'lucide-react';

export function WhatWeAreBuildingSection() {
  const highlights = [
    {
      icon: Layers,
      title: 'Unlocking Hidden Inventory',
      desc: 'Prime office buildings and commercial tech parks have hundreds of vacant parking bays during off-hours, evenings, and weekends.'
    },
    {
      icon: Zap,
      title: 'Real-Time Automation',
      desc: 'Smart digital gates with instant QR check-in and checkout eliminate the need for paper tickets, attendants, or payment kiosks.'
    },
    {
      icon: ShieldCheck,
      title: 'Guaranteed & Secure',
      desc: 'Every listed facility is verified with 24/7 security, clear signage, and dedicated bays reserved directly through the platform.'
    }
  ];

  return (
    <section className="py-24 md:py-32 w-full border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#121217] transition-colors">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs md:text-sm font-mono tracking-widest text-[#8E2B44] dark:text-[#F7D6DC] uppercase font-semibold">
            01 / WHAT WE ARE BUILDING
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-display">
            Transforming idle urban parking into accessible spaces.
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed pt-2">
            Millions of parking spaces in office towers sit empty while drivers circle downtown streets looking for a spot. Park Smart bridges this gap with an automated, shared mobility infrastructure.
          </p>
        </div>

        {/* 3 Balanced Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white dark:bg-[#1A1A22] border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[#8E2B44] dark:text-[#F7D6DC]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-display">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.desc}
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
