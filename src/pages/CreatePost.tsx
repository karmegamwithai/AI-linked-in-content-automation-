import React, { useState } from 'react';
import { ArrowLeft, Save, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { Post, ConnectedAccount, Platform, MediaType } from '../types';
import { PlatformSelector } from '../components/PlatformSelector';
import { PostEditor } from '../components/PostEditor';
import { SchedulePicker } from '../components/SchedulePicker';

interface CreatePostProps {
  initialPost?: Partial<Post>;
  accounts: ConnectedAccount[];
  onSave: (post: Post) => void;
  onCancel: () => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({
  initialPost,
  accounts,
  onSave,
  onCancel,
}) => {
  const isEditing = !!initialPost?.id;

  const [postData, setPostData] = useState<Partial<Post>>({
    id: initialPost?.id || `post_${Date.now()}`,
    title: initialPost?.title || '',
    contentLinkedin: initialPost?.contentLinkedin || '',
    contentInstagram: initialPost?.contentInstagram || '',
    mediaUrls: initialPost?.mediaUrls || ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1080&auto=format&fit=crop&q=80'],
    mediaType: initialPost?.mediaType || 'image',
    aspectRatio: initialPost?.aspectRatio || '1:1',
    platforms: initialPost?.platforms || ['linkedin', 'instagram'],
    scheduledTime: initialPost?.scheduledTime || new Date(Date.now() + 4 * 3600000).toISOString(),
    status: initialPost?.status || 'scheduled',
    tags: initialPost?.tags || ['Automation', 'Engineering', 'Founders'],
    createdAt: initialPost?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const handleUpdate = (updates: Partial<Post>) => {
    setPostData((prev) => ({ ...prev, ...updates }));
  };

  const handleQuickPreset = (hoursAhead: number) => {
    const d = new Date(Date.now() + hoursAhead * 3600000);
    handleUpdate({ scheduledTime: d.toISOString() });
  };

  const handleSaveClick = (forceStatus?: 'draft' | 'scheduled' | 'published') => {
    const finalStatus = forceStatus || postData.status || 'scheduled';
    const completePost: Post = {
      id: postData.id || `post_${Date.now()}`,
      title: postData.title || 'Untitled Post',
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
        engagementRate: 9.8,
      } : undefined,
    };

    onSave(completePost);
  };

  return (
    <div id="page-create-post" className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-zinc-50 border border-black/5">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-2.5 rounded-full bg-white hover:bg-zinc-100 border border-black/10 text-black transition-colors"
            title="Return to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-black tracking-tight">
              {isEditing ? 'Edit Scheduled Content' : 'Craft & Automate Post'}
            </h1>
            <p className="text-xs text-black/40 font-bold uppercase tracking-wider mt-0.5">
              Powered by Gemini 3.7 Flash • Multi-channel Formatter
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-save-draft"
            onClick={() => handleSaveClick('draft')}
            className="px-5 py-2.5 text-xs font-bold text-black bg-white hover:bg-zinc-100 rounded-full transition-all border border-black/10 shadow-xs"
          >
            Save Draft
          </button>

          <button
            id="btn-schedule-submit"
            onClick={() => handleSaveClick(postData.status || 'scheduled')}
            className="flex items-center gap-2 px-6 py-2.5 bg-black hover:opacity-90 text-white rounded-full text-xs font-bold transition-all shadow-xs active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{postData.status === 'scheduled' ? 'Schedule Automation' : 'Publish Live Now'}</span>
          </button>
        </div>
      </div>

      {/* Platform & Media Configuration */}
      <PlatformSelector
        selectedPlatforms={postData.platforms || ['linkedin', 'instagram']}
        onChangePlatforms={(platforms) => handleUpdate({ platforms })}
        mediaType={postData.mediaType || 'image'}
        onChangeMediaType={(mediaType) => handleUpdate({ mediaType })}
        aspectRatio={postData.aspectRatio || '1:1'}
        onChangeAspectRatio={(aspectRatio) => handleUpdate({ aspectRatio })}
      />

      {/* Main Post Editor & Live Social Simulator */}
      <PostEditor
        post={postData}
        onChange={handleUpdate}
        accounts={accounts}
      />

      {/* Schedule Picker & Dispatch Controls */}
      <SchedulePicker
        scheduledTime={postData.scheduledTime}
        onChangeScheduledTime={(time) => handleUpdate({ scheduledTime: time })}
        status={postData.status || 'scheduled'}
        onChangeStatus={(status) => handleUpdate({ status })}
        onQuickPreset={handleQuickPreset}
      />
    </div>
  );
};
