
import React from 'react';
import { Leaf, Award, Recycle, Box } from 'lucide-react';
import { UserStats } from '../../types';

interface StatsGridProps {
  stats: UserStats;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const cards = [
    { 
      label: 'Carbon Saved', 
      value: `${stats.carbonSaved} kg`, 
      sub: 'CO2 equivalent', 
      icon: Leaf, 
      color: 'bg-emerald-50 text-emerald-600' 
    },
    { 
      label: 'Reward Points', 
      value: stats.rewardsEarned.toLocaleString(), 
      sub: 'Available to redeem', 
      icon: Award, 
      color: 'bg-amber-50 text-amber-600' 
    },
    { 
      label: 'Total Actions', 
      value: stats.totalActions, 
      sub: 'Lifecycle decisions', 
      icon: Recycle, 
      color: 'bg-blue-50 text-blue-600' 
    },
    { 
      label: 'Items Processed', 
      value: stats.itemsProcessed, 
      sub: 'Successfully looped', 
      icon: Box, 
      color: 'bg-purple-50 text-purple-600' 
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-transform hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${card.color}`}>
              <card.icon size={24} />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <div>
            <h3 className="text-slate-500 text-sm font-medium">{card.label}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{card.value}</p>
            <p className="text-slate-400 text-xs mt-1">{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
