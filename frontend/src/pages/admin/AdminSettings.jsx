import React, { useState } from 'react';
import { useParking } from '../../context/ParkingContext';
import { Button } from '../../components/common/Button';

export function AdminSettings() {
  const { selectedBuilding, showToast } = useParking();

  const [weekdayOpen, setWeekdayOpen] = useState('18:00');
  const [weekdayClose, setWeekdayClose] = useState('08:00');
  const [weekendAllDay, setWeekendAllDay] = useState(true);
  const [anprAutoOpen, setAnprAutoOpen] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Facility settings updated.');
  };

  return (
    <div className="space-y-10 w-full">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-mono uppercase text-[#F7D6DC] tracking-wider font-semibold">
          Facility Config
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#FAF7F5]">
          {selectedBuilding.name} Settings
        </h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-[#240812] border border-[rgba(247,214,220,0.1)] rounded-xl p-6 sm:p-8 space-y-5 shadow-sm">
          <h2 className="text-xs font-bold font-mono uppercase text-[#FAF7F5] pb-3 border-b border-[rgba(247,214,220,0.08)]">
            Operating Schedule
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-mono">
            <div>
              <label className="text-[#D1C7C9] block mb-1.5">Weekday Public Start (Evening)</label>
              <input
                type="time"
                value={weekdayOpen}
                onChange={(e) => setWeekdayOpen(e.target.value)}
                className="w-full p-2.5 bg-[#1A050C] rounded-lg border border-[rgba(247,214,220,0.12)] text-[#FAF7F5]"
              />
            </div>
            <div>
              <label className="text-[#D1C7C9] block mb-1.5">Weekday Public End (Morning)</label>
              <input
                type="time"
                value={weekdayClose}
                onChange={(e) => setWeekdayClose(e.target.value)}
                className="w-full p-2.5 bg-[#1A050C] rounded-lg border border-[rgba(247,214,220,0.12)] text-[#FAF7F5]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-[#1A050C] text-xs font-mono">
            <span className="text-[#FAF7F5] font-medium">24/7 Public Access on Weekends</span>
            <input
              type="checkbox"
              checked={weekendAllDay}
              onChange={(e) => setWeekendAllDay(e.target.checked)}
              className="w-4 h-4 accent-[#B23C59]"
            />
          </div>
        </div>

        <div className="bg-[#240812] border border-[rgba(247,214,220,0.1)] rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xs font-bold font-mono uppercase text-[#FAF7F5] pb-3 border-b border-[rgba(247,214,220,0.08)]">
            Barrier Automation
          </h2>

          <div className="flex items-center justify-between p-4 rounded-xl bg-[#1A050C] text-xs font-mono">
            <div>
              <div className="text-[#FAF7F5] font-medium">Auto Barrier Lift (ANPR / QR)</div>
              <div className="text-[11px] text-[#A8989C] mt-0.5">Opens barrier when verified plate matches active session</div>
            </div>
            <input
              type="checkbox"
              checked={anprAutoOpen}
              onChange={(e) => setAnprAutoOpen(e.target.checked)}
              className="w-4 h-4 accent-[#B23C59]"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="md">
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}