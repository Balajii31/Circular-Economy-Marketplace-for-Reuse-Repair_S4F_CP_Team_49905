
import React from 'react';
import { RepairProvider } from '../types';
import { ShieldCheck, MapPin, Wrench, Star, ArrowRight, MessageCircle } from 'lucide-react';

const mockProviders: RepairProvider[] = [
  {
    id: 'rp1',
    name: 'TechRevive Electronics',
    specialization: ['Smartphones', 'Laptops', 'Tablets'],
    rating: 4.9,
    location: 'Downtown District',
    isVerified: true,
    activeRepairs: 12,
    imageUrl: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'rp2',
    name: 'Green Thread Tailoring',
    specialization: ['Textiles', 'Bags', 'Vintage Repair'],
    rating: 4.7,
    location: 'Artisan Valley',
    isVerified: true,
    activeRepairs: 8,
    imageUrl: 'https://images.unsplash.com/photo-1528570291660-69ad5786373e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'rp3',
    name: 'Timber & Joint Furniture',
    specialization: ['Antiques', 'Upholstery', 'Woodwork'],
    rating: 4.8,
    location: 'Old Town',
    isVerified: false,
    activeRepairs: 5,
    imageUrl: 'https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?auto=format&fit=crop&q=80&w=200'
  }
];

const RepairNetwork = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Extend the Life of Your Gear</h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Connect with certified local professionals specialized in restoring your items. 
            Repairing saves up to 90% of a product's embedded carbon.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-2xl font-bold transition-all">
              Find Nearby Service
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-2xl font-bold transition-all">
              Become a Provider
            </button>
          </div>
        </div>
        <Wrench size={200} className="absolute -right-20 -bottom-20 text-emerald-500/10 rotate-12" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProviders.map((provider) => (
          <div key={provider.id} className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col hover:border-emerald-200 transition-all shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <img src={provider.imageUrl} alt={provider.name} className="w-16 h-16 rounded-2xl object-cover" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-800">{provider.name}</h3>
                  {provider.isVerified && <ShieldCheck size={16} className="text-blue-500" fill="currentColor" />}
                </div>
                <div className="flex items-center text-xs text-slate-500 gap-1 mt-0.5">
                  <MapPin size={12} /> {provider.location}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star size={14} fill="currentColor" /> {provider.rating}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {provider.specialization.map((spec) => (
                <span key={spec} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold">
                  {spec}
                </span>
              ))}
            </div>

            <div className="bg-emerald-50 rounded-2xl p-4 flex items-center justify-between mb-6">
              <div className="text-xs font-medium text-emerald-700 uppercase tracking-wider">Active Repairs</div>
              <div className="text-lg font-bold text-emerald-600">{provider.activeRepairs} Jobs</div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto">
              <button className="flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">
                <MessageCircle size={18} /> Chat
              </button>
              <button className="flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all">
                Book <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepairNetwork;
