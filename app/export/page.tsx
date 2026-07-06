'use client'

import { useState } from "react";

interface ExportViewProps {
    onReturnToDashboard: () => void;
    onReeditClick: () => void;
    onPageChange: (page: string) => void;
}

export default function Export({ onReturnToDashboard, onReeditClick, onPageChange }: ExportViewProps) {
    const [caption, setCaption] = useState('When the beat drops just right ⚡️ Check out this insane transition! #visuals #creator #potongin');
    const [tags, setTags] = useState(['viral_shorts', 'ai_editing', 'foryou']);
    const [newTagInput, setNewTagInput] = useState('');
    const [showAddTag, setShowAddTag] = useState(false);

    const [isTikTokConnected, setIsTikTokConnected] = useState(true);
    const [isPosting, setIsPosting] = useState(false);
    const [isPostedSuccess, setIsPostedSuccess] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleDeleteTag = (tagToDelete: string) => {
        setTags((prev: Array<string>) => prev.filter((t) => t !== tagToDelete));
    };

    const handleAddTagSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTagInput.trim()) {
            const cleanTag = newTagInput.replace(/#/g, '').trim();
            if (!tags.includes(cleanTag)) {
                setTags((prev: Array<string>) => [...prev, cleanTag]);
            }
            setNewTagInput('');
            setShowAddTag(false);
        }
    };

    const handlePostNow = () => {
        if (!isTikTokConnected) {
            alert('Please connect your TikTok account first!');
            return;
        }
        setIsPosting(true);

        // Simulate API posting delay
        setTimeout(() => {
            setIsPosting(false);
            setIsPostedSuccess(true);
        }, 1800);
    };

    const skaterVideoThumb = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa6QbW4BaMowq-6pl-pw4c_2YnBU-niP3YfbFbJ-r3aAwsvgbqHU9RAeRf5CW_ZvKtTtaJkwqZvaSnqtZuvodN1A_rjER4DLuKk3CdK5kSC9LXzrtx0LTffTDUmCgDbMU0aYQdJUiW-zEcpVR3zdlE4jnuDnSl20izZcegbOx68CI1yE9006jN007BtAfVp3rNckDOew1QUZOudNoR99h6tmrY5VhQpvajPGUzrBnn5MoWUDcXefe6Sui5lNh6c6Zr0FFYpvB-oi9r';
    const successPostPreview = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTbcBpG1Tqq6vJ4xDKasDasx-P1ZPWzRBcxBGk5ZxtPbZE2hYxjnLmrzr4gRVsByC0FNjIYEVHLhZCxG8wuAc56Aw1Kb-V1fp7iPimplXVGZaXzgb_ckMJDKgt6Ny3bVcqoqe3dDB6uz7vvu7_WB3-XzJ_wxexshPMZVlJDo1a9U8ZgywmhYqPMolXq8Np0YcbF6GwgXKK5MGKRp1QCOlxS7r_hq6NJZ6sv0C7rSV6kCzhAu7iR4uXx5xtlI30u1hhnseKkoQHSYaD';

    return (
        <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto py-6 select-none relative">
            {/* Top Title Bar */}
            <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h2 className="font-display font-extrabold text-3xl text-white">Ready for TikTok</h2>
                    <p className="text-[#cbc3d7] mt-1 text-sm leading-relaxed">
                        Review your clip, edit tags, and optimize for maximum audience virality.
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#171f33] border border-[#d0bcff]/30 text-[#d0bcff]">
                    <span className="material-symbols-outlined text-sm material-symbols-filled text-[#d0bcff]">bolt</span>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#d0bcff]">
                        Viral Score: 94/100
                    </span>
                </div>
            </header>

            {/* Main Publishing Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-2">

                {/* Left Column: Player Preview */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                    <div className="relative aspect-[9/16] rounded-3xl overflow-hidden glass-panel border border-white/5 shadow-2xl group bg-[#020617]">
                        <img
                            className="w-full h-full object-cover select-none"
                            alt="TikTok Ready Skate Video Frame"
                            src={skaterVideoThumb}
                            referrerPolicy="no-referrer"
                        />

                        {/* Visual bottom overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="material-symbols-outlined text-white p-3 rounded-full bg-[#a078ff]/40 backdrop-blur-md hover:bg-[#a078ff]/60 active:scale-95 transition-all text-xl"
                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                    {isPlaying ? 'pause' : 'play_arrow'}
                                </button>

                                {/* Timeline slide progress bar */}
                                <div className="flex-grow h-1.5 bg-white/20 rounded-full relative overflow-hidden">
                                    <div className="absolute left-0 top-0 h-full w-[65%] bg-[#d0bcff] rounded-full dropzone-pulse"></div>
                                </div>

                                <span className="font-mono text-[10px] text-white">00:15 / 00:23</span>
                            </div>
                        </div>

                        {/* Trending Badge top left */}
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-[#d0bcff] to-[#4cd7f6] text-black font-extrabold text-[10px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xl">
                            Trending Now
                        </div>
                    </div>

                    {/* Player Helper triggers */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => alert('Initiating MP4 video compilation and render block... Ready for local download soon!')}
                            className="flex-grow py-3.5 rounded-xl glass-panel hover:bg-white/5 border border-white/10 active:scale-95 transition-all text-xs font-mono font-bold tracking-wider uppercase text-white flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-base">download</span>
                            Download MP4
                        </button>
                        <button
                            onClick={onReeditClick}
                            className="flex-grow py-3.5 rounded-xl glass-panel hover:bg-white/5 border border-white/10 active:scale-95 transition-all text-xs font-mono font-bold tracking-wider uppercase text-[#d0bcff] flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-base">edit</span>
                            Re-edit
                        </button>
                    </div>
                </div>

                {/* Right Column: Dynamic Publishing form */}
                <div className="lg:col-span-7 flex flex-col gap-8">

                    {/* Caption & Hashtag editor block */}
                    <div className="glass-panel p-6 rounded-3xl flex flex-col gap-4 bg-[#171f33]/40">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                            <h3 className="font-mono text-xs text-[#4cd7f6] uppercase tracking-widest font-bold">
                                Caption &amp; Tags
                            </h3>
                            <button
                                onClick={() => {
                                    setCaption('New AI generated hook text! 🚀 Turn long clips into automated viral gold with zero effort. #potongin #growth #viral');
                                    alert('Regenerated caption tags with AI engine.');
                                }}
                                className="text-xs text-[#d0bcff] hover:text-[#a078ff] flex items-center gap-1 hover:underline cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-sm">auto_fix</span>
                                Regenerate AI Tags
                            </button>
                        </div>

                        <div className="relative">
                            <textarea
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                maxLength={2200}
                                className="w-full bg-[#020617] border border-white/10 rounded-2xl p-4 min-h-[120px] text-[#dae2fd] text-sm focus:ring-1 focus:ring-[#4cd7f6] focus:border-[#4cd7f6] outline-none transition-all resize-none font-sans leading-relaxed"
                                placeholder="Write your hook description here..."
                            />
                            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#cbc3d7]/60">
                                {caption.length}/2200
                            </div>
                        </div>

                        {/* Dynamic Interactive Hashtags List */}
                        <div className="flex flex-wrap gap-2 items-center">
                            {tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1.5 rounded-lg bg-[#4cd7f6]/10 border border-[#4cd7f6]/20 text-[#4cd7f6] text-xs font-semibold flex items-center gap-1.5 transition-all animate-in zoom-in duration-200"
                                >
                                    #{tag}
                                    <span
                                        onClick={() => handleDeleteTag(tag)}
                                        className="material-symbols-outlined text-xs hover:text-[#FE2C55] cursor-pointer"
                                    >
                                        close
                                    </span>
                                </span>
                            ))}

                            {/* Add tag form trigger */}
                            {showAddTag ? (
                                <form onSubmit={handleAddTagSubmit} className="flex items-center gap-1.5">
                                    <input
                                        type="text"
                                        value={newTagInput}
                                        onChange={(e) => setNewTagInput(e.target.value)}
                                        placeholder="New tag..."
                                        className="bg-[#020617] border border-[#d0bcff]/40 text-white rounded-lg px-2.5 py-1 text-xs focus:outline-none w-24"
                                        autoFocus
                                        onBlur={() => setShowAddTag(false)}
                                    />
                                    <button type="submit" className="hidden">Add</button>
                                </form>
                            ) : (
                                <button
                                    onClick={() => setShowAddTag(true)}
                                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#d0bcff] text-xs text-[#cbc3d7] hover:text-white transition-all flex items-center gap-1"
                                >
                                    <span className="material-symbols-outlined text-xs">add</span>
                                    Add Tag
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Social connection account widgets */}
                    <div className="glass-panel p-6 rounded-3xl bg-[#171f33]/40">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#010101] flex items-center justify-center rounded-xl overflow-hidden border border-white/10">
                                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47V18c0 1.94-.66 3.82-1.88 5.32-1.22 1.5-2.92 2.58-4.78 3.06-1.86.48-3.84.44-5.68-.11-1.84-.55-3.52-1.63-4.74-3.08-1.22-1.45-1.95-3.26-2.09-5.14-.14-1.88.22-3.8.1-5.63 1.18 1.55 2.87 2.72 4.77 3.32 1.9.6 3.94.61 5.85.04 1.91-.57 3.59-1.78 4.75-3.41.05-1.58.01-3.16.02-4.74l-.02-.02c-1.3-.01-2.61.02-3.92-.01l-.01-4.01c1.3.01 2.62-.01 3.92.01l-.01 4z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">TikTok Account</h4>
                                    {isTikTokConnected ? (
                                        <p className="text-xs text-[#cbc3d7]/80">
                                            Connected as <span className="text-[#4cd7f6] font-semibold">@alex_creativelabs</span>
                                        </p>
                                    ) : (
                                        <p className="text-xs text-[#cbc3d7]/60">Disconnected</p>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={() => setIsTikTokConnected(!isTikTokConnected)}
                                className={`text-xs font-semibold ${isTikTokConnected ? 'text-[#FE2C55] hover:underline' : 'text-[#10B981] hover:underline'}`}
                            >
                                {isTikTokConnected ? 'Disconnect' : 'Connect Account'}
                            </button>
                        </div>
                    </div>

                    {/* CTA Posting actions */}
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handlePostNow}
                            disabled={isPosting}
                            className="w-full bg-black hover:bg-[#0d0d0d] text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-base border border-white/15 tiktok-hover relative overflow-hidden group transition-all duration-300 disabled:opacity-50"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                            {isPosting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    <span>Posting to TikTok...</span>
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-lg">send</span>
                                    <span>Post Now to TikTok</span>
                                </>
                            )}
                        </button>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => alert('Simulating dynamic calendar scheduler trigger... Choose date to automate TikTok uploads.')}
                                className="py-3.5 rounded-2xl glass-panel border border-white/10 font-bold text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2 hover:bg-white/5 active:scale-95 transition-all"
                            >
                                <span className="material-symbols-outlined text-base text-[#4cd7f6]">calendar_month</span>
                                Schedule
                            </button>
                            <button
                                onClick={() => alert('Draft saved successfully!')}
                                className="py-3.5 rounded-2xl glass-panel border border-white/10 font-bold text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2 hover:bg-white/5 active:scale-95 transition-all"
                            >
                                <span className="material-symbols-outlined text-base text-[#d0bcff]">save_as</span>
                                Save Draft
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* SUCCESS STATE OVERLAY FULL-SCREEN DIALOG MODAL */}
            {isPostedSuccess && (
                <div className="fixed inset-0 z-50 bg-[#0b1326]/95 backdrop-blur-2xl flex items-center justify-center p-6 select-none overflow-y-auto">
                    <div className="max-w-xl w-full text-center flex flex-col items-center gap-8 py-4 animate-in fade-in zoom-in duration-300">

                        {/* Success icon banner */}
                        <div className="w-24 h-24 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center mb-2 relative">
                            <span className="material-symbols-outlined text-5xl material-symbols-filled text-[#10B981]">
                                check_circle
                            </span>
                            <div className="absolute inset-0 rounded-full animate-ping bg-[#10B981]/10"></div>
                        </div>

                        <div className="space-y-2.5">
                            <h2 className="font-display font-extrabold text-4xl text-white">{"Success! It's Live."}</h2>
                            <p className="text-[#cbc3d7] text-sm leading-relaxed max-w-sm mx-auto">
                                Your AI clip has been compiled, formatted, and posted to your TikTok profile feed.
                            </p>
                        </div>

                        {/* Rendered post card meta */}
                        <div className="w-full p-5 glass-panel rounded-3xl flex items-center justify-between bg-[#171f33]/40 border-white/10">
                            <div className="flex items-center gap-4">
                                <img
                                    className="w-16 h-16 rounded-xl object-cover border border-white/10"
                                    alt="Confetti Thumbnail Post"
                                    src={successPostPreview}
                                    referrerPolicy="no-referrer"
                                />
                                <div className="text-left min-w-0">
                                    <p className="font-bold text-white text-sm truncate">Video Posted</p>
                                    <p className="text-xs text-[#4cd7f6] truncate font-mono">tiktok.com/@alex_creativelabs...</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    alert('Opening simulated TikTok live page...');
                                }}
                                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white hover:text-[#4cd7f6] transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">open_in_new</span>
                            </button>
                        </div>

                        {/* Sharing accents */}
                        <div className="flex items-center justify-center gap-5">
                            <p className="font-mono text-[10px] text-[#cbc3d7]/60 uppercase tracking-wider font-semibold">
                                Share with team:
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => alert('Link copied to clipboard!')}
                                    className="material-symbols-outlined p-3 rounded-full glass-panel cursor-pointer hover:bg-[#d0bcff]/20 hover:text-[#d0bcff] transition-all text-sm"
                                >
                                    link
                                </button>
                                <button
                                    onClick={() => alert('Opening mail share composer...')}
                                    className="material-symbols-outlined p-3 rounded-full glass-panel cursor-pointer hover:bg-[#4cd7f6]/20 hover:text-[#4cd7f6] transition-all text-sm"
                                >
                                    mail
                                </button>
                                <button
                                    onClick={() => alert('Triggering native share menu...')}
                                    className="material-symbols-outlined p-3 rounded-full glass-panel cursor-pointer hover:bg-[#FE2C55]/20 hover:text-[#FE2C55] transition-all text-sm"
                                >
                                    share
                                </button>
                            </div>
                        </div>

                        {/* Footer Modal Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
                            <button
                                onClick={() => {
                                    setIsPostedSuccess(false);
                                    setIsPlaying(false);
                                    onPageChange('processing');
                                    alert('Loading next AI-generated clip in the cue list!');
                                }}
                                className="flex-grow py-4 rounded-2xl bg-gradient-to-r from-[#d0bcff] to-[#4cd7f6] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-base">play_circle</span>
                                Next Video in Queue
                            </button>

                            <button
                                onClick={() => {
                                    setIsPostedSuccess(false);
                                    onReturnToDashboard();
                                }}
                                className="flex-grow py-4 rounded-2xl glass-panel text-white font-bold text-xs uppercase tracking-wider hover:bg-white/5 active:scale-95 transition-all"
                            >
                                Return to Dashboard
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}