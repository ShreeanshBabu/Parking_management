import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Camera, CheckCircle2, Car, ArrowRight, RefreshCw } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Badge } from './Badge';

export function QRScannerModal({ isOpen, onClose, onScanSuccess, mode = 'checkin', initialBuilding = null, initialRateType = 'fixed' }) {
  const [scanning, setScanning] = useState(true);
  const [scannedData, setScannedData] = useState(null);
  const [rateType, setRateType] = useState(initialRateType);
  const [selectedSlot, setSelectedSlot] = useState('B-17');

  const building = initialBuilding || {
    id: 'business-hub',
    name: 'Business Hub Towers',
    fixedRate: 35,
    floatingRate: 32,
    availableSlots: 7
  };

  const handleSimulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScannedData({
        gateId: 'GATE-NORTH-B2',
        facility: building.name,
        slot: selectedSlot,
        timestamp: new Date().toISOString()
      });
    }, 1000);
  };

  const handleConfirm = () => {
    onScanSuccess({
      buildingId: building.id,
      slot: selectedSlot,
      rateType: rateType,
      ratePerHour: rateType === 'fixed' ? building.fixedRate : building.floatingRate
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'checkin' ? 'Scan Entry QR Code' : 'Scan Exit QR Code'}
      subtitle={mode === 'checkin' ? 'Position gate QR code within frame' : 'Scan gate terminal to authorize exit and settle balance'}
    >
      <div className="space-y-4">
        {/* Viewfinder simulation */}
        <div className="relative aspect-video max-h-52 mx-auto w-full bg-[#120306] rounded-xl overflow-hidden border border-[rgba(247,214,220,0.1)] flex items-center justify-center">
          <div className="absolute inset-0 bg-tech-grid opacity-30" />

          {/* Corner frame borders */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#8E2B44]" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#8E2B44]" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-[#8E2B44]" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#8E2B44]" />

          {/* Center Graphic */}
          <div className="flex flex-col items-center justify-center z-10 text-center px-4">
            {scanning ? (
              <>
                <div className="w-12 h-12 rounded-xl bg-[#240911] border border-[#6D1D32] flex items-center justify-center mb-2 text-[#F7D6DC]">
                  <QrCode className="w-6 h-6" />
                </div>
                <p className="text-xs font-mono text-[#F7D6DC]">
                  SCANNING GATE BARRIER...
                </p>
                <p className="text-[11px] text-[#C5A5AC] mt-0.5">
                  Point device at the entry pillar QR
                </p>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center mb-1.5 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-medium text-emerald-300">
                  GATE DETECTED
                </span>
                <span className="text-xs text-[#FDF2F4] font-medium mt-0.5">
                  {building.name} • Bay {selectedSlot}
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Scan Actions & Rate Selection */}
        {scanning ? (
          <div>
            <Button
              onClick={handleSimulateScan}
              variant="primary"
              className="w-full"
              icon={Camera}
            >
              Simulate Gate Scan
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {mode === 'checkin' && (
              <div className="bg-[#120306] p-3 rounded-xl border border-[rgba(247,214,220,0.08)] space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#C5A5AC]">Rate Option</span>
                  <Badge variant={rateType === 'fixed' ? 'fixed' : 'floating'} size="sm">
                    {rateType === 'fixed' ? 'FIXED' : 'FLOATING'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRateType('fixed')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      rateType === 'fixed'
                        ? 'bg-[#2E0C16] border-[#8E2B44] text-[#FDF2F4]'
                        : 'bg-[#1B060C] border-[rgba(247,214,220,0.06)] text-[#C5A5AC]'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-mono">Fixed</div>
                    <div className="text-sm font-bold text-[#FDF2F4]">₹{building.fixedRate}<span className="text-[10px] font-normal text-[#C5A5AC]">/hr</span></div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRateType('floating')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      rateType === 'floating'
                        ? 'bg-[#2E0C16] border-[#8E2B44] text-[#FDF2F4]'
                        : 'bg-[#1B060C] border-[rgba(247,214,220,0.06)] text-[#C5A5AC]'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-mono">Floating</div>
                    <div className="text-sm font-bold text-[#FDF2F4]">₹{building.floatingRate}<span className="text-[10px] font-normal text-[#C5A5AC]">/hr</span></div>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[rgba(247,214,220,0.06)] text-xs">
                  <span className="text-[#C5A5AC] flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-[#8E2B44]" />
                    Vehicle
                  </span>
                  <span className="font-mono text-[#FDF2F4]">KA 01 MJ 7291</span>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={() => setScanning(true)}
                variant="secondary"
                size="md"
                icon={RefreshCw}
                className="w-1/3"
              >
                Rescan
              </Button>
              <Button
                onClick={handleConfirm}
                variant="primary"
                size="md"
                className="w-2/3"
                icon={ArrowRight}
                iconPosition="right"
              >
                {mode === 'checkin' ? 'Open Barrier' : 'Authorize Exit'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}