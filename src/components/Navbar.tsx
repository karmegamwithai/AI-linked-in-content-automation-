import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Linkedin, 
  Instagram, 
  Table, 
  Code2, 
  Search,
  Check,
  Menu,
  X
} from 'lucide-react';
import { ConnectedAccount, GoogleSheetsConfig } from '../types';

interface NavbarProps {
  accounts: ConnectedAccount[];
  sheetsConfig: GoogleSheetsConfig;
  onOpenCreate: () => void;
  onOpenCodebase: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onToggleMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  accounts,
  sheetsConfig,
  onOpenCreate,
  onOpenCodebase,
  searchTerm,
  onSearchChange,
  onToggleMobileMenu,
}) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const linkedinAccount = accounts.find((a) => a.platform === 'linkedin');
  const instagramAccount = accounts.find((a) => a.platform === 'instagram');

  return (
    <header 
      id="main-navbar"
      className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-zinc-200 text-zinc-900"
    >
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3">
        {/* Left: Mobile Menu Toggle & Brand */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            id="btn-mobile-menu-toggle"
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 min-w-[44px] min-h-[44px] flex items-center justify-center transition-all"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo & Solo Creator Badge */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-pink-500 rounded-full flex items-center justify-center shadow-md shadow-pink-500/20 shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-base font-bold tracking-tight text-zinc-900">
                  ContentFlow
                </h1>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500/10 to-violet-500/10 text-pink-600 border border-pink-500/20 whitespace-nowrap">
                  Solo Creator
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 font-medium hidden md:block">
                Solo LinkedIn & Instagram Engine
              </p>
            </div>
          </div>

          {/* Desktop Search Input */}
          <div className="hidden md:flex items-center relative ml-2">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
            <input
              id="nav-search-input"
              type="text"
              placeholder="Search personal hooks, drafts, topics..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-56 lg:w-64 pl-9 pr-4 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-full text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500/30 transition-all font-medium"
            />
          </div>
        </div>

        {/* Right: Actions & Integration Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Toggle Button */}
          <button
            type="button"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 rounded-xl hover:bg-zinc-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Desktop Status Pills */}
          <div className="hidden xl:flex items-center gap-1.5 bg-zinc-100/80 p-1 rounded-full border border-zinc-200 text-xs">
            {/* LinkedIn Personal Status */}
            <div 
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                linkedinAccount?.connected ? 'bg-white text-zinc-900 border border-zinc-200 shadow-xs' : 'text-zinc-400'
              }`}
              title={linkedinAccount?.connected ? `Personal Profile: ${linkedinAccount.username}` : 'LinkedIn Disconnected'}
            >
              <Linkedin className="w-3 h-3 text-sky-600" />
              <span className="text-[11px]">Personal Profile</span>
              {linkedinAccount?.connected && <Check className="w-3 h-3 text-pink-600" />}
            </div>

            {/* Instagram Personal Status */}
            <div 
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                instagramAccount?.connected ? 'bg-white text-zinc-900 border border-zinc-200 shadow-xs' : 'text-zinc-400'
              }`}
              title={instagramAccount?.connected ? `Personal Creator: ${instagramAccount.username}` : 'Instagram Disconnected'}
            >
              <Instagram className="w-3 h-3 text-pink-600" />
              <span className="text-[11px]">Creator IG</span>
              {instagramAccount?.connected && <Check className="w-3 h-3 text-pink-600" />}
            </div>

            {/* Sheets Status */}
            <div 
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                sheetsConfig.connected ? 'bg-white text-zinc-900 border border-zinc-200 shadow-xs' : 'text-zinc-400'
              }`}
              title="Google Sheets Auto-Sync Active"
            >
              <Table className="w-3 h-3 text-emerald-600" />
              <span className="text-[11px]">Sheets Sync</span>
              {sheetsConfig.connected && <Check className="w-3 h-3 text-violet-600" />}
            </div>
          </div>

          {/* View Codebase Files */}
          <button
            id="btn-view-codebase"
            onClick={onOpenCodebase}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-zinc-700 bg-zinc-50 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200 rounded-full transition-all min-h-[40px]"
          >
            <Code2 className="w-3.5 h-3.5 text-violet-600" />
            <span className="hidden md:inline">Django Code</span>
          </button>

          {/* Create Content Button with Pink/Violet Gradient */}
          <button
            id="btn-create-post-nav"
            onClick={onOpenCreate}
            className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 rounded-full shadow-md shadow-pink-500/25 transition-all active:scale-95 min-h-[40px] whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Create</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Dropdown Expansion */}
      {showMobileSearch && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-zinc-100 animate-in fade-in slide-in-from-top-2">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search hooks, drafts, topics..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-9 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-full text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-pink-500"
              autoFocus
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
