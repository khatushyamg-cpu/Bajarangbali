
import React, { useState, useEffect } from 'react';
import { CHALISA_VERSES } from '../constants';
import { geminiService } from '../services/geminiService';

const RepeatingBorderText: React.FC<{ text: string; count?: number }> = ({ text, count = 12 }) => {
  const repeatedText = Array(count).fill(text).join(' ');
  return <>{repeatedText}</>;
};

const HolySymbols: React.FC = () => {
  const symbols = [
    { icon: "🐚", label: "शंख", title: "Shanka (Conch)" },
    { icon: "☸️", label: "चक्र", title: "Chakra (Discus)" },
    { icon: "🛕", label: "तिलक", title: "Tilaka" },
    { icon: "🪷", label: "पद्म", title: "Padma (Lotus)" },
  ];

  return (
    <div className="flex justify-center gap-4 md:gap-8 mb-6 md:mb-8">
      {symbols.map((s, idx) => (
        <div key={idx} className="symbol-hover flex flex-col items-center" title={s.title}>
          <div className="text-2xl md:text-3xl mb-1">{s.icon}</div>
          <span className="text-[8px] md:text-[10px] font-hindi text-red-900/60 uppercase">{s.label}</span>
        </div>
      ))}
    </div>
  );
};

const ChalisaReader: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [reflection, setReflection] = useState<{ id: number; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('hanuman_bookmarks');
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  const toggleBookmark = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const newBookmarks = bookmarks.includes(id) 
      ? bookmarks.filter(b => b !== id) 
      : [...bookmarks, id];
    setBookmarks(newBookmarks);
    localStorage.setItem('hanuman_bookmarks', JSON.stringify(newBookmarks));
  };

  const images = [
    { url: "https://images.unsplash.com/photo-1610473068533-315895786377?q=80&w=800", title: "ध्यानमग्न" },
    { url: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=800", title: "पवनपुत्र" },
    { url: "https://images.unsplash.com/photo-1622631525624-9b5757788481?q=80&w=800", title: "संकटमोचन" },
    { url: "https://images.unsplash.com/photo-1590050752117-23a9d7cdee5e?q=80&w=800", title: "राम दरबार" },
    { url: "https://images.unsplash.com/photo-1619814407982-5509930f785a?q=80&w=800", title: "महाबीर" }
  ];

  const handleReflection = async (verse: string, id: number) => {
    if (reflection?.id === id) {
      setReflection(null);
      return;
    }
    setLoading(true);
    const text = await geminiService.getVerseReflection(verse);
    setReflection({ id, text: text || "विद्वान उपलब्ध नहीं हैं।" });
    setLoading(false);
  };

  const displayedVerses = showBookmarksOnly 
    ? CHALISA_VERSES.filter(v => bookmarks.includes(v.id)) 
    : CHALISA_VERSES;

  return (
    <div className="w-full max-w-5xl mx-auto py-16 md:py-24 px-4 sm:px-6">
      <header className="text-center mb-10 md:mb-12">
        <h1 className="font-hindi text-4xl md:text-7xl font-black text-red-900 mb-4 md:mb-6">॥ श्रीहनुमानचालीसा ॥</h1>
        <HolySymbols />
      </header>

      {/* Image Switcher */}
      <div className="mb-8 md:mb-10 text-center">
        <h4 className="font-hindi text-red-800 mb-4 text-sm md:text-base">स्वरूप चयन (Select Darshan)</h4>
        <div className="flex justify-center gap-2 md:gap-3 flex-wrap">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 overflow-hidden transition-all ${
                selectedImageIndex === idx ? 'border-red-800 scale-110 shadow-lg' : 'border-stone-300 opacity-60'
              }`}
            >
              <img src={img.url} className="w-full h-full object-cover" alt={img.title} />
            </button>
          ))}
        </div>
      </div>

      <div className="mahalaxmi-border-card w-full mx-auto">
        <div className="hindi-border-text hbt-top">
          <RepeatingBorderText text="॥ जय श्री राम ॥" count={10} />
        </div>
        <div className="hindi-border-text hbt-bottom">
          <RepeatingBorderText text="॥ जय श्री हनुमान ॥" count={10} />
        </div>
        <div className="hindi-border-text hbt-left">
          <RepeatingBorderText text="॥ जय श्री राम ॥" count={15} />
        </div>
        <div className="hindi-border-text hbt-right">
          <RepeatingBorderText text="॥ जय श्री हनुमान ॥" count={15} />
        </div>

        {/* Featured Image */}
        <div className="relative w-full aspect-video md:aspect-[21/9] border-b-2 border-red-800 overflow-hidden">
          <img 
            src={images[selectedImageIndex].url} 
            className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-105" 
            alt="Hanuman Ji"
          />
          <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 bg-red-800 text-white px-2 md:px-4 py-1 text-xs md:text-sm font-hindi rounded">
            {images[selectedImageIndex].title}
          </div>
        </div>

        {/* Increased padding p-6 md:p-16 to avoid border text overlap on small screens */}
        <div className="p-6 md:p-16">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 md:mb-12 border-b border-red-800/10 pb-4">
            <h2 className="font-hindi text-xl md:text-2xl text-red-900">॥ हनुमान चालीसा ॥</h2>
            <button 
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className="text-[10px] md:text-xs font-cinzel tracking-widest bg-red-800 text-white px-4 py-2 rounded uppercase font-bold"
            >
              {showBookmarksOnly ? "Show All" : `Bookmarks (${bookmarks.length})`}
            </button>
          </div>

          <div className="space-y-12 md:space-y-20 text-center max-h-[70vh] md:max-h-[1000px] overflow-y-auto scroll-hide px-2">
            {displayedVerses.map((v) => (
              <div 
                key={v.id} 
                className="group relative py-6 md:py-8 px-2 md:px-4 transition-all hover:bg-stone-100/50 rounded-lg cursor-pointer"
                onClick={() => handleReflection(v.hindi, v.id)}
              >
                <button 
                  onClick={(e) => toggleBookmark(e, v.id)}
                  className={`absolute top-0 right-0 p-2 text-xl md:text-2xl transition-all ${bookmarks.includes(v.id) ? 'text-red-600 scale-125' : 'text-stone-300 opacity-20 group-hover:opacity-100'}`}
                >
                  🔖
                </button>
                <p className="font-hindi text-2xl md:text-4xl font-bold text-red-900 mb-4 leading-relaxed whitespace-pre-line px-4">
                  {v.hindi}
                </p>
                <p className="text-stone-600 font-hindi italic text-base md:text-xl max-w-2xl mx-auto leading-snug px-4">
                  {v.translation}
                </p>
                
                {reflection?.id === v.id && (
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-red-900/5 border border-red-900/10 rounded text-left animate-fade-in mx-2 sm:mx-6">
                    <h5 className="font-cinzel text-[8px] md:text-[10px] font-black uppercase text-red-900 mb-2">Spiritual Reflection</h5>
                    <p className="text-stone-800 font-hindi leading-relaxed italic text-sm md:text-base">{reflection.text}</p>
                  </div>
                )}
                {loading && reflection?.id === v.id && (
                  <div className="mt-4 text-[8px] md:text-[10px] font-cinzel animate-pulse text-red-800 uppercase tracking-widest">Consulting Sages...</div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-20 pt-8 md:pt-12 border-t-2 border-red-800/10 text-center">
             <p className="font-hindi text-3xl md:text-4xl text-red-900 font-black">॥ जय श्री राम ॥</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChalisaReader;
