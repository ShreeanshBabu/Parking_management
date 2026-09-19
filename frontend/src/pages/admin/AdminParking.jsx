import React, { useState } from 'react';
import { useParking } from '../../context/ParkingContext';
import { formatCurrency } from '../../utils/formatters';

export function AdminParking() {
  const { slots, toggleSlotStatus, selectedBuilding } = useParking();
  const [selectedSlotId, setSelectedSlotId] = useState(slots[0]?.id || 'A01');

  const selectedSlot = slots.find(s => s.id === selectedSlotId) || slots[0];

  return (
    <div className="space-y-10 w-full">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider font-semibold">
          Facility Parking
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-zinc-900 dark:text-zinc-50">
          {selectedBuilding.name}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          {slots.length} Total Spaces • {slots.filter(s => s.status === 'available').length} Available Bays
        </p>
      </div>

      {/* Main Grid + Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Simple Visual Grid */}
        <div className="lg:col-span-8 bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-xs font-mono uppercase text-zinc-500 dark:text-zinc-400 font-semibold">
              All Monitored Spaces
            </span>
            <span className="text-xs font-mono text-zinc-400">
              Click a stall to inspect
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
            {slots.map((slot) => {
              const isSelected = selectedSlot?.id === slot.id;
              const isAvailable = slot.status === 'available';
              return (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlotId(slot.id)}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between h-28 transition-all ${
                    isSelected
                      ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-[#1C1C22] shadow-sm ring-1 ring-zinc-900 dark:ring-zinc-100'
                      : isAvailable
                      ? 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#16161C] hover:border-zinc-400'
                      : 'border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#101014] opacity-85 hover:border-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono font-bold text-zinc-900 dark:text-zinc-100">
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
        </div>

        {/* Selected Slot Details Panel */}
        <div className="lg:col-span-4 bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-card">
          <div className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-[11px] font-mono uppercase text-zinc-500 dark:text-zinc-400 font-semibold">Space Details</span>
            <h3 className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-1">
              Slot {selectedSlot.id}
            </h3>
          </div>

          <div className="space-y-3.5 font-mono text-xs">
            <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
              <span className="text-zinc-500">Status</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100 capitalize">{selectedSlot.status}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
              <span className="text-zinc-500">Hourly Rate</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(selectedSlot.rate || 32)}/hr</span>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
              <span className="text-zinc-500">Deck Level</span>
              <span className="text-zinc-700 dark:text-zinc-300">Level {selectedSlot.level}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
              <span className="text-zinc-500">Current Vehicle</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">
                {selectedSlot.vehiclePlate || 'None'}
              </span>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <span className="text-[10px] font-mono uppercase text-zinc-500 dark:text-zinc-400 block font-semibold">
              Status Override
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => toggleSlotStatus(selectedSlot.id, 'available')}
                className="py-2.5 px-3 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-mono font-bold transition-colors shadow-xs"
              >
                Set Available
              </button>
              <button
                onClick={() => toggleSlotStatus(selectedSlot.id, 'occupied')}
                className="py-2.5 px-3 rounded-lg bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 text-xs font-mono font-bold transition-colors hover:bg-zinc-300"
              >
                Set Occupied
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
