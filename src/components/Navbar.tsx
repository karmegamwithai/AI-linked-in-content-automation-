import React from 'react';
import { 
  Sparkles, 
  Plus, 
  Linkedin, 
  Instagram, 
  Table, 
  CheckCircle2, 
  Code2, 
  Search,
  Check
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
      className="sticky top-0 z-30 flex items-center justify-between px-6 md:px-10 py-4 bg-white/90 backdrop-blur-md border-b border-black/5 text-black"
    >
      {/* Brand / Logo */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <div className="w-3.5 h-3.5 border-2 border-white rounded-sm" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight uppercase text-black flex items-center gap-2">
              ContentFlow
              <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full bg-black/5 text-black/60">
                Bento
              </span>
            </h1>
          </div>
        </div>

        {/* Global Search */}
        <div className="hidden md:flex items-center relative ml-4">
          <Search className="w-4 h-4 text-black/30 absolute left-3.5 pointer-events-none" />
          <input
            id="nav-search-input"
            type="text"
            placeholder="Search posts, hooks, channels..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-64 pl-9 pr-4 py-2 text-xs bg-zinc-50 border border-black/5 rounded-full text-black placeholder:text-black/40 focus:outline-none focus:border-black/20 focus:bg-white transition-all font-medium"
          />
        </div>
      </div>

      {/* Integration Badges & Actions */}
      <div className="flex items-center gap-3">
        {/* Status Pills */}
        <div className="hidden lg:flex items-center gap-1.5 bg-zinc-50 p-1 rounded-full border border-black/5 text-xs">
          {/* LinkedIn Status */}
          <div 
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              linkedinAccount?.connected ? 'bg-white shadow-xs text-black border border-black/5' : 'text-black/40'
            }`}
            title={linkedinAccount?.connected ? `LinkedIn: ${linkedinAccount.username}` : 'LinkedIn Disconnected'}
          >
            <Linkedin className="w-3 h-3" />
            <span className="text-[11px]">LinkedIn</span>
            {linkedinAccount?.connected && <Check className="w-3 h-3 text-black" />}
          </div>

          {/* Instagram Status */}
          <div 
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              instagramAccount?.connected ? 'bg-white shadow-xs text-black border border-black/5' : 'text-black/40'
            }`}
            title={instagramAccount?.connected ? `Instagram: ${instagramAccount.username}` : 'Instagram Disconnected'}
          >
            <Instagram className="w-3 h-3" />
            <span className="text-[11px]">Instagram</span>
            {instagramAccount?.connected && <Check className="w-3 h-3 text-black" />}
          </div>

          {/* Sheets Status */}
          <div 
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              sheetsConfig.connected ? 'bg-white shadow-xs text-black border border-black/5' : 'text-black/40'
            }`}
            title="Google Sheets Auto-Sync Active"
          >
            <Table className="w-3 h-3" />
            <span className="text-[11px]">Sheets Sync</span>
            {sheetsConfig.connected && <Check className="w-3 h-3 text-black" />}
          </div>
        </div>

        {/* View Codebase Files */}
        <button
          id="btn-view-codebase"
          onClick={onOpenCodebase}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-black bg-zinc-50 hover:bg-zinc-100 border border-black/5 rounded-full transition-all"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Django Code</span>
        </button>

        {/* Create Content Button */}
        <button
          id="btn-create-post-nav"
          onClick={onOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-black hover:opacity-90 rounded-full shadow-xs transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Create Content</span>
        </button>
      </div>
    </header>
  );
};
