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
        <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider font-semibold">
          Facility Config
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-zinc-900 dark:text-zinc-50">
          {selectedBuilding.name} Settings
        </h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 space-y-5 shadow-xs">
          <h2 className="text-xs font-bold font-mono uppercase text-zinc-900 dark:text-zinc-100 pb-3 border-b border-zinc-100 dark:border-zinc-800">
            Operating Schedule
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-mono">
            <div>
              <label className="text-zinc-600 dark:text-zinc-400 block mb-1.5">Weekday Public Start (Evening)</label>
              <input
                type="time"
                value={weekdayOpen}
                onChange={(e) => setWeekdayOpen(e.target.value)}
                className="w-full p-2.5 bg-zinc-50 dark:bg-[#18181B] rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="text-zinc-600 dark:text-zinc-400 block mb-1.5">Weekday Public End (Morning)</label>
              <input
                type="time"
                value={weekdayClose}
                onChange={(e) => setWeekdayClose(e.target.value)}
                className="w-full p-2.5 bg-zinc-50 dark:bg-[#18181B] rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-[#18181B] border border-zinc-200/60 dark:border-zinc-800 text-xs font-mono">
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">24/7 Public Access on Weekends</span>
            <input
              type="checkbox"
              checked={weekendAllDay}
              onChange={(e) => setWeekendAllDay(e.target.checked)}
              className="w-4 h-4 accent-zinc-900 dark:accent-white"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-xs font-bold font-mono uppercase text-zinc-900 dark:text-zinc-100 pb-3 border-b border-zinc-100 dark:border-zinc-800">
            Barrier Automation
          </h2>

          <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-[#18181B] border border-zinc-200/60 dark:border-zinc-800 text-xs font-mono">
            <div>
              <div className="text-zinc-900 dark:text-zinc-100 font-medium">Auto Barrier Lift (ANPR / QR)</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">Opens barrier when verified plate matches active session</div>
            </div>
            <input
              type="checkbox"
              checked={anprAutoOpen}
              onChange={(e) => setAnprAutoOpen(e.target.checked)}
              className="w-4 h-4 accent-zinc-900 dark:accent-white"
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
