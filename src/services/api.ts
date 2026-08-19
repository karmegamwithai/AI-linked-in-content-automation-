import { Post, ConnectedAccount, GoogleSheetsConfig, PostGenerationRequest, PostGenerationResponse } from '../types';

const STORAGE_KEYS = {
  POSTS: 'contentflow_posts',
  ACCOUNTS: 'contentflow_accounts',
  SHEETS_CONFIG: 'contentflow_sheets_config',
};

export const INITIAL_ACCOUNTS: ConnectedAccount[] = [
  {
    platform: 'linkedin',
    accountName: 'Alexander Hayes',
    username: 'alexander-hayes-tech',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    connected: true,
    followersCount: 14850,
    lastSyncedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    tokenExpiresInDays: 45,
  },
  {
    platform: 'instagram',
    accountName: 'Alexander • Tech & AI',
    username: '@alexander.builds',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    connected: true,
    followersCount: 28400,
    lastSyncedAt: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    tokenExpiresInDays: 58,
  },
];

export const INITIAL_SHEETS_CONFIG: GoogleSheetsConfig = {
  spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
  sheetName: 'Content_Pipeline_2026',
  syncIntervalMinutes: 30,
  lastSyncedAt: new Date(Date.now() - 1800000).toISOString(),
  connected: true,
  autoPublishFromSheets: true,
  totalSyncedRows: 14,
};

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    title: 'The Future of AI Agent Workflows in 2026',
    contentLinkedin: `Most engineering teams are building AI agents completely wrong.\n\nThey connect an LLM to 20 API tools and pray for reliability.\n\nHere are 3 architectural principles we learned after running over 10M autonomous agent runs:\n\n1. Deterministic state machines beat free-form loops.\n2. Sandboxed execution containers are non-negotiable.\n3. Human-in-the-loop checkpoints reduce hallucinations by 82%.\n\nWhat is your biggest roadblock when deploying agents to production?\n\n#SoftwareEngineering #AIAgents #TechLeadership #FullStack`,
    contentInstagram: `Building AI agents in 2026? Stop making these 3 massive mistakes 🛑👇\n\n1️⃣ Relying on infinite LLM loops without state boundaries.\n2️⃣ Skipping isolated execution containers.\n3️⃣ Forgetting human approval triggers.\n\nSave this post for your next architecture review! 📌\n\nDrop a ⚡ below if you want the open-source boilerplate.\n\n#coding #developer #aiengineering #softwaredevelopment #techtrends #programmerlife #buildinpublic`,
    platforms: ['linkedin', 'instagram'],
    mediaUrls: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1080&auto=format&fit=crop&q=80'
    ],
    mediaType: 'image',
    aspectRatio: '4:5',
    status: 'published',
    publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    tags: ['AI', 'Engineering', 'Architecture', 'Tech'],
    author: 'Alexander Hayes',
    googleSheetsRowId: 2,
    analytics: {
      impressions: 48920,
      likes: 1840,
      comments: 215,
      shares: 342,
      clicks: 890,
      engagementRate: 6.7,
    },
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'post-2',
    title: '5 Minimalist Design Rules for SaaS Dashboards',
    contentLinkedin: `Why do most B2B SaaS dashboards look like airplane cockpits?\n\nHigh utility doesn't require visual chaos.\n\nWhen we redesigned our analytics platform, our daily active usage jumped 43% by following these strict constraints:\n\n→ Black & white high contrast base palette\n→ Maximum 3 primary metric focal points\n→ 16px proportional rhythmic padding\n→ Zero decorative widgets\n\nSimplicity isn't the lack of clutter. It's the presence of clarity.\n\n#ProductDesign #UX #DesignSystems #Minimalism #SaaS`,
    contentInstagram: `5 minimal UI design rules that transformed our product metrics 🖤✨\n\n1. High-contrast monochromatic hierarchy\n2. Strict 8pt spatial grid\n3. Zero vanity widgets\n4. Micro-interactions with purposeful feedback\n5. Typographic scale with optical balance\n\nDouble tap if you love clean minimal aesthetics 🖤\n\n#uiux #minimaldesign #webdesign #designinspiration #productdesigner #saasdesign #uxdesign #figmadesign`,
    platforms: ['linkedin', 'instagram'],
    mediaUrls: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1080&auto=format&fit=crop&q=80'
    ],
    mediaType: 'image',
    aspectRatio: '1:1',
    status: 'scheduled',
    scheduledTime: new Date(Date.now() + 3600000 * 14).toISOString(), // Tomorrow morning
    tags: ['Design', 'UIUX', 'Minimalism', 'Product'],
    author: 'Alexander Hayes',
    googleSheetsRowId: 3,
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'post-3',
    title: 'Automating Content Workflows with Python & Google Sheets',
    contentLinkedin: `How we automated our multi-channel social distribution without expensive enterprise subscriptions:\n\n• Backend: Django REST Framework\n• Task Queue: Celery + Redis\n• Planning Sheet: Google Sheets API v4\n• Dispatch: LinkedIn API + Instagram Graph API\n\nResult: 12 hours saved weekly, zero missed publishing windows.\n\nWould you like a breakdown of our Google Sheets automation schema?\n\n#Python #Django #Automation #DevOps #Productivity`,
    contentInstagram: `How to build a custom content automation engine with Python & Google Sheets ⚙️💻\n\nStop paying $200/mo for social media schedulers.\n\nSwipe to see our exact architecture stack ➡️\n\nComment 'SHEETS' and I'll send you the schema documentation!\n\n#pythondeveloper #codinglife #automation #backenddev #djangorestframework #techfounder`,
    platforms: ['linkedin', 'instagram'],
    mediaUrls: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1080&auto=format&fit=crop&q=80'
    ],
    mediaType: 'image',
    aspectRatio: '16:9',
    status: 'scheduled',
    scheduledTime: new Date(Date.now() + 3600000 * 38).toISOString(),
    tags: ['Python', 'Automation', 'GoogleSheets', 'Django'],
    author: 'Alexander Hayes',
    googleSheetsRowId: 4,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'post-4',
    title: 'Why Monorepos Win for Cross-Platform Automation',
    contentLinkedin: `The debate between Polyrepos and Monorepos is over for small fast-moving teams.\n\nKeeping our React frontend, Django API, Celery worker definitions, and Google Sheets schema in a single unified repository reduced integration bugs by 70%.\n\nUnified CI/CD, shared contracts, and single PR deploys are unbeatable.`,
    contentInstagram: `Why we moved our entire automation stack to a unified Monorepo 📦🚀\n\nReact UI + Django Backend + Schemas in one place.\n\nWhat repo structure do you prefer? Drop your take below! 👇`,
    platforms: ['linkedin'],
    mediaUrls: [],
    mediaType: 'text',
    aspectRatio: '1:1',
    status: 'draft',
    tags: ['Architecture', 'Monorepo', 'Engineering'],
    author: 'Alexander Hayes',
    googleSheetsRowId: 5,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
  },
  {
    id: 'post-5',
    title: '10x Engineering with Modern CLI Tools',
    contentLinkedin: `My daily CLI workflow in 2026 that saves me at least 1 hour every single day:\n\n1. zoxide for instant directory jumping\n2. ripgrep for lightning-fast code search\n3. httpie for API prototyping\n4. fzf for fuzzy history search\n5. tmux for persistent session management\n\nWhat is one CLI tool you cannot live without?`,
    contentInstagram: `Top 5 terminal tools that every developer needs in 2026 ⚡️💻\n\nBookmark this list before your next setup!\n\n1. zoxide\n2. ripgrep\n3. httpie\n4. fzf\n5. tmux\n\nWhich one is your favorite? 🖤\n\n#terminal #commandline #linux #developerlife #productivitytools`,
    platforms: ['linkedin', 'instagram'],
    mediaUrls: [
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1080&auto=format&fit=crop&q=80'
    ],
    mediaType: 'image',
    aspectRatio: '1:1',
    status: 'published',
    publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    tags: ['Productivity', 'CLI', 'Tools', 'Linux'],
    author: 'Alexander Hayes',
    googleSheetsRowId: 6,
    analytics: {
      impressions: 32140,
      likes: 1290,
      comments: 184,
      shares: 210,
      clicks: 430,
      engagementRate: 5.3,
    },
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  }
];

