import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface AnalyticsCardProps {
  id?: string;
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  icon?: any;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  id,
  title,
  value,
  change,
  isPositive = true,
  subtitle,
  icon: Icon,
}) => {
  return (
    <div
      id={id || `analytics-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
      className="p-6 md:p-8 rounded-3xl bg-zinc-50 border border-black/5 flex flex-col justify-between transition-all hover:border-black/15 shadow-none group"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-black tracking-tight">
          {title}
        </h2>
        {Icon && (
          <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-black/60 group-hover:bg-black group-hover:text-white transition-colors">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="my-4 flex items-baseline gap-3">
        <div className="text-4xl lg:text-5xl font-black text-black tracking-tight">
          {value}
        </div>
        {change && (
          <span
            className={`flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${
              isPositive
                ? 'text-black bg-black/5 border border-black/10'
                : 'text-rose-600 bg-rose-50 border border-rose-200'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3 h-3 mr-0.5" />
            )}
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-xs text-black/40 font-bold uppercase tracking-wider">
          {subtitle}
        </p>
      )}
    </div>
  );
};
