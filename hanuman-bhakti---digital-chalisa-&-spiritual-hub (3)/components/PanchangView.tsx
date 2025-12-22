
import React, { useState, useEffect } from 'react';
import { geminiService } from '../services/geminiService';

const PanchangView: React.FC = () => {
  const [panchangData, setPanchangData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPanchang = async () => {
      setLoading(true);
      const data = await geminiService.getTodayPanchang();
      setPanchangData(data);
      setLoading(false);
    };
    fetchPanchang();
  }, []);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const monthName = today.toLocaleString('default', { month: 'long' }).toUpperCase();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDay }, (_, i) => null);

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const weekDaysHindi = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];

  return (
    <div className="min-h-screen bg-[#f4f1ea] py-20 md:py-24 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Mahalaxmi Banner Header */}
        <header className="bg-[#8B0000] text-white p-4 md:p-6 border-b-4 border-[#D4AF37] mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-center shadow-xl rounded-t-lg">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="font-hindi text-2xl md:text-4xl font-black text-[#D4AF37] tracking-widest">॥ महालक्ष्मी पंचांग ॥</h1>
            <p className="text-[8px] md:text-[10px] font-cinzel tracking-[0.2em] md:tracking-[0.3em] opacity-80 uppercase">Traditional Hindu Almanac</p>
          </div>
          <div className="text-center md:text-right">
            <h2 className="font-hindi text-xl md:text-3xl font-bold">{monthName} {currentYear}</h2>
            <p className="font-hindi text-sm md:text-lg text-[#D4AF37] opacity-90">मार्गशीर्ष / पौष • शक संवत १९४६</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Main Calendar Card */}
          <div className="lg:col-span-3 bg-white border-2 border-stone-200 shadow-xl p-0.5 md:p-1 rounded-sm overflow-hidden">
            <div className="calendar-grid">
              {weekDays.map((d, i) => (
                <div key={d} className={`calendar-header ${i === 0 ? 'bg-red-700' : ''}`}>
                  <div className="text-[8px] md:text-[10px] opacity-70 leading-none">{d}</div>
                  <div className="font-hindi text-xs md:text-lg leading-none mt-1">{weekDaysHindi[i]}</div>
                </div>
              ))}
              
              {padding.map((_, i) => (
                <div key={`p-${i}`} className="calendar-cell bg-stone-50"></div>
              ))}
              
              {days.map(d => {
                const isToday = d === today.getDate();
                const isSunday = (firstDay + d - 1) % 7 === 0;
                return (
                  <div key={d} className={`calendar-cell ${isSunday ? 'sunday' : ''} ${isToday ? 'bg-yellow-50 ring-1 md:ring-2 ring-red-800/20 z-10' : ''}`}>
                    <div className="flex justify-between items-start">
                      <span className="date-num font-bold text-sm md:text-2xl">{d}</span>
                      {isToday && <span className="text-[7px] md:text-[8px] font-bold bg-red-800 text-white px-1 rounded-sm">आज</span>}
                    </div>
                    <div className="mt-auto hidden sm:block">
                      <p className="text-[7px] md:text-[9px] font-hindi text-stone-400 leading-tight">तृतीया</p>
                      <p className="text-[7px] md:text-[9px] font-hindi text-red-900 leading-tight font-bold">पर्व</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Insights Sidebar */}
          <div className="space-y-6">
            <div className="mahalaxmi-border-card !border-4 p-4 md:p-6 bg-white w-full">
              <h3 className="font-hindi text-xl md:text-2xl text-red-900 border-b-2 border-red-800/10 pb-2 mb-4">आज का विचार</h3>
              {loading ? (
                <div className="py-8 md:py-12 flex flex-col items-center gap-4 animate-pulse">
                  <div className="w-6 h-6 md:w-8 md:h-8 border-4 border-red-800 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-[8px] md:text-[10px] font-cinzel uppercase tracking-widest text-stone-400">Consulting Sages...</p>
                </div>
              ) : (
                <div className="prose prose-sm font-hindi leading-relaxed text-stone-700 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2 scroll-hide text-sm md:text-base">
                  {panchangData}
                </div>
              )}
            </div>

            <div className="bg-red-800 text-white p-4 md:p-6 rounded-lg shadow-lg">
              <h4 className="font-hindi text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
                <span>🏮</span> शुभ मुहूर्त
              </h4>
              <ul className="space-y-3 font-hindi text-xs md:text-sm opacity-90">
                <li className="flex justify-between border-b border-white/10 pb-1">
                  <span>सूर्योदय:</span> <span className="font-cinzel">06:54 AM</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-1">
                  <span>सूर्यास्त:</span> <span className="font-cinzel">05:41 PM</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-1">
                  <span>राहू काल:</span> <span className="font-cinzel">10:45 - 12:08</span>
                </li>
                <li className="flex justify-between">
                  <span>अभिजित:</span> <span className="font-cinzel">11:45 - 12:30</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanchangView;
