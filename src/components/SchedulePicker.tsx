import React from 'react';
import { Clock, Calendar, Zap, Sparkles, Send } from 'lucide-react';

interface SchedulePickerProps {
  scheduledTime?: string;
  onChangeScheduledTime: (time: string) => void;
  status: 'draft' | 'scheduled' | 'published';
  onChangeStatus: (status: 'draft' | 'scheduled' | 'published') => void;
  onQuickPreset: (hoursAhead: number) => void;
}

export const SchedulePicker: React.FC<SchedulePickerProps> = ({
  scheduledTime,
  onChangeScheduledTime,
  status,
  onChangeStatus,
  onQuickPreset,
}) => {
  // Optimal posting presets
  const presets = [
    { label: 'Today (Prime 2:00 PM)', hours: 2, desc: 'Highest B2B CTR' },
    { label: 'Tomorrow (8:30 AM)', hours: 14, desc: 'Morning Commute Surge' },
    { label: 'In 2 Days (11:00 AM)', hours: 48, desc: 'Mid-week Peak Engagement' },
  ];

  return (
    <div className="p-6 rounded-3xl bg-zinc-50 border border-black/5 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-black tracking-tight">Scheduling & Dispatch Options</h2>
          <p className="text-xs text-black/40 font-bold uppercase tracking-wider mt-0.5">
            Configure Celery cron dispatch or save as a scratchpad draft
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Mode Toggle */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-black/50">
            Publishing Mode
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              id="btn-mode-schedule"
              onClick={() => onChangeStatus('scheduled')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                status === 'scheduled'
                  ? 'bg-black text-white border-black shadow-xs'
                  : 'bg-white text-black/60 border-black/5 hover:border-black/20 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-bold">Schedule Dispatch</span>
              </div>
              <p className={`text-[10px] mt-1 ${status === 'scheduled' ? 'text-white/70' : 'text-black/40'}`}>
                Triggers Celery background worker at specified UTC time
              </p>
            </button>

            <button
              type="button"
              id="btn-mode-draft"
              onClick={() => onChangeStatus('draft')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                status === 'draft'
                  ? 'bg-black text-white border-black shadow-xs'
                  : 'bg-white text-black/60 border-black/5 hover:border-black/20 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-bold">Save as Draft</span>
              </div>
              <p className={`text-[10px] mt-1 ${status === 'draft' ? 'text-white/70' : 'text-black/40'}`}>
                Store in Drafts Bank for editing or team review
              </p>
            </button>
          </div>
        </div>

        {/* Date & Time Picker */}
        {status === 'scheduled' && (
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-black/50">
              Pick Dispatch Date & Time
            </label>
            <div className="space-y-2">
              <input
                type="datetime-local"
                id="input-scheduled-datetime"
                value={scheduledTime ? scheduledTime.slice(0, 16) : ''}
                onChange={(e) => onChangeScheduledTime(new Date(e.target.value).toISOString())}
                className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-2xl text-xs font-semibold text-black focus:outline-none focus:border-black transition-all"
              />

              {/* Recommended Time Presets */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onQuickPreset(p.hours)}
                    className="px-3 py-1 bg-white hover:bg-zinc-100 border border-black/10 rounded-full text-[11px] text-black font-semibold transition-all"
                  >
                    ⚡ {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
