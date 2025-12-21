
import React, { useState, useEffect } from 'react';
import { Challenge } from '../types';
import { api } from '../services/api';
import { Trophy, Zap, Clock, Star, Target, Loader2, ArrowRight, Share2 } from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';

const Challenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.challenges.getActive().then(data => {
      setChallenges(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-emerald-600" size={40} /></div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Active Challenges</h2>
          <p className="text-slate-500 mt-2 text-lg">Push your boundaries, save the planet, and earn massive rewards.</p>
        </div>
        <Card className="bg-emerald-600 text-white px-8 py-6 flex items-center gap-6 shadow-xl shadow-emerald-100">
          <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg">
            <Trophy size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Your Points</p>
            <p className="text-3xl font-black tracking-tight">5,840</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="p-8 group hover:scale-[1.01] transition-all">
            <div className="flex items-start justify-between gap-6 mb-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-slate-900 text-emerald-500 rounded-[1.5rem] flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform">
                  <Zap size={32} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800">{challenge.title}</h3>
                  <div className="flex items-center gap-2 text-slate-400 text-xs mt-1">
                    <Clock size={12} /> {challenge.deadline}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-emerald-600 font-black text-lg">+{challenge.reward}pts</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Bonus</p>
              </div>
            </div>

            <p className="text-slate-600 text-sm mb-8 leading-relaxed font-medium">
              {challenge.description}
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                <span className="text-slate-500">Progress</span>
                <span className="text-emerald-600">{challenge.progress} / {challenge.target}</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                />
              </div>
            </div>

            <Button variant="outline" className="w-full mt-8">
              Accept Challenge <ArrowRight size={18} className="ml-2" />
            </Button>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-8 text-center bg-amber-50 border-amber-100">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target size={24} />
          </div>
          <h4 className="font-black text-slate-800 mb-2">Milestone Goals</h4>
          <p className="text-xs text-slate-500 font-medium">Reach 50 items Looped to unlock the "Master Loop" badge.</p>
        </Card>
        
        <Card className="p-8 text-center bg-blue-50 border-blue-100 md:col-span-2 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-left">
            <h4 className="font-black text-slate-800 text-xl mb-2">Referral Program</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Invite friends to the circular movement. Earn 500 points for every friend who completes their first analysis.
            </p>
          </div>
          <Button variant="secondary" className="whitespace-nowrap">
            Share Link <Share2 size={18} className="ml-2" />
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Challenges;
