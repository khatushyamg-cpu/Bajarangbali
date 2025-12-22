
import React from 'react';

const Hero: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#f4f1ea] flex items-center justify-center p-4 pt-20 md:pt-24">
      <div className="max-w-4xl w-full mahalaxmi-border-card p-6 md:p-12 text-center relative overflow-hidden">
        {/* Border Text */}
        <div className="hindi-border-text hbt-top">॥ जय श्री राम ॥ जय श्री हनुमान ॥ जय श्री राम ॥ जय श्री हनुमान ॥ जय श्री राम ॥</div>
        <div className="hindi-border-text hbt-bottom">॥ जय श्री राम ॥ जय श्री हनुमान ॥ जय श्री राम ॥ जय श्री हनुमान ॥ जय श्री राम ॥</div>
        <div className="hindi-border-text hbt-left">॥ जय श्री राम ॥ जय श्री हनुमान ॥ जय श्री राम ॥ जय श्री हनुमान ॥ जय श्री राम ॥</div>
        <div className="hindi-border-text hbt-right">॥ जय श्री राम ॥ जय श्री हनुमान ॥ जय श्री राम ॥ जय श्री हनुमान ॥ जय श्री राम ॥</div>

        <header className="mb-6 md:mb-8">
          <div className="flex justify-center gap-4 md:gap-6 mb-4 md:mb-6 opacity-80">
            <span className="text-2xl md:text-3xl">🪷</span>
            <span className="text-2xl md:text-3xl text-red-800">🕉️</span>
            <span className="text-2xl md:text-3xl">🪷</span>
          </div>
          <h2 className="font-hindi text-xl md:text-2xl text-red-800 mb-1">श्री हनुमते नमः</h2>
          <h1 className="font-hindi text-4xl md:text-7xl lg:text-8xl font-black text-red-900 drop-shadow-sm mb-4">
            हनुमान भक्ति
          </h1>
          <p className="font-cinzel text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] text-stone-500 uppercase">Parampara Digital Calendar Edition</p>
        </header>

        <div className="relative inline-block mb-8 md:mb-10 group">
          <div className="absolute inset-0 bg-red-800/10 rounded-full blur-3xl scale-125"></div>
          <img 
            src="https://images.unsplash.com/photo-1610473068533-315895786377?q=80&w=800" 
            alt="Hanuman Ji" 
            className="relative z-10 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-cover rounded-full border-4 md:border-8 border-red-800 shadow-2xl transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute -bottom-2 md:-bottom-4 left-1/2 -translate-x-1/2 z-20 bg-red-800 text-[#D4AF37] px-4 md:px-8 py-1 md:py-2 rounded-full font-hindi text-lg md:text-xl border-2 border-[#D4AF37] shadow-lg whitespace-nowrap">
            ॥ पवनपुत्र ॥
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-8 md:mb-12 px-2">
          <p className="font-hindi text-lg md:text-2xl text-stone-700 leading-relaxed italic">
            "अतुलितबलधामं हेमशैलाभदेहं दनुजवनकृशानुं ज्ञानिनामग्रगण्यम् ।"
          </p>
        </div>

        <button 
          onClick={onStart}
          className="w-full sm:w-auto bg-red-800 hover:bg-red-700 text-white px-8 md:px-12 py-3 md:py-4 rounded-sm font-hindi text-xl md:text-2xl transition-all shadow-xl hover:shadow-2xl active:scale-95 border-b-4 border-black/20"
        >
          recitation प्रारंभ करें
        </button>

        <footer className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-red-800/10 flex flex-wrap justify-center gap-4 md:gap-8 text-red-900/40 font-hindi text-sm md:text-base">
          <span>शंख</span>
          <span>चक्र</span>
          <span>गदा</span>
          <span>पद्म</span>
        </footer>
      </div>
    </div>
  );
};

export default Hero;
