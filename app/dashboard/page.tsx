'use client'

import { useState } from "react";
import { Project } from "../types";
import { useRouter } from "next/navigation";
import { INITIAL_PROJECTS } from "../data";


interface DashboardViewProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  handleUploadStart: (sourceName: string) => void;
}

export default function Dashboard() {

  const [urlInput, setUrlInput] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<'youtube' | 'twitch'>('youtube');
  const [isDragging, setIsDragging] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [processingName, setProcessingName] = useState('Podcast Highlight #04');
  const router = useRouter();
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);

  const handlePageChange = (page: string) => {
    router.push(page);
    setActivePage(page);
  }

  // Triggered when clicking a project item on the dashboard
  const handleProjectClick = (project: Project) => {
    if (project.status === 'PROCESSING') {
      setProcessingName(project.title);
      handlePageChange('/processing');
    } else {
      handlePageChange('/workspace');
    }
  };

  // Triggered when a file or URL is submitted to start clipping
  const handleUploadStart = (sourceName: string) => {
    // Clean up filename display if it's a URL
    let cleanName = sourceName;
    if (sourceName.startsWith('http')) {
      try {
        const urlObj = new URL(sourceName);
        cleanName = `Fetched: ${urlObj.hostname}${urlObj.pathname.substring(0, 10)}...`;
      } catch {
        cleanName = 'Imported Stream Session';
      }
    }

    // Add new project to state queue
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: cleanName,
      editedTime: 'Created just now',
      status: 'PROCESSING',
      progressPercent: 74,
    };

    setProjects((prev) => [newProj, ...prev]);
    setProcessingName(cleanName);
    handlePageChange('/processing');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleUploadStart(file.name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUploadStart(e.target.files[0].name);
    }
  };

  const handleFetchVideo = () => {
    if (!urlInput.trim()) {
      setFetchError('Please enter a valid video URL');
      return;
    }
    setFetchError('');
    // Trigger video analysis pipeline simulation
    handleUploadStart(urlInput);
  };

  return (
    <div className="flex flex-col gap-12 w-full max-w-6xl mx-auto py-8">
      {/* Upload Section Hero */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-[#dae2fd] leading-tight tracking-tight">
            Create something <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d0bcff] to-[#4cd7f6]">viral</span>
          </h1>
          <p className="text-lg text-[#cbc3d7] max-w-2xl mt-2 leading-relaxed">
            Upload your raw footage and let our AI handle the cropping, captions, and trend matching instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          {/* File Dropzone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="lg:col-span-2 relative group"
          >
            <div
              className={`h-[380px] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-all duration-300 cursor-pointer ${isDragging
                ? 'border-[#4cd7f6] bg-[#171f33]/60 scale-[1.01]'
                : 'border-white/10 bg-[#171f33]/30 hover:bg-[#171f33]/50 hover:border-[#d0bcff]/50'
                }`}
            >
              <input
                type="file"
                id="file-upload-input"
                accept="video/*"
                className="hidden"
                onChange={handleFileSelect}
              />

              <label htmlFor="file-upload-input" className="contents">
                <div className="w-16 h-16 rounded-full bg-[#d0bcff]/20 flex items-center justify-center text-[#d0bcff] group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'wght' 600" }}>
                    cloud_upload
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white">Drag &amp; Drop Video Files</p>
                  <p className="text-[#cbc3d7] text-sm mt-1">Support MP4, MOV, WEBM (up to 2GB)</p>
                </div>
                <button
                  type="button"
                  onClick={() => document.getElementById('file-upload-input')?.click()}
                  className="mt-2 px-8 py-3 rounded-full border border-[#d0bcff] text-[#d0bcff] font-bold text-sm hover:bg-[#d0bcff] hover:text-[#3c0091] transition-all duration-200 active:scale-95"
                >
                  Browse Files
                </button>
              </label>
            </div>
          </div>

          {/* Import from URL Side Box */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col gap-6 bg-[#171f33]/40">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#4cd7f6]/10 rounded-lg text-[#4cd7f6]">
                <span className="material-symbols-outlined">link</span>
              </div>
              <h3 className="font-bold text-xl text-white">Import from URL</h3>
            </div>

            <p className="text-[#cbc3d7] text-sm leading-relaxed">
              Paste a link from YouTube or Twitch to start editing and clipping instantly.
            </p>

            <div className="flex flex-col gap-4 mt-auto">
              <div className="relative">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    if (fetchError) setFetchError('');
                  }}
                  className={`w-full bg-[#020617] border rounded-xl py-3 px-4 text-sm text-[#dae2fd] focus:border-[#4cd7f6] transition-all outline-none ${fetchError ? 'border-[#FE2C55]' : 'border-white/10'
                    }`}
                  placeholder="https://youtube.com/watch?v=..."
                />
                {fetchError && (
                  <p className="text-xs text-[#FE2C55] mt-1 pl-1 font-semibold">{fetchError}</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedPlatform('youtube')}
                  className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition-all ${selectedPlatform === 'youtube'
                    ? 'bg-white/10 border border-[#d0bcff]/50 text-white font-bold'
                    : 'border border-white/10 text-[#cbc3d7] hover:bg-white/5'
                    }`}
                >
                  <span className="material-symbols-outlined text-sm">video_library</span>
                  YouTube
                </button>
                <button
                  onClick={() => setSelectedPlatform('twitch')}
                  className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition-all ${selectedPlatform === 'twitch'
                    ? 'bg-white/10 border border-[#4cd7f6]/50 text-white font-bold'
                    : 'border border-white/10 text-[#cbc3d7] hover:bg-white/5'
                    }`}
                >
                  <span className="material-symbols-outlined text-sm">stadium</span>
                  Twitch
                </button>
              </div>

              <button
                onClick={handleFetchVideo}
                className="w-full viral-gradient text-[#2c1700] font-extrabold text-sm py-3.5 rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all tracking-wider uppercase"
              >
                FETCH VIDEO
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold font-display text-white">Recent Projects</h2>
          <span className="text-[#d0bcff] font-semibold text-sm hover:underline cursor-pointer">
            View all
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((proj) => {
            const isProcessing = proj.status === 'PROCESSING';
            const isReady = proj.status === 'READY';

            return (
              <div
                key={proj.id}
                onClick={() => handleProjectClick(proj)}
                className="glass-panel rounded-2xl overflow-hidden group hover:border-[#d0bcff]/50 transition-all duration-300 cursor-pointer flex flex-col h-[340px]"
              >
                {/* Visual Thumbnail Area */}
                <div className="relative flex-grow bg-[#020617] overflow-hidden">
                  {isProcessing ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#020617]/90">
                      {/* Spinner */}
                      <div className="w-12 h-12 border-4 border-[#d0bcff]/30 border-t-[#d0bcff] rounded-full animate-spin"></div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#d0bcff] animate-pulse">
                        PROCESSING...
                      </span>
                      <div className="absolute top-4 right-4 bg-[#010101]/80 backdrop-blur-md text-[10px] px-2.5 py-1 rounded border border-white/10 text-white font-bold">
                        {proj.progressPercent || 42}%
                      </div>
                    </div>
                  ) : (
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${proj.thumbnailUrl}')` }}
                    >
                      {/* Hover Overlay play button */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 bg-[#d0bcff] rounded-full flex items-center justify-center text-[#3c0091] shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                          <span className="material-symbols-outlined text-3xl material-symbols-filled">
                            play_arrow
                          </span>
                        </div>
                      </div>

                      {/* Score Badge */}
                      {isReady && proj.viralScore && (
                        <div className="absolute top-4 right-4 viral-gradient text-black text-[10px] px-2.5 py-1 rounded-full font-black flex items-center gap-1 shadow-lg">
                          <span className="material-symbols-outlined text-[12px]">trending_up</span>
                          {proj.viralScore} SCORE
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Info Footer */}
                <div className="p-4 bg-[#171f33]/60 flex flex-col gap-2 border-t border-white/5">
                  <h4 className="font-bold text-white text-sm truncate group-hover:text-[#d0bcff] transition-colors">
                    {proj.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#cbc3d7]/75 font-mono">{proj.editedTime}</span>
                    {proj.status === 'PROCESSING' && (
                      <span className="bg-[#ca801e]/20 text-[#ffb869] px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                        Processing
                      </span>
                    )}
                    {proj.status === 'READY' && (
                      <span className="bg-[#10B981]/20 text-[#10B981] px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                        Ready
                      </span>
                    )}
                    {proj.status === 'DRAFT' && (
                      <span className="bg-white/10 text-[#cbc3d7] px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                        Draft
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* New Collection Placeholder Card */}
          <div className="border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center gap-3 p-6 text-[#cbc3d7] hover:border-[#d0bcff]/45 hover:text-white transition-all cursor-pointer h-[340px] bg-[#171f33]/10">
            <span className="material-symbols-outlined text-4xl text-[#d0bcff]/80">add_circle</span>
            <p className="font-bold text-sm tracking-wide">New Collection</p>
            <p className="text-xs text-[#cbc3d7]/50 text-center max-w-[150px]">
              Organize your short-form hits into folders.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
