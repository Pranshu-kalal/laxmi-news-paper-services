import React, { useState } from 'react';
import { BUSINESS_INFO, TEMPLATE_DISTRIBUTION_CONFIG } from '../data/newspaperData';
import { Megaphone, Layers, Send, Download, Sparkles, Building2, Check, ShieldCheck } from 'lucide-react';

export const TemplateDistribution: React.FC = () => {
  const [templateCount, setTemplateCount] = useState<number>(1000);
  const [selectedArea, setSelectedArea] = useState<string>('Naroda & Nikol (Both)');
  const [qrImageUrl] = useState<string>(BUSINESS_INFO.ownerQrImage);
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);

  // 1000 Templates = ₹300 only
  const totalCost = (templateCount / 1000) * TEMPLATE_DISTRIBUTION_CONFIG.basePrice;

  const handleBookViaWhatsApp = () => {
    const message = `Hello Prakash Bhai,
I want to book Template (Pamphlet) Distribution with Laxmi Newspaper Services:
━━━━━━━━━━━━━━━━━━━━━
📄 Quantity: ${templateCount} Templates (Pamphlets)
📍 Target Area: ${selectedArea}, Ahmedabad
💰 Total Price: ₹${totalCost} (Rate: 1000 = ₹300 only)
⏰ Morning Insertion: 6:00 AM Daily Run
━━━━━━━━━━━━━━━━━━━━━
Please confirm insertion dates and schedule for Naroda/Nikol.`;

    window.open(`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="template-distribution" className="relative py-24 bg-[#060b19] border-b border-navy-border overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-red-300 text-xs uppercase tracking-widest font-semibold mb-3">
            <Megaphone className="w-3.5 h-3.5" />
            <span>High ROI Local Advertising</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-cinzel mb-4">
            Promote Your Business with Our Template Distribution Service
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-amber-400 to-red-600 mx-auto rounded-full mb-6" />
          <p className="text-slate-300 font-editorial text-lg italic max-w-2xl mx-auto">
            Insert your business flyers and pamphlets directly inside morning newspapers across Naroda & Nikol. Reaching thousands of homes at 6:00 AM sharp.
          </p>
        </div>

        {/* 1000 Templates = ₹300 Only Highlight Banner */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#121c38] via-[#1a2952] to-[#121c38] border-2 border-amber-400/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                <Layers className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-300 font-bold">
                  Special Offer Rate
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-cinzel">
                  1000 TEMPLATES = <span className="text-amber-300">₹300 ONLY</span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Direct physical insertion inside subscriber newspapers • Delivered at 6:00 AM in Naroda & Nikol
                </div>
              </div>
            </div>

            <button
              onClick={handleBookViaWhatsApp}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm tracking-wider shadow-lg shadow-red-900/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>BOOK TEMPLATE DISTRIBUTION</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Two Column Section: Interactive Calculator & Real Business QR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-start">
          {/* Left: Interactive Cost Calculator */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-cinzel mb-6 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <span>Instant Pamphlet Cost Estimator</span>
            </h3>

            {/* Template Count Slider */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300 font-medium">Number of Templates (Pamphlets):</span>
                <span className="text-2xl font-bold text-amber-300 font-cinzel">
                  {templateCount.toLocaleString()} units
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={10000}
                step={1000}
                value={templateCount}
                onChange={(e) => setTemplateCount(Number(e.target.value))}
                className="w-full accent-amber-400 h-2.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-300 font-mono">
                <span>1,000 (₹300)</span>
                <span>3,000 (₹900)</span>
                <span>5,000 (₹1,500)</span>
                <span>10,000 (₹3,000)</span>
              </div>
            </div>

            {/* Target Area Selection: Only Naroda & Nikol */}
            <div className="mb-6">
              <label className="text-sm text-slate-300 block mb-2 font-medium flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>Target Distribution Area:</span>
              </label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full bg-[#0a1228] text-white px-4 py-3 rounded-xl border border-white/20 focus:border-amber-400 focus:outline-none text-sm"
              >
                <option value="Naroda & Nikol (Both)" className="bg-[#0a1228]">
                  Naroda & Nikol (Combined Full Coverage)
                </option>
                <option value="Naroda Only" className="bg-[#0a1228]">
                  Naroda Area Residential Societies & Markets
                </option>
                <option value="Nikol Only" className="bg-[#0a1228]">
                  Nikol Area Residential Societies & Markets
                </option>
              </select>
            </div>

            {/* Guaranteed Features 3-Pack */}
            <div className="space-y-3 mb-8 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0a1228]/60 border border-white/10">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-white">Direct Newspaper Insertion</span>
                  <p className="text-xs text-slate-400">Folded neatly inside daily morning newspapers</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0a1228]/60 border border-white/10">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-white">Guaranteed 6:00 AM Morning Reach</span>
                  <p className="text-xs text-slate-400">Reaches families when they read morning news</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0a1228]/60 border border-white/10">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-white">100% Doorstep Society Delivery</span>
                  <p className="text-xs text-slate-400">Verified placement across apartment blocks and bungalows</p>
                </div>
              </div>
            </div>

            {/* Total Estimation Callout */}
            <div className="p-5 rounded-2xl bg-[#0a142e] border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Total Distribution Cost:</span>
                <div className="text-3xl font-extrabold text-amber-300 font-cinzel">
                  ₹{totalCost.toLocaleString()} ONLY
                </div>
                <div className="text-[11px] text-slate-300">
                  {templateCount.toLocaleString()} pamphlets @ ₹300 per 1,000 units
                </div>
              </div>

              <button
                onClick={handleBookViaWhatsApp}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 text-white font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-900/30"
              >
                <span>BOOK VIA WHATSAPP</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Authentic Owner Payment QR Code */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 rounded-3xl border border-amber-400/30 text-center relative overflow-hidden">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Business QR Code</span>
              </div>

              <h4 className="text-lg font-bold text-white font-cinzel mb-1">
                Official Bank of Baroda UPI Scanner
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                PhonePe UPI • Prakash Bhai Kalal • Naroda & Nikol
              </p>

              {/* QR Scanner Container (Cropped square scanner only) */}
              <div className="relative mx-auto w-56 sm:w-64 aspect-square rounded-2xl overflow-hidden border-2 border-amber-400/40 bg-[#060b19] p-3.5 shadow-2xl group flex items-center justify-center">
                <img
                  src={qrImageUrl}
                  alt="Laxmi Newspaper Services Official UPI QR Scanner"
                  className="w-full h-full object-contain rounded-xl cursor-pointer transition-transform duration-300 group-hover:scale-105"
                  onClick={() => setIsQrModalOpen(true)}
                />
                <div
                  onClick={() => setIsQrModalOpen(true)}
                  className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white text-xs font-semibold gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Click to Expand Scanner</span>
                </div>
              </div>

              {/* Download QR Action */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center">
                <a
                  href={qrImageUrl}
                  download="Laxmi_Newspaper_Services_UPI_Scanner.png"
                  className="px-4 py-2 rounded-lg bg-navy-card hover:bg-slate-800 text-slate-300 text-xs border border-white/10 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download UPI Scanner</span>
                </a>
              </div>
            </div>

            {/* Local Trust Note */}
            <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs text-slate-300 space-y-2">
              <div className="font-semibold text-amber-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Naroda & Nikol Business Booster</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Reach genuine households in your immediate locality. Distribute 1,000 pamphlets for only ₹300 with guaranteed morning delivery by Prakash Bhai Kalal.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* QR Modal Lightbox */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-sm w-full bg-[#0c1427] border border-amber-400/40 rounded-3xl p-6 text-center shadow-2xl">
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-white hover:bg-red-600 transition-colors cursor-pointer"
            >
              ✕
            </button>
            <h4 className="text-base font-bold text-white font-cinzel mb-1">
              Bank of Baroda UPI Scanner
            </h4>
            <p className="text-xs text-slate-400 mb-4">Laxmi Newspaper Services • Prakash Bhai Kalal</p>
            <div className="p-3 bg-[#060b19] rounded-2xl border border-amber-400/30 shadow-inner flex items-center justify-center">
              <img
                src={qrImageUrl}
                alt="Official Bank of Baroda UPI QR Scanner"
                className="w-64 sm:w-72 aspect-square object-contain rounded-xl mx-auto border border-white/10 shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
