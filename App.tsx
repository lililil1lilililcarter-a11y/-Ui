
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './views/Home';
import StrategyGenerator from './components/StrategyGenerator';

// Lazy load or component place-holders
const MarketplaceView = () => (
  <div className="pt-20 text-center py-40">
    <h1 className="text-6xl font-black uppercase">Marketplace</h1>
    <p className="text-black/40">Full catalog indexing in progress...</p>
  </div>
);

const CopilotView = () => (
  <div className="pt-20 text-center py-40">
    <h1 className="text-6xl font-black uppercase">AGI Copilot</h1>
    <p className="text-black/40">Neural handshake required. Switch to dashboard to begin.</p>
  </div>
);

const LabView = () => (
  <div className="pt-20 text-center py-40 bg-black text-white min-h-screen">
    <h1 className="text-6xl font-black uppercase text-[#c0ff00]">Security Lab</h1>
    <p className="text-white/40 mt-4">Restricted access protocol. Professionals only.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<MarketplaceView />} />
          <Route path="/copilot" element={<CopilotView />} />
          <Route path="/lab" element={<LabView />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
