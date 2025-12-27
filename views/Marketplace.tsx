
import React from 'react';
import { MarketplaceItem, ProductType, ProductCondition } from '../types';
import { Search, Filter, ShoppingCart, Leaf, Star, Tag } from 'lucide-react';

const mockItems: MarketplaceItem[] = [
  {
    id: 'm1',
    name: 'Refurbished Samsung Galaxy S21',
    price: 19900,
    originalPrice: 27999,
    condition: ProductCondition.GOOD,
    category: ProductType.ELECTRONICS,
    carbonSaved: 85.3,
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=400',
    sellerRating: 4.8
  },
  {
    id: 'm2',
    name: 'Restored Wooden Dining Table',
    price: 3000,
    originalPrice: 6500,
    condition: ProductCondition.FAIR,
    category: ProductType.FURNITURE,
    carbonSaved: 145.2,
    imageUrl: '/product-image.jpg',
    sellerRating: 4.5
  },
  {
    id: 'm3',
    name: 'Upcycled Denim Jacket',
    price: 650,
    originalPrice: 1800,
    condition: ProductCondition.GOOD,
    category: ProductType.CLOTHING,
    carbonSaved: 28.7,
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=400',
    sellerRating: 4.9
  },
  {
    id: 'm4',
    name: 'Energy Efficient Toaster',
    price: 2500,
    originalPrice: 6500,
    condition: ProductCondition.GOOD,
    category: ProductType.APPLIANCES,
    carbonSaved: 15.2,
    imageUrl: '/product-image2.jpg',
    sellerRating: 4.2
  }
];

const Marketplace = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search items for a second life..." 
            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
            <Filter size={18} /> Filters
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
            <Tag size={18} /> Sell Item
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockItems.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden group hover:shadow-xl hover:shadow-slate-100 transition-all">
            <div className="relative h-48 overflow-hidden">
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold text-emerald-600 shadow-sm">
                <Leaf size={12} fill="currentColor" /> {item.carbonSaved}kg Saved
              </div>
              <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-[10px] font-bold text-white">
                <Star size={10} className="text-amber-400" fill="currentColor" /> {item.sellerRating}
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-slate-800 leading-tight">{item.name}</h3>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  item.condition === ProductCondition.GOOD ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {item.condition}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-xl font-bold text-slate-900">₹{item.price}</span>
                <span className="text-sm text-slate-400 line-through">₹{item.originalPrice}</span>
              </div>
              <button className="w-full bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                <ShoppingCart size={18} /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
