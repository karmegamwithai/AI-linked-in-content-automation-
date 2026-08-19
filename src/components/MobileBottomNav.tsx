import React from 'react';
import { 
  LayoutDashboard, 
  PenSquare, 
  CalendarClock, 
  BarChart3, 
  Menu,
  Plus
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
      aria-label="Mobile Bottom Navigation"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 px-2 sm:px-4"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-1">
        {/* Studio / Dashboard */}
        <button
          type="button"
          id="mobile-nav-dashboard"
          onClick={() => onSelectPage('dashboard')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl min-w-0 min-h-[48px] transition-all active:scale-95 ${
            currentPage === 'dashboard'
              ? 'text-pink-600 font-bold bg-pink-50/70'
              : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <LayoutDashboard className={`w-5 h-5 ${currentPage === 'dashboard' ? 'stroke-[2.5] text-pink-600' : 'stroke-[1.8]'}`} />
            {currentPage === 'dashboard' && (
              <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-pink-600" />
            )}
          </div>
          <span className="text-[10px] mt-1 font-semibold tracking-tight truncate max-w-full">Studio</span>
        </button>

        {/* Queue / Scheduled */}
        <button
          type="button"
          id="mobile-nav-scheduled"
          onClick={() => onSelectPage('scheduled')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl min-w-0 min-h-[48px] relative transition-all active:scale-95 ${
            currentPage === 'scheduled'
              ? 'text-pink-600 font-bold bg-pink-50/70'
              : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <CalendarClock className={`w-5 h-5 ${currentPage === 'scheduled' ? 'stroke-[2.5] text-pink-600' : 'stroke-[1.8]'}`} />
            {scheduledCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] px-1 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                {scheduledCount > 9 ? '9+' : scheduledCount}
              </span>
            )}
            {currentPage === 'scheduled' && (
              <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-pink-600" />
            )}
          </div>
          <span className="text-[10px] mt-1 font-semibold tracking-tight truncate max-w-full">Queue</span>
        </button>

        {/* Floating Center Action: Create Post */}
        <div className="flex-1 flex flex-col items-center justify-center min-w-0 px-0.5">
          <button
            type="button"
            id="mobile-nav-create"
            onClick={() => onSelectPage('create')}
            className={`flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 -mt-4 sm:-mt-5 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 text-white shadow-lg shadow-pink-500/30 active:scale-90 transition-all border-2 border-white ${
              currentPage === 'create' ? 'ring-2 ring-pink-500 ring-offset-2' : ''
            }`}
            aria-label="Create Post"
          >
            <Plus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>
          <span className="text-[10px] mt-0.5 font-bold tracking-tight text-zinc-700 truncate max-w-full">Create</span>
        </div>

        {/* Reach / Analytics */}
        <button
          type="button"
          id="mobile-nav-analytics"
          onClick={() => onSelectPage('analytics')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl min-w-0 min-h-[48px] transition-all active:scale-95 ${
            currentPage === 'analytics'
              ? 'text-pink-600 font-bold bg-pink-50/70'
              : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <BarChart3 className={`w-5 h-5 ${currentPage === 'analytics' ? 'stroke-[2.5] text-pink-600' : 'stroke-[1.8]'}`} />
            {currentPage === 'analytics' && (
              <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-pink-600" />
            )}
          </div>
          <span className="text-[10px] mt-1 font-semibold tracking-tight truncate max-w-full">Reach</span>
        </button>

        {/* Menu / Drawer Toggle */}
        <button
          type="button"
          id="mobile-nav-menu"
          onClick={onOpenMenu}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl min-w-0 min-h-[48px] text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-all active:scale-95"
        >
          <div className="relative flex items-center justify-center">
            <Menu className="w-5 h-5 stroke-[1.8]" />
          </div>
          <span className="text-[10px] mt-1 font-semibold tracking-tight truncate max-w-full">Menu</span>
        </button>
      </div>
    </nav>
  );
};
