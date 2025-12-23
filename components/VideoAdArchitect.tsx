
import React, { useState } from 'react';
import { generateVideoAd } from '../services/geminiService';
import PremiumFeatureGuard from './PremiumFeatureGuard';

const VideoAdArchitect: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'generating' | 'error'>('idle');

  const handleGenerate = async () => {
    if (!prompt) return;
    setStatus('generating');
    try {
      const url = await generateVideoAd(prompt);
      if (url) {
        setVideoUrl(url);
        setStatus('idle');
      } else {
        setStatus('error');
      }
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  return (
    <PremiumFeatureGuard 
      title="Veo Video Architect" 
      description="Access Google's most advanced video generation model to create cinematic 1080p marketing clips."
    >
      <div className="bg-slate-900 border border-white/5 rounded-3xl p-8 overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-600/5 to-transparent pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/30">
              VEV-3.1 ENGINE
            </span>
          </div>
          <h3 className="text-3xl font-black text-white mb-6">Cinematic Video Ads</h3>
          
          <div className="flex gap-2 mb-8">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A neon-lit cyber-drone delivering a package through a rainy city skyline..."
              className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
            />
            <button 
              onClick={handleGenerate}
              disabled={status === 'generating'}
              className="px-8 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-indigo-50 disabled:opacity-50 transition-all"
            >
              {status === 'generating' ? 'Rendering...' : 'Generate 1080p'}
            </button>
          </div>

          <div className="aspect-video bg-black/40 rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden relative">
            {videoUrl ? (
              <video 
                src={videoUrl} 
                controls 
                autoPlay 
                loop 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-12">
                {status === 'generating' ? (
                  <div className="space-y-6">
                    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <div className="space-y-2">
                      <p className="text-white font-bold text-lg animate-pulse">Consulting Veo Neural Engine...</p>
                      <p className="text-slate-500 text-sm">This typically takes 45-90 seconds. We're polishing every frame.</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-600">
                       <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                       </svg>
                    </div>
                    <p className="text-slate-500 font-bold">Describe a cinematic scene to generate your first video asset</p>
                  </>
                )}
              </div>
            )}
            {status === 'error' && (
              <p className="text-red-400 absolute bottom-4">Generation failed. Ensure your API key has billing enabled.</p>
            )}
          </div>
        </div>
      </div>
    </PremiumFeatureGuard>
  );
};

export default VideoAdArchitect;
