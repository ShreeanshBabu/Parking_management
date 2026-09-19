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
    <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase font-mono tracking-wider">
            Live Parking Grid
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Click a stall to inspect vehicle details or toggle status.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-zinc-600 dark:text-zinc-400">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <span className="text-zinc-600 dark:text-zinc-400">Occupied</span>
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
                  ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-[#1C1C22] shadow-sm ring-1 ring-zinc-900 dark:ring-zinc-100'
                  : isAvailable
                  ? 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#16161C] hover:border-zinc-400'
                  : 'border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#101014] opacity-85 hover:border-zinc-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">
                  {slot.id}
                </span>
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isAvailable ? 'bg-emerald-500' : 'bg-zinc-400 dark:bg-zinc-600'
                  }`}
                />
              </div>

              <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 truncate">
                {slot.vehiclePlate || 'Empty'}
              </div>

              <div className="text-[10px] font-mono uppercase font-semibold">
                <span className={isAvailable ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-500 dark:text-zinc-400'}>
                  {slot.status}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Slot Quick Inspector */}
      {selectedSlot && (
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-zinc-900 dark:text-zinc-100 font-bold text-sm">
              Slot {selectedSlot.id}
            </span>
            <span className="text-zinc-500 dark:text-zinc-400">
              Status: <span className="capitalize text-zinc-900 dark:text-zinc-100 font-semibold">{selectedSlot.status}</span>
            </span>
            {selectedSlot.vehiclePlate && (
              <span className="text-zinc-500 dark:text-zinc-400">
                Vehicle: <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{selectedSlot.vehiclePlate}</span>
              </span>
            )}
            <span className="text-zinc-500 dark:text-zinc-400">
              Rate: <span className="text-zinc-900 dark:text-zinc-100 font-semibold">?{selectedSlot.rate || 32}/hr</span>
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => toggleSlotStatus(selectedSlot.id, selectedSlot.status === 'available' ? 'occupied' : 'available')}
              className="px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 transition-colors font-medium text-xs shadow-xs"
            >
              Toggle Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
