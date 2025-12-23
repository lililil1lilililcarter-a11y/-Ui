
import React, { useState } from 'react';
import { auditCreativeConcept } from '../services/geminiService';

const CreativeAudit: React.FC = () => {
  const [concept, setConcept] = useState('');
  const [critique, setCritique] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAudit = async () => {
    if (!concept) return;
    setLoading(true);
    try {
      const res = await auditCreativeConcept(concept);
      setCritique(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          Creative Vision Audit
        </h3>
        
        <p className="text-slate-400 mb-8 max-w-lg">
          Describe your ad visual or copy concept. Our AI Creative Director will evaluate it for psychological impact and conversion optimization.
        </p>

        <div className="space-y-4">
          <textarea
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            className="w-full bg-slate-800/50 border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none h-32 placeholder:text-slate-600"
            placeholder="Describe your creative idea... e.g. 'A high-contrast photo of a runner in a neon city, text: ESCAPE THE NOISE, button is glowing orange...'"
          />
          <button
            onClick={handleAudit}
            disabled={loading}
            className="px-8 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-indigo-50 transition-all disabled:opacity-50"
          >
            {loading ? 'Analyzing Impact...' : 'Run Audit'}
          </button>
        </div>

        {critique && (
          <div className="mt-8 p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-500">
            <h4 className="text-indigo-400 font-bold uppercase text-xs tracking-widest mb-4">Director's Notes</h4>
            <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
              {critique}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeAudit;
