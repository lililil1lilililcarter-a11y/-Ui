
import React, { useState } from 'react';
import { fetchLocalCompetitors } from '../services/geminiService';

const LocalIntelligence: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('Coffee Shops');
  const [data, setData] = useState<{text: string, sources: any[]} | null>(null);
  const [error, setError] = useState('');

  const handleFetch = () => {
    setLoading(true);
    setError('');
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const result = await fetchLocalCompetitors(pos.coords.latitude, pos.coords.longitude, category);
          setData(result);
        } catch (err) {
          setError('Failed to fetch local data. Check permissions.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setLoading(false);
        if (err.code === 1) {
          setError('Location access denied. Please enable geolocation in settings.');
        } else {
          setError('Unable to retrieve location.');
        }
      }
    );
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
        <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest border border-green-100 rounded-full">
              Maps Grounding
            </span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Hyper-Local <br/> Market Intelligence</h2>
          <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
            Analyze your physical territory. We use Google Maps data to map competitors and identify underserved niches in your area.
          </p>

          <div className="space-y-4">
            <input 
              type="text" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Industry category (e.g. Italian Restaurants)"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-green-500 transition-all font-bold"
            />
            <button 
              onClick={handleFetch}
              disabled={loading}
              className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? 'Surveying Area...' : 'Generate Local Analysis'}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm font-bold animate-in slide-in-from-left-2">
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              {error}
            </div>
          )}
        </div>

        <div className="flex-[1.5] w-full bg-slate-50 rounded-[2rem] border border-slate-200 p-8 min-h-[400px] flex flex-col">
          {data ? (
            <div className="space-y-8 animate-in fade-in duration-700">
              <div className="prose prose-slate max-w-none">
                <h4 className="text-green-600 font-black text-sm uppercase tracking-widest mb-4 border-b border-green-100 pb-2">Territory Teardown</h4>
                <div className="text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
                  {data.text}
                </div>
              </div>
              
              {data.sources.length > 0 && (
                <div className="pt-6 border-t border-slate-200">
                  <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Location Reference Signals</h5>
                  <div className="flex flex-wrap gap-3">
                    {data.sources.filter(c => c.maps).map((chunk: any, i: number) => (
                      <a 
                        key={i} 
                        href={chunk.maps.uri} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:border-green-300 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
                        {chunk.maps.title || 'Location Detail'}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center opacity-30">
               <svg className="w-16 h-16 text-slate-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
               </svg>
               <p className="text-slate-500 font-bold max-w-[200px]">Waiting for location trigger</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocalIntelligence;
