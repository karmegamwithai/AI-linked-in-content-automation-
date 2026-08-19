import React, { useState } from 'react';
import { 
  Sparkles, 
  Linkedin, 
  Instagram, 
  Image as ImageIcon, 
  Smile, 
  Hash, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  Sliders,
  Send,
  Eye,
  Check,
  Zap
} from 'lucide-react';
import { Post, ConnectedAccount, PostGenerationRequest } from '../types';
import { generateAIPost, analyzePostQuality } from '../services/api';

interface PostEditorProps {
  post: Partial<Post>;
  onChange: (updates: Partial<Post>) => void;
  accounts: ConnectedAccount[];
}

export const PostEditor: React.FC<PostEditorProps> = ({
  post,
  onChange,
  accounts,
}) => {
  const [activeTab, setActiveTab] = useState<'linkedin' | 'instagram'>('linkedin');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAIOptions, setShowAIOptions] = useState(false);
  const [aiTopic, setAiTopic] = useState(post.title || '');
  const [aiTone, setAiTone] = useState('personal-story');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const linkedinAccount = accounts.find((a) => a.platform === 'linkedin');
  const instagramAccount = accounts.find((a) => a.platform === 'instagram');

  const creatorTones = [
    { id: 'personal-story', label: 'Personal Story' },
    { id: 'solopreneur', label: 'Solo Creator Playbook' },
    { id: 'vulnerable-lesson', label: 'Lesson & Reflection' },
    { id: 'contrarian-take', label: 'Contrarian Take' },
    { id: 'inspirational', label: 'Inspirational Spark' },
  ];

  const handleAIGenerate = async () => {
    if (!aiTopic) return;
    setIsGenerating(true);
    try {
      const result = await generateAIPost({
        topic: aiTopic,
        tone: aiTone,
        platforms: post.platforms || ['linkedin', 'instagram'],
        targetAudience: 'my personal network, peers, creators, and potential collaborators',
        mediaType: post.mediaType || 'image',
        includeCallToAction: true,
        includeHashtags: true,
      });

      onChange({
        title: aiTopic,
        contentLinkedin: result.linkedinContent,
        contentInstagram: result.instagramContent,
        tags: result.hashtags || ['SoloCreator', 'PersonalBrand', 'BuildInPublic'],
      });
      setShowAIOptions(false);
    } catch (e) {
      console.error('Error generating post:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAudit = async () => {
    setIsAuditing(true);
    const content = activeTab === 'linkedin' ? post.contentLinkedin : post.contentInstagram;
    try {
      const res = await analyzePostQuality(content || '', activeTab);
      setAuditResult(res);
    } finally {
      setIsAuditing(false);
    }
  };

  const handleCopyCurrent = () => {
    const text = activeTab === 'linkedin' ? post.contentLinkedin : post.contentInstagram;
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const addTag = (newTag: string) => {
    const clean = newTag.replace('#', '').trim();
    if (!clean) return;
    const currentTags = post.tags || [];
    if (!currentTags.includes(clean)) {
      onChange({ tags: [...currentTags, clean] });
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange({ tags: (post.tags || []).filter((t) => t !== tagToRemove) });
  };

  const stockImages = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1080&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1080&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1080&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1080&auto=format&fit=crop&q=80',
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Column: Editor & AI Controls (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        {/* AI Crafter Bento Card with Pink/Violet Glow */}
        <div className="p-6 md:p-8 rounded-3xl bg-zinc-950 border border-zinc-800/80 space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-pink-500/10 via-violet-600/10 to-transparent rounded-bl-full pointer-events-none" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-pink-500 text-white flex items-center justify-center shadow-md shadow-pink-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Solo Creator AI Crafter</span>
                </h3>
                <p className="text-[10px] text-pink-400 font-bold uppercase tracking-wider">
                  Tuned for personal storytelling & audience connection
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAIOptions(!showAIOptions)}
              className="text-xs font-bold px-4 py-1.5 border border-zinc-800 hover:border-zinc-700 rounded-full bg-zinc-900 transition-all text-zinc-300 hover:text-white flex items-center gap-1.5"
            >
              <Sliders className="w-3 h-3 text-pink-400" />
              <span>{showAIOptions ? 'Simple Mode' : 'Creator Persona'}</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              id="ai-topic-input"
              placeholder="What did you learn today, or what personal idea do you want to share?"
              value={aiTopic}
              onChange={(e) => {
                setAiTopic(e.target.value);
                onChange({ title: e.target.value });
              }}
              className="flex-1 px-4 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-full text-xs font-medium text-white placeholder:text-zinc-500 focus:outline-none focus:border-pink-500/60 focus:ring-1 focus:ring-pink-500/30 transition-all"
            />
            <button
              type="button"
              id="btn-trigger-gemini-generate"
              onClick={handleAIGenerate}
              disabled={isGenerating || !aiTopic}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 text-white text-xs font-bold rounded-full transition-all disabled:opacity-40 shrink-0 active:scale-95 shadow-md shadow-pink-500/20"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Crafting...' : 'Generate with AI'}</span>
            </button>
          </div>

          {showAIOptions && (
            <div className="p-4 bg-zinc-900/90 rounded-2xl border border-zinc-800 space-y-3 text-xs animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Personal Voice & Tone
                </label>
                <div className="flex flex-wrap gap-2">
                  {creatorTones.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setAiTone(t.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        aiTone === t.id
                          ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold shadow-sm shadow-pink-500/20'
                          : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Crafting Box */}
        <div className="p-6 md:p-8 rounded-3xl bg-zinc-950 border border-zinc-800/80 space-y-5">
          {/* Channel Tabs with Pink/Violet Gradient */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-full border border-zinc-800">
              <button
                type="button"
                id="tab-edit-linkedin"
                onClick={() => setActiveTab('linkedin')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'linkedin'
                    ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn Story</span>
              </button>

              <button
                type="button"
                id="tab-edit-instagram"
                onClick={() => setActiveTab('instagram')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'instagram'
                    ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram Caption</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyCurrent}
                className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white text-xs flex items-center gap-1 transition-all"
                title="Copy current channel text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-pink-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                id="btn-audit-post-quality"
                onClick={handleAudit}
                disabled={isAuditing}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-full text-zinc-300 hover:text-white text-xs font-bold transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
                <span>{isAuditing ? 'Auditing...' : 'Quality Audit'}</span>
              </button>
            </div>
          </div>

          {/* Audit Results Banner */}
          {auditResult && (
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-pink-400" /> Quality Score: {auditResult.score}/100
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  Readability: {auditResult.readability}
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-zinc-300 text-[11px]">
                {auditResult.tips?.map((tip: string, i: number) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Text Editor Area */}
          <div>
            <textarea
              id={activeTab === 'linkedin' ? 'textarea-content-linkedin' : 'textarea-content-instagram'}
              rows={8}
              value={activeTab === 'linkedin' ? post.contentLinkedin || '' : post.contentInstagram || ''}
              onChange={(e) => {
                if (activeTab === 'linkedin') {
                  onChange({ contentLinkedin: e.target.value });
                } else {
                  onChange({ contentInstagram: e.target.value });
                }
              }}
              placeholder={
                activeTab === 'linkedin'
                  ? 'Share your authentic experience, a real takeaway, or personal story with clean paragraph breaks...'
                  : 'Write your creator caption with punchy visual lines, relatable takeaways, and relevant tags...'
              }
              className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs leading-relaxed text-white placeholder:text-zinc-600 focus:outline-none focus:border-pink-500/60 focus:ring-1 focus:ring-pink-500/30 font-normal transition-all"
            />
            <div className="flex items-center justify-between mt-2 text-[11px] text-zinc-500 font-semibold px-2">
              <span>
                Length:{' '}
                {activeTab === 'linkedin'
                  ? (post.contentLinkedin || '').length
                  : (post.contentInstagram || '').length}{' '}
                chars
              </span>
              <span>
                {activeTab === 'linkedin' ? 'Max 3,000 chars' : 'Max 2,200 chars'}
              </span>
            </div>
          </div>

          {/* Media URL / Presets */}
          <div className="space-y-2 pt-2 border-t border-zinc-900">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
              <span>Media Attachment (Photo or Visual)</span>
              <span className="text-[10px] text-zinc-500 font-normal">PNG, JPG, WebP</span>
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Paste image URL (e.g. https://images.unsplash.com/...)"
                value={post.mediaUrls?.[0] || ''}
                onChange={(e) => onChange({ mediaUrls: e.target.value ? [e.target.value] : [] })}
                className="flex-1 px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-pink-500/60 font-mono"
              />
              {post.mediaUrls?.length ? (
                <button
                  type="button"
                  onClick={() => onChange({ mediaUrls: [] })}
                  className="px-3.5 py-1.5 text-xs text-rose-400 bg-rose-950/40 hover:bg-rose-950/70 rounded-full border border-rose-800/60 font-bold"
                >
                  Clear
                </button>
              ) : null}
            </div>

            {/* Quick stock selector */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] uppercase font-bold text-zinc-500">Presets:</span>
              <div className="flex gap-2">
                {stockImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onChange({ mediaUrls: [img] })}
                    className="w-8 h-8 rounded-xl overflow-hidden border border-zinc-800 hover:border-pink-500 transition-all hover:scale-105"
                  >
                    <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Hashtag Manager */}
          <div className="space-y-2 pt-2 border-t border-zinc-900">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
              Personal Brand Tags & Topics
            </label>

            <div className="flex flex-wrap gap-1.5 items-center">
              {(post.tags || []).map((tag, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1 text-[11px] px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-pink-300 font-semibold"
                >
                  <span>#{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-zinc-500 hover:text-rose-400 ml-1 text-xs"
                  >
                    ×
                  </button>
                </span>
              ))}

              <input
                type="text"
                placeholder="+ Add tag (Press Enter)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
                className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-pink-500/60 font-medium w-40"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Live Feed Simulation Bento Box (5 cols) */}
      <div className="lg:col-span-5 space-y-4">
        <div className="p-6 md:p-8 rounded-3xl bg-zinc-950 border border-zinc-800/80 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Eye className="w-4 h-4 text-pink-400" />
              <span>Personal Feed Simulator</span>
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 text-white">
              {activeTab.toUpperCase()}
            </span>
          </div>

          {/* LinkedIn Mock Feed Card */}
          {activeTab === 'linkedin' && (
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-white space-y-3 font-sans">
              <div className="flex items-center gap-3">
                <img
                  src={linkedinAccount?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-white">{linkedinAccount?.accountName || 'Alexander Hayes'}</span>
                    <span className="text-[10px] text-zinc-400">• 1st</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 truncate max-w-[200px]">
                    Solo Creator & Builder • Sharing daily lessons
                  </p>
                  <p className="text-[9px] text-zinc-500 flex items-center gap-1">
                    <span>Just now</span> • <span>🌐</span>
                  </p>
                </div>
              </div>

              <p className="text-xs text-zinc-200 leading-relaxed whitespace-pre-line font-normal">
                {post.contentLinkedin || 'Your personal LinkedIn story and takeaways will render here in high contrast...'}
              </p>

              {post.tags && post.tags.length > 0 && (
                <p className="text-xs font-semibold text-pink-400 space-x-1">
                  {post.tags.map((t, idx) => (
                    <span key={idx}>#{t.replace('#', '')}</span>
                  ))}
                </p>
              )}

              {post.mediaUrls && post.mediaUrls.length > 0 && (
                <div className="rounded-xl overflow-hidden border border-zinc-800 aspect-video bg-black mt-2">
                  <img
                    src={post.mediaUrls[0]}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="pt-2 border-t border-zinc-800 flex items-center justify-around text-zinc-400 text-[11px] font-bold">
                <span className="hover:text-pink-400 cursor-pointer">👍 Like</span>
                <span className="hover:text-pink-400 cursor-pointer">💬 Comment</span>
                <span className="hover:text-pink-400 cursor-pointer">🔁 Repost</span>
                <span className="hover:text-pink-400 cursor-pointer">🚀 Send</span>
              </div>
            </div>
          )}

          {/* Instagram Mock Feed Card */}
          {activeTab === 'instagram' && (
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-white space-y-3 max-w-sm mx-auto font-sans">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={instagramAccount?.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover border border-zinc-700"
                  />
                  <span className="text-xs font-bold text-white">{instagramAccount?.username || '@alexander.builds'}</span>
                </div>
                <span className="text-xs font-bold text-zinc-500">•••</span>
              </div>

              {/* Instagram Image */}
              <div className="rounded-xl overflow-hidden border border-zinc-800 aspect-square bg-black">
                {post.mediaUrls && post.mediaUrls.length > 0 ? (
                  <img
                    src={post.mediaUrls[0]}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 text-xs">
                    <ImageIcon className="w-8 h-8 mb-1 text-zinc-600" />
                    <span>Square 1:1 Preview</span>
                  </div>
                )}
              </div>

              {/* Instagram Action Row */}
              <div className="flex items-center justify-between text-white text-sm">
                <div className="flex items-center gap-3">
                  <span>❤️</span>
                  <span>💬</span>
                  <span>↗️</span>
                </div>
                <span>📌</span>
              </div>

              {/* Caption */}
              <div className="text-xs text-zinc-300 leading-relaxed space-y-1">
                <p>
                  <span className="font-bold mr-1 text-white">{instagramAccount?.username || '@alexander.builds'}</span>
                  {post.contentInstagram || 'Your creator caption, visual formatting, and emojis will display here...'}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <p className="text-pink-400 font-semibold">
                    {post.tags.map((t) => `#${t.replace('#', '')}`).join(' ')}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
