
import React, { useState, useRef } from 'react';
import { auditCreativeConcept, auditVisualCreative } from '../services/geminiService';

const CreativeAudit: React.FC = () => {
  const [concept, setConcept] = useState('');
  const [critique, setCritique] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'text' | 'camera'>('text');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleAudit = async () => {
    if (!concept && mode === 'text') return;
    setLoading(true);
    try {
      const res = await auditCreativeConcept(concept);
      setCritique(res);
    } catch (e) {
      console.error(e);
      setCritique("Audit failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const startCamera = async () => {
    setMode('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error(err);
      alert("Camera access denied. Please allow camera permissions.");
      setMode('text');
    }
  };

  const captureAndAudit = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setLoading(true);
    
    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context?.drawImage(videoRef.current, 0, 0);
    
    const base64 = canvasRef.current.toDataURL('image/jpeg').split(',')[1];
    
    try {
      const res = await auditVisualCreative(base64, 'image/jpeg');
      setCritique(res);
      // Stop stream
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setMode('text');
    } catch (e) {
      console.error(e);
      setCritique("Visual analysis failed. Ensure billing is active for Gemini 3 Pro features if applicable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            Creative Vision Audit
          </h3>
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            <button 
              onClick={() => setMode('text')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'text' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Text Concept
            </button>
            <button 
              onClick={startCamera}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'camera' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Visual Prototyping
            </button>
          </div>
        </div>
        
        {mode === 'text' ? (
          <div className="space-y-4">
            <textarea
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              className="w-full bg-slate-800/50 border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none h-32 placeholder:text-slate-600 transition-all"
              placeholder="Describe your creative idea... e.g. 'A high-contrast photo of a runner in a neon city, text: ESCAPE THE NOISE...'"
            />
            <button
              onClick={handleAudit}
              disabled={loading}
              className="w-full py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-indigo-50 transition-all disabled:opacity-50"
            >
              {loading ? 'Analyzing Impact...' : 'Run Audit'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="aspect-video bg-black rounded-2xl border border-white/10 overflow-hidden relative group">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 border-2 border-indigo-500/30 rounded-2xl pointer-events-none"></div>
              {loading && (
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <button
              onClick={captureAndAudit}
              disabled={loading}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20"
            >
              Audit Live Frame
            </button>
            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}

        {critique && (
          <div className="mt-8 p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="flex items-center justify-between mb-4">
               <h4 className="text-indigo-400 font-black uppercase text-[10px] tracking-widest">Director's Analysis Output</h4>
               <span className="text-[10px] text-slate-500 font-bold">GEMINI-3 PRO VISION</span>
            </div>
            <div className="text-slate-300 whitespace-pre-wrap leading-relaxed font-medium text-sm">
              {critique}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeAudit;
