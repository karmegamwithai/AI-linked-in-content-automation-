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
    <div id="page-dashboard" className="space-y-4 sm:space-y-6">
      {/* Header Bento Tile */}
      <div className="p-4 sm:p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 relative overflow-hidden shadow-xs">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-pink-500/10 via-violet-600/10 to-transparent rounded-bl-full pointer-events-none" />

        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-500/10 to-violet-500/10 text-pink-700 border border-pink-500/20 flex items-center gap-1">
              <Zap className="w-3 h-3 text-pink-600" />
              <span>Solo Creator Engine</span>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-4xl font-black text-zinc-900 tracking-tight">
            Personal Creator Studio
          </h1>
          <p className="text-[11px] sm:text-xs text-zinc-500 font-medium">
            Automating personal LinkedIn storytelling & Instagram creator posts with zero manual overhead
          </p>
        </div>

        {/* Quick Idea Input with Gradient Action */}
        <form
          onSubmit={handleQuickCreateSubmit}
          className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-zinc-200 focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500/30 transition-all z-10 w-full md:w-auto shadow-2xs"
        >
          <input
            type="text"
            placeholder="Type a personal lesson or idea..."
            value={quickIdea}
            onChange={(e) => setQuickIdea(e.target.value)}
            className="px-3 sm:px-4 py-2 text-xs bg-transparent text-zinc-900 placeholder:text-zinc-400 focus:outline-none flex-1 md:w-64 font-medium"
          />
          <button
            type="submit"
            disabled={!quickIdea.trim()}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 rounded-full shadow-md shadow-pink-500/20 disabled:opacity-40 transition-all shrink-0 active:scale-95 min-h-[38px]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Draft</span>
          </button>
        </form>
      </div>

      {/* KPI Bento Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left Bento Column: Next Post & Queue (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Next Up Hero Card */}
          {nextScheduled ? (
            <div className="p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-4 relative overflow-hidden group shadow-xs">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-600/10 to-transparent rounded-bl-full pointer-events-none" />

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-violet-600" />
                  <span>Next Personal Post In Queue</span>
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  {nextScheduled.scheduledTime ? new Date(nextScheduled.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }) : 'Soon'}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
                  {nextScheduled.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed line-clamp-2">
                  {nextScheduled.contentLinkedin || nextScheduled.contentInstagram}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {nextScheduled.platforms.map((pl) => (
                    <span key={pl} className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-white border border-zinc-200 text-zinc-700 shadow-2xs">
                      {pl}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEditPost(nextScheduled)}
                    className="text-xs font-bold px-4 py-1.5 rounded-full bg-white hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900 border border-zinc-200 transition-all shadow-2xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onPublishNow(nextScheduled.id)}
                    className="text-xs font-bold px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 text-white shadow-xs shadow-pink-500/20 active:scale-95 transition-all"
                  >
                    Publish Now
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 text-center space-y-3 shadow-xs">
              <p className="text-sm font-bold text-zinc-900">Your personal queue is currently clear.</p>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
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
          <div className="p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-600" />
                <span>Personal Story Starters</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {creatorInspirationTopics.map((topic, i) => (
                <button
                  key={i}
                  onClick={() => onQuickCreateWithTopic(topic)}
                  className="p-3.5 rounded-2xl bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-pink-500 text-left transition-all group shadow-2xs"
                >
                  <p className="text-xs font-semibold text-zinc-800 group-hover:text-zinc-900 line-clamp-1">
                    "{topic}"
                  </p>
                  <span className="text-[10px] text-pink-600 font-bold mt-1 inline-block group-hover:translate-x-1 transition-transform">
                    Draft this story →
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Scheduled Posts Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                Active Personal Queue ({scheduled.length})
              </h3>
              <button
                onClick={() => onNavigate('scheduled')}
                className="text-xs font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1 transition-colors"
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
          <div className="p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 tracking-tight flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-pink-600" />
                <span>My Connected Accounts</span>
              </h3>
              <button
                onClick={() => onNavigate('settings')}
                className="text-xs font-bold text-pink-600 hover:text-pink-700"
              >
                Edit
              </button>
            </div>

            <div className="space-y-3">
              {/* LinkedIn Personal Profile */}
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-900">{linkedinAccount?.accountName || 'Alexander Hayes'}</div>
                      <div className="text-[10px] text-zinc-500">Personal LinkedIn Profile</div>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[11px] text-zinc-500 flex justify-between pt-1 border-t border-zinc-100">
                  <span>Network:</span>
                  <span className="font-bold text-zinc-900">{linkedinAccount?.followersCount ? `${(linkedinAccount.followersCount / 1000).toFixed(1)}k Connections` : '14.8k'}</span>
                </div>
              </div>

              {/* Instagram Personal Creator Profile */}
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center border border-pink-100">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-900">{instagramAccount?.username || '@alexander.builds'}</div>
                      <div className="text-[10px] text-zinc-500">Personal Creator IG</div>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[11px] text-zinc-500 flex justify-between pt-1 border-t border-zinc-100">
                  <span>Followers:</span>
                  <span className="font-bold text-zinc-900">{instagramAccount?.followersCount ? `${(instagramAccount.followersCount / 1000).toFixed(1)}k Followers` : '28.4k'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Google Sheets Calendar Pipeline Bento Tile */}
          <div className="p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-zinc-900">Google Sheets Sync</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Connected
              </span>
            </div>

            <p className="text-xs text-zinc-600">
              Two-way sync between your personal content calendar sheet and the Django Celery dispatcher.
            </p>

            <button
              onClick={() => onNavigate('sheets')}
              className="w-full py-2.5 rounded-full bg-white hover:bg-zinc-100 text-xs font-bold text-zinc-700 hover:text-zinc-900 border border-zinc-200 transition-all flex items-center justify-center gap-2 shadow-2xs"
            >
              <span>Manage Sheets Calendar</span>
              <ArrowRight className="w-3.5 h-3.5 text-pink-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
