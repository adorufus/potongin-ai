'use client'

import { useState } from 'react';
import Link from 'next/link';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
  plan: 'Free' | 'Standard' | 'Pro';
  onNewProject: () => void;
  onLogout?: () => void;
  tiktokUser?: { username: string; display_name: string; avatar_url: string } | null;
}

export default function Sidebar({ activePage, onPageChange, plan, onNewProject, onLogout, tiktokUser }: SidebarProps) {

  const profileImage = tiktokUser?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqCeJBl-q00DpbWH7Ga7qsytrMS9QliGNlHqn_pPlmmD3coz7lehjW4IltWTUN3rvVi-OpKkYrWxWz5iqZsZRxL2-8KTqHkCgP-bmnMpeEgxZkr547m4UewGtikpDSnp2y9fMOvb9z5i8D41jnaFgLSkA1TbJMqhTkeKvV0BxrCrxvHCC5hJ3uQWikDUYq84fTO0EQRdtEyXgUhSzKoF3KxSSsC_ZIi3nVP1BY-VoJlYV_tBhpoFelYqZWd0vb6tnw7mxUUN9223Vr';
  const [userName] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('potongin_user_name') ?? 'Undefined Username';
    }
    return 'Oktaviano';
  });

  const menuItems = [
    { id: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: '/workspace', label: 'Projects', icon: 'video_library' },
    { id: '/processing', label: 'AI Queue', icon: 'auto_awesome' },
    // { id: 'pricing', label: 'Templates', icon: 'layers' },
  ] as const;

  return (
    <aside className="fixed top-0 left-0 h-full w-[280px] border-r border-white/10 backdrop-blur-xl bg-sidebar-dark flex flex-col p-6 z-50 gap-8">
      <div className="flex flex-col gap-1 cursor-pointer">
        <span className="font-display text-3xl font-extrabold text-[#d0bcff] tracking-tighter">
          potongin.ai
        </span>
        <span className="text-[#cbc3d7] font-mono text-[10px] tracking-widest font-semibold">
          CREATOR PRO
        </span>
      </div>
      <nav className="flex flex-col gap-2 flex-grow overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = activePage === item.id
          return (
            <Link                                                                                                                                 
              key={item.id}
              id={`sidebar-nav-${item.id}`}
              href={item.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 active:scale-95 text-sm font-medium ${isActive
                ? 'bg-[#a078ff] text-[#340080] font-bold shadow-lg shadow-[#8b5cf6]/20'
                : 'text-[#cbc3d7] hover:text-white hover:bg-white/5'
                }`}
            >
              <span className={`material-symbols-outlined ${isActive ? 'material-symbols-filled' : ''}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          )
        })}
        <Link
          href="/pricing"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 active:scale-95 text-sm font-medium ${activePage === '/pricing'
              ? 'bg-white/10 text-white font-bold'
              : 'text-[#cbc3d7] hover:text-white hover:bg-white/5'
            }`}
        >
          <span className="material-symbols-outlined">settings</span>
          Settings
        </Link>

        <div className="mt-auto pt-4">
          {/* Upgrade Alert Banner (Only shown if standard or free) */}
          {/* {plan !== 'Pro' ? (
            <div className="bg-[#a078ff]/10 p-4 rounded-xl border border-[#a078ff]/20 mb-4">
              <p className="text-sm font-semibold text-[#d0bcff] mb-1">Upgrade Now</p>
              <p className="text-xs text-[#cbc3d7] mb-3 leading-relaxed">
                Unlock Viral Hook Prediction and 4K exports.
              </p>
              <button
                onClick={() => onPageChange('pricing')}
                className="w-full py-2 bg-[#d0bcff] hover:bg-[#a078ff] text-[#3c0091] font-bold rounded-lg text-xs transition-colors"
              >
                Upgrade
              </button>
            </div>
          ) : (
            <div className="bg-[#10B981]/10 p-4 rounded-xl border border-[#10B981]/20 mb-4 text-center">
              <p className="text-sm font-bold text-[#10B981] flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-sm">verified</span> Pro Active
              </p>
              <p className="text-[11px] text-[#cbc3d7] mt-1">Unlimited clipping active</p>
            </div>
          )} */}
          <button
            onClick={onNewProject}
            className="w-full bg-[#d0bcff] hover:bg-[#a078ff] text-[#3c0091] py-3.5 rounded-xl font-bold shadow-lg shadow-[#8b5cf6]/15 hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-wider"
          >
            New Project
          </button>
        </div>
      </nav>
      <div className="flex items-center gap-3 p-4 glass-panel rounded-xl mt-auto">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#d0bcff]/30 bg-[#a078ff] flex items-center justify-center flex-shrink-0">
          <img
            className="w-full h-full object-cover"
            alt={tiktokUser?.display_name || userName}
            src={profileImage}
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="font-bold text-sm text-white truncate animate-in fade-in duration-300" title={tiktokUser?.display_name || userName}>
            {tiktokUser?.display_name || userName}
          </span>
          {tiktokUser?.username ? (
            <span className="text-[11px] text-[#4cd7f6] font-mono truncate animate-in slide-in-from-bottom-1 duration-300">
              @{tiktokUser.username}
            </span>
          ) : (
            <span className="text-xs text-[#cbc3d7] font-mono">
              {plan} Plan
            </span>
          )}
        </div>
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#cbc3d7]/60 hover:text-red-400 hover:bg-white/5 transition-all cursor-pointer flex-shrink-0"
            title="Log out"
          >
            <span className="material-symbols-outlined text-base">logout</span>
          </button>
        )}
      </div>
    </aside>
  )
}