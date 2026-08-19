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
  Sparkles
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
    { id: 'dashboard' as PageId, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create' as PageId, label: 'Create Post', icon: PenSquare },
    { id: 'scheduled' as PageId, label: 'Schedule Queue', icon: CalendarClock, count: counts.scheduled },
    { id: 'published' as PageId, label: 'Published Posts', icon: CheckCircle, count: counts.published },
    { id: 'drafts' as PageId, label: 'Drafts Bank', icon: FileText, count: counts.drafts },
    { id: 'analytics' as PageId, label: 'Analytics', icon: BarChart3 },
  ];

  const secondaryNavItems = [
    { id: 'sheets' as PageId, label: 'Google Sheets', icon: TableProperties },
    { id: 'codebase' as PageId, label: 'Django Backend', icon: FolderGit2 },
    { id: 'settings' as PageId, label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <aside 
      id="main-sidebar"
      className="w-64 border-r border-black/5 p-6 md:p-8 flex flex-col justify-between bg-white text-black min-h-[calc(100vh-65px)] select-none shrink-0"
    >
      <div className="flex flex-col gap-8">
        {/* Navigation Section */}
        <nav className="flex flex-col gap-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 px-3 mb-1">
            Menu
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
                    ? 'bg-black text-white font-bold shadow-xs'
                    : 'text-black/50 hover:text-black hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-transparent'}`} />
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-black/60'}`} />
                  <span className="font-semibold">{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-zinc-100 text-black/70'
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
        <div className="flex flex-col gap-2 pt-4 border-t border-black/5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 px-3 mb-1">
            System & Cloud
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
                    ? 'bg-black text-white font-bold shadow-xs'
                    : 'text-black/50 hover:text-black hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-transparent'}`} />
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-black/60'}`} />
                  <span className="font-semibold">{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bento Bottom Plan Badge matching design HTML */}
      <div className="p-5 bg-zinc-50 rounded-2xl border border-black/5 mt-6">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">
            Active Pipeline
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
        </div>
        <p className="text-sm font-bold text-black">
          {counts.scheduled} in Queue • Celery Live
        </p>
        <div className="w-full h-1.5 bg-black/10 mt-3 rounded-full overflow-hidden">
          <div className="w-[75%] h-full bg-black rounded-full" />
        </div>
      </div>
    </aside>
  );
};
