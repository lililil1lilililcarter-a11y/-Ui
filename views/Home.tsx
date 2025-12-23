
import React from 'react';
import StrategyGenerator from '../components/StrategyGenerator';
import TrendSpotter from '../components/TrendSpotter';
import MetricsDashboard from '../components/MetricsDashboard';

const Home: React.FC = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 bg-white">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-50 rounded-full blur-3xl opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold tracking-wide mb-6">
              AI-POWERED STRATEGIC BLOG
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
              Engineer Your Next <span className="gradient-text">Viral Growth Cycle</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              Master the art of high-impact marketing with our advanced strategic frameworks, data visualizations, and real-time AI campaign generation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                Explore Frameworks
              </button>
              <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl border-2 border-indigo-100 hover:border-indigo-300 transition-all">
                Try AI Generator
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Metrics Visualizations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Strategic Insights</h2>
          <p className="text-slate-500">Deep dive into data-backed marketing effectiveness.</p>
        </div>
        <MetricsDashboard />
      </section>

      {/* Featured Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Latest Strategies</h2>
            <p className="text-slate-500">Expert analysis on the evolving marketing landscape.</p>
          </div>
          <button className="text-indigo-600 font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
            View All <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "The Zero-Click Content Revolution",
              excerpt: "Why social algorithms are prioritizing native consumption over external links, and how to adapt your funnel.",
              category: "Growth",
              img: "https://picsum.photos/seed/mkt1/800/600",
              author: "Elena Vance",
              date: "Nov 12, 2024"
            },
            {
              title: "Psychological Triggers in B2B SaaS",
              excerpt: "A deep dive into 12 cognitive biases that drive enterprise conversion rates and long-term retention.",
              category: "SaaS",
              img: "https://picsum.photos/seed/mkt2/800/600",
              author: "Mark S. Pro",
              date: "Nov 10, 2024"
            },
            {
              title: "AI-Native Marketing Operations",
              excerpt: "How to restructure your marketing team for a world where AI agents handle execution and humans focus on vision.",
              category: "AI",
              img: "https://picsum.photos/seed/mkt3/800/600",
              author: "Jordan Smith",
              date: "Nov 08, 2024"
            }
          ].map((post, i) => (
            <article key={i} className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl mb-6 aspect-video bg-slate-100 relative">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indigo-600 shadow-sm">
                  {post.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-600 mb-6 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                <div>
                  <div className="text-sm font-bold text-slate-800">{post.author}</div>
                  <div className="text-xs text-slate-400">{post.date}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* AI Strategy Tool Section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StrategyGenerator />
        </div>
      </section>

      {/* Trend Spotter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrendSpotter />
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-indigo-600 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
          <div className="flex-1 text-center md:text-left relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stay Ahead of the Curve</h2>
            <p className="text-indigo-100 text-lg">Join 50,000+ marketers receiving weekly strategic teardowns and AI prompts.</p>
          </div>
          <div className="flex-1 w-full max-w-md relative z-10">
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-6 py-4 rounded-xl outline-none text-slate-900 shadow-xl"
              />
              <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl">
                Join
              </button>
            </form>
            <p className="text-indigo-200 text-xs mt-4 opacity-80">No spam. Only high-signal strategies. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
