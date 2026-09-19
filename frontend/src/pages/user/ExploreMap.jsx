import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useParking } from '../../context/ParkingContext';
import { Button } from '../../components/common/Button';
import { formatCurrency } from '../../utils/formatters';

export function ExploreMap() {
  const { buildings } = useParking();
  const [selectedBuilding, setSelectedBuilding] = useState(buildings[0]);
  const navigate = useNavigate();

  return (
    <div className="space-y-5 w-full">
      <div className="relative h-80 md:h-[420px] rounded-2xl bg-zinc-100 dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 overflow-hidden flex items-center justify-center shadow-card">
        {/* Vector road lines */}
        <svg className="absolute inset-0 w-full h-full stroke-zinc-300 dark:stroke-zinc-800 stroke-[1.5] pointer-events-none">
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
                  className={`px-3 py-1.5 rounded-full border font-mono text-xs font-bold shadow-md transition-colors ${
                    isSelected
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-transparent'
                      : 'bg-white text-zinc-900 dark:bg-[#18181B] dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
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
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4 shadow-card hover:shadow-elevated transition-all">
          <div>
            <span className="text-xs font-mono text-zinc-500 uppercase font-semibold">
              {selectedBuilding.availableSlots} Open Bays • {selectedBuilding.distance}
            </span>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-1 font-display">
              {selectedBuilding.name}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              {selectedBuilding.address}
            </p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
              {formatCurrency(selectedBuilding.baseRate)}<span className="text-xs font-normal text-zinc-500">/hr</span>
            </div>
            <Button
              onClick={() => navigate(`/app/parking/${selectedBuilding.id}`)}
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              className="mt-2"
            >
              Select Deck
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
