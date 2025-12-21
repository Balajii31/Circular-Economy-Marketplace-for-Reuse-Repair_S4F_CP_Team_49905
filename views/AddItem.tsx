
import React, { useState } from 'react';
import { ProductType, ProductCondition, Recommendation, ActionType, Product } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  Loader2, 
  ShieldCheck, 
  Leaf, 
  Award,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  ChevronLeft
} from 'lucide-react';
import { Button, Input, Card, Badge, Alert } from '../components/ui';
import { api } from '../services/api';

const AddItem = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: ProductType.ELECTRONICS,
    condition: ProductCondition.GOOD,
    age: '1-2 years',
    marketValue: '',
    description: ''
  });

  const isFormValid = formData.name && formData.marketValue && step === 2;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Create the product via API
      const product = await api.products.create({
        ...formData,
        marketValue: parseFloat(formData.marketValue) || 0
      });

      // 2. Trigger ML Analysis
      const results = await api.ml.analyze(product.id);
      setRecommendations(results);
    } catch (err) {
      console.error("Analysis failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRecommendation = async (rec: Recommendation) => {
    // In a real app, this would update the transaction/status
    alert(`Great choice! You've opted for ${rec.action}. Your rewards will be credited soon.`);
    window.dispatchEvent(new CustomEvent('changeView', { detail: 'dashboard' }));
  };

  if (recommendations) {
    return (
      <div className="max-w-5xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center md:text-left">
            <Badge variant="success">Analysis Phase: Complete</Badge>
            <h2 className="text-4xl font-black text-slate-900 mt-2 tracking-tight">AI Decision Results</h2>
            <p className="text-slate-500 text-lg">We've calculated the optimal circular path for your {formData.name}</p>
          </div>
          <Button variant="outline" onClick={() => { setRecommendations(null); setStep(1); setImagePreview(null); }}>
            <ChevronLeft size={18} /> Process Another Item
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recommendations.map((rec, i) => (
            <Card 
              key={rec.action} 
              className={`relative p-8 transition-all hover:scale-[1.01] ${
                i === 0 ? 'ring-4 ring-emerald-500/20 border-emerald-500' : 'hover:border-slate-300'
              }`}
            >
              {i === 0 && (
                <div className="absolute -top-4 left-8 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                  <Sparkles size={12} /> Intelligence Pick
                </div>
              )}
              
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-slate-800">{rec.action}</h3>
                <div className="bg-emerald-50 text-emerald-700 px-4 py-1 rounded-full text-sm font-bold">
                  {Math.round(rec.score * 100)}% Match
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-2 text-emerald-600 mb-1">
                    <Leaf size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">CO2 Savings</span>
                  </div>
                  <p className="text-xl font-bold text-slate-900">{rec.carbonSaved}kg</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-2 text-amber-600 mb-1">
                    <Award size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Rewards</span>
                  </div>
                  <p className="text-xl font-bold text-slate-900">{rec.rewardPoints}pts</p>
                </div>
              </div>

              <div className="bg-indigo-50/30 border border-indigo-100 p-5 rounded-2xl mb-8 min-h-[80px]">
                <p className="text-slate-600 text-sm italic leading-relaxed">
                  "{rec.reasoning}"
                </p>
              </div>

              <Button 
                variant={i === 0 ? 'primary' : 'outline'} 
                className="w-full h-14 text-lg"
                onClick={() => handleSelectRecommendation(rec)}
              >
                Proceed with {rec.action} <ArrowRight size={20} />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-center gap-8 mb-12">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${
              step >= i ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-200 text-slate-400'
            }`}>
              {step > i ? <CheckCircle2 size={20} /> : i}
            </div>
            <span className={`text-sm font-bold ${step >= i ? 'text-slate-800' : 'text-slate-400'}`}>
              {i === 1 ? 'Media Upload' : 'Product Details'}
            </span>
            {i === 1 && <div className="w-12 h-0.5 bg-slate-200" />}
          </div>
        ))}
      </div>

      <Card className="shadow-2xl shadow-slate-200/50">
        <div className="bg-slate-900 p-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-tight">Circular Lifecycle Intake</h2>
            <p className="text-slate-400 mt-2 text-lg">Unlock the hidden environmental value of your items.</p>
          </div>
          <Sparkles className="absolute right-[-20px] top-[-20px] text-emerald-500/10 w-48 h-48 rotate-12" />
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-10">
          {step === 1 ? (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div 
                className={`border-4 border-dashed rounded-[2.5rem] p-16 flex flex-col items-center justify-center gap-6 transition-all group cursor-pointer ${
                  imagePreview ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-100 hover:border-emerald-200 hover:bg-slate-50/50'
                }`}
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <input 
                  type="file" 
                  id="image-upload" 
                  hidden 
                  accept="image/*" 
                  onChange={handleImageUpload}
                />
                {imagePreview ? (
                  <div className="relative w-48 h-48 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white">
                    <img src={imagePreview} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-emerald-600/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Upload className="text-white" size={32} />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2rem] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <ImageIcon size={40} />
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-slate-800">Upload Product Photos</p>
                      <p className="text-slate-500 mt-1">AI identifies condition and category instantly</p>
                    </div>
                    <Button variant="outline" type="button" className="mt-2">Browse Files</Button>
                  </>
                )}
              </div>
              <Alert icon={<ShieldCheck size={18} />}>
                Images are processed locally to ensure privacy. Our model helps estimate <strong>Repairability Index</strong>.
              </Alert>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input 
                  label="Product Name" 
                  placeholder="e.g. Sony WH-1000XM4" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Category</label>
                  <select
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as ProductType})}
                  >
                    {Object.values(ProductType).map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Condition</label>
                  <select
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none"
                    value={formData.condition}
                    onChange={(e) => setFormData({...formData, condition: e.target.value as ProductCondition})}
                  >
                    <option value={ProductCondition.GOOD}>Excellent Condition</option>
                    <option value={ProductCondition.FAIR}>Visible Wear/Functional</option>
                    <option value={ProductCondition.DAMAGED}>Needs Professional Repair</option>
                  </select>
                </div>
                <Input 
                  label="Est. Value ($)" 
                  type="number" 
                  placeholder="0.00" 
                  value={formData.marketValue}
                  onChange={(e) => setFormData({...formData, marketValue: e.target.value})}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Item Biography</label>
                <textarea
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                  placeholder="How long have you owned it? Any known defects or recent repairs?"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="ghost" type="button" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                <Button variant="primary" type="submit" className="flex-[2] h-14" disabled={loading || !isFormValid}>
                  {loading ? <Loader2 className="animate-spin" /> : <>Run Intelligence Analysis <Sparkles size={18} /></>}
                </Button>
              </div>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
};

export default AddItem;
