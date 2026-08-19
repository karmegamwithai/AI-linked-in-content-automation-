import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtitle: string;
  icon: LucideIcon;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  change,
  isPositive,
  subtitle,
  icon: Icon,
}) => {
  return (
    <div className="p-6 md:p-8 rounded-3xl bg-zinc-950 border border-zinc-800/80 space-y-4 flex flex-col justify-between transition-all hover:border-zinc-700/80 shadow-none relative overflow-hidden group">
      {/* Subtle decorative gradient on hover */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-pink-500/5 via-violet-500/5 to-transparent rounded-bl-full pointer-events-none group-hover:from-pink-500/10 transition-all" />

      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
          {title}
        </span>
        <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-pink-400">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-4xl md:text-5xl font-black text-white tracking-tight">
          {value}
        </div>
        <p className="text-xs text-zinc-400 font-medium">{subtitle}</p>
      </div>

      <div className="pt-3 border-t border-zinc-900 flex items-center gap-2 text-xs">
        <span className="font-bold px-2 py-0.5 rounded-full text-[10px] bg-gradient-to-r from-pink-500/20 to-violet-500/20 text-pink-300 border border-pink-500/30">
          {change}
        </span>
        <span className="text-zinc-500 text-[11px]">vs. last week</span>
      </div>
    </div>
  );
};
