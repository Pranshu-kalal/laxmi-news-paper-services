import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { NewspaperItem, BUSINESS_INFO } from '../data/newspaperData';
import { Send, CheckCircle2, User, Phone, MapPin, Newspaper, Calendar, FileText, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

interface SubscriptionFormProps {
  newspapers: NewspaperItem[];
  preselectedNewspaper?: NewspaperItem | null;
}

export const SubscriptionForm: React.FC<SubscriptionFormProps> = ({
  newspapers,
  preselectedNewspaper,
}) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedPapers, setSelectedPapers] = useState<string[]>(() => {
    return preselectedNewspaper ? [preselectedNewspaper.name] : ['Divya Bhaskar'];
  });
  const [subscriptionPlan, setSubscriptionPlan] = useState('Monthly Base (₹180/mo standard)');
  const [startDate, setStartDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [additionalInstructions, setAdditionalInstructions] = useState('');

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [isHandedOff, setIsHandedOff] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  // Update selection if prop changes
  React.useEffect(() => {
    if (preselectedNewspaper) {
      setSelectedPapers((prev) =>
        prev.includes(preselectedNewspaper.name) ? prev : [...prev, preselectedNewspaper.name]
      );
    }
  }, [preselectedNewspaper]);

  const togglePaperSelection = (paperName: string) => {
    setSelectedPapers((prev) => {
      if (prev.includes(paperName)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((p) => p !== paperName);
      } else {
        return [...prev, paperName];
      }
    });
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = 'Please enter your full name (at least 3 characters)';
    }

    const cleanedPhone = mobileNumber.replace(/\D/g, '');
    if (!cleanedPhone || cleanedPhone.length < 10) {
      errs.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    if (!deliveryAddress.trim() || deliveryAddress.trim().length < 10) {
      errs.deliveryAddress = 'Please enter complete delivery address including flat/house number and area in Ahmedabad';
    }

    if (selectedPapers.length === 0) {
      errs.selectedPapers = 'Please select at least one newspaper';
    }

    if (!startDate) {
      errs.startDate = 'Please choose a preferred start date';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleReviewSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const generatedRef = `LNS-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderRef(generatedRef);
      setIsSummaryModalOpen(true);
    }
  };

  const handleHandoffToWhatsApp = () => {
    const message = `🗞️ *NEW SUBSCRIPTION ENQUIRY*
*Laxmi Newspaper Services*
Ref: ${orderRef}
━━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${fullName.trim()}
📱 *Mobile:* ${mobileNumber.trim()}
📍 *Address:* ${deliveryAddress.trim()}, Naroda / Nikol, Ahmedabad
📰 *Newspaper(s):* ${selectedPapers.join(', ')}
💰 *Price:* Flat ₹180 / month each
📦 *Plan:* ${subscriptionPlan}
📅 *Preferred Start:* ${startDate}
📝 *Delivery Instructions:* ${additionalInstructions.trim() || 'Standard morning doorstep drop-off at 6:00 AM'}
━━━━━━━━━━━━━━━━━━━━━
Please confirm my morning delivery schedule for Naroda/Nikol.`;

    const whatsappLink = `https://wa.me/919574371328?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappLink, '_blank');

    // Trigger celebration & success handoff state only after handoff
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    setIsHandedOff(true);
  };

  const handleResetForm = () => {
    setFullName('');
    setMobileNumber('');
    setDeliveryAddress('');
    setAdditionalInstructions('');
    setIsSummaryModalOpen(false);
    setIsHandedOff(false);
  };

  return (
    <section id="subscription-form" className="relative py-24 bg-[#060b19] border-b border-navy-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/20 text-red-300 text-xs uppercase tracking-widest font-semibold mb-3">
            <Send className="w-3.5 h-3.5" />
            <span>Instant Morning Activation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-cinzel mb-4">
            Online Subscription Form
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-amber-400 to-red-600 mx-auto rounded-full mb-6" />
          <p className="text-slate-300 font-editorial text-lg italic max-w-xl mx-auto">
            Fill your delivery address in Ahmedabad. Your enquiry connects directly with founder Prakash Bhai Kalal via WhatsApp for morning setup.
          </p>
        </div>

        {/* Form Container */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/15 shadow-2xl relative">
          <form onSubmit={handleReviewSubmission} className="space-y-6">
            {/* Field 1: Customer Full Name */}
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-amber-400" />
                <span>Customer Full Name *</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Ramesh Patel / Dr. Sunita Shah"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full bg-[#0a1228] text-white px-4 py-3.5 rounded-xl border ${
                  errors.fullName ? 'border-red-500' : 'border-white/20'
                } focus:border-amber-400 focus:outline-none text-sm transition-colors`}
              />
              {errors.fullName && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                </p>
              )}
            </div>

            {/* Field 2: Mobile Number */}
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Mobile Number (WhatsApp Enabled) *</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-mono">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="98765 43210"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  className={`w-full bg-[#0a1228] text-white pl-14 pr-4 py-3.5 rounded-xl border ${
                    errors.mobileNumber ? 'border-red-500' : 'border-white/20'
                  } focus:border-amber-400 focus:outline-none text-sm transition-colors`}
                />
              </div>
              {errors.mobileNumber && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.mobileNumber}
                </p>
              )}
            </div>

            {/* Field 3: Full Delivery Address */}
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Full Delivery Address (Naroda / Nikol, Ahmedabad) *</span>
              </label>
              <textarea
                rows={3}
                placeholder="Flat / House / Bungalow No., Society or Apartment Name, Street / Landmark, Naroda or Nikol, Ahmedabad"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className={`w-full bg-[#0a1228] text-white px-4 py-3.5 rounded-xl border ${
                  errors.deliveryAddress ? 'border-red-500' : 'border-white/20'
                } focus:border-amber-400 focus:outline-none text-sm transition-colors`}
              />
              {errors.deliveryAddress && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.deliveryAddress}
                </p>
              )}
            </div>

            {/* Field 4: Select Newspaper(s) */}
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-amber-400" />
                  <span>Select Newspaper(s) *</span>
                </span>
                <span className="text-[11px] text-amber-300">All Papers Flat ₹180 / Month</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {newspapers.map((paper) => {
                  const isSelected = selectedPapers.includes(paper.name);
                  return (
                    <button
                      type="button"
                      key={paper.id}
                      onClick={() => togglePaperSelection(paper.name)}
                      className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 text-white font-bold shadow-md shadow-amber-500/10'
                          : 'bg-[#0a1228] border-white/10 text-slate-400 hover:border-white/30'
                      }`}
                    >
                      <span className="truncate">{paper.name}</span>
                      <span className="text-[10px] text-amber-300 font-mono mt-1">₹180/mo</span>
                    </button>
                  );
                })}
              </div>
              {errors.selectedPapers && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.selectedPapers}
                </p>
              )}
            </div>

            {/* Field 5 & 6: Subscription Plan & Start Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Subscription Plan *</span>
                </label>
                <select
                  value={subscriptionPlan}
                  onChange={(e) => setSubscriptionPlan(e.target.value)}
                  className="w-full bg-[#0a1228] text-white px-4 py-3.5 rounded-xl border border-white/20 focus:border-amber-400 focus:outline-none text-sm"
                >
                  <option value="Monthly Standard Plan (Flat ₹180/mo)">Monthly Standard Plan (Flat ₹180 / Month)</option>
                  <option value="Quarterly Plan (₹540 for 3 Months)">Quarterly Plan (₹540 for 3 Months)</option>
                  <option value="Annual Plan (₹2,160 for 1 Year)">Annual Plan (₹2,160 for 1 Year)</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Preferred Start Date *</span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={`w-full bg-[#0a1228] text-white px-4 py-3.5 rounded-xl border ${
                    errors.startDate ? 'border-red-500' : 'border-white/20'
                  } focus:border-amber-400 focus:outline-none text-sm`}
                />
              </div>
            </div>

            {/* Field 7: Additional Instructions */}
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Additional Instructions (Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Ring bell once, leave in milk bag, or slide under door"
                value={additionalInstructions}
                onChange={(e) => setAdditionalInstructions(e.target.value)}
                className="w-full bg-[#0a1228] text-white px-4 py-3 rounded-xl border border-white/20 focus:border-amber-400 focus:outline-none text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-base tracking-wider transition-all transform hover:-translate-y-0.5 shadow-xl shadow-red-900/40 flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>SUBMIT SUBSCRIPTION REQUEST</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Summary Review Modal with WhatsApp Handoff */}
      {isSummaryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-lg w-full bg-[#0c1427] border-2 border-amber-400/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
            {!isHandedOff ? (
              <>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300">
                      REFERENCE: {orderRef}
                    </span>
                    <h3 className="text-xl font-bold text-white font-cinzel">
                      Enquiry Summary & Hand-off
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsSummaryModalOpen(false)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 text-xs text-slate-300 mb-6 bg-[#060b19] p-4 rounded-2xl border border-white/10">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Subscriber Name:</span>
                    <span className="font-semibold text-white">{fullName}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Mobile:</span>
                    <span className="font-mono text-amber-300">+91 {mobileNumber}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Selected Dailies:</span>
                    <span className="font-semibold text-white text-right">{selectedPapers.join(', ')}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Plan:</span>
                    <span className="text-slate-200">{subscriptionPlan}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Delivery Address:</span>
                    <span className="text-right text-white max-w-[240px] truncate">{deliveryAddress}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Start Date:</span>
                    <span className="text-emerald-400 font-semibold">{startDate} (6:00 AM)</span>
                  </div>
                  {additionalInstructions && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Instructions:</span>
                      <span className="text-slate-200">{additionalInstructions}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleHandoffToWhatsApp}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-900/30 cursor-pointer"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>SUBMIT ENQUIRY VIA WHATSAPP (+91 9574371328)</span>
                  </button>
                  <p className="text-[11px] text-center text-slate-400">
                    Your formatted enquiry will open directly in WhatsApp to chat with Prakash Bhai Kalal.
                  </p>
                </div>
              </>
            ) : (
              /* Success Confirmation Shown only after handoff (Meets user instruction) */
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Enquiry Dispatched to WhatsApp</span>
                </div>
                <h3 className="text-2xl font-bold text-white font-cinzel mb-2">
                  Request Received!
                </h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto mb-6">
                  Thank you, <strong className="text-white">{fullName}</strong>! Prakash Bhai Kalal has received your details for morning delivery at 6:00 AM.
                </p>

                <div className="p-3.5 rounded-xl bg-[#060b19] border border-white/10 text-xs text-slate-300 space-y-1 text-left mb-6">
                  <div><strong>Reference:</strong> <span className="font-mono text-amber-300">{orderRef}</span></div>
                  <div><strong>Contact:</strong> +91 9574371328 (Direct Line)</div>
                  <div><strong>Delivery Time:</strong> 6:00 AM Prompt</div>
                </div>

                <button
                  onClick={handleResetForm}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
                >
                  Done & Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
