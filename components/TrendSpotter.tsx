
import React, { useEffect, useState } from 'react';
import { fetchMarketingTrends } from '../services/geminiService';
import { Trend } from '../types';

const TrendSpotter: React.FC = () => {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMarketingTrends();
        setTrends(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        <div className="h-24 bg-slate-200 rounded"></div>
      </div>
    );
  }

  return (
    <section className="bg-indigo-900 rounded-3xl p-8 lg:p-12 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <svg className="w-64 h-64" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      </div>
      
      <div className="relative z-10 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-indigo-500/30 text-indigo-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-500/50">
            Real-Time Intelligence
          </span>
          <div className="h-px bg-indigo-500 flex-grow"></div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-8">AI Trend Spotter <span className="text-indigo-400">2025</span></h2>
        
        <div className="space-y-10">
          {trends.map((trend, i) => (
            <div key={i} className="group">
              <div className="flex items-start gap-6">
                <div className="hidden sm:flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-indigo-400 flex items-center justify-center font-bold text-xl">
                    {trend.relevanceScore}%
                  </div>
                  <div className="text-[10px] mt-1 text-indigo-300 font-bold uppercase">Impact</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-300 transition-colors">
                    {trend.topic}
                  </h3>
                  <div className="text-indigo-100/80 leading-relaxed prose prose-invert max-w-none">
                    <p>{trend.description}</p>
                  </div>
                  
                  {trend.sources.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-4">
                      <span className="text-sm text-indigo-400 font-semibold uppercase tracking-wider block w-full mb-2">Verified Sources</span>
                      {trend.sources.slice(0, 3).map((source, si) => (
                        <a 
                          key={si}
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-all text-xs"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          {source.title.length > 25 ? source.title.substring(0, 25) + '...' : source.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendSpotter;
