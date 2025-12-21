
import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
// Added missing Wrench and Leaf imports
import { Trophy, Users, Globe, ExternalLink, Info, Award, ShieldCheck, Flame, Wrench, Leaf } from 'lucide-react';
import { Card, Badge, Button } from '../components/ui';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#a855f7'];

const actionData = [
  { name: 'Repair', value: 45 },
  { name: 'Reuse', value: 25 },
  { name: 'Resale', value: 20 },
  { name: 'Donation', value: 10 },
];

const benchmarkData = [
  { name: 'Wk 1', you: 12, avg: 8 },
  { name: 'Wk 2', you: 18, avg: 9 },
  { name: 'Wk 3', you: 15, avg: 10 },
  { name: 'Wk 4', you: 25, avg: 11 },
];

const Analytics = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-emerald-600 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-emerald-100 flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <div className="p-4 bg-emerald-500 rounded-2xl w-fit mb-8 shadow-lg">
              <Globe size={32} />
            </div>
            <h3 className="text-xl font-black">Community Impact</h3>
            <p className="text-emerald-100 text-sm opacity-80 mt-2">Collective effort of 12.4k members</p>
          </div>
          <div className="mt-12 relative z-10">
            <p className="text-5xl font-black">142.5</p>
            <p className="text-emerald-200 text-xs font-black uppercase tracking-[0.3em] mt-2">Tons CO2 Neutralized</p>
          </div>
          <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-emerald-400/20 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-1000" />
        </div>

        <Card className="md:col-span-2 p-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="font-black text-slate-800 text-2xl tracking-tight">Eco-Loop Benchmarks</h3>
              <p className="text-slate-500">Your personal performance against the city average</p>
            </div>
            <div className="hidden sm:flex gap-6 text-[10px] font-black uppercase tracking-widest">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm"></div> You</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-200 shadow-sm"></div> Global Avg</div>
            </div>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarkData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc', radius: 8}} 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} 
                />
                <Bar dataKey="you" fill="#10b981" radius={[8, 8, 0, 0]} barSize={32} />
                <Bar dataKey="avg" fill="#e2e8f0" radius={[8, 8, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Achievement Badges Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">Sustainable Achievements</h3>
          <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest">View Gallery</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Repair Master', icon: Wrench, color: 'text-blue-600 bg-blue-50', desc: '5 repairs completed' },
            { name: 'Carbon Hero', icon: Leaf, color: 'text-emerald-600 bg-emerald-50', desc: 'Saved 100kg CO2' },
            { name: 'Power Giver', icon: Flame, color: 'text-orange-600 bg-orange-50', desc: '10 day usage streak' },
            { name: 'Verified Loop', icon: ShieldCheck, color: 'text-purple-600 bg-purple-50', desc: 'ID Verified' },
          ].map((badge) => (
            <Card key={badge.name} className="p-6 text-center hover:scale-105 transition-all cursor-pointer group">
              <div className={`w-16 h-16 rounded-[1.5rem] mx-auto mb-4 flex items-center justify-center ${badge.color} group-hover:rotate-12 transition-transform`}>
                <badge.icon size={32} />
              </div>
              <p className="font-black text-slate-800 text-sm mb-1">{badge.name}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{badge.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-10">
          <h3 className="font-black text-slate-800 text-2xl tracking-tight mb-8">Circular Decisions</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={actionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={10}
                  dataKey="value"
                  stroke="none"
                >
                  {actionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="space-y-8">
          <Card className="p-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="p-4 bg-amber-50 text-amber-600 rounded-[1.5rem] shadow-sm">
                <Trophy size={32} />
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-800">Top Contributor</h4>
                <p className="text-sm text-slate-500 font-medium">Monthly Leaderboard Standings</p>
              </div>
            </div>
            <div className="space-y-6">
              {[
                { name: 'Sarah Jenkins', rank: 1, saved: 480 },
                { name: 'Alex (You)', rank: 2, saved: 412, isSelf: true },
                { name: 'Marcus Doe', rank: 3, saved: 395 },
              ].map((user) => (
                <div key={user.name} className={`flex items-center justify-between p-4 rounded-2xl transition-all ${user.isSelf ? 'bg-emerald-50 ring-2 ring-emerald-500/20' : 'hover:bg-slate-50'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                      user.rank === 1 ? 'bg-amber-100 text-amber-600' : 
                      user.rank === 2 ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {user.rank}
                    </div>
                    <span className={`text-sm font-bold ${user.isSelf ? 'text-emerald-900' : 'text-slate-700'}`}>{user.name}</span>
                  </div>
                  <Badge variant={user.isSelf ? 'success' : 'neutral'}>{user.saved}kg Saved</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-indigo-900 p-10 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-3">Sustainable Insights</h3>
              <p className="text-indigo-200 text-sm mb-8 leading-relaxed font-medium">
                Our latest data shows items repaired this quarter lasted 42% longer than brand-new equivalents. 
                Rethink ownership, embrace durability.
              </p>
              <Button variant="primary" className="bg-white text-indigo-900 hover:bg-indigo-50 border-none shadow-none">
                Read Impact Report <ExternalLink size={18} />
              </Button>
            </div>
            <Users className="absolute -right-12 -bottom-12 text-white/5 w-56 h-56 group-hover:scale-110 transition-transform duration-1000" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
