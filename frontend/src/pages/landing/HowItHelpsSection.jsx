import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';

export function HowItHelpsSection() {
  const navigate = useNavigate();

  const userBenefits = [
    'Guaranteed bay reservations without circling the block',
    'Choice between Fixed locked rates and Floating off-peak discounts',
    'Contactless gate entry with fast digital QR check-in',
    'Real-time stay timer and automated digital payment on exit'
  ];

  const ownerBenefits = [
    'Turn empty office stalls into passive revenue during off-hours',
    'Automated gate barrier integration with zero staffing required',
    'Live dashboard tracking occupancy, active vehicles, and revenue',
    'Dynamic surge pricing tools and customizable operational schedules'
  ];

  return (
    <section className="py-24 md:py-32 w-full border-t border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#0F0F12] transition-colors">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs md:text-sm font-mono tracking-widest text-[#18181B] dark:text-[#E4E4E7] uppercase font-semibold">
            02 / HOW IT HELPS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-display">
            Built for drivers and property managers alike.
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed pt-2">
            A two-sided platform providing reliable parking for commuters while driving new revenue streams for commercial buildings.
          </p>
        </div>

        {/* 50% / 50% Balanced 2-Column Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* USERS (50%) */}
          <div className="p-8 sm:p-10 rounded-2xl bg-zinc-50 dark:bg-[#16161C] border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-8 shadow-sm">
            <div className="space-y-5">
              <span className="text-xs font-mono uppercase text-[#18181B] dark:text-[#E4E4E7] tracking-wider font-bold">
                For Parking Users
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 font-display leading-snug">
                Predictable, stress-free urban parking.
              </h3>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Access secure corporate parking garages that are otherwise closed to the public, with clear rates and instant gate entry.
              </p>

              <ul className="space-y-3 pt-2 text-sm text-zinc-700 dark:text-zinc-300">
                {userBenefits.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              onClick={() => navigate('/login')}
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="self-start mt-4 font-semibold"
            >
              Continue as User
            </Button>
          </div>

          {/* RENTERS / SPACE OWNERS (50%) */}
          <div className="p-8 sm:p-10 rounded-2xl bg-zinc-50 dark:bg-[#16161C] border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-8 shadow-sm">
            <div className="space-y-5">
              <span className="text-xs font-mono uppercase text-[#18181B] dark:text-[#E4E4E7] tracking-wider font-bold">
                For Renters & Space Owners
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 font-display leading-snug">
                Effortless monetization of vacant spaces.
              </h3>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Turn empty office basement stalls into an automated revenue stream during evenings, weekends, and holidays with zero friction.
              </p>

              <ul className="space-y-3 pt-2 text-sm text-zinc-700 dark:text-zinc-300">
                {ownerBenefits.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#18181B] dark:text-[#E4E4E7] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              onClick={() => navigate('/login')}
              variant="secondary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="self-start mt-4 font-semibold border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            >
              Continue as Renter
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
