import { useState } from "react";
import Link from "next/link";

interface HeaderProps {
    activePage: string;
    onPageChange: (page: string) => void;
    onExportClick?: () => void;
}

export default function Header({activePage, onPageChange, onExportClick }: HeaderProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, text: 'Clip "Viral Hook: The Big Reveal" processed successfully!', time: '2m ago' },
        { id: 2, text: 'AI is tracking speaker on your new upload.', time: '12m ago' }
    ]);

    const handleClearNotifications = () => {
        setNotifications([]);
    };

    return (
        <header className="fixed top-0 right-0 w-[calc(100%-280px)] h-16 border-b border-white/10 backdrop-blur-md bg-header-dark/80 flex items-center justify-between px-8 z-40">
            <div className="flex-1 max-w-md">
                {activePage === '/dashboard' ? (
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#cbc3d7]">
                            search
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#020617] border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm text-[#dae2fd] placeholder-[#cbc3d7]/50 focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6] transition-all outline-none"
                            placeholder="Search projects..."
                        />
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <h2 className="font-display font-bold text-lg text-white capitalize">
                            {activePage === "/processing" || activePage === "processing" ? "AI Processing Queue" : activePage === "/workspace" || activePage === "workspace" ? "AI Clip workspace" : activePage.replace(/^\//, "")}
                        </h2>
                        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#4cd7f6] uppercase tracking-wider">
                            LIVE
                        </span>
                    </div>
                )}
            </div>

            {/* Top Right Quick actions */}
            <div className="flex items-center gap-6">
                {/* <div className="hidden md:flex gap-6 items-center font-mono text-[11px] text-[#cbc3d7] uppercase font-semibold">
                    <button
                        onClick={() => onPageChange('pricing')}
                        className="hover:text-[#4cd7f6] transition-all cursor-pointer"
                    >
                        Docs
                    </button>
                    <button
                        onClick={() => onPageChange('pricing')}
                        className="hover:text-[#4cd7f6] transition-all cursor-pointer"
                    >
                        Pricing
                    </button>
                    <button
                        onClick={() => onPageChange('pricing')}
                        className="hover:text-[#4cd7f6] transition-all cursor-pointer"
                    >
                        Community
                    </button>
                </div> */}

                <div className="flex items-center gap-4 border-l border-white/10 pl-6 relative">
                    {/* Notification bell trigger */}
                    <button
                        onClick={() => setShowNotification(!showNotification)}
                        className="relative p-2 text-[#cbc3d7] hover:text-[#dae2fd] transition-colors focus:outline-none"
                    >
                        <span className="material-symbols-outlined">notifications</span>
                        {notifications.length > 0 && (
                            <span className="absolute top-2 right-2 w-2 h-2 bg-[#FE2C55] rounded-full"></span>
                        )}
                    </button>

                    {/* Notifications Dropdown Panel */}
                    {showNotification && (
                        <div className="absolute right-24 top-12 w-80 bg-[#171f33] border border-white/10 rounded-2xl p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Notifications</span>
                                {notifications.length > 0 && (
                                    <button
                                        onClick={handleClearNotifications}
                                        className="text-[10px] text-[#4cd7f6] hover:underline"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map((n) => (
                                        <div key={n.id} className="p-2 hover:bg-white/5 rounded-lg text-xs leading-relaxed transition-colors border border-white/5">
                                            <p className="text-white">{n.text}</p>
                                            <span className="text-[10px] text-[#cbc3d7]/60 font-mono mt-1 block">{n.time}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-6 text-center text-[#cbc3d7]/50 text-xs">
                                        No new notifications.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Export Action */}
                    <Link
                        href="/export"
                        className="bg-[#d0bcff] hover:bg-[#a078ff] text-[#3c0091] px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider hover:glow-purple transition-all active:scale-95 cursor-pointer flex items-center gap-1"
                    >
                        <span className="material-symbols-outlined text-sm">publish</span>
                        Export
                    </Link>
                </div>
            </div>
        </header>
    )
}