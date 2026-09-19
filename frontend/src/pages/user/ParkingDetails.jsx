import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useParking } from '../../context/ParkingContext';
import { Button } from '../../components/common/Button';
import { QRScannerModal } from '../../components/common/QRScannerModal';
import { formatCurrency } from '../../utils/formatters';

export function ParkingDetails() {
  const { id } = useParams();
  const { buildings, startSession } = useParking();
  const navigate = useNavigate();

  const building = buildings.find(b => b.id === id) || buildings[0];

  const [rateType, setRateType] = useState('fixed');
  const [selectedSlot] = useState('B-17');
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleStartSession = () => {
    startSession({
      buildingId: building.id,
      rateType,
      slot: selectedSlot,
      vehiclePlate: 'KA 01 MJ 7291'
    });
    navigate('/app/session');
  };

  return (
    <div className="space-y-6 pb-6 w-full">
      {/* Back link */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK</span>
      </button>

      {/* Building Header Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-card hover:shadow-elevated transition-all">
        <div className="flex items-start justify-between">
          <div>
            <span className="px-3 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
              {building.availableSlots} / {building.totalSlots} Open Bays
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-zinc-900 dark:text-zinc-50 mt-2.5">
              {building.name}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
              {building.address} ({building.distance})
            </p>
          </div>

          <div className="text-right font-mono">
            <span className="text-xs text-zinc-400 dark:text-zinc-500 block font-semibold uppercase">From</span>
            <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(building.baseRate)}</span>
            <span className="text-xs text-zinc-500">/hr</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-[#18181B] border border-zinc-200/60 dark:border-zinc-800 text-xs font-mono flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
          <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
          <span>Hours: {building.operatingHours}</span>
        </div>
      </div>

      {/* CHOOSE RATE */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold font-mono uppercase text-zinc-900 dark:text-zinc-100 tracking-wider">
          Choose Your Rate Model
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* FIXED */}
          <div
            onClick={() => setRateType('fixed')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-2.5 shadow-card hover:shadow-elevated ${
              rateType === 'fixed'
                ? 'bg-zinc-100 dark:bg-[#18181B] border-zinc-900 dark:border-zinc-100 ring-1 ring-zinc-900 dark:ring-zinc-100'
                : 'bg-white dark:bg-[#121215] border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-zinc-900 dark:text-zinc-100">FIXED RATE</span>
              <span className="text-[10px] text-zinc-700 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded font-bold">LOCKED</span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-zinc-900 dark:text-zinc-50">
              {formatCurrency(building.fixedRate)}<span className="text-xs font-normal text-zinc-500">/hr</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Rate stays unchanged for entire stay regardless of demand.
            </p>
          </div>

          {/* FLOATING */}
          <div
            onClick={() => setRateType('floating')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-2.5 shadow-card hover:shadow-elevated ${
              rateType === 'floating'
                ? 'bg-zinc-100 dark:bg-[#18181B] border-zinc-900 dark:border-zinc-100 ring-1 ring-zinc-900 dark:ring-zinc-100'
                : 'bg-white dark:bg-[#121215] border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-zinc-900 dark:text-zinc-100">FLOATING RATE</span>
              <span className="text-[10px] text-zinc-700 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded font-bold">DYNAMIC</span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-zinc-900 dark:text-zinc-50">
              {formatCurrency(building.floatingRate)}<span className="text-xs font-normal text-zinc-500">/hr</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Rate follows live building occupancy. Pay less during off-peak hours.
            </p>
          </div>

        </div>
      </div>

      {/* Primary Action */}
      <div className="pt-2">
        <Button
          onClick={() => setIsScannerOpen(true)}
          variant="primary"
          size="lg"
          className="w-full text-base font-bold py-4 shadow-sm"
          icon={ArrowRight}
          iconPosition="right"
        >
          Scan In to Park
        </Button>
      </div>

      {/* Gate QR Scanner Modal */}
      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleStartSession}
        initialBuilding={building}
        initialRateType={rateType}
        mode="checkin"
      />
    </div>
  );
}
