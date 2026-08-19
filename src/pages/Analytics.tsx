import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Linkedin, 
  Instagram, 
  Users, 
  MousePointerClick, 
  Calendar,
  Sparkles,
  ArrowUpRight,
  Flame,
  Zap
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Post } from '../types';
import { AnalyticsCard } from '../components/AnalyticsCard';

interface AnalyticsProps {
  posts: Post[];
}

export const Analytics: React.FC<AnalyticsProps> = ({ posts }) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const published = posts.filter((p) => p.status === 'published');
  const totalImpressions = published.reduce((acc, p) => acc + (p.analytics?.impressions || 0), 0);
  const totalLikes = published.reduce((acc, p) => acc + (p.analytics?.likes || 0), 0);
  const totalComments = published.reduce((acc, p) => acc + (p.analytics?.comments || 0), 0);
  const totalShares = published.reduce((acc, p) => acc + (p.analytics?.shares || 0), 0);

  // Time-series reach data
  const reachTrendData = [
    { date: 'Aug 1', linkedin: 4200, instagram: 3100, total: 7300 },
    { date: 'Aug 4', linkedin: 5800, instagram: 4600, total: 10400 },
    { date: 'Aug 7', linkedin: 8900, instagram: 6200, total: 15100 },
    { date: 'Aug 10', linkedin: 7100, instagram: 7800, total: 14900 },
    { date: 'Aug 13', linkedin: 12400, instagram: 9100, total: 21500 },
    { date: 'Aug 16', linkedin: 14200, instagram: 11400, total: 25600 },
    { date: 'Aug 18', linkedin: 16800, instagram: 13900, total: 30700 },
  ];

  const platformDistribution = [
    { name: 'Personal LinkedIn', value: 58, color: '#8b5cf6' },
    { name: 'Creator Instagram', value: 42, color: '#ec4899' },
  ];

  const bestPostingTimes = [
    { day: 'Mon', time: '09:00 AM', engagement: 'High (6.4%)', platform: 'Personal LinkedIn' },
    { day: 'Tue', time: '02:00 PM', engagement: 'Peak (8.1%)', platform: 'Creator IG' },
    { day: 'Wed', time: '11:30 AM', engagement: 'High (7.2%)', platform: 'Personal LinkedIn' },
    { day: 'Thu', time: '06:00 PM', engagement: 'Peak (8.9%)', platform: 'Creator IG' },
    { day: 'Fri', time: '08:30 AM', engagement: 'Moderate (5.5%)', platform: 'Personal LinkedIn' },
  ];

  return (
    <div id="page-analytics" className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 relative overflow-hidden shadow-xs">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-500/10 via-violet-600/10 to-transparent rounded-bl-full pointer-events-none" />

        <div className="z-10">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">
              Personal Brand Telemetry
            </h1>
            <span className="text-[10px] font-bold px-2.5 py-0.5 bg-pink-50 text-pink-700 border border-pink-200 rounded-full">
              Live Feed Metrics
            </span>
          </div>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Tracking individual impressions, audience conversion, and profile inbound activity
          </p>
        </div>

        <div className="flex items-center bg-white p-1 rounded-full border border-zinc-200 text-xs font-semibold z-10 shadow-2xs">
          {(['7d', '30d', '90d'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3.5 py-1.5 rounded-full uppercase transition-all ${
                timeRange === r
                  ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Bento Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard
          title="Reach Growth"
          value={totalImpressions > 0 ? `${(totalImpressions / 1000).toFixed(1)}k` : '30.7k'}
          change="+28.4%"
          isPositive={true}
          subtitle="Combined Organic Impressions"
          icon={TrendingUp}
        />
        <AnalyticsCard
          title="Interactions"
          value={totalLikes + totalComments > 0 ? `${totalLikes + totalComments}` : '1.4k'}
          change="+14.2%"
          isPositive={true}
          subtitle="Likes, Reposts, & Comments"
          icon={Users}
        />
        <AnalyticsCard
          title="Engagement Rate"
          value="7.8%"
          change="+0.9%"
          isPositive={true}
          subtitle="Creator Top Tier"
          icon={Sparkles}
        />
        <AnalyticsCard
          title="Shares & Clicks"
          value="482"
          change="+35.1%"
          isPositive={true}
          subtitle="Direct Inbound Connections"
          icon={MousePointerClick}
        />
      </div>

      {/* Bento Grid: Charts & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Reach Trend Area Chart (8 cols) */}
        <div className="lg:col-span-8 p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 tracking-tight">Reach Trendline</h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Daily organic impressions across your personal profiles
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-bold">
              <div className="flex items-center gap-1.5 text-violet-700">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-600" />
                <span>LinkedIn</span>
              </div>
              <div className="flex items-center gap-1.5 text-pink-700">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-600" />
                <span>Instagram</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={reachTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLinkedin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorInstagram" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
                <XAxis dataKey="date" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e4e4e7',
                    borderRadius: '16px',
                    color: '#18181b',
                    fontSize: '12px',
                    boxShadow: '0 8px 16px -4px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Area type="monotone" dataKey="linkedin" stroke="#8b5cf6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorLinkedin)" />
                <Area type="monotone" dataKey="instagram" stroke="#ec4899" strokeWidth={2.5} fillOpacity={1} fill="url(#colorInstagram)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Share Pie Bento Tile (4 cols) */}
        <div className="lg:col-span-4 p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 flex flex-col justify-between space-y-4 shadow-xs">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 tracking-tight">Channel Split</h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Personal audience share
            </p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {platformDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e4e4e7',
                    borderRadius: '16px',
                    fontSize: '12px',
                    color: '#18181b',
                    boxShadow: '0 8px 16px -4px rgb(0 0 0 / 0.1)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-zinc-200">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-zinc-700 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-600" /> Personal LinkedIn
              </span>
              <span className="font-bold text-zinc-900">58%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-zinc-700 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-600" /> Creator IG
              </span>
              <span className="font-bold text-zinc-900">42%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Bento Grid */}
      <div className="p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-4 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 tracking-tight">Optimal Creator Dispatch Windows</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            AI calculated from follower active hours and algorithm feed velocity
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {bestPostingTimes.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-zinc-200 space-y-2 text-center shadow-2xs">
              <span className="text-xs font-bold uppercase text-zinc-400">{item.day}</span>
              <div className="text-lg font-black text-zinc-900">{item.time}</div>
              <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-700 border border-pink-200">
                {item.engagement}
              </span>
              <p className="text-[10px] text-zinc-500 font-medium">{item.platform}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
