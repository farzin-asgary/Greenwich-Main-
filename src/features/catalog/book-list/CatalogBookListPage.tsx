import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PublicLayout } from '../../../layouts/public/PublicLayout';
import { BookWork, Category } from '../../../shared/types';
import { api as apiClient } from '../../../shared/api/client';
import { BookOpen, Search, X, Filter } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';
import { BookCard } from '../../../shared/ui/BookCard';

export const CatalogBookListPage: React.FC = () => {
  const [books, setBooks] = useState<BookWork[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category') || '';
  const sortOption = searchParams.get('sort') || 'newest';

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [booksRes, catsRes] = await Promise.all([
          apiClient.getCatalogBooks(),
          apiClient.getCategories()
        ]);
        setBooks(booksRes.data || []);
        setCategories(catsRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by just updating URL, the filtered display handles the rest
  };

  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  // Filter books
  let filteredBooks = books;
  if (searchQuery) {
    filteredBooks = filteredBooks.filter(b => 
      b.title.includes(searchQuery) || 
      (b.original_title && b.original_title.includes(searchQuery))
    );
  }
  // In a real app, category filtering would use actual relationships, here we mock it for demonstration
  // In our mock, we don't have explicit category-to-book links yet.

  // Sort books
  if (sortOption === 'alpha') {
    filteredBooks = [...filteredBooks].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === 'newest') {
    filteredBooks = [...filteredBooks].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Breadcrumb */}
        <div className="text-sm text-emerald-400/60 mb-6 flex items-center gap-2">
          <span className="cursor-pointer hover:text-emerald-300" onClick={() => navigate('/app/home')}>خانه</span>
          <span>/</span>
          <span className="text-emerald-300">کتاب‌ها</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-emerald-100 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-emerald-500" />
            فهرست کتاب‌ها
          </h1>
          
          <form onSubmit={handleSearch} className="relative w-full md:w-auto">
            <input 
              type="text" 
              placeholder="جستجوی کتاب، نویسنده..."
              value={searchQuery}
              onChange={(e) => updateParam('q', e.target.value)}
              className="w-full md:w-72 bg-[#0d1f18] border border-emerald-900/50 rounded-xl py-2 pl-4 pr-10 text-emerald-100 placeholder:text-emerald-600 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <Search className="w-4 h-4 text-emerald-500 absolute top-3 right-3" />
            {searchQuery && (
              <Button 
                type="button" 
                onClick={() => updateParam('q', '')}
                className="absolute top-3 left-3 text-emerald-600 hover:text-emerald-400"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </form>
        </div>

        {/* Filters and applied chips */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Simple Category Filter */}
          <select 
            value={selectedCategory} 
            onChange={(e) => updateParam('category', e.target.value)}
            className="bg-[#0d1f18] border border-emerald-900/50 rounded-xl px-4 py-2 text-emerald-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="">همه دسته‌بندی‌ها</option>
            {categories?.map(cat => (
              <option key={cat.id} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
          
          <select 
            value={sortOption} 
            onChange={(e) => updateParam('sort', e.target.value)}
            className="bg-[#0d1f18] border border-emerald-900/50 rounded-xl px-4 py-2 text-emerald-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="newest">تازه اضافه‌شده</option>
            <option value="recommended">پیشنهادی</option>
            <option value="alpha">الفبایی</option>
          </select>
        </div>

        {/* Applied Filters Area */}
        {(selectedCategory || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 mb-8 p-4 bg-[#122A20]/40 rounded-xl border border-emerald-900/30">
            <span className="text-sm text-emerald-400 ml-2">فیلترهای فعال:</span>
            
            {searchQuery && (
              <div className="flex items-center gap-1 bg-emerald-900/40 text-emerald-200 px-3 py-1 rounded-full text-sm border border-emerald-800/50">
                جستجو: {searchQuery}
                <Button onClick={() => updateParam('q', '')} className="mr-1 hover:text-white"><X className="w-3 h-3" /></Button>
              </div>
            )}
            
            {selectedCategory && (
              <div className="flex items-center gap-1 bg-emerald-900/40 text-emerald-200 px-3 py-1 rounded-full text-sm border border-emerald-800/50">
                دسته: {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
                <Button onClick={() => updateParam('category', '')} className="mr-1 hover:text-white"><X className="w-3 h-3" /></Button>
              </div>
            )}
            
            <Button 
              onClick={() => { updateParam('q', ''); updateParam('category', ''); }}
              className="text-xs text-emerald-500 hover:text-emerald-300 mr-2 underline"
            >
              پاک کردن همه
            </Button>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-emerald-400">در حال بارگذاری...</p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-20 bg-[#122A20]/20 rounded-2xl border border-emerald-900/20">
            <Filter className="w-12 h-12 text-emerald-700 mx-auto mb-4" />
            <p className="text-emerald-300 text-lg mb-2">نتیجه‌ای پیدا نشد</p>
            <p className="text-emerald-500 text-sm">لطفاً فیلترها یا عبارت جستجو را تغییر دهید.</p>
            <Button
              onClick={() => { updateParam('q', ''); updateParam('category', ''); }}
              variant="tertiary"
              className="mt-6"
            >
              نمایش همه کتاب‌ها
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredBooks?.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
            
            <div className="mt-12 flex justify-center">
              <Button variant="tertiary" size="lg">
                نمایش کتاب‌های بیشتر
              </Button>
            </div>
          </>
        )}
      </div>
    </PublicLayout>
  );
};
