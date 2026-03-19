import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, 
  PieChart, Pie, Legend, AreaChart, Area
} from 'recharts';

export const TrendsChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorGenuine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorFake" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
        <XAxis 
          dataKey="date" 
          stroke="#475569" 
          fontSize={10} 
          tickLine={false} 
          axisLine={false} 
          tick={{ dy: 10 }}
        />
        <YAxis 
          stroke="#475569" 
          fontSize={10} 
          tickLine={false} 
          axisLine={false} 
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#020617', borderColor: '#ffffff10', borderRadius: '16px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)' }}
          itemStyle={{ fontSize: '12px' }}
        />
        <Area 
          type="monotone" 
          dataKey="fake" 
          stroke="#f97316" 
          strokeWidth={4} 
          fillOpacity={1} 
          fill="url(#colorFake)" 
          animationDuration={2000}
        />
        <Area 
          type="monotone" 
          dataKey="genuine" 
          stroke="#3b82f6" 
          strokeWidth={4} 
          fillOpacity={1} 
          fill="url(#colorGenuine)" 
          animationDuration={2500}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export const AppDensityChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
        <XAxis type="number" hide />
        <YAxis 
          dataKey="app_name" 
          type="category" 
          stroke="#94a3b8" 
          fontSize={10} 
          width={150}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip 
          cursor={{ fill: '#ffffff02' }}
          contentStyle={{ backgroundColor: '#020617', borderColor: '#ffffff10', borderRadius: '16px' }}
        />
        <Bar dataKey="fake" radius={[0, 8, 8, 0]} barSize={20}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index < 3 ? '#ec4899' : '#f97316'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export const SentimentPie = ({ data }) => {
  const chartData = Object.entries(data).map(([key, value]) => ({
    name: key,
    value: value
  }));

  const COLORS = ['#22c55e', '#ec4899', '#f97316'];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          innerRadius={70}
          outerRadius={90}
          paddingAngle={8}
          dataKey="value"
          stroke="none"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ backgroundColor: '#020617', borderColor: '#ffffff10', borderRadius: '16px' }}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36} 
          iconType="circle"
          formatter={(value) => <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider pl-1">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
