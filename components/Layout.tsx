
import React from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  BarChart3, 
  Settings, 
  LogOut,
  Leaf,
  Menu,
  X,
  ShoppingBag,
  Wrench,
  Heart,
  Trophy
} from 'lucide-react';
import { authService } from '../lib/auth';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const user = authService.getUser();

  const handleLogout = () => {
    authService.logout();
    window.location.reload();
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'add-item', label: 'Add Item', icon: PlusCircle },
    { id: 'marketplace', label: 'Eco-Marketplace', icon: ShoppingBag },
    { id: 'repair-network', label: 'Repair Network', icon: Wrench },
    { id: 'donations', label: 'Donation Network', icon: Heart },
    { id: 'challenges', label: 'Challenges', icon: Trophy },
    { id: 'history', label: 'Activity History', icon: History },
    { id: 'analytics', label: 'Impact Analytics', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
            <Leaf size={24} />
          </div>
          <span className="text-xl font-bold text-slate-800">EcoLoop</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeView === item.id 
                  ? 'bg-emerald-50 text-emerald-700' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors">
            <Settings size={20} />
            Settings
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors mt-1"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 md:hidden bg-black/50 transition-opacity ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}>
        <aside 
          className={`absolute left-0 top-0 bottom-0 w-64 bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 flex items-center justify-between border-b">
            <div className="flex items-center gap-2">
              <Leaf className="text-emerald-600" />
              <span className="font-bold text-slate-800">EcoLoop</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} className="text-slate-500" />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                  activeView === item.id ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-slate-500" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-semibold text-slate-800 capitalize">
              {navItems.find(i => i.id === activeView)?.label || activeView.replace('-', ' ')}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Member Since</span>
              <span className="text-sm font-semibold text-slate-800">{user?.name || 'Guest'}</span>
            </div>
            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 border-2 border-white shadow-sm overflow-hidden">
              <img src={`https://picsum.photos/seed/${user?.email || 'guest'}/100/100`} alt="Avatar" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
