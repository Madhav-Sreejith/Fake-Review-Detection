import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Linkedin, Mail, GraduationCap } from 'lucide-react';

const Team = () => {
  const members = [
    {
      name: "M. Balaji Sakthivel",
      roll: "CB.SC.U4CSE23213",
      role: "Project Manager",
      responsibility: "Data Acquisition & Initial Analysis",
      notebook: "01_Data_Acquisition.ipynb"
    },
    {
      name: "M. Hasini Reddy",
      roll: "CB.SC.U4CSE23529",
      role: "Data Engineer",
      responsibility: "Data Cleaning & Feature Preparation",
      notebook: "02_Data_Cleaning.ipynb"
    },
    {
      name: "Madhav Sreejith",
      roll: "CB.SC.U4CSE23362",
      role: "Data Analyst",
      responsibility: "Sentiment Analysis & Text Analytics",
      notebook: "03_Sentiment_Analysis.ipynb"
    },
    {
      name: "Shivani",
      roll: "CB.SC.U4CSE23661",
      role: "Analytics Engineer",
      responsibility: "Fake Review Identification & Trust Metrics",
      notebook: "04_Fake_Detection.ipynb"
    },
    {
      name: "Kavin K",
      roll: "CB.SC.U4CSE23726",
      role: "Business Analyst",
      responsibility: "Visualization, Interpretation & Validation",
      notebook: "05_Visualization.ipynb"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-20">
         <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Project <span className="text-indigo-500">Core Team</span></h2>
         <p className="text-slate-400 font-medium">Academic Research Group 9 | 19CSE352 Business Analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
         {members.map((member, i) => (
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={member.roll}
            className="bg-slate-800 p-10 rounded-[2.5rem] border border-slate-700/50 hover:border-indigo-500/50 shadow-xl transition-all group flex flex-col h-full"
           >
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center mb-8 group-hover:bg-indigo-600 transition-colors">
                 <GraduationCap className="text-indigo-500 group-hover:text-white transition-colors" size={32} />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 leading-tight">{member.name}</h3>
              <p className="text-indigo-500 font-black text-[10px] uppercase tracking-widest mb-6">{member.roll}</p>
              
              <div className="mb-8 flex-1">
                 <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 italic">Module Responsibility</div>
                 <p className="text-slate-300 font-bold leading-relaxed">{member.responsibility}</p>
              </div>

              <div className="pt-6 border-t border-slate-700 flex items-center justify-between">
                 <div>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">Verified Artifact</p>
                    <p className="text-xs font-bold text-slate-400">{member.notebook}</p>
                 </div>
                 <div className="flex gap-2 text-slate-500">
                    <Linkedin size={14} className="hover:text-white cursor-pointer" />
                    <Mail size={14} className="hover:text-white cursor-pointer" />
                 </div>
              </div>
           </motion.div>
         ))}
      </div>

      <div className="bg-slate-800 p-12 rounded-[3rem] border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-12">
         <div className="text-center md:text-left">
            <h3 className="text-3xl font-black text-white mb-4 italic">Open Source Implementation</h3>
            <p className="text-slate-400 font-bold max-w-xl">
               Access the full project source code, including pre-processing scripts, model weights, and visualization artifacts on GitHub.
            </p>
         </div>
         <a 
          href="https://github.com/Madhav-Sreejith/Fake-Review-Detection" 
          target="_blank" 
          rel="noreferrer"
          className="px-12 py-5 bg-white text-slate-900 font-black rounded-3xl flex items-center gap-3 hover:bg-indigo-500 hover:text-white transition-all shadow-2xl shadow-white/5 group"
         >
            <Github size={24} /> GITHUB REPOSITORY <ExternalLink size={18} className="translate-y-[-1px]" />
         </a>
      </div>
    </div>
  );
};

export default Team;
