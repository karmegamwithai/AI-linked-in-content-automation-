import React, { useState } from 'react';
import { 
  Table, 
  RefreshCw, 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight, 
  UploadCloud, 
  DownloadCloud, 
  Layers, 
  FileSpreadsheet,
  Check,
  Zap
} from 'lucide-react';
import { GoogleSheetsConfig, Post } from '../types';

interface GoogleSheetsPageProps {
  sheetsConfig: GoogleSheetsConfig;
  posts: Post[];
  onUpdateConfig: (config: GoogleSheetsConfig) => void;
  onImportFromSheets: () => void;
  onExportToSheets: () => void;
}

export const GoogleSheetsPage: React.FC<GoogleSheetsPageProps> = ({
  sheetsConfig,
  posts,
  onUpdateConfig,
  onImportFromSheets,
  onExportToSheets,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncedSuccess, setSyncedSuccess] = useState(false);

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncedSuccess(true);
      onUpdateConfig({
        ...sheetsConfig,
        lastSyncedAt: new Date().toISOString(),
        totalSyncedRows: posts.length,
      });
      setTimeout(() => setSyncedSuccess(false), 3000);
    }, 1000);
  };

  const sheetColumns = [
    { name: 'Row ID', key: 'id', desc: 'Auto-increment' },
    { name: 'Story Title', key: 'title', desc: 'Internal hook descriptor' },
    { name: 'Platform', key: 'platforms', desc: 'LINKEDIN / INSTAGRAM / BOTH' },
    { name: 'Content_LinkedIn', key: 'contentLinkedin', desc: 'Formatted with linebreaks & takeaways' },
    { name: 'Content_Instagram', key: 'contentInstagram', desc: 'Creator caption + emojis' },
    { name: 'Media_URL', key: 'mediaUrls', desc: 'CDN / Drive / Unsplash photo' },
    { name: 'Scheduled_Date', key: 'scheduledTime', desc: 'YYYY-MM-DD HH:mm:ss UTC' },
    { name: 'Status', key: 'status', desc: 'DRAFT / SCHEDULED / PUBLISHED' },
    { name: 'Analytics_Impressions', key: 'impressions', desc: 'Sync back from API' },
  ];

  return (
    <div id="page-google-sheets" className="space-y-4 sm:space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 relative overflow-hidden shadow-xs">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-500/10 via-violet-600/10 to-transparent rounded-bl-full pointer-events-none" />

        <div className="z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">
              Personal Content Sheet Pipeline
            </h1>
            <span className="text-[10px] font-bold px-2.5 py-0.5 bg-pink-50 text-pink-700 border border-pink-200 rounded-full">
              Celery Sync Active
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-zinc-500 font-medium mt-1">
            Two-way bidirectional synchronization between your personal Google Sheet and scheduled post queue
          </p>
        </div>

        <button
          id="btn-sync-sheets-now"
          type="button"
          onClick={handleManualSync}
          disabled={isSyncing}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 text-white text-xs font-bold rounded-full shadow-md shadow-pink-500/20 transition-all z-10 active:scale-95 disabled:opacity-40 self-start sm:self-auto min-h-[40px]"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing...' : syncedSuccess ? 'Synced!' : 'Trigger Celery Sync'}</span>
        </button>
      </div>

      {/* Grid: Config & Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Connection Setup (7 cols) */}
        <div className="lg:col-span-7 p-4 sm:p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-4 sm:space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-emerald-600 shadow-2xs shrink-0">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 tracking-tight">Active Google Spreadsheet</h2>
                <p className="text-[10px] text-zinc-500">Connected via Google Service Account (OAuth 2.0 / API Key)</p>
              </div>
            </div>

            <a
              href="https://sheets.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-bold text-pink-700 hover:text-pink-800 transition-colors self-start sm:self-auto"
            >
              <span>Open in Google Sheets</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">
                Spreadsheet Title
              </label>
              <input
                type="text"
                value={sheetsConfig.spreadsheetTitle}
                onChange={(e) => onUpdateConfig({ ...sheetsConfig, spreadsheetTitle: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-zinc-200 rounded-2xl text-zinc-900 text-xs font-semibold focus:outline-none focus:border-pink-500 shadow-2xs transition-all min-h-[44px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">
                Spreadsheet ID / Resource URI
              </label>
              <input
                type="text"
                value={sheetsConfig.spreadsheetId}
                onChange={(e) => onUpdateConfig({ ...sheetsConfig, spreadsheetId: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-zinc-200 rounded-2xl text-zinc-700 font-mono text-xs focus:outline-none focus:border-pink-500 shadow-2xs transition-all min-h-[44px]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200 flex items-center justify-between text-xs flex-wrap gap-2">
            <span className="text-zinc-500">
              Last synced: {sheetsConfig.lastSyncedAt ? new Date(sheetsConfig.lastSyncedAt).toLocaleTimeString() : 'Just now'}
            </span>
            <span className="font-bold text-zinc-900">{sheetsConfig.totalSyncedRows} rows mapped</span>
          </div>
        </div>

        {/* Quick Batch Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 sm:p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-4 shadow-xs">
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">Sync Operations</h2>
            <p className="text-xs text-zinc-500">
              Import bulk rows from your sheet or write back live engagement analytics:
            </p>

            <div className="space-y-2.5">
              <button
                id="btn-import-from-sheets"
                onClick={onImportFromSheets}
                className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-pink-500 transition-all text-left group shadow-2xs min-h-[52px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 text-white flex items-center justify-center shadow-xs shrink-0">
                    <DownloadCloud className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900">Pull Scheduled Rows from Sheet</div>
                    <div className="text-[10px] text-zinc-500">Import new posts into personal queue</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-pink-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </button>

              <button
                id="btn-export-to-sheets"
                onClick={onExportToSheets}
                className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-violet-500 transition-all text-left group shadow-2xs min-h-[52px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 text-violet-600 flex items-center justify-center shrink-0">
                    <UploadCloud className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900">Push All Posts & Metrics</div>
                    <div className="text-[10px] text-zinc-500">Sync impressions, comments & reach to columns</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-violet-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spreadsheet Schema Bento Container */}
      <div className="p-4 sm:p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-4 shadow-xs">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">Spreadsheet Column Mapping Schema</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Exact schema mapped in <code className="text-pink-700 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200 text-[11px]">backend/google_sheets/service.py</code>
          </p>
        </div>

        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-left text-xs min-w-[500px]">
            <thead>
              <tr className="border-b border-zinc-200 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                <th className="pb-3 px-2">Column Header</th>
                <th className="pb-3 px-2">Django Model Field</th>
                <th className="pb-3 px-2">Data Type / Format</th>
                <th className="pb-3 px-2">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 font-medium">
              {sheetColumns.map((col, idx) => (
                <tr key={idx} className="hover:bg-zinc-100/50 transition-colors">
                  <td className="py-3 px-2 font-mono font-bold text-pink-700">{col.name}</td>
                  <td className="py-3 px-2 text-zinc-800">{col.key}</td>
                  <td className="py-3 px-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-white border border-zinc-200 rounded-full text-zinc-600 shadow-2xs">
                      VARCHAR / JSON
                    </span>
                  </td>
                  <td className="py-3 px-2 text-zinc-600">{col.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
