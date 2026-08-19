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
  User,
  Zap
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
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onSelectPage,
  counts,
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

  return (
    <aside 
      id="main-sidebar"
      className="w-64 border-r border-zinc-800/80 p-6 md:p-8 flex flex-col justify-between bg-black text-white min-h-[calc(100vh-65px)] select-none shrink-0"
    >
      <div className="flex flex-col gap-8">
        {/* Navigation Section */}
        <nav className="flex flex-col gap-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 px-3 mb-1">
            Personal Content
          </p>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-link-${item.id}`}
                onClick={() => onSelectPage(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold shadow-md shadow-pink-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-transparent'}`} />
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                  <span className="font-semibold">{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-zinc-800 text-zinc-300'
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
        <div className="flex flex-col gap-2 pt-4 border-t border-zinc-800/80">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 px-3 mb-1">
            Automation & Infrastructure
          </p>
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-link-${item.id}`}
                onClick={() => onSelectPage(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold shadow-md shadow-pink-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-transparent'}`} />
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                  <span className="font-semibold">{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Solo Creator Status Bento Badge */}
      <div className="p-5 bg-zinc-950 rounded-2xl border border-zinc-800/90 mt-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pink-500/10 to-transparent rounded-bl-full pointer-events-none" />
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-widest text-pink-400 mb-1 flex items-center gap-1">
            <Zap className="w-3 h-3 text-pink-400" />
            <span>Solo Creator Mode</span>
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
        </div>
        <p className="text-sm font-bold text-white mt-1">
          {counts.scheduled} Posts Queued
        </p>
        <p className="text-[11px] text-zinc-400 mt-0.5">
          Auto-dispatches to personal profile
        </p>
        <div className="w-full h-1.5 bg-zinc-800 mt-3 rounded-full overflow-hidden">
          <div className="w-[80%] h-full bg-gradient-to-r from-pink-500 to-violet-600 rounded-full" />
        </div>
      </div>
    </aside>
  );
};
