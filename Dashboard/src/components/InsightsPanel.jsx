import React from 'react';
import { Lightbulb, ShieldAlert, Zap, Target } from 'lucide-react';
import { dashboardData } from '../data/dashboardData';

const InsightsPanel = () => {
  return (
    <div className="glass-panel p-8 flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
      
      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 mb-8 flex items-center gap-2">
        <Target className="text-orange-500 w-4 h-4" />
        Intelligence Report
      </h3>

      <div className="mb-8">
        <div className="text-5xl font-black text-white mb-2">{dashboardData.metrics.trustScore}%</div>
        <p className="text-xs font-bold text-orange-500/80 uppercase">Portfolio Trust Health</p>
      </div>

      <div className="space-y-6 flex-1">
        <InsightItem 
          icon={<ShieldAlert className="text-pink-500" />}
          title="Reputational Risk"
          description={`Average ratings inflated by ${dashboardData.metrics.ratingInflation} stars.`}
        />
        <InsightItem 
          icon={<Zap className="text-yellow-400" />}
          title="Flooding Efficiency"
          description="Detection model latency decreased to 400ms per record."
        />
        <InsightItem 
          icon={<Lightbulb className="text-blue-400" />}
          title="Market Sentiment"
          description="Fake positive clusters identified in recent app updates."
        />
      </div>

      <div className="mt-10 p-5 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
        <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Priority Action</h5>
        <p className="text-sm font-medium text-slate-200">Initiate mass-audit for top 3 high-risk applications.</p>
      </div>
    </div>
  );
};

const InsightItem = ({ icon, title, description }) => {
  return (
    <div className="flex gap-4">
      <div className="mt-1 flex-shrink-0">
        {React.cloneElement(icon, { size: 16 })}
      </div>
      <div>
        <h5 className="text-sm font-bold text-slate-100">{title}</h5>
        <p className="text-xs text-slate-400 leading-relaxed font-medium">{description}</p>
      </div>
    </div>
  );
};

export default InsightsPanel;
