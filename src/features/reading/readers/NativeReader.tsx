import React, { useState, useEffect, useRef } from 'react';
import { Publication, PublicationSection } from '../../../shared/types';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { api as apiClient } from '../../../shared/api/client';

interface NativeReaderProps {
  publication: Publication;
  sections: PublicationSection[];
  initialProgress: number;
  onProgressUpdate: (locator: any, percent: number) => void;
  onComplete: () => void;
  theme: 'light' | 'sepia' | 'dark';
  fontSize: number;
}

export const NativeReader: React.FC<NativeReaderProps> = ({ 
  publication, 
  sections, 
  initialProgress, 
  onProgressUpdate,
  onComplete,
  theme,
  fontSize
}) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Set initial section based on progress
  useEffect(() => {
    if (initialProgress > 0 && sections.length > 0) {
      // Rough estimation of section based on progress percent
      const estIndex = Math.floor(initialProgress * sections.length);
      setCurrentSectionIndex(Math.min(estIndex, sections.length - 1));
    }
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    
    // Calculate progress within current section
    const sectionProgress = scrollHeight > clientHeight 
      ? scrollTop / (scrollHeight - clientHeight)
      : 1;

    // Calculate total progress across all sections
    const totalProgress = (currentSectionIndex + sectionProgress) / sections.length;
    
    // Only update occasionally to avoid spamming
    if (Math.random() < 0.1 || sectionProgress === 1 || sectionProgress === 0) {
       onProgressUpdate({
         format: 'native',
         sectionId: sections[currentSectionIndex]?.id,
         sectionProgression: sectionProgress,
         totalProgression: totalProgress
       }, totalProgress);
    }
  };

  const nextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      onProgressUpdate({ format: 'native', sectionId: sections[currentSectionIndex + 1]?.id, totalProgression: (currentSectionIndex + 1) / sections.length }, (currentSectionIndex + 1) / sections.length);
    } else {
      onComplete();
    }
  };

  const prevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      onProgressUpdate({ format: 'native', sectionId: sections[currentSectionIndex - 1]?.id, totalProgression: (currentSectionIndex - 1) / sections.length }, (currentSectionIndex - 1) / sections.length);
    }
  };

  const currentSection = sections[currentSectionIndex];

  if (!currentSection) {
    return <div className="p-8 text-center opacity-70">بخش‌های این محتوا یافت نشد.</div>;
  }

  // Determine styles based on theme
  const getThemeClasses = () => {
    switch (theme) {
      case 'dark': return 'bg-[#0b1312] text-emerald-100';
      case 'sepia': return 'bg-[#f4ecd8] text-[#5c4b37]';
      case 'light': default: return 'bg-white text-gray-900';
    }
  };

  return (
    <div 
      ref={scrollRef}
      onScroll={handleScroll}
      className={`h-full overflow-y-auto px-4 py-12 transition-colors duration-300 ${getThemeClasses()}`}
      style={{ fontSize: `${fontSize}px`, lineHeight: '2' }}
    >
      <div className="max-w-2xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold font-['Playfair_Display',serif] opacity-90">
            {currentSection.title}
          </h2>
          {publication.publication_type === 'BOOK' && (
            <div className="text-sm opacity-50 mt-2 font-mono">
              بخش {currentSectionIndex + 1} از {sections.length}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="space-y-6 text-justify">
          {currentSection.document?.blocks ? currentSection.document.blocks.map((block, idx) => {
            if (block.type === 'paragraph') {
              return <p key={block.id || idx} className="opacity-90">{block.content?.map(c => c.text).join('')}</p>;
            }
            if (block.type === 'heading') {
              return <h3 key={block.id || idx} className="text-xl font-bold mt-8 mb-4 opacity-95">{block.content?.map(c => c.text).join('')}</h3>;
            }
            if (block.type === 'quote') {
              return <blockquote key={block.id || idx} className="border-r-4 border-[#d4af37] pr-4 italic opacity-80 my-8">{block.content?.map(c => c.text).join('')}</blockquote>;
            }
            if (block.type === 'divider') {
              return <hr key={block.id || idx} className="my-8 border-current/20" />;
            }
            return null;
          }) : (
            <p className="opacity-90">محتوای این بخش قابل خواندن نیست.</p>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="mt-16 pt-8 border-t border-current/10 flex items-center justify-between">
          <button 
            onClick={prevSection}
            disabled={currentSectionIndex === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-opacity ${currentSectionIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-current/5'}`}
          >
            <ChevronRight className="w-5 h-5" />
            <span className="text-sm font-bold">بخش قبلی</span>
          </button>
          
          <button 
            onClick={nextSection}
            className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-current/5 transition-colors"
          >
            <span className="text-sm font-bold">
              {currentSectionIndex === sections.length - 1 ? 'پایان مطالعه' : 'بخش بعدی'}
            </span>
            {currentSectionIndex === sections.length - 1 ? <CheckCircle2 className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

      </div>
    </div>
  );
};
