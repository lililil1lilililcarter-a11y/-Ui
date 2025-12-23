
import React, { useState, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  title: string;
  description: string;
}

const PremiumFeatureGuard: React.FC<Props> = ({ children, title, description }) => {
  const [hasKey, setHasKey] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkKey = async () => {
      // Check if user has already selected a key for premium features
      if ((window as any).aistudio?.hasSelectedApiKey) {
        const selected = await (window as any).aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
      setChecking(false);
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if ((window as any).aistudio?.openSelectKey) {
      await (window as any).aistudio.openSelectKey();
      // Assume success as per guidelines to avoid race condition
      setHasKey(true);
    }
  };

  if (checking) return null;

  if (!hasKey) {
    return (
      <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-white mb-4">{title}</h3>
        <p className="text-slate-400 max-w-sm mb-8">{description}</p>
        <div className="space-y-4">
          <button 
            onClick={handleSelectKey}
            className="px-8 py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20"
          >
            Authenticate Paid API Key
          </button>
          <p className="text-xs text-slate-500">
            A paid GCP project is required for this feature. <br/>
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline hover:text-indigo-400">View Billing Docs</a>
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PremiumFeatureGuard;
