import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PublicLayout } from '../../../layouts/public/PublicLayout';
import { CuratedCollection, BookWork } from '../../../shared/types';
import { api as apiClient } from '../../../shared/api/client';
import { Bookmark, ArrowRight } from 'lucide-react';
import { BookCard } from '../../../shared/ui/BookCard';

export const CatalogCollectionPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [collection, setCollection] = useState<CuratedCollection | null>(null);
  const [books, setBooks] = useState<BookWork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cols = await apiClient.getCollections();
        const found = cols.data.find(c => c.slug === slug);
        if (found) {
          setCollection(found);
          const allBooks = await apiClient.getCatalogBooks();
          setBooks(allBooks.data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="flex justify-center items-center h-64 text-emerald-400">در حال بارگذاری...</div>
      </PublicLayout>
    );
  }

  if (!collection) {
    return (
      <PublicLayout>
        <div className="text-center py-24 text-xl text-emerald-300">مجموعه پیدا نشد</div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Breadcrumb */}
        <div className="text-sm text-emerald-400/60 mb-6 flex items-center gap-2">
          <span className="cursor-pointer hover:text-emerald-300" onClick={() => navigate('/app/home')}>خانه</span>
          <span>/</span>
          <span className="cursor-pointer hover:text-emerald-300" onClick={() => navigate('/app/books')}>مجموعه‌ها</span>
          <span>/</span>
          <span className="text-emerald-300">{collection.title}</span>
        </div>

        <button 
          onClick={() => {
            if (window.history.length > 2) {
              navigate(-1);
            } else {
              navigate('/app/books');
            }
          }}
          className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-8 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت</span>
        </button>

        <div className="mb-12 flex flex-col md:flex-row gap-6 items-center md:items-start bg-[#122A20]/40 border border-emerald-900/30 p-8 rounded-3xl">
          <div className="w-24 h-24 shrink-0 bg-emerald-900/50 rounded-2xl flex items-center justify-center border border-emerald-800/50 shadow-xl">
             <Bookmark className="w-10 h-10 text-emerald-400" />
          </div>
          <div className="text-center md:text-right pt-2">
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-50 mb-3">
              {collection.title}
            </h1>
            {collection.description && (
              <p className="text-emerald-200/80 leading-relaxed max-w-2xl">{collection.description}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {books?.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </PublicLayout>
  );
};
