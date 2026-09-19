import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { useParking } from '../../context/ParkingContext';

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
          <span className="text-xs font-mono uppercase text-[#F7D6DC] tracking-wider font-semibold">
            {greeting}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#FAF7F5] mt-0.5">
            Find parking
          </h1>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#240812] border border-[rgba(247,214,220,0.1)] text-xs font-mono">
          <MapPin className="w-3.5 h-3.5 text-[#B23C59]" />
          <span>Indiranagar</span>
        </div>
      </div>

      {/* Active Session Highlight (if ongoing) */}
      {activeSession && (
        <div
          onClick={() => navigate('/app/session')}
          className="p-5 rounded-xl bg-[#2E0B17] border border-[#B23C59] cursor-pointer hover:bg-[#380B18] transition-all shadow-sm"
        >
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#F7D6DC] flex items-center gap-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#E07A94] animate-ping" />
              ACTIVE SESSION
            </span>
            <span className="uppercase text-[#D1C7C9]">
              {activeSession.rateType} Rate
            </span>
          </div>

          <div className="flex items-end justify-between mt-3">
            <div>
              <div className="text-base font-bold text-[#FAF7F5]">
                {activeSession.buildingName} • Bay {activeSession.slot}
              </div>
              <div className="text-xs text-[#D1C7C9] font-mono">
                {activeSession.vehiclePlate}
              </div>
            </div>
            <div className="text-right font-mono">
              <div className="text-xl font-bold text-[#FAF7F5]">
                {sessionCostInfo.formattedDuration}
              </div>
              <div className="text-xs text-[#D1C7C9]">
                ₹{sessionCostInfo.totalCost.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Input */}
      <div>
        <div className="relative">
          <Search className="w-4 h-4 text-[#D1C7C9] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search nearby building or street..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#240812] rounded-xl border border-[rgba(247,214,220,0.12)] text-sm text-[#FAF7F5] placeholder-[#A8989C] focus:outline-none focus:border-[#B23C59] transition-colors"
          />
        </div>
      </div>

      {/* Facilities List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-[#D1C7C9]">
          <span>AVAILABLE FACILITIES ({filteredBuildings.length})</span>
        </div>

        {filteredBuildings.map((building) => (
          <div
            key={building.id}
            onClick={() => navigate(`/app/parking/${building.id}`)}
            className="p-5 rounded-xl bg-[#240812] border border-[rgba(247,214,220,0.08)] hover:border-[#B23C59]/70 transition-all cursor-pointer flex items-center justify-between gap-4 shadow-sm"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/50 text-emerald-300 border border-emerald-800/40">
                  {building.availableSlots} Open
                </span>
                <span className="text-xs font-mono text-[#D1C7C9]">
                  {building.distance}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#FAF7F5]">
                {building.name}
              </h3>
              <p className="text-xs text-[#D1C7C9]">
                {building.address}
              </p>
            </div>

            <div className="text-right shrink-0">
              <div className="text-xl font-bold font-mono text-[#FAF7F5]">
                ₹{building.baseRate}
                <span className="text-xs font-normal text-[#D1C7C9]">/hr</span>
              </div>
              <div className="text-xs font-mono text-[#F7D6DC] flex items-center justify-end gap-1 mt-1 font-medium">
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