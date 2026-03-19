import React, { useContext, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, LineChart, Line, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { motion } from 'framer-motion';
import { Lightbulb, Info, TrendingUp, Filter } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const { data, loading, error } = useContext(DataContext);

  // Chart 1: Rating Distribution (Genuine vs Fake)
  const ratingData = useMemo(() => {
    const ratings = [1, 2, 3, 4, 5].map(r => ({
      rating: r + "★",
      genuine: data.filter(d => d.rating === r && d.final_prediction === 0).length,
      fake: data.filter(d => d.rating === r && d.final_prediction === 1).length
    }));
    return ratings;
  }, [data]);

  // Chart 2: Fake vs Genuine Pie
  const pieData = useMemo(() => {
    const fakeCount = data.filter(d => d.final_prediction === 1).length;
    const genuineCount = data.length - fakeCount;
    return [
      { name: "Genuine", value: genuineCount },
      { name: "Fake", value: fakeCount }
    ];
  }, [data]);

  // Chart 3: Reviews per App (Stacked)
  const appData = useMemo(() => {
    const appMap = {};
    data.forEach(d => {
      if (!appMap[d.app_name]) appMap[d.app_name] = { name: d.app_name, genuine: 0, fake: 0 };
      if (d.final_prediction === 1) appMap[d.app_name].fake++;
      else appMap[d.app_name].genuine++;
    });
    return Object.values(appMap).sort((a, b) => (b.genuine + b.fake) - (a.genuine + a.fake));
  }, [data]);

  // Chart 4: Review Trend Over Time
  const trendData = useMemo(() => {
    const months = {};
    data.forEach(d => {
      if (!d.review_date) return;
      const date = new Date(d.review_date);
      const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      if (!months[key]) months[key] = { month: key, genuine: 0, fake: 0 };
      if (d.final_prediction === 1) months[key].fake++;
      else months[key].genuine++;
    });
    return Object.values(months).sort((a, b) => a.month.localeCompare(b.month)).slice(-12);
  }, [data]);

  // Chart 5: Sentiment vs Rating (Scatter) - Sample 2000
  const scatterData = useMemo(() => {
    return data
      .filter(d => d.vader_sentiment !== undefined && d.rating !== undefined)
      .slice(0, 2000)
      .map(d => ({
        x: d.vader_sentiment,
        y: d.rating,
        type: d.final_prediction === 1 ? 'Fake' : 'Genuine'
      }));
  }, [data]);

  // Chart 6: Customer Segments
  const segmentData = useMemo(() => {
    const segments = [
      { name: "Loyal Customers", value: 0 },
      { name: "Casual Reviewers", value: 0 },
      { name: "Critical Users", value: 0 },
      { name: "Suspicious Bots", value: 0 }
    ];
    data.forEach(d => {
      if (d.customer_segment !== undefined && segments[d.customer_segment]) {
        segments[d.customer_segment].value++;
      }
    });
    return segments;
  }, [data]);

  // Key Insights
  const insights = useMemo(() => {
    if (!data.length) return null;
    const floodingCount = data.filter(d => d.is_flooding === true).length;
    const avgInconsistency = (data.reduce((acc, d) => acc + (d.sentiment_inconsistency || 0), 0) / data.length).toFixed(4);
    
    const appFakes = {};
    data.forEach(d => {
       if (d.final_prediction === 1) {
          appFakes[d.app_name] = (appFakes[d.app_name] || 0) + 1;
       }
    });
    const mostFakeApp = Object.entries(appFakes).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    const hours = {};
    data.forEach(d => {
      if (d.is_flooding === true && d.hour !== undefined) {
         hours[d.hour] = (hours[d.hour] || 0) + 1;
      }
    });
    const peakHour = Object.entries(hours).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    return { floodingCount, avgInconsistency, mostFakeApp, peakHour };
  }, [data]);

  if (loading) return <LoadingSpinner message="Generating Statistical Models..." />;

  const COLORS = {
    genuine: '#10b981',
    fake: '#ef4444',
    indigo: '#6366f1',
    slate: '#94a3b8'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Analytical <span className="text-indigo-500">Workspace</span></h2>
           <p className="text-slate-400 font-medium">Deep-level behavioral analysis derived from project CSV artifacts.</p>
        </div>
        <div className="flex gap-2">
           <div className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl flex items-center gap-2 text-xs font-bold text-slate-300">
              <Filter className="w-3 h-3 text-indigo-500" /> REFRESHED: TODAY
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Rating Dist */}
        <ChartCard title="Rating Distribution" sub="Genuine (Green) vs Fake (Red)">
           <ResponsiveContainer width="100%" height="300">
              <BarChart data={ratingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="rating" stroke={COLORS.slate} fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke={COLORS.slate} fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#ffffff02'}} contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px'}} />
                <Bar dataKey="genuine" fill={COLORS.genuine} radius={[4, 4, 0, 0]} />
                <Bar dataKey="fake" fill={COLORS.fake} radius={[4, 4, 0, 0]} />
              </BarChart>
           </ResponsiveContainer>
        </ChartCard>

        {/* Global Proportion */}
        <ChartCard title="Integrity Classification" sub="Distribution of entire dataset">
           <ResponsiveContainer width="100%" height="300">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  <Cell fill={COLORS.genuine} />
                  <Cell fill={COLORS.fake} />
                </Pie>
                <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px'}} />
              </PieChart>
           </ResponsiveContainer>
           <div className="flex justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Genuine</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /> Fake</span>
           </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
         {/* Review Trend */}
         <ChartCard title="Temporal Review Pulse" sub="Detection trends over time (Last 12 Months)">
            <ResponsiveContainer width="100%" height={350}>
               <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff03" vertical={false} />
                  <XAxis dataKey="month" stroke={COLORS.slate} fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke={COLORS.slate} fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px'}} />
                  <Line type="monotone" dataKey="genuine" stroke={COLORS.genuine} strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="fake" stroke={COLORS.fake} strokeWidth={3} dot={false} />
               </LineChart>
            </ResponsiveContainer>
         </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <ChartCard title="Reviews per App" sub="Volume comparison" className="lg:col-span-2">
           <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke={COLORS.slate} fontSize={9} width={80} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px'}} />
                <Bar dataKey="genuine" stackId="a" fill={COLORS.genuine} radius={[0, 0, 0, 0]} barSize={12} />
                <Bar dataKey="fake" stackId="a" fill={COLORS.fake} radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
           </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Customer Segments" sub="Behavioral types">
           <ResponsiveContainer width="100%" height={300}>
               <PieChart>
                 <Pie data={segmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value">
                    <Cell fill="#6366f1" />
                    <Cell fill="#10b981" />
                    <Cell fill="#f97316" />
                    <Cell fill="#ef4444" />
                 </Pie>
                 <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b'}} />
               </PieChart>
           </ResponsiveContainer>
           <div className="grid grid-cols-2 gap-2 text-[8px] font-bold text-slate-500 uppercase">
              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-indigo-500" /> Loyal</span>
              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-500" /> Casual</span>
              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-orange-500" /> Critical</span>
              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-red-500" /> Bots</span>
           </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-20">
         <ChartCard title="Sentiment vs Rating Correlation" sub="Sampled distribution (2,000 entities)">
            <ResponsiveContainer width="100%" height={400}>
               <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff03" />
                  <XAxis type="number" dataKey="x" name="Sentiment" stroke={COLORS.slate} unit="" label={{ value: 'VADER Sentiment', position: 'bottom', fill: COLORS.slate, fontSize: 10 }} />
                  <YAxis type="number" dataKey="y" name="Rating" stroke={COLORS.slate} unit="★" label={{ value: 'Rating', angle: -90, position: 'left', fill: COLORS.slate, fontSize: 10 }} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Data Points" data={scatterData} fill={COLORS.indigo}>
                     {scatterData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.type === 'Fake' ? COLORS.fake : COLORS.genuine} opacity={0.6} />
                     ))}
                  </Scatter>
               </ScatterChart>
            </ResponsiveContainer>
         </ChartCard>
      </div>

      {/* Insights */}
      {insights && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-indigo-600/10 border border-indigo-500/20 p-10 rounded-[2.5rem] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Lightbulb size={200} className="text-indigo-500" />
          </div>
          <h3 className="text-2xl font-black text-white mb-10 flex items-center gap-3">
             <Lightbulb className="text-indigo-400" /> Key Business Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             <InsightItem label="Risk Concentration" value={insights.mostFakeApp} sub="Top App by Fake Count" />
             <InsightItem label="Sentiment Bias" value={insights.avgInconsistency} sub="Avg Inconsistency Score" />
             <InsightItem label="Temporal Peak" value={insights.peakHour + ":00"} sub="Highest Flooding Hour" />
             <InsightItem label="Threat Vectors" value={insights.floodingCount} sub="Total Flooding Events" />
          </div>
        </motion.div>
      )}
    </div>
  );
};

const ChartCard = ({ title, sub, children, className = "" }) => (
  <div className={`bg-slate-800 p-8 rounded-[2rem] border border-slate-700/50 shadow-xl ${className}`}>
    <div className="mb-6 flex items-start justify-between">
       <div>
          <h4 className="text-white font-bold text-lg mb-1">{title}</h4>
          <p className="text-xs text-slate-500 font-bold">{sub}</p>
       </div>
       <Info className="w-4 h-4 text-slate-600" />
    </div>
    {children}
  </div>
);

const InsightItem = ({ label, value, sub }) => (
  <div className="border-l-2 border-indigo-500/30 pl-6">
     <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</h5>
     <div className="text-2xl font-black text-white mb-1 tracking-tight">{value}</div>
     <p className="text-[10px] text-indigo-400 font-bold uppercase">{sub}</p>
  </div>
);

export default Dashboard;
