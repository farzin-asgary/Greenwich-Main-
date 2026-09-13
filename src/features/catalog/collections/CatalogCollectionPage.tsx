import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Layers, BookOpen } from 'lucide-react';
import { LoadingState } from '../../../shared/ui/LoadingState';
import { ErrorState } from '../../../shared/ui/ErrorState';
import { ContentCard } from '../components/ContentCard';

interface CollectionItem {
  slug: string;
  title: string;
  summary: string;
  authorName: string;
  coverImage?: string;
  readingTime: number; // in minutes
  variant: 'short' | 'serial';
}

interface Collection {
  slug: string;
  title: string;
  summary: string;
  coverImage?: string;
  compiler: string; // name of the compiler
  items: CollectionItem[];
}

const MOCK_COLLECTION: Collection = {
  slug: 'rainy-nights',
  title: 'برای شب‌های بارانی',
  summary: 'مجموعه‌ای از داستان‌های کوتاه و روایت‌های ملایم، گردآوری شده برای خواندن در شب‌های آرام و بارانیِ کافه. این آثار به ترتیب برای ایجاد یک حس پیوسته چیده شده‌اند.',
  compiler: 'تحریریه گرینویچ',
  items: [
    {
      slug: 'miz-e-kenar-e-panjereh',
      title: 'میز کنار پنجره',
      summary: 'مردی هر پنجشنبه ساعت پنج سر همان میز می‌نشیند و یک فنجان اضافه سفارش می‌دهد. گارسون سه سال نپرسید چرا.',
      authorName: 'مریم سهرابی',
      readingTime: 5,
      variant: 'short'
    },
    {
      slug: 'shahr-e-khamoosh',
      title: 'شهر خاموش',
      summary: 'روایتی از خیابان‌های خالی پس از نیمه‌شب.',
      authorName: 'علی رضایی',
      readingTime: 12,
      variant: 'serial'
    }
  ]
};

export const CatalogCollectionPage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState<'loading' | 'success' | 'error'>('loading');
  const [collection, setCollection] = useState<Collection | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setCollection(MOCK_COLLECTION);
      setState('success');
    }, 500);
  }, [slug]);

  if (state === 'loading') return <LoadingState message="در حال بارگذاری مجموعه..." />;
  if (state === 'error' || !collection) return <ErrorState message="مجموعه مورد نظر یافت نشد." />;

  const totalReadingTime = collection.items.reduce((total, item) => total + item.readingTime, 0);
  const itemCount = collection.items.length;

  return (
    <div className="min-h-screen bg-[#050a09] text-emerald-50 font-['Vazirmatn',sans-serif] dir-rtl pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#050a09]/90 backdrop-blur-md border-b border-emerald-950/60 px-6 h-16 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ms-2 rounded-full hover:bg-emerald-900/20 text-emerald-400 transition-colors">
          <ArrowRight className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-bold text-emerald-100 ms-4">مجموعه آثار</h1>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-8 md:py-16">
        {/* Collection Hero */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 mb-16">
          <div className="w-full md:w-64 shrink-0">
            <div className="aspect-[4/5] rounded-3xl bg-emerald-950/30 border border-emerald-900/40 overflow-hidden relative shadow-2xl">
              {collection.coverImage ? (
                <img src={collection.coverImage} alt={collection.title} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-emerald-900/50 gap-4">
                  <Layers className="w-16 h-16" />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1 pt-4">
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-50 font-['Playfair_Display',serif] mb-4">
              {collection.title}
            </h1>
            <p className="text-sm text-[#d4af37] font-bold mb-8">
              گردآوری شده توسط {collection.compiler}
            </p>
            <div className="prose prose-invert prose-emerald max-w-none mb-8">
              <p className="text-[16px] leading-[1.8] text-emerald-100/80 text-justify">
                {collection.summary}
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-emerald-400/80 font-mono bg-emerald-950/20 inline-flex px-6 py-3 rounded-2xl border border-emerald-900/30">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#d4af37]" />
                <span>{itemCount} اثر</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-emerald-800"></div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#d4af37]" />
                <span>{totalReadingTime} دقیقه</span>
              </div>
            </div>
          </div>
        </div>

        {/* Items List */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-l from-emerald-900/50 to-transparent"></div>
            <h2 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">فهرست آثار</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-emerald-900/50 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collection.items.map((item) => (
              <ContentCard
                key={item.slug}
                id={item.slug}
                slug={item.slug}
                title={item.title}
                summary={item.summary}
                authorName={item.authorName}
                variant={item.variant}
                readingTime={item.readingTime}
                coverImage={item.coverImage}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
