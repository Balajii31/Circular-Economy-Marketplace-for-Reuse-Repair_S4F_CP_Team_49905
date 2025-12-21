
import React, { useState, useEffect } from 'react';
import { NGO } from '../types';
import { api } from '../services/api';
import { Heart, MapPin, Calendar, ArrowRight, ShieldCheck, Info, Loader2 } from 'lucide-react';
import { Card, Button, Badge, Alert } from '../components/ui';

const DonationNetwork = () => {
  const [ngos, setNgos] = useState<NGO[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNgo, setSelectedNgo] = useState<NGO | null>(null);

  useEffect(() => {
    api.ngos.getAll().then(data => {
      setNgos(data);
      setLoading(false);
    });
  }, []);

  const handleSchedule = (ngo: NGO) => {
    setSelectedNgo(ngo);
    // In real app, open scheduling modal
    alert(`Scheduling pickup with ${ngo.name}. A driver will be assigned shortly!`);
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-emerald-600" size={40} /></div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <Badge variant="info">Phase 7: Community Outreach</Badge>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">The Donation Network</h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Connect your pre-loved items with verified local NGO partners. 
          Maximize social impact through curated donation channels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ngos.map((ngo) => (
          <Card key={ngo.id} className="group hover:border-emerald-300 transition-all flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <img src={ngo.imageUrl} alt={ngo.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-blue-600 shadow-sm">
                <ShieldCheck size={14} fill="currentColor" /> Verified Partner
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="mb-4">
                <h3 className="text-xl font-black text-slate-800">{ngo.name}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{ngo.focus}</p>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <MapPin size={16} className="text-slate-400" /> {ngo.location}
                </div>
                <div className="flex items-center gap-3 text-sm text-emerald-600 font-bold">
                  <Heart size={16} /> {ngo.impactMetric}
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-auto"
                onClick={() => handleSchedule(ngo)}
              >
                Schedule Free Pickup <Calendar size={18} className="ml-2" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-slate-900 text-white p-10 overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-4">Tax Benefits</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Every donation through EcoLoop generates an automatic tax-deductible receipt for your local region. 
              Track your impact and your savings.
            </p>
            <Button variant="primary" className="bg-emerald-500 hover:bg-emerald-400">
              Download Tax Summary <Info size={18} className="ml-2" />
            </Button>
          </div>
          <Heart size={200} className="absolute -right-20 -bottom-20 text-white/5 -rotate-12" />
        </Card>

        <Card className="p-10 border-indigo-100 bg-indigo-50/20">
          <h3 className="text-2xl font-black text-slate-800 mb-4">Impact Tracking</h3>
          <p className="text-slate-600 mb-8 leading-relaxed">
            See exactly where your items go. Our NGO partners provide detailed impact reports for every "Looped" donation.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-indigo-100">
              <span className="text-sm font-bold text-slate-700">Recent Donation Impact</span>
              <Badge variant="success">Completed</Badge>
            </div>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest text-center">
              Items reach their destination in avg. 48 hours
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DonationNetwork;
