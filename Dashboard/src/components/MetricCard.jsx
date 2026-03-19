import React from 'react';
import { motion } from 'framer-motion';

const MetricCard = ({ label, value, subValue, icon, status, highlight }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`relative p-6 rounded-3xl overflow-hidden transition-all duration-300 ${
        highlight 
          ? 'bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/30' 
          : 'bg-white/[0.02] border-white/5'
      } border backdrop-blur-3xl`}
    >
      {highlight && (
        <div className="absolute top-0 right-0 p-4 opacity-10">
           {React.cloneElement(icon, { size: 120 })}
        </div>
      )}
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className={`p-3 rounded-2xl border ${
          highlight ? 'bg-orange-500/20 border-orange-500/30' : 'bg-white/5 border-white/10'
        }`}>
          {React.cloneElement(icon, { size: 24 })}
        </div>
        
        {status === 'warning' && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full">
            <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest">Anomaly</span>
          </div>
        )}
      </div>

      <div className="relative z-10">
        <h4 className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{label}</h4>
        <div className={`text-4xl font-extrabold tracking-tight mb-2 ${
          highlight ? 'text-white' : 'text-slate-100'
        }`}>
          {value}
        </div>
        <p className={`text-[11px] font-bold ${
          highlight ? 'text-orange-500/80' : 'text-slate-500'
        }`}>
          {subValue}
        </p>
      </div>

      <div className={`absolute bottom-0 left-0 h-1 transition-all duration-500 ${
        highlight ? 'bg-orange-500 w-full' : 'bg-transparent w-0 group-hover:bg-white/10'
      }`} />
    </motion.div>
  );
};

export default MetricCard;
