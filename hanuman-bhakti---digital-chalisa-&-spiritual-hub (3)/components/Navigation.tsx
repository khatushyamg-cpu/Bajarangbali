
import React from 'react';

interface NavigationProps {
  currentView: string;
  setView: (view: 'home' | 'chalisa' | 'counter' | 'calendar' | 'reflection') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const links = [
    { id: 'home', label: 'मुखपृष्ठ', icon: '🏠' },
    { id: 'chalisa', label: 'चालीसा', icon: '📜' },
    { id: 'counter', label: 'जाप माला', icon: '📿' },
    { id: 'calendar', label: 'पंचांग', icon: '📅' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#8B0000] border-b-2 border-gold z-50 shadow-xl">
      <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center font-hindi text-red-900 font-black">ॐ</div>
          <h1 className="font-hindi text-xl md:text-2xl font-black text-white tracking-widest hidden sm:block">हनुमान भक्ति</h1>
        </div>
        
        <div className="flex gap-2 md:gap-6">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => setView(link.id as any)}
              className={`flex flex-col items-center px-3 py-1 rounded transition-all ${
                currentView === link.id 
                  ? 'bg-white/10 text-gold scale-105 border-b-2 border-gold' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-lg md:text-xl">{link.icon}</span>
              <span className="font-hindi text-[10px] md:text-xs font-bold mt-1">{link.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
