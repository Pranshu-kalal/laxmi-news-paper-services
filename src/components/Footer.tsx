import React from 'react';
import { BUSINESS_INFO } from '../data/newspaperData';
import { Phone, MessageCircle, MapPin, Clock, ArrowUp, Newspaper, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#040814] text-white border-t border-navy-border pt-20 pb-12 overflow-hidden">
      {/* Background Subtle Stamp */}
      <div className="absolute right-10 -bottom-10 opacity-5 pointer-events-none select-none text-[180px] font-cinzel font-black">
        LAXMI
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-white font-black font-cinzel text-lg shadow-lg">
                L
              </div>
              <span className="text-2xl font-bold font-cinzel tracking-wider text-white">
                LAXMI NEWSPAPER SERVICES
              </span>
            </div>

            <p className="text-slate-300 font-editorial italic text-base leading-relaxed">
              &ldquo;Your Trusted Partner for Every Morning.&rdquo;
            </p>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Serving Ahmedabad with uninterrupted daily home newspaper delivery and high-impact business template distribution. Founded and managed by Prakash Bhai Kalal.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>6:00 AM Daily Dispatch</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Naroda & Nikol, Ahmedabad</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold font-cinzel text-amber-300 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <a href="#hero" className="hover:text-amber-300 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-300 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#newspapers" className="hover:text-amber-300 transition-colors">
                  Newspapers
                </a>
              </li>
              <li>
                <a href="#subscription" className="hover:text-amber-300 transition-colors">
                  Subscription
                </a>
              </li>
              <li>
                <a href="#template-distribution" className="hover:text-amber-300 transition-colors">
                  Template Distribution
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-300 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact Links */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold font-cinzel text-amber-300 uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Founder:</span>
                <span className="text-white font-semibold">Prakash Bhai Kalal</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="font-mono text-white hover:text-amber-300 transition-colors font-medium"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-emerald-300 transition-colors font-medium"
                >
                  WhatsApp: +91 9574371328
                </a>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  Naroda & Nikol, Ahmedabad, Gujarat (Dedicated 6:00 AM Delivery Routes)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Laxmi Newspaper Services. All rights reserved. Prakash Bhai Kalal.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-navy-card hover:bg-slate-800 text-slate-300 border border-white/10 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Back to Top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
