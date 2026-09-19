import React from 'react';
import { Lock, TrendingDown, Check } from 'lucide-react';

export function FixedFloatingSection() {
  return (
    <section className="py-24 md:py-32 w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#121215] transition-colors">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase font-semibold">
            PRICING OPTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-display">
            Fixed vs. Floating Rates.
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
            Choose predictable locked pricing or take advantage of lower rates when demand is calm.
          </p>
        </div>

        {/* 2 Balanced Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* FIXED RATE */}
          <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
                  Option 01
                </span>
                <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100 shadow-xs">
                  <Lock className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-display">
                  Fixed Rate
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  Lock your hourly rate upon gate check-in.
                </p>
              </div>

              <div className="text-4xl font-extrabold font-mono text-zinc-900 dark:text-zinc-50">
                ₹35<span className="text-sm font-normal text-zinc-500"> / hour</span>
              </div>

              <ul className="space-y-3 pt-2 text-sm text-zinc-600 dark:text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Guaranteed constant rate regardless of peak traffic surges</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Total cost predictability for business meetings and full workdays</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Zero surprise surge fees if you stay longer than planned</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              Best for: All-day office parking & scheduled commitments
            </div>
          </div>

          {/* FLOATING RATE */}
          <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
                  Option 02
                </span>
                <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100 shadow-xs">
                  <TrendingDown className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-display">
                  Floating Rate
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  Follow live building demand and save when capacity is open.
                </p>
              </div>

              <div className="text-4xl font-extrabold font-mono text-zinc-900 dark:text-zinc-50">
                ₹28–₹32<span className="text-sm font-normal text-zinc-500"> / hour</span>
              </div>

              <ul className="space-y-3 pt-2 text-sm text-zinc-600 dark:text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Dynamic yield pricing adjusting with live garage occupancy</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Save significantly during off-peak evenings, weekends & low demand</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Fair market rate tracking calculated per minute</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              Best for: Off-peak hours, quick stops & maximum savings
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
