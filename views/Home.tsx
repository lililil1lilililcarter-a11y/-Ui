
import React from 'react';
import StrategyGenerator from '../components/StrategyGenerator';
import TrendSpotter from '../components/TrendSpotter';
import MetricsDashboard from '../components/MetricsDashboard';
import CreativeAudit from '../components/CreativeAudit';
import MarketingChat from '../components/MarketingChat';
import VisualAdGenerator from '../components/VisualAdGenerator';
import LiveConsultant from '../components/LiveConsultant';
import DeepStrategyLab from '../components/DeepStrategyLab';
import VideoAdArchitect from '../components/VideoAdArchitect';
import LocalIntelligence from '../components/LocalIntelligence';
import MultiAgentWarRoom from '../components/MultiAgentWarRoom';
import GazeAnalyzer from '../components/GazeAnalyzer';

const Home: React.FC = () => {
  return (
    <div className="space-y-32 pb-40">
      <MarketingChat />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-40 pb-32 bg-white">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[1200px] h-[1200px] bg-indigo-50/50 rounded-full blur-[120px] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full text-[10px] font-black tracking-[0.3em] mb-16 uppercase">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              Autonomous Intelligence Ops v6.0
            </div>
            <h1 className="text-8xl md:text-[11rem] font-black text-slate-900 tracking-tighter leading-[0.75] mb-16">
              Marketing <br/>
              <span className="gradient-text">Supersonic</span>
            </h1>
            <p className="text-2xl md:text-4xl text-slate-500 leading-[1.1] mb-20 max-w-4xl mx-auto font-medium tracking-tight">
              Beyond standard AI. Experience multi-agent conflict simulation, neural gaze prediction, and cinematic generation.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <button className="px-16 py-8 bg-slate-900 text-white font-black rounded-[2.5rem] hover:scale-105 transition-all shadow-4xl shadow-indigo-200 text-2xl">
                Enter War Room
              </button>
              <button className="px-16 py-8 bg-white text-slate-900 font-black rounded-[2.5rem] border-2 border-slate-100 hover:border-indigo-300 transition-all text-2xl">
                Global Pulse
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Multi-Agent War Room */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MultiAgentWarRoom />
      </section>

      {/* NEW: Neural Gaze Analyzer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GazeAnalyzer />
      </section>

      {/* Video Ad Architect */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-20 items-center">
          <div className="lg:col-span-3">
             <VideoAdArchitect />
          </div>
          <div className="lg:col-span-2 space-y-10">
             <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
               </svg>
             </div>
             <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Veo 3.1 <br/> Kinetic Media</h2>
             <p className="text-2xl text-slate-500 leading-relaxed font-medium">
               High-production value 1080p cinematic assets. We don't just generate videos; we construct brand narratives with neural lighting and physical texture simulation.
             </p>
             <div className="flex gap-4">
               {['Temporal Consistency', 'Physics Aware', '4K Rendering'].map(tag => (
                 <span key={tag} className="px-6 py-3 bg-slate-100 text-slate-900 text-[10px] font-black rounded-xl border border-slate-200 uppercase tracking-widest">{tag}</span>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Strategy Lab */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DeepStrategyLab />
      </section>

      {/* Live Consultant */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LiveConsultant />
      </section>

      {/* Metrics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-6">Neural Attribution</h2>
          <p className="text-slate-500 text-2xl font-medium tracking-tight">Visualizing campaign impact through high-frequency simulations.</p>
        </div>
        <MetricsDashboard />
      </section>

      {/* Featured Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex justify-between items-end mb-24">
          <div>
            <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-6">Strategy Vault</h2>
            <p className="text-slate-500 text-2xl font-medium">Deep intelligence on high-growth marketing moats.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {[
            {
              title: "The Zero-Click Content Revolution",
              excerpt: "How algorithms prioritize platform native consumption over link-out strategies.",
              category: "Trend",
              img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
              author: "Elena Vance"
            },
            {
              title: "Agentic Marketing Operations",
              excerpt: "Restructuring creative teams for a world where AI handles the production cycle.",
              category: "Future",
              img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
              author: "Jordan Smith"
            },
            {
              title: "Psychological Funnel Hardening",
              excerpt: "Using cognitive biases to reduce friction in the B2B conversion journey.",
              category: "Conversion",
              img: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800",
              author: "Mark S. Pro"
            }
          ].map((post, i) => (
            <article key={i} className="group cursor-pointer">
              <div className="overflow-hidden rounded-[3.5rem] mb-12 aspect-[4/3] bg-slate-100 relative shadow-4xl transition-all duration-700 group-hover:-translate-y-4">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <span className="absolute top-10 left-10 bg-white/95 backdrop-blur-xl px-6 py-3 rounded-2xl text-[10px] font-black text-slate-900 shadow-2xl uppercase tracking-widest">
                  {post.category}
                </span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-slate-500 mb-12 line-clamp-2 text-xl leading-relaxed font-medium">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-6 border-t border-slate-100 pt-10">
                <div className="w-16 h-16 rounded-full bg-slate-100 border-4 border-white shadow-inner"></div>
                <div>
                  <div className="text-xl font-black text-slate-900">{post.author}</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Strategy Director</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
