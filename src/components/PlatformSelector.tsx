import React from 'react';
import { Linkedin, Instagram, Check } from 'lucide-react';
import { Platform } from '../types';

interface PlatformSelectorProps {
  selectedPlatforms: Platform[];
  onChange: (platforms: Platform[]) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatforms,
  onChange,
}) => {
  const togglePlatform = (platform: Platform) => {
    if (selectedPlatforms.includes(platform)) {
      if (selectedPlatforms.length === 1) return; // Keep at least one
      onChange(selectedPlatforms.filter((p) => p !== platform));
    } else {
      onChange([...selectedPlatforms, platform]);
    }
  };

  const isLinkedInSelected = selectedPlatforms.includes('linkedin');
  const isInstagramSelected = selectedPlatforms.includes('instagram');

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
          Target Personal Profiles
        </label>
        <span className="text-[11px] text-zinc-500 font-medium">
          {selectedPlatforms.length === 2 ? 'Cross-posting enabled' : 'Single channel'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* LinkedIn Personal Profile */}
        <button
          type="button"
          id="btn-select-platform-linkedin"
          onClick={() => togglePlatform('linkedin')}
          className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left group ${
            isLinkedInSelected
              ? 'bg-gradient-to-r from-pink-500/15 via-fuchsia-500/15 to-violet-600/15 border-pink-500/50 shadow-md shadow-pink-500/10'
              : 'bg-zinc-950 border-zinc-800/80 hover:border-zinc-700 opacity-60'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isLinkedInSelected ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-sm' : 'bg-zinc-900 text-zinc-400'
            }`}>
              <Linkedin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Personal LinkedIn Profile</span>
              </div>
              <p className="text-[10px] text-zinc-400">Long-form thought leadership & stories</p>
            </div>
          </div>

          <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
            isLinkedInSelected ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white' : 'border border-zinc-700 bg-zinc-900'
          }`}>
            {isLinkedInSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
          </div>
        </button>

        {/* Instagram Personal Creator Profile */}
        <button
          type="button"
          id="btn-select-platform-instagram"
          onClick={() => togglePlatform('instagram')}
          className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left group ${
            isInstagramSelected
              ? 'bg-gradient-to-r from-pink-500/15 via-fuchsia-500/15 to-violet-600/15 border-pink-500/50 shadow-md shadow-pink-500/10'
              : 'bg-zinc-950 border-zinc-800/80 hover:border-zinc-700 opacity-60'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isInstagramSelected ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-sm' : 'bg-zinc-900 text-zinc-400'
            }`}>
              <Instagram className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Personal Creator IG</span>
              </div>
              <p className="text-[10px] text-zinc-400">Carousel, visuals & engaging captions</p>
            </div>
          </div>

          <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
            isInstagramSelected ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white' : 'border border-zinc-700 bg-zinc-900'
          }`}>
            {isInstagramSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
          </div>
        </button>
      </div>
    </div>
  );
};
