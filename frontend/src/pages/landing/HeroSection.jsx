import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Building2, Car, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/common/Button';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[94vh] w-full flex flex-col justify-center items-center px-6 md:px-12 lg:px-16 overflow-hidden">
      {/* 
        High-quality Realistic Architectural Parking Photograph with Dark High-Contrast Overlay
      */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(9, 9, 11, 0.75) 0%,
              rgba(14, 14, 18, 0.82) 45%,
              rgba(9, 9, 11, 0.96) 90%,
              var(--background) 100%
            ),
            url('https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=2070&auto=format&fit=crop')
          `
        }}
      />

      {/* Atmospheric vignette */}
      <div className="absolute inset-0 z-0 bg-radial from-transparent via-black/20 to-black/70 pointer-events-none" />

      {/* Hero Content Architecture */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-28 pb-16">
        
        {/* Left: Main Copy & CTAs */}
        <div className="lg:col-span-8 space-y-6 text-left">
          {/* Subtle Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono tracking-widest text-zinc-200 uppercase backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>URBAN MOBILITY PLATFORM</span>
          </div>

          {/* Strong Confident Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.06] font-display drop-shadow-sm">
            PARKING,
            <br />
            WITHOUT THE WAIT.
          </h1>

          {/* Natural Clear Explanation */}
          <p className="text-base sm:text-xl text-zinc-200 max-w-xl leading-relaxed font-normal">
            Find available parking near you, choose how you want to pay, and only pay for the time you actually use.
          </p>

          {/* Primary & Secondary Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Button
              onClick={() => navigate('/login')}
              variant="primary"
              size="xl"
              icon={Car}
              iconPosition="left"
              className="w-full sm:w-auto px-8 py-4 text-base font-bold shadow-lg"
            >
              Find Parking
            </Button>

            <Button
              onClick={() => navigate('/login')}
              variant="secondary"
              size="xl"
              icon={Building2}
              iconPosition="left"
              className="w-full sm:w-auto px-8 py-4 text-base font-medium bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md"
            >
              List Your Space
            </Button>
          </div>
        </div>

        {/* Right: Tasteful Live Preview Card with Subtle Floating Idle Motion */}
        <div className="lg:col-span-4 hidden lg:block">
          <div className="p-6 rounded-2xl bg-zinc-900/85 backdrop-blur-xl border border-white/15 shadow-2xl text-white space-y-4 animate-subtle-float hover:border-white/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Live Bay Availability
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                OPEN NOW
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold font-display text-white">
                Business Hub Towers
              </h3>
              <p className="text-xs text-zinc-400">
                Residency Road • 24/7 Monitored Access
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 font-mono text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-zinc-400 block uppercase">Open Bays</span>
                <span className="text-xl font-bold text-emerald-400">14 <span className="text-xs font-normal text-zinc-400">/ 24</span></span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-zinc-400 block uppercase">Hourly Rate</span>
                <span className="text-xl font-bold text-white">₹32 <span className="text-xs font-normal text-zinc-400">/hr</span></span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-zinc-300 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Gate Access
              </span>
              <span className="text-[11px] font-mono text-zinc-400">0.4 km away</span>
            </div>
          </div>
        </div>

      </div>

      {/* Subtle Scroll Hint */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-[11px] font-mono text-zinc-400">
        <span>SCROLL TO EXPLORE</span>
        <div className="w-4 h-6 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-1.5 rounded-full bg-white/70 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
