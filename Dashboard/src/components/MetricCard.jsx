import React from 'react';

const MetricCard = ({ label, value, subValue, icon, trend }) => {
  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
          {icon}
        </div>
        {trend && (
          <span className={`text-xs px-2 py-1 rounded-full ${
            trend === 'danger' ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
          }`}>
            {trend === 'danger' ? '↑ High' : '↓ Low'}
          </span>
        )}
      </div>
      <div>
        <h4 className="text-slate-400 text-sm font-medium mb-1">{label}</h4>
        <div className="text-2xl font-bold tracking-tight mb-1">{value}</div>
        <p className="text-xs text-slate-500 font-medium">{subValue}</p>
      </div>
    </div>
  );
};

export default MetricCard;
