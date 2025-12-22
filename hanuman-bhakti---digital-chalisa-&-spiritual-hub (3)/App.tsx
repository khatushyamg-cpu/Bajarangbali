
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ChalisaReader from './components/ChalisaReader';
import JapaCounter from './components/JapaCounter';
import PanchangView from './components/PanchangView';
import { AppState } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppState['currentView']>('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const renderView = () => {
    switch (view) {
      case 'home':
        return <Hero onStart={() => setView('chalisa')} />;
      case 'chalisa':
        return <ChalisaReader />;
      case 'counter':
        return <JapaCounter />;
      case 'calendar':
        return <PanchangView />;
      default:
        return <Hero onStart={() => setView('chalisa')} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-stone-800">
      <Navigation currentView={view} setView={setView} />
      
      <main className="relative z-10">
        {renderView()}
      </main>

      <footer className="bg-[#1a0f0a] py-12 px-4 border-t-4 border-red-800 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-6 mb-8 text-gold/30 text-2xl">
            <span>🐚</span><span>☸️</span><span>🛕</span><span>🪷</span>
          </div>
          <p className="text-white/60 font-cinzel text-xs tracking-[0.5em] mb-4 uppercase">
            © {new Date().getFullYear()} HANUMAN BHAKTI DIGITAL PANCHANG
          </p>
          <p className="text-white/40 font-hindi text-sm">
            धार्मिक जागृति और आध्यात्मिक शांति का डिजिटल द्वार
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
