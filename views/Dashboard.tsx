
import React, { useState, useEffect } from 'react';
import StatsGrid from '../components/Dashboard/StatsGrid';
import CarbonChart from '../components/Dashboard/CarbonChart';
import { Transaction, ActionType, UserStats } from '../types';
import { Zap, PlusCircle, ShoppingBag, Wrench, ArrowRight, History, Loader2 } from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';
import { api } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userStats, products] = await Promise.all([
          api.stats.getStats(),
          api.products.getAll()
        ]);
        
        setStats(userStats);
        
        // Map products to transactions for the activity feed
        const activities: Transaction[] = products
          .filter(p => p.status !== 'pending' && p.recommendations)
          .slice(0, 3)
          .map(p => ({
            id: p.id,
            productName: p.name,
            action: p.recommendations![0].action,
            carbonSaved: p.recommendations![0].carbonSaved,
            rewardPoints: p.recommendations![0].rewardPoints,
            status: p.status === 'processed' ? 'Completed' : 'Analyzed',
            date: new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          }));

        setRecentActivity(activities);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !stats) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-200">
          <Zap size={28} fill="currentColor" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome back!</h2>
          <p className="text-slate-500">You're making a measurable difference for the planet.</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Button variant="primary" className="h-24 flex-col text-xs" onClick={() => window.dispatchEvent(new CustomEvent('changeView', { detail: 'add-item' }))}>
            <PlusCircle size={24} /> New Item
          </Button>
          <Button variant="outline" className="h-24 flex-col text-xs" onClick={() => window.dispatchEvent(new CustomEvent('changeView', { detail: 'marketplace' }))}>
            <ShoppingBag size={24} /> Shop Eco
          </Button>
          <Button variant="outline" className="h-24 flex-col text-xs" onClick={() => window.dispatchEvent(new CustomEvent('changeView', { detail: 'repair-network' }))}>
            <Wrench size={24} /> Repair
          </Button>
          <Button variant="outline" className="h-24 flex-col text-xs" onClick={() => window.dispatchEvent(new CustomEvent('changeView', { detail: 'history' }))}>
            <History size={24} /> History
          </Button>
        </div>

        <StatsGrid stats={stats} />
        <CarbonChart />

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-slate-900 text-white p-8 relative">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl">Eco-Warrior</h3>
                <Badge variant="success">Level {Math.floor(stats.rewardsEarned / 500) + 1}</Badge>
              </div>
              <p className="text-slate-400 text-sm mb-6">{500 - (stats.rewardsEarned % 500)} pts to next Level</p>
              <div className="w-full bg-slate-800 h-3 rounded-full mb-8">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${(stats.rewardsEarned % 500) / 5}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-2xl">
                  <p className="text-2xl font-bold">{Math.max(1, 500 - stats.totalActions)}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Global Rank</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-2xl">
                  <p className="text-2xl font-bold">{Math.floor(stats.totalActions / 5)}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Badges</p>
                </div>
              </div>
              <Button variant="primary" className="w-full mt-8 bg-emerald-500 hover:bg-emerald-400">
                Redeem {stats.rewardsEarned.toLocaleString()} Points
              </Button>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-800 text-lg">Recent Loop Activity</h3>
              <Button variant="ghost" className="text-xs" onClick={() => window.dispatchEvent(new CustomEvent('changeView', { detail: 'history' }))}>View All</Button>
            </div>
            <div className="space-y-6">
              {recentActivity.length > 0 ? recentActivity.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                      {tx.action === ActionType.REPAIR ? <Wrench size={20} /> : <ShoppingBag size={20} />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors">{tx.productName}</p>
                      <p className="text-xs text-slate-400 font-medium">{tx.action} • {tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-emerald-600">+{tx.carbonSaved}kg</p>
                    <ArrowRight size={14} className="text-slate-300 ml-auto mt-1 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              )) : (
                <div className="text-center py-8">
                  <p className="text-slate-400 text-sm">No recent activity. Start by adding an item!</p>
                  <Button variant="outline" className="mt-4 w-full" onClick={() => window.dispatchEvent(new CustomEvent('changeView', { detail: 'add-item' }))}>
                    Add First Item
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
