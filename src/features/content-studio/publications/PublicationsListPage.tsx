import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ContentStudioLayout } from '../../../layouts/content/ContentStudioLayout';
import { api as apiClient } from '../../../shared/api/client';
import { Publication } from '../../../shared/types';
import { BookOpen, PlusCircle, Edit, FileText, CheckCircle2 } from 'lucide-react';
import { LoadingState } from '../../../shared/ui/LoadingState';

export const PublicationsListPage: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'ARTICLE' | 'BOOK_SUMMARY' | 'BOOK'>('ALL');

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await apiClient.getPublications();
        setPublications(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filtered = filter === 'ALL' ? publications : publications.filter(p => p.publication_type === filter);

  return (
    <ContentStudioLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-emerald-900/60 pb-3">
          <div>
            <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
              مدیریت انتشارات (کتاب و مقالات)
            </h1>
            <p className="text-xs text-emerald-300/70">سیستم مدیریت نشر و محتوای بومی</p>
          </div>

          <Link
            to="/content-studio/publications/new"
            className="px-4 py-2 rounded-xl bg-[#2d6a4f] text-[#fbf9f5] font-bold text-xs hover:bg-[#1b4332] flex items-center gap-1.5 border border-[#d4af37]/30 shadow-lg"
          >
            <PlusCircle className="w-4 h-4 text-[#d4af37]" />
            <span>نشر اثر جدید</span>
          </Link>
        </div>

        <div className="flex gap-2 text-xs font-bold mb-4 overflow-x-auto pb-2">
          {['ALL', 'ARTICLE', 'BOOK_SUMMARY', 'BOOK'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors border ${
                filter === f 
                  ? 'bg-[#1b4332] text-[#d4af37] border-[#d4af37]/40' 
                  : 'bg-[#0b1312] text-emerald-400 border-emerald-900/60 hover:border-emerald-700'
              }`}
            >
              {f === 'ALL' ? 'همه موارد' : f === 'ARTICLE' ? 'مقاله‌ها' : f === 'BOOK_SUMMARY' ? 'خلاصه‌کتاب‌ها' : 'کتاب‌ها'}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingState message="در حال بارگذاری..." />
        ) : (
          <div className="space-y-3">
            {filtered?.map((pub) => (
              <div key={pub.id} className="greenwich-card rounded-2xl p-4 border border-emerald-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex gap-4 items-center w-full sm:w-auto">
                  <div className="w-12 h-16 rounded overflow-hidden bg-emerald-950 shrink-0">
                    {pub.cover_image ? (
                      <img src={pub.cover_image} alt={pub.title} className="w-full h-full object-cover" />
                    ) : (
                      <FileText className="w-6 h-6 m-auto mt-5 text-emerald-700" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-[#1b4332] text-[#d4af37] font-bold px-2 py-0.5 rounded text-[10px]">
                        {pub.publication_type}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">{pub.reader_format}</span>
                    </div>
                    <h3 className="font-bold text-emerald-100 text-sm">{pub.title}</h3>
                    <p className="text-[10px] text-emerald-400/80 mt-0.5">نویسنده: {pub.author}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-0 border-emerald-900/40 pt-3 sm:pt-0">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 ${
                    pub.status === 'PUBLISHED' ? 'bg-[#0b1312] text-emerald-400 border-emerald-800' :
                    pub.status === 'DRAFT' ? 'bg-amber-900/20 text-amber-500 border-amber-900/40' :
                    'bg-blue-900/20 text-blue-400 border-blue-900/40'
                  }`}>
                    {pub.status === 'PUBLISHED' && <CheckCircle2 className="w-3 h-3" />}
                    {pub.status}
                  </span>
                  
                  {pub.publication_type === 'BOOK' && pub.reader_format === 'NATIVE_STRUCTURED' ? (
                    <Link
                      to={`/content-studio/publications/${pub.id}/chapters`}
                      className="px-3 py-1.5 rounded-xl bg-[#0b1312] text-emerald-300 text-xs font-bold hover:bg-[#121e1c] border border-emerald-900 flex items-center gap-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      فصل‌ها
                    </Link>
                  ) : null}

                  <Link
                    to={`/content-studio/publications/${pub.id}`}
                    className="px-3 py-1.5 rounded-xl bg-[#121e1c] text-[#d4af37] font-bold text-xs hover:bg-[#1b4332] border border-emerald-900 flex items-center gap-1"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    ویرایش
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ContentStudioLayout>
  );
};
