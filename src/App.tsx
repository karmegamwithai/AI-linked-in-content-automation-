import React, { useState, useEffect } from 'react';
import { 
  getStoredPosts, 
  saveStoredPosts, 
  getStoredAccounts, 
  saveStoredAccounts, 
  getStoredSheetsConfig, 
  saveStoredSheetsConfig,
  INITIAL_POSTS
} from './services/api';
import { Post, ConnectedAccount, GoogleSheetsConfig } from './types';
import { Navbar } from './components/Navbar';
import { Sidebar, PageId } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { CreatePost } from './pages/CreatePost';
import { ScheduledPosts } from './pages/ScheduledPosts';
import { PublishedPosts } from './pages/PublishedPosts';
import { Drafts } from './pages/Drafts';
import { Analytics } from './pages/Analytics';
import { GoogleSheetsPage } from './pages/GoogleSheetsPage';
import { Settings } from './pages/Settings';
import { CodebaseViewer } from './pages/CodebaseViewer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [posts, setPosts] = useState<Post[]>([]);
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
  const [sheetsConfig, setSheetsConfig] = useState<GoogleSheetsConfig>(getStoredSheetsConfig());
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Initial load from storage
  useEffect(() => {
    const loadedPosts = getStoredPosts();
    const loadedAccounts = getStoredAccounts();
    const loadedSheets = getStoredSheetsConfig();
    setPosts(loadedPosts);
    setAccounts(loadedAccounts);
    setSheetsConfig(loadedSheets);
  }, []);

  const handleUpdatePosts = (newPosts: Post[]) => {
    setPosts(newPosts);
    saveStoredPosts(newPosts);
  };

  const handleSavePost = (savedPost: Post) => {
    const exists = posts.some((p) => p.id === savedPost.id);
    let updated: Post[];
    if (exists) {
      updated = posts.map((p) => (p.id === savedPost.id ? savedPost : p));
    } else {
      updated = [savedPost, ...posts];
    }
    handleUpdatePosts(updated);
    setEditingPost(null);
    if (savedPost.status === 'scheduled') {
      setCurrentPage('scheduled');
    } else if (savedPost.status === 'published') {
      setCurrentPage('published');
    } else {
      setCurrentPage('drafts');
    }
  };

  const handleDeletePost = (id: string) => {
    const updated = posts.filter((p) => p.id !== id);
    handleUpdatePosts(updated);
  };

  const handlePublishNow = (post: Post) => {
    const updated = posts.map((p) => {
      if (p.id === post.id) {
        return {
          ...p,
          status: 'published' as const,
          publishedAt: new Date().toISOString(),
          analytics: p.analytics || {
            impressions: Math.floor(Math.random() * 2000) + 500,
            likes: Math.floor(Math.random() * 80) + 12,
            comments: Math.floor(Math.random() * 15) + 2,
            shares: Math.floor(Math.random() * 8) + 1,
            clicks: Math.floor(Math.random() * 40) + 5,
            engagementRate: 5.4,
          },
        };
      }
      return p;
    });
    handleUpdatePosts(updated);
  };

  const handleDuplicatePost = (post: Post) => {
    const newDraft: Post = {
      ...post,
      id: `post-${Date.now()}`,
      title: `[Repurposed] ${post.title}`,
      status: 'draft',
      analytics: undefined,
      publishedAt: undefined,
      scheduledTime: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    handleUpdatePosts([newDraft, ...posts]);
    setEditingPost(newDraft);
    setCurrentPage('create');
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setCurrentPage('create');
  };

  const handleStartCreateWithTopic = (topic: string) => {
    setEditingPost({
      title: topic,
      contentLinkedin: '',
      contentInstagram: '',
      tags: ['Innovation', 'Tech', 'Growth'],
      platforms: ['linkedin', 'instagram'],
    });
    setCurrentPage('create');
  };

  const handleImportFromSheets = () => {
    const newFromSheets: Post = {
      id: `post-sheet-${Date.now()}`,
      title: 'Imported from Google Sheets Row #15',
      contentLinkedin: `Automated data pipelines in Python and Celery.\n\nHere is how we sync 10,000 daily events with sub-second latency across distributed workers.\n\n1. Redis as broker\n2. Task batching\n3. Exponential backoff retry\n\n#Python #DistributedSystems #Engineering`,
      contentInstagram: `How to build resilient task queues in 2026 ⚡️💻\n\nSwipe to see our worker architecture 👉\n\n#backend #python #codinglife`,
      platforms: ['linkedin', 'instagram'],
      mediaUrls: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1080&auto=format&fit=crop&q=80'],
      mediaType: 'image',
      aspectRatio: '1:1',
      status: 'scheduled',
      scheduledTime: new Date(Date.now() + 3600000 * 20).toISOString(),
      tags: ['Python', 'Celery', 'GoogleSheets'],
      author: 'Alexander Hayes',
      googleSheetsRowId: 15,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    handleUpdatePosts([newFromSheets, ...posts]);
    alert('Imported 1 new row from Google Sheets into Scheduled Queue!');
  };

  const handleExportToSheets = () => {
    setSheetsConfig((prev) => {
      const updated = {
        ...prev,
        lastSyncedAt: new Date().toISOString(),
        totalSyncedRows: posts.length,
      };
      saveStoredSheetsConfig(updated);
      return updated;
    });
    alert(`Successfully synced ${posts.length} records and performance metrics to Google Sheets!`);
  };

  // Counts for sidebar badges
  const counts = {
    scheduled: posts.filter((p) => p.status === 'scheduled').length,
    published: posts.filter((p) => p.status === 'published').length,
    drafts: posts.filter((p) => p.status === 'draft').length,
  };

  // Filter posts if search is active
  const filteredPosts = searchTerm
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.contentLinkedin.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.contentInstagram.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : posts;

  return (
    <div id="contentflow-app-root" className="min-h-screen bg-white text-black font-['Urbanist',sans-serif] selection:bg-black selection:text-white">
      {/* Top Navigation */}
      <Navbar
        accounts={accounts}
        sheetsConfig={sheetsConfig}
        onOpenCreate={() => {
          setEditingPost(null);
          setCurrentPage('create');
        }}
        onOpenCodebase={() => setCurrentPage('codebase')}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Main Container Layout */}
      <div className="flex">
        {/* Left Sidebar */}
        <Sidebar
          currentPage={currentPage}
          onSelectPage={(page) => {
            if (page === 'create') setEditingPost(null);
            setCurrentPage(page);
          }}
          counts={counts}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto overflow-y-auto min-h-[calc(100vh-65px)]">
          {currentPage === 'dashboard' && (
            <Dashboard
              posts={filteredPosts}
              accounts={accounts}
              sheetsConfig={sheetsConfig}
              onNavigate={setCurrentPage}
              onEditPost={handleEditPost}
              onDeletePost={handleDeletePost}
              onPublishNow={handlePublishNow}
              onQuickCreateWithTopic={handleStartCreateWithTopic}
            />
          )}

          {currentPage === 'create' && (
            <CreatePost
              initialPost={editingPost || undefined}
              accounts={accounts}
              onSave={handleSavePost}
              onCancel={() => setCurrentPage('dashboard')}
            />
          )}

          {currentPage === 'scheduled' && (
            <ScheduledPosts
              posts={filteredPosts}
              onEditPost={handleEditPost}
              onDeletePost={handleDeletePost}
              onPublishNow={handlePublishNow}
              onOpenCreate={() => {
                setEditingPost(null);
                setCurrentPage('create');
              }}
            />
          )}

          {currentPage === 'published' && (
            <PublishedPosts
              posts={filteredPosts}
              onEditPost={handleEditPost}
              onDeletePost={handleDeletePost}
              onDuplicatePost={handleDuplicatePost}
            />
          )}

          {currentPage === 'drafts' && (
            <Drafts
              posts={filteredPosts}
              onEditPost={handleEditPost}
              onDeletePost={handleDeletePost}
              onOpenCreate={() => {
                setEditingPost(null);
                setCurrentPage('create');
              }}
            />
          )}

          {currentPage === 'analytics' && (
            <Analytics posts={filteredPosts} />
          )}

          {currentPage === 'sheets' && (
            <GoogleSheetsPage
              sheetsConfig={sheetsConfig}
              posts={filteredPosts}
              onUpdateConfig={(cfg) => {
                setSheetsConfig(cfg);
                saveStoredSheetsConfig(cfg);
              }}
              onImportFromSheets={handleImportFromSheets}
              onExportToSheets={handleExportToSheets}
            />
          )}

          {currentPage === 'settings' && (
            <Settings
              accounts={accounts}
              sheetsConfig={sheetsConfig}
              onUpdateAccounts={(accs) => {
                setAccounts(accs);
                saveStoredAccounts(accs);
              }}
              onUpdateSheetsConfig={(cfg) => {
                setSheetsConfig(cfg);
                saveStoredSheetsConfig(cfg);
              }}
            />
          )}

          {currentPage === 'codebase' && (
            <CodebaseViewer />
          )}
        </main>
      </div>
    </div>
  );
}
