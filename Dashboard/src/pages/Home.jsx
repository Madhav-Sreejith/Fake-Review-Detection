import React, { useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, ShieldCheck, Activity, Layers } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import StatCard from '../components/StatCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const { data, loading, error } = useContext(DataContext);

  const stats = useMemo(() => {
    if (!data.length) return null;
    const total = data.length;
    const fake = data.filter(d => d.final_prediction === 1).length;
    const genuine = total - fake;
    const percentage = ((fake / total) * 100).toFixed(2);
    
    // Extract unique apps
    const apps = [...new Set(data.map(d => d.app_name))].filter(Boolean).sort();

    return { total, fake, genuine, percentage, apps };
  }, [data]);

  if (loading) return <LoadingSpinner message="Parsing Dataset Architecture..." />;
  if (error) return <div className="text-center py-20 text-red-500 font-bold">Error: {error}</div>;

  return (
    <div className="pt-16 pb-32">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 px-5 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-black tracking-[0.2em] uppercase inline-block"
        >
          Business Analytics Project | 23CSE452
        </motion.div>
        
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
          Fake Review <br/>
          <span className="text-indigo-500">Detection</span> & <br/>
          Trust Analytics
        </h1>
        

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-24">
          <Link to="/dashboard" className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-3xl font-black transition-all flex items-center justify-center gap-2 group shadow-xl shadow-indigo-600/20">
            DASHBOARD EXPLORER <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/demo" className="bg-slate-800 hover:bg-slate-700 text-white px-10 py-5 rounded-3xl font-black transition-all border border-slate-700">
            TRY LIVE DEMO
          </Link>
        </div>

        {/* Real-time Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            <StatCard 
              label="Total Reviews" 
              value={stats.total.toLocaleString()} 
              sub="Directly parsed from final_results.csv"
              delay={0.1}
            />
            <StatCard 
              label="Fake Detected" 
              value={stats.fake.toLocaleString()} 
              sub="Classified via Consensus Logic"
              variant="fake"
              delay={0.2}
            />
            <StatCard 
              label="Genuine Reviews" 
              value={stats.genuine.toLocaleString()} 
              sub="Verified Consumer Entities"
              variant="genuine"
              delay={0.3}
            />
            <StatCard 
              label="Fake Percentage" 
              value={stats.percentage + "%"} 
              sub="Aggregate Suspicion Score"
              delay={0.4}
            />
          </div>
        )}

        {/* App Badges */}
        <div className="mb-32">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-12">Apps under surveillance</p>
          <div className="flex flex-wrap justify-center gap-3">
             {stats?.apps.map((app, i) => (
               <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                key={app} 
                className="px-6 py-3 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-slate-400 text-xs font-bold hover:text-white hover:border-indigo-500/30 transition-all cursor-default"
               >
                 {app}
               </motion.span>
             ))}
          </div>
        </div>

        {/* Pipeline Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
           <PipelineStep number="01" title="Scraping" desc="70,000+ artifacts from Google Play Store" icon={<Database className="w-5 h-5 text-indigo-500" />} />
           <PipelineStep number="02" title="Cleaning" desc="Duplicate removal and field normalization" icon={<Activity className="w-5 h-5 text-emerald-500" />} />
           <PipelineStep number="03" title="Sentiment" desc="Advanced TextBlob & VADER inconsistency scoring" icon={<Layers className="w-5 h-5 text-amber-500" />} />
           <PipelineStep number="04" title="Detection" desc="Gradient Boosting + Isolation Forest consensus" icon={<ShieldCheck className="w-5 h-5 text-indigo-500" />} />
        </div>
      </section>
    </div>
  );
};

const PipelineStep = ({ number, title, desc, icon }) => (
  <div>
    <div className="flex items-center gap-3 mb-4">
       <span className="text-[10px] font-black text-slate-700">{number}</span>
       <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
          {icon}
       </div>
    </div>
    <h4 className="text-white font-black text-lg mb-2">{title}</h4>
    <p className="text-slate-500 text-sm font-medium leading-relaxed">{desc}</p>
  </div>
);

export default Home;
