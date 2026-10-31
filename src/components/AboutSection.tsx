import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/newspaperData';
import { Award, Clock, MapPin, UserCheck, ShieldCheck, CheckCircle2, Maximize2, X } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <section id="about" className="relative py-24 bg-[#080e21] border-t border-b border-navy-border overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Heritage of Reliability</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-cinzel mb-4">
            Your Trusted Morning Newspaper Partner
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-amber-400 to-red-600 mx-auto rounded-full mb-6" />
          <p className="text-lg text-slate-300 font-editorial italic max-w-2xl mx-auto leading-relaxed">
            &ldquo;Laxmi Newspaper Services, led by Prakash Bhai Kalal, provides convenient newspaper subscription and daily home delivery services. We focus on timely delivery, customer convenience and reliable service.&rdquo;
          </p>
        </div>

        {/* Two Column Layout: Founder & Heritage Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto">
          {/* Left Column: Visual Showcase featuring business artwork */}
          <div className="lg:col-span-6">
            <div className="relative group rounded-2xl overflow-hidden glass-card p-3 shadow-2xl border border-amber-500/20">
              <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-[#0c1427]">
                <img
                  src={BUSINESS_INFO.heritageDioramaImage}
                  alt="Laxmi Newspaper Services Brand Heritage Showcase"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                  onClick={() => setIsImageOpen(true)}
                  loading="lazy"
                />
                <button
                  onClick={() => setIsImageOpen(true)}
                  className="absolute bottom-3 right-3 p-2.5 rounded-lg bg-black/70 hover:bg-black/90 text-amber-300 border border-amber-400/30 transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                  title="Expand Brand Diorama"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Enlarge Artwork</span>
                </button>
              </div>

              <div className="pt-4 px-2 pb-2">
                <div className="flex items-center justify-between text-xs text-slate-300 border-b border-white/10 pb-2 mb-2">
                  <span className="font-cinzel text-amber-300 font-bold tracking-wider">
                    ESTABLISHED TRADITION
                  </span>
                  <span>Naroda & Nikol, Ahmedabad</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Laxmi Newspaper Services print logistics diorama: embodying Goddess Laxmi&apos;s auspicious morning blessings, precision printing rolls, and punctual distribution across Naroda & Nikol.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Profile & Core Commitments */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border-l-4 border-l-amber-500 shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs text-amber-400 uppercase tracking-widest font-semibold block mb-1">
                    Founder & Managing Director
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-cinzel">
                    Prakash Bhai Kalal
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300">
                  <UserCheck className="w-6 h-6" />
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Under Prakash Bhai Kalal&apos;s personal oversight, Laxmi Newspaper Services provides dedicated morning newspaper delivery and pamphlet distribution across Naroda & Nikol, Ahmedabad. With an unwavering 6:00 AM standard, every customer enjoys prompt morning service, all papers at flat ₹180/month, and direct owner accountability.
              </p>

              {/* Founder Badges */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <div className="text-xs text-slate-400">Strict Punctuality</div>
                    <div className="text-sm font-bold text-white">6:00 AM Every Day</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-red-400 shrink-0" />
                  <div>
                    <div className="text-xs text-slate-400">Service Coverage</div>
                    <div className="text-sm font-bold text-white">Naroda & Nikol, Ahmedabad</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Values 3-Pack */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl glass-card text-center">
                <ShieldCheck className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white font-cinzel mb-1">Reliable</h4>
                <p className="text-xs text-slate-400">Weather-proof morning route operations</p>
              </div>

              <div className="p-4 rounded-xl glass-card text-center">
                <Clock className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white font-cinzel mb-1">Timely</h4>
                <p className="text-xs text-slate-400">At your doorstep before 6:00 AM</p>
              </div>

              <div className="p-4 rounded-xl glass-card text-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white font-cinzel mb-1">Convenient</h4>
                <p className="text-xs text-slate-400">Direct WhatsApp support & easy pause</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Brand Artwork */}
      {isImageOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-5xl w-full bg-[#0a1228] border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setIsImageOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-red-600 text-white transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-2 sm:p-4">
              <img
                src={BUSINESS_INFO.heritageDioramaImage}
                alt="Laxmi Newspaper Services"
                className="w-full h-auto max-h-[82vh] object-contain rounded-xl mx-auto"
              />
              <div className="mt-4 px-4 pb-2 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-2">
                <span className="font-cinzel text-amber-300 font-bold text-sm">
                  LAXMI NEWSPAPER SERVICES • AHMEDABAD
                </span>
                <span className="text-slate-400">Founder: Prakash Bhai Kalal • +91 9574371328</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
