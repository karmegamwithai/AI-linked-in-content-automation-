import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Send, 
  Clock, 
  Save, 
  CheckCircle2, 
  Eye, 
  FileText,
  Zap
} from 'lucide-react';
import { Post, ConnectedAccount, Platform } from '../types';
import { PostEditor } from '../components/PostEditor';
import { PlatformSelector } from '../components/PlatformSelector';
import { SchedulePicker } from '../components/SchedulePicker';

interface CreatePostProps {
  initialPost?: Post | null;
  onSavePost: (post: Post) => void;
  onCancel: () => void;
  accounts: ConnectedAccount[];
}

export const CreatePost: React.FC<CreatePostProps> = ({
  initialPost,
  onSavePost,
  onCancel,
  accounts,
}) => {
  const [postData, setPostData] = useState<Partial<Post>>({
    id: initialPost?.id || `post_${Date.now()}`,
    title: initialPost?.title || '',
    contentLinkedin: initialPost?.contentLinkedin || '',
    contentInstagram: initialPost?.contentInstagram || '',
    mediaUrls: initialPost?.mediaUrls || [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1080&auto=format&fit=crop&q=80',
    ],
    mediaType: initialPost?.mediaType || 'image',
    aspectRatio: initialPost?.aspectRatio || '1:1',
    platforms: initialPost?.platforms || ['linkedin', 'instagram'],
    scheduledTime: initialPost?.scheduledTime || new Date(Date.now() + 86400000).toISOString(),
    status: initialPost?.status || 'scheduled',
    tags: initialPost?.tags || ['SoloCreator', 'PersonalBrand', 'Growth'],
    createdAt: initialPost?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const handleUpdate = (updates: Partial<Post>) => {
    setPostData((prev) => ({ ...prev, ...updates }));
  };

  const handleSaveClick = (forceStatus?: 'draft' | 'scheduled' | 'published') => {
    const finalStatus = forceStatus || postData.status || 'scheduled';
    const completePost: Post = {
      id: postData.id || `post_${Date.now()}`,
      title: postData.title || 'Personal Story Post',
      contentLinkedin: postData.contentLinkedin || '',
      contentInstagram: postData.contentInstagram || '',
      mediaUrls: postData.mediaUrls || [],
      mediaType: postData.mediaType || 'image',
      aspectRatio: postData.aspectRatio || '1:1',
      platforms: postData.platforms || ['linkedin', 'instagram'],
      scheduledTime: postData.scheduledTime,
      status: finalStatus,
      tags: postData.tags || [],
      author: initialPost?.author || 'Alexander Hayes',
      createdAt: postData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: finalStatus === 'published' ? new Date().toISOString() : undefined,
      analytics: finalStatus === 'published' ? {
        impressions: 1200,
        likes: 42,
        comments: 8,
        shares: 5,
        clicks: 64,
        engagementRate: 5.4,
      } : undefined,
    };

    onSavePost(completePost);
  };

  return (
    <div id="page-create-post" className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 relative overflow-hidden shadow-xs">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-pink-500/10 via-violet-600/10 to-transparent rounded-bl-full pointer-events-none" />

        <div className="flex items-center gap-4 z-10">
          <button
            onClick={onCancel}
            className="p-2.5 rounded-full bg-white hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900 border border-zinc-200 transition-all shadow-2xs"
            title="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight flex items-center gap-2">
              <span>{initialPost ? 'Edit Personal Post' : 'Craft Personal Story'}</span>
            </h1>
            <p className="text-[10px] text-pink-600 font-bold uppercase tracking-wider mt-0.5">
              Personal LinkedIn Profile & Creator Instagram Engine
            </p>
          </div>
        </div>

        {/* Action Controls with Pink/Violet Gradient */}
        <div className="flex items-center gap-2 z-10">
          <button
            id="btn-save-as-draft"
            type="button"
            onClick={() => handleSaveClick('draft')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-zinc-700 bg-white hover:bg-zinc-100 hover:text-zinc-900 rounded-full border border-zinc-200 transition-all shadow-2xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>

          <button
            id="btn-schedule-post"
            type="button"
            onClick={() => handleSaveClick('scheduled')}
            className="flex items-center gap-2 px-6 py-2 text-xs font-bold text-white bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 rounded-full shadow-md shadow-pink-500/25 transition-all active:scale-95"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Queue to Celery</span>
          </button>
        </div>
      </div>

      {/* Target Platforms Bento Tile */}
      <div className="p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 shadow-xs">
        <PlatformSelector
          selectedPlatforms={postData.platforms || ['linkedin', 'instagram']}
          onChange={(platforms) => handleUpdate({ platforms })}
        />
      </div>

      {/* Editor & Simulation Grid */}
      <PostEditor
        post={postData}
        onChange={handleUpdate}
        accounts={accounts}
      />

      {/* Schedule Picker Bento Tile */}
      <SchedulePicker
        scheduledTime={postData.scheduledTime}
        onChange={(scheduledTime) => handleUpdate({ scheduledTime })}
        onPublishNow={() => handleSaveClick('published')}
      />
    </div>
  );
};
