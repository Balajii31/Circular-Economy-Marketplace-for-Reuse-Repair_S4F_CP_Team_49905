import React from 'react';
import { Leaf, Recycle, Zap, Users, Target, Award } from 'lucide-react';
import { Card } from '../components/ui';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-200">
          <Leaf size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">About EcoLoop</h2>
          <p className="text-slate-500">Learn about our mission to create a sustainable future</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Mission Statement */}
        <Card className="p-8 bg-gradient-to-r from-emerald-50 to-slate-50 border-emerald-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              EcoLoop is the world's first AI-powered circular economy marketplace. We empower individuals and communities
              to reduce waste, save money, and earn rewards for every sustainable action. By rethinking consumption patterns
              and repairing what we already own, we're building a future where nothing goes to waste.
            </p>
          </div>
        </Card>

        {/* Why Save Carbon */}
        <Card className="p-8 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Why Save Carbon?</h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Every action we take has an environmental impact. By choosing reuse over disposal, repair over replacement,
              and conscious consumption over excess, we can significantly reduce our carbon footprint and combat climate change.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">1.5°C</div>
                <p className="text-sm text-slate-600">Global warming limit to avoid catastrophic climate change</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">36B</div>
                <p className="text-sm text-slate-600">Tons of CO₂ emitted annually worldwide</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">50%</div>
                <p className="text-sm text-slate-600">Of emissions come from consumer goods lifecycle</p>
              </div>
            </div>
          </div>
        </Card>

        {/* What We Do */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                <Recycle size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-2">Circular Marketplace</h4>
                <p className="text-slate-600 text-sm">
                  Buy, sell, and trade pre-owned items. Our AI analyzes products to suggest the most sustainable
                  reuse options, maximizing environmental impact.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <Zap size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-2">AI Impact Analysis</h4>
                <p className="text-slate-600 text-sm">
                  Real-time carbon footprint calculations for every action. Track your environmental impact
                  and see the difference you're making for the planet.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                <Users size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-2">Repair Network</h4>
                <p className="text-slate-600 text-sm">
                  Connect with local repair professionals. Extend the life of your belongings instead of
                  discarding them, saving money and reducing waste.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                <Award size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-2">Reward System</h4>
                <p className="text-slate-600 text-sm">
                  Earn points for sustainable actions. Redeem rewards from our partners and climb the
                  Eco-Warrior leaderboard to inspire others.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="p-8">
          <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">How EcoLoop Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h4 className="font-bold text-slate-800 mb-2">Add Your Item</h4>
              <p className="text-slate-600 text-sm">
                Upload photos and details of items you want to sell, repair, or donate.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h4 className="font-bold text-slate-800 mb-2">AI Analysis</h4>
              <p className="text-slate-600 text-sm">
                Our AI evaluates repair potential, market value, and environmental impact.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h4 className="font-bold text-slate-800 mb-2">Take Action</h4>
              <p className="text-slate-600 text-sm">
                Choose the best option: repair, resell, or donate. Earn rewards for your choice.
              </p>
            </div>
          </div>
        </Card>

        {/* Impact Stats */}
        <Card className="p-8 bg-slate-900 text-white">
          <h3 className="text-xl font-bold mb-6 text-center">Our Impact So Far</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-400">10,000+</p>
              <p className="text-slate-400 text-sm">Items Circulated</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-400">50 tons</p>
              <p className="text-slate-400 text-sm">CO₂ Saved</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-400">5,000+</p>
              <p className="text-slate-400 text-sm">Eco-Warriors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-400">$250K</p>
              <p className="text-slate-400 text-sm">Money Saved</p>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="p-8 text-center bg-emerald-600 text-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <Target size={48} className="mx-auto mb-4 text-white" />
          <h3 className="text-2xl font-bold mb-4 text-white">Join the Movement</h3>
          <p className="text-white/90 mb-6">
            Every action counts. Start your journey towards a more sustainable lifestyle today.
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('changeView', { detail: 'add-item' }))}
            className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;