
import React, { useState } from 'react';
import { HANUMAN_NAMES } from '../constants';

const JapaCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [totalMala, setTotalMala] = useState(0);
  const [isCelebrated, setIsCelebrated] = useState(false);

  const handleIncrement = () => {
    const nextCount = count + 1;
    setCount(nextCount);
    
    if (nextCount > 0 && nextCount % 108 === 0) {
      setTotalMala(prev => prev + 1);
      setIsCelebrated(true);
      setTimeout(() => setIsCelebrated(false), 2000);
    }

    if ('vibrate' in navigator) {
      navigator.vibrate([30]);
    }
  };

  const reset = () => {
    if (window.confirm("Reset current mala?")) {
      setCount(0);
    }
  };

  const currentName = HANUMAN_NAMES[count % HANUMAN_NAMES.length];
  const progress = ((count % 108) / 108) * 100;
  // Handle the display logic: when count is a multiple of 108, show 108 instead of 0
  const displayCount = count % 108 === 0 && count !== 0 ? 108 : count % 108;

  return (
    <div className="min-h-screen bg-[#f4f1ea] flex items-center justify-center p-4 py-20 md:py-24">
      <div className="max-w-2xl w-full mahalaxmi-border-card p-6 md:p-10 text-center">
        <div className="hindi-border-text hbt-top">॥ राम राम राम राम राम राम राम राम राम ॥</div>
        <div className="hindi-border-text hbt-bottom">॥ राम राम राम राम राम राम राम राम राम ॥</div>
        <div className="hindi-border-text hbt-left">॥ राम राम राम ॥</div>
        <div className="hindi-border-text hbt-right">॥ राम राम राम ॥</div>

        <header className="mb-8 md:mb-10">
          <h2 className="font-hindi text-3xl md:text-4xl font-black text-red-900 mb-2">नाम-जप माला</h2>
          <p className="font-cinzel text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-stone-400 uppercase">Silent Devotion Hub</p>
        </header>

        <div className="relative w-56 h-56 md:w-64 md:h-64 mx-auto mb-8 md:mb-10 flex items-center justify-center">
          {/* SVG needs pointer-events-none to not block clicks on the button */}
          <svg className="absolute w-full h-full -rotate-90 pointer-events-none">
            <circle cx="50%" cy="50%" r="46%" fill="none" stroke="#eee" strokeWidth="10" />
            <circle 
              cx="50%" cy="50%" r="46%" 
              fill="none" stroke="#8B0000" strokeWidth="10"
              strokeDasharray="100 100" 
              strokeDashoffset={100 - (count === 0 ? 0 : (progress === 0 ? 100 : progress))}
              pathLength="100"
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <button 
            onClick={handleIncrement}
            aria-label="Increment Bead Count"
            className={`tap-pulse w-40 h-40 md:w-48 md:h-48 bg-white rounded-full border-4 border-red-800 shadow-xl flex flex-col items-center justify-center transition-all hover:scale-105 active:scale-90 z-20 ${isCelebrated ? 'ring-8 ring-red-800/20' : ''}`}
          >
            <span className="font-cinzel text-5xl md:text-7xl font-black text-red-900 leading-none">
              {displayCount}
            </span>
            <span className="font-hindi text-stone-400 text-xs md:text-sm mt-2">पुण्य माला</span>
          </button>
        </div>

        <div className="bg-white border-2 border-red-800/20 p-4 md:p-6 rounded-lg mb-6 md:mb-8 shadow-inner">
          <h3 className="font-hindi text-xl md:text-3xl font-bold text-red-900 mb-1">॥ ॐ {currentName} नमः ॥</h3>
          <p className="text-stone-400 text-[10px] md:text-xs font-cinzel uppercase tracking-widest">Divine Salutation</p>
        </div>

        <div className="flex justify-between items-center border-t border-red-800/10 pt-4 md:pt-6 px-2">
          <div className="text-left">
            <p className="text-[8px] md:text-[10px] text-stone-400 uppercase font-cinzel tracking-widest">Total Malas</p>
            <p className="text-xl md:text-2xl font-bold text-red-900">{totalMala}</p>
          </div>
          <button 
            onClick={reset}
            className="text-[10px] font-cinzel tracking-widest text-red-800 hover:text-red-600 font-black uppercase bg-red-800/5 px-3 py-1 rounded"
          >
            Reset Current
          </button>
        </div>
      </div>
    </div>
  );
};

export default JapaCounter;
