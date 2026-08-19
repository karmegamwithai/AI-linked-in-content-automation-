import React from 'react';
import { 
  Sparkles, 
  Plus, 
  Linkedin, 
  Instagram, 
  Table, 
  Code2, 
  Search,
  Check,
  UserCheck
} from 'lucide-react';
import { ConnectedAccount, GoogleSheetsConfig } from '../types';

interface NavbarProps {
  accounts: ConnectedAccount[];
  sheetsConfig: GoogleSheetsConfig;
  onOpenCreate: () => void;
  onOpenCodebase: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  accounts,
  sheetsConfig,
  onOpenCreate,
  onOpenCodebase,
  searchTerm,
  onSearchChange,
}) => {
  const linkedinAccount = accounts.find((a) => a.platform === 'linkedin');
  const instagramAccount = accounts.find((a) => a.platform === 'instagram');

  return (
    <header 
      id="main-navbar"
      className="sticky top-0 z-30 flex items-center justify-between px-6 md:px-10 py-3.5 bg-black/90 backdrop-blur-md border-b border-zinc-800/80 text-white"
    >
      {/* Brand / Logo & Individual Identity */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-pink-500 rounded-full flex items-center justify-center shadow-md shadow-pink-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                ContentFlow
              </h1>
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500/20 to-violet-500/20 text-pink-300 border border-pink-500/30">
                Personal Creator
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-medium hidden sm:block">
              Solo LinkedIn & Instagram Engine
            </p>
          </div>
        </div>

        {/* Global Search */}
        <div className="hidden md:flex items-center relative ml-2">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 pointer-events-none" />
          <input
            id="nav-search-input"
            type="text"
            placeholder="Search personal hooks, drafts, topics..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-64 pl-9 pr-4 py-1.5 text-xs bg-zinc-900/90 border border-zinc-800 rounded-full text-white placeholder:text-zinc-500 focus:outline-none focus:border-pink-500/60 focus:ring-1 focus:ring-pink-500/30 transition-all font-medium"
          />
        </div>
      </div>

      {/* Integration Badges & Actions */}
      <div className="flex items-center gap-3">
        {/* Status Pills */}
        <div className="hidden lg:flex items-center gap-1.5 bg-zinc-900/80 p-1 rounded-full border border-zinc-800 text-xs">
          {/* LinkedIn Personal Status */}
          <div 
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              linkedinAccount?.connected ? 'bg-zinc-800 text-white border border-zinc-700' : 'text-zinc-500'
            }`}
            title={linkedinAccount?.connected ? `Personal Profile: ${linkedinAccount.username}` : 'LinkedIn Disconnected'}
          >
            <Linkedin className="w-3 h-3 text-sky-400" />
            <span className="text-[11px]">Personal Profile</span>
            {linkedinAccount?.connected && <Check className="w-3 h-3 text-pink-400" />}
          </div>

          {/* Instagram Personal Status */}
          <div 
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              instagramAccount?.connected ? 'bg-zinc-800 text-white border border-zinc-700' : 'text-zinc-500'
            }`}
            title={instagramAccount?.connected ? `Personal Creator: ${instagramAccount.username}` : 'Instagram Disconnected'}
          >
            <Instagram className="w-3 h-3 text-pink-400" />
            <span className="text-[11px]">Creator IG</span>
            {instagramAccount?.connected && <Check className="w-3 h-3 text-pink-400" />}
          </div>

          {/* Sheets Status */}
          <div 
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              sheetsConfig.connected ? 'bg-zinc-800 text-white border border-zinc-700' : 'text-zinc-500'
            }`}
            title="Google Sheets Auto-Sync Active"
          >
            <Table className="w-3 h-3 text-emerald-400" />
            <span className="text-[11px]">Sheets Sync</span>
            {sheetsConfig.connected && <Check className="w-3 h-3 text-violet-400" />}
          </div>
        </div>

        {/* View Codebase Files */}
        <button
          id="btn-view-codebase"
          onClick={onOpenCodebase}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-zinc-300 bg-zinc-900 hover:bg-zinc-800 hover:text-white border border-zinc-800 rounded-full transition-all"
        >
          <Code2 className="w-3.5 h-3.5 text-violet-400" />
          <span className="hidden sm:inline">Django Code</span>
        </button>

        {/* Create Content Button with Pink/Violet Gradient */}
        <button
          id="btn-create-post-nav"
          onClick={onOpenCreate}
          className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 rounded-full shadow-md shadow-pink-500/25 transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Create Post</span>
        </button>
      </div>
    </header>
  );
};
