
import React, { useState, useEffect } from 'react';
import { ActionType, Product } from '../types';
import { Search, Filter, Download, MoreHorizontal, Leaf, Award, Loader2, Trash2 } from 'lucide-react';
import { api } from '../services/api';
import { Button } from '../components/ui';

const History = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await api.products.getAll();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this item from your history?")) {
      await api.products.delete(id);
      fetchProducts();
    }
  };

  const handleExportCSV = () => {
    if (products.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = ['Name', 'Type', 'Status', 'Created Date', 'Action', 'Carbon Saved (kg)', 'Reward Points'];
    const csvData = products.map(p => {
      const bestRec = p.recommendations?.[0];
      return [
        p.name,
        p.type,
        p.status,
        new Date(p.createdAt).toLocaleDateString(),
        bestRec?.action || 'N/A',
        bestRec?.carbonSaved || 0,
        bestRec?.rewardPoints || 0
      ];
    });

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `ecoloop-history-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getActionColor = (action: ActionType) => {
    switch(action) {
      case ActionType.REPAIR: return 'bg-emerald-500';
      case ActionType.DONATION: return 'bg-blue-500';
      case ActionType.RESALE: return 'bg-amber-500';
      case ActionType.REUSE: return 'bg-purple-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={16} /> Filter
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="animate-spin text-emerald-600" size={32} />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Item & Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status/Action</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Eco Impact</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Points</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((p) => {
                  const bestRec = p.recommendations?.[0];
                  return (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800">{p.name}</div>
                        <div className="text-xs text-slate-500">{new Date(p.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        {bestRec ? (
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getActionColor(bestRec.action)}`}></div>
                            <span className="text-sm font-medium text-slate-700">{bestRec.action}</span>
                          </div>
                        ) : (
                          <span className="text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-slate-100 text-slate-500">
                            {p.status}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm">
                          <Leaf size={14} />
                          {bestRec ? `${bestRec.carbonSaved}kg` : '--'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 text-amber-600 font-bold">
                          <Award size={14} />
                          {bestRec ? `+${bestRec.rewardPoints}` : '0'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleDelete(p.id)}
                          className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-slate-400">No activities found matching your criteria.</p>
          </div>
        )}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing {filteredProducts.length} of {products.length} activities</p>
        </div>
      </div>
    </div>
  );
};

export default History;
