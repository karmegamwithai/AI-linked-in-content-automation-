import React from 'react';
import { 
  CheckCircle, 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageSquare, 
  Share2,
  Sparkles
} from 'lucide-react';
import { Post } from '../types';
import { PostCard } from '../components/PostCard';

interface PublishedPostsProps {
  posts: Post[];
  onEditPost: (post: Post) => void;
  onDeletePost: (id: string) => void;
}

export const PublishedPosts: React.FC<PublishedPostsProps> = ({
  posts,
  onEditPost,
  onDeletePost,
}) => {
  const published = posts.filter((p) => p.status === 'published');

  const totalImpressions = published.reduce((acc, p) => acc + (p.analytics?.impressions || 0), 0);
  const totalLikes = published.reduce((acc, p) => acc + (p.analytics?.likes || 0), 0);
  const totalComments = published.reduce((acc, p) => acc + (p.analytics?.comments || 0), 0);

  return (
    <div id="page-published-posts" className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 relative overflow-hidden shadow-xs">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-500/10 via-violet-600/10 to-transparent rounded-bl-full pointer-events-none" />

        <div className="z-10">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">
              Published Content Archive
            </h1>
            <span className="text-[10px] font-bold px-2.5 py-0.5 bg-pink-50 text-pink-700 border border-pink-200 rounded-full">
              {published.length} Live Posts
            </span>
          </div>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Historical log of live posts across your personal LinkedIn and Instagram creator accounts
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold z-10">
          <div className="flex items-center gap-1.5 text-pink-700 bg-white px-3.5 py-1.5 rounded-full border border-zinc-200 shadow-2xs">
            <Eye className="w-3.5 h-3.5 text-pink-600" />
            <span>{(totalImpressions / 1000).toFixed(1)}k Total Reach</span>
          </div>
          <div className="flex items-center gap-1.5 text-violet-700 bg-white px-3.5 py-1.5 rounded-full border border-zinc-200 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-violet-600" />
            <span>{totalLikes} Likes</span>
          </div>
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
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-zinc-50 border border-zinc-200 space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center mx-auto text-pink-600 shadow-2xs">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900">No published posts recorded yet</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Dispatched posts and their live telemetry from your LinkedIn and Instagram feeds will aggregate here.
          </p>
        </div>
      )}
    </div>
  );
};
