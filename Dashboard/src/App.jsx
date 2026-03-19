import React, { useState } from 'react';
import { 
  BarChart3, 
  AlertTriangle, 
  Users, 
  Database, 
  TrendingUp, 
  ShieldCheck,
  Search,
  Bell,
  Info
} from 'lucide-react';
import { dashboardData } from './data/dashboardData';
import MetricCard from './components/MetricCard';
import { TrendsChart, AppDensityChart, SentimentPie } from './components/Charts';
import InsightsPanel from './components/InsightsPanel';
import ReviewExplorer from './components/ReviewExplorer';
import AnomaliesPanel from './components/AnomaliesPanel';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/5 p-6 flex flex-col fixed h-full">
        <div className="flex items-center gap-2 mb-10 px-2">
          <ShieldCheck className="w-8 h-8 text-orange-500" />
          <h1 className="text-xl font-bold tracking-tight">FakeGuard AI</h1>
        </div>

        <nav className="space-y-1 flex-1">
          <NavItem 
            icon={<BarChart3 />} 
            label="Overview" 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
          />
          <NavItem 
            icon={<AlertTriangle />} 
            label="Anomalies" 
            active={activeTab === 'anomalies'} 
            onClick={() => setActiveTab('anomalies')} 
          />
          <NavItem 
            icon={<Users />} 
            label="Suspicious Users" 
            active={activeTab === 'users'} 
            onClick={() => setActiveTab('users')} 
          />
          <NavItem 
            icon={<Database />} 
            label="Raw Analytics" 
            active={activeTab === 'raw'} 
            onClick={() => setActiveTab('raw')} 
          />
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
            <p className="text-xs text-orange-400 font-medium mb-1">DATA STATUS</p>
            <p className="text-sm font-semibold">Live Analysis</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Project Dashboard</h2>
            <p className="text-slate-400">Fake Review Detection & Business Analytics</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search analytics..." 
                className="bg-slate-800/50 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 w-64 transition-all"
              />
            </div>
            <button className="p-2 glass-card rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-pink-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in">
            {/* Metric Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard 
                label="Total Reviews" 
                value={dashboardData.metrics.totalReviews.toLocaleString()} 
                subValue="+2.4% vs last mo"
                icon={<Database className="text-blue-500" />}
              />
              <MetricCard 
                label="Fake Reviews" 
                value={dashboardData.metrics.fakeReviews.toLocaleString()} 
                subValue={`${dashboardData.metrics.fakePercentage}% of total`}
                icon={<AlertTriangle className="text-orange-500" />}
                trend="danger"
              />
              <MetricCard 
                label="Unique Apps" 
                value={dashboardData.metrics.uniqueApps} 
                subValue="Across 12 categories"
                icon={<TrendingUp className="text-green-500" />}
              />
              <MetricCard 
                label="Trust Index" 
                value="84.2%" 
                subValue="Global average"
                icon={<ShieldCheck className="text-purple-500" />}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-semibold mb-6 flex justify-between">
                  Review Volume Trend
                  <Info className="w-4 h-4 text-slate-500 cursor-help" />
                </h3>
                <div className="h-[300px]">
                  <TrendsChart data={dashboardData.trends} />
                </div>
              </div>

              <InsightsPanel />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-semibold mb-6">Sentiment Analysis (Fake vs Genuine)</h3>
                <div className="h-[300px]">
                  <SentimentPie data={dashboardData.sentiment} />
                </div>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-semibold mb-6">App-wise Anomaly Density</h3>
                <div className="h-[300px]">
                  <AppDensityChart data={dashboardData.topApps} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'anomalies' && (
          <AnomaliesPanel />
        )}

        {(activeTab === 'users' || activeTab === 'raw') && (
          <ReviewExplorer />
        )}
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active 
          ? 'bg-orange-500/20 text-orange-500 border border-orange-500/20' 
          : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {React.cloneElement(icon, { size: 20 })}
      <span className="font-medium">{label}</span>
    </button>
  );
}

export default App;
