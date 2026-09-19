import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParking } from '../../context/ParkingContext';
import { Button } from '../../components/common/Button';

export function ExploreMap() {
  const { buildings } = useParking();
  const [selectedBuilding, setSelectedBuilding] = useState(buildings[0]);
  const navigate = useNavigate();

  return (
    <div className="space-y-5 w-full">
      <div className="relative h-80 md:h-[420px] rounded-xl bg-[#240812] border border-[rgba(247,214,220,0.1)] overflow-hidden flex items-center justify-center shadow-sm">
        <div className="absolute inset-0 bg-tech-grid opacity-30" />

        {/* Vector road lines */}
        <svg className="absolute inset-0 w-full h-full stroke-[rgba(247,214,220,0.08)] stroke-[1.5] pointer-events-none">
          <line x1="0%" y1="30%" x2="100%" y2="30%" />
          <line x1="0%" y1="70%" x2="100%" y2="70%" />
          <line x1="30%" y1="0%" x2="30%" y2="100%" />
          <line x1="70%" y1="0%" x2="70%" y2="100%" />
        </svg>

        {/* Map markers */}
        <div className="relative z-10 w-full h-full">
          {buildings.map((bldg) => {
            const isSelected = selectedBuilding?.id === bldg.id;
            return (
              <button
                key={bldg.id}
                onClick={() => setSelectedBuilding(bldg)}
                style={{ left: `${bldg.coordinates.x}%`, top: `${bldg.coordinates.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform ${
                  isSelected ? 'scale-105 z-20' : 'hover:scale-105 z-10'
                }`}
              >
                <div
                  className={`px-3 py-1.5 rounded-full border font-mono text-xs font-bold shadow-md transition-all ${
                    isSelected
                      ? 'bg-[#B23C59] text-[#FAF7F5] border-[#F7D6DC]'
                      : 'bg-[#1A050C] text-[#D1C7C9] border-[rgba(247,214,220,0.14)] hover:border-[#B23C59]'
                  }`}
                >
                  <span>{bldg.availableSlots} Open</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Deck Card */}
      {selectedBuilding && (
        <div className="p-6 rounded-xl bg-[#240812] border border-[rgba(247,214,220,0.1)] flex items-center justify-between gap-4 shadow-sm">
          <div>
            <span className="text-xs font-mono text-[#F7D6DC] uppercase">
              {selectedBuilding.availableSlots} Open Bays • {selectedBuilding.distance}
            </span>
            <h3 className="text-lg font-bold text-[#FAF7F5] mt-1 font-display">
              {selectedBuilding.name}
            </h3>
            <p className="text-xs text-[#D1C7C9]">
              {selectedBuilding.address}
            </p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-xl font-bold font-mono text-[#FAF7F5]">
              ₹{selectedBuilding.baseRate}<span className="text-xs font-normal text-[#D1C7C9]">/hr</span>
            </div>
            <Button
              onClick={() => navigate(`/app/parking/${selectedBuilding.id}`)}
              variant="primary"
              size="sm"
              className="mt-2"
            >
              Select Deck →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}