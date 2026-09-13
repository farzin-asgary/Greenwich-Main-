import React, { useState } from 'react';
import { PublicationReaderPage } from '../../reading/readers/PublicationReaderPage';
import { Monitor, Smartphone, Moon, Sun } from 'lucide-react';

export const PreviewPane: React.FC = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [isDark, setIsDark] = useState(true);

  return (
    <div className="flex flex-col h-full bg-[#0b1312] border-r border-emerald-900/40">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-emerald-900/40 bg-[#050a09]">
        <div className="flex items-center gap-2 bg-emerald-950/30 p-1 rounded-xl">
          <button 
            onClick={() => setIsMobile(true)}
            className={`p-1.5 rounded-lg transition-colors ${isMobile ? 'bg-emerald-900/50 text-[#d4af37]' : 'text-emerald-500 hover:text-emerald-300'}`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsMobile(false)}
            className={`p-1.5 rounded-lg transition-colors ${!isMobile ? 'bg-emerald-900/50 text-[#d4af37]' : 'text-emerald-500 hover:text-emerald-300'}`}
          >
            <Monitor className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2 bg-emerald-950/30 p-1 rounded-xl">
          <button 
            onClick={() => setIsDark(false)}
            className={`p-1.5 rounded-lg transition-colors ${!isDark ? 'bg-emerald-900/50 text-[#d4af37]' : 'text-emerald-500 hover:text-emerald-300'}`}
          >
            <Sun className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsDark(true)}
            className={`p-1.5 rounded-lg transition-colors ${isDark ? 'bg-emerald-900/50 text-[#d4af37]' : 'text-emerald-500 hover:text-emerald-300'}`}
          >
            <Moon className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Canvas */}
      <div className={`flex-1 overflow-y-auto flex justify-center p-4 ${isDark ? 'bg-[#000000]' : 'bg-gray-100'}`}>
        <div 
          className={`transition-all duration-300 overflow-hidden shadow-2xl ${isDark ? 'shadow-emerald-900/20' : 'shadow-black/10'} ${isMobile ? 'w-[390px] h-[844px] rounded-[3rem] border-8 border-gray-900' : 'w-full h-full rounded-2xl border border-gray-700/30'}`}
        >
          <div className={`w-full h-full overflow-y-auto ${isDark ? '' : 'light-mode-override'}`}>
            <PublicationReaderPage />
          </div>
        </div>
      </div>
    </div>
  );
};
