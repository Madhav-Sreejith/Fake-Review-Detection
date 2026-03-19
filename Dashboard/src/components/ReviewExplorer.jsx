import React, { useState } from 'react';
import { Search, Filter, ExternalLink } from 'lucide-react';
import { dashboardData } from '../data/dashboardData';

const ReviewExplorer = () => {
  const [filter, setFilter] = useState('all');
  
  return (
    <div className="glass-card rounded-2xl overflow-hidden animate-in">
      <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Review Explorer</h3>
          <p className="text-sm text-slate-400">Drill down into individual review records</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search apps or users..." 
              className="bg-white/5 border border-white/10 rounded-lg py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30"
            />
          </div>
          <select 
            className="bg-white/5 border border-white/10 rounded-lg py-1.5 px-3 text-sm focus:outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="fake">Fake Only</option>
            <option value="genuine">Genuine Only</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/2 text-slate-400 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Application</th>
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Sentiment</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {/* Displaying top apps as a sample, in a real app this would be mapped from a larger list */}
            {dashboardData.topApps.map((app, i) => (
              <tr key={i} className="hover:bg-white/2 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center font-bold text-xs">
                      {app.app_name.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="font-medium">{app.app_name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">
                  User_{Math.floor(Math.random() * 1000)}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    i % 3 === 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {i % 3 === 0 ? 'Positive' : 'Negative'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 text-sm ${
                    app.fake_percentage > 20 ? 'text-orange-400' : 'text-slate-400'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      app.fake_percentage > 20 ? 'bg-orange-400' : 'bg-slate-400'
                    }`} />
                    {app.fake_percentage > 20 ? 'High Risk' : 'Low Risk'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-slate-500 hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewExplorer;
