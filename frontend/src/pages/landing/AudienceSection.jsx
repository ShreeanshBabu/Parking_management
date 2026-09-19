import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../components/common/Button';

export function AudienceSection() {
  const navigate = useNavigate();

  return (
    <section id="for-buildings" className="py-32 w-full border-t border-[rgba(247,214,220,0.08)] bg-[#240812]">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 space-y-3">
          <div className="text-xs md:text-sm font-mono tracking-widest text-[#F7D6DC] uppercase">
            03 / FOR DRIVERS & BUILDINGS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#FAF7F5] font-display">
            Built for everyday urban mobility.
          </h2>
        </div>

        {/* 50% / 50% Balanced 2-Column Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          
          {/* DRIVERS (50%) */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#1A050C] border border-[rgba(247,214,220,0.1)] flex flex-col justify-between space-y-8 shadow-sm">
            <div className="space-y-5">
              <span className="text-xs font-mono uppercase text-[#F7D6DC] tracking-wider font-semibold">
                For Drivers
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FAF7F5] font-display leading-snug">
                Guaranteed spaces without circling the block.
              </h3>
              <p className="text-base text-[#D1C7C9] leading-relaxed">
                Access secure corporate parking garages that are otherwise closed to the public during off-hours.
              </p>

              <ul className="space-y-3 pt-2 text-sm text-[#D1C7C9]">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B23C59] shrink-0" />
                  <span>Real-time bay occupancy before you arrive</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B23C59] shrink-0" />
                  <span>Choice between Fixed or Floating hourly pricing</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B23C59] shrink-0" />
                  <span>Automated digital scan at entry and exit gates</span>
                </li>
              </ul>
            </div>

            <Button
              onClick={() => navigate('/app/home')}
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="self-start mt-4"
            >
              Explore Parking
            </Button>
          </div>

          {/* BUILDING OWNERS (50%) */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#1A050C] border border-[rgba(247,214,220,0.1)] flex flex-col justify-between space-y-8 shadow-sm">
            <div className="space-y-5">
              <span className="text-xs font-mono uppercase text-[#F7D6DC] tracking-wider font-semibold">
                For Building Owners
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FAF7F5] font-display leading-snug">
                Monetize vacant parking after business hours.
              </h3>
              <p className="text-base text-[#D1C7C9] leading-relaxed">
                Turn empty office basement stalls into an automated revenue stream during evenings, weekends, and holidays.
              </p>

              <ul className="space-y-3 pt-2 text-sm text-[#D1C7C9]">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B23C59] shrink-0" />
                  <span>Full control over operating windows and public access</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B23C59] shrink-0" />
                  <span>Dynamic yield optimization and surge management</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B23C59] shrink-0" />
                  <span>Hands-free billing and direct payouts</span>
                </li>
              </ul>
            </div>

            <Button
              onClick={() => navigate('/admin/login')}
              variant="secondary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="self-start mt-4"
            >
              Building Dashboard
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}