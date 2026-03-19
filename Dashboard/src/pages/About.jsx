import React, { useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Layers, Database, Activity, ShieldCheck, Cpu } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import LoadingSpinner from '../components/LoadingSpinner';

const About = () => {
  const { data, rawDataset, loading } = useContext(DataContext);

  const stats = useMemo(() => {
    if (!data.length) return null;
    const avgInconsistency = (data.reduce((acc, d) => acc + (d.sentiment_inconsistency || 0), 0) / data.length).toFixed(4);
    return {
      rawCount: rawDataset.length || 70000,
      cleanCount: data.length,
      fakeCount: data.filter(d => d.final_prediction === 1).length,
      avgInconsistency
    };
  }, [data, rawDataset]);

  if (loading) return <LoadingSpinner message="Reconstructing Methodology..." />;

  const tools = [
    "Python", "Pandas", "NumPy", "Scikit-learn", "VADER", "TextBlob",
    "Matplotlib", "Seaborn", "Tableau", "Jupyter Notebook", 
    "GitHub", "google-play-scraper"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <section className="mb-24">
        <h2 className="text-4xl font-black text-white mb-8 tracking-tight">Project <span className="text-indigo-500">Overview</span></h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 font-medium text-slate-400 leading-relaxed">
          <p>
            The proliferation of mobile applications has made user reviews a critical component of consumer decision-making and product credibility. However, this has also led to an increase in fraudulent review practices, aimed at artificially inflating or deflating app rankings. Our project addresses this challenge by implementing a robust, multi-layered detection system.
          </p>
          <p>
            By combining advanced Natural Language Processing (NLP) techniques with machine learning algorithms like Isolation Forest and One-Class SVM, we identify anomalies in sentiment, rating patterns, and submission behaviors. This project serves as a comprehensive tool for both businesses and consumers to navigate the digital marketplace with verified trust.
          </p>
        </div>
      </section>

      {/* Pipeline Visualization */}
      <section className="mb-24">
        <h3 className="text-2xl font-black text-white mb-12 flex items-center gap-3 italic">
           <Cpu className="text-emerald-500" /> Technical Pipeline
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-1 rounded-[2.5rem] bg-slate-800">
           <PipelineCard 
            step="01" 
            title="Data Collection" 
            desc="Source: Google Play Store" 
            tool="google-play-scraper"
            output="fake_review_dataset.csv"
            stat={`${stats?.rawCount.toLocaleString()} Rows`}
            icon={<Database className="text-indigo-400" />}
           />
           <PipelineCard 
            step="02" 
            title="Data Cleaning" 
            desc="Deduplication & Missing Values" 
            tool="Standardization"
            output="stage2_cleaned_data.csv"
            stat={`${stats?.cleanCount.toLocaleString()} Unique Records`}
            icon={<Activity className="text-emerald-400" />}
           />
           <PipelineCard 
            step="03" 
            title="Sentiment Analyis" 
            desc="TextBlob + VADER Scoring" 
            tool="NLP Engine"
            output="Sentiment Feature Maps"
            stat={`Avg Inconsistency: ${stats?.avgInconsistency}`}
            icon={<Layers className="text-amber-400" />}
           />
           <PipelineCard 
            step="04" 
            title="Fake Detection" 
            desc="Isolation Forest + SVM + RF" 
            tool="Ensemble Model"
            output="Final Classification"
            stat={`${stats?.fakeCount.toLocaleString()} Anomalies Detected`}
            icon={<ShieldCheck className="text-red-400" />}
           />
        </div>
      </section>

      {/* Tools Badge Section */}
      <section>
         <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-10 text-center">Development Stack Architecture</h4>
         <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {tools.map((tool, i) => (
               <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                key={tool} 
                className="px-6 py-3 bg-slate-800 border border-slate-700 rounded-full text-indigo-400 text-xs font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all cursor-default"
               >
                  {tool}
               </motion.span>
            ))}
         </div>
      </section>
    </div>
  );
};

const PipelineCard = ({ step, title, desc, tool, output, stat, icon }) => (
  <div className="p-8 hover:bg-slate-700/30 rounded-[2rem] transition-all group">
    <div className="flex items-center gap-3 mb-6">
       <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center border border-slate-600 group-hover:border-indigo-500/50 transition-colors">
          {icon}
       </div>
       <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Stage {step}</span>
    </div>
    <h4 className="text-white font-black text-xl mb-4 leading-tight">{title}</h4>
    <div className="space-y-4 mb-8">
       <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-slate-600" />
          <p className="text-xs text-slate-400 font-bold">{desc}</p>
       </div>
       <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-slate-600" />
          <p className="text-xs text-slate-400 font-bold">Tool: <span className="text-slate-300">{tool}</span></p>
       </div>
       <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-slate-600" />
          <p className="text-xs text-slate-400 font-bold">Output: <span className="text-slate-300">{output}</span></p>
       </div>
    </div>
    <div className="pt-4 border-t border-slate-700">
       <div className="text-indigo-400 font-black text-sm uppercase tracking-tighter">{stat}</div>
    </div>
  </div>
);

export default About;
