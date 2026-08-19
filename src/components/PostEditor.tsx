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
  Check
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
  const [aiTone, setAiTone] = useState('thought-leadership');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const linkedinAccount = accounts.find((a) => a.platform === 'linkedin');
  const instagramAccount = accounts.find((a) => a.platform === 'instagram');

  const handleAIGenerate = async () => {
    if (!aiTopic) return;
    setIsGenerating(true);
    try {
      const result = await generateAIPost({
        topic: aiTopic,
        tone: aiTone,
        platforms: post.platforms || ['linkedin', 'instagram'],
        targetAudience: 'founders, engineers, and creators',
        mediaType: post.mediaType || 'image',
        includeCallToAction: true,
        includeHashtags: true,
      });

      onChange({
        title: aiTopic,
        contentLinkedin: result.linkedinContent,
        contentInstagram: result.instagramContent,
        tags: result.hashtags || ['Automation', 'Tech', 'Growth'],
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

  // Stock presets for quick media testing
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
        {/* AI Crafter Bento Card */}
        <div className="p-6 rounded-3xl bg-zinc-50 border border-black/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-black tracking-tight">
                  Gemini AI Content Crafter
                </h3>
                <p className="text-xs text-black/40 font-bold uppercase tracking-wider">
                  Model: Gemini 3.7 Flash
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAIOptions(!showAIOptions)}
              className="text-xs font-bold px-4 py-2 border border-black/10 hover:border-black rounded-full bg-white transition-all text-black flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{showAIOptions ? 'Simple Mode' : 'AI Settings'}</span>
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              id="ai-topic-input"
              placeholder="Enter your topic, headline, or idea (e.g. 5 SaaS architectural mistakes)..."
              value={aiTopic}
              onChange={(e) => {
                setAiTopic(e.target.value);
                onChange({ title: e.target.value });
              }}
              className="flex-1 px-4 py-2.5 bg-white border border-black/10 rounded-full text-xs font-medium text-black placeholder:text-black/40 focus:outline-none focus:border-black transition-all"
            />
            <button
              type="button"
              id="btn-trigger-gemini-generate"
              onClick={handleAIGenerate}
              disabled={isGenerating || !aiTopic}
              className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:opacity-90 transition-all disabled:opacity-40 shrink-0 active:scale-95 shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Crafter Running...' : 'Generate with AI'}</span>
            </button>
          </div>

          {showAIOptions && (
            <div className="p-4 bg-white rounded-2xl border border-black/5 space-y-3 text-xs">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-1.5">
                  Tone of Voice
                </label>
                <div className="flex flex-wrap gap-2">
                  {['thought-leadership', 'direct & punchy', 'storytelling', 'analytical', 'contrarian'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setAiTone(t)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase transition-all ${
                        aiTone === t ? 'bg-black text-white font-bold' : 'bg-zinc-50 border border-black/5 text-black/60 hover:text-black'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Crafting Box */}
        <div className="p-6 rounded-3xl bg-zinc-50 border border-black/5 space-y-4">
          {/* Channel Tabs */}
          <div className="flex items-center justify-between border-b border-black/5 pb-3">
            <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-black/5">
              <button
                type="button"
                id="tab-edit-linkedin"
                onClick={() => setActiveTab('linkedin')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'linkedin'
                    ? 'bg-black text-white shadow-2xs'
                    : 'text-black/50 hover:text-black'
                }`}
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn Formatter</span>
              </button>

              <button
                type="button"
                id="tab-edit-instagram"
                onClick={() => setActiveTab('instagram')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'instagram'
                    ? 'bg-black text-white shadow-2xs'
                    : 'text-black/50 hover:text-black'
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
                className="p-2 rounded-full bg-white hover:bg-zinc-100 border border-black/5 text-black/70 hover:text-black text-xs flex items-center gap-1"
                title="Copy current channel text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                id="btn-audit-post-quality"
                onClick={handleAudit}
                disabled={isAuditing}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-zinc-100 border border-black/10 rounded-full text-black text-xs font-bold transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isAuditing ? 'Auditing...' : 'Quality Audit'}</span>
              </button>
            </div>
          </div>

          {/* Audit Results Banner */}
          {auditResult && (
            <div className="p-4 rounded-2xl bg-white border border-black/10 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-black" /> Post Quality Score: {auditResult.score}/100
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-black/5 text-black">
                  Readability: {auditResult.readability}
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-black/70 text-[11px]">
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
                  ? 'Write your LinkedIn post with hook lines, whitespace breaks, and actionable insights...'
                  : 'Write your Instagram caption with punchy visual lines, emojis, and hashtags...'
              }
              className="w-full p-4 bg-white border border-black/10 rounded-2xl text-xs leading-relaxed text-black placeholder:text-black/30 focus:outline-none focus:border-black font-normal transition-all"
            />
            <div className="flex items-center justify-between mt-2 text-[11px] text-black/40 font-semibold px-2">
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
          <div className="space-y-2 pt-2 border-t border-black/5">
            <label className="block text-xs font-bold uppercase tracking-wider text-black/60 flex items-center justify-between">
              <span>Featured Media Asset (URL or Presets)</span>
              <span className="text-[10px] text-black/40 font-normal">Supports PNG, JPG, WebP</span>
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Paste public image link (e.g. https://images.unsplash.com/...)"
                value={post.mediaUrls?.[0] || ''}
                onChange={(e) => onChange({ mediaUrls: e.target.value ? [e.target.value] : [] })}
                className="flex-1 px-3.5 py-2 bg-white border border-black/10 rounded-full text-xs text-black placeholder:text-black/30 focus:outline-none focus:border-black font-mono"
              />
              {post.mediaUrls?.length ? (
                <button
                  type="button"
                  onClick={() => onChange({ mediaUrls: [] })}
                  className="px-3 py-1.5 text-xs text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-full border border-rose-200 font-bold"
                >
                  Clear
                </button>
              ) : null}
            </div>

            {/* Quick stock selector */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] uppercase font-bold text-black/40">Presets:</span>
              <div className="flex gap-2">
                {stockImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onChange({ mediaUrls: [img] })}
                    className="w-8 h-8 rounded-xl overflow-hidden border border-black/10 hover:border-black transition-all hover:scale-105"
                  >
                    <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Hashtag Manager */}
          <div className="space-y-2 pt-2 border-t border-black/5">
            <label className="block text-xs font-bold uppercase tracking-wider text-black/60">
              Hashtags & Categorization
            </label>

            <div className="flex flex-wrap gap-1.5 items-center">
              {(post.tags || []).map((tag, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1 text-[11px] px-3 py-1 rounded-full bg-white border border-black/10 text-black font-semibold"
                >
                  <span>#{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-black/40 hover:text-rose-600 ml-1 text-xs"
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
                className="px-3 py-1 bg-white border border-black/10 rounded-full text-xs text-black placeholder:text-black/40 focus:outline-none focus:border-black font-medium w-36"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Live Feed Simulation Bento Box (5 cols) */}
      <div className="lg:col-span-5 space-y-4">
        <div className="p-6 rounded-3xl bg-zinc-50 border border-black/5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-black tracking-tight flex items-center gap-2">
              <Eye className="w-4 h-4 text-black" />
              <span>Live Social Simulator</span>
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-black text-white">
              {activeTab.toUpperCase()}
            </span>
          </div>

          {/* LinkedIn Mock Feed Card */}
          {activeTab === 'linkedin' && (
            <div className="p-5 rounded-2xl bg-white border border-black/10 text-black shadow-xs space-y-3 font-sans">
              <div className="flex items-center gap-3">
                <img
                  src={linkedinAccount?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-black/10"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-black">{linkedinAccount?.accountName || 'Alexander Hayes'}</span>
                    <span className="text-[10px] text-black/40">• 1st</span>
                  </div>
                  <p className="text-[10px] text-black/50 truncate max-w-[200px]">
                    Founder & Engineer • Automation Architect
                  </p>
                  <p className="text-[9px] text-black/40 flex items-center gap-1">
                    <span>Just now</span> • <span>🌐</span>
                  </p>
                </div>
              </div>

              <p className="text-xs text-black leading-relaxed whitespace-pre-line font-normal">
                {post.contentLinkedin || 'Your LinkedIn content hook will appear here with single-sentence formatting...'}
              </p>

              {post.tags && post.tags.length > 0 && (
                <p className="text-xs font-semibold text-black/80 space-x-1">
                  {post.tags.map((t, idx) => (
                    <span key={idx}>#{t.replace('#', '')}</span>
                  ))}
                </p>
              )}

              {post.mediaUrls && post.mediaUrls.length > 0 && (
                <div className="rounded-xl overflow-hidden border border-black/5 aspect-video bg-zinc-100 mt-2">
                  <img
                    src={post.mediaUrls[0]}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="pt-2 border-t border-black/5 flex items-center justify-around text-black/60 text-[11px] font-bold">
                <span className="hover:text-black cursor-pointer">👍 Like</span>
                <span className="hover:text-black cursor-pointer">💬 Comment</span>
                <span className="hover:text-black cursor-pointer">🔁 Repost</span>
                <span className="hover:text-black cursor-pointer">🚀 Send</span>
              </div>
            </div>
          )}

          {/* Instagram Mock Feed Card */}
          {activeTab === 'instagram' && (
            <div className="p-4 rounded-2xl bg-white border border-black/10 text-black shadow-xs space-y-3 max-w-sm mx-auto font-sans">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={instagramAccount?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover border border-black/10"
                  />
                  <span className="text-xs font-bold text-black">{instagramAccount?.username || 'alexander.builds'}</span>
                </div>
                <span className="text-xs font-bold text-black/60">•••</span>
              </div>

              {/* Instagram Image */}
              <div className="rounded-xl overflow-hidden border border-black/5 aspect-square bg-zinc-100">
                {post.mediaUrls && post.mediaUrls.length > 0 ? (
                  <img
                    src={post.mediaUrls[0]}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-black/40 text-xs">
                    <ImageIcon className="w-8 h-8 mb-1" />
                    <span>Square 1:1 Preview</span>
                  </div>
                )}
              </div>

              {/* Instagram Action Row */}
              <div className="flex items-center justify-between text-black text-sm">
                <div className="flex items-center gap-3">
                  <span>❤️</span>
                  <span>💬</span>
                  <span>↗️</span>
                </div>
                <span>📌</span>
              </div>

              {/* Caption */}
              <div className="text-xs text-black leading-relaxed space-y-1">
                <p>
                  <span className="font-bold mr-1">{instagramAccount?.username || 'alexander.builds'}</span>
                  {post.contentInstagram || 'Your Instagram caption and emojis will render here...'}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <p className="text-black/60 font-semibold">
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
