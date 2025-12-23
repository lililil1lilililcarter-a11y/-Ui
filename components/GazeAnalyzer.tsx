
import React, { useState, useRef } from 'react';
import { simulateGazeHeatmap } from '../services/geminiService';

const GazeAnalyzer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [preview, setPreview] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const runAnalysis = async () => {
    if (!preview) return;
    setLoading(true);
    try {
      const base64 = preview.split(',')[1];
      const res = await simulateGazeHeatmap(base64, 'image/jpeg');
      setAnalysis(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-10 shadow-3xl border border-slate-100 group">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-6">
          <h3 className="text-3xl font-black tracking-tighter">Neural Gaze <br/> Simulation</h3>
          <p className="text-slate-500 font-medium leading-relaxed">
            Predict high-conversion focal points using spatial vision LLMs. Stop guessing where users look.
          </p>
          
          <div className="relative">
            <input type="file" onChange={handleUpload} className="hidden" id="gaze-upload" accept="image/*" />
            <label htmlFor="gaze-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-200 rounded-[2rem] cursor-pointer hover:bg-slate-50 transition-all bg-slate-50/30">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover rounded-[2rem]" />
              ) : (
                <div className="text-center">
                  <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-slate-400 font-bold">Upload Asset</p>
                </div>
              )}
            </label>
          </div>
          
          <button 
            onClick={runAnalysis} disabled={!preview || loading}
            className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Calculating Entropy...' : 'Predict Gaze Flow'}
          </button>
        </div>

        <div className="flex-1 bg-slate-900 rounded-[2rem] p-8 text-indigo-400 font-mono text-sm min-h-[300px] flex flex-col">
          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
             <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
             <span className="uppercase text-[10px] font-black tracking-widest">Vision Output</span>
          </div>
          {analysis ? (
            <div className="text-slate-300 whitespace-pre-wrap animate-in fade-in duration-1000">
              {analysis}
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center opacity-30 italic text-center text-slate-500 px-8">
               Waiting for pixel data to determine ocular focus trajectory...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GazeAnalyzer;
