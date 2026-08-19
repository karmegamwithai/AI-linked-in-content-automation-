import React from 'react';
import { 
  LayoutDashboard, 
  PenSquare, 
  CalendarClock, 
  BarChart3, 
  Menu 
} from 'lucide-react';
import { PageId } from './Sidebar';

interface MobileBottomNavProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
  onOpenMenu: () => void;
  scheduledCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onSelectPage,
  onOpenMenu,
  scheduledCount,
}) => {
  return (
    <nav 
      id="mobile-bottom-nav" 
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 px-2 py-1.5 flex items-center justify-around shadow-lg safe-bottom"
    >
      {/* Studio / Dashboard */}
      <button
        type="button"
        id="mobile-nav-dashboard"
        onClick={() => onSelectPage('dashboard')}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl min-w-[56px] min-h-[48px] transition-all active:scale-95 ${
          currentPage === 'dashboard'
            ? 'text-pink-600 font-bold'
            : 'text-zinc-500 hover:text-zinc-900'
        }`}
      >
        <LayoutDashboard className={`w-5 h-5 ${currentPage === 'dashboard' ? 'stroke-[2.5]' : ''}`} />
        <span className="text-[10px] mt-0.5 font-semibold tracking-tight">Studio</span>
      </button>

      {/* Queue / Scheduled */}
      <button
        type="button"
        id="mobile-nav-scheduled"
        onClick={() => onSelectPage('scheduled')}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl min-w-[56px] min-h-[48px] relative transition-all active:scale-95 ${
          currentPage === 'scheduled'
            ? 'text-pink-600 font-bold'
            : 'text-zinc-500 hover:text-zinc-900'
        }`}
      >
        <CalendarClock className={`w-5 h-5 ${currentPage === 'scheduled' ? 'stroke-[2.5]' : ''}`} />
        <span className="text-[10px] mt-0.5 font-semibold tracking-tight">Queue</span>
        {scheduledCount > 0 && (
          <span className="absolute top-1 right-2.5 w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
            {scheduledCount}
          </span>
        )}
      </button>

      {/* Floating Center Action: Create */}
      <button
        type="button"
        id="mobile-nav-create"
        onClick={() => onSelectPage('create')}
        className="flex items-center justify-center w-12 h-12 -mt-5 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 text-white shadow-md shadow-pink-500/30 active:scale-90 transition-transform"
        aria-label="Create Post"
      >
        <PenSquare className="w-5 h-5" />
      </button>

      {/* Reach / Analytics */}
      <button
        type="button"
        id="mobile-nav-analytics"
        onClick={() => onSelectPage('analytics')}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl min-w-[56px] min-h-[48px] transition-all active:scale-95 ${
          currentPage === 'analytics'
            ? 'text-pink-600 font-bold'
            : 'text-zinc-500 hover:text-zinc-900'
        }`}
      >
        <BarChart3 className={`w-5 h-5 ${currentPage === 'analytics' ? 'stroke-[2.5]' : ''}`} />
        <span className="text-[10px] mt-0.5 font-semibold tracking-tight">Reach</span>
      </button>

      {/* Menu / Drawer Toggle */}
      <button
        type="button"
        id="mobile-nav-menu"
        onClick={onOpenMenu}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl min-w-[56px] min-h-[48px] text-zinc-500 hover:text-zinc-900 transition-all active:scale-95"
      >
        <Menu className="w-5 h-5" />
        <span className="text-[10px] mt-0.5 font-semibold tracking-tight">More</span>
      </button>
    </nav>
  );
};
