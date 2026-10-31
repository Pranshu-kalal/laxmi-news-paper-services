import React from 'react';
import { WHY_CHOOSE_ITEMS } from '../data/newspaperData';
import { Award, Clock, Calendar, Newspaper, Megaphone, Video, Headset, CheckCircle2 } from 'lucide-react';

const ICON_MAP = [
  Award,       // 01 On-Time Morning Delivery
  Clock,       // 02 Delivery at 6:00 AM
  Calendar,    // 03 Convenient Monthly Subscription
  Newspaper,   // 04 Multiple Newspaper Choices
  Megaphone,   // 05 Template Distribution Service
  Video,       // 06 Photo and Video Additions
  Headset,     // 07 Direct Customer Support
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-choose-us" className="relative py-24 bg-[#080e21] border-b border-navy-border overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>The Gold Standard</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-cinzel mb-4">
            Why Choose Laxmi Newspaper Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-amber-400 to-red-600 mx-auto rounded-full mb-6" />
          <p className="text-slate-300 font-editorial text-lg italic max-w-2xl mx-auto">
            Seven reasons Ahmedabad families, professionals, and local business owners trust Prakash Bhai Kalal every morning.
          </p>
        </div>

        {/* 7 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {WHY_CHOOSE_ITEMS.map((item, idx) => {
            const Icon = ICON_MAP[idx] || Award;
            const isWide = idx === 6; // Center the 7th card or span

            return (
              <div
                key={item.number}
                className={`group relative rounded-2xl p-6 sm:p-8 glass-card border border-white/10 hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10 ${
                  isWide ? 'md:col-span-2 lg:col-span-3 lg:max-w-xl lg:mx-auto' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-red-500/10 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-2xl font-black text-white/20 group-hover:text-amber-400/40 transition-colors">
                    {item.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white font-cinzel mb-2 group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] text-amber-300 font-medium">
                  <span>Guaranteed Excellence</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-300">Ahmedabad, Gujarat</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
