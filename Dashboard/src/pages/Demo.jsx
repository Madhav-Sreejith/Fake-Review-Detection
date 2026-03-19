import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, ShieldAlert, Info, ListChecks, ArrowRight } from 'lucide-react';

const Demo = () => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [analysis, setAnalysis] = useState(null);

  const GENERIC_PHRASES = [
    "best app", "good app", "nice app", "must download",
    "excellent", "highly recommend", "best product",
    "value for money", "worth buying", "five star"
  ];

  const runAnalysis = () => {
    if (!review.trim()) return;

    let score = 0;
    const signals = [];

    const wordCount = review.split(/\s+/).length;
    const charCount = review.length;
    const exclamationCount = (review.match(/!/g) || []).length;
    const capsCount = (review.match(/[A-Z]/g) || []).length;
    const capRatio = capsCount / charCount || 0;
    const hasURL = /http/.test(review);
    const hasRepeat = /(.)\1{2,}/.test(review.toLowerCase());

    const genericMatches = GENERIC_PHRASES.filter(phrase => 
      review.toLowerCase().includes(phrase)
    );

    // Scoring Logic
    if (wordCount < 5) {
      score += 2;
      signals.push({ label: "Low word count (< 5)", impact: "+2" });
    }
    if (exclamationCount > 3) {
      score += 2;
      signals.push({ label: "Excessive exclamation marks", impact: "+2" });
    }
    if (capRatio > 0.4) {
      score += 2;
      signals.push({ label: "High capital letter ratio", impact: "+2" });
    }
    if (hasURL) {
      score += 3;
      signals.push({ label: "Unsafe external link (URL)", impact: "+3" });
    }
    if (genericMatches.length > 0) {
      score += 2;
      signals.push({ label: `Generic marketing phrases (${genericMatches.length})`, impact: "+2" });
    }
    if (hasRepeat) {
      score += 1;
      signals.push({ label: "Suspicious character repetitions", impact: "+1" });
    }
    if (rating === 1 || rating === 5) {
      score += 1;
      signals.push({ label: "Extreme rating pattern (1 or 5)", impact: "+1" });
    }
    if (wordCount < 3 && rating === 5) {
      score += 2;
      signals.push({ label: "Extreme rating with minimal text", impact: "+2" });
    }

    setAnalysis({
      score,
      signals,
      features: {
        wordCount,
        charCount,
        exclamationCount,
        capRatio: (capRatio * 100).toFixed(1) + "%",
        genericCount: genericMatches.length
      }
    });
  };

  const getStatus = (score) => {
    if (score >= 5) return { label: "FAKE SUSPECTED", color: "bg-red-500", icon: <ShieldAlert /> };
    if (score >= 3) return { label: "SUSPICIOUS", color: "bg-orange-500", icon: <Info /> };
    return { label: "LIKELY GENUINE", color: "bg-emerald-500", icon: <ShieldCheck /> };
  };

  const examples = [
    { text: "Great app!", rating: 5 },
    { text: "Nice app highly recommend must download best app", rating: 5 },
    { text: "The delivery was delayed by 3 days and customer support never responded properly. Very disappointed with the overall experience and packaging quality.", rating: 1 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-16">
         <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Trust <span className="text-indigo-500">Validation Demo</span></h2>
         <p className="text-slate-400 font-medium">Test our rule-based detection engine with your own entries.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Input Side */}
        <div className="space-y-8">
           <div className="bg-slate-800 p-8 rounded-[2.5rem] border border-slate-700/50 shadow-xl">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Review Input Buffer</label>
              <textarea 
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Paste review text here..."
                className="w-full h-40 bg-slate-900 border border-slate-700 rounded-2xl p-6 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium leading-relaxed mb-6"
              />
              
              <div className="flex items-center gap-6 mb-8">
                 <div className="flex-1">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Assigned Rating</label>
                    <select 
                      value={rating}
                      onChange={(e) => setRating(parseInt(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-bold"
                    >
                      {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Stars ★</option>)}
                    </select>
                 </div>
                 <button 
                  onClick={runAnalysis}
                  className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-600/10 flex items-center gap-2 group mt-8"
                 >
                   ANALYZE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
           </div>

           <div className="bg-slate-800/30 p-8 rounded-[2rem] border border-slate-700/30">
              <h4 className="text-xs font-black text-slate-600 uppercase tracking-widest mb-6 border-b border-slate-700/30 pb-4">Standardized Test Cases</h4>
              <div className="space-y-3">
                 {examples.map((ex, i) => (
                   <button 
                    key={i} 
                    onClick={() => { setReview(ex.text); setRating(ex.rating); }}
                    className="w-full text-left p-4 bg-slate-900/50 hover:bg-indigo-600/10 border border-slate-700 rounded-xl text-xs font-bold text-slate-400 hover:text-indigo-400 transition-all flex items-center justify-between group"
                   >
                     <span className="truncate pr-4">{ex.text}</span>
                     <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Results Side */}
        <div className="min-h-[500px]">
           <AnimatePresence mode="wait">
              {!analysis ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full border-2 border-dashed border-slate-700 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-600 p-12 text-center"
                >
                   <Search size={48} className="mb-6 opacity-20" />
                   <h4 className="font-black text-lg mb-2">Awaiting Input Signal</h4>
                   <p className="text-xs font-bold leading-relaxed max-w-xs uppercase tracking-widest opacity-50">
                      Detection engine is idle. Input review text and click analyze to start classification.
                   </p>
                </motion.div>
              ) : (
                <motion.div 
                  key="analysis"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="h-full bg-slate-800 p-10 rounded-[2.5rem] border border-slate-700/50"
                >
                   <div className="flex items-center justify-between mb-12">
                      <div className="flex items-center gap-4">
                         <div className={`p-4 rounded-2xl ${getStatus(analysis.score).color} text-white`}>
                            {React.cloneElement(getStatus(analysis.score).icon, { size: 24 })}
                         </div>
                         <div>
                            <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Detection Result</h4>
                            <div className={`text-xl font-black ${getStatus(analysis.score).color.replace('bg-', 'text-')}`}>
                               {getStatus(analysis.score).label}
                            </div>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="text-3xl font-black text-white">{analysis.score}</div>
                         <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Suspicion Score</div>
                      </div>
                   </div>

                   <div className="mb-12">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                         <ListChecks className="w-3 h-3 text-indigo-500" /> Signal Breakdown
                      </h5>
                      <div className="space-y-3">
                         {analysis.signals.length === 0 && <p className="text-xs font-bold text-slate-600 py-4 border border-dashed border-slate-700 rounded-xl text-center">No suspicious signals detected</p>}
                         {analysis.signals.map((s, i) => (
                           <div key={i} className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border-l-4 border-indigo-500">
                              <span className="text-xs font-bold text-slate-200">{s.label}</span>
                              <span className="text-xs font-black text-indigo-400 font-mono">{s.impact}</span>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div>
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                         Computed Features
                      </h5>
                      <div className="grid grid-cols-2 gap-4">
                         <FeatureBadge label="Word Count" value={analysis.features.wordCount} />
                         <FeatureBadge label="Char Count" value={analysis.features.charCount} />
                         <FeatureBadge label="Cap Ratio" value={analysis.features.capRatio} />
                         <FeatureBadge label="Generic Phrases" value={analysis.features.genericCount} />
                      </div>
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const FeatureBadge = ({ label, value }) => (
  <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
     <p className="text-[10px] font-bold text-slate-600 uppercase mb-1">{label}</p>
     <p className="text-sm font-black text-white">{value}</p>
  </div>
);

export default Demo;
