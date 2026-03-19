import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Info, ListChecks, ArrowRight, Loader2, Star, AlertCircle } from 'lucide-react';

const Demo = () => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const examples = [
        { 
            text: "Great app! Highly recommend it to everyone.", 
            rating: 5,
            desc: "Suspiciously short positive review"
        },
        { 
            text: "Nice app highly recommend must download best app excellent five star value for money", 
            rating: 5,
            desc: "Keyword-stuffed suspicious review"
        },
        { 
            text: "The delivery was delayed by 3 days and customer support never responded to my complaint. The product quality was below expectations and packaging was damaged. Very disappointed with the overall experience.", 
            rating: 1,
            desc: "Detailed negative (likely genuine) review"
        }
    ];

    const runAnalysis = async () => {
        if (!review.trim()) return;
        
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch(`${API_URL}/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ review_text: review, rating: rating })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Server error occurred');
            }

            setResult(data);
        } catch (err) {
            setError(err.message === 'Failed to fetch' 
                ? 'API unavailable. Please ensure your Flask server is running at ' + API_URL 
                : err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="mb-16">
                <h2 className="text-4xl font-black text-white mb-4 tracking-tight">
                    API <span className="text-indigo-500">Live Prediction Demo</span>
                </h2>
                <p className="text-slate-400 font-medium">Test our real Random Forest model via the Flask REST API.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-slate-200">
                {/* Input Side */}
                <div className="space-y-8">
                    <div className="bg-slate-800 p-8 rounded-[2.5rem] border border-slate-700/50 shadow-xl">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-700 pb-2">Review Content</label>
                        <textarea 
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Paste your review text here..."
                            rows={6}
                            className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium leading-relaxed mb-6"
                        />
                        
                        <div className="flex flex-col sm:flex-row items-center gap-6 mb-4">
                            <div className="flex-1 w-full">
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Select Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className="transition-transform active:scale-95"
                                        >
                                            <Star 
                                                className={`w-8 h-8 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`} 
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button 
                                onClick={runAnalysis}
                                disabled={!review.trim() || loading}
                                className={`w-full sm:w-auto px-10 py-5 font-black rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 mt-4 sm:mt-8 ${
                                    loading 
                                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20 active:scale-95'
                                }`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        ANALYZING...
                                    </>
                                ) : (
                                    <>
                                        ANALYZE REVIEW <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="bg-slate-800/30 p-8 rounded-[2rem] border border-slate-700/30">
                        <h4 className="text-xs font-black text-slate-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <ListChecks className="w-4 h-4" /> Sample Test Scenarios
                        </h4>
                        <div className="space-y-3">
                            {examples.map((ex, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => { setReview(ex.text); setRating(ex.rating); setError(null); setResult(null); }}
                                    className="w-full text-left p-4 bg-slate-900/50 hover:bg-slate-900 border border-slate-700/50 rounded-xl transition-all border-l-4 border-indigo-500/20 hover:border-l-indigo-500 group"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-black text-indigo-400 tracking-wide uppercase">Scenario {i+1}</span>
                                        <span className="text-[10px] font-bold text-slate-500 group-hover:text-indigo-500 transition-colors uppercase tracking-widest">
                                            {ex.rating} STARS ★
                                        </span>
                                    </div>
                                    <p className="text-xs font-medium text-slate-400 italic truncate italic">"{ex.text}"</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Side */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div 
                                key="error"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-500/10 border border-red-500/50 rounded-[2rem] p-8 flex items-start gap-4"
                            >
                                <AlertCircle className="text-red-500 w-6 h-6 flex-shrink-0" />
                                <div>
                                    <h4 className="text-red-500 font-black text-sm uppercase tracking-widest mb-1">Communication Error</h4>
                                    <p className="text-red-200/80 text-xs font-medium leading-relaxed">{error}</p>
                                </div>
                            </motion.div>
                        )}

                        {!result && !error && (
                            <motion.div 
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full min-h-[400px] border-2 border-dashed border-slate-700/50 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-12"
                            >
                                <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-8 border border-slate-700">
                                    <ShieldCheck size={32} className="text-slate-600" />
                                </div>
                                <h4 className="font-black text-white text-lg mb-2">Engine Ready</h4>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest max-w-xs leading-loose">
                                    Input review text on the left to activate the detection pipeline.
                                </p>
                            </motion.div>
                        )}

                        {result && !error && (
                            <motion.div 
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-slate-800 p-10 rounded-[2.5rem] border border-slate-700/50 shadow-2xl h-full"
                            >
                                <div className="flex flex-col items-center text-center mb-10">
                                    <div className={`mb-6 p-4 rounded-3xl ${result.prediction === 1 ? 'bg-red-500 shadow-lg shadow-red-500/20' : 'bg-emerald-500 shadow-lg shadow-emerald-500/20'}`}>
                                        {result.prediction === 1 ? <ShieldAlert size={40} className="text-white" /> : <ShieldCheck size={40} className="text-white" />}
                                    </div>
                                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Algorithm Verdict</h4>
                                    <span className={`text-4xl font-black mb-1 ${result.prediction === 1 ? 'text-red-500' : 'text-emerald-500'}`}>
                                        {result.label} SUSPECTED
                                    </span>
                                </div>

                                <div className="mb-12 bg-slate-900 border border-slate-700 p-6 rounded-3xl">
                                    <div className="flex justify-between items-end mb-4 px-1">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Confidence Index</span>
                                        <span className={`text-2xl font-black ${result.prediction === 1 ? 'text-red-500' : 'text-emerald-500'}`}>{result.confidence}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${result.confidence}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className={`h-full rounded-full ${result.prediction === 1 ? 'bg-red-500' : 'bg-emerald-500'}`}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <ResultCard label="Word Count" value={result.word_count} />
                                    <ResultCard label="VADER Score" value={result.sentiment_score} />
                                    <ResultCard label="Inconsistency" value={result.inconsistency_score} />
                                    <ResultCard label="Review Length" value={result.review_length} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const ResultCard = ({ label, value }) => (
    <div className="bg-slate-900 border border-slate-700 p-5 rounded-2xl hover:border-indigo-500/30 transition-colors group">
        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1 group-hover:text-indigo-400 transition-colors">{label}</p>
        <p className="text-lg font-black text-white">{value}</p>
    </div>
);

export default Demo;
