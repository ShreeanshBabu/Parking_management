import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useParking } from '../../context/ParkingContext';
import { Button } from '../../components/common/Button';
import { QRScannerModal } from '../../components/common/QRScannerModal';
import { formatCurrency } from '../../utils/formatters';

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
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-zinc-900 dark:text-zinc-50">
            Session Completed
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Barrier open. Parking fee was debited automatically.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 space-y-3.5 font-mono text-xs shadow-card">
          <div className="flex justify-between py-1.5 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-zinc-500 font-semibold">Facility</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100">{completedSummary.buildingName}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-zinc-500 font-semibold">Bay</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100">{completedSummary.slot}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-zinc-500 font-semibold">Duration</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100">{completedSummary.finalDuration}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-zinc-500 font-semibold">Rate Model</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100 uppercase">{completedSummary.rateType} ({formatCurrency(completedSummary.ratePerHour)}/hr)</span>
          </div>
          <div className="flex justify-between pt-3 text-base font-bold">
            <span className="text-zinc-700 dark:text-zinc-300">Total Paid</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono">{formatCurrency(completedSummary.finalCost, true)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            onClick={() => navigate('/app/wallet')}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            Wallet ({formatCurrency(walletBalance, true)})
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
        <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mx-auto text-zinc-500 shadow-xs">
          <Clock className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-display">
          No Active Parking Session
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">
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
        <span className="text-xs font-mono uppercase text-amber-600 dark:text-amber-400 tracking-wider font-bold">
          LIVE SESSION
        </span>
        <h1 className="text-2xl font-bold font-display text-zinc-900 dark:text-zinc-50">
          {activeSession.buildingName}
        </h1>
        <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
          Bay {activeSession.slot} • {activeSession.vehiclePlate}
        </p>
      </div>

      {/* Ticking Timer Card */}
      <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 text-center space-y-6 shadow-card hover:shadow-elevated transition-all">
        <div>
          <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider font-semibold">
            Elapsed Time
          </span>
          <div className="text-5xl sm:text-6xl font-extrabold font-mono text-zinc-900 dark:text-zinc-50 tracking-tight mt-2">
            {sessionCostInfo.formattedDuration}
          </div>
          <div className="text-xs font-mono text-zinc-600 dark:text-zinc-400 mt-2 font-medium">
            {activeSession.rateType === 'fixed' ? 'Fixed Rate Locked' : 'Floating Dynamic Rate'}
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-600 dark:text-zinc-400 font-semibold">Current Accrued Cost:</span>
          <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 font-mono">
            {formatCurrency(sessionCostInfo.totalCost, true)}
          </span>
        </div>
      </div>

      {/* Primary Action */}
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
