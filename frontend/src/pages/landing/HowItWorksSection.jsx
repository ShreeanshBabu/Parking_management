import React from 'react';
import { Search, Sliders, QrCode, CreditCard } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      tag: 'FIND',
      icon: Search,
      title: 'Find nearby parking.',
      desc: 'See live bay availability in verified commercial garages near your exact destination.'
    },
    {
      num: '02',
      tag: 'CHOOSE',
      icon: Sliders,
      title: 'Choose your rate.',
      desc: 'Lock in a Fixed hourly rate or choose Floating pricing for off-peak demand discounts.'
    },
    {
      num: '03',
      tag: 'PARK',
      icon: QrCode,
      title: 'Scan in & park.',
      desc: 'Scan the barrier QR code on entry to open the gate and start your automated session.'
    },
    {
      num: '04',
      tag: 'PAY',
      icon: CreditCard,
      title: 'Scan out & pay.',
      desc: 'Scan out at the barrier when leaving. Your session settles instantly from your balance.'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 w-full border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090B] transition-colors">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase font-semibold">
            HOW IT WORKS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-display">
            From empty space to parked in minutes.
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
            No paper slips, entry tokens, or ticket kiosks. A fully automated 4-step sequence.
          </p>
        </div>

        {/* 4 Connected Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-zinc-50 dark:bg-[#141418] border border-zinc-200 dark:border-zinc-800/90 shadow-sm space-y-5 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-zinc-500 tracking-wider">
                      STEP {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 flex items-center justify-center text-zinc-900 dark:text-zinc-100 shadow-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-display">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {step.desc}
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
