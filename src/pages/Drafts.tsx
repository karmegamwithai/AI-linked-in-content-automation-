import React from 'react';
import { 
  FileText, 
  Plus, 
  Sparkles, 
  PenSquare
} from 'lucide-react';
import { Post } from '../types';
import { PostCard } from '../components/PostCard';

interface DraftsProps {
  posts: Post[];
  onEditPost: (post: Post) => void;
  onDeletePost: (id: string) => void;
  onPublishNow: (id: string) => void;
  onOpenCreate: () => void;
}

export const Drafts: React.FC<DraftsProps> = ({
  posts,
  onEditPost,
  onDeletePost,
  onPublishNow,
  onOpenCreate,
}) => {
  const drafts = posts.filter((p) => p.status === 'draft');

  return (
    <div id="page-drafts" className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 relative overflow-hidden shadow-xs">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-500/10 via-violet-600/10 to-transparent rounded-bl-full pointer-events-none" />

        <div className="z-10">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">
              Personal Drafts & Idea Bank
            </h1>
            <span className="text-[10px] font-bold px-2.5 py-0.5 bg-zinc-100 text-zinc-700 rounded-full border border-zinc-200">
              {drafts.length} Unfinished Ideas
            </span>
          </div>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Work-in-progress thoughts, unrefined reflections, and raw outlines
          </p>
        </div>

        <button
          id="btn-create-draft"
          onClick={onOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 text-white text-xs font-bold rounded-full shadow-md shadow-pink-500/20 transition-all z-10 active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ New Idea Draft</span>
        </button>
      </div>

      {/* Grid of Drafts */}
      {drafts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drafts.map((post) => (
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
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900">No drafts in your bank</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Jot down loose thoughts or let Gemini AI draft a personal hook that you can finish later.
          </p>
          <button
            onClick={onOpenCreate}
            className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-violet-600 text-white text-xs font-bold rounded-full shadow-md shadow-pink-500/20"
          >
            + Start a Quick Draft
          </button>
        </div>
      )}
    </div>
  );
};
