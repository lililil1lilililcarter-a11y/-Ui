
import React, { useState } from 'react';
import { generateDeepStrategy } from '../services/geminiService';

const DeepStrategyLab: React.FC = () => {
  const [context, setContext] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReason = async () => {
    if (!context) return;
    setLoading(true);
    try {
      const res = await generateDeepStrategy("Global Brand Expansion", context);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl p-10 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
      
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-ping"></div>
            <span className="text-xs font-black text-purple-600 uppercase tracking-widest">GEMINI 3 PRO LAB</span>
          </div>
          <h3 className="text-4xl font-black text-slate-900 tracking-tighter">Recursive <br/> Strategy Engine</h3>
          <p className="text-slate-500 leading-relaxed font-medium">
            Deploy Google's most advanced reasoning model to solve complex multi-stage marketing problems. 32k thinking tokens dedicated to your moat.
          </p>
          
          <textarea 
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Input market variables, competitor data, or growth blockers..."
            className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 h-48 focus:ring-4 focus:ring-purple-100 outline-none transition-all placeholder:text-slate-400 font-medium"
          />
          
          <button 
            onClick={handleReason}
            disabled={loading}
            className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Initializing Neural Chain...
              </>
            ) : (
              'Initiate Deep Reasoning'
            )}
          </button>
        </div>

        <div className="flex-1 w-full bg-slate-50 rounded-[2rem] border border-slate-200 p-8 min-h-[400px] flex flex-col relative">
           {result ? (
             <div className="prose prose-slate max-w-none animate-in fade-in duration-700">
                <h4 className="text-purple-600 font-black text-sm uppercase tracking-widest mb-6 border-b border-purple-100 pb-2">Strategic Output</h4>
                <div className="text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">
                  {result}
                </div>
             </div>
           ) : (
             <div className="flex-grow flex flex-col items-center justify-center text-center opacity-40">
                <svg className="w-16 h-16 text-slate-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="text-slate-400 font-bold max-w-[200px]">Waiting for reasoning cycle to begin</p>
             </div>
           )}
           {loading && (
             <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] rounded-[2rem] flex flex-col items-center justify-center space-y-4">
                <div className="flex gap-2">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-4 h-4 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: `${i*0.1}s`}}></div>
                  ))}
                </div>
                <p className="text-purple-600 font-black text-xs uppercase tracking-widest">Thinking...</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default DeepStrategyLab;
