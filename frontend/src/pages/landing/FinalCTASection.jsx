import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Building2, Car } from 'lucide-react';
import { Button } from '../../components/common/Button';

export function FinalCTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-28 md:py-36 w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-white relative overflow-hidden">
      {/* Subtle depth gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono tracking-widest text-zinc-300 uppercase backdrop-blur-md">
          <span>GET STARTED TODAY</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.1]">
          Your next parking spot
          <br />
          could already be there.
        </h2>

        <p className="text-base sm:text-lg text-zinc-300 max-w-xl mx-auto leading-relaxed">
          Access verified corporate bays in seconds or list your facility's idle parking capacity with zero hassle.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            onClick={() => navigate('/login')}
            variant="primary"
            size="xl"
            icon={Car}
            iconPosition="left"
            className="w-full sm:w-auto px-8 py-4 font-bold bg-white text-zinc-900 hover:bg-zinc-100 shadow-lg"
          >
            Find Parking
          </Button>

          <Button
            onClick={() => navigate('/login')}
            variant="secondary"
            size="xl"
            icon={Building2}
            iconPosition="left"
            className="w-full sm:w-auto px-8 py-4 font-medium bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md"
          >
            List Your Space
          </Button>
        </div>
      </div>
    </section>
  );
}
