
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: '🏠' },
    { name: 'Marketplace', path: '/store', icon: '🛒' },
    { name: 'AGI Copilot', path: '/copilot', icon: '🧠' },
    { name: 'Security Lab', path: '/lab', icon: '🛡️' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f2f0] text-[#0a0c0a] selection:bg-[#c0ff00] selection:text-black">
      {/* High-end Navigation */}
      <header className="sticky top-0 z-50 bg-[#0a0c0a]/95 backdrop-blur-md border-b border-white/10 text-white">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#c0ff00] rounded-xl flex items-center justify-center text-black font-black text-xl group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(192,255,0,0.3)]">
              W
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter leading-none">AI WEALTH <span className="text-[#c0ff00]">LAB</span></span>
              <span className="text-[8px] font-bold uppercase tracking-[0.3em] opacity-50">Ecosystem v6.4.2</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`text-xs font-black uppercase tracking-widest transition-all hover:text-[#c0ff00] ${location.pathname === link.path ? 'text-[#c0ff00]' : 'text-white/60'}`}
              >
                {link.name}
              </Link>
            ))}
            <button className="px-6 py-3 bg-[#c0ff00] text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#c0ff00]/10">
              Go Pro
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16m-7 6h7"/></svg>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl p-8 flex flex-col justify-center gap-8 animate-in fade-in duration-300">
          <button className="absolute top-8 right-8 text-white" onClick={() => setIsMenuOpen(false)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              onClick={() => setIsMenuOpen(false)}
              className="text-4xl font-black text-white uppercase tracking-tighter hover:text-[#c0ff00]"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-[#0a0c0a] text-white/40 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6 text-white font-black text-2xl">
                <div className="w-8 h-8 bg-[#c0ff00] rounded text-black flex items-center justify-center">W</div>
                Wealth Lab
              </div>
              <p className="max-w-xs leading-relaxed text-sm font-medium">
                The multi-trillion page autonomous marketplace ecosystem. Built for professional growth hackers.
              </p>
            </div>
            <div>
              <h4 className="text-white font-black mb-6 uppercase text-[10px] tracking-widest">Protocol</h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
                <li><a href="#" className="hover:text-[#c0ff00]">Market Layers</a></li>
                <li><a href="#" className="hover:text-[#c0ff00]">Security Audits</a></li>
                <li><a href="#" className="hover:text-[#c0ff00]">Neural Strategy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black mb-6 uppercase text-[10px] tracking-widest">Compliance</h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
                <li><a href="#" className="hover:text-[#c0ff00]">AGI Safety</a></li>
                <li><a href="#" className="hover:text-[#c0ff00]">Data Ethics</a></li>
                <li><a href="#" className="hover:text-[#c0ff00]">Legal Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
            <p>© 2025 AI Wealth Lab. Synchronized with Neural Network.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-[#c0ff00]">X / Twitter</a>
              <a href="#" className="hover:text-[#c0ff00]">Github Lab</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
