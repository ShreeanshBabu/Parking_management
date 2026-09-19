import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useParking } from '../../context/ParkingContext';
import { Button } from '../../components/common/Button';
import { QRScannerModal } from '../../components/common/QRScannerModal';

export function ActiveSession() {
  const { activeSession, sessionCostInfo, endSession, walletBalance } = useParking();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [completedSummary, setCompletedSummary] = useState(null);
  const navigate = useNavigate();

  const handleScanOutSuccess = () => {
    const summary = endSession();
    setCompletedSummary(summary);
  };

  // Completion Receipt
  if (completedSummary) {
    return (
      <div className="space-y-6 py-4 w-full">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#FAF7F5]">
            Session Completed
          </h1>
          <p className="text-xs sm:text-sm text-[#D1C7C9]">
            Barrier open. Parking fee was debited automatically.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-xl bg-[#240812] border border-[rgba(247,214,220,0.1)] space-y-3.5 font-mono text-xs shadow-sm">
          <div className="flex justify-between py-1.5 border-b border-[rgba(247,214,220,0.06)]">
            <span className="text-[#A8989C]">Facility</span>
            <span className="font-bold text-[#FAF7F5]">{completedSummary.buildingName}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[rgba(247,214,220,0.06)]">
            <span className="text-[#A8989C]">Bay</span>
            <span className="font-bold text-[#FAF7F5]">{completedSummary.slot}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[rgba(247,214,220,0.06)]">
            <span className="text-[#A8989C]">Duration</span>
            <span className="font-bold text-[#FAF7F5]">{completedSummary.finalDuration}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[rgba(247,214,220,0.06)]">
            <span className="text-[#A8989C]">Rate Model</span>
            <span className="font-bold text-[#F7D6DC] uppercase">{completedSummary.rateType} (₹{completedSummary.ratePerHour}/hr)</span>
          </div>
          <div className="flex justify-between pt-3 text-base font-bold">
            <span className="text-[#D1C7C9]">Total Paid</span>
            <span className="text-emerald-300 font-mono">₹{completedSummary.finalCost.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            onClick={() => navigate('/app/wallet')}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            Wallet (₹{walletBalance.toFixed(2)})
          </Button>
          <Button
            onClick={() => navigate('/app/home')}
            variant="primary"
            size="lg"
            className="w-full font-bold"
          >
            Find Another Spot
          </Button>
        </div>
      </div>
    );
  }

  // No active session
  if (!activeSession) {
    return (
      <div className="text-center py-20 space-y-4 w-full">
        <div className="w-14 h-14 rounded-xl bg-[#240812] border border-[rgba(247,214,220,0.1)] flex items-center justify-center mx-auto text-[#D1C7C9]">
          <Clock className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-[#FAF7F5]">
          No Active Parking Session
        </h2>
        <p className="text-xs sm:text-sm text-[#D1C7C9] max-w-sm mx-auto">
          Explore nearby office decks to find an open bay and park.
        </p>
        <Button
          onClick={() => navigate('/app/home')}
          variant="primary"
          size="md"
          icon={ArrowRight}
          iconPosition="right"
          className="mt-2"
        >
          Explore Parking
        </Button>
      </div>
    );
  }

  // Active Session Live Monitor
  return (
    <div className="space-y-6 pb-6 w-full">
      <div className="text-center space-y-1">
        <span className="text-xs font-mono uppercase text-[#F7D6DC] tracking-wider font-semibold">
          LIVE SESSION
        </span>
        <h1 className="text-2xl font-bold font-display text-[#FAF7F5]">
          {activeSession.buildingName}
        </h1>
        <p className="text-xs font-mono text-[#D1C7C9]">
          Bay {activeSession.slot} • {activeSession.vehiclePlate}
        </p>
      </div>

      {/* Ticking Timer Card */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#240812] border border-[rgba(247,214,220,0.1)] text-center space-y-6 shadow-sm">
        <div>
          <span className="text-xs font-mono uppercase text-[#A8989C] tracking-wider">
            Elapsed Time
          </span>
          <div className="text-5xl sm:text-6xl font-extrabold font-mono text-[#FAF7F5] tracking-tight mt-2">
            {sessionCostInfo.formattedDuration}
          </div>
          <div className="text-xs font-mono text-[#D1C7C9] mt-2">
            {activeSession.rateType === 'fixed' ? 'Fixed Rate Locked' : 'Floating Dynamic Rate'}
          </div>
        </div>

        <div className="pt-6 border-t border-[rgba(247,214,220,0.08)] flex items-center justify-between text-xs font-mono">
          <span className="text-[#D1C7C9]">Current Accrued Cost:</span>
          <span className="text-2xl font-bold text-[#FAF7F5]">
            ₹{sessionCostInfo.totalCost.toFixed(2)}
          </span>
        </div>
      </div>

      {/* ONE Obvious Primary Action */}
      <Button
        onClick={() => setIsScannerOpen(true)}
        variant="primary"
        size="xl"
        className="w-full text-base font-bold py-4 shadow-md"
      >
        Scan Out & Settle Payment
      </Button>

      {/* Exit QR Scanner Modal */}
      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanOutSuccess}
        mode="checkout"
      />
    </div>
  );
}