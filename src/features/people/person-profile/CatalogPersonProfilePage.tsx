import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, User, Globe, Calendar } from 'lucide-react';
import { LoadingState } from '../../../shared/ui/LoadingState';
import { ErrorState } from '../../../shared/ui/ErrorState';
import { ContentCard } from '../../catalog/components/ContentCard';

interface PersonWork {
  slug: string;
  title: string;
  role: 'author' | 'translator' | 'narrator' | 'editor';
  coverImage?: string;
  type: 'story' | 'serial' | 'article' | 'audio' | 'book';
}

interface PersonProfile {
  slug: string;
  displayName: string;
  aliases: string[];
  image?: string;
  bio: string;
  birthYear?: number;
  deathYear?: number;
  country?: string;
  works: PersonWork[];
}

const MOCK_PERSON: PersonProfile = {
  slug: 'sadegh-hedayat',
  displayName: 'صادق هدایت',
  aliases: ['Sadegh Hedayat'],
  bio: 'صادق هدایت داستان‌نویس، مترجم و روشنفکر ایرانی بود. او را همراهِ محمدعلی جمال‌زاده، بزرگ علوی و صادق چوبک یکی از پدران داستان‌نویسی نوین ایرانی می‌دانند. هدایت از پیشگامان داستان‌نویسی نوین ایران و روشنفکری برجسته بود. بسیاری از پژوهشگران، رمان بوف کور او را مشهورترین و درخشان‌ترین اثر ادبیات داستانی معاصر ایران دانسته‌اند.',
  birthYear: 1281,
  deathYear: 1330,
  country: 'ایران',
  works: [
    { slug: 'boof-koor', title: 'بوف کور', role: 'author', type: 'book' },
    { slug: 'sag-e-velgard', title: 'سگ ولگرد', role: 'author', type: 'story' },
    { slug: 'maskh', title: 'مسخ', role: 'translator', type: 'book' },
  ]
};

const ROLE_LABELS: Record<string, string> = {
  author: 'نوشته‌ها',
  translator: 'ترجمه‌ها',
  narrator: 'روایت‌ها',
  editor: 'ویرایش‌ها',
};

export const CatalogPersonProfilePage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState<'loading' | 'success' | 'error'>('loading');
  const [person, setPerson] = useState<PersonProfile | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setPerson(MOCK_PERSON);
      setState('success');
    }, 500);
  }, [slug]);

  if (state === 'loading') return <LoadingState message="در حال جستجوی شخص..." />;
  if (state === 'error' || !person) return <ErrorState message="شخص مورد نظر یافت نشد." />;

  // Group works by role
  const worksByRole = person.works.reduce((acc, work) => {
    if (!acc[work.role]) acc[work.role] = [];
    acc[work.role].push(work);
    return acc;
  }, {} as Record<string, PersonWork[]>);

  return (
    <div className="min-h-screen bg-[#050a09] text-emerald-50 font-['Vazirmatn',sans-serif] dir-rtl pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#050a09]/90 backdrop-blur-md border-b border-emerald-950/60 px-6 h-16 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ms-2 rounded-full hover:bg-emerald-900/20 text-emerald-400 transition-colors">
          <ArrowRight className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-bold text-emerald-100 ms-4">پروفایل</h1>
      </header>

      <main className="max-w-[1000px] mx-auto px-6 py-8 md:py-16">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-[#d4af37]/30 bg-emerald-950/50 overflow-hidden shrink-0 flex items-center justify-center text-emerald-800">
            {person.image ? (
              <img src={person.image} alt={person.displayName} className="w-full h-full object-cover" />
            ) : (
              <User className="w-16 h-16" />
            )}
          </div>
          
          <div className="flex-1 text-center md:text-right">
            <h1 className="text-3xl md:text-5xl font-bold text-emerald-50 font-['Playfair_Display',serif] mb-3">
              {person.displayName}
            </h1>
            
            {person.aliases.length > 0 && (
              <p className="text-sm text-emerald-500/70 font-mono dir-ltr inline-block mb-6">
                {person.aliases.join(' / ')}
              </p>
            )}

            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-emerald-300/80 mb-8 border-y border-emerald-900/30 py-4">
              {person.country && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#d4af37]" />
                  <span>{person.country}</span>
                </div>
              )}
              {(person.birthYear || person.deathYear) && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#d4af37]" />
                  <span className="font-mono">
                    {person.birthYear || '?'} تا {person.deathYear || 'اکنون'}
                  </span>
                </div>
              )}
            </div>

            <div className="prose prose-invert prose-emerald max-w-none text-right">
              <p className="text-[16px] leading-[1.9] text-emerald-100/90 text-justify">
                {person.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Works Section */}
        <section>
          <h2 className="text-2xl font-bold text-emerald-50 mb-8 font-['Playfair_Display',serif]">آثار ثبت‌شده</h2>
          
          {Object.keys(worksByRole).length === 0 ? (
            <div className="bg-emerald-950/10 border border-emerald-900/20 rounded-2xl p-12 text-center text-emerald-500/60 text-sm">
              هنوز اثری در پلتفرم ثبت نشده است.
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(worksByRole).map(([role, works]: [string, PersonWork[]]) => (
                <div key={role}>
                  <h3 className="text-lg font-bold text-[#d4af37] mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-[#d4af37]/30"></span>
                    {ROLE_LABELS[role] || role}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {works.map(work => (
                      <ContentCard
                        key={work.slug}
                        id={work.slug}
                        slug={work.slug}
                        title={work.title}
                        summary={""}
                        authorName={person.displayName}
                        variant="compact"
                        coverImage={work.coverImage}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
