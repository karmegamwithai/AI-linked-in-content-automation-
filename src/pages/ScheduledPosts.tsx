import React from 'react';
import { 
  CalendarClock, 
  Plus, 
  Clock, 
  Sparkles, 
  Filter, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { Post } from '../types';
import { PostCard } from '../components/PostCard';

interface ScheduledPostsProps {
  posts: Post[];
  onEditPost: (post: Post) => void;
  onDeletePost: (id: string) => void;
  onPublishNow: (id: string) => void;
  onOpenCreate: () => void;
}

export const ScheduledPosts: React.FC<ScheduledPostsProps> = ({
  posts,
  onEditPost,
  onDeletePost,
  onPublishNow,
  onOpenCreate,
}) => {
  const scheduled = posts.filter((p) => p.status === 'scheduled');

  return (
    <div id="page-scheduled-posts" className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 relative overflow-hidden shadow-xs">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-500/10 via-violet-600/10 to-transparent rounded-bl-full pointer-events-none" />

        <div className="z-10">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">
              Personal Dispatch Queue
            </h1>
            <span className="text-[10px] font-bold px-2.5 py-0.5 bg-pink-50 text-pink-700 border border-pink-200 rounded-full">
              {scheduled.length} Scheduled
            </span>
          </div>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Automated personal LinkedIn & Instagram posts scheduled for background release
          </p>
        </div>

        <button
          id="btn-create-scheduled"
          onClick={onOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 text-white text-xs font-bold rounded-full shadow-md shadow-pink-500/20 transition-all z-10 active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Schedule Story</span>
        </button>
      </div>

      {/* Grid of Posts */}
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
        <div className="p-12 text-center rounded-3xl bg-zinc-50 border border-zinc-200 space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center mx-auto text-pink-600 shadow-2xs">
            <CalendarClock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900">No personal posts scheduled yet</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Queue your stories, technical learnings, and reflections to maintain an active personal brand presence.
          </p>
          <button
            onClick={onOpenCreate}
            className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-violet-600 text-white text-xs font-bold rounded-full shadow-md shadow-pink-500/20"
          >
            + Create Your First Post
          </button>
        </div>
      )}
    </div>
  );
};
