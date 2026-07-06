'use client'

import { Clip, LogEntry } from '../types';
import { INITIAL_LOGS, MOCK_CLIPS } from '../data';
import { useEffect, useRef, useState } from 'react';

interface ProcessingViewProps {
  onPreEditClick: () => void;
  onStopAnalysis: () => void;
  sourceName?: string;
}

export default function ProcessingView({ onPreEditClick, onStopAnalysis, sourceName = 'Podcast Highlight #04' }: ProcessingViewProps) {
  const [progress, setProgress] = useState(74);
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Simulate progress ticking
  useEffect(() => {
    if (isPaused || isCompleted) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCompleted(true);
          return 100;
        }
        return prev + 1;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isPaused, isCompleted]);

  // Simulate streaming log events
  useEffect(() => {
    if (isPaused || isCompleted) return;

    const logPool = [
      'Extracting speech transcript patterns...',
      'Evaluating audience retention indices...',
      'Matching background mood vectors to "Electronic Chill"...',
      'Injecting smart dynamic subtitles style: Bold Modern',
      'Synthesizing video layout for vertical mobile safe-zones...',
      'Recalibrating high-engagement frames...',
      'AI Analysis completed successfully. 3 Clips created!'
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index >= logPool.length) {
        clearInterval(interval);
        return;
      }
      
      const now = new Date();
      const formatTime = `00:12:${String(now.getSeconds() + 20).padStart(2, '0')}`;
      
      const newLog: LogEntry = {
        timestamp: formatTime,
        message: logPool[index],
        type: index === logPool.length - 1 ? 'highlight' : 'info'
      };

      setLogs((prev) => [...prev, newLog]);
      index++;
    }, 2800);

    return () => clearInterval(interval);
  }, [isPaused, isCompleted]);

  const handleStopAnalysisToggle = () => {
    setIsPaused(!isPaused);
    if (!isPaused) {
      onStopAnalysis();
    }
  };

  const speakerImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhFJsClztui4DRxHz_45tgouCW8ahqVfQVTosQ1tpXXHYx6uZ9Q22u0OypUHjGZuVYxrt2qLsPc4gWp5LDHrgR0QuRYgJk26LrFOTdU-IQ8e2TTKPS2jZnwIBDIlr1qC4LWBmNjr1v0GBa4M-Tzs8Cj3ziYvahTG4_4bibZWiPACnZk5eM8Zl9MqHwu4lsK_BTi5DlVopvWykAS9FWXljDzM0-bY3Oo2yL_yBnqj4kgtxqBFKKbepK9uVIy8hv7LEDXP78EnTDK1D6';

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto py-6">
      {/* Top Banner indicating Active Task */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#171f33]/40 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
        <div>
          <span className="text-xs font-mono font-bold uppercase text-[#4cd7f6] tracking-wider">
            Now Processing
          </span>
          <h2 className="text-2xl font-bold font-display text-white mt-1">
            {sourceName}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4] animate-ping"></span>
          <span className="text-sm font-mono text-[#4cd7f6] uppercase font-bold">
            {isPaused ? 'ANALYSIS PAUSED' : isCompleted ? 'SUCCESS' : 'AI INDEXING SOURCE...'}
          </span>
        </div>
      </div>

      {/* Main Grid: Live Analytics vs detected clips */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Live Analytics Stage */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
          <div className="glass rounded-3xl p-1 relative overflow-hidden group aspect-video video-container bg-[#020617] border border-white/10 shadow-2xl">
            {/* Moving Laser Scan Line */}
            {!isPaused && !isCompleted && <div className="scan-line z-10"></div>}
            
            <div className="relative w-full h-full rounded-[20px] overflow-hidden flex items-center justify-center">
              <img 
                className="w-full h-full object-cover opacity-65 select-none" 
                alt="Source Frame" 
                src={speakerImage}
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay HUD indicators */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                <div className="glass-panel px-3.5 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-mono text-[#4cd7f6] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
                  ANALYZING AUDIO SPECTRUM
                </div>
                <div className="glass-panel px-3.5 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-mono text-[#d0bcff] font-bold">
                  <span className="material-symbols-outlined text-sm text-[#d0bcff]">face</span>
                  TRACKING SPEAKER (ID: #882)
                </div>
              </div>

              {/* Progress HUD overlay card */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-11/12 z-20">
                <div className="glass-panel p-5 rounded-2xl flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-white font-display">
                      {isCompleted ? 'AI processing completed!' : 'AI is finding your viral moments...'}
                    </span>
                    <span className="font-mono text-xs text-[#4cd7f6] font-bold">
                      {progress}% Complete
                    </span>
                  </div>
                  
                  {/* Real-time bar */}
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#4cd7f6] to-[#d0bcff] rounded-full transition-all duration-300 relative"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/25 animate-pulse"></div>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-[#cbc3d7] font-mono tracking-wider">
                    {isCompleted 
                      ? 'ALL MOMENTS INDEXED AND READY' 
                      : `ESTIMATED TIME REMAINING: ${Math.max(0, Math.ceil((100 - progress) * 0.5))} SECONDS`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Streaming activity logs terminal */}
          <div className="glass-panel rounded-3xl p-6 h-56 relative flex flex-col">
            <h3 className="font-mono text-xs text-[#cbc3d7]/60 mb-3 uppercase tracking-widest font-semibold">
              Processing Logs
            </h3>
            <div className="flex-grow flex flex-col gap-3 font-mono text-xs overflow-y-auto max-h-40 pr-2">
              {logs.map((log, index) => {
                const isHighlight = log.type === 'highlight';
                return (
                  <div 
                    key={index} 
                    className={`flex items-start gap-3 transition-all duration-200 animate-in fade-in slide-in-from-bottom-1 ${
                      isHighlight ? 'text-[#d0bcff] font-bold' : 'text-[#cbc3d7]/85'
                    }`}
                  >
                    <span className="text-[#4cd7f6] flex-shrink-0">[{log.timestamp}]</span>
                    <span>{log.message}</span>
                  </div>
                );
              })}
              <div ref={logsEndRef} />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#0b1326] to-transparent pointer-events-none rounded-b-3xl"></div>
          </div>
        </div>

        {/* Right Column: Detected Clips Shelf */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="font-display font-bold text-xl text-white">Detected Clips</h2>
            <span className="px-3 py-1 bg-[#171f33] rounded-full text-xs text-[#4cd7f6] border border-white/5 font-mono">
              {progress >= 100 ? '3 found' : progress >= 85 ? '2 found' : '1 found'}
            </span>
          </div>

          <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2">
            {/* Clip Card 1 */}
            <div 
              onClick={onPreEditClick}
              className="glass-panel rounded-2xl p-4 flex gap-4 group cursor-pointer hover:border-[#4cd7f6]/40 hover:bg-[#171f33]/40 transition-all duration-300"
            >
              <div className="w-24 h-32 rounded-lg overflow-hidden flex-shrink-0 relative">
                <img 
                  className="w-full h-full object-cover select-none" 
                  alt="Clip 1 Preview" 
                  src={MOCK_CLIPS[0].thumbnailUrl}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#10B981] rounded text-[9px] font-bold text-white shadow-lg">
                  {MOCK_CLIPS[0].score}
                </div>
              </div>
              <div className="flex flex-col justify-between py-1 flex-grow">
                <div>
                  <div className="flex items-center gap-1.5 mb-1 text-white">
                    <span className="material-symbols-outlined text-[#4cd7f6] text-sm material-symbols-filled">
                      trending_up
                    </span>
                    <span className="text-xs font-bold truncate group-hover:text-[#4cd7f6] transition-colors max-w-[170px] block">
                      {MOCK_CLIPS[0].title}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#cbc3d7] line-clamp-2 leading-relaxed italic">
                    {MOCK_CLIPS[0].subtitle}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-mono text-[#cbc3d7]">
                    {MOCK_CLIPS[0].duration}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#4cd7f6]/10 text-[9px] font-mono text-[#4cd7f6] font-bold">
                    Face Detected
                  </span>
                </div>
              </div>
            </div>

            {/* Clip Card 2 (Revealed at 85%) */}
            {progress >= 85 ? (
              <div 
                onClick={onPreEditClick}
                className="glass-panel rounded-2xl p-4 flex gap-4 group cursor-pointer hover:border-[#d0bcff]/40 hover:bg-[#171f33]/40 transition-all duration-300 border-l-4 border-l-[#d0bcff]"
              >
                <div className="w-24 h-32 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <img 
                    className="w-full h-full object-cover select-none" 
                    alt="Clip 2 Preview" 
                    src={MOCK_CLIPS[1].thumbnailUrl}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#10B981] rounded text-[9px] font-bold text-white shadow-lg">
                    {MOCK_CLIPS[1].score}
                  </div>
                </div>
                <div className="flex flex-col justify-between py-1 flex-grow">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1 text-white">
                      <span className="material-symbols-outlined text-[#d0bcff] text-sm material-symbols-filled">
                        auto_fix_high
                      </span>
                      <span className="text-xs font-bold truncate group-hover:text-[#d0bcff] transition-colors max-w-[170px] block">
                        {MOCK_CLIPS[1].title}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#cbc3d7] line-clamp-2 leading-relaxed italic">
                      {MOCK_CLIPS[1].subtitle}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-mono text-[#cbc3d7]">
                      {MOCK_CLIPS[1].duration}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#d0bcff]/10 text-[9px] font-mono text-[#d0bcff] font-bold">
                      Captions Ready
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* Clip Card 2 Skeleton Placeholder */
              <div className="glass-panel rounded-2xl p-4 flex gap-4 opacity-50 relative overflow-hidden">
                <div className="w-24 h-32 rounded-lg bg-[#171f33] flex-shrink-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#cbc3d7] animate-spin">sync</span>
                </div>
                <div className="flex flex-col justify-between py-1 flex-grow">
                  <div className="space-y-2.5">
                    <div className="h-4 w-3/4 bg-white/10 rounded"></div>
                    <div className="h-3 w-5/6 bg-white/10 rounded"></div>
                  </div>
                  <div className="h-4 w-1/3 bg-white/10 rounded mt-2"></div>
                </div>
              </div>
            )}

            {/* Dynamic Clip Card 3 loading placeholder */}
            {progress < 100 ? (
              <div className="glass-panel rounded-2xl p-4 flex gap-4 opacity-35 relative overflow-hidden">
                <div className="w-24 h-32 rounded-lg bg-[#171f33] flex-shrink-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#cbc3d7] animate-pulse">hourglass_top</span>
                </div>
                <div className="flex flex-col justify-between py-1 flex-grow">
                  <div className="space-y-2">
                    <div className="h-4 w-1/2 bg-white/10 rounded"></div>
                    <div className="h-3 w-full bg-white/10 rounded"></div>
                  </div>
                  <div className="h-4 w-1/4 bg-white/10 rounded"></div>
                </div>
              </div>
            ) : (
              <div 
                onClick={onPreEditClick}
                className="glass-panel rounded-2xl p-4 flex gap-4 group cursor-pointer hover:border-[#4cd7f6]/40 hover:bg-[#171f33]/40 transition-all duration-300 border-l-4 border-l-[#4cd7f6] animate-in zoom-in duration-300"
              >
                <div className="w-24 h-32 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <img 
                    className="w-full h-full object-cover select-none" 
                    alt="Clip 3 Preview" 
                    src={MOCK_CLIPS[2].thumbnailUrl}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#10B981] rounded text-[9px] font-bold text-white shadow-lg">
                    {MOCK_CLIPS[2].score}
                  </div>
                </div>
                <div className="flex flex-col justify-between py-1 flex-grow">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1 text-white">
                      <span className="material-symbols-outlined text-[#4cd7f6] text-sm material-symbols-filled">
                        interests
                      </span>
                      <span className="text-xs font-bold truncate group-hover:text-[#4cd7f6] transition-colors max-w-[170px] block">
                        {MOCK_CLIPS[2].title}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#cbc3d7] line-clamp-2 leading-relaxed italic">
                      {MOCK_CLIPS[2].subtitle}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-mono text-[#cbc3d7]">
                      {MOCK_CLIPS[2].duration}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#4cd7f6]/10 text-[9px] font-mono text-[#4cd7f6] font-bold">
                      CTA Tagged
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Insight Footer Card Panel */}
      <div className="glass-panel rounded-[32px] p-8 flex flex-col md:flex-row items-center gap-8 border-t border-white/20 bg-[#171f33]/30">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#d0bcff] to-[#4cd7f6] p-0.5 flex-shrink-0 flex items-center justify-center glow-purple">
          <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-[#d0bcff] material-symbols-filled animate-pulse">
              psychology
            </span>
          </div>
        </div>
        
        <div className="flex-grow space-y-2">
          <h4 className="font-display font-bold text-xl text-white">AI Prediction Engine</h4>
          <p className="text-sm text-[#cbc3d7] leading-relaxed">
            We have identified a strong <span className="text-[#4cd7f6] font-bold">&quot;Curiosity Gap&quot;</span> at the 2-minute mark. AI is currently generating alternative hook variations for TikTok vs. YouTube Shorts to maximize your reach.
          </p>
        </div>

        <div className="flex gap-4 flex-shrink-0 w-full md:w-auto">
          <button 
            onClick={handleStopAnalysisToggle}
            className={`flex-1 md:flex-initial px-6 py-3 rounded-xl border text-xs font-bold tracking-wider transition-colors uppercase ${
              isPaused 
                ? 'border-[#10B981] text-[#10B981] hover:bg-[#10B981]/5' 
                : 'border-white/10 text-white hover:bg-white/5'
            }`}
          >
            {isPaused ? 'Resume Analysis' : 'Stop Analysis'}
          </button>
          
          <button 
            onClick={onPreEditClick}
            className="flex-1 md:flex-initial px-8 py-3 rounded-xl bg-gradient-to-r from-[#d0bcff] to-[#4cd7f6] text-black font-extrabold text-xs tracking-wider shadow-lg shadow-[#d0bcff]/20 hover:scale-[1.03] active:scale-95 transition-all uppercase"
          >
            Pre-Edit Clips
          </button>
        </div>
      </div>
    </div>
  );
}