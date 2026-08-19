import React from 'react';
import { FileText, Plus, ArrowRight } from 'lucide-react';
import { Post } from '../types';
import { PostCard } from '../components/PostCard';

interface DraftsProps {
  posts: Post[];
  onEditPost: (post: Post) => void;
  onDeletePost: (id: string) => void;
  onPublishNow: (post: Post) => void;
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-zinc-50 border border-black/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-black tracking-tight">
              Drafts Bank
            </h1>
            <span className="text-xs font-bold px-3 py-1 bg-black text-white rounded-full">
              {drafts.length} Ideas
            </span>
          </div>
          <p className="text-xs text-black/40 font-bold uppercase tracking-wider mt-0.5">
            WIP concepts, hooks, and unpublished social experiments
          </p>
        </div>

        <button
          id="btn-drafts-create"
          onClick={onOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:opacity-90 transition-all shadow-xs active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ New Draft</span>
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
        <div className="p-12 rounded-3xl bg-zinc-50 border border-black/5 text-center space-y-3">
          <FileText className="w-10 h-10 mx-auto text-black/30" />
          <h3 className="text-base font-bold text-black">No drafts saved</h3>
          <p className="text-xs text-black/50 max-w-md mx-auto">
            Use the editor to brainstorm concepts and save them as drafts for future review.
          </p>
          <button
            onClick={onOpenCreate}
            className="mt-2 px-6 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:opacity-90"
          >
            + Create First Draft
          </button>
        </div>
      )}
    </div>
  );
};
