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
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">
          Target Personal Profiles
        </label>
        <span className="text-[11px] text-zinc-400 font-medium">
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
              ? 'bg-gradient-to-r from-pink-500/10 via-fuchsia-500/10 to-violet-600/10 border-pink-500/50 shadow-xs'
              : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300 opacity-70'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isLinkedInSelected ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-xs' : 'bg-zinc-200 text-zinc-600'
            }`}>
              <Linkedin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                <span>Personal LinkedIn Profile</span>
              </div>
              <p className="text-[10px] text-zinc-500">Long-form thought leadership & stories</p>
            </div>
          </div>

          <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
            isLinkedInSelected ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white' : 'border border-zinc-300 bg-white'
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
              ? 'bg-gradient-to-r from-pink-500/10 via-fuchsia-500/10 to-violet-600/10 border-pink-500/50 shadow-xs'
              : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300 opacity-70'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isInstagramSelected ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-xs' : 'bg-zinc-200 text-zinc-600'
            }`}>
              <Instagram className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                <span>Personal Creator IG</span>
              </div>
              <p className="text-[10px] text-zinc-500">Carousel, visuals & engaging captions</p>
            </div>
          </div>

          <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
            isInstagramSelected ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white' : 'border border-zinc-300 bg-white'
          }`}>
            {isInstagramSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
          </div>
        </button>
      </div>
    </div>
  );
};
