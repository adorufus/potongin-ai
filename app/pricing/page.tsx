'use client'

import { useState } from 'react';
import { FAQ_ITEMS, TESTIMONIALS } from '../data';

interface PricingViewProps {
  onSelectPlan: (plan: 'Free' | 'Standard' | 'Pro') => void;
  currentPlan: string;
}

export default function PricingView({ onSelectPlan, currentPlan }: PricingViewProps) {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  const handleToggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  const handleSelectPlanClick = (plan: 'Free' | 'Pro') => {
    if (plan === 'Free') {
      onSelectPlan('Free');
      alert('Switched to Free Plan (Hobbyist mode)');
    } else {
      onSelectPlan('Pro');
      alert('Welcome to Creator Pro! Unlimited AI video clipping and viral hook prediction activated.');
    }
  };

  return (
    <div className="flex flex-col gap-16 w-full max-w-6xl mx-auto py-8 select-none">
      
      {/* Hero Header block */}
      <section className="text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#171f33] border border-white/10 text-[#d0bcff] font-mono text-[10px] uppercase font-bold tracking-widest mb-4">
          PRICING PLANS
        </span>
        <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight leading-tight">
          Choose Your Plan for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d0bcff] to-[#4cd7f6] drop-shadow">
            Viral Success
          </span>
        </h2>
        
        {/* Billing Toggle slider */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className={`text-sm ${!isAnnual ? 'text-white font-bold' : 'text-[#cbc3d7]'}`}>
            Monthly
          </span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 bg-[#171f33] rounded-full p-1 relative transition-colors border border-white/10 outline-none"
            title="Toggle annual billing discount"
          >
            <div 
              className={`w-5 h-5 bg-[#d0bcff] rounded-full transition-transform duration-300 transform ${
                isAnnual ? 'translate-x-7' : 'translate-x-0'
              }`}
            ></div>
          </button>
          <span className={`text-sm flex items-center gap-2 ${isAnnual ? 'text-white font-bold' : 'text-[#cbc3d7]'}`}>
            Yearly 
            <span className="text-[9px] bg-[#10B981]/20 text-[#10B981] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Save 25%
            </span>
          </span>
        </div>
      </section>

      {/* Pricing options Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mt-4">
        
        {/* Free plan */}
        <div className="glass-panel p-8 rounded-3xl flex flex-col hover:border-[#d0bcff]/30 transition-all duration-300 bg-[#171f33]/20 relative">
          <div className="mb-8">
            <h3 className="font-display font-bold text-2xl text-white mb-2">Free</h3>
            <p className="text-xs text-[#cbc3d7] leading-relaxed">
              Perfect for hobbyists and content creators starting out.
            </p>
            <div className="mt-6 flex items-baseline gap-1.5">
              <span className="text-4xl font-extrabold text-white font-display">$0</span>
              <span className="text-xs text-[#cbc3d7]">/mo</span>
            </div>
          </div>
          
          <ul className="space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-3 text-xs text-[#cbc3d7]">
              <span className="material-symbols-outlined text-[#10B981] text-lg material-symbols-filled">check_circle</span>
              <span>3 processed clips / mo</span>
            </li>
            <li className="flex items-center gap-3 text-xs text-[#cbc3d7]">
              <span className="material-symbols-outlined text-[#10B981] text-lg material-symbols-filled">check_circle</span>
              <span>Basic AI analytics scan</span>
            </li>
            <li className="flex items-center gap-3 text-xs text-[#cbc3d7]">
              <span className="material-symbols-outlined text-[#10B981] text-lg material-symbols-filled">check_circle</span>
              <span>Watermarked clip exports</span>
            </li>
          </ul>

          <button 
            onClick={() => handleSelectPlanClick('Free')}
            className={`w-full py-4 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all active:scale-95 ${
              currentPlan === 'Free'
                ? 'border-[#10B981] text-[#10B981] bg-[#10B981]/5 cursor-default'
                : 'border-white/10 hover:bg-[#171f33]/80 text-white'
            }`}
          >
            {currentPlan === 'Free' ? 'Current Active' : 'Get Started'}
          </button>
        </div>

        {/* Creator Pro - MOST POPULAR Recommended */}
        <div className="pro-gradient p-8 rounded-3xl flex flex-col relative transform lg:scale-[1.04] z-10 text-white">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black font-mono text-[9px] px-4 py-1.5 rounded-full shadow-2xl font-bold tracking-widest uppercase">
            MOST POPULAR
          </div>
          
          <div className="mb-8">
            <h3 className="font-display font-bold text-2xl mb-2">Creator Pro</h3>
            <p className="text-xs text-white/80 leading-relaxed">
              Everything you need to grow and scale on social channels.
            </p>
            <div className="mt-6 flex items-baseline gap-1.5">
              <span className="text-4xl font-extrabold font-display">
                {isAnnual ? '$29' : '$39'}
              </span>
              <span className="text-xs text-white/80">/mo</span>
            </div>
            <p className="text-[10px] font-mono text-white/60 mt-1 uppercase tracking-wider font-bold">
              {isAnnual ? 'BILLED ANNUALLY ($348)' : 'BILLED MONTHLY'}
            </p>
          </div>

          <ul className="space-y-4 mb-10 flex-grow text-white">
            <li className="flex items-center gap-3 text-xs">
              <span className="material-symbols-outlined text-white text-lg material-symbols-filled animate-pulse">bolt</span>
              <span className="font-bold">Unlimited AI video clipping</span>
            </li>
            <li className="flex items-center gap-3 text-xs">
              <span className="material-symbols-outlined text-white text-lg material-symbols-filled">stars</span>
              <span className="font-bold">Viral Hook Retention Prediction (90%+)</span>
            </li>
            <li className="flex items-center gap-3 text-xs opacity-95">
              <span className="material-symbols-outlined text-white text-lg">hd</span>
              <span>4K export, No watermarks</span>
            </li>
            <li className="flex items-center gap-3 text-xs opacity-95">
              <span className="material-symbols-outlined text-white text-lg">closed_caption</span>
              <span>Auto-captions &amp; Dynamic Subtitles</span>
            </li>
            <li className="flex items-center gap-3 text-xs opacity-95">
              <span className="material-symbols-outlined text-white text-lg">calendar_today</span>
              <span>TikTok / YT shorts auto-scheduler</span>
            </li>
          </ul>

          <button 
            onClick={() => handleSelectPlanClick('Pro')}
            className={`w-full py-4 bg-white text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all ${
              currentPlan === 'Pro' ? 'ring-2 ring-white/50 bg-white/90' : ''
            }`}
          >
            {currentPlan === 'Pro' ? 'Your Active Plan' : 'Go Viral Now'}
          </button>
        </div>

        {/* Enterprise */}
        <div className="glass-panel p-8 rounded-3xl flex flex-col hover:border-[#4cd7f6]/30 transition-all duration-300 bg-[#171f33]/20 relative">
          <div className="mb-8">
            <h3 className="font-display font-bold text-2xl text-white mb-2">Enterprise</h3>
            <p className="text-xs text-[#cbc3d7] leading-relaxed">
              Custom features tailored for scaling agencies and media rooms.
            </p>
            <div className="mt-6 flex items-baseline gap-1.5">
              <span className="text-4xl font-extrabold text-white font-display">Custom</span>
            </div>
          </div>

          <ul className="space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-3 text-xs text-[#cbc3d7]">
              <span className="material-symbols-outlined text-[#4cd7f6] text-lg material-symbols-filled">groups</span>
              <span>Bulk team processing &amp; collaborative editor</span>
            </li>
            <li className="flex items-center gap-3 text-xs text-[#cbc3d7]">
              <span className="material-symbols-outlined text-[#4cd7f6] text-lg material-symbols-filled">api</span>
              <span>Full developer API programmatic access</span>
            </li>
            <li className="flex items-center gap-3 text-xs text-[#cbc3d7]">
              <span className="material-symbols-outlined text-[#4cd7f6] text-lg material-symbols-filled">support_agent</span>
              <span>Dedicated customer account manager</span>
            </li>
            <li className="flex items-center gap-3 text-xs text-[#cbc3d7]">
              <span className="material-symbols-outlined text-[#4cd7f6] text-lg material-symbols-filled">security</span>
              <span>SSO &amp; Custom enterprise security rules</span>
            </li>
          </ul>

          <button 
            onClick={() => alert('Contacting potongin.ai Enterprise Sales Department... We will be in touch shortly.')}
            className="w-full py-4 rounded-xl border border-[#4cd7f6]/30 hover:bg-[#4cd7f6]/10 text-white font-bold text-xs uppercase tracking-wider transition-colors active:scale-95"
          >
            Contact Sales
          </button>
        </div>

      </section>

      {/* Social Proof / Trust logos */}
      <section className="text-center mt-12">
        <p className="font-mono text-[10px] text-[#cbc3d7] mb-8 tracking-widest uppercase font-bold">
          Trusted by 10,000+ top content creators and digital brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
          <span className="h-8 px-4 bg-white/5 border border-white/10 rounded flex items-center justify-center font-bold text-xs text-white">YOUTUBE SHORTS</span>
          <span className="h-8 px-4 bg-white/5 border border-white/10 rounded flex items-center justify-center font-bold text-xs text-white">TIKTOK CREATOR LABS</span>
          <span className="h-8 px-4 bg-white/5 border border-white/10 rounded flex items-center justify-center font-bold text-xs text-white">INSTAGRAM REELS</span>
          <span className="h-8 px-4 bg-white/5 border border-white/10 rounded flex items-center justify-center font-bold text-xs text-white">TWITCH CLIPS</span>
          <span className="h-8 px-4 bg-white/5 border border-white/10 rounded flex items-center justify-center font-bold text-xs text-white">SNAP SHORTS</span>
        </div>

        {/* Double Portrait Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 text-left">
          {TESTIMONIALS.map((testi, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-3xl bg-[#171f33]/40 border-white/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#171f33] border border-[#d0bcff]/30 flex-shrink-0">
                  <img 
                    className="w-full h-full object-cover" 
                    alt={testi.name} 
                    src={testi.imageUrl}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{testi.name}</p>
                  <p className="text-[11px] text-[#cbc3d7]/70 font-mono">{testi.role}</p>
                </div>
              </div>
              <p className="text-sm text-[#cbc3d7] leading-relaxed italic">
                {testi.quote}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Accordion FAQ drawers */}
      <section className="max-w-3xl mx-auto w-full mt-12 pb-12">
        <h3 className="font-display font-bold text-2xl text-center text-white mb-10">
          Frequently Asked Questions
        </h3>
        
        <div className="space-y-4">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div 
                key={faq.id} 
                className="glass-panel rounded-2xl overflow-hidden bg-[#171f33]/20 border-white/5"
              >
                <button 
                  onClick={() => handleToggleFaq(faq.id)}
                  className="w-full px-8 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-all outline-none"
                >
                  <span className="font-bold text-white text-sm md:text-base leading-snug">
                    {faq.question}
                  </span>
                  <span className={`material-symbols-outlined text-[#cbc3d7] transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}>
                    expand_more
                  </span>
                </button>
                
                {/* Expandable sliding drawer container */}
                <div 
                  className={`px-8 transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-xs md:text-sm text-[#cbc3d7]/85 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
