import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PublicLayout } from '../../../layouts/public/PublicLayout';
import { Person, BookWork } from '../../../shared/types';
import { api as apiClient } from '../../../shared/api/client';
import { ArrowRight, User } from 'lucide-react';
import { BookCard } from '../../../shared/ui/BookCard';

export const CatalogPersonProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [person, setPerson] = useState<Person | null>(null);
  const [books, setBooks] = useState<BookWork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      try {
        const res = await apiClient.getPersonBySlug(slug);
        setPerson(res.data);
        
        // In a real app we'd fetch actual works related to this person
        // For mock, we'll fetch all and filter or just return all
        const allBooks = await apiClient.getCatalogBooks();
        setBooks(allBooks.data || []); // Mocking authored works
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
        <div className="flex justify-center items-center h-64">
          <p className="text-emerald-400">در حال بارگذاری...</p>
        </div>
      </PublicLayout>
    );
  }

  if (!person) {
    return (
      <PublicLayout>
        <div className="text-center py-24">
          <h2 className="text-xl text-emerald-300">شخص پیدا نشد</h2>
        </div>
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
          <span className="cursor-pointer hover:text-emerald-300" onClick={() => navigate('/app/books')}>افراد</span>
          <span>/</span>
          <span className="text-emerald-300">{person.display_name}</span>
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
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-16 text-center md:text-right">
          <div className="w-32 h-32 md:w-48 md:h-48 shrink-0">
            {person.portrait_image_url ? (
              <img 
                src={person.portrait_image_url} 
                alt={person.display_name}
                className="w-full h-full object-cover rounded-full border-4 border-[#0d1f18] shadow-xl shadow-emerald-950/40"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-emerald-900/40 flex items-center justify-center border-4 border-[#0d1f18]">
                <User className="w-16 h-16 text-emerald-700" />
              </div>
            )}
          </div>
          
          <div className="flex-1 pt-2">
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-50 mb-2">
              {person.display_name}
            </h1>
            {person.latin_name && (
              <h2 className="text-xl text-emerald-400/60 mb-4 font-serif" dir="ltr">
                {person.latin_name}
              </h2>
            )}
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
              <span className="px-3 py-1 bg-emerald-900/40 text-emerald-300 text-xs rounded-full border border-emerald-800/50">
                نویسنده
              </span>
              {person.nationality && (
                <span className="px-3 py-1 bg-[#122A20] text-emerald-400/80 text-xs rounded-full border border-emerald-900/30">
                  {person.nationality}
                </span>
              )}
            </div>
            
            {person.short_bio && (
              <p className="text-emerald-200/90 leading-relaxed max-w-2xl">
                {person.short_bio}
              </p>
            )}
          </div>
        </div>
        
        {/* FULL BIOGRAPHY */}
        {person.biography && (
          <div className="mb-16">
            <h3 className="text-xl font-bold text-emerald-200 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
              زندگی‌نامه
            </h3>
            <div className="bg-[#122A20]/20 p-6 md:p-8 rounded-3xl border border-emerald-900/20">
              <div className="text-emerald-100/90 leading-relaxed text-justify space-y-4">
                {person.biography?.split('\n')?.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* AUTHORED WORKS */}
        {books.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xl font-bold text-emerald-200 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
              آثار
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {books?.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        )}

      </div>
    </PublicLayout>
  );
};

