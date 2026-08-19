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
  ArrowUpRight
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

  // Time-series mock data
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
    { name: 'LinkedIn', value: 58, color: '#000000' },
    { name: 'Instagram', value: 42, color: '#a1a1aa' },
  ];

  const bestPostingTimes = [
    { day: 'Mon', time: '09:00 AM', engagement: 'High (6.4%)', platform: 'LinkedIn' },
    { day: 'Tue', time: '02:00 PM', engagement: 'Peak (8.1%)', platform: 'Instagram' },
    { day: 'Wed', time: '11:30 AM', engagement: 'High (7.2%)', platform: 'LinkedIn' },
    { day: 'Thu', time: '06:00 PM', engagement: 'Peak (8.9%)', platform: 'Instagram' },
    { day: 'Fri', time: '08:30 AM', engagement: 'Moderate (5.5%)', platform: 'LinkedIn' },
  ];

  return (
    <div id="page-analytics" className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-zinc-50 border border-black/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-black tracking-tight">
            Analytics & Channel Telemetry
          </h1>
          <p className="text-xs text-black/40 font-bold uppercase tracking-wider mt-0.5">
            Cross-network reach, CTR benchmarks, and conversion tracking
          </p>
        </div>

        <div className="flex items-center bg-white p-1 rounded-full border border-black/5 text-xs font-semibold">
          {(['7d', '30d', '90d'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3.5 py-1.5 rounded-full uppercase transition-all ${
                timeRange === r
                  ? 'bg-black text-white font-bold'
                  : 'text-black/50 hover:text-black'
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
          subtitle="B2B High-Performance Tier"
          icon={Sparkles}
        />
        <AnalyticsCard
          title="Shares & Clicks"
          value="482"
          change="+35.1%"
          isPositive={true}
          subtitle="Inbound website referrals"
          icon={MousePointerClick}
        />
      </div>

      {/* Bento Grid: Charts & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Reach Trend Area Chart (8 cols) */}
        <div className="lg:col-span-8 p-6 md:p-8 rounded-3xl bg-zinc-50 border border-black/5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-black tracking-tight">Growth Trendline</h2>
              <p className="text-xs text-black/40 font-bold uppercase tracking-wider mt-0.5">
                Daily impression distribution across platforms
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-bold">
              <div className="flex items-center gap-1.5 text-black">
                <span className="w-2.5 h-2.5 rounded-full bg-black" />
                <span>LinkedIn</span>
              </div>
              <div className="flex items-center gap-1.5 text-black/60">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-400" />
                <span>Instagram</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={reachTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLinkedin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#000000" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorInstagram" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#71717a" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#71717a" stopOpacity={0.0} />
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
                    color: '#000000',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Area type="monotone" dataKey="linkedin" stroke="#000000" strokeWidth={2} fillOpacity={1} fill="url(#colorLinkedin)" />
                <Area type="monotone" dataKey="instagram" stroke="#71717a" strokeWidth={2} fillOpacity={1} fill="url(#colorInstagram)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Share Pie Bento Tile (4 cols) */}
        <div className="lg:col-span-4 p-6 md:p-8 rounded-3xl bg-zinc-50 border border-black/5 flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-xl font-bold text-black tracking-tight">Channel Split</h2>
            <p className="text-xs text-black/40 font-bold uppercase tracking-wider mt-0.5">
              Impression market share
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
                    color: '#000000',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-black/5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-black font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-black" /> LinkedIn
              </span>
              <span className="font-bold text-black">58%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-black/60 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-400" /> Instagram
              </span>
              <span className="font-bold text-black">42%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Bento Grid */}
      <div className="p-6 md:p-8 rounded-3xl bg-zinc-50 border border-black/5 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-black tracking-tight">AI Recommended Posting Windows</h2>
          <p className="text-xs text-black/40 font-bold uppercase tracking-wider mt-0.5">
            Calculated from algorithm velocity and follower active hours
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {bestPostingTimes.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-black/5 space-y-2 text-center">
              <span className="text-xs font-bold uppercase text-black/40">{item.day}</span>
              <div className="text-lg font-black text-black">{item.time}</div>
              <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-black text-white">
                {item.engagement}
              </span>
              <p className="text-[10px] text-black/50 font-medium">{item.platform}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