export const getStoredPosts = (): Post[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.POSTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(INITIAL_POSTS));
      return INITIAL_POSTS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load posts from storage', e);
    return INITIAL_POSTS;
  }
};

export const saveStoredPosts = (posts: Post[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  } catch (e) {
    console.error('Failed to save posts to storage', e);
  }
};

export const getStoredAccounts = (): ConnectedAccount[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(INITIAL_ACCOUNTS));
      return INITIAL_ACCOUNTS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_ACCOUNTS;
  }
};

export const saveStoredAccounts = (accounts: ConnectedAccount[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  } catch (e) {
    console.error('Failed to save accounts to storage', e);
  }
};

export const getStoredSheetsConfig = (): GoogleSheetsConfig => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SHEETS_CONFIG);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.SHEETS_CONFIG, JSON.stringify(INITIAL_SHEETS_CONFIG));
      return INITIAL_SHEETS_CONFIG;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_SHEETS_CONFIG;
  }
};

export const saveStoredSheetsConfig = (config: GoogleSheetsConfig) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SHEETS_CONFIG, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save sheets config to storage', e);
  }
};

// API Calls to Backend
export const generatePostWithAI = async (
  request: PostGenerationRequest
): Promise<PostGenerationResponse> => {
  try {
    const res = await fetch('/api/generate-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Generation failed');
    }

    return await res.json();
  } catch (error) {
    console.warn('Backend AI generation endpoint unavailable or errored, using intelligent fallback generator:', error);
    // Intelligent client-side fallback
    const { topic, tone, platforms, includeCallToAction } = request;
    const isLinkedIn = platforms.includes('linkedin');
    const isInstagram = platforms.includes('instagram');

    return {
      linkedinContent: isLinkedIn
        ? `${topic.toUpperCase()}: The strategic breakdown most leaders miss.\n\nOver the past 6 months, we observed a dramatic shift in how high-performing teams handle this.\n\nHere are 3 critical lessons:\n\n1. Focus on core leverage rather than surface activity.\n2. Standardize your baseline before automating nuance.\n3. Measure real outcome metrics instead of vanity outputs.\n\n${includeCallToAction ? 'How is your organization approaching this right now? Let\'s discuss below.' : ''}\n\n#Leadership #Strategy #Innovation #Growth`
        : '',
      instagramContent: isInstagram
        ? `Everything you need to know about ${topic} ⚡️🖤\n\nSwipe through for the 3 key takeaways 👉\n\n• Point 1: Build the strong foundation first.\n• Point 2: Eliminate unnecessary complexity.\n• Point 3: Track real results daily.\n\n${includeCallToAction ? 'Save this for your next brainstorm! 📌 Drop your thoughts in the comments 👇' : ''}\n\n#buildinpublic #mindset #growth #creators #minimalism`
        : '',
      hashtags: ['#Innovation', '#Strategy', '#TechTrends', '#BuildInPublic', '#Productivity'],
      suggestedHooks: [
        `Why 90% of approaches to ${topic} fail before they start`,
        `The single best strategy for ${topic} in 2026`,
        `3 counter-intuitive truths about ${topic}`,
      ],
      bestTimeToPost: 'Tomorrow at 09:15 AM (Peak audience engagement window)',
    };
  }
};

