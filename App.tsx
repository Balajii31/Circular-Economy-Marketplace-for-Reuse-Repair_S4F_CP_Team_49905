
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import AddItem from './views/AddItem';
import History from './views/History';
import Analytics from './views/Analytics';
import Marketplace from './views/Marketplace';
import RepairNetwork from './views/RepairNetwork';
import DonationNetwork from './views/DonationNetwork';
import Challenges from './views/Challenges';
import About from './views/About';
import Settings from './views/Settings';
import Auth from './views/Auth';
import { authService } from './lib/auth';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const user = authService.getUser();
    if (user) {
      setIsLoggedIn(true);
    }
    setCheckingAuth(false);

    const handleViewChange = (e: any) => {
      if (e.detail) setActiveView(e.detail);
    };

    window.addEventListener('changeView', handleViewChange);
    return () => window.removeEventListener('changeView', handleViewChange);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'add-item':
        return <AddItem />;
      case 'marketplace':
        return <Marketplace />;
      case 'repair-network':
        return <RepairNetwork />;
      case 'donations':
        return <DonationNetwork />;
      case 'challenges':
        return <Challenges />;
      case 'history':
        return <History />;
      case 'analytics':
        return <Analytics />;
      case 'about':
        return <About />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-emerald-600 rounded-2xl" />
          <div className="h-4 w-24 bg-slate-200 rounded" />
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Auth onAuthSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      {renderView()}
    </Layout>
  );
};

export default App;
