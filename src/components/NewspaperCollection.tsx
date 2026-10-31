import React, { useState } from 'react';
import { NewspaperItem, BUSINESS_INFO } from '../data/newspaperData';
import { Newspaper, Edit3, Check, RotateCcw, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';

interface NewspaperCollectionProps {
  newspapers: NewspaperItem[];
  onUpdateNewspaper: (updated: NewspaperItem[]) => void;
  onSelectForSubscription: (newspaper: NewspaperItem) => void;
}

export const NewspaperCollection: React.FC<NewspaperCollectionProps> = ({
  newspapers,
  onUpdateNewspaper,
  onSelectForSubscription,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ name: string; price: number; tagline: string }>({
    name: '',
    price: 180,
    tagline: '',
  });

  const handleStartEdit = (paper: NewspaperItem) => {
    setEditingId(paper.id);
    setEditForm({
      name: paper.name,
      price: paper.monthlyBasePrice,
      tagline: paper.tagline,
    });
  };

  const handleSaveEdit = (paperId: string) => {
    const updated = newspapers.map((p) => {
      if (p.id === paperId) {
        return {
          ...p,
          name: editForm.name.trim() || p.name,
          monthlyBasePrice: Number(editForm.price) || p.monthlyBasePrice,
          tagline: editForm.tagline.trim() || p.tagline,
        };
      }
      return p;
    });
    onUpdateNewspaper(updated);
    setEditingId(null);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all newspaper titles and prices to default values?')) {
      localStorage.removeItem('laxmi_newspaper_list');
      window.location.reload();
    }
  };

  return (
    <section id="newspapers" className="relative py-24 bg-[#060b19] border-b border-navy-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/20 text-red-300 text-xs uppercase tracking-widest font-semibold mb-3">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Editorial Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-cinzel mb-4">
              Our Newspaper Collection
            </h2>
            <p className="text-slate-300 font-editorial text-lg italic">
              All premier regional, national, and business dailies delivered fresh every morning at 6:00 AM across Naroda & Nikol.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetDefaults}
              className="px-3.5 py-2 rounded-lg bg-navy-card hover:bg-slate-800 text-slate-300 text-xs border border-white/10 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Reset names and prices to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <div className="text-xs text-slate-300 bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-lg">
              <span className="text-amber-300 font-semibold">Names & Prices Editable</span>
            </div>
          </div>
        </div>

        {/* Newspaper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newspapers.map((paper) => {
            const isEditing = editingId === paper.id;

            return (
              <div
                key={paper.id}
                className="group relative rounded-2xl glass-card overflow-hidden border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1.5"
              >
                {/* Vintage Newspaper Top Header Bar */}
                <div className="p-5 border-b border-white/10 bg-[#0d162d] relative">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                      {paper.language} • {paper.category}
                    </span>
                    <button
                      onClick={() => handleStartEdit(paper)}
                      className="text-slate-400 hover:text-amber-300 p-1 rounded transition-colors cursor-pointer"
                      title="Edit newspaper name or price"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Brand Masthead (Text-Based Editorial Styling) */}
                  {isEditing ? (
                    <div className="space-y-2 mt-2">
                      <div>
                        <label className="text-[10px] text-amber-300 block mb-0.5">Name</label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full bg-[#060b19] text-white text-sm px-2.5 py-1.5 rounded border border-amber-400/40 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-amber-300 block mb-0.5">Monthly Price (₹)</label>
                        <input
                          type="number"
                          value={editForm.price}
                          onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                          className="w-full bg-[#060b19] text-white text-sm px-2.5 py-1.5 rounded border border-amber-400/40 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-amber-300 block mb-0.5">Tagline</label>
                        <input
                          type="text"
                          value={editForm.tagline}
                          onChange={(e) => setEditForm({ ...editForm, tagline: e.target.value })}
                          className="w-full bg-[#060b19] text-white text-xs px-2.5 py-1 rounded border border-amber-400/40 focus:outline-none"
                        />
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => handleSaveEdit(paper.id)}
                          className="flex-1 py-1 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3 h-3" /> Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-cinzel tracking-wide group-hover:text-amber-200 transition-colors">
                        {paper.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-editorial italic mt-1 line-clamp-1">
                        {paper.tagline}
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3 mb-4">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {paper.highlight}
                    </p>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                      <span className="text-slate-400">Circulation Standing:</span>
                      <span className="text-slate-200 font-medium">{paper.circulationEst}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Morning Schedule:</span>
                      <span className="text-amber-300 font-semibold">Prompt 6:00 AM</span>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-4 border-t border-white/10 mt-auto">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="text-xs text-slate-400">Monthly Plan:</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold font-cinzel text-amber-300">
                          ₹{paper.monthlyBasePrice}
                        </span>
                        <span className="text-xs text-slate-400 ml-1">/ month</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => onSelectForSubscription(paper)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white font-semibold text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md shadow-red-900/30 cursor-pointer"
                      >
                        <span>SUBSCRIBE</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
                          `Hello Prakash Bhai, I would like to enquire about daily home delivery for ${paper.name} (₹180/mo) in Naroda/Nikol, Ahmedabad.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl glass-panel hover:bg-emerald-950/50 hover:text-emerald-300 text-slate-300 border border-white/10 transition-all flex items-center justify-center cursor-pointer"
                        title="Enquire on WhatsApp"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Subtle paper texture overlay */}
                <div className="absolute inset-0 bg-newspaper-grid opacity-30 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Footnote about flat 180 price */}
        <div className="mt-8 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 max-w-3xl mx-auto text-center text-xs text-slate-300">
          <Sparkles className="w-4 h-4 text-amber-400 inline mr-2" />
          <strong className="text-amber-200">Flat Pricing:</strong> All newspapers (Divya Bhaskar, Sandesh, Gujarat Patrika, Navgujrat, Ahmedabad Mirror, Times of India, and Economic) are flat <strong className="text-white">₹180 / month</strong> each across Naroda & Nikol, Ahmedabad.
        </div>
      </div>
    </section>
  );
};
