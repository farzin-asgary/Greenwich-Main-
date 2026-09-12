import React, { useState } from 'react';
import { Publication } from '../../../shared/types';
import { ChevronRight, ChevronLeft, ZoomIn, ZoomOut, FileText } from 'lucide-react';

interface PdfReaderProps {
  publication: Publication;
  initialProgress: number;
  onProgressUpdate: (locator: any, percent: number) => void;
  onComplete: () => void;
}

export const PdfReader: React.FC<PdfReaderProps> = ({ 
  publication, 
  initialProgress, 
  onProgressUpdate,
  onComplete
}) => {
  const [page, setPage] = useState(initialProgress > 0 ? Math.max(1, Math.floor(initialProgress * 100)) : 1);
  const totalPages = 100; // Mock total pages

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      const progress = newPage / totalPages;
      onProgressUpdate({
        format: 'pdf',
        pageNumber: newPage,
        totalProgression: progress
      }, progress);

      if (newPage === totalPages) {
        onComplete();
      }
    }
  };

  return (
    <div className="h-full bg-gray-900 flex flex-col items-center justify-center relative">
      {/* Mock PDF Toolbar */}
      <div className="absolute top-4 bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-4 text-white z-10">
        <button className="p-1 hover:bg-gray-700 rounded"><ZoomOut className="w-4 h-4" /></button>
        <span className="text-sm font-mono">{page} / {totalPages}</span>
        <button className="p-1 hover:bg-gray-700 rounded"><ZoomIn className="w-4 h-4" /></button>
      </div>

      {/* Mock PDF Canvas */}
      <div className="bg-white w-full max-w-2xl aspect-[1/1.4] shadow-2xl flex flex-col items-center justify-center text-gray-400 p-8 text-center relative overflow-hidden">
        <FileText className="w-16 h-16 mb-4 opacity-20" />
        <p>محتوای PDF (شبیه‌سازی)</p>
        <p className="text-xs mt-2 opacity-50">فایل: {publication.title}</p>
        <p className="text-xs mt-1 opacity-50 font-mono">صفحه {page}</p>
        
        {/* Mock content text */}
        <div className="absolute inset-0 p-12 text-gray-300 text-[8px] text-justify leading-loose" style={{ pointerEvents: 'none', userSelect: 'none' }}>
           {Array(20).fill('این یک متن شبیه‌سازی شده برای نمایش قالب پی‌دی‌اف است. در پیاده‌سازی نهایی از کتابخانه‌های رندر پی‌دی‌اف استفاده خواهد شد. ').join('')}
        </div>
      </div>

      {/* Mock PDF Controls */}
      <div className="absolute bottom-8 flex items-center gap-4">
        <button 
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 disabled:opacity-50"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <button 
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 disabled:opacity-50"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
