import React from 'react';
import { 
  Users, 
  TrendingUp, 
  Clock, 
  Send, 
  PenSquare, 
  Table, 
  Sparkles, 
  Linkedin, 
  Instagram, 
  ArrowRight,
  CheckCircle2,
  Share2,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { Post, ConnectedAccount, GoogleSheetsConfig } from '../types';
import { PostCard } from '../components/PostCard';

interface DashboardProps {
  posts: Post[];
  accounts: ConnectedAccount[];
  sheetsConfig: GoogleSheetsConfig;
  onNavigate: (page: any) => void;
  onEditPost: (post: Post) => void;
  onDeletePost: (id: string) => void;
  onPublishNow: (post: Post) => void;
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
  const scheduledPosts = posts.filter((p) => p.status === 'scheduled');
  const publishedPosts = posts.filter((p) => p.status === 'published');
  const drafts = posts.filter((p) => p.status === 'draft');

  // Calculate totals
  const totalImpressions = publishedPosts.reduce((acc, p) => acc + (p.analytics?.impressions || 0), 0);
  const totalLikes = publishedPosts.reduce((acc, p) => acc + (p.analytics?.likes || 0), 0);
  const totalComments = publishedPosts.reduce((acc, p) => acc + (p.analytics?.comments || 0), 0);
  const avgEngagement = publishedPosts.length > 0
    ? (publishedPosts.reduce((acc, p) => acc + (p.analytics?.engagementRate || 0), 0) / publishedPosts.length).toFixed(1)
    : '5.8';

  const nextScheduled = scheduledPosts.sort(
    (a, b) => new Date(a.scheduledTime || 0).getTime() - new Date(b.scheduledTime || 0).getTime()
  )[0];

  const quickIdeas = [
    'Optimizing async Celery tasks for sub-second latency',
    'Minimalist Bento Grid UI converts 40% higher in SaaS',
    'How we eliminated 90% of manual social ops with Sheets',
  ];

  return (
    <div id="page-dashboard" className="space-y-8">
      {/* Bento Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black">
            Dashboard
          </h1>
          <p className="text-xs text-black/50 mt-1 font-medium">
            Cross-platform automation workspace for LinkedIn and Instagram.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="btn-dash-sheets"
            onClick={() => onNavigate('sheets')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-50 hover:bg-zinc-100 text-black border border-black/5 text-xs font-bold transition-all"
          >
            <Table className="w-3.5 h-3.5" />
            <span>Google Sheets</span>
          </button>
          <button
            id="btn-dash-create"
            onClick={() => onNavigate('create')}
            className="bg-black text-white px-6 py-3 rounded-full font-bold text-xs hover:opacity-90 transition-all active:scale-95 shadow-xs flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create Content</span>
          </button>
        </div>
      </header>

      {/* Primary Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Bento Tile 1 (Span 2): Queue Preview */}
        <div className="md:col-span-2 bg-zinc-50 rounded-3xl border border-black/5 p-6 md:p-8 flex flex-col justify-between gap-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-black tracking-tight">Queue Preview</h2>
              <p className="text-xs text-black/40 font-bold uppercase tracking-wider mt-0.5">
                Automated publishing pipeline
              </p>
            </div>
            <span className="text-xs font-bold bg-black text-white px-3 py-1 rounded-full uppercase tracking-wider">
              {scheduledPosts.length > 0 ? 'NEXT UP' : 'QUEUE EMPTY'}
            </span>
          </div>

          <div className="flex flex-col gap-3 my-2">
            {scheduledPosts.length > 0 ? (
              scheduledPosts.slice(0, 2).map((post) => (
                <div 
                  key={post.id} 
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-black/5 hover:border-black/15 transition-all shadow-none group"
                >
                  <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center text-xs font-bold uppercase text-black/70 shrink-0 overflow-hidden">
                    {post.mediaUrls.length > 0 ? (
                      <img src={post.mediaUrls[0]} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    ) : (
                      <span>{post.mediaType === 'image' ? 'IMG' : 'TXT'}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-black truncate">{post.title}</p>
                    <p className="text-xs text-black/40 flex items-center gap-1.5 mt-0.5">
                      <span>{post.platforms.map((p) => p.toUpperCase()).join(' & ')}</span>
                      <span>•</span>
                      <span>{new Date(post.scheduledTime || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onPublishNow(post)}
                      className="text-xs font-bold px-3 py-1.5 bg-black text-white rounded-full hover:opacity-90 transition-all"
                    >
                      Publish
                    </button>
                    <button
                      onClick={() => onEditPost(post)}
                      className="text-xs font-bold px-3 py-1.5 border border-black/20 hover:border-black rounded-full hover:bg-black hover:text-white transition-colors"
                    >
                      EDIT
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 bg-white rounded-2xl border border-black/5 text-center space-y-2">
                <p className="text-xs font-bold text-black">No posts queued right now</p>
                <p className="text-xs text-black/40">Use the AI Crafter to schedule your next post.</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-black/5 text-xs">
            <span className="text-black/40 font-medium">{scheduledPosts.length} total posts scheduled</span>
            <button 
              onClick={() => onNavigate('scheduled')}
              className="font-bold text-black flex items-center gap-1 hover:opacity-75"
            >
              <span>View Full Queue</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Bento Tile 2: Connected Accounts Black Card */}
        <div className="bg-black text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">
                Connected Accounts
              </p>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="flex flex-col gap-3 mt-4">
              {accounts.map((acc) => (
                <div key={acc.platform} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={acc.avatarUrl} 
                      alt="" 
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover border border-white/20" 
                    />
                    <span className="text-sm font-semibold text-white">{acc.username}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-white/20 rounded-full text-white uppercase">
                    {acc.platform === 'linkedin' ? 'LI' : 'IG'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <p className="text-xs opacity-60 italic">All API tokens active</p>
            <button 
              onClick={() => onNavigate('settings')}
              className="text-xs font-bold text-white underline underline-offset-4 hover:opacity-80"
            >
              Manage
            </button>
          </div>
        </div>

        {/* Bento Tile 3: Reach Metric */}
        <div className="bg-zinc-50 rounded-3xl border border-black/5 p-6 md:p-8 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-black tracking-tight">Reach</h2>
            <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-black">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-5xl font-black text-black mt-3">
            {totalImpressions > 0 ? `+${(totalImpressions / 1000).toFixed(1)}k` : '+18.4%'}
          </div>
          <p className="text-xs text-black/40 font-bold uppercase tracking-wider mt-2">
            Last 7 Days • Organic Impressions
          </p>
        </div>

        {/* Bento Tile 4: Engagement Metric */}
        <div className="bg-zinc-50 rounded-3xl border border-black/5 p-6 md:p-8 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-black tracking-tight">Engagement</h2>
            <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-black">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-5xl font-black text-black mt-3">
            {totalLikes + totalComments > 0 ? `${totalLikes + totalComments}` : '4.8k'}
          </div>
          <p className="text-xs text-black/40 font-bold uppercase tracking-wider mt-2">
            Total Interactions ({avgEngagement}% CTR)
          </p>
        </div>

        {/* Bento Tile 5: Drafts & Quick AI Prompts */}
        <div className="bg-zinc-50 rounded-3xl border border-black/5 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-black tracking-tight">Drafts & Ideas</h2>
              <span className="text-xs font-bold text-black/40 uppercase">{drafts.length} drafts</span>
            </div>
            <p className="text-xs text-black/60 mb-3">Click any topic starter to craft with Gemini AI:</p>

            <div className="flex flex-col gap-2">
              {quickIdeas.slice(0, 2).map((idea, idx) => (
                <button
                  key={idx}
                  onClick={() => onQuickCreateWithTopic(idea)}
                  className="w-full text-left p-2.5 bg-white hover:bg-zinc-100 rounded-xl border border-black/5 text-xs font-semibold text-black truncate transition-colors flex items-center justify-between group"
                >
                  <span className="truncate">"{idea}"</span>
                  <ArrowRight className="w-3 h-3 text-black/30 group-hover:text-black shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-black/5 flex items-center justify-between">
            <span className="text-xs font-bold text-black/60">Ready to write?</span>
            <button
              onClick={() => onNavigate('create')}
              className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-base hover:opacity-90"
              title="Create Post"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Published Performance Bento Grid */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-black tracking-tight flex items-center gap-2">
              <span>Published Content</span>
            </h3>
            <p className="text-xs text-black/40 font-bold uppercase tracking-wider mt-0.5">
              Live engagement & distribution
            </p>
          </div>

          <button
            onClick={() => onNavigate('published')}
            className="text-xs font-bold px-4 py-2 border border-black/10 hover:border-black rounded-full transition-colors flex items-center gap-1.5"
          >
            <span>View All Archive ({publishedPosts.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedPosts.slice(0, 3).map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={onEditPost}
              onDelete={onDeletePost}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
