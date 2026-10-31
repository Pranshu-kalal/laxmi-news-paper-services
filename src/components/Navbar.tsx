import React, { useState, useEffect } from 'react';
import { BUSINESS_INFO } from '../data/newspaperData';
import { Phone, MessageCircle, Menu, X, Clock, Send } from 'lucide-react';

interface NavbarProps {
  onSubscribeClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSubscribeClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Newspapers', href: '#newspapers' },
    { label: 'Plans & Pricing', href: '#subscription' },
    { label: 'Template Distribution', href: '#template-distribution' },
    { label: '6 AM Promise', href: '#cinematic-clock' },
    { label: 'Why Us', href: '#why-choose-us' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#060b19]/90 backdrop-blur-md border-b border-white/10 shadow-xl py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-amber-500 to-red-700 flex items-center justify-center text-white font-black font-cinzel text-lg shadow-lg border border-amber-400/30 group-hover:scale-105 transition-transform">
                L
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold font-cinzel tracking-wider text-white leading-tight">
                  LAXMI NEWSPAPER
                </span>
                <span className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold font-mono">
                  Services • Naroda & Nikol
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-6 text-xs text-slate-300 font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-amber-300 transition-colors uppercase tracking-wider text-[11px]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Right CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="px-3.5 py-2 rounded-xl glass-panel hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition-all"
                title="Call Prakash Bhai Kalal"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono">{BUSINESS_INFO.phone}</span>
              </a>

              <a
                href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
                  'Hello Prakash Bhai, I would like to enquire about Laxmi Newspaper Services.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-900/20"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden md:inline">WhatsApp</span>
              </a>

              <button
                onClick={onSubscribeClick}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold tracking-wider transition-all shadow-md shadow-red-900/30 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Subscribe</span>
                <span className="text-amber-300">→</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl glass-panel text-slate-200 border border-white/10 hover:text-white cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-[#070d1e] border-b border-white/10 px-4 py-6 shadow-2xl animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                <Clock className="w-4 h-4" />
                <span>Prompt 6:00 AM Morning Delivery in Naroda & Nikol</span>
              </div>

              <div className="space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-slate-200 hover:bg-white/5 hover:text-amber-300 text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onSubscribeClick();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-sm tracking-wide text-center block shadow-lg cursor-pointer"
                >
                  START SUBSCRIPTION (₹180/mo)
                </button>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="py-2.5 rounded-xl glass-panel text-center text-xs font-semibold text-white flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href={BUSINESS_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 rounded-xl bg-emerald-600 text-center text-xs font-semibold text-white flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Floating Sticky Mobile Quick Action Bar (Bottom of screen on mobile) */}
      <div className="sm:hidden fixed bottom-3 left-3 right-3 z-40">
        <div className="glass-panel p-2 rounded-2xl border border-amber-400/30 shadow-2xl flex items-center gap-2 bg-[#060b19]/95 backdrop-blur-lg">
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/10"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Call</span>
          </a>

          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={onSubscribeClick}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-md shadow-red-950 cursor-pointer"
          >
            <Send className="w-3 h-3" />
            <span>Subscribe</span>
          </button>
        </div>
      </div>
    </>
  );
};
