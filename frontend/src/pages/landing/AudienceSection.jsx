import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Car, Building2 } from 'lucide-react';
import { Button } from '../../components/common/Button';

export function AudienceSection() {
  const navigate = useNavigate();

  const userBenefits = [
    'Find nearby availability without circling the block',
    'Choose between fixed predictable rates or dynamic discounts',
    'Start your session with a single contactless QR gate scan',
    'Pay automatically upon barrier exit with zero delay'
  ];

  const ownerBenefits = [
    'Make productive use of unused corporate stalls during off-hours',
    'Monitor live occupancy and active vehicles in real-time',
    'Manage rate parameters, surges, and access schedules',
    'Track automated earnings and direct settlement payouts'
  ];

  return (
    <section className="py-24 md:py-32 w-full border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090B] transition-colors">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase font-semibold">
            TWO-SIDED VALUE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-display">
            Built for commuters and property owners alike.
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
            Whether you need a reliable parking spot or own empty commercial bays, Park Smart provides the tools you need.
          </p>
        </div>

        {/* 2 Large Balanced Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* FOR DRIVERS */}
          <div className="p-8 sm:p-10 rounded-2xl bg-zinc-50 dark:bg-[#141418] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
                  For Commuters
                </span>
                <div className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 flex items-center justify-center text-zinc-900 dark:text-zinc-100 shadow-xs">
                  <Car className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-display">
                  FOR PARKING USERS
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  Guaranteed, convenient parking in verified commercial buildings.
                </p>
              </div>

              <ul className="space-y-3 pt-2 text-sm text-zinc-600 dark:text-zinc-300">
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

          {/* FOR RENTERS / BUILDING OWNERS */}
          <div className="p-8 sm:p-10 rounded-2xl bg-zinc-50 dark:bg-[#141418] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
                  For Facilities
                </span>
                <div className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 flex items-center justify-center text-zinc-900 dark:text-zinc-100 shadow-xs">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-display">
                  FOR RENTERS & OWNERS
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  Automated revenue from vacant off-hours basement parking.
                </p>
              </div>

              <ul className="space-y-3 pt-2 text-sm text-zinc-600 dark:text-zinc-300">
                {ownerBenefits.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
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
              className="self-start mt-4 font-semibold"
            >
              Continue as Renter
            </Button>
          </div>

        </div>

      </div>
    </section>
  );
}
