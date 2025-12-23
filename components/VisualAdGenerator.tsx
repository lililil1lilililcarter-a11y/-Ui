import React, { useState } from 'react';
// Fix: Renamed generateAdImage to generate4KAdImage as exported in geminiService
import { generate4KAdImage } from '../services/geminiService';
import PremiumFeatureGuard from './PremiumFeatureGuard';

const VisualAdGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      // Fix: Renamed generateAdImage to generate4KAdImage
      const url = await generate4KAdImage(prompt);
      if (url) setImageUrl(url);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Added PremiumFeatureGuard for gemini-3-pro-image-preview which requires paid key selection
    <PremiumFeatureGuard 
      title="AI Creative Studio" 
      description="Access Gemini 3 Pro Image generation for high-fidelity, high-resolution marketing visuals. This feature requires a paid API key."
    >
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl overflow-hidden group">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">AI Creative Studio</h3>
            <p className="text-slate-500 text-sm">Convert your strategy into high-fidelity ad visuals.</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A luxury watch on a dark stone background with soft lighting..."
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all pr-32"
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 px-6 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-all text-sm"
            >
              {loading ? 'Rendering...' : 'Generate'}
            </button>
          </div>

          <div className="aspect-video bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden relative group">
            {imageUrl ? (
              <>
                <img src={imageUrl} alt="Generated Ad" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <button className="px-4 py-2 bg-white rounded-lg font-bold text-sm shadow-xl" onClick={() => imageUrl && window.open(imageUrl)}>Download 4K</button>
                </div>
              </>
            ) : (
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-slate-400 font-medium">Your creative preview will appear here</p>
              </div>
            )}
            {loading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-indigo-600 font-bold animate-pulse">Consulting Creative Engine...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PremiumFeatureGuard>
  );
};

export default VisualAdGenerator;