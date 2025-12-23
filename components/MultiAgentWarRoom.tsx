
import React, { useState } from 'react';
import { conductAgentDebate } from '../services/geminiService';

const MultiAgentWarRoom: React.FC = () => {
  const [brand, setBrand] = useState('');
  const [goal, setGoal] = useState('');
  const [debate, setDebate] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const startDebate = async () => {
    if (!brand || !goal) return;
    setLoading(true);
    try {
      const results = await conductAgentDebate(brand, goal);
      setDebate(results);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black rounded-[3rem] p-12 text-white overflow-hidden relative border border-indigo-500/20 shadow-3xl">
      <div className="absolute top-0 right-0 p-12 opacity-10">
        <svg className="w-32 h-32 animate-spin-slow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"/>
        </svg>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <span className="px-4 py-2 bg-indigo-500/10 text-indigo-400 text-[10px] font-black tracking-widest uppercase border border-indigo-500/30 rounded-full">
            Autonomous War Room
          </span>
          <h2 className="text-5xl font-black tracking-tighter leading-none">
            Agentic <br/> <span className="text-indigo-500">Conflict Engine</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-sm font-medium">
            Simulate a high-stakes meeting between 3 specialized AI personas to stress-test your strategy.
          </p>
          
          <div className="space-y-4">
            <input 
              type="text" value={brand} onChange={e => setBrand(e.target.value)}
              placeholder="Brand Name" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
            />
            <input 
              type="text" value={goal} onChange={e => setGoal(e.target.value)}
              placeholder="Campaign Goal" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
            />
            <button 
              onClick={startDebate} disabled={loading}
              className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? 'Simulating Conflict...' : 'Initialize Debate'}
            </button>
          </div>
        </div>

        <div className="bg-white/5 rounded-[2rem] border border-white/10 p-8 min-h-[500px] flex flex-col relative font-mono text-sm">
          {debate.length > 0 ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              {debate.map((msg, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${i===0?'bg-green-500':i===1?'bg-purple-500':'bg-yellow-500'}`}></span>
                    <span className="font-black text-indigo-400 uppercase tracking-tighter">[{msg.agent}]</span>
                  </div>
                  <div className="text-slate-300 leading-relaxed border-l border-white/10 pl-4 italic">
                    {msg.stance}
                  </div>
                  <ul className="space-y-1 pl-4">
                    {msg.points.map((p: string, pi: number) => (
                      <li key={pi} className="text-slate-500">• {p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center opacity-20 text-center">
              <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <p className="font-bold text-lg">System Idle</p>
              <p className="text-xs max-w-[200px] mx-auto">Waiting for strategic parameters to begin autonomous deliberation</p>
            </div>
          )}
          {loading && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center space-y-4">
              <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[10px] font-black tracking-widest uppercase animate-pulse">Neural Handshake Active</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiAgentWarRoom;
