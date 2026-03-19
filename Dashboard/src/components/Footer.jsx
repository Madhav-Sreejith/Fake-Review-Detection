import React from 'react';

const Footer = () => (
  <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-white font-bold text-xl mb-2 tracking-tight">Fake Review Detection & Trust Analytics</h3>
          <p className="text-slate-400 text-sm max-w-sm">Group 9 | 23CSE452 | Amrita Vishwa Vidyapeetham, Coimbatore</p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Academic Project</p>
          <div className="w-12 h-1 bg-indigo-500 rounded-full mb-2"></div>
          <p className="text-slate-300 text-xs font-bold">Amrita Vishwa Vidyapeetham</p>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-white/5 text-center text-slate-500 text-[10px] font-bold uppercase tracking-widest">
        &copy; 2026 Developed for Business Analytics Coursework
      </div>
    </div>
  </footer>
);

export default Footer;
