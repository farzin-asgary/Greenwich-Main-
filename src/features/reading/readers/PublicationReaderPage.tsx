import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReaderLayout } from './ReaderLayout';
import { NativeReader } from './NativeReader';
import { PdfReader } from './PdfReader';
import { api as apiClient } from '../../../shared/api/client';
import { Publication, PublicationSection, ReadingProgress } from '../../../shared/types';
import { ChevronRight, Settings, List, Bookmark, Heart } from 'lucide-react';
import { LoadingState } from '../../../shared/ui/LoadingState';
import { ErrorState } from '../../../shared/ui/ErrorState';

export const PublicationReaderPage: React.FC = () => {
  const { publicationId } = useParams();
  const navigate = useNavigate();
  
  const [publication, setPublication] = useState<Publication | null>(null);
  const [sections, setSections] = useState<PublicationSection[]>([]);
  const [progress, setProgress] = useState<ReadingProgress | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Reader Settings
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('sepia');
  const [fontSize, setFontSize] = useState<number>(18);
  const [showSettings, setShowSettings] = useState(false);
  const [showToc, setShowToc] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!publicationId) return;
        // Mock API needs slug or ID. We assume ID here.
        const pubRes = await apiClient.getPublicationBySlug(publicationId);
        setPublication(pubRes.data);
        
        if (pubRes.data.reader_format === 'NATIVE_STRUCTURED') {
          const secRes = await apiClient.getPublicationSections(pubRes.data.id);
          setSections(secRes.data);
        }
        
        const progRes = await apiClient.getReadingProgress(pubRes.data.id);
        setProgress(progRes.data);
        
      } catch (err) {
        setError('خطا در بارگذاری محتوا');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [publicationId]);

  const handleProgressUpdate = async (locator: any, percent: number) => {
    if (!publication) return;
    try {
      const res = await apiClient.saveReadingProgress(publication.id, locator, percent);
      setProgress(res.data);
    } catch (err) {
      console.error('Failed to save progress', err);
    }
  };

  const handleComplete = () => {
    // Navigate back to detail or show a completion screen
    navigate(`/app/publications/${publication?.slug}`);
  };

  if (loading) return <ReaderLayout><LoadingState message="در حال آماده‌سازی مطالعه..." /></ReaderLayout>;
  if (error || !publication) return <ReaderLayout><ErrorState message={error || 'محتوا یافت نشد'} /></ReaderLayout>;

  return (
    <ReaderLayout>
      <div className="h-screen flex flex-col relative overflow-hidden">
        {/* Top Chrome */}
        <div className="shrink-0 h-14 bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 z-20 absolute top-0 left-0 right-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="font-bold text-sm truncate max-w-[150px] sm:max-w-xs">{publication.title}</span>
          </div>

          <div className="flex items-center gap-1">
            {publication.publication_type === 'BOOK' && (
              <button 
                onClick={() => setShowToc(!showToc)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <List className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {progress && (
          <div className="absolute top-14 left-0 right-0 h-0.5 bg-black/10 z-20">
            <div 
              className="h-full bg-[#d4af37] transition-all duration-300"
              style={{ width: `${progress.progress_percent * 100}%` }}
            />
          </div>
        )}

        {/* Settings Dropdown */}
        {showSettings && (
          <div className="absolute top-16 left-4 bg-[#121e1c] text-emerald-100 p-4 rounded-2xl border border-emerald-900/60 shadow-2xl z-30 w-64 space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400">پس‌زمینه مطالعه</span>
              <div className="flex gap-2">
                <button onClick={() => setTheme('light')} className={`flex-1 py-2 rounded-lg bg-white text-gray-900 font-bold text-xs border-2 ${theme === 'light' ? 'border-[#d4af37]' : 'border-transparent'}`}>روشن</button>
                <button onClick={() => setTheme('sepia')} className={`flex-1 py-2 rounded-lg bg-[#f4ecd8] text-[#5c4b37] font-bold text-xs border-2 ${theme === 'sepia' ? 'border-[#d4af37]' : 'border-transparent'}`}>سپیا</button>
                <button onClick={() => setTheme('dark')} className={`flex-1 py-2 rounded-lg bg-[#0b1312] text-emerald-100 font-bold text-xs border-2 ${theme === 'dark' ? 'border-[#d4af37]' : 'border-transparent'}`}>تاریک</button>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400">اندازه قلم</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setFontSize(Math.max(12, fontSize - 2))} className="p-2 bg-emerald-900/40 rounded-lg hover:bg-emerald-800/40">A-</button>
                <span className="flex-1 text-center font-mono text-sm">{fontSize}</span>
                <button onClick={() => setFontSize(Math.min(32, fontSize + 2))} className="p-2 bg-emerald-900/40 rounded-lg hover:bg-emerald-800/40">A+</button>
              </div>
            </div>
          </div>
        )}

        {/* TOC Drawer */}
        {showToc && (
          <div className="absolute top-14 right-0 bottom-0 w-72 bg-[#121e1c] border-l border-emerald-900/60 shadow-2xl z-20 overflow-y-auto">
            <div className="p-4 border-b border-emerald-900/40">
              <h3 className="font-bold text-emerald-100">فهرست</h3>
            </div>
            <div className="p-2 space-y-1">
              {sections?.map(sec => (
                <button 
                  key={sec.id}
                  className="w-full text-right p-3 rounded-xl hover:bg-[#0b1312] text-sm text-emerald-200 transition-colors flex items-center justify-between"
                >
                  <span>{sec.title}</span>
                  {/* Could show section progress here */}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Reader Canvas */}
        <div className="flex-1 relative pt-14">
          {publication.reader_format === 'NATIVE_STRUCTURED' ? (
            <NativeReader 
              publication={publication}
              sections={sections}
              initialProgress={progress?.progress_percent || 0}
              onProgressUpdate={handleProgressUpdate}
              onComplete={handleComplete}
              theme={theme}
              fontSize={fontSize}
            />
          ) : publication.reader_format === 'PDF' ? (
            <PdfReader
              publication={publication}
              initialProgress={progress?.progress_percent || 0}
              onProgressUpdate={handleProgressUpdate}
              onComplete={handleComplete}
            />
          ) : (
            <div className="p-8 text-center">فرمت خواندن پشتیبانی نمی‌شود</div>
          )}
        </div>
      </div>
    </ReaderLayout>
  );
};
