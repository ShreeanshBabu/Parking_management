import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../components/common/Button';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 lg:px-16 overflow-hidden">
      {/* 
        Full Viewport Cinematic Parking Background 
        With multi-stop deep wine translucent gradient overlay for high contrast readability
      */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(26, 5, 12, 0.78) 0%,
              rgba(36, 8, 18, 0.85) 45%,
              rgba(26, 5, 12, 0.96) 88%,
              #1A050C 100%
            ),
            url('https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=2070&auto=format&fit=crop')
          `
        }}
      />

      {/* Atmospheric vignette to center user focus */}
      <div className="absolute inset-0 z-0 bg-radial from-transparent via-[#1A050C]/30 to-[#1A050C]/90 pointer-events-none" />

      {/* Hero Content Architecture */}
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center space-y-8 pt-24 pb-16">
        
        {/* Eyebrow / Category Tag */}
        <div className="inline-block text-xs md:text-sm font-mono tracking-widest text-[#F7D6DC] uppercase">
          SHARED OFFICE PARKING PLATFORM
        </div>

        {/* Large Clear Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#FAF7F5] leading-[1.06] font-display">
          PARKING, WITHOUT
          <br />
          THE WAIT.
        </h1>

        {/* Short, Plain Explanation */}
        <p className="text-base sm:text-xl text-[#D1C7C9] max-w-2xl mx-auto leading-relaxed font-normal">
          Find available parking near you, choose your rate, and pay automatically when you leave.
        </p>

        {/* Primary & Secondary Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Button
            onClick={() => navigate('/app/home')}
            variant="primary"
            size="xl"
            icon={ArrowRight}
            iconPosition="right"
            className="w-full sm:w-auto px-8 py-4 text-base font-bold shadow-lg"
          >
            FIND PARKING
          </Button>

          <Button
            onClick={() => navigate('/admin/login')}
            variant="secondary"
            size="xl"
            className="w-full sm:w-auto px-8 py-4 text-base font-medium"
          >
            LIST YOUR SPACE
          </Button>
        </div>

      </div>

      {/* Scroll down indicator hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-xs font-mono text-[#A8989C]">
        <span>SCROLL TO EXPLORE</span>
        <div className="w-4 h-6 rounded-full border border-[rgba(247,214,220,0.2)] flex items-start justify-center p-1">
          <div className="w-1 h-1.5 rounded-full bg-[#F7D6DC] animate-bounce" />
        </div>
      </div>
    </section>
  );
}