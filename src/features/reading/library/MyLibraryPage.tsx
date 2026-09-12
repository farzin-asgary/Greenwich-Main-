import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../../../layouts/public/PublicLayout';
import { api as apiClient } from '../../../shared/api/client';
import { Publication, ReadingProgress } from '../../../shared/types';
import { BookOpen, Bookmark, CheckCircle2, ChevronLeft, Clock } from 'lucide-react';
import { LoadingState } from '../../../shared/ui/LoadingState';
import { ErrorState } from '../../../shared/ui/ErrorState';

export const MyLibraryPage: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [progressData, setProgressData] = useState<Record<string, ReadingProgress>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLibrary = async () => {
      try {
        const res = await apiClient.getPublications();
        setPublications(res.data);

        // Fetch progress for each publication
        const pData: Record<string, ReadingProgress> = {};
        for (const pub of res.data) {
          const progRes = await apiClient.getReadingProgress(pub.id);
          if (progRes.data) {
            pData[pub.id] = progRes.data;
          }
        }
        setProgressData(pData);
      } catch (err) {
        setError('خطا در بارگذاری کتابخانه');
      } finally {
        setLoading(false);
      }
    };
    loadLibrary();
  }, []);

  if (loading) return <LoadingState message="در حال بارگذاری کتابخانه..." />;
  if (error) return <ErrorState message={error} />;

  const continueReading = publications.filter(p => progressData[p.id] && !progressData[p.id].completed_at);
  const others = publications.filter(p => !progressData[p.id]);

  return (
    <PublicLayout>
      <div className="space-y-6 max-w-4xl mx-auto px-4 py-8">
        <div className="border-b border-emerald-900/60 pb-4">
          <h1 className="text-2xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            کتابخانه من
          </h1>
          <p className="text-sm text-emerald-300/70 mt-1">
            مطالعه‌های ناتمام و کتاب‌های شما
          </p>
        </div>

        <div className="flex gap-4 border-b border-emerald-900/40 pb-4 text-sm font-bold">
          <Link to="/app/library" className="text-[#d4af37] border-b-2 border-[#d4af37] pb-1">ادامه مطالعه</Link>
          <Link to="/app/library/favorites" className="text-emerald-400/70 hover:text-emerald-300 pb-1 transition-colors">علاقه‌مندی‌ها</Link>
          <Link to="/app/library/completed" className="text-emerald-400/70 hover:text-emerald-300 pb-1 transition-colors">تمام‌شده‌ها</Link>
        </div>

        {continueReading.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-emerald-200">ادامه مطالعه</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {continueReading?.map(pub => (
                <Link key={pub.id} to={`/app/publications/${pub.slug}`} className="greenwich-card flex gap-4 p-4 rounded-2xl border border-emerald-900/60 hover:bg-[#0b1312] transition-colors group">
                  <div className="w-20 h-28 shrink-0 rounded-lg overflow-hidden bg-emerald-950 border border-emerald-900">
                    {pub.cover_image && <img src={pub.cover_image} alt={pub.title} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 space-y-2 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-emerald-100 group-hover:text-[#d4af37] transition-colors line-clamp-1">{pub.title}</h3>
                      <p className="text-xs text-emerald-400 mt-1">{pub.author}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-emerald-300">
                        <span>{Math.round(progressData[pub.id].progress_percent * 100)}٪ مطالعه شده</span>
                      </div>
                      <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#d4af37] rounded-full transition-all duration-500"
                          style={{ width: `${progressData[pub.id].progress_percent * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center p-8 border border-dashed border-emerald-900/60 rounded-2xl">
            <BookOpen className="w-8 h-8 text-emerald-700 mx-auto mb-3" />
            <p className="text-emerald-400 text-sm">هنوز چیزی برای ادامه مطالعه نداری.</p>
          </div>
        )}

        <div className="space-y-4 pt-4">
          <h2 className="text-lg font-bold text-emerald-200">پیشنهاد برای شروع</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {others?.map(pub => (
              <Link key={pub.id} to={`/app/publications/${pub.slug}`} className="bg-[#0b1312] border border-emerald-900/60 rounded-2xl p-4 space-y-3 hover:border-[#d4af37]/40 transition-colors group">
                <div className="aspect-[2/3] w-full rounded-xl overflow-hidden bg-emerald-950">
                  {pub.cover_image && <img src={pub.cover_image} alt={pub.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                </div>
                <div>
                  <h3 className="font-bold text-emerald-100 text-sm line-clamp-1">{pub.title}</h3>
                  <p className="text-xs text-emerald-400 mt-1 line-clamp-1">{pub.author}</p>
                  <div className="flex items-center gap-2 text-[10px] text-emerald-500 mt-2">
                    <span className="bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-900">{pub.publication_type === 'BOOK' ? 'کتاب' : pub.publication_type === 'ARTICLE' ? 'مقاله' : 'خلاصه کتاب'}</span>
                    {pub.estimated_reading_minutes && (
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {pub.estimated_reading_minutes} دقیقه</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
