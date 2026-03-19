import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ message = "Analyzing Dataset..." }) => (
  <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900/50 backdrop-blur-xl">
    <motion.div
      animate={{ 
        rotate: 360,
        borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="w-16 h-16 border-4 border-indigo-500 border-t-transparent flex items-center justify-center"
    />
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-6 text-indigo-400 font-black tracking-widest uppercase text-xs"
    >
      {message}
    </motion.p>
  </div>
);

export default LoadingSpinner;
