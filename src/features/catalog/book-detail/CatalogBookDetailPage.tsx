import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PublicLayout } from '../../../layouts/public/PublicLayout';
import { BookWork, BookEdition, WorkContributor, ExternalPurchaseLink, Person, EditionContributor } from '../../../shared/types';
import { api as apiClient } from '../../../shared/api/client';
import { BookOpen, ShoppingBag, ExternalLink, ArrowRight, BookmarkPlus, Share2 } from 'lucide-react';
import { BookCard } from '../../../shared/ui/BookCard';
import { Button, LinkButton } from '../../../shared/ui/Button';

export const CatalogBookDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [book, setBook] = useState<BookWork | null>(null);
  const [editions, setEditions] = useState<BookEdition[]>([]);
  const [contributors, setContributors] = useState<WorkContributor[]>([]);
  const [peopleMap, setPeopleMap] = useState<Record<string, Person>>({});
  const [purchaseLinksMap, setPurchaseLinksMap] = useState<Record<string, ExternalPurchaseLink[]>>({});
  const [editionContributorsMap, setEditionContributorsMap] = useState<Record<string, EditionContributor[]>>({});
  const [relatedBooks, setRelatedBooks] = useState<BookWork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      try {
        const bookRes = await apiClient.getBookWorkBySlug(slug);
        if (!bookRes.data) {
          setLoading(false);
          return;
        }
        
        setBook(bookRes.data);
        
        const [editionsRes, contribsRes] = await Promise.all([
          apiClient.getBookEditions(bookRes.data.id),
          apiClient.getWorkContributors(bookRes.data.id)
        ]);
        
        setEditions(editionsRes.data || []);
        setContributors(contribsRes.data || []);
        
        // Fetch purchase links and contributors for editions
        const plMap: Record<string, ExternalPurchaseLink[]> = {};
        const ecMap: Record<string, EditionContributor[]> = {};
        for (const ed of editionsRes.data || []) {
          const [linksRes, ecRes] = await Promise.all([
            apiClient.getPurchaseLinks(ed.id),
            apiClient.getEditionContributors(ed.id)
          ]);
          plMap[ed.id] = linksRes.data;
          ecMap[ed.id] = ecRes.data;
        }
        setPurchaseLinksMap(plMap);
        setEditionContributorsMap(ecMap);
        
        // Fetch people details
        const peopleList = await apiClient.getPeople();
        const pMap: Record<string, Person> = {};
        peopleList.data.forEach(p => pMap[p.id] = p);
        setPeopleMap(pMap);

        // Fetch related books (mock)
        const allBooks = await apiClient.getCatalogBooks();
        setRelatedBooks((allBooks.data || []).filter(b => b.id !== bookRes.data?.id).slice(0, 5));
        
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
          <p className="text-emerald-400">در حال جستجو...</p>
        </div>
      </PublicLayout>
    );
  }

  if (!book) {
    return (
      <PublicLayout>
        <div className="text-center py-24">
          <h2 className="text-xl text-emerald-300">کتاب پیدا نشد</h2>
        </div>
      </PublicLayout>
    );
  }

  const author = contributors.find(c => c.role === 'AUTHOR');
  const authorPerson = author ? peopleMap[author.person_id] : null;

  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Breadcrumb */}
        <div className="text-sm text-emerald-400/60 mb-6 flex items-center gap-2">
          <span className="cursor-pointer hover:text-emerald-300" onClick={() => navigate('/app/home')}>خانه</span>
          <span>/</span>
          <span className="cursor-pointer hover:text-emerald-300" onClick={() => navigate('/app/books')}>کتاب‌ها</span>
          <span>/</span>
          <span className="text-emerald-300">{book.title}</span>
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
        
        {/* HERO SECTION */}
        <div className="flex flex-col md:flex-row gap-8 mb-12 bg-[#122A20]/40 p-6 md:p-8 rounded-3xl border border-emerald-900/30">
          <div className="w-full md:w-1/3 max-w-[240px] shrink-0 mx-auto md:mx-0">
            {book.cover_image_url ? (
              <img 
                src={book.cover_image_url} 
                alt={book.title}
                className="w-full aspect-[2/3] object-cover rounded-xl shadow-2xl shadow-emerald-950/50"
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-emerald-900/40 rounded-xl flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-emerald-700" />
              </div>
            )}
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-50 mb-2 leading-tight">
              {book.title}
            </h1>
            {book.original_title && (
              <h2 className="text-xl text-emerald-300/60 mb-6 font-serif" dir="ltr">
                {book.original_title}
              </h2>
            )}
            
            {authorPerson && (
              <div 
                className="flex items-center gap-3 mb-8 cursor-pointer group w-fit"
                onClick={() => navigate(`/app/people/${authorPerson.slug}`)}
              >
                {authorPerson.portrait_image_url ? (
                  <img src={authorPerson.portrait_image_url} alt={authorPerson.display_name} className="w-10 h-10 rounded-full object-cover border-2 border-emerald-800/50 group-hover:border-emerald-500 transition-colors" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center">
                    <span className="text-emerald-400">{authorPerson.display_name.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <p className="text-emerald-100 font-bold group-hover:text-white transition-colors">{authorPerson.display_name}</p>
                  <p className="text-xs text-emerald-400/80">نویسنده</p>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {book.original_publication_year && (
                <div>
                  <p className="text-xs text-emerald-500/80 mb-1">سال انتشار اصلی</p>
                  <p className="text-sm text-emerald-200">{book.original_publication_year}</p>
                </div>
              )}
              {book.original_language && (
                <div>
                  <p className="text-xs text-emerald-500/80 mb-1">زبان اصلی</p>
                  <p className="text-sm text-emerald-200">{book.original_language}</p>
                </div>
              )}
            </div>
            
            {/* Quick Actions Placeholder */}
            <div className="flex flex-wrap gap-4 mt-auto">
              <Button variant="primary" size="lg" leftIcon={<BookOpen className="w-5 h-5" />}>
                شروع مطالعه خلاصه
              </Button>
              <Button variant="tertiary" size="lg" leftIcon={<BookmarkPlus className="w-5 h-5" />}>
                افزودن به کتابخانه
              </Button>
              <Button variant="tertiary" size="icon" leftIcon={<Share2 className="w-5 h-5" />}>
              </Button>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        {book.description && (
          <div className="mb-16">
            <h3 className="text-xl font-bold text-emerald-200 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
              درباره کتاب
            </h3>
            <div className="text-emerald-100/90 leading-relaxed text-justify space-y-4">
              {book.description?.split('\n')?.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        )}

        {/* EDITIONS */}
        {editions.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xl font-bold text-emerald-200 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
              نسخه‌ها و ترجمه‌ها
            </h3>
            
            <div className="space-y-4">
              {editions?.map(ed => {
                const edContribs = editionContributorsMap[ed.id] || [];
                const translators = edContribs.filter(c => c.role === 'TRANSLATOR').map(c => peopleMap[c.person_id]).filter(Boolean);
                
                return (
                  <div key={ed.id} className="greenwich-card rounded-2xl p-5 border border-emerald-900/40">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-emerald-100 mb-2">{ed.title}</h4>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-emerald-400">
                          {translators.length > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="opacity-70">ترجمه</span>
                              {translators?.map((t, idx) => (
                                <span key={t.id}>
                                  <span 
                                    onClick={() => navigate(`/app/people/${t.slug}`)}
                                    className="text-emerald-300 hover:text-white cursor-pointer underline decoration-emerald-800 underline-offset-4"
                                  >
                                    {t.display_name}
                                  </span>
                                  {idx < translators.length - 1 ? ' و ' : ''}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          {(ed.publisher_id === 'pub-negah' || ed.publisher_id === 'pub-cheshmeh') && (
                            <span className="flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-emerald-800"></span>
                              {ed.publisher_id === 'pub-negah' ? 'انتشارات نگاه' : 'نشر چشمه'}
                            </span>
                          )}
                          
                          {ed.publication_year && (
                            <span className="flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-emerald-800"></span>
                              {ed.publication_year}
                            </span>
                          )}
                          
                          {ed.page_count && (
                            <span className="flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-emerald-800"></span>
                              {ed.page_count} صفحه
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Purchase Links */}
                      {purchaseLinksMap[ed.id]?.length > 0 && (
                        <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                          {purchaseLinksMap[ed.id]?.map(link => (
                            <LinkButton
                              key={link.id}
                              href={link.url}
                              external
                              variant="tertiary"
                              size="sm"
                              leftIcon={<ShoppingBag className="w-4 h-4" />}
                              rightIcon={<ExternalLink className="w-3 h-3 opacity-50" />}
                            >
                              خرید نسخه
                            </LinkButton>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* RELATED BOOKS */}
        {relatedBooks.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xl font-bold text-emerald-200 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
              کتاب‌های مرتبط
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {relatedBooks?.map((related) => (
                <BookCard key={related.id} book={related} />
              ))}
            </div>
          </div>
        )}

      </div>
    </PublicLayout>
  );
};

