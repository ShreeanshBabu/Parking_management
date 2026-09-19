import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { HeroSection } from './HeroSection';
import { HowItWorksSection } from './HowItWorksSection';
import { AudienceSection } from './AudienceSection';
import { FixedFloatingSection } from './FixedFloatingSection';
import { FinalCTASection } from './FinalCTASection';

export function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-[#1A050C] text-[#FAF7F5] selection:bg-[#8E2B44] selection:text-white">
      <Navbar />
      
      <main className="w-full">
        <HeroSection />
        <HowItWorksSection />
        <AudienceSection />
        <FixedFloatingSection />
        <FinalCTASection />
      </main>

      {/* Clean, Full-Width Editorial Footer */}
      <footer className="border-t border-[rgba(247,214,220,0.08)] py-14 bg-[#140309] w-full">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-[#8E2B44] flex items-center justify-center font-bold text-white text-xs">
              P
            </div>
            <span className="text-sm font-semibold text-[#FAF7F5]">
              Park Smart
            </span>
          </div>

          <div className="text-xs font-mono text-[#A8989C]">
            Shared Office Parking Platform • Built for Urban Mobility
          </div>
        </div>
      </footer>
    </div>
  );
}