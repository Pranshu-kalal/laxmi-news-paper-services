import React from 'react';
import { BUSINESS_INFO } from '../data/newspaperData';
import { Phone, MessageCircle, MapPin, Clock, User, Send, Layers, QrCode } from 'lucide-react';

interface ContactSectionProps {
  onOpenSubscriptionForm: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenSubscriptionForm }) => {
  const handleTemplateEnquiry = () => {
    const msg = `Hello Prakash Bhai,
I would like to enquire about Template (Pamphlet) Distribution in Ahmedabad with Laxmi Newspaper Services.
Please share available dates and areas.`;
    window.open(`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleGeneralEnquiry = () => {
    const msg = `Hello Prakash Bhai,
I would like to get in touch regarding Laxmi Newspaper Services in Ahmedabad.`;
    window.open(`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="contact" className="relative py-24 bg-[#060b19] border-b border-navy-border overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/20 text-red-300 text-xs uppercase tracking-widest font-semibold mb-3">
            <Phone className="w-3.5 h-3.5" />
            <span>Direct Line to Founder</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-cinzel mb-4">
            Contact Laxmi Newspaper Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-amber-400 to-red-600 mx-auto rounded-full mb-6" />
          <p className="text-slate-300 font-editorial text-lg italic max-w-2xl mx-auto">
            Speak directly with Prakash Bhai Kalal. Instant WhatsApp responses, doorstep address verification, and morning route dispatch.
          </p>
        </div>

        {/* 4 Quick Action Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {/* Action 1: Click to Call */}
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="group p-6 rounded-2xl glass-card border border-white/10 hover:border-amber-400/50 transition-all hover:-translate-y-1 text-center flex flex-col items-center justify-between"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-300 border border-amber-400/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Phone className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                Direct Phone
              </span>
              <h3 className="text-lg font-bold text-white font-cinzel mb-2">
                Click to Call
              </h3>
              <p className="text-xs text-amber-300 font-mono font-semibold">
                {BUSINESS_INFO.phone}
              </p>
            </div>
            <span className="mt-4 text-[11px] text-slate-400 group-hover:text-amber-200 flex items-center gap-1">
              Tap to dial instantly →
            </span>
          </a>

          {/* Action 2: WhatsApp Chat */}
          <a
            href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
              'Hello Prakash Bhai Kalal, I am reaching out from your website for newspaper services in Ahmedabad.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl glass-card border border-white/10 hover:border-emerald-500/50 transition-all hover:-translate-y-1 text-center flex flex-col items-center justify-between"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                Instant Chat
              </span>
              <h3 className="text-lg font-bold text-white font-cinzel mb-2">
                WhatsApp Chat
              </h3>
              <p className="text-xs text-emerald-300 font-mono font-semibold">
                +91 9574371328
              </p>
            </div>
            <span className="mt-4 text-[11px] text-slate-400 group-hover:text-emerald-200 flex items-center gap-1">
              Start conversation →
            </span>
          </a>

          {/* Action 3: Subscription Enquiry */}
          <button
            onClick={onOpenSubscriptionForm}
            className="group p-6 rounded-2xl glass-card border border-white/10 hover:border-red-500/50 transition-all hover:-translate-y-1 text-center flex flex-col items-center justify-between cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Send className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                Daily Delivery
              </span>
              <h3 className="text-lg font-bold text-white font-cinzel mb-2">
                Subscription Form
              </h3>
              <p className="text-xs text-red-300 font-semibold">
                Doorstep 6:00 AM Setup
              </p>
            </div>
            <span className="mt-4 text-[11px] text-slate-400 group-hover:text-red-200 flex items-center gap-1">
              Fill online enquiry →
            </span>
          </button>

          {/* Action 4: Template Distribution Enquiry */}
          <button
            onClick={handleTemplateEnquiry}
            className="group p-6 rounded-2xl glass-card border border-white/10 hover:border-amber-400/50 transition-all hover:-translate-y-1 text-center flex flex-col items-center justify-between cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-400/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                Business Flyers
              </span>
              <h3 className="text-lg font-bold text-white font-cinzel mb-2">
                Template Distribution
              </h3>
              <p className="text-xs text-amber-300 font-semibold">
                1000 Templates = ₹300
              </p>
            </div>
            <span className="mt-4 text-[11px] text-slate-400 group-hover:text-amber-200 flex items-center gap-1">
              Book distribution route →
            </span>
          </button>
        </div>

        {/* Detailed Business Dossier & Quick Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Left Column: Business Card Details */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold block mb-1">
                Business Information
              </span>
              <h3 className="text-2xl font-bold text-white font-cinzel">
                Laxmi Newspaper Services
              </h3>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Founder & Proprietor</div>
                  <div className="text-sm font-bold text-white">Prakash Bhai Kalal</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Mobile & WhatsApp</div>
                  <div className="text-sm font-bold font-mono text-amber-300">+91 9574371328</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Daily Morning Delivery Window</div>
                  <div className="text-sm font-bold text-white">6:00 AM Prompt (Every Day)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Operational Territory</div>
                  <div className="text-sm font-bold text-white">Naroda & Nikol, Ahmedabad, Gujarat</div>
                  <div className="text-xs text-slate-400 mt-1">
                    Exclusively serving residential societies, apartments, and market zones across Naroda and Nikol.
                  </div>
                </div>
              </div>
            </div>

            {/* Quick UPI QR snippet */}
            <div className="p-4 rounded-2xl bg-[#0a1228] border border-amber-400/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <QrCode className="w-8 h-8 text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-white">Bank of Baroda UPI</div>
                  <div className="text-[11px] text-slate-400">Scan QR Code to Pay</div>
                </div>
              </div>
              <a
                href={BUSINESS_INFO.ownerQrImage}
                download="Laxmi_Newspaper_Services_UPI_Scanner.png"
                className="text-xs text-amber-300 hover:underline font-semibold"
              >
                View QR
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Quick Messenger Form */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold text-white font-cinzel mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Have a special route question, bulk office request, or pamphlet distribution enquiry? Message Prakash Bhai directly.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = (form.elements.namedItem('senderName') as HTMLInputElement).value;
                const note = (form.elements.namedItem('senderMessage') as HTMLTextAreaElement).value;
                const msg = `Hello Prakash Bhai,\nMy name is ${name}.\n\nMessage:\n${note}`;
                window.open(`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(msg)}`, '_blank');
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-300 font-semibold block mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  name="senderName"
                  required
                  placeholder="e.g. Anand Shah"
                  className="w-full bg-[#0a1228] text-white px-4 py-3 rounded-xl border border-white/15 focus:border-amber-400 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-slate-300 font-semibold block mb-1.5">
                  Your Message or Route Query
                </label>
                <textarea
                  name="senderMessage"
                  required
                  rows={4}
                  placeholder="Tell us your area or requirements..."
                  className="w-full bg-[#0a1228] text-white px-4 py-3 rounded-xl border border-white/15 focus:border-amber-400 focus:outline-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-900/30 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>SEND DIRECTLY TO PRAKASH BHAI KALAL VIA WHATSAPP</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
