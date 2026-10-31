import React from 'react';
import { BUSINESS_INFO } from '../data/newspaperData';
import { Check, Clock, Calendar, Shield, ArrowRight, Sparkles, MapPin } from 'lucide-react';

interface SubscriptionPlansProps {
  onStartSubscription: () => void;
}

export const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ onStartSubscription }) => {
  return (
    <section id="subscription" className="relative py-24 bg-[#080e21] border-b border-navy-border overflow-hidden">
      {/* Visual background flares */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Universal Flat Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-cinzel mb-4">
            Subscription Plans
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-amber-400 to-red-600 mx-auto rounded-full mb-6" />
          <p className="text-slate-300 font-editorial text-lg italic max-w-2xl mx-auto">
            Choose any newspaper of your choice — every publication is flat ₹180 per month across Naroda & Nikol.
          </p>
        </div>

        {/* Single Focused Pricing Card (Clean, Premium, No Twin Paper Card) */}
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden glass-card p-8 sm:p-12 border-2 border-amber-400/50 shadow-2xl flex flex-col justify-between">
            {/* Best Value Badge */}
            <div className="absolute top-6 right-6">
              <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg">
                Flat Rate
              </span>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-semibold mb-3">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>DAILY NEWSPAPER SUBSCRIPTION • NARODA & NIKOL</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-cinzel mb-4">
                All Newspapers — ₹180 / Month
              </h3>
              <p className="text-slate-300 text-sm max-w-xl mb-6">
                Receive your chosen daily delivered directly to your doorstep in Naroda or Nikol every single morning before 6:00 AM.
              </p>

              {/* Price Callout */}
              <div className="flex items-baseline gap-3 py-6 border-t border-b border-white/10 mb-8">
                <span className="text-5xl sm:text-7xl font-black font-cinzel text-white">
                  ₹{BUSINESS_INFO.monthlySubscriptionPrice}
                </span>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-amber-300">/ MONTH ONLY</span>
                  <span className="text-xs text-slate-300">
                    Applicable to all 7 newspapers (Divya Bhaskar, Sandesh, TOI, etc.)
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Daily Newspaper Delivery</h4>
                    <p className="text-xs text-slate-400">Clean, dry doorstep placement</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Morning Delivery at 6:00 AM</h4>
                    <p className="text-xs text-slate-400">Guaranteed arrival before morning tea</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Convenient Subscription</h4>
                    <p className="text-xs text-slate-400">Pause for holidays with one simple WhatsApp message</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Direct Customer Support</h4>
                    <p className="text-xs text-slate-400">Direct contact with founder Prakash Bhai Kalal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA and Disclaimer */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={onStartSubscription}
                className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-base tracking-wider transition-all transform hover:-translate-y-0.5 shadow-xl shadow-red-900/40 flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>START YOUR SUBSCRIPTION</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-xs text-amber-200/90 flex items-center gap-1.5 text-center sm:text-right">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Flat ₹180 for any paper • Exclusively in Naroda & Nikol</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
