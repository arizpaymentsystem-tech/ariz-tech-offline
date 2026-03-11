import React, { useState, useEffect } from 'react';
import { LanguageProvider, useTranslation } from './lib/translations';
import { Header } from './components/Header';
import { NewsTicker } from './components/NewsTicker';
import { Hero } from './components/Hero';
import { SectionCard } from './components/SectionCard';
import { Footer } from './components/Footer';
import { Toaster, toast } from 'sonner';
import { Balegize } from './components/Balegize';
import { Ayizony } from './components/Ayizony';
import { ArifAychekulm } from './components/ArifAychekulm';
import { TimeMonitor } from './components/TimeMonitor';

const AppContent = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    // Listen for storage events to update streak/plans if TimeMonitor changes them
    const handleStorage = () => {
      // Re-trigger re-renders for children components by toggling a state or simply let React handle if using Context or local state
      // For now, simple re-render triggers might not be needed if children manage their own state with localstorage,
      // but if we want shared state, we'd use context. 
      // For simplicity in this offline first app, components read from localStorage.
      console.log('Storage changed');
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleNavigate = (id: string) => {
    setActiveTab(id);
    if (id !== 'home') {
      toast.info(`Navigating to ${id}...`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <Hero />
            <section className="max-w-7xl mx-auto px-4 py-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <SectionCard id="balegize" title={t.balegize} index={0} onClick={() => handleNavigate('balegize')} />
                <SectionCard id="aizoyn" title={t.aizoyn} index={1} onClick={() => handleNavigate('aizoyn')} />
                <SectionCard id="arif" title={t.arif} index={2} onClick={() => handleNavigate('arif')} />
                <SectionCard id="shekay" title={t.shekay} index={3} onClick={() => handleNavigate('shekay')} />
              </div>
            </section>
          </>
        );
      case 'balegize':
        return <Balegize />;
      case 'aizoyn':
        return <Ayizony />;
      case 'arif':
        return <ArifAychekulm />;
      case 'shekay':
        return (
           <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
              <h2 className="text-4xl font-bold mb-4 uppercase">{t.shekay}</h2>
              <p className="text-blue-300">Content for this section is coming soon.</p>
              <button 
                onClick={() => setActiveTab('home')}
                className="mt-8 px-6 py-2 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors"
              >
                Back Home
              </button>
           </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1B2B] text-white selection:bg-blue-500/30">
      <Toaster position="top-center" richColors theme="dark" />
      <TimeMonitor />
      <Header onNavigate={handleNavigate} />
      
      <main className="pt-16">
        <NewsTicker />
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}