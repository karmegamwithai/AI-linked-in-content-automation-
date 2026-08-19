import React from 'react';
import { 
  Linkedin, 
  Instagram, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Trash2, 
  Edit3, 
  Send, 
  Eye, 
  Heart, 
  MessageSquare, 
  Repeat2,
  Table,
  Check
} from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
  onPublishNow?: (post: Post) => void;
  onDuplicate?: (post: Post) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onEdit,
  onDelete,
  onPublishNow,
  onDuplicate,
}) => {
  const isPublished = post.status === 'published';
  const isScheduled = post.status === 'scheduled';
  const isDraft = post.status === 'draft';

  const formatDateTime = (isoString?: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      id={`post-card-${post.id}`}
      className="flex flex-col justify-between p-6 rounded-3xl bg-zinc-50 border border-black/5 hover:border-black/20 transition-all shadow-none group"
    >
      <div>
        {/* Top bar: Platforms & Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Platforms */}
          <div className="flex items-center gap-1.5">
            {post.platforms.includes('linkedin') && (
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-black/5 text-black text-[11px] font-bold shadow-2xs">
                <Linkedin className="w-3 h-3" />
                <span>LI</span>
              </span>
            )}
            {post.platforms.includes('instagram') && (
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-black/5 text-black text-[11px] font-bold shadow-2xs">
                <Instagram className="w-3 h-3" />
                <span>IG</span>
              </span>
            )}
            {post.googleSheetsRowId && (
              <span 
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/5 text-black/60 text-[10px] font-mono"
                title={`Google Sheets Row #${post.googleSheetsRowId}`}
              >
                <Table className="w-2.5 h-2.5" />
                <span>Row {post.googleSheetsRowId}</span>
              </span>
            )}
          </div>

          {/* Status Badge */}
          <div>
            {isPublished && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-wider">
                <Check className="w-3 h-3" />
                <span>Published</span>
              </span>
            )}
            {isScheduled && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-black/10 text-black text-[10px] font-bold">
                <Clock className="w-3 h-3 text-black" />
                <span>{formatDateTime(post.scheduledTime)}</span>
              </span>
            )}
            {isDraft && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/5 text-black/60 text-[10px] font-bold uppercase">
                <FileText className="w-3 h-3" />
                <span>Draft</span>
              </span>
            )}
          </div>
        </div>

        {/* Post Title */}
        <h3 className="text-base font-bold text-black line-clamp-1 mb-2">
          {post.title}
        </h3>

        {/* Media Thumbnail */}
        {post.mediaUrls.length > 0 && (
          <div className="relative mb-3 rounded-2xl overflow-hidden bg-zinc-100 border border-black/5 aspect-video max-h-44">
            <img
              src={post.mediaUrls[0]}
              alt={post.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
            {post.mediaUrls.length > 1 && (
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black text-white text-[10px] font-bold">
                1/{post.mediaUrls.length} Slides
              </span>
            )}
          </div>
        )}

        {/* Post Content Snippet */}
        <p className="text-xs text-black/60 line-clamp-3 leading-relaxed mb-3 whitespace-pre-line font-medium">
          {post.contentLinkedin || post.contentInstagram}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2.5 py-0.5 rounded-full bg-white border border-black/5 text-black/70 font-semibold"
              >
                #{tag.replace('#', '')}
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        {/* Analytics if published */}
        {isPublished && post.analytics && (
          <div className="pt-3 mb-3 border-t border-black/5 grid grid-cols-4 gap-1.5 text-center">
            <div className="p-2 rounded-xl bg-white border border-black/5">
              <span className="text-[9px] font-bold uppercase text-black/40 flex items-center justify-center gap-0.5">
                <Eye className="w-2.5 h-2.5" /> Reach
              </span>
              <span className="text-xs font-black text-black">
                {(post.analytics.impressions / 1000).toFixed(1)}k
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-black/5">
              <span className="text-[9px] font-bold uppercase text-black/40 flex items-center justify-center gap-0.5">
                <Heart className="w-2.5 h-2.5" /> Likes
              </span>
              <span className="text-xs font-black text-black">{post.analytics.likes}</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-black/5">
              <span className="text-[9px] font-bold uppercase text-black/40 flex items-center justify-center gap-0.5">
                <MessageSquare className="w-2.5 h-2.5" /> Comm
              </span>
              <span className="text-xs font-black text-black">{post.analytics.comments}</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-black/5">
              <span className="text-[9px] font-bold uppercase text-black/40">CTR</span>
              <span className="text-xs font-black text-black">{post.analytics.engagementRate}%</span>
            </div>
          </div>
        )}

        {/* Card Actions */}
        <div className="pt-3 border-t border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              id={`btn-edit-post-${post.id}`}
              onClick={() => onEdit(post)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-black bg-white hover:bg-zinc-100 rounded-full transition-colors border border-black/10 shadow-2xs"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>

            {isScheduled && onPublishNow && (
              <button
                id={`btn-card-publish-now-${post.id}`}
                onClick={() => onPublishNow(post)}
                className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold text-white bg-black hover:opacity-90 rounded-full transition-colors shadow-2xs"
              >
                <Send className="w-3 h-3" />
                <span>Publish</span>
              </button>
            )}

            {isPublished && onDuplicate && (
              <button
                id={`btn-repurpose-post-${post.id}`}
                onClick={() => onDuplicate(post)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-black bg-white hover:bg-zinc-100 rounded-full transition-colors border border-black/10"
                title="Repurpose as new Draft"
              >
                <Repeat2 className="w-3 h-3" />
                <span>Repurpose</span>
              </button>
            )}
          </div>

          <button
            id={`btn-delete-post-${post.id}`}
            onClick={() => onDelete(post.id)}
            className="p-2 text-black/30 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors"
            title="Delete Post"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
