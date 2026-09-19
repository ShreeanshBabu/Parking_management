import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../components/common/Button';

export function FinalCTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-36 w-full max-w-5xl mx-auto px-6 md:px-12 text-center">
      <div className="space-y-8">
        <div className="text-xs md:text-sm font-mono tracking-widest text-[#F7D6DC] uppercase">
          05 / GET STARTED
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAF7F5] font-display tracking-tight">
          Ready to find your parking space?
        </h2>

        <p className="text-base sm:text-lg text-[#D1C7C9] max-w-xl mx-auto leading-relaxed">
          Open the app to find parking near you or connect your building's barrier gates in minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            onClick={() => navigate('/app/home')}
            variant="primary"
            size="xl"
            icon={ArrowRight}
            iconPosition="right"
            className="w-full sm:w-auto px-8 py-4 font-bold"
          >
            Find Parking Now
          </Button>

          <Button
            onClick={() => navigate('/admin/login')}
            variant="secondary"
            size="xl"
            className="w-full sm:w-auto px-8 py-4 font-medium"
          >
            Building Admin
          </Button>
        </div>
      </div>
    </section>
  );
}