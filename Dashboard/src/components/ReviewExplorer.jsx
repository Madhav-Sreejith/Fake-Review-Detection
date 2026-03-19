import React from 'react';
import { ExternalLink, Search, Filter } from 'lucide-react';
import { dashboardData } from '../data/dashboardData';

const ReviewExplorer = () => {
  return (
    <div className="glass-panel overflow-hidden border-white/5">
      <div className="p-8 border-b border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white/[0.01]">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">Data Integrity Explorer</h3>
          <p className="text-sm text-slate-400 font-medium">Investigate deep-level review artifacts and classification scores</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
             <input 
              type="text" 
              placeholder="Filter database..." 
              className="bg-slate-900/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-orange-500/30 w-56 font-medium"
            />
          </div>
          <button className="p-2.5 glass-card rounded-xl text-slate-400">
             <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/[0.02] text-slate-500 text-[10px] font-black uppercase tracking-widest">
              <th className="px-8 py-5">Origin Application</th>
              <th className="px-8 py-5">Entity ID</th>
              <th className="px-8 py-5 text-right w-32">Rating</th>
              <th className="px-8 py-5">Model Prediction</th>
              <th className="px-8 py-5 text-right">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03]">
            {dashboardData.topApps.map((app, i) => (
              <tr key={i} className="hover:bg-white/[0.03] transition-all group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center font-black text-xs text-orange-500">
                      {app.app_name.substring(0, 1).toUpperCase()}
                    </div>
                    <div>
                        <div className="text-sm font-bold text-white group-hover:text-orange-500 transition-colors">{app.app_name}</div>
                        <div className="text-[10px] font-black text-slate-600 uppercase">Production v1.2</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-xs font-mono text-slate-500">ID_{Math.floor(Math.random() * 9000) + 1000}</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-1 font-black text-sm text-yellow-500">
                    {app.avg_rating.toFixed(1)} <span className="text-[10px] text-slate-600 opacity-50">★</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${
                    app.fake_percentage > 20 ? 'text-pink-500' : 'text-slate-400'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      app.fake_percentage > 20 ? 'bg-pink-500 animate-pulse' : 'bg-slate-400'
                    }`} />
                    {app.fake_percentage > 20 ? 'Anomalous Activity' : 'Baseline Patterns'}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 glass-card rounded-lg hover:bg-orange-500 group-hover:scale-110 active:scale-95 transition-all">
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-6 bg-white/[0.01] border-t border-white/5 flex items-center justify-between">
         <span className="text-xs font-bold text-slate-500">Showing 15 of database entries</span>
         <div className="flex gap-2">
            <button className="px-3 py-1.5 glass-card rounded-lg text-xs font-bold opacity-50">Previous</button>
            <button className="px-3 py-1.5 glass-card rounded-lg text-xs font-bold text-orange-500 border-orange-500/20 bg-orange-500/5">Next</button>
         </div>
      </div>
    </div>
  );
};

export default ReviewExplorer;
