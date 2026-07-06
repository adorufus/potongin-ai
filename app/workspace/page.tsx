'use client'

import { Clip } from '../types';
import { MOCK_SIDEBAR_CLIPS } from '../data';
import { useState } from 'react';

interface WorkspaceViewProps {
  onExportClick: () => void;
  onPageChange: (page: string) => void;
}

export default function WorkspaceView({ onExportClick, onPageChange }: WorkspaceViewProps) {
  const [selectedClip, setSelectedClip] = useState<Clip>(MOCK_SIDEBAR_CLIPS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTools, setActiveTools] = useState({
    cut: false,
    captions: true,
    face: true,
    music: false,
  });
  const [captionText, setCaptionText] = useState('THIS IS INSANE! 🔥');
  const [timelineProgress, setTimelineProgress] = useState(40); // percent

  const handleToggleTool = (tool: keyof typeof activeTools) => {
    setActiveTools((prev) => ({
      ...prev,
      [tool]: !prev[tool],
    }));
  };

  const handleSelectClip = (clip: Clip) => {
    setSelectedClip(clip);
    setIsPlaying(false);
    
    // Dynamically update caption based on which clip is active
    if (clip.id === 'side-clip-1') {
      setCaptionText('THIS IS INSANE! 🔥');
    } else if (clip.id === 'side-clip-2') {
      setCaptionText('THE SECRET REVEALED 🤫');
    } else {
      setCaptionText('DO NOT MISS THIS! 👇');
    }
  };

  const dancerVideoThumb = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA104TjNCZ3p9q5CTSDCHaD96tKoi6lHEA0UXSHzyxFPtbLYgfplKOvDltkNsrTSdNqZMkVtlxz2SZNkhymcIcM2YaHceMUjAa4-WH-TTNFaM5KCP30USzIzTN7PeIQvSk_e1IjUJM6Qv9dLuPjw7a7ZDsnoD-O2zOXKSkXL8QhWlySVgVoYE53DTGxbWd5kftzqCah6OHQd7RsSsPXKNZcPxJIik869G0uCrGWYnJM_8tMcwAhjBsFj8KuUV6GBb_pMjiiMmXHPdyn';

  return (
    <div className="flex-grow flex flex-col h-[calc(100vh-64px)] relative overflow-hidden bg-[#0b1326]">
      {/* Content Area */}
      <div className="flex-grow flex overflow-hidden">
        
        {/* Left Side: Video Preview & Editing Tools */}
        <section className="flex-1 flex flex-col p-6 gap-6 bg-[#0b1326]/50 relative overflow-y-auto">
          
          {/* Center Stage Editor */}
          <div className="flex-1 flex justify-center items-center relative gap-8 py-2">
            
            {/* Vertical Video Mockup Player (9:16 Aspect Ratio) */}
            <div className="aspect-[9/16] h-[480px] md:h-[520px] glass-panel rounded-[2rem] overflow-hidden relative shadow-2xl group border border-white/10 bg-[#020617]">
              
              {/* Background Video Frame */}
              <div 
                className="w-full h-full bg-cover bg-center transition-all duration-300 relative select-none"
                style={{ 
                  backgroundImage: `url('${selectedClip.thumbnailUrl || dancerVideoThumb}')`,
                  filter: isPlaying ? 'brightness(1.05)' : 'brightness(0.9)'
                }}
              >
                {/* Simulated Speaker Tracking overlay */}
                {activeTools.face && (
                  <div className="absolute inset-x-8 top-1/4 bottom-1/3 border border-[#4cd7f6]/40 rounded-3xl pointer-events-none animate-pulse">
                    <span className="absolute -top-2.5 -left-2.5 w-5 h-5 border-t-2 border-l-2 border-[#4cd7f6]"></span>
                    <span className="absolute -top-2.5 -right-2.5 w-5 h-5 border-t-2 border-r-2 border-[#4cd7f6]"></span>
                    <span className="absolute -bottom-2.5 -left-2.5 w-5 h-5 border-b-2 border-l-2 border-[#4cd7f6]"></span>
                    <span className="absolute -bottom-2.5 -right-2.5 w-5 h-5 border-b-2 border-r-2 border-[#4cd7f6]"></span>
                    <span className="absolute top-2 left-3 text-[9px] font-mono bg-[#0b1326]/80 text-[#4cd7f6] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Tracking Speaker #882
                    </span>
                  </div>
                )}
                
                {/* Interactive Dynamic Caption Text */}
                {activeTools.captions && (
                  <div className="absolute inset-x-0 bottom-16 flex flex-col justify-end p-6 select-none">
                    <div className="bg-yellow-400 text-black px-4 py-2 font-display text-base md:text-xl font-black italic rounded shadow-2xl transform -rotate-1 self-center scale-110 text-center uppercase tracking-tight animate-bounce">
                      {captionText}
                    </div>
                  </div>
                )}

                {/* Micro Video Playing indicator */}
                {isPlaying && (
                  <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-full text-[10px] font-mono text-[#10B981] font-bold tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-ping"></span>
                    PLAYING
                  </div>
                )}
              </div>

              {/* Hover Trigger Player HUD Overlay Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-md px-5 py-2 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-20">
                <button 
                  onClick={() => {
                    alert('Replaying current segment (10s back)');
                    setIsPlaying(true);
                  }}
                  className="material-symbols-outlined cursor-pointer text-white hover:text-[#d0bcff] transition-colors text-lg"
                >
                  replay_10
                </button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="material-symbols-outlined cursor-pointer text-white hover:text-[#d0bcff] transition-transform text-2xl active:scale-90"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {isPlaying ? 'pause' : 'play_arrow'}
                </button>
                <button 
                  onClick={() => {
                    alert('Skipping ahead');
                    setIsPlaying(true);
                  }}
                  className="material-symbols-outlined cursor-pointer text-white hover:text-[#d0bcff] transition-colors text-lg"
                >
                  forward_10
                </button>
              </div>
            </div>

            {/* Floating Side Tools Toolbar */}
            <div className="flex flex-col gap-4 z-20">
              <button 
                onClick={() => handleToggleTool('cut')}
                className={`w-14 h-14 glass-panel rounded-2xl flex items-center justify-center hover:border-[#d0bcff] hover:bg-[#d0bcff]/10 active:scale-95 transition-all group ${
                  activeTools.cut ? 'bg-[#d0bcff]/20 border-[#d0bcff]' : ''
                }`}
                title="Toggle Crop Mode"
              >
                <span className={`material-symbols-outlined ${activeTools.cut ? 'text-[#d0bcff]' : 'text-[#cbc3d7]'}`}>
                  content_cut
                </span>
              </button>
              <button 
                onClick={() => handleToggleTool('captions')}
                className={`w-14 h-14 glass-panel rounded-2xl flex items-center justify-center hover:border-[#d0bcff] hover:bg-[#d0bcff]/10 active:scale-95 transition-all group ${
                  activeTools.captions ? 'bg-[#d0bcff]/20 border-[#d0bcff]' : ''
                }`}
                title="Toggle AI Subtitles"
              >
                <span className={`material-symbols-outlined ${activeTools.captions ? 'text-[#d0bcff]' : 'text-[#cbc3d7]'}`}>
                  subtitles
                </span>
              </button>
              <button 
                onClick={() => handleToggleTool('face')}
                className={`w-14 h-14 glass-panel rounded-2xl flex items-center justify-center hover:border-[#d0bcff] hover:bg-[#d0bcff]/10 active:scale-95 transition-all group ${
                  activeTools.face ? 'bg-[#d0bcff]/20 border-[#d0bcff]' : ''
                }`}
                title="Toggle Face Autofocus"
              >
                <span className={`material-symbols-outlined ${activeTools.face ? 'text-[#d0bcff]' : 'text-[#cbc3d7]'} material-symbols-filled`}>
                  face
                </span>
              </button>
              <button 
                onClick={() => handleToggleTool('music')}
                className={`w-14 h-14 glass-panel rounded-2xl flex items-center justify-center hover:border-[#d0bcff] hover:bg-[#d0bcff]/10 active:scale-95 transition-all group ${
                  activeTools.music ? 'bg-[#d0bcff]/20 border-[#d0bcff]' : ''
                }`}
                title="Toggle Background Music Tracks"
              >
                <span className={`material-symbols-outlined ${activeTools.music ? 'text-[#d0bcff]' : 'text-[#cbc3d7]'}`}>
                  music_note
                </span>
              </button>
            </div>
          </div>

          {/* Scrolling Timeline Trimmer Bar */}
          <div className="h-28 glass-panel rounded-2xl p-4 flex flex-col gap-2 relative bg-[#171f33]/40">
            <div className="flex justify-between items-center px-4 select-none">
              <div className="flex gap-4">
                <span className="font-mono text-xs text-[#cbc3d7] font-semibold">00:12:04</span>
                <span className="font-mono text-xs text-[#d0bcff] font-bold">/ 00:30:00</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#cbc3d7]/50 select-none">zoom_in</span>
                <input 
                  type="range"
                  min="1"
                  max="100"
                  value={timelineProgress}
                  onChange={(e) => setTimelineProgress(Number(e.target.value))}
                  className="w-24 accent-[#d0bcff] cursor-pointer"
                />
              </div>
            </div>
            
            <div className="flex-1 bg-[#020617]/50 rounded-lg overflow-hidden relative border border-white/5">
              {/* Waveform Mock Bars */}
              <div className="absolute inset-0 flex items-center justify-around px-4 opacity-40 select-none">
                <div className="h-6 w-1 bg-[#4cd7f6] rounded-full"></div>
                <div className="h-10 w-1 bg-[#d0bcff] rounded-full"></div>
                <div className="h-5 w-1 bg-[#4cd7f6] rounded-full"></div>
                <div className="h-14 w-1 bg-[#d0bcff] rounded-full"></div>
                <div className="h-8 w-1 bg-[#4cd7f6] rounded-full"></div>
                <div className="h-12 w-1 bg-[#d0bcff] rounded-full"></div>
                <div className="h-3 w-1 bg-[#4cd7f6] rounded-full"></div>
                <div className="h-10 w-1 bg-[#d0bcff] rounded-full"></div>
                <div className="h-6 w-1 bg-[#4cd7f6] rounded-full"></div>
                <div className="h-12 w-1 bg-[#d0bcff] rounded-full"></div>
                <div className="h-5 w-1 bg-[#4cd7f6] rounded-full"></div>
                <div className="h-8 w-1 bg-[#d0bcff] rounded-full"></div>
              </div>

              {/* Highlighted Selected Region (Drag handles mock) */}
              <div className="absolute left-[30%] right-[35%] top-0 bottom-0 border-x-2 border-[#d0bcff] bg-[#d0bcff]/10">
                <div className="absolute -top-0.5 -bottom-0.5 -left-1 w-2 bg-[#d0bcff] cursor-col-resize rounded-full"></div>
                <div className="absolute -top-0.5 -bottom-0.5 -right-1 w-2 bg-[#d0bcff] cursor-col-resize rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Sidebar: AI Powered Viral Clips List */}
        <aside className="w-[340px] bg-[#171f33]/90 border-l border-white/10 flex flex-col z-10">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-display font-bold text-lg text-white">Viral Clips</h2>
            <span className="bg-[#d0bcff]/15 text-[#d0bcff] text-[10px] px-2.5 py-1 rounded-full font-mono uppercase tracking-wider font-bold">
              AI Powered
            </span>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {MOCK_SIDEBAR_CLIPS.map((clip) => {
              const isSelected = selectedClip.id === clip.id;
              return (
                <div 
                  key={clip.id}
                  onClick={() => handleSelectClip(clip)}
                  className={`group relative rounded-xl overflow-hidden glass-panel cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? 'border-[#d0bcff] bg-[#a078ff]/10 shadow-lg shadow-[#d0bcff]/15 ring-1 ring-[#d0bcff]' 
                      : 'hover:border-[#d0bcff]/50'
                  }`}
                >
                  {/* Thumbnail Cover image */}
                  <div 
                    className="h-32 bg-cover bg-center relative"
                    style={{ backgroundImage: `url('${clip.thumbnailUrl}')` }}
                  >
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md text-[#d0bcff] text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg border border-white/5">
                      SCORE: {clip.score}
                    </div>
                  </div>

                  <div className="p-3 bg-[#020617]/40 flex flex-col gap-1">
                    <p className="font-bold text-sm text-white truncate group-hover:text-[#d0bcff] transition-colors">
                      {clip.title}
                    </p>
                    <p className="text-xs text-[#cbc3d7]/80 font-mono">{clip.duration}</p>
                    <div className="mt-2 flex gap-1.5 flex-wrap">
                      {clip.tags.map((tag) => (
                        <span key={tag} className="text-[9px] bg-[#2d3449]/70 px-2 py-0.5 rounded text-[#dae2fd] border border-white/5 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick action button bottom sidebar */}
          <div className="p-6 bg-[#020617]/50 border-t border-white/5">
            <button 
              onClick={() => {
                alert('Triggering deep AI scanning to find alternative hooks...');
              }}
              className="w-full py-3.5 rounded-xl border border-dashed border-[#cbc3d7]/30 hover:border-[#d0bcff] hover:text-white transition-all text-[#cbc3d7] font-semibold text-xs flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Generate More Clips
            </button>
          </div>
        </aside>

      </div>
    </div>
  );
}
