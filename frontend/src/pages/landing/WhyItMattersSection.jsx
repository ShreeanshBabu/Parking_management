import React from 'react';
import { Check } from 'lucide-react';

export function WhyItMattersSection() {
  const userBenefits = [
    'Easier access to guaranteed available parking',
    'Transparent pricing with fixed or floating options',
    'Pay strictly for your actual parking duration',
    'Simple, contactless QR entry and exit'
  ];

  const ownerBenefits = [
    'Make productive use of vacant off-hours spaces',
    'Monitor live occupancy and active vehicles',
    'Manage rates, capacity, and operating schedules',
    'Generate reliable additional revenue automatically'
  ];

  return (
    <section className="py-24 md:py-32 w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#121215] transition-colors">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase font-semibold">
            WHY IT MATTERS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-display">
            A practical solution for both sides.
          </h2>
        </div>

        {/* 2 Balanced Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* USERS */}
          <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800/80 space-y-6 shadow-sm">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold block mb-2">
                For Parking Users
              </span>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-display">
                Fast, reliable parking when you arrive.
              </h3>
            </div>

            <ul className="space-y-3.5 text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
              {userBenefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5 text-zinc-900 dark:text-zinc-100">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RENTERS / OWNERS */}
          <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800/80 space-y-6 shadow-sm">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold block mb-2">
                For Renters & Parking Owners
              </span>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-display">
                Turn vacant spaces into automated earnings.
              </h3>
            </div>

            <ul className="space-y-3.5 text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
              {ownerBenefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5 text-zinc-900 dark:text-zinc-100">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
