import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../../../layouts/public/PublicLayout';
import { api as apiClient } from '../../../shared/api/client';
import { Publication, LibraryItem } from '../../../shared/types';
import { Bookmark, Clock } from 'lucide-react';
import { LoadingState } from '../../../shared/ui/LoadingState';
import { ErrorState } from '../../../shared/ui/ErrorState';

export const LibraryFavoritesPage: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [favorites, setFavorites] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [pubsRes, favsRes] = await Promise.all([
          apiClient.getPublications(),
          apiClient.getLibraryItems()
        ]);
        setPublications(pubsRes.data);
        setFavorites(favsRes.data.filter(item => item.is_favorite));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <LoadingState message="در حال بارگذاری علاقه‌مندی‌ها..." />;

  const favPubs = publications.filter(p => favorites.some(f => f.publication_id === p.id));

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
          <Link to="/app/library" className="text-emerald-400/70 hover:text-emerald-300 pb-1 transition-colors">ادامه مطالعه</Link>
          <Link to="/app/library/favorites" className="text-[#d4af37] border-b-2 border-[#d4af37] pb-1">علاقه‌مندی‌ها</Link>
          <Link to="/app/library/completed" className="text-emerald-400/70 hover:text-emerald-300 pb-1 transition-colors">تمام‌شده‌ها</Link>
        </div>

        {favPubs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favPubs?.map(pub => (
              <Link key={pub.id} to={`/app/publications/${pub.slug}`} className="bg-[#0b1312] border border-emerald-900/60 rounded-2xl p-4 space-y-3 hover:border-[#d4af37]/40 transition-colors group relative">
                <div className="absolute top-6 left-6 z-10 bg-[#0b1312]/80 p-1.5 rounded-full backdrop-blur-sm border border-emerald-900">
                  <Bookmark className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
                </div>
                <div className="aspect-[2/3] w-full rounded-xl overflow-hidden bg-emerald-950 relative">
                  {pub.cover_image && <img src={pub.cover_image} alt={pub.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                </div>
                <div>
                  <h3 className="font-bold text-emerald-100 text-sm line-clamp-1">{pub.title}</h3>
                  <p className="text-xs text-emerald-400 mt-1 line-clamp-1">{pub.author}</p>
                  <div className="flex items-center gap-2 text-[10px] text-emerald-500 mt-2">
                    <span className="bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-900">{pub.publication_type === 'BOOK' ? 'کتاب' : pub.publication_type === 'ARTICLE' ? 'مقاله' : 'خلاصه کتاب'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border border-dashed border-emerald-900/60 rounded-2xl">
            <Bookmark className="w-8 h-8 text-emerald-700 mx-auto mb-3" />
            <p className="text-emerald-400 text-sm">هنوز کتاب یا مقاله‌ای به علاقه‌مندی‌ها اضافه نکرده‌ای.</p>
          </div>
        )}
      </div>
    </PublicLayout>
  );
};
