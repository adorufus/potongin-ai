'use client'

import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface AuthViewProps {
  initialMode: 'login' | 'signup';
  onSuccess: () => void;
  onBackToLanding: () => void;
}

export default function AuthView({ initialMode, onSuccess, onBackToLanding }: AuthViewProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDevHelper, setShowDevHelper] = useState(false);
  const [currentOrigin, setCurrentOrigin] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        setCurrentOrigin(window.location.origin);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleTikTokLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/tiktok/auth-url');
      if (!response.ok) {
        throw new Error('Failed to retrieve TikTok authorization URL from server.');
      }
      const data = await response.json();
      if (!data.url) {
        throw new Error('Missing authorization URL in response.');
      }

      // Calculate center coordinates
      const width = 580;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        data.url,
        'tiktok_oauth',
        `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes,scrollbars=yes`
      );

      if (!popup) {
        throw new Error('Popup blocked! Please allow popups for this site to sign in with TikTok.');
      }
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : 'An error occurred during TikTok connection.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased flex flex-col justify-center items-center p-6 relative">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-[#8b5cf6]/5 blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-[#06b6d4]/5 blur-[150px]"></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md flex flex-col gap-6 z-10">
        {/* Auth Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0b1326]/40 border border-white/5 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-2xl shadow-2xl relative"
        >
          {/* Header branding */}
          <div className="text-center flex flex-col items-center gap-2 mb-8">
            <span className="font-display text-4xl font-black tracking-tighter text-[#d0bcff]">
              potongin.ai
            </span>
            <p className="text-xs text-[#cbc3d7]/60 font-mono tracking-widest uppercase font-semibold">
              AI Clip Workspace
            </p>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-xl font-bold font-display text-white mb-2">
              Connect Your TikTok Account
            </h2>
            <p className="text-xs text-[#cbc3d7] leading-relaxed max-w-xs mx-auto">
              Authorize potongin.ai to import, analyze, and publish your viral clip highlights directly to your feed.
            </p>
          </div>

          {/* Error messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-xs text-red-200">
              <span className="material-symbols-outlined text-sm text-red-400 mt-0.5">error</span>
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {/* TikTok Login Button */}
          <button
            onClick={handleTikTokLogin}
            disabled={isLoading}
            className="w-full py-4 bg-black border border-white/10 hover:border-[#FE2C55]/50 hover:bg-[#0a0a0a] rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-95 cursor-pointer relative overflow-hidden group shadow-xl"
          >
            {/* TikTok Accent border glows */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#25F4EE] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#FE2C55] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                {/* Custom Vector TikTok Logo style using HTML elements for modern crisp rendering */}
                <div className="w-5 h-5 flex items-center justify-center relative bg-white rounded-full">
                  <span className="text-black font-black text-xs font-sans tracking-tighter">d</span>
                </div>
                <span className="text-white font-extrabold text-sm tracking-wide">
                  Continue with TikTok
                </span>
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-[#cbc3d7]/40 font-mono mt-6">
            By connecting, you agree to our Terms and Privacy Policy.
          </p>
        </motion.div>

        {/* Developer Helper Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0b1326]/20 border border-white/5 rounded-2xl p-4 md:p-5 backdrop-blur-md"
        >
          <button
            onClick={() => setShowDevHelper(!showDevHelper)}
            className="w-full flex items-center justify-between text-left font-mono text-[11px] font-bold text-[#cbc3d7] hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-[#4cd7f6]">settings</span>
              <span>OAUTH DEVELOPMENT HELPER</span>
            </div>
            <span className="material-symbols-outlined text-sm transition-transform duration-200">
              {showDevHelper ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            </span>
          </button>

          {showDevHelper && (
            <div className="mt-4 space-y-4 text-xs text-[#cbc3d7]/80 font-mono border-t border-white/5 pt-4">
              <div>
                <p className="text-white font-bold mb-1">1. TikTok Callback Redirect URL:</p>
                <div className="bg-[#020617] p-2.5 rounded-xl border border-white/5 select-all break-all text-[11px] font-semibold text-[#4cd7f6]">
                  {currentOrigin ? `${currentOrigin}/api/tiktok/callback` : 'Loading...'}
                </div>
                <p className="text-[10px] text-[#cbc3d7]/40 mt-1">
                  Configure this exact redirect URI in your TikTok Developer portal app settings.
                </p>
              </div>

              <div>
                <p className="text-white font-bold mb-1">2. Environment Variables Checklist:</p>
                <ul className="space-y-1 pl-1 text-[11px]">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#10B981]">check_circle</span>
                    <span>TIKTOK_CLIENT_KEY</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#10B981]">check_circle</span>
                    <span>TIKTOK_CLIENT_SECRET</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#10B981]">check_circle</span>
                    <span>TIKTOK_REDIRECT_URI</span>
                  </li>
                </ul>
                <p className="text-[10px] text-[#cbc3d7]/40 mt-1">
                  Ensure these are defined in the Settings tab of Google AI Studio.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
