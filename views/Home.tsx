
import React from 'react';
import { useAIAssets } from '../index';
import StrategyGenerator from '../components/StrategyGenerator';
import TrendSpotter from '../components/TrendSpotter';
import MetricsDashboard from '../components/MetricsDashboard';
import CreativeAudit from '../components/CreativeAudit';
import MarketingChat from '../components/MarketingChat';
import VideoAdArchitect from '../components/VideoAdArchitect';
import LiveConsultant from '../components/LiveConsultant';
import DeepStrategyLab from '../components/DeepStrategyLab';
import MultiAgentWarRoom from '../components/MultiAgentWarRoom';
import GazeAnalyzer from '../components/GazeAnalyzer';

const Home: React.FC = () => {
  const { products, blogs, quotaExceeded } = useAIAssets();

  return (
    <div className="space-y-32 pb-40">
      <MarketingChat />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 px-6 overflow-hidden bg-[#0a0c0a] text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#c0ff00] rounded-full blur-[200px] opacity-10 -mr-96 -mt-96 animate-pulse"></div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {quotaExceeded && (
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-red-600/20 border border-red-600/30 rounded-full mb-12 text-red-500 animate-pulse">
              <span className="text-[10px] font-black tracking-widest uppercase">System Overloaded: Quota Recovery in Progress</span>
            </div>
          )}
          
          <h1 className="text-8xl md:text-[12rem] font-black leading-[0.8] tracking-tighter mb-16">
            NEURAL <br/><span className="text-[#c0ff00]">STRATEGY</span>
          </h1>
          <p className="text-2xl md:text-4xl text-white/50 max-w-4xl mx-auto mb-20 font-light leading-tight">
            The world's first multi-agent autonomous marketing factory. Generate assets, audit creatives, and simulate conflicts in real-time.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8">
            <button className="px-12 py-6 bg-[#c0ff00] text-black font-black rounded-3xl hover:scale-105 transition-all shadow-[0_0_50px_rgba(192,255,0,0.2)] text-xl">
              LAUNCH WAR ROOM
            </button>
            <button className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black rounded-3xl hover:bg-white/10 transition-all text-xl">
              EXPLORE LAYERS
            </button>
          </div>
        </div>
      </section>

      {/* Featured Marketplace Assets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-6xl font-black text-[#0a0c0a] tracking-tighter mb-4 uppercase">New Assets</h2>
            <p className="text-[#0a0c0a]/40 font-bold uppercase tracking-widest text-sm">Autonomous generations from Layer 1-8</p>
          </div>
          <button className="text-[10px] font-black uppercase tracking-widest border-b-2 border-[#c0ff00] pb-1">View Full Marketplace</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {products.slice(0, 4).map(p => (
            <div key={p.id} className="group cursor-pointer">
              <div className="aspect-[4/5] bg-white rounded-[3rem] mb-6 overflow-hidden relative border border-black/5 transition-all group-hover:shadow-2xl group-hover:-translate-y-2">
                <img src={p.image} className="w-full h-full object-cover transition-all duration-700" alt={p.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="px-4 py-2 bg-[#c0ff00] text-black text-[10px] font-black rounded-full uppercase">Details</span>
                   <a 
                     href="https://buy.stripe.com/test_eVq5kCfUW55C0LXduf4ZG00" 
                     target="_blank" 
                     className="w-12 h-12 bg-black text-[#c0ff00] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                   >
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                   </a>
                </div>
              </div>
              <h3 className="text-2xl font-black uppercase mb-1 truncate">{p.title}</h3>
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold text-black/40 uppercase tracking-widest">{p.category}</p>
                <p className="text-xl font-black text-black">${p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strategy Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StrategyGenerator />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MultiAgentWarRoom />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <CreativeAudit />
          <GazeAnalyzer />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <VideoAdArchitect />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DeepStrategyLab />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LiveConsultant />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrendSpotter />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <h2 className="text-6xl font-black text-[#0a0c0a] tracking-tighter mb-4 uppercase">Insights</h2>
          <p className="text-[#0a0c0a]/40 text-2xl font-medium tracking-tight">Real-time performance across the ecosystem.</p>
        </div>
        <MetricsDashboard />
      </section>

      {/* Autonomous Blogs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {blogs.map(b => (
            <article key={b.id} className="p-10 bg-white border border-black/5 rounded-[3rem] hover:shadow-2xl transition-all cursor-pointer">
              <span className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-6 block">{b.category}</span>
              <h3 className="text-4xl font-black uppercase mb-6 tracking-tighter">{b.title}</h3>
              <p className="text-xl text-black/50 leading-relaxed mb-8">{b.excerpt}</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#c0ff00] rounded-full flex items-center justify-center font-black text-xs uppercase">A</div>
                <div className="text-[10px] font-black uppercase tracking-widest">{b.authorAgent}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
