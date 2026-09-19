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
    }, 800);
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
        <div className="relative aspect-video max-h-52 mx-auto w-full bg-zinc-100 dark:bg-[#0D0D10] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
          {/* Corner frame borders */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-zinc-900 dark:border-zinc-100" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-zinc-900 dark:border-zinc-100" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-zinc-900 dark:border-zinc-100" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-zinc-900 dark:border-zinc-100" />

          {/* Center Graphic */}
          <div className="flex flex-col items-center justify-center z-10 text-center px-4">
            {scanning ? (
              <>
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-700 flex items-center justify-center mb-2 text-zinc-900 dark:text-zinc-100 shadow-sm">
                  <QrCode className="w-6 h-6" />
                </div>
                <p className="text-xs font-mono font-medium text-zinc-900 dark:text-zinc-200">
                  SCANNING GATE BARRIER...
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Point device at the entry pillar QR
                </p>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  GATE DETECTED
                </span>
                <span className="text-xs text-zinc-900 dark:text-zinc-200 font-medium mt-0.5">
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
              <div className="bg-zinc-50 dark:bg-[#18181B] p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400 font-medium">Rate Option</span>
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
                        ? 'bg-white dark:bg-zinc-800 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-50 shadow-sm'
                        : 'bg-zinc-100 dark:bg-[#101014] border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-mono font-medium">Fixed</div>
                    <div className="text-sm font-bold">₹{building.fixedRate}<span className="text-[10px] font-normal text-zinc-500">/hr</span></div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRateType('floating')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      rateType === 'floating'
                        ? 'bg-white dark:bg-zinc-800 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-50 shadow-sm'
                        : 'bg-zinc-100 dark:bg-[#101014] border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-mono font-medium">Floating</div>
                    <div className="text-sm font-bold">₹{building.floatingRate}<span className="text-[10px] font-normal text-zinc-500">/hr</span></div>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800 text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5 font-medium">
                    <Car className="w-3.5 h-3.5" />
                    Vehicle
                  </span>
                  <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">KA 01 MJ 7291</span>
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
