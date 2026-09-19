import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { useParking } from '../../context/ParkingContext';
import { formatCurrency } from '../../utils/formatters';

export function UserHome() {
  const { buildings, activeSession, sessionCostInfo } = useParking();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const filteredBuildings = buildings.filter(b => {
    return b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           b.address.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6 w-full">
      {/* Greeting & Location */}
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider font-semibold">
            {greeting}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-zinc-900 dark:text-zinc-50 mt-0.5">
            Find parking
          </h1>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-700 dark:text-zinc-300">
          <MapPin className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />
          <span>Central District</span>
        </div>
      </div>

      {/* Active Session Highlight (if ongoing) */}
      {activeSession && (
        <div
          onClick={() => navigate('/app/session')}
          className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 cursor-pointer hover:bg-amber-500/15 transition-all shadow-card"
        >
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-amber-700 dark:text-amber-400 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              ACTIVE SESSION
            </span>
            <span className="uppercase text-zinc-700 dark:text-zinc-300 font-semibold">
              {activeSession.rateType} Rate
            </span>
          </div>

          <div className="flex items-end justify-between mt-3">
            <div>
              <div className="text-base font-bold text-zinc-900 dark:text-zinc-50 font-display">
                {activeSession.buildingName} • Bay {activeSession.slot}
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400 font-mono mt-0.5">
                {activeSession.vehiclePlate}
              </div>
            </div>
            <div className="text-right font-mono">
              <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                {sessionCostInfo.formattedDuration}
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                {formatCurrency(sessionCostInfo.totalCost, true)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Input */}
      <div>
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search nearby building or street..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#121215] rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors shadow-xs"
          />
        </div>
      </div>

      {/* Facilities List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400 font-semibold">
          <span>AVAILABLE FACILITIES ({filteredBuildings.length})</span>
        </div>

        {filteredBuildings.map((building) => (
          <div
            key={building.id}
            onClick={() => navigate(`/app/parking/${building.id}`)}
            className="p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all cursor-pointer flex items-center justify-between gap-4 shadow-card hover:shadow-elevated"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                  {building.availableSlots} Open
                </span>
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  {building.distance}
                </span>
              </div>

              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-display">
                {building.name}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                {building.address}
              </p>
            </div>

            <div className="text-right shrink-0">
              <div className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
                {formatCurrency(building.baseRate)}
                <span className="text-xs font-normal text-zinc-500">/hr</span>
              </div>
              <div className="text-xs font-mono text-zinc-900 dark:text-zinc-100 flex items-center justify-end gap-1 mt-1 font-semibold">
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
