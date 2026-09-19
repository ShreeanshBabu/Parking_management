import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { HeroSection } from './HeroSection';
import { WhatWeDoSection } from './WhatWeDoSection';
import { HowItHelpsSection } from './HowItHelpsSection';
import { HowItWorksSection } from './HowItWorksSection';
import { FixedFloatingSection } from './FixedFloatingSection';
import { AudienceSection } from './AudienceSection';
import { FinalCTASection } from './FinalCTASection';
import { Footer } from '../../components/layout/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#09090B] text-zinc-900 dark:text-zinc-50 transition-colors flex flex-col">
      <Navbar />
      
      <main className="w-full flex-1">
        <HeroSection />
        <WhatWeDoSection />
        <HowItHelpsSection />
        <div id="how-it-works">
          <HowItWorksSection />
        </div>
        <div id="pricing">
          <FixedFloatingSection />
        </div>
        <AudienceSection />
        <FinalCTASection />
      </main>

      {/* Comprehensive Multi-Column Product Footer */}
      <Footer />
    </div>
  );
}
