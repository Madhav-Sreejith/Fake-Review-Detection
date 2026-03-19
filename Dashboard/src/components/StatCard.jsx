import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, sub, delay = 0, variant = "default" }) => {
  const variants = {
    default: "border-slate-700 hover:border-indigo-500/50 hover:shadow-indigo-500/5",
    genuine: "border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-emerald-500/5",
    fake: "border-red-500/20 hover:border-red-500/50 hover:shadow-red-500/5",
  };

  const textColors = {
    default: "text-indigo-400",
    genuine: "text-emerald-500",
    fake: "text-red-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`bg-slate-800 p-8 rounded-3xl border transition-all duration-300 ${variants[variant]}`}
    >
      <div className="flex items-center justify-between mb-4">
         <span className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-50`}>Status: Live</span>
         <div className={`w-2 h-2 rounded-full animate-pulse ${variant === 'genuine' ? 'bg-emerald-500' : variant === 'fake' ? 'bg-red-500' : 'bg-indigo-500'}`} />
      </div>
      <div className="text-4xl font-black text-white mb-1 tracking-tight">{value}</div>
      <h4 className={`text-xs font-black uppercase tracking-widest mb-3 ${textColors[variant]}`}>{label}</h4>
      <p className="text-[11px] text-slate-500 font-bold leading-relaxed">{sub}</p>
    </motion.div>
  );
};

export default StatCard;
