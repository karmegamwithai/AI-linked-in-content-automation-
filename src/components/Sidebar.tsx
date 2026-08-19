import React from 'react';
import { 
  LayoutDashboard, 
  PenSquare, 
  CalendarClock, 
  CheckCircle, 
  FileText, 
  BarChart3, 
  Settings as SettingsIcon,
  TableProperties,
  FolderGit2,
  Sparkles,
  Zap,
  X,
  Linkedin,
  Instagram
} from 'lucide-react';

export type PageId = 
  | 'dashboard'
  | 'create'
  | 'scheduled'
  | 'published'
  | 'drafts'
  | 'analytics'
  | 'sheets'
  | 'settings'
  | 'codebase';

interface SidebarProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
  counts: {
    scheduled: number;
    published: number;
    drafts: number;
  };
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onSelectPage,
  counts,
  isOpen = false,
  onClose,
}) => {
  const mainNavItems = [
    { id: 'dashboard' as PageId, label: 'Creator Studio', icon: LayoutDashboard },
    { id: 'create' as PageId, label: 'Create Post', icon: PenSquare },
    { id: 'scheduled' as PageId, label: 'Schedule Queue', icon: CalendarClock, count: counts.scheduled },
    { id: 'published' as PageId, label: 'Published Archive', icon: CheckCircle, count: counts.published },
    { id: 'drafts' as PageId, label: 'Drafts Bank', icon: FileText, count: counts.drafts },
    { id: 'analytics' as PageId, label: 'Personal Reach', icon: BarChart3 },
  ];

  const secondaryNavItems = [
    { id: 'sheets' as PageId, label: 'Google Sheets Calendar', icon: TableProperties },
    { id: 'codebase' as PageId, label: 'Django Backend', icon: FolderGit2 },
    { id: 'settings' as PageId, label: 'Account & Profiles', icon: SettingsIcon },
  ];

  const handleNavClick = (page: PageId) => {
    onSelectPage(page);
    if (onClose) onClose();
  };

  const navContent = (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div className="flex flex-col gap-6">
        {/* Mobile Header in Drawer */}
        <div className="flex items-center justify-between lg:hidden pb-4 border-b border-zinc-200">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-900">ContentFlow</div>
              <div className="text-[10px] text-pink-600 font-bold uppercase">Solo Creator Studio</div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close Navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Section */}
        <nav className="flex flex-col gap-1.5" aria-label="Main Navigation">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-3 mb-1">
            Personal Content
          </p>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 lg:py-2.5 rounded-2xl text-xs font-semibold transition-all min-h-[44px] ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold shadow-md shadow-pink-500/20'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-transparent'}`} />
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                  <span className="font-semibold">{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-zinc-100 text-zinc-700'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Secondary Integrations */}
        <div className="flex flex-col gap-1.5 pt-4 border-t border-zinc-200">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-3 mb-1">
            Automation & Infrastructure
          </p>
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 lg:py-2.5 rounded-2xl text-xs font-semibold transition-all min-h-[44px] ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold shadow-md shadow-pink-500/20'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-transparent'}`} />
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                  <span className="font-semibold">{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Solo Creator Status Bento Badge */}
      <div className="p-4 sm:p-5 bg-zinc-50 rounded-2xl border border-zinc-200 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pink-500/10 to-transparent rounded-bl-full pointer-events-none" />
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-widest text-pink-600 mb-1 flex items-center gap-1">
            <Zap className="w-3 h-3 text-pink-500" />
            <span>Solo Creator Mode</span>
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
        </div>
        <p className="text-sm font-bold text-zinc-900 mt-1">
          {counts.scheduled} Posts Queued
        </p>
        <p className="text-[11px] text-zinc-500 mt-0.5">
          Auto-dispatches to personal profile
        </p>
        <div className="w-full h-1.5 bg-zinc-200 mt-3 rounded-full overflow-hidden">
          <div className="w-[80%] h-full bg-gradient-to-r from-pink-500 to-violet-600 rounded-full" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside 
        id="main-sidebar"
        className="hidden lg:flex w-64 border-r border-zinc-200 p-6 md:p-8 flex-col justify-between bg-white text-zinc-900 min-h-[calc(100vh-65px)] select-none shrink-0"
      >
        {navContent}
      </aside>

      {/* Mobile / Tablet Responsive Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden flex"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <div className="relative w-4/5 max-w-xs bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 transition-transform duration-300 animate-in slide-in-from-left">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
