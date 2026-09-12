import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PublicLayout } from '../../../layouts/public/PublicLayout';
import { api as apiClient } from '../../../shared/api/client';
import { Publication, ReadingProgress, LibraryItem } from '../../../shared/types';
import { ChevronRight, Bookmark, BookOpen, Clock, Heart } from 'lucide-react';
import { LoadingState } from '../../../shared/ui/LoadingState';
import { ErrorState } from '../../../shared/ui/ErrorState';

export const PublicationDetailPage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [publication, setPublication] = useState<Publication | null>(null);
  const [progress, setProgress] = useState<ReadingProgress | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPublication = async () => {
      try {
        if (!slug) return;
        const res = await apiClient.getPublicationBySlug(slug);
        const pub = res.data;
        setPublication(pub);

        const [progRes, libRes] = await Promise.all([
          apiClient.getReadingProgress(pub.id),
          apiClient.getLibraryItems()
        ]);
        
        setProgress(progRes.data);
        setIsFavorite(libRes.data.some(item => item.publication_id === pub.id && item.is_favorite));

      } catch (err) {
        setError('پابیکیشن پیدا نشد');
      } finally {
        setLoading(false);
      }
    };
    loadPublication();
  }, [slug]);

  const toggleFavorite = async () => {
    if (!publication) return;
    try {
      await apiClient.toggleFavorite(publication.id);
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <LoadingState message="در حال بارگذاری..." />;
  if (error || !publication) return <ErrorState message={error || 'محتوایی یافت نشد'} />;

  const isStarted = progress && progress.progress_percent > 0;
  const isCompleted = progress && progress.completed_at;
  const progressPercent = progress ? Math.round(progress.progress_percent * 100) : 0;

  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-bold"
        >
          <ChevronRight className="w-4 h-4" />
          <span>بازگشت</span>
        </button>

        <div className="flex flex-col sm:flex-row gap-8">
          <div className="w-48 shrink-0 mx-auto sm:mx-0">
            <div className="aspect-[2/3] w-full rounded-2xl overflow-hidden bg-emerald-950 border border-emerald-900 shadow-2xl relative">
              {publication.cover_image && <img src={publication.cover_image} alt={publication.title} className="w-full h-full object-cover" />}
              {isCompleted && (
                <div className="absolute inset-0 bg-[#0b1312]/60 flex items-center justify-center backdrop-blur-sm">
                  <span className="bg-emerald-900/80 text-emerald-100 font-bold px-4 py-1.5 rounded-full text-xs border border-emerald-800">
                    پایان یافته
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 space-y-5 text-center sm:text-right">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-[#d4af37] font-bold mb-3">
                <span className="bg-[#1b4332] px-2.5 py-1 rounded-full">{publication.publication_type === 'BOOK' ? 'کتاب' : publication.publication_type === 'ARTICLE' ? 'مقاله' : 'خلاصه کتاب'}</span>
                {publication.estimated_reading_minutes && (
                  <span className="flex items-center gap-1 bg-[#121e1c] border border-emerald-900 px-2.5 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5" />
                    {publication.estimated_reading_minutes} دقیقه
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-emerald-100 font-['Playfair_Display',serif] leading-tight">
                {publication.title}
              </h1>
              {publication.subtitle && (
                <h2 className="text-lg text-emerald-300/80 mt-2 font-['Playfair_Display',serif]">
                  {publication.subtitle}
                </h2>
              )}
              
              <p className="text-emerald-400 font-bold mt-4 text-sm flex items-center justify-center sm:justify-start gap-2">
                <span>نوشته: {publication.author}</span>
                {publication.translator && <span>• ترجمه: {publication.translator}</span>}
              </p>
            </div>

            {isStarted && !isCompleted && (
              <div className="space-y-2 max-w-sm mx-auto sm:mx-0">
                <div className="flex items-center justify-between text-xs text-emerald-300 font-bold">
                  <span>وضعیت مطالعه</span>
                  <span>{progressPercent}٪</span>
                </div>
                <div className="w-full h-2 bg-[#0b1312] rounded-full overflow-hidden border border-emerald-900">
                  <div 
                    className="h-full bg-[#d4af37] rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-center sm:justify-start gap-3 pt-2">
              <Link 
                to={`/app/read/${publication.id}`}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#d4af37] text-[#0b1312] font-bold px-8 py-3 rounded-xl hover:bg-[#c4a137] transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>{isStarted ? 'ادامه مطالعه' : 'شروع مطالعه'}</span>
              </Link>
              
              <button 
                onClick={toggleFavorite}
                className={`p-3 rounded-xl border transition-colors ${
                  isFavorite 
                    ? 'bg-[#1b4332] border-[#d4af37]/40 text-[#d4af37]' 
                    : 'bg-[#0b1312] border-emerald-900/60 text-emerald-400 hover:text-emerald-300'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#d4af37]' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-900/60 pt-8 mt-8">
          <h3 className="font-bold text-emerald-200 mb-4 text-lg">درباره این اثر</h3>
          <p className="text-emerald-300/90 leading-loose text-sm whitespace-pre-wrap">
            {publication.description}
          </p>
        </div>

        {/* Basic metadata display */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 mt-6 border-t border-emerald-900/40 text-xs">
          {publication.publisher_name && (
            <div>
              <span className="text-emerald-500 block mb-1">ناشر</span>
              <span className="text-emerald-200 font-bold">{publication.publisher_name}</span>
            </div>
          )}
          {publication.publication_year && (
            <div>
              <span className="text-emerald-500 block mb-1">سال انتشار</span>
              <span className="text-emerald-200 font-bold font-mono">{publication.publication_year}</span>
            </div>
          )}
          {publication.estimated_length && (
            <div>
              <span className="text-emerald-500 block mb-1">حجم تقریبی</span>
              <span className="text-emerald-200 font-bold">{publication.estimated_length}</span>
            </div>
          )}
          {publication.language && (
            <div>
              <span className="text-emerald-500 block mb-1">زبان</span>
              <span className="text-emerald-200 font-bold">{publication.language}</span>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
};