export const analyzePostQuality = async (
  content: string,
  platform: 'linkedin' | 'instagram'
): Promise<{
  score: number;
  readability: string;
  hookStrength: string;
  tips: string[];
}> => {
  try {
    const res = await fetch('/api/analyze-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, platform }),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch {
    // fallback
  }

  const length = content.length;
  const lineBreaks = (content.match(/\n/g) || []).length;
  const hasQuestion = content.includes('?');
  const hasHashtags = content.includes('#');

  let score = 75;
  const tips: string[] = [];

  if (lineBreaks < 3) {
    score -= 10;
    tips.push('Add more line breaks for scan-friendly mobile readability.');
  } else {
    score += 8;
  }

  if (!hasQuestion) {
    tips.push('Add a clear question at the end to trigger comments.');
  } else {
    score += 8;
  }

  if (!hasHashtags && platform === 'instagram') {
    tips.push('Add 3-5 focused hashtags for Instagram discoverability.');
  }

  if (length > 2200 && platform === 'instagram') {
    tips.push('Exceeds Instagram character limit (2,200 max).');
    score -= 20;
  }

  return {
    score: Math.min(98, Math.max(45, score)),
    readability: lineBreaks >= 3 ? 'High' : 'Moderate',
    hookStrength: length > 30 ? 'Strong Hook' : 'Needs attention',
    tips: tips.length > 0 ? tips : ['Formatting looks crisp and optimized!'],
  };
};

export const generateAIPost = generatePostWithAI;

