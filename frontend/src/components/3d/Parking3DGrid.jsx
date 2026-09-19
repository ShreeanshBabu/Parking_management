import React, { useState } from 'react';
import { useParking } from '../../context/ParkingContext';

export function Parking3DGrid({ onSelectSlot }) {
  const { slots, toggleSlotStatus } = useParking();
  const [selectedSlotId, setSelectedSlotId] = useState(slots[0]?.id || 'A01');

  const selectedSlot = slots.find(s => s.id === selectedSlotId) || slots[0];

  const handleSlotClick = (slot) => {
    setSelectedSlotId(slot.id);
    if (onSelectSlot) onSelectSlot(slot);
  };

  return (
    <div className="bg-[#240812] border border-[rgba(247,214,220,0.1)] rounded-xl p-6 sm:p-8 space-y-6 shadow-sm w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[rgba(247,214,220,0.08)]">
        <div>
          <h3 className="text-sm font-bold text-[#FAF7F5] uppercase font-mono tracking-wider">
            Live Parking Grid
          </h3>
          <p className="text-xs text-[#D1C7C9] mt-0.5">
            Click a stall to inspect vehicle telemetry or update status.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-[#D1C7C9]">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B23C59]" />
            <span className="text-[#D1C7C9]">Occupied</span>
          </div>
        </div>
      </div>

      {/* Clean 2D Stalls Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {slots.slice(0, 10).map((slot) => {
          const isSelected = selectedSlot?.id === slot.id;
          const isAvailable = slot.status === 'available';
          return (
            <button
              key={slot.id}
              onClick={() => handleSlotClick(slot)}
              className={`p-4 rounded-xl border text-left flex flex-col justify-between h-28 transition-all ${
                isSelected
                  ? 'border-[#B23C59] bg-[#3B0E1E] ring-2 ring-[#B23C59]/50 shadow-sm'
                  : isAvailable
                  ? 'border-[rgba(247,214,220,0.08)] bg-[#1A050C] hover:border-[rgba(247,214,220,0.25)]'
                  : 'border-[#4B0F1E] bg-[#2E0B17] hover:border-[#6D1D32]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#FAF7F5]">
                  {slot.id}
                </span>
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isAvailable ? 'bg-emerald-400' : 'bg-[#B23C59]'
                  }`}
                />
              </div>

              <div className="text-xs font-mono text-[#D1C7C9] truncate">
                {slot.vehiclePlate || 'Empty'}
              </div>

              <div className="text-[10px] font-mono uppercase font-semibold">
                <span className={isAvailable ? 'text-emerald-300' : 'text-[#E07A94]'}>
                  {slot.status}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Slot Quick Inspector */}
      {selectedSlot && (
        <div className="pt-4 border-t border-[rgba(247,214,220,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-[#FAF7F5] font-bold text-sm">
              Slot {selectedSlot.id}
            </span>
            <span className="text-[#D1C7C9]">
              Status: <span className="capitalize text-[#FAF7F5] font-semibold">{selectedSlot.status}</span>
            </span>
            {selectedSlot.vehiclePlate && (
              <span className="text-[#D1C7C9]">
                Vehicle: <span className="text-[#FAF7F5] font-semibold">{selectedSlot.vehiclePlate}</span>
              </span>
            )}
            <span className="text-[#D1C7C9]">
              Rate: <span className="text-[#FAF7F5] font-semibold">₹{selectedSlot.rate || 32}/hr</span>
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => toggleSlotStatus(selectedSlot.id, selectedSlot.status === 'available' ? 'occupied' : 'available')}
              className="px-4 py-2 rounded-lg bg-[#3B0E1E] hover:bg-[#4B0F1E] text-[#FAF7F5] border border-[rgba(247,214,220,0.15)] transition-colors font-medium"
            >
              Toggle Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
}