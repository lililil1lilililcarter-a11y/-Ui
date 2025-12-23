
import React, { useState } from 'react';
import { generateMarketingStrategy } from '../services/geminiService';
import { MarketingStrategy } from '../types';

const StrategyGenerator: React.FC = () => {
  const [brand, setBrand] = useState('');
  const [desc, setDesc] = useState('');
  const [result, setResult] = useState<MarketingStrategy | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand || !desc) return;
    
    setLoading(true);
    setError('');
    try {
      const data = await generateMarketingStrategy(brand, desc);
      setResult(data);
    } catch (err) {
      setError('Failed to generate strategy. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">AI Campaign Architect</h3>
        <p className="text-slate-500 mb-8">Describe your brand or product, and our AI will architect a custom marketing strategy blueprint for you.</p>

        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Brand Name</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. EcoSpark"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Campaign Goal</label>
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                <option>Brand Awareness</option>
                <option>Lead Generation</option>
                <option>Product Launch</option>
                <option>Customer Retention</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Product/Service Description</label>
            <textarea
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Tell us what you do and what makes you unique..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-primary text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Architecting Strategy...
              </>
            ) : (
              'Generate Strategic Blueprint'
            )}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {result && (
          <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="border-t border-slate-100 pt-8">
              <h4 className="text-xl font-bold text-slate-900 mb-4">Strategic Overview</h4>
              <p className="text-slate-600 leading-relaxed bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                {result.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h5 className="font-bold text-indigo-600 mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3.005 3.005 0 013.75-2.906z" />
                  </svg>
                  Target Audience
                </h5>
                <ul className="space-y-2">
                  {result.targetAudience.map((item, i) => (
                    <li key={i} className="flex gap-2 text-slate-600 text-sm">
                      <span className="text-indigo-400">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-indigo-600 mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Primary Channels
                </h5>
                <div className="flex flex-wrap gap-2">
                  {result.keyChannels.map((item, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl shadow-indigo-100">
              <h5 className="font-bold text-lg mb-4 text-indigo-300">Content Hooks & KPIs</h5>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2 block">Creative Angles</span>
                    <ul className="space-y-2">
                      {result.contentIdeas.map((idea, i) => (
                        <li key={i} className="text-sm italic text-slate-200">"{idea}"</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2 block">Success Metrics</span>
                    <div className="grid grid-cols-2 gap-2">
                      {result.metricKPIs.map((kpi, i) => (
                        <div key={i} className="bg-white/10 p-2 rounded text-xs font-mono">
                          {kpi}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StrategyGenerator;
