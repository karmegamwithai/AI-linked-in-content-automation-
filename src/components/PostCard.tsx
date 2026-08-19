import React from 'react';
import { 
  Linkedin, 
  Instagram, 
  Clock, 
  Edit3, 
  Trash2, 
  Send, 
  TrendingUp, 
  Eye, 
  MessageSquare, 
  Heart,
  Share2,
  Table
} from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
  onPublishNow?: (id: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onEdit,
  onDelete,
  onPublishNow,
}) => {
  const isScheduled = post.status === 'scheduled';
  const isPublished = post.status === 'published';
  const isDraft = post.status === 'draft';

  const hasLinkedin = post.platforms.includes('linkedin');
  const hasInstagram = post.platforms.includes('instagram');

  return (
    <div className="p-6 md:p-7 rounded-3xl bg-zinc-950 border border-zinc-800/80 space-y-4 hover:border-zinc-700/80 transition-all flex flex-col justify-between group shadow-none relative overflow-hidden">
      <div className="space-y-3">
        {/* Card Header: Platforms & Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {hasLinkedin && (
              <span className="p-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-sky-400">
                <Linkedin className="w-3.5 h-3.5" />
              </span>
            )}
            {hasInstagram && (
              <span className="p-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-pink-400">
                <Instagram className="w-3.5 h-3.5" />
              </span>
            )}
            {post.googleSheetsRowId && (
              <span 
                className="p-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-emerald-400"
                title={`Linked to Google Sheets Row #${post.googleSheetsRowId}`}
              >
                <Table className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                isPublished
                  ? 'bg-gradient-to-r from-pink-500/20 to-violet-500/20 text-pink-300 border border-pink-500/30'
                  : isScheduled
                  ? 'bg-violet-950/40 text-violet-300 border border-violet-800/50'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
              }`}
            >
              {post.status}
            </span>
          </div>
        </div>

        {/* Post Title */}
        <h4 className="text-base font-bold text-white tracking-tight line-clamp-1 group-hover:text-pink-300 transition-colors">
          {post.title}
        </h4>

        {/* Content Snippet */}
        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 font-normal">
          {post.contentLinkedin || post.contentInstagram || 'No content drafted.'}
        </p>

        {/* Media Preview if attached */}
        {post.mediaUrls && post.mediaUrls.length > 0 && (
          <div className="rounded-2xl overflow-hidden aspect-video bg-black border border-zinc-800/80 mt-2">
            <img
              src={post.mediaUrls[0]}
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {post.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-[10px] font-medium text-pink-400/80 bg-zinc-900 px-2.5 py-0.5 rounded-full border border-zinc-800/80">
                #{tag.replace('#', '')}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-[10px] text-zinc-500 font-medium px-1">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Details & Actions */}
      <div className="pt-4 border-t border-zinc-900 space-y-3">
        {/* Schedule / Published timestamp or Analytics */}
        <div className="flex items-center justify-between text-xs text-zinc-400">
          {isScheduled && post.scheduledTime && (
            <span className="flex items-center gap-1 font-mono text-[11px] text-violet-300">
              <Clock className="w-3.5 h-3.5 text-violet-400" />
              <span>{new Date(post.scheduledTime).toLocaleDateString()} at {new Date(post.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </span>
          )}

          {isPublished && post.analytics && (
            <div className="flex items-center gap-3 text-[11px] font-bold text-zinc-300">
              <span className="flex items-center gap-1 text-pink-400">
                <Eye className="w-3 h-3" /> {(post.analytics.impressions / 1000).toFixed(1)}k
              </span>
              <span className="flex items-center gap-1 text-zinc-400">
                <Heart className="w-3 h-3" /> {post.analytics.likes}
              </span>
              <span className="flex items-center gap-1 text-zinc-400">
                <MessageSquare className="w-3 h-3" /> {post.analytics.comments}
              </span>
            </div>
          )}

          {isDraft && (
            <span className="text-[11px] text-zinc-500">
              Updated {new Date(post.updatedAt).toLocaleDateString()}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onEdit(post)}
              className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs transition-all"
              title="Edit Post"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="p-2 rounded-full bg-zinc-900 hover:bg-rose-950/40 text-zinc-400 hover:text-rose-400 border border-zinc-800 text-xs transition-all"
              title="Delete Post"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {isScheduled && onPublishNow && (
            <button
              onClick={() => onPublishNow(post.id)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 rounded-full shadow-sm shadow-pink-500/20 active:scale-95 transition-all"
            >
              <Send className="w-3 h-3" />
              <span>Publish Now</span>
            </button>
          )}

          {isDraft && onPublishNow && (
            <button
              onClick={() => onPublishNow(post.id)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-zinc-800 hover:bg-zinc-700 rounded-full transition-all"
            >
              <Send className="w-3 h-3" />
              <span>Dispatch</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
