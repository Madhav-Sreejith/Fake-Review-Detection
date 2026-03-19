import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Zap, Clock, Users, ChevronRight } from 'lucide-react';
import { dashboardData } from '../data/dashboardData';

const AnomaliesPanel = () => {
  return (
    <div className="space-y-10 animate-fade-in">
       {/* High Risk Header */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="text-pink-500 font-black tracking-[0.2em] text-xs uppercase mb-3 block">Critical Surveillance</span>
            <h2 className="text-4xl font-extrabold text-white tracking-tight">Anomaly Cluster Analysis</h2>
          </div>
          <div className="flex gap-4">
             <div className="px-6 py-3 bg-pink-500/10 border border-pink-500/20 rounded-2xl flex items-center gap-3">
                <ShieldAlert className="text-pink-500 w-5 h-5" />
                <span className="text-sm font-bold text-pink-500">8 Threats Active</span>
             </div>
          </div>
       </div>

       {/* Anomaly Metrics */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <AnomalyStatsCard 
            icon={<Zap className="text-orange-500" />}
            label="Flooding Burst Count"
            value={(dashboardData.metrics.totalFlooding / 1000).toFixed(1) + "k"}
            sub="Total anomalies detected"
            color="orange"
         />
         <AnomalyStatsCard 
            icon={<Clock className="text-blue-500" />}
            label="Avg Inter-Action Time"
            value={dashboardData.metrics.avgInterval + "s"}
            sub="Highly Automated"
            color="blue"
         />
         <AnomalyStatsCard 
            icon={<Users className="text-pink-500" />}
            label="Coordinated Clusters"
            value={dashboardData.metrics.clusters}
            sub="Identified Botnets"
            color="pink"
         />
       </div>

       {/* Suspect Matrix */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-panel p-8">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white">Top Behavioral Suspects</h3>
                <button className="text-xs font-black text-slate-500 hover:text-orange-500 transition-colors">VIEW FULL REPOSITORY</button>
             </div>
             
             <div className="space-y-2">
                {Object.entries(dashboardData.topFlooders).map(([user, count], i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={user} 
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-5">
                       <span className="text-slate-700 font-bold text-xs w-4">0{i+1}</span>
                       <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center border border-white/5 font-black text-orange-500 group-hover:scale-110 transition-transform">
                          {user.substring(0, 1)}
                       </div>
                       <div>
                          <h5 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{user}</h5>
                          <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                             <span className="flex items-center gap-1 text-pink-500/70"><Zap className="w-2 h-2" /> High Freq</span>
                             <span>Rating Deviant</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-8">
                       <div className="text-right">
                          <div className="text-lg font-black text-white">{count}</div>
                          <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Logs</div>
                       </div>
                       <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>

          <div className="glass-panel p-8 bg-gradient-to-br from-pink-500/10 via-transparent to-transparent border-pink-500/10">
             <h4 className="text-sm font-black text-pink-500 uppercase tracking-[0.2em] mb-6">Threat Summary</h4>
             <div className="space-y-6">
                <div className="pb-6 border-b border-white/5">
                   <p className="text-xs font-bold text-slate-400 mb-2 uppercase">Core Vector</p>
                   <p className="text-sm font-medium leading-relaxed">
                     System-wide flooding profiles identified in {dashboardData.summary.peakApp}. 
                     Cluster analysis suggests a targeted campaign affecting high-volume review periods.
                   </p>
                </div>
                <div>
                   <p className="text-xs font-bold text-slate-400 mb-2 uppercase">Impact radius</p>
                   <div className="flex gap-2 flex-wrap mt-3">
                      {dashboardData.summary.riskApps.map(app => (
                        <span key={app} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold">{app}</span>
                      ))}
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

const AnomalyStatsCard = ({ icon, label, value, sub, color }) => {
  const borderColors = {
    orange: 'border-orange-500/30',
    blue: 'border-blue-500/30',
    pink: 'border-pink-500/30'
  };

  return (
    <div className={`glass-panel p-8 border-b-4 ${borderColors[color]}`}>
       <div className="p-3 bg-white/5 border border-white/10 rounded-2xl w-fit mb-6">
          {icon}
       </div>
       <h4 className="text-xs font-bold text-slate-500 uppercase tracking-[0.1em] mb-2">{label}</h4>
       <div className="text-4xl font-extrabold text-white mb-1 tracking-tighter">{value}</div>
       <p className="text-xs font-medium text-slate-500">{sub}</p>
    </div>
  );
};

export default AnomaliesPanel;
