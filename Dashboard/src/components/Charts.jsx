import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, 
  PieChart, Pie, Legend 
} from 'recharts';

export const TrendsChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
        <XAxis 
          dataKey="date" 
          stroke="#94a3b8" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        <YAxis 
          stroke="#94a3b8" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1e293b', borderColor: '#ffffff10', borderRadius: '12px' }}
          itemStyle={{ fontSize: '12px' }}
        />
        <Line 
          type="monotone" 
          dataKey="fake" 
          stroke="#f97316" 
          strokeWidth={3} 
          dot={{ r: 4, fill: '#f97316', strokeWidth: 0 }} 
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
        <Line 
          type="monotone" 
          dataKey="genuine" 
          stroke="#3b82f6" 
          strokeWidth={3} 
          dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} 
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const AppDensityChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical">
        <XAxis type="number" hide />
        <YAxis 
          dataKey="app_name" 
          type="category" 
          stroke="#94a3b8" 
          fontSize={10} 
          width={120}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1e293b', borderColor: '#ffffff10', borderRadius: '12px' }}
        />
        <Bar dataKey="fake" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index < 3 ? '#ef4444' : '#f97316'} />
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

  const COLORS = ['#22c55e', '#ef4444', '#eab308'];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ backgroundColor: '#1e293b', borderColor: '#ffffff10', borderRadius: '12px' }}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36} 
          formatter={(value) => <span className="text-slate-400 capitalize">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
