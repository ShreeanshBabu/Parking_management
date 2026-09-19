import React, { useState } from 'react';
import { useParking } from '../../context/ParkingContext';

export function AdminParking() {
  const { slots, toggleSlotStatus, selectedBuilding } = useParking();
  const [selectedSlotId, setSelectedSlotId] = useState(slots[0]?.id || 'A01');

  const selectedSlot = slots.find(s => s.id === selectedSlotId) || slots[0];

  return (
    <div className="space-y-10 w-full">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-mono uppercase text-[#F7D6DC] tracking-wider font-semibold">
          Facility Parking
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#FAF7F5]">
          {selectedBuilding.name}
        </h1>
        <p className="text-xs sm:text-sm text-[#D1C7C9]">
          {slots.length} Total Spaces • {slots.filter(s => s.status === 'available').length} Available Bays
        </p>
      </div>

      {/* Main Grid + Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Simple Visual Grid */}
        <div className="lg:col-span-8 bg-[#240812] border border-[rgba(247,214,220,0.1)] rounded-xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(247,214,220,0.08)]">
            <span className="text-xs font-mono uppercase text-[#D1C7C9]">
              All Monitored Spaces
            </span>
            <span className="text-xs font-mono text-[#D1C7C9]">
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
                      ? 'border-[#B23C59] bg-[#3B0E1E] ring-2 ring-[#B23C59]/50 shadow-sm'
                      : isAvailable
                      ? 'border-[rgba(247,214,220,0.08)] bg-[#1A050C] hover:border-[rgba(247,214,220,0.25)]'
                      : 'border-[#4B0F1E] bg-[#2E0B17] hover:border-[#6D1D32]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono font-bold text-[#FAF7F5]">
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
        </div>

        {/* Selected Slot Details Panel */}
        <div className="lg:col-span-4 bg-[#240812] border border-[rgba(247,214,220,0.1)] rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="pb-4 border-b border-[rgba(247,214,220,0.08)]">
            <span className="text-[11px] font-mono uppercase text-[#D1C7C9]">Space Details</span>
            <h3 className="text-2xl font-bold font-mono text-[#FAF7F5] mt-1">
              Slot {selectedSlot.id}
            </h3>
          </div>

          <div className="space-y-3.5 font-mono text-xs">
            <div className="flex justify-between py-1 border-b border-[rgba(247,214,220,0.06)]">
              <span className="text-[#D1C7C9]">Status</span>
              <span className="font-bold text-[#FAF7F5] capitalize">{selectedSlot.status}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[rgba(247,214,220,0.06)]">
              <span className="text-[#D1C7C9]">Hourly Rate</span>
              <span className="font-bold text-[#FAF7F5]">₹{selectedSlot.rate || 32}/hr</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[rgba(247,214,220,0.06)]">
              <span className="text-[#D1C7C9]">Deck Level</span>
              <span className="text-[#FAF7F5]">Level {selectedSlot.level}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[rgba(247,214,220,0.06)]">
              <span className="text-[#D1C7C9]">Current Vehicle</span>
              <span className="font-bold text-[#FAF7F5]">
                {selectedSlot.vehiclePlate || '—'}
              </span>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#D1C7C9] block">
              Status Override
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => toggleSlotStatus(selectedSlot.id, 'available')}
                className="py-2 px-3 rounded-lg bg-[#3B0E1E] hover:bg-[#4B0F1E] text-xs font-mono text-[#FAF7F5] border border-[rgba(247,214,220,0.12)] transition-colors"
              >
                Set Available
              </button>
              <button
                onClick={() => toggleSlotStatus(selectedSlot.id, 'occupied')}
                className="py-2 px-3 rounded-lg bg-[#3B0E1E] hover:bg-[#4B0F1E] text-xs font-mono text-[#FAF7F5] border border-[rgba(247,214,220,0.12)] transition-colors"
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