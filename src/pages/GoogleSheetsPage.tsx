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
  Check
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
    { name: 'Title', key: 'title', desc: 'Internal hook descriptor' },
    { name: 'Platform', key: 'platforms', desc: 'LINKEDIN / INSTAGRAM / BOTH' },
    { name: 'Content_LinkedIn', key: 'contentLinkedin', desc: 'Formatted with linebreaks' },
    { name: 'Content_Instagram', key: 'contentInstagram', desc: 'Caption + emojis' },
    { name: 'Media_URL', key: 'mediaUrls', desc: 'CDN / Drive / Unsplash link' },
    { name: 'Scheduled_Date', key: 'scheduledTime', desc: 'YYYY-MM-DD HH:mm:ss UTC' },
    { name: 'Status', key: 'status', desc: 'DRAFT / SCHEDULED / PUBLISHED' },
    { name: 'Analytics_Impressions', key: 'impressions', desc: 'Sync back from API' },
  ];

  return (
    <div id="page-google-sheets" className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-zinc-50 border border-black/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-black tracking-tight">
              Google Sheets Pipeline
            </h1>
            <span className="text-xs font-bold px-3 py-1 bg-black text-white rounded-full">
              Celery Sync Active
            </span>
          </div>
          <p className="text-xs text-black/40 font-bold uppercase tracking-wider mt-0.5">
            Two-way sync between Google Sheets and Django database queue
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-trigger-sheets-sync"
            onClick={handleManualSync}
            disabled={isSyncing}
            className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:opacity-90 transition-all shadow-xs active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : syncedSuccess ? 'Synced Successfully!' : 'Trigger Celery Sync'}</span>
          </button>
        </div>
      </div>

      {/* Bento Grid: Config & Synchronization Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Spreadsheet Settings Bento Box (7 cols) */}
        <div className="lg:col-span-7 p-6 md:p-8 rounded-3xl bg-zinc-50 border border-black/5 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-black tracking-tight">Connected Spreadsheet</h2>
            <span className="text-xs font-bold bg-white border border-black/10 px-3 py-1 rounded-full text-black">
              gspread + oauth2client
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-black/50 mb-1">
                Spreadsheet Name
              </label>
              <input
                type="text"
                value={sheetsConfig.spreadsheetName}
                onChange={(e) => onUpdateConfig({ ...sheetsConfig, spreadsheetName: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-2xl text-black font-semibold focus:outline-none focus:border-black"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black/50 mb-1">
                  Active Sheet Tab
                </label>
                <input
                  type="text"
                  value={sheetsConfig.sheetTabName}
                  onChange={(e) => onUpdateConfig({ ...sheetsConfig, sheetTabName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-2xl text-black font-semibold focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black/50 mb-1">
                  Auto-Sync Interval
                </label>
                <select
                  value={sheetsConfig.syncIntervalMinutes}
                  onChange={(e) => onUpdateConfig({ ...sheetsConfig, syncIntervalMinutes: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-2xl text-black font-semibold focus:outline-none focus:border-black"
                >
                  <option value={5}>Every 5 minutes (Celery beat)</option>
                  <option value={15}>Every 15 minutes</option>
                  <option value={60}>Every 1 hour</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-black/50 mb-1">
                Google Sheets Spreadsheet ID
              </label>
              <input
                type="text"
                value={sheetsConfig.spreadsheetId}
                onChange={(e) => onUpdateConfig({ ...sheetsConfig, spreadsheetId: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-2xl text-black font-mono text-xs focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs">
            <span className="text-black/40">
              Last synced: {sheetsConfig.lastSyncedAt ? new Date(sheetsConfig.lastSyncedAt).toLocaleTimeString() : 'Just now'}
            </span>
            <span className="font-bold text-black">{sheetsConfig.totalSyncedRows} rows synchronized</span>
          </div>
        </div>

        {/* Quick Batch Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 md:p-8 rounded-3xl bg-zinc-50 border border-black/5 space-y-4">
            <h2 className="text-xl font-bold text-black tracking-tight">Batch Operations</h2>
            <p className="text-xs text-black/60">
              Import bulk rows from spreadsheet or write back live engagement analytics:
            </p>

            <div className="space-y-2.5">
              <button
                id="btn-import-from-sheets"
                onClick={onImportFromSheets}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-white hover:bg-zinc-100 border border-black/5 transition-all text-left shadow-none group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                    <DownloadCloud className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-black">Pull New Rows from Sheet</div>
                    <div className="text-[10px] text-black/40">Import new scheduled posts into Celery queue</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                id="btn-export-to-sheets"
                onClick={onExportToSheets}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-white hover:bg-zinc-100 border border-black/5 transition-all text-left shadow-none group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                    <UploadCloud className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-black">Push All Posts & Metrics</div>
                    <div className="text-[10px] text-black/40">Sync impressions, comments & reach to columns</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spreadsheet Schema Bento Container */}
      <div className="p-6 md:p-8 rounded-3xl bg-zinc-50 border border-black/5 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-black tracking-tight">Spreadsheet Column Mapping Schema</h2>
          <p className="text-xs text-black/40 font-bold uppercase tracking-wider mt-0.5">
            Exact schema mapped in <code className="text-black bg-white px-2 py-0.5 rounded-full border border-black/10">backend/google_sheets/service.py</code>
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-black/10 text-[10px] font-bold uppercase tracking-wider text-black/40">
                <th className="pb-3 px-2">Column Header</th>
                <th className="pb-3 px-2">Django Model Field</th>
                <th className="pb-3 px-2">Data Type / Format</th>
                <th className="pb-3 px-2">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 font-medium">
              {sheetColumns.map((col, idx) => (
                <tr key={idx} className="hover:bg-white transition-colors">
                  <td className="py-3 px-2 font-mono font-bold text-black">{col.name}</td>
                  <td className="py-3 px-2 text-black/70">{col.key}</td>
                  <td className="py-3 px-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-white border border-black/10 rounded-full text-black">
                      VARCHAR / JSON
                    </span>
                  </td>
                  <td className="py-3 px-2 text-black/50">{col.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
