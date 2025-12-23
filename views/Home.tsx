
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

const Home: React.FC = () => {
  return (
    <div className="space-y-32 pb-40">
      <MarketingChat />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 bg-white">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[1000px] h-[1000px] bg-indigo-50/50 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-50/50 rounded-full blur-3xl opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full text-[11px] font-black tracking-[0.2em] mb-12 uppercase">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Neural Ops Center v5.0
            </div>
            <h1 className="text-7xl md:text-[9rem] font-black text-slate-900 tracking-tighter leading-[0.8] mb-12">
              The AI Moat <br/>
              <span className="gradient-text">Generator</span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-500 leading-tight mb-16 max-w-4xl mx-auto font-medium">
              Experience the world's most advanced LLMs. From **Veo 3.1** cinematic video to **Gemini 3 Pro** deep reasoning cycles.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <button className="px-12 py-6 bg-slate-900 text-white font-black rounded-[2rem] hover:scale-105 transition-all shadow-3xl shadow-indigo-200 text-xl">
                Initiate Command
              </button>
              <button className="px-12 py-6 bg-white text-slate-900 font-black rounded-[2rem] border-2 border-slate-100 hover:border-indigo-300 transition-all text-xl">
                Read Intelligence
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cutting Edge: Deep Strategy Lab */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DeepStrategyLab />
      </section>

      {/* Live Consultant Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LiveConsultant />
      </section>

      {/* Cutting Edge: Video Architect */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          <div className="lg:col-span-3">
             <VideoAdArchitect />
          </div>
          <div className="lg:col-span-2 space-y-8">
             <div className="w-16 h-16 bg-indigo-100 rounded-3xl flex items-center justify-center text-indigo-600">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
               </svg>
             </div>
             <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Veo 3.1 <br/> Cinematic Engine</h2>
             <p className="text-xl text-slate-500 leading-relaxed font-medium">
               Generate professional 1080p marketing videos in seconds. Veo understands cinematic language, lighting, and texture to render assets that were previously only possible with a million-dollar production budget.
             </p>
             <div className="flex gap-4">
               {['8K Upscaling', 'Neural Lighting', 'Motion Control'].map(tag => (
                 <span key={tag} className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-black rounded-lg border border-slate-200 uppercase">{tag}</span>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Strategy and Creative - Grid Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <StrategyGenerator />
          <div className="space-y-16">
            <VisualAdGenerator />
            <div className="bg-slate-900 rounded-[3rem] p-12 text-white overflow-hidden relative border border-white/5 shadow-3xl">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"/></svg>
               </div>
               <h4 className="text-2xl font-black mb-6">Autonomous Ops</h4>
               <p className="text-slate-400 text-lg leading-relaxed mb-10">
                 MarketMaster Pro 5.0 is an end-to-end intelligence cycle. It doesn't just suggest—it builds the visual and strategic infrastructure of your brand.
               </p>
               <div className="space-y-4">
                  {[
                    'Dynamic Multi-Agent Orchestration',
                    'Zero-Latency Trend Realignment',
                    'Psychometric Funnel Hardening'
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm font-black text-indigo-400">
                       <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">{i+1}</div>
                       {t}
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">Neural Predictive Modeling</h2>
          <p className="text-slate-500 text-xl font-medium">Real-time simulation of high-frequency market shifts.</p>
        </div>
        <MetricsDashboard />
      </section>

      {/* Creative Audit Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
             <CreativeAudit />
          </div>
          <div className="order-1 lg:order-2 space-y-10">
             <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">Expert-Level <br/> Concept Validation</h2>
             <p className="text-2xl text-slate-500 leading-relaxed font-medium">
               Our models analyze visual concepts through the lens of a world-class creative director, identifying conversion inhibitors and emotional resonance score.
             </p>
             <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Neural Flow", val: "Optimized" },
                  { label: "Brand Cohesion", val: "High" },
                  { label: "CTA Gravity", val: "8.4/10" },
                  { label: "Market Fit", val: "92%" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.label}</div>
                    <div className="text-2xl font-black text-slate-900">{stat.val}</div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Trend Spotter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrendSpotter />
      </section>

      {/* Featured Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-20">
          <div>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">Strategic Archives</h2>
            <p className="text-slate-500 text-xl font-medium">Internal teardowns of winning market moats.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {[
            {
              title: "The Zero-Click Content Revolution",
              excerpt: "Why social algorithms are prioritizing native consumption over external links.",
              category: "Growth",
              img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
              author: "Elena Vance"
            },
            {
              title: "Psychological Triggers in B2B SaaS",
              excerpt: "A deep dive into 12 cognitive biases that drive enterprise conversion rates.",
              category: "SaaS",
              img: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800",
              author: "Mark S. Pro"
            },
            {
              title: "AI-Native Marketing Operations",
              excerpt: "How to restructure your marketing team for a world of AI agents.",
              category: "AI",
              img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
              author: "Jordan Smith"
            }
          ].map((post, i) => (
            <article key={i} className="group cursor-pointer">
              <div className="overflow-hidden rounded-[3rem] mb-10 aspect-video bg-slate-100 relative shadow-2xl transition-transform group-hover:-translate-y-2">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000"
                />
                <span className="absolute top-8 left-8 bg-white/95 backdrop-blur-md px-5 py-2 rounded-2xl text-[10px] font-black text-slate-900 shadow-xl border border-white/20 uppercase tracking-widest">
                  {post.category}
                </span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-slate-500 mb-10 line-clamp-2 text-lg leading-relaxed font-medium">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-5 border-t border-slate-100 pt-8">
                <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-slate-50 shadow-inner"></div>
                <div>
                  <div className="text-lg font-black text-slate-900">{post.author}</div>
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Strategic Lead</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[4rem] p-16 md:p-32 flex flex-col lg:flex-row items-center gap-20 overflow-hidden relative shadow-3xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.1),transparent_50%)]"></div>
          <div className="flex-1 text-center lg:text-left relative z-10">
            <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.8]">Build <br/> Your Moat.</h2>
            <p className="text-slate-400 text-2xl font-medium max-w-sm">Join 50k+ elite marketers receiving weekly strategic AI teardowns.</p>
          </div>
          <div className="flex-1 w-full max-w-2xl relative z-10">
            <div className="bg-white/5 backdrop-blur-3xl p-3 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter work email" 
                  className="flex-grow px-10 py-6 rounded-3xl outline-none text-white bg-transparent font-bold text-lg border border-white/10 focus:border-indigo-500 transition-all"
                />
                <button className="bg-white text-slate-900 px-12 py-6 rounded-3xl font-black hover:bg-indigo-50 transition-all text-xl shadow-xl">
                  Initiate
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
