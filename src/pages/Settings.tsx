import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Linkedin, 
  Instagram, 
  Table, 
  CheckCircle2, 
  Key, 
  Clock, 
  ShieldCheck, 
  Save, 
  RefreshCw,
  Sparkles,
  AlertCircle,
  User
} from 'lucide-react';
import { ConnectedAccount, GoogleSheetsConfig } from '../types';

interface SettingsProps {
  accounts: ConnectedAccount[];
  sheetsConfig: GoogleSheetsConfig;
  onUpdateAccounts: (accounts: ConnectedAccount[]) => void;
  onUpdateSheetsConfig: (config: GoogleSheetsConfig) => void;
}

export const Settings: React.FC<SettingsProps> = ({
  accounts,
  sheetsConfig,
  onUpdateAccounts,
  onUpdateSheetsConfig,
}) => {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [timezone, setTimezone] = useState('America/Los_Angeles');
  const [autoAddHashtags, setAutoAddHashtags] = useState(true);
  const [simulatePublishMode, setSimulatePublishMode] = useState(true);

  const toggleAccountConnection = (platform: 'linkedin' | 'instagram') => {
    const updated = accounts.map((acc) => {
      if (acc.platform === platform) {
        return { ...acc, connected: !acc.connected };
      }
      return acc;
    });
    onUpdateAccounts(updated);
  };

  const handleSaveAll = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div id="page-settings" className="space-y-4 sm:space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 relative overflow-hidden shadow-xs">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-500/10 via-violet-600/10 to-transparent rounded-bl-full pointer-events-none" />

        <div className="z-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-zinc-900 tracking-tight flex items-center gap-2.5">
            <span>Personal Profile & Credentials</span>
          </h1>
          <p className="text-[11px] sm:text-xs text-zinc-500 font-medium mt-1">
            Manage your individual LinkedIn and Instagram OAuth connections and automation settings
          </p>
        </div>

        <button
          id="btn-save-settings"
          onClick={handleSaveAll}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 text-white text-xs font-bold rounded-full shadow-md shadow-pink-500/20 transition-all z-10 active:scale-95 self-start sm:self-auto min-h-[40px]"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{saveSuccess ? 'Saved All Changes!' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Connected Accounts Bento Grid */}
      <div className="p-4 sm:p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-4 sm:space-y-6 shadow-xs">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">Individual Social Accounts</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Connected personal profiles for automated dispatch
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accounts.map((account) => {
            const isLinkedin = account.platform === 'linkedin';
            return (
              <div
                key={account.platform}
                className="p-4 sm:p-6 rounded-3xl bg-white border border-zinc-200 space-y-4 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={account.avatarUrl}
                      alt={account.username}
                      referrerPolicy="no-referrer"
                      className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover border border-zinc-200 shadow-2xs shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        {isLinkedin ? <Linkedin className="w-4 h-4 text-sky-600 shrink-0" /> : <Instagram className="w-4 h-4 text-pink-600 shrink-0" />}
                        <h4 className="text-xs sm:text-sm font-bold text-zinc-900 truncate">{account.accountName}</h4>
                      </div>
                      <p className="text-xs text-zinc-500">@{account.username}</p>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                      account.connected
                        ? 'bg-pink-50 text-pink-700 border border-pink-200'
                        : 'bg-zinc-100 text-zinc-500'
                    }`}
                  >
                    {account.connected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-zinc-600 pt-2 border-t border-zinc-100">
                  <div className="flex justify-between gap-2">
                    <span className="shrink-0">Account Scope:</span>
                    <span className="font-semibold text-zinc-900 text-right truncate">{isLinkedin ? 'Personal Profile (UGC API)' : 'Personal / Creator IG (Graph API)'}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span>Token Expiry:</span>
                    <span className="text-zinc-900 font-semibold">60 Days (Auto-Refresh)</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleAccountConnection(account.platform)}
                  className={`w-full py-2.5 rounded-full text-xs font-bold transition-all border min-h-[44px] ${
                    account.connected
                      ? 'border-zinc-200 text-zinc-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 bg-white shadow-2xs'
                      : 'bg-gradient-to-r from-pink-500 to-violet-600 text-white hover:from-pink-400 hover:to-violet-500 shadow-md shadow-pink-500/20'
                  }`}
                >
                  {account.connected ? 'Disconnect Profile' : 'Connect Personal Profile'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Automation Rules Bento Box */}
      <div className="p-4 sm:p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-4 sm:space-y-5 shadow-xs">
        <h2 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">Automation Preferences</h2>

        <div className="space-y-3 sm:space-y-4 text-xs">
          <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs gap-3">
            <div>
              <div className="font-bold text-zinc-900 text-sm">Simulated Dry-Run Publish Mode</div>
              <p className="text-zinc-500 text-xs mt-0.5">
                Emulates API responses and updates metrics without consuming official personal account rate limits.
              </p>
            </div>
            <input
              type="checkbox"
              checked={simulatePublishMode}
              onChange={(e) => setSimulatePublishMode(e.target.checked)}
              className="w-5 h-5 accent-pink-600 rounded cursor-pointer shrink-0"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs gap-3">
            <div>
              <div className="font-bold text-zinc-900 text-sm">Personal Creator Hashtags</div>
              <p className="text-zinc-500 text-xs mt-0.5">
                Automatically formats topical hashtags at the end of Instagram captions.
              </p>
            </div>
            <input
              type="checkbox"
              checked={autoAddHashtags}
              onChange={(e) => setAutoAddHashtags(e.target.checked)}
              className="w-5 h-5 accent-pink-600 rounded cursor-pointer shrink-0"
            />
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-zinc-200 space-y-2 shadow-2xs">
            <div className="font-bold text-zinc-900 text-sm">Default Schedule Timezone</div>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 font-semibold focus:outline-none focus:border-pink-500 min-h-[44px]"
            >
              <option value="America/Los_Angeles">Pacific Time (US & Canada) - UTC-08:00</option>
              <option value="America/New_York">Eastern Time (US & Canada) - UTC-05:00</option>
              <option value="Europe/London">London (GMT) - UTC+00:00</option>
              <option value="Asia/Tokyo">Tokyo (JST) - UTC+09:00</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
