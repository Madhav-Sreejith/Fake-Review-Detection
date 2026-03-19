import React from 'react';
import { AlertCircle, Clock, Zap } from 'lucide-react';
import { dashboardData } from '../data/dashboardData';

const AnomaliesPanel = () => {
  return (
    <div className="space-y-6 animate-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border-l-4 border-l-orange-500">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-orange-500 w-5 h-5" />
            <h4 className="font-semibold">Flooding Peak</h4>
          </div>
          <p className="text-3xl font-bold">124</p>
          <p className="text-xs text-slate-400">Events in last 24h</p>
        </div>
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-blue-500 w-5 h-5" />
            <h4 className="font-semibold">Avg. Interval</h4>
          </div>
          <p className="text-3xl font-bold">4.2s</p>
          <p className="text-xs text-slate-400">Between bot reviews</p>
        </div>
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="text-pink-500 w-5 h-5" />
            <h4 className="font-semibold">Coordinated Attacks</h4>
          </div>
          <p className="text-3xl font-bold">8</p>
          <p className="text-xs text-slate-400">Active clusters detected</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-lg font-semibold">Top Suspicious Actors</h3>
          <p className="text-sm text-slate-400">Users with highest flooding activity</p>
        </div>
        <div className="p-0">
          {Object.entries(dashboardData.topFlooders).map(([user, count], i) => (
            <div key={user} className="flex items-center justify-between p-4 px-6 hover:bg-white/2 transition-all border-b border-white/5 last:border-0">
              <div className="flex items-center gap-4">
                <span className="text-slate-600 font-bold w-4 text-center">{i + 1}</span>
                <div>
                  <p className="font-medium text-sm">{user}</p>
                  <p className="text-xs text-slate-500">Active across 3 products</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-orange-400">{count}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Rapid Actions</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnomaliesPanel;
