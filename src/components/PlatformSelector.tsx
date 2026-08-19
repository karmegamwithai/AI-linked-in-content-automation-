import React from 'react';
import { Linkedin, Instagram, Sparkles, Image, Video, Layout } from 'lucide-react';
import { Platform, MediaType } from '../types';

interface PlatformSelectorProps {
  selectedPlatforms: Platform[];
  onChangePlatforms: (platforms: Platform[]) => void;
  mediaType: MediaType;
  onChangeMediaType: (type: MediaType) => void;
  aspectRatio: string;
  onChangeAspectRatio: (ratio: string) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatforms,
  onChangePlatforms,
  mediaType,
  onChangeMediaType,
  aspectRatio,
  onChangeAspectRatio,
}) => {
  const togglePlatform = (platform: Platform) => {
    if (selectedPlatforms.includes(platform)) {
      if (selectedPlatforms.length > 1) {
        onChangePlatforms(selectedPlatforms.filter((p) => p !== platform));
      }
    } else {
      onChangePlatforms([...selectedPlatforms, platform]);
    }
  };

  const aspectRatios = [
    { label: 'Square (1:1)', value: '1:1', desc: 'Instagram Feed / LinkedIn' },
    { label: 'Portrait (4:5)', value: '4:5', desc: 'Optimal Instagram Feed' },
    { label: 'Landscape (16:9)', value: '16:9', desc: 'LinkedIn Article / Video' },
  ];

  return (
    <div className="p-6 rounded-3xl bg-zinc-50 border border-black/5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-black tracking-tight">Channel & Media Configuration</h2>
          <p className="text-xs text-black/40 font-bold uppercase tracking-wider mt-0.5">
            Select automated destination accounts and optimal visual formatting
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Platform Toggles */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-black/50">
            Publishing Destinations
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {/* LinkedIn Toggle */}
            <button
              type="button"
              id="btn-select-platform-linkedin"
              onClick={() => togglePlatform('linkedin')}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left ${
                selectedPlatforms.includes('linkedin')
                  ? 'bg-black text-white border-black shadow-xs'
                  : 'bg-white text-black/60 border-black/5 hover:border-black/20 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Linkedin className="w-4 h-4" />
                <div>
                  <div className="text-xs font-bold">LinkedIn</div>
                  <div className={`text-[10px] ${selectedPlatforms.includes('linkedin') ? 'text-white/60' : 'text-black/40'}`}>
                    UGC Post API v2
                  </div>
                </div>
              </div>
              <div
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border ${
                  selectedPlatforms.includes('linkedin') ? 'border-white bg-white text-black' : 'border-black/20'
                }`}
              >
                {selectedPlatforms.includes('linkedin') && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
              </div>
            </button>

            {/* Instagram Toggle */}
            <button
              type="button"
              id="btn-select-platform-instagram"
              onClick={() => togglePlatform('instagram')}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left ${
                selectedPlatforms.includes('instagram')
                  ? 'bg-black text-white border-black shadow-xs'
                  : 'bg-white text-black/60 border-black/5 hover:border-black/20 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4" />
                <div>
                  <div className="text-xs font-bold">Instagram</div>
                  <div className={`text-[10px] ${selectedPlatforms.includes('instagram') ? 'text-white/60' : 'text-black/40'}`}>
                    Graph API v19.0
                  </div>
                </div>
              </div>
              <div
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border ${
                  selectedPlatforms.includes('instagram') ? 'border-white bg-white text-black' : 'border-black/20'
                }`}
              >
                {selectedPlatforms.includes('instagram') && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
              </div>
            </button>
          </div>
        </div>

        {/* Media Type & Aspect Ratio */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-black/50">
            Media Format & Aspect Ratio
          </label>
          <div className="flex items-center gap-2">
            {aspectRatios.map((ratio) => (
              <button
                key={ratio.value}
                type="button"
                onClick={() => onChangeAspectRatio(ratio.value)}
                className={`flex-1 py-2.5 px-2 rounded-2xl border text-center transition-all ${
                  aspectRatio === ratio.value
                    ? 'bg-black text-white border-black font-bold'
                    : 'bg-white text-black/70 border-black/5 hover:border-black/20 text-xs font-semibold'
                }`}
              >
                <div className="text-xs">{ratio.value}</div>
                <div className={`text-[9px] truncate ${aspectRatio === ratio.value ? 'text-white/70' : 'text-black/40'}`}>
                  {ratio.label.split(' ')[0]}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
