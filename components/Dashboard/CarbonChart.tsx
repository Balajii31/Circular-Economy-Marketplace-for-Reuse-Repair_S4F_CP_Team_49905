
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', value: 45 },
  { name: 'Feb', value: 52 },
  { name: 'Mar', value: 48 },
  { name: 'Apr', value: 70 },
  { name: 'May', value: 61 },
  { name: 'Jun', value: 85 },
  { name: 'Jul', value: 120 },
];

const CarbonChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Environmental Impact</h3>
          <p className="text-sm text-slate-500">Net CO2 savings over the last 6 months</p>
        </div>
        <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-1 text-slate-600 outline-none">
          <option>Last 6 Months</option>
          <option>Last Year</option>
        </select>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#64748b', fontSize: 12}} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#64748b', fontSize: 12}} 
              tickFormatter={(value) => `${value}kg`}
            />
            <Tooltip 
              contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#10b981" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CarbonChart;
