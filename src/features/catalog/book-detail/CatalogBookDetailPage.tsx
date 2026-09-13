import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Book, ShoppingCart, User, Layers } from 'lucide-react';
import { LoadingState } from '../../../shared/ui/LoadingState';
import { ErrorState } from '../../../shared/ui/ErrorState';
import { ContentCard } from '../components/ContentCard';

interface BookEdition {
  id: string;
  publisher: string;
  year: number;
  editionNumber: number;
  isbn13: string;
  pageCount: number;
  format: 'paperback' | 'hardcover' | 'ebook' | 'audiobook' | 'pdf';
  translators: string[];
  purchaseLinks: { retailer: string; url: string }[];
}

interface CatalogBook {
  slug: string;
  title: string;
  originalTitle: string;
  originalYear: number;
  description: string;
  coverImage?: string;
  authors: string[];
  editions: BookEdition[];
  summarySlug?: string; // If there is a book-summary for this
}

const MOCK_BOOK: CatalogBook = {
  slug: 'boof-koor',
  title: 'بوف کور',
  originalTitle: 'The Blind Owl',
  originalYear: 1315,
  description: 'در زندگی زخم‌هایی هست که مثل خوره روح را آهسته در انزوا می‌خورد و می‌تراشد. این دردها را نمی‌شود به کسی اظهار کرد... بوف کور شناخته‌شده‌ترین اثر صادق هدایت است که سبک سوررئال و روایت غیرخطی آن مرزهای داستان‌نویسی ایران را تغییر داد. راوی داستان، نقاشی روی قلمدان است که مدام کابوس‌ها و توهماتش را با واقعیتی تاریک در هم می‌آمیزد.',
  authors: ['صادق هدایت'],
  summarySlug: 'boof-koor-summary',
  editions: [
    {
      id: 'ed_1',
      publisher: 'نشر چشمه',
      year: 1398,
      editionNumber: 5,
      isbn13: '978-964-362-000-0',
      pageCount: 144,
      format: 'paperback',
      translators: [],
      purchaseLinks: [
        { retailer: 'فیدیبو', url: 'https://fidibo.com' },
        { retailer: 'شهر کتاب', url: 'https://shahreketab.com' }
      ]
    }
  ]
};

const FORMAT_LABELS: Record<string, string> = {
  paperback: 'شمیز (جلد نرم)',
  hardcover: 'گالینگور (جلد سخت)',
  ebook: 'کتاب الکترونیک',
  audiobook: 'کتاب صوتی',
  pdf: 'فایل PDF'
};

export const CatalogBookDetailPage: React.FC = () => {
  const { slug } = useParams();
  const [state, setState] = useState<'loading' | 'success' | 'error'>('loading');
  const [book, setBook] = useState<CatalogBook | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setBook(MOCK_BOOK);
      setState('success');
    }, 500);
  }, [slug]);

  if (state === 'loading') return <LoadingState message="در حال جستجوی کتاب..." />;
  if (state === 'error' || !book) return <ErrorState message="کتاب مورد نظر یافت نشد." />;

  return (
    <div className="min-h-screen bg-[#050a09] text-emerald-50 font-['Vazirmatn',sans-serif] dir-rtl pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#050a09]/90 backdrop-blur-md border-b border-emerald-950/60 px-6 h-16 flex items-center">
        <Link to="/app/books" className="p-2 -ms-2 rounded-full hover:bg-emerald-900/20 text-emerald-400 transition-colors">
          <ArrowRight className="w-5 h-5" />
        </Link>
        <h1 className="text-sm font-bold text-emerald-100 ms-4">شناسنامه کتاب</h1>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-8 md:py-12">
        {/* Book Summary Card (if exists) */}
        {book.summarySlug && (
          <div className="mb-12">
            <h3 className="text-sm font-bold text-[#d4af37] mb-4">خلاصه و معرفی در گرینویچ</h3>
            <div className="max-w-md">
              <ContentCard
                id="summary_1"
                slug={book.summarySlug}
                title={`نگاهی به ${book.title}`}
                summary="یک بررسی جامع درباره‌ی مفاهیم پنهان و نمادهای استفاده شده در این شاهکار ادبی."
                authorName="تحریریه گرینویچ"
                variant="compact"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Cover & Basic Info */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="aspect-[2/3] bg-emerald-950/30 rounded-2xl border border-emerald-900/30 overflow-hidden flex items-center justify-center text-emerald-800 shadow-2xl">
              {book.coverImage ? (
                <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
              ) : (
                <Book className="w-16 h-16" />
              )}
            </div>
            
            <div className="mt-6 space-y-4 text-sm text-emerald-300">
              <div className="flex justify-between items-center py-2 border-b border-emerald-900/20">
                <span className="text-emerald-500/70">نویسنده</span>
                <span className="font-bold text-emerald-100">{book.authors.join('، ')}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-emerald-900/20">
                <span className="text-emerald-500/70">سال نگارش</span>
                <span className="font-mono">{book.originalYear}</span>
              </div>
              {book.originalTitle && (
                <div className="flex justify-between items-center py-2 border-b border-emerald-900/20">
                  <span className="text-emerald-500/70">عنوان اصلی</span>
                  <span className="font-mono dir-ltr">{book.originalTitle}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description & Editions */}
          <div className="md:col-span-8 lg:col-span-9 space-y-12">
            <section>
              <h1 className="text-3xl md:text-4xl font-bold text-emerald-50 font-['Playfair_Display',serif] mb-6">
                {book.title}
              </h1>
              <div className="prose prose-invert prose-emerald max-w-none">
                <p className="text-[16px] leading-[1.9] text-emerald-100/90 text-justify">
                  {book.description}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#d4af37] border-b border-emerald-900/30 pb-4 mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5" />
                نسخه‌ها و انتشارات
              </h2>
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {book.editions.map((edition) => (
                  <div key={edition.id} className="bg-[#0b1312] border border-emerald-900/40 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="font-bold text-emerald-100 text-lg mb-1">{edition.publisher}</h4>
                        <p className="text-xs text-emerald-400/60">{FORMAT_LABELS[edition.format]} · چاپ {edition.editionNumber} ({edition.year})</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8 text-sm">
                      {edition.translators.length > 0 && (
                        <div className="flex justify-between items-center py-2 border-b border-emerald-900/20">
                          <span className="text-emerald-500/70">مترجم</span>
                          <span className="font-bold text-emerald-200">{edition.translators.join('، ')}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center py-2 border-b border-emerald-900/20">
                        <span className="text-emerald-500/70">شابک (ISBN)</span>
                        <span className="font-mono text-emerald-300 tracking-wider dir-ltr">{edition.isbn13}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-emerald-900/20">
                        <span className="text-emerald-500/70">تعداد صفحات</span>
                        <span className="font-mono text-emerald-300">{edition.pageCount}</span>
                      </div>
                    </div>

                    {edition.purchaseLinks.length > 0 && (
                      <div className="space-y-3">
                        <h5 className="text-xs font-bold text-emerald-500/80 uppercase tracking-widest mb-3">لینک‌های خرید</h5>
                        <div className="flex flex-wrap gap-3">
                          {edition.purchaseLinks.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-900/20 border border-emerald-700/30 text-emerald-200 text-xs font-bold hover:bg-[#d4af37] hover:border-[#d4af37] hover:text-[#0b1312] transition-colors"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                              خرید از {link.retailer}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
