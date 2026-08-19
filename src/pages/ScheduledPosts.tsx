import React, { useState } from 'react';
import { Clock, Plus, Filter, Calendar, Sparkles } from 'lucide-react';
import { Post } from '../types';
import { PostCard } from '../components/PostCard';

interface ScheduledPostsProps {
  posts: Post[];
  onEditPost: (post: Post) => void;
  onDeletePost: (id: string) => void;
  onPublishNow: (post: Post) => void;
  onOpenCreate: () => void;
}

export const ScheduledPosts: React.FC<ScheduledPostsProps> = ({
  posts,
  onEditPost,
  onDeletePost,
  onPublishNow,
  onOpenCreate,
}) => {
  const [filterPlatform, setFilterPlatform] = useState<'all' | 'linkedin' | 'instagram'>('all');

  const scheduled = posts
    .filter((p) => p.status === 'scheduled')
    .filter((p) => (filterPlatform === 'all' ? true : p.platforms.includes(filterPlatform)))
    .sort((a, b) => new Date(a.scheduledTime || 0).getTime() - new Date(b.scheduledTime || 0).getTime());

  return (
    <div id="page-scheduled-posts" className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-zinc-50 border border-black/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-black tracking-tight">
              Scheduled Queue
            </h1>
            <span className="text-xs font-bold px-3 py-1 bg-black text-white rounded-full">
              {scheduled.length} Queued
            </span>
          </div>
          <p className="text-xs text-black/40 font-bold uppercase tracking-wider mt-0.5">
            Celery async workers handle automated payload dispatch to LinkedIn & Instagram
          </p>
        </div>

        <div className="flex items-center gap-2">
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

          <button
            id="btn-schedule-new-post"
            onClick={onOpenCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:opacity-90 transition-all shadow-xs active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Schedule Post</span>
          </button>
        </div>
      </div>

      {/* Grid of Scheduled Posts */}
      {scheduled.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scheduled.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={onEditPost}
              onDelete={onDeletePost}
              onPublishNow={onPublishNow}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-zinc-50 border border-black/5 text-center space-y-3">
          <Clock className="w-10 h-10 mx-auto text-black/30" />
          <h3 className="text-base font-bold text-black">No scheduled posts</h3>
          <p className="text-xs text-black/50 max-w-md mx-auto">
            Your automated queue is currently empty. Craft a new post with Gemini AI or sync directly from your Google Sheets pipeline.
          </p>
          <button
            onClick={onOpenCreate}
            className="mt-2 px-6 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:opacity-90"
          >
            + Create Next Post
          </button>
        </div>
      )}
    </div>
  );
};
