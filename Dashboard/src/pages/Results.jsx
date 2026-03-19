import React, { useContext, useMemo } from 'react';
import { DataContext } from '../context/DataContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { Table, ShieldAlert, Users, LayoutGrid, Database } from 'lucide-react';

const Results = () => {
  const { data, loading } = useContext(DataContext);

  const results = useMemo(() => {
    if (!data.length) return null;
    
    // 1. Detection Summary
    const total = data.length;
    const fake = data.filter(d => d.final_prediction === 1).length;
    const genuine = total - fake;
    const flooding = data.filter(d => d.is_flooding === true).length;
    
    // 2. Customer Segments
    const segments = [
      { label: "Loyal Customers", count: 0 },
      { label: "Casual Reviewers", count: 0 },
      { label: "Critical Users", count: 0 },
      { label: "Suspicious Bots", count: 0 }
    ];
    data.forEach(d => {
      if (d.customer_segment !== undefined && segments[d.customer_segment]) {
        segments[d.customer_segment].count++;
      }
    });

    // 3. App-wise Table
    const appTable = {};
    data.forEach(d => {
      if (!appTable[d.app_name]) appTable[d.app_name] = { total: 0, fake: 0, genuine: 0 };
      appTable[d.app_name].total++;
      if (d.final_prediction === 1) appTable[d.app_name].fake++;
      else appTable[d.app_name].genuine++;
    });

    // 4. Suspicious Reviewers
    const suspects = data
      .filter(d => d.is_flooding === true)
      .sort((a, b) => (b.flooding_count || 0) - (a.flooding_count || 0))
      .slice(0, 10);

    // 5. Sentiment Averages
    const avgTextBlob = (data.reduce((acc, d) => acc + (d.textblob_sentiment || 0), 0) / data.length).toFixed(4);
    const avgVader = (data.reduce((acc, d) => acc + (d.vader_sentiment || 0), 0) / data.length).toFixed(4);
    const avgInconsistency = (data.reduce((acc, d) => acc + (d.sentiment_inconsistency || 0), 0) / data.length).toFixed(4);

    return { 
      total, fake, genuine, flooding, 
      segments, appTable, suspects,
      avgTextBlob, avgVader, avgInconsistency
    };
  }, [data]);

  if (loading) return <LoadingSpinner message="Aggregating Model Verdicts..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-20">
         <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Final Model <span className="text-indigo-500">Classification</span></h2>
         <p className="text-slate-400 font-medium">Detailed quantification of detection metrics and behavioral segmentation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Detection Summary Table */}
        <ResultsTable title="Detection Summary" icon={<ShieldAlert className="text-indigo-500" />}>
           <DetectionRow label="Total Reviews Analyzed" value={results?.total.toLocaleString()} />
           <DetectionRow label="Suspected Fake Reviews" value={`${results?.fake.toLocaleString()} (${((results?.fake / results?.total) * 100).toFixed(2)}%)`} />
           <DetectionRow label="Genuine Reviews" value={`${results?.genuine.toLocaleString()} (${((results?.genuine / results?.total) * 100).toFixed(2)}%)`} />
           <DetectionRow label="Flooding Events" value={results?.flooding.toLocaleString()} />
           <DetectionRow label="Top Predictive Feature" value="Sentiment Inconsistency" />
           <DetectionRow label="Detection Method" value="Consensus (Isolation Forest + SVM)" />
        </ResultsTable>

        {/* Customer Segmentation */}
        <ResultsTable title="Customer Segmentation" icon={<Users className="text-emerald-500" />}>
          <thead>
             <tr className="text-left text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-700">
               <th className="pb-4">Segment</th>
               <th className="pb-4 text-center">Count</th>
               <th className="pb-4 text-center">% Color</th>
               <th className="pb-4 text-right">Label</th>
             </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
             {results?.segments.map((s, i) => (
                <tr key={i} className="text-sm font-bold">
                   <td className="py-4 text-indigo-400">{i}</td>
                   <td className="py-4 text-center text-white">{s.count.toLocaleString()}</td>
                   <td className="py-4 text-center text-slate-400">{((s.count / results.total) * 100).toFixed(1)}%</td>
                   <td className="py-4 text-right text-slate-300">{s.label}</td>
                </tr>
             ))}
          </tbody>
        </ResultsTable>
      </div>

      <div className="grid grid-cols-1 gap-12 mb-20">
         {/* App-wise Performance */}
         <ResultsTable title="Application Audit Log" icon={<LayoutGrid className="text-indigo-500" />}>
            <thead>
               <tr className="text-left text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-700">
                 <th className="pb-4">App Name</th>
                 <th className="pb-4 text-center">Total Volume</th>
                 <th className="pb-4 text-center">Fake Detected</th>
                 <th className="pb-4 text-center">Genuine verified</th>
                 <th className="pb-4 text-right">Risk Factor</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
               {Object.entries(results?.appTable || {}).map(([app, stats], i) => (
                  <tr key={i} className="text-sm font-bold group hover:bg-slate-700/20 transition-all">
                     <td className="py-5 text-white">{app}</td>
                     <td className="py-5 text-center text-slate-400">{stats.total.toLocaleString()}</td>
                     <td className="py-5 text-center text-red-500">{stats.fake.toLocaleString()}</td>
                     <td className="py-5 text-center text-emerald-500">{stats.genuine.toLocaleString()}</td>
                     <td className="py-5 text-right font-black text-indigo-400">
                        {((stats.fake / stats.total) * 100).toFixed(2)}%
                     </td>
                  </tr>
               ))}
            </tbody>
         </ResultsTable>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
         {/* Top Suspicious Reviewers */}
         <div className="lg:col-span-2">
            <ResultsTable title="Emergent Threat Vectors" icon={<Database className="text-red-500" />}>
               <div className="space-y-2">
                  {results?.suspects.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-900 border border-slate-700 rounded-2xl">
                       <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-black text-[10px] text-red-500">{i+1}</div>
                          <div>
                             <div className="text-sm font-bold text-white">{s.user_name}</div>
                             <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{s.app_name}</div>
                          </div>
                       </div>
                       <div className="text-right">
                          <div className="text-lg font-black text-white">{s.flooding_count}</div>
                          <div className="text-[10px] font-bold text-red-500 uppercase">Floods</div>
                       </div>
                    </div>
                  ))}
               </div>
            </ResultsTable>
         </div>

         {/* Sentiment Stats */}
         <div className="bg-indigo-600/5 border border-indigo-500/20 p-8 rounded-[2rem]">
            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-10">Linguistic Analytics</h4>
            <div className="space-y-8">
               <SentimentStat label="Avg TextBlob Verdict" value={results?.avgTextBlob} />
               <SentimentStat label="Avg VADER Sentiment" value={results?.avgVader} />
               <SentimentStat label="Sentiment Inconsistency" value={results?.avgInconsistency} highlight />
            </div>
            <div className="mt-12 p-5 bg-slate-900 rounded-2xl border border-slate-700">
               <p className="text-xs text-slate-500 font-bold leading-relaxed">
                  The model utilizes <span className="text-indigo-400 italic">Sentiment Inconsistency</span> as the primary separator 
                  between deceptive and organic reviewers.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};

const ResultsTable = ({ title, icon, children }) => (
  <div className="bg-slate-800 p-10 rounded-[2.5rem] border border-slate-700/50 shadow-2xl h-full">
    <h3 className="text-xl font-bold text-white mb-10 flex items-center gap-3">
      {icon} {title}
    </h3>
    {children}
  </div>
);

const DetectionRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-5 border-b border-slate-700/50 last:border-0 group">
    <span className="text-sm font-bold text-slate-500 group-hover:text-slate-300 transition-colors uppercase tracking-tight">{label}</span>
    <span className="text-sm font-black text-white tracking-tight">{value}</span>
  </div>
);

const SentimentStat = ({ label, value, highlight }) => (
  <div>
     <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-2">{label}</p>
     <div className={`text-3xl font-black ${highlight ? 'text-indigo-400' : 'text-white'}`}>{value}</div>
  </div>
);

export default Results;
