import React, { useState } from 'react';
import { CheckCircle2, TrendingUp, Eye, Heart, MessageSquare, Repeat2, ArrowUpRight } from 'lucide-react';
import { Post } from '../types';
import { PostCard } from '../components/PostCard';

interface PublishedPostsProps {
  posts: Post[];
  onEditPost: (post: Post) => void;
  onDeletePost: (id: string) => void;
  onDuplicatePost: (post: Post) => void;
}

export const PublishedPosts: React.FC<PublishedPostsProps> = ({
  posts,
  onEditPost,
  onDeletePost,
  onDuplicatePost,
}) => {
  const [filterPlatform, setFilterPlatform] = useState<'all' | 'linkedin' | 'instagram'>('all');

  const published = posts
    .filter((p) => p.status === 'published')
    .filter((p) => (filterPlatform === 'all' ? true : p.platforms.includes(filterPlatform)))
    .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());

  const totalImpressions = published.reduce((acc, p) => acc + (p.analytics?.impressions || 0), 0);
  const totalLikes = published.reduce((acc, p) => acc + (p.analytics?.likes || 0), 0);
  const totalComments = published.reduce((acc, p) => acc + (p.analytics?.comments || 0), 0);

  return (
    <div id="page-published-posts" className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-zinc-50 border border-black/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-black tracking-tight">
              Published Archive
            </h1>
            <span className="text-xs font-bold px-3 py-1 bg-black text-white rounded-full">
              {published.length} Live
            </span>
          </div>
          <p className="text-xs text-black/40 font-bold uppercase tracking-wider mt-0.5">
            Historical distribution metrics & performance telemetry
          </p>
        </div>

        {/* Platform Filters */}
        <div className="flex items-center bg-white p-1 rounded-full border border-black/5 text-xs font-semibold">
          {(['all', 'linkedin', 'instagram'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setFilterPlatform(p)}
              className={`px-3.5 py-1.5 rounded-full capitalize transition-all ${
                filterPlatform === p
                  ? 'bg-black text-white font-bold'
                  : 'text-black/50 hover:text-black'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Aggregate Performance Bento Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-zinc-50 border border-black/5">
          <span className="text-xs font-bold uppercase tracking-widest text-black/40">Total Impressions</span>
          <div className="text-3xl lg:text-4xl font-black text-black mt-2">
            {(totalImpressions / 1000).toFixed(1)}k
          </div>
          <p className="text-xs text-black/50 mt-1">LinkedIn & IG Combined</p>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-50 border border-black/5">
          <span className="text-xs font-bold uppercase tracking-widest text-black/40">Total Reactions</span>
          <div className="text-3xl lg:text-4xl font-black text-black mt-2">{totalLikes}</div>
          <p className="text-xs text-black/50 mt-1">Organic Applauds & Likes</p>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-50 border border-black/5">
          <span className="text-xs font-bold uppercase tracking-widest text-black/40">Discussion Comments</span>
          <div className="text-3xl lg:text-4xl font-black text-black mt-2">{totalComments}</div>
          <p className="text-xs text-black/50 mt-1">Direct Community Engagements</p>
        </div>
      </div>

      {/* Grid of Published Posts */}
      {published.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {published.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={onEditPost}
              onDelete={onDeletePost}
              onDuplicate={onDuplicatePost}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-zinc-50 border border-black/5 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 mx-auto text-black/30" />
          <h3 className="text-base font-bold text-black">No published posts yet</h3>
          <p className="text-xs text-black/50 max-w-md mx-auto">
            Posts that have been published through Celery background tasks or manual dispatch will appear here.
          </p>
        </div>
      )}
    </div>
  );
};
