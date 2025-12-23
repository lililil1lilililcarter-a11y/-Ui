
import React from 'react';
import { Link } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
              M
            </div>
            <span className="font-bold text-xl text-slate-800 tracking-tight">MarketMaster <span className="text-indigo-600 font-normal">AI</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Strategies</Link>
            <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">AI Generator</Link>
            <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">About</Link>
            <button className="px-5 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
              Subscribe
            </button>
          </div>
          <button className="md:hidden text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6 text-white font-bold text-2xl">
                <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">M</div>
                MarketMaster AI
              </div>
              <p className="max-w-xs leading-relaxed">
                Empowering modern marketers with AI-driven strategy generation and real-time market insights. Stay ahead of the curve.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6 uppercase text-sm tracking-wider">Resources</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-white transition-colors">Strategic Frameworks</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Tools</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6 uppercase text-sm tracking-wider">Legal</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© 2024 MarketMaster AI. Built with Gemini 3.0.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
