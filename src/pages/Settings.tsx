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
  AlertCircle
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
    <div id="page-settings" className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-zinc-50 border border-black/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-black tracking-tight flex items-center gap-2.5">
            <span>Settings & Account Hub</span>
          </h1>
          <p className="text-xs text-black/40 font-bold uppercase tracking-wider mt-0.5">
            Manage API tokens, OAuth credentials, and Celery background parameters
          </p>
        </div>

        <button
          id="btn-save-settings"
          onClick={handleSaveAll}
          className="flex items-center gap-2 px-6 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:opacity-90 transition-all shadow-xs active:scale-95"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{saveSuccess ? 'Saved All Changes!' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Connected Accounts Bento Grid */}
      <div className="p-6 md:p-8 rounded-3xl bg-zinc-50 border border-black/5 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-black tracking-tight">Social Network Credentials</h2>
          <p className="text-xs text-black/40 font-bold uppercase tracking-wider mt-0.5">
            Configured in <code className="text-black bg-white px-2 py-0.5 rounded-full border border-black/10">.env</code> and Django backend services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accounts.map((account) => {
            const isLinkedin = account.platform === 'linkedin';
            return (
              <div
                key={account.platform}
                className="p-6 rounded-3xl bg-white border border-black/5 space-y-4 shadow-none"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={account.avatarUrl}
                      alt={account.username}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border border-black/10"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        {isLinkedin ? <Linkedin className="w-4 h-4 text-black" /> : <Instagram className="w-4 h-4 text-black" />}
                        <h4 className="text-sm font-bold text-black">{account.accountName}</h4>
                      </div>
                      <p className="text-xs text-black/50">@{account.username}</p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      account.connected
                        ? 'bg-black text-white'
                        : 'bg-zinc-100 text-black/40'
                    }`}
                  >
                    {account.connected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-black/60 pt-2 border-t border-black/5">
                  <div className="flex justify-between">
                    <span>API Service:</span>
                    <span className="font-mono text-black">{isLinkedin ? 'LinkedIn UGC v2 API' : 'Instagram Graph v19.0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Token Expiry:</span>
                    <span className="text-black font-semibold">60 Days (Auto-Refresh)</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleAccountConnection(account.platform)}
                  className={`w-full py-2.5 rounded-full text-xs font-bold transition-all border ${
                    account.connected
                      ? 'border-black/20 text-black hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 bg-white'
                      : 'bg-black text-white hover:opacity-90'
                  }`}
                >
                  {account.connected ? 'Disconnect Platform' : 'Connect Account'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Automation Execution Rules Bento Box */}
      <div className="p-6 md:p-8 rounded-3xl bg-zinc-50 border border-black/5 space-y-5">
        <h2 className="text-xl font-bold text-black tracking-tight">Automation Engine Rules</h2>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-black/5">
            <div>
              <div className="font-bold text-black text-sm">Simulated Dry-Run Publish Mode</div>
              <p className="text-black/50 text-xs mt-0.5">
                Emulates API response and metric increments without burning official API rate limits.
              </p>
            </div>
            <input
              type="checkbox"
              checked={simulatePublishMode}
              onChange={(e) => setSimulatePublishMode(e.target.checked)}
              className="w-4 h-4 accent-black rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-black/5">
            <div>
              <div className="font-bold text-black text-sm">Automatic Hashtag Formatting</div>
              <p className="text-black/50 text-xs mt-0.5">
                Automatically appends generated topical hashtags to the footer of Instagram captions.
              </p>
            </div>
            <input
              type="checkbox"
              checked={autoAddHashtags}
              onChange={(e) => setAutoAddHashtags(e.target.checked)}
              className="w-4 h-4 accent-black rounded cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-white border border-black/5 space-y-2">
            <div className="font-bold text-black text-sm">Default Dispatch Timezone</div>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-50 border border-black/10 rounded-xl text-black font-semibold focus:outline-none focus:border-black"
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
