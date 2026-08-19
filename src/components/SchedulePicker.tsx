import React from 'react';
import { Calendar, Clock, Sparkles, Check, Zap } from 'lucide-react';

interface SchedulePickerProps {
  scheduledTime?: string;
  onChange: (isoDate: string) => void;
  onPublishNow?: () => void;
}

export const SchedulePicker: React.FC<SchedulePickerProps> = ({
  scheduledTime,
  onChange,
  onPublishNow,
}) => {
  // Helpers for preset intervals
  const setRelativeHours = (hours: number) => {
    const d = new Date(Date.now() + hours * 3600000);
    onChange(d.toISOString());
  };

  const setTomorrowMorning = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(9, 15, 0, 0);
    onChange(d.toISOString());
  };

  const setTomorrowEvening = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(18, 30, 0, 0);
    onChange(d.toISOString());
  };

  const formattedDateVal = scheduledTime
    ? new Date(scheduledTime).toISOString().slice(0, 16)
    : '';

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-zinc-950 border border-zinc-800/80 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Clock className="w-4 h-4 text-pink-400" />
            <span>Personal Dispatch Scheduler</span>
          </h3>
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">
            Auto-dispatched via Celery background worker
          </p>
        </div>

        {onPublishNow && (
          <button
            type="button"
            onClick={onPublishNow}
            className="px-4 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 text-white shadow-md shadow-pink-500/20 active:scale-95 transition-all"
          >
            Publish Live Now
          </button>
        )}
      </div>

      {/* Date & Time Picker */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
          Target Date & Local Time
        </label>
        <div className="relative">
          <input
            type="datetime-local"
            value={formattedDateVal}
            onChange={(e) => {
              if (e.target.value) {
                onChange(new Date(e.target.value).toISOString());
              }
            }}
            className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs font-semibold text-white focus:outline-none focus:border-pink-500/60 focus:ring-1 focus:ring-pink-500/30 font-mono transition-all"
          />
        </div>
      </div>

      {/* Quick Creator Presets */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
          AI Suggested Creator Windows
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => setRelativeHours(3)}
            className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-pink-500/50 text-left transition-all group"
          >
            <div className="text-[10px] font-bold text-pink-400 uppercase">In 3 Hours</div>
            <div className="text-xs font-bold text-white group-hover:text-pink-300">Quick Test</div>
          </button>

          <button
            type="button"
            onClick={setTomorrowMorning}
            className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-pink-500/50 text-left transition-all group"
          >
            <div className="text-[10px] font-bold text-pink-400 uppercase">Tomorrow 9:15 AM</div>
            <div className="text-xs font-bold text-white group-hover:text-pink-300">LinkedIn Peak</div>
          </button>

          <button
            type="button"
            onClick={setTomorrowEvening}
            className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-pink-500/50 text-left transition-all group"
          >
            <div className="text-[10px] font-bold text-violet-400 uppercase">Tomorrow 6:30 PM</div>
            <div className="text-xs font-bold text-white group-hover:text-violet-300">Instagram Peak</div>
          </button>

          <button
            type="button"
            onClick={() => setRelativeHours(48)}
            className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-pink-500/50 text-left transition-all group"
          >
            <div className="text-[10px] font-bold text-zinc-400 uppercase">In 2 Days</div>
            <div className="text-xs font-bold text-white group-hover:text-pink-300">Weekend Slot</div>
          </button>
        </div>
      </div>
    </div>
  );
};
