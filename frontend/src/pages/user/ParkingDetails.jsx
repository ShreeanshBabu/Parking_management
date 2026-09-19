import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useParking } from '../../context/ParkingContext';
import { Button } from '../../components/common/Button';
import { QRScannerModal } from '../../components/common/QRScannerModal';

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
        className="flex items-center gap-1.5 text-xs font-mono text-[#D1C7C9] hover:text-[#FAF7F5] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK</span>
      </button>

      {/* Building Header Card */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#240812] border border-[rgba(247,214,220,0.1)] space-y-4 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <span className="px-3 py-0.5 rounded-full text-xs font-mono bg-emerald-950/50 text-emerald-300 border border-emerald-800/40">
              {building.availableSlots} / {building.totalSlots} Open Bays
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#FAF7F5] mt-2.5">
              {building.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#D1C7C9] flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#B23C59]" />
              {building.address} ({building.distance})
            </p>
          </div>

          <div className="text-right font-mono">
            <span className="text-xs text-[#A8989C] block">From</span>
            <span className="text-3xl font-bold text-[#FAF7F5]">₹{building.baseRate}</span>
            <span className="text-xs text-[#D1C7C9]">/hr</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#1A050C] border border-[rgba(247,214,220,0.06)] text-xs font-mono flex items-center gap-2 text-[#D1C7C9]">
          <Clock className="w-4 h-4 text-[#F7D6DC] shrink-0" />
          <span>Hours: {building.operatingHours}</span>
        </div>
      </div>

      {/* CHOOSE RATE */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold font-mono uppercase text-[#FAF7F5] tracking-wider">
          Choose Your Rate Model
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* FIXED */}
          <div
            onClick={() => setRateType('fixed')}
            className={`p-6 rounded-xl border transition-all cursor-pointer space-y-2.5 shadow-sm ${
              rateType === 'fixed'
                ? 'bg-[#2E0B17] border-[#B23C59] ring-2 ring-[#B23C59]/50'
                : 'bg-[#240812] border-[rgba(247,214,220,0.08)] hover:border-[rgba(247,214,220,0.25)]'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#FAF7F5]">FIXED RATE</span>
              <span className="text-[10px] text-[#F7D6DC] bg-[#4B0F1E] px-2 py-0.5 rounded">LOCKED</span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-[#FAF7F5]">
              ₹{building.fixedRate}<span className="text-xs font-normal text-[#D1C7C9]">/hr</span>
            </div>
            <p className="text-xs text-[#D1C7C9] leading-relaxed">
              Rate stays unchanged for entire stay regardless of demand.
            </p>
          </div>

          {/* FLOATING */}
          <div
            onClick={() => setRateType('floating')}
            className={`p-6 rounded-xl border transition-all cursor-pointer space-y-2.5 shadow-sm ${
              rateType === 'floating'
                ? 'bg-[#2E0B17] border-[#B23C59] ring-2 ring-[#B23C59]/50'
                : 'bg-[#240812] border-[rgba(247,214,220,0.08)] hover:border-[rgba(247,214,220,0.25)]'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#FAF7F5]">FLOATING RATE</span>
              <span className="text-[10px] text-[#F7D6DC] bg-[#4B0F1E] px-2 py-0.5 rounded">DYNAMIC</span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-[#F7D6DC]">
              ₹{building.floatingRate}<span className="text-xs font-normal text-[#D1C7C9]">/hr</span>
            </div>
            <p className="text-xs text-[#D1C7C9] leading-relaxed">
              Rate follows live building occupancy. Pay less during off-peak hours.
            </p>
          </div>

        </div>
      </div>

      {/* Primary Action */}
      <div className="pt-2">
        <Button
          onClick={handleStartSession}
          variant="primary"
          size="lg"
          className="w-full text-base font-bold py-3.5"
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