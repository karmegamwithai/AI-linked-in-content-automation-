import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Plus, 
  Linkedin, 
  Instagram, 
  Table, 
  ArrowRight,
  Send,
  Zap,
  Flame,
  UserCheck
} from 'lucide-react';
import { Post, ConnectedAccount, GoogleSheetsConfig } from '../types';
import { AnalyticsCard } from '../components/AnalyticsCard';
import { PostCard } from '../components/PostCard';
import { PageId } from '../components/Sidebar';

interface DashboardProps {
  posts: Post[];
  accounts: ConnectedAccount[];
  sheetsConfig: GoogleSheetsConfig;
  onNavigate: (page: PageId) => void;
  onEditPost: (post: Post) => void;
  onDeletePost: (id: string) => void;
  onPublishNow: (id: string) => void;
  onQuickCreateWithTopic: (topic: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  posts,
  accounts,
  sheetsConfig,
  onNavigate,
  onEditPost,
  onDeletePost,
  onPublishNow,
  onQuickCreateWithTopic,
}) => {
  const [quickIdea, setQuickIdea] = useState('');

  const scheduled = posts.filter((p) => p.status === 'scheduled');
  const published = posts.filter((p) => p.status === 'published');
  const drafts = posts.filter((p) => p.status === 'draft');

  const nextScheduled = scheduled[0];
  const totalImpressions = published.reduce((acc, p) => acc + (p.analytics?.impressions || 0), 0);

  const linkedinAccount = accounts.find((a) => a.platform === 'linkedin');
  const instagramAccount = accounts.find((a) => a.platform === 'instagram');

  const handleQuickCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickIdea.trim()) {
      onQuickCreateWithTopic(quickIdea.trim());
      setQuickIdea('');
    }
  };

  const creatorInspirationTopics = [
    '3 hard lessons from building solo in 2026',
    'Why doing less is my secret to staying consistent',
    'The exact morning routine behind my best content',
    'How I automate my LinkedIn and Instagram queue without a team',
  ];

  return (
    <div id="page-dashboard" className="space-y-6">
      {/* Header Bento Tile */}
      <div className="p-6 md:p-8 rounded-3xl bg-zinc-950 border border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-pink-500/10 via-violet-600/10 to-transparent rounded-bl-full pointer-events-none" />

        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-500/20 to-violet-500/20 text-pink-300 border border-pink-500/30 flex items-center gap-1">
              <Zap className="w-3 h-3 text-pink-400" />
              <span>Solo Creator Engine</span>
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            Personal Creator Studio
          </h1>
          <p className="text-xs text-zinc-400 font-medium">
            Automating personal LinkedIn storytelling & Instagram creator posts with zero manual overhead
          </p>
        </div>

        {/* Quick Idea Input with Gradient Action */}
        <form
          onSubmit={handleQuickCreateSubmit}
          className="flex items-center gap-2 bg-zinc-900/90 p-1.5 rounded-full border border-zinc-800 focus-within:border-pink-500/60 focus-within:ring-1 focus-within:ring-pink-500/30 transition-all z-10 w-full md:w-auto"
        >
          <input
            type="text"
            placeholder="Type a personal lesson or idea..."
            value={quickIdea}
            onChange={(e) => setQuickIdea(e.target.value)}
            className="px-4 py-2 text-xs bg-transparent text-white placeholder:text-zinc-500 focus:outline-none w-full md:w-64 font-medium"
          />
          <button
            type="submit"
            disabled={!quickIdea.trim()}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 rounded-full shadow-md shadow-pink-500/20 disabled:opacity-40 transition-all shrink-0 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Draft</span>
          </button>
        </form>
      </div>

      {/* KPI Bento Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard
          title="Audience Reach"
          value={totalImpressions > 0 ? `${(totalImpressions / 1000).toFixed(1)}k` : '30.7k'}
          change="+28.4%"
          isPositive={true}
          subtitle="Combined Organic Views"
          icon={TrendingUp}
        />
        <AnalyticsCard
          title="Queued Dispatches"
          value={scheduled.length.toString()}
          change={`${scheduled.length} active`}
          isPositive={true}
          subtitle="Celery Cron Queue"
          icon={Clock}
        />
        <AnalyticsCard
          title="Engagement Rate"
          value="7.8%"
          change="+1.2%"
          isPositive={true}
          subtitle="Personal Profile Average"
          icon={Sparkles}
        />
        <AnalyticsCard
          title="Published Archive"
          value={published.length.toString()}
          change={`${published.length} live`}
          isPositive={true}
          subtitle="Total Dispatched"
          icon={CheckCircle}
        />
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Bento Column: Next Post & Queue (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Next Up Hero Card */}
          {nextScheduled ? (
            <div className="p-6 md:p-8 rounded-3xl bg-zinc-950 border border-zinc-800/80 space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-600/10 to-transparent rounded-bl-full pointer-events-none" />

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-violet-950/40 text-violet-300 border border-violet-800/40 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-violet-400" />
                  <span>Next Personal Post In Queue</span>
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {nextScheduled.scheduledTime ? new Date(nextScheduled.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }) : 'Soon'}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {nextScheduled.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                  {nextScheduled.contentLinkedin || nextScheduled.contentInstagram}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {nextScheduled.platforms.map((pl) => (
                    <span key={pl} className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                      {pl}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEditPost(nextScheduled)}
                    className="text-xs font-bold px-4 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onPublishNow(nextScheduled.id)}
                    className="text-xs font-bold px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 text-white shadow-sm shadow-pink-500/20 active:scale-95 transition-all"
                  >
                    Publish Now
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 md:p-8 rounded-3xl bg-zinc-950 border border-zinc-800/80 text-center space-y-3">
              <p className="text-sm font-bold text-white">Your personal queue is currently clear.</p>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Schedule your next personal story or lesson learned to maintain weekly consistency.
              </p>
              <button
                onClick={() => onNavigate('create')}
                className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-violet-600 rounded-full shadow-md shadow-pink-500/20"
              >
                + Craft New Post
              </button>
            </div>
          )}

          {/* Quick Idea Sparks */}
          <div className="p-6 md:p-8 rounded-3xl bg-zinc-950 border border-zinc-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>Personal Story Starters</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {creatorInspirationTopics.map((topic, i) => (
                <button
                  key={i}
                  onClick={() => onQuickCreateWithTopic(topic)}
                  className="p-3.5 rounded-2xl bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-pink-500/50 text-left transition-all group"
                >
                  <p className="text-xs font-semibold text-zinc-300 group-hover:text-white line-clamp-1">
                    "{topic}"
                  </p>
                  <span className="text-[10px] text-pink-400 font-bold mt-1 inline-block group-hover:translate-x-1 transition-transform">
                    Draft this story →
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Scheduled Posts Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                Active Personal Queue ({scheduled.length})
              </h3>
              <button
                onClick={() => onNavigate('scheduled')}
                className="text-xs font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1 transition-colors"
              >
                <span>View Full Queue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {scheduled.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {scheduled.slice(0, 2).map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onEdit={onEditPost}
                    onDelete={onDeletePost}
                    onPublishNow={onPublishNow}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Right Bento Column: Connected Personal Profiles & Sync (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Individual Connected Profiles Bento Card */}
          <div className="p-6 md:p-8 rounded-3xl bg-zinc-950 border border-zinc-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-pink-400" />
                <span>My Connected Accounts</span>
              </h3>
              <button
                onClick={() => onNavigate('settings')}
                className="text-xs font-bold text-pink-400 hover:text-pink-300"
              >
                Edit
              </button>
            </div>

            <div className="space-y-3">
              {/* LinkedIn Personal Profile */}
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{linkedinAccount?.accountName || 'Alexander Hayes'}</div>
                      <div className="text-[10px] text-zinc-400">Personal LinkedIn Profile</div>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[11px] text-zinc-400 flex justify-between pt-1 border-t border-zinc-800/60">
                  <span>Network:</span>
                  <span className="font-bold text-white">{linkedinAccount?.followersCount ? `${(linkedinAccount.followersCount / 1000).toFixed(1)}k Connections` : '14.8k'}</span>
                </div>
              </div>

              {/* Instagram Personal Creator Profile */}
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{instagramAccount?.username || '@alexander.builds'}</div>
                      <div className="text-[10px] text-zinc-400">Personal Creator IG</div>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[11px] text-zinc-400 flex justify-between pt-1 border-t border-zinc-800/60">
                  <span>Followers:</span>
                  <span className="font-bold text-white">{instagramAccount?.followersCount ? `${(instagramAccount.followersCount / 1000).toFixed(1)}k Followers` : '28.4k'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Google Sheets Calendar Pipeline Bento Tile */}
          <div className="p-6 md:p-8 rounded-3xl bg-zinc-950 border border-zinc-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Google Sheets Sync</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/50 text-emerald-300 border border-emerald-800/50">
                Connected
              </span>
            </div>

            <p className="text-xs text-zinc-400">
              Two-way sync between your personal content calendar sheet and the Django Celery dispatcher.
            </p>

            <button
              onClick={() => onNavigate('sheets')}
              className="w-full py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-xs font-bold text-zinc-200 hover:text-white border border-zinc-800 transition-all flex items-center justify-center gap-2"
            >
              <span>Manage Sheets Calendar</span>
              <ArrowRight className="w-3.5 h-3.5 text-pink-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
