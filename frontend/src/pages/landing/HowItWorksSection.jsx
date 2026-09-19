import React from 'react';

export function HowItWorksSection() {
  const steps = [
    { num: '01', title: 'Find a space.', desc: 'See real-time available bays in verified office buildings near your destination.' },
    { num: '02', title: 'Choose your rate.', desc: 'Lock in a Fixed Rate or select Floating to pay lower dynamic prices.' },
    { num: '03', title: 'Scan in.', desc: 'Scan the entrance barrier QR code to automatically open the gate.' },
    { num: '04', title: 'Park.', desc: 'Park in your reserved bay for as long as your schedule requires.' },
    { num: '05', title: 'Scan out & pay.', desc: 'Scan at the exit. Your parking fee is settled instantly from your balance.' },
  ];

  return (
    <section id="how-it-works" className="py-32 w-full border-t border-[rgba(247,214,220,0.08)] bg-[#1A050C]">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 space-y-3">
          <div className="text-xs md:text-sm font-mono tracking-widest text-[#F7D6DC] uppercase">
            02 / HOW IT WORKS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#FAF7F5] font-display">
            A frictionless parking flow.
          </h2>
          <p className="text-base sm:text-lg text-[#D1C7C9] leading-relaxed">
            No paper tickets, physical tokens, or queuing at payment kiosks.
          </p>
        </div>

        {/* 5 Balanced Columns Across the Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {steps.map((step, idx) => (
            <div key={idx} className="space-y-4 pt-6 border-t border-[rgba(247,214,220,0.14)] flex flex-col justify-start">
              <span className="text-xs font-mono font-bold text-[#B23C59] tracking-wider block">
                {step.num}
              </span>
              <h3 className="text-lg font-bold text-[#FAF7F5] font-display">
                {step.title}
              </h3>
              <p className="text-sm text-[#D1C7C9] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}