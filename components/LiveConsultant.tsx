
import React, { useState, useRef, useEffect } from 'react';
import { connectLiveConsultant } from '../services/geminiService';

const LiveConsultant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [status, setStatus] = useState('Idle');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());

  const stopSession = () => {
    setIsActive(false);
    setStatus('Disconnected');
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
  };

  const startSession = async () => {
    setIsConnecting(true);
    setStatus('Connecting...');
    
    try {
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = connectLiveConsultant({
        onopen: () => {
          setStatus('Listening...');
          setIsActive(true);
          setIsConnecting(false);
          
          const source = inputCtx.createMediaStreamSource(stream);
          const processor = inputCtx.createScriptProcessor(4096, 1, 1);
          
          processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const int16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) {
              int16[i] = inputData[i] * 32768;
            }
            const base64 = btoa(String.fromCharCode(...new Uint8Array(int16.buffer)));
            
            sessionPromise.then(session => {
              session.sendRealtimeInput({ 
                media: { data: base64, mimeType: 'audio/pcm;rate=16000' } 
              });
            });
          };

          source.connect(processor);
          processor.connect(inputCtx.destination);
        },
        onmessage: async (msg: any) => {
          const audioBase64 = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audioBase64) {
            setStatus('AI Speaking...');
            const bytes = Uint8Array.from(atob(audioBase64), c => c.charCodeAt(0));
            const dataInt16 = new Int16Array(bytes.buffer);
            const buffer = outputCtx.createBuffer(1, dataInt16.length, 24000);
            const channelData = buffer.getChannelData(0);
            for (let i = 0; i < dataInt16.length; i++) {
              channelData[i] = dataInt16[i] / 32768.0;
            }

            const source = outputCtx.createBufferSource();
            source.buffer = buffer;
            source.connect(outputCtx.destination);
            
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += buffer.duration;
            
            sourcesRef.current.add(source);
            source.onended = () => {
              sourcesRef.current.delete(source);
              if (sourcesRef.current.size === 0) setStatus('Listening...');
            };
          }
        },
        onerror: (e: any) => {
          console.error(e);
          stopSession();
        },
        onclose: () => stopSession()
      });

      sessionPromiseRef.current = sessionPromise;

    } catch (err) {
      console.error(err);
      setIsConnecting(false);
      setStatus('Mic Access Denied');
    }
  };

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 text-white overflow-hidden relative border border-white/5">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.15),transparent_50%)]"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`}></div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Live Strategy Lab</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Consult the AI <br/>
            <span className="text-indigo-400">Growth Architect</span>
          </h2>
          
          <p className="text-lg text-slate-400 leading-relaxed max-w-md">
            Skip the forms. Engage in a real-time voice conversation with our AI consultant for immediate strategic teardowns and brainstorming.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {!isActive ? (
              <button
                onClick={startSession}
                disabled={isConnecting}
                className="w-full sm:w-auto px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-2xl shadow-indigo-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isConnecting ? 'Initializing...' : (
                  <>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                    </svg>
                    Start Voice Consultation
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={stopSession}
                className="w-full sm:w-auto px-10 py-5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 text-red-500 font-bold rounded-2xl transition-all flex items-center justify-center gap-3"
              >
                End Consultation
              </button>
            )}
            <div className="text-sm font-medium text-slate-500 italic">
              Status: <span className="text-indigo-400">{status}</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto flex flex-col items-center justify-center relative">
          <div className="w-64 h-64 rounded-full bg-indigo-600/10 flex items-center justify-center relative">
            <div className={`absolute inset-0 rounded-full border border-indigo-500/30 ${isActive ? 'animate-ping duration-[3s]' : ''}`}></div>
            <div className={`absolute inset-4 rounded-full border border-indigo-400/20 ${isActive ? 'animate-ping duration-[2s]' : ''}`}></div>
            
            <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-2xl flex items-center justify-center relative z-10 overflow-hidden">
               {isActive ? (
                 <div className="flex gap-1 items-end h-12">
                    {[1,2,3,4,5,6].map(i => (
                      <div key={i} className="w-2 bg-white rounded-full animate-[bounce_1s_infinite]" style={{animationDelay: `${i*0.1}s`, height: `${Math.random()*100}%`}}></div>
                    ))}
                 </div>
               ) : (
                 <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                 </svg>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveConsultant;
