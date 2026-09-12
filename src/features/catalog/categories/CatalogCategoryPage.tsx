import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PublicLayout } from '../../../layouts/public/PublicLayout';
import { Category, BookWork } from '../../../shared/types';
import { api as apiClient } from '../../../shared/api/client';
import { Layers, ArrowRight } from 'lucide-react';
import { BookCard } from '../../../shared/ui/BookCard';

export const CatalogCategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [category, setCategory] = useState<Category | null>(null);
  const [books, setBooks] = useState<BookWork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Find category
        const cats = await apiClient.getCategories();
        const found = cats.data.find(c => c.slug === slug);
        if (found) {
          setCategory(found);
          // For mock, just return all books for any category
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

  if (!category) {
    return (
      <PublicLayout>
        <div className="text-center py-24 text-xl text-emerald-300">دسته‌بندی پیدا نشد</div>
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
          <span className="cursor-pointer hover:text-emerald-300" onClick={() => navigate('/app/books')}>کتاب‌ها</span>
          <span>/</span>
          <span className="text-emerald-300">{category.name}</span>
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

        <div className="mb-12">
          <h1 className="text-3xl font-bold text-emerald-50 mb-4 flex items-center gap-3">
            <Layers className="w-8 h-8 text-emerald-500" />
            {category.name}
          </h1>
          {category.description && (
            <p className="text-emerald-200/80 leading-relaxed max-w-2xl">{category.description}</p>
          )}
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

