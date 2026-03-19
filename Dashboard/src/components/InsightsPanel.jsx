import React from 'react';
import { Lightbulb, TrendingDown, CheckCircle2 } from 'lucide-react';

const InsightsPanel = () => {
  return (
    <div className="glass-card p-6 rounded-2xl flex flex-col">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <Lightbulb className="text-yellow-400 w-5 h-5" />
        Business Insights
      </h3>

      <div className="space-y-4 flex-1">
        <InsightItem 
          type="warning"
          title="Rating Inflation"
          description="Avg. ratings are inflated by 0.5 stars due to coordinated fake positive clusters."
        />
        <InsightItem 
          type="success"
          title="Spam Filtering"
          description="Your detection rate is up by 12% following the latest model update."
        />
        <InsightItem 
          type="info"
          title="Critical App Risk"
          description="App 'Vatakara Rice' shows high risk with 32 suspicious reviews in 48 hours."
        />
      </div>

      <div className="mt-8 p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
        <p className="text-xs text-orange-400 font-bold uppercase mb-1">Recommended Action</p>
        <p className="text-sm">Initiate deep-audit for top 3 apps in Anomaly Density chart.</p>
      </div>
    </div>
  );
};

const InsightItem = ({ type, title, description }) => {
  const icons = {
    warning: <TrendingDown className="text-red-400 w-4 h-4 mt-1" />,
    success: <CheckCircle2 className="text-green-400 w-4 h-4 mt-1" />,
    info: <Lightbulb className="text-blue-400 w-4 h-4 mt-1" />
  };

  return (
    <div className="flex gap-3">
      {icons[type]}
      <div>
        <h5 className="text-sm font-semibold">{title}</h5>
        <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default InsightsPanel;
