import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, CheckCircle2, ChevronLeft, Calendar } from 'lucide-react';

export interface Chapter {
  id: string;
  slug: string;
  title: string; // Used only if published
  summary?: string;
  isPublished: boolean;
  publishAt?: string; // Date string (e.g., '۱۴۰۴/۰۶/۲۲')
  isCompleted?: boolean; // For the current user
}

export interface ChapterListProps {
  publicationSlug: string;
  chapters: Chapter[];
}

export const ChapterList: React.FC<ChapterListProps> = ({ publicationSlug, chapters }) => {
  return (
    <div className="space-y-3">
      {chapters.map((chapter, index) => {
        const chapterNumber = index + 1;
        const formattedNumber = chapterNumber.toString().padStart(2, '0');
        
        if (!chapter.isPublished) {
          // Unpublished Chapter: Hide title, show date
          return (
            <div key={chapter.id} className="flex items-center justify-between p-4 rounded-2xl border border-emerald-900/20 bg-[#0b1312]/50 opacity-60">
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono text-emerald-900 font-bold">{formattedNumber}</span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="text-sm font-bold text-emerald-600/70">فصل منتشرنشده</span>
                  </div>
                  {chapter.publishAt && (
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-800">
                      <Calendar className="w-3 h-3" />
                      <span>تاریخ انتشار: {chapter.publishAt}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }

        // Published Chapter
        return (
          <Link
            key={chapter.id}
            to={`/app/read/${publicationSlug}/${chapter.slug}`}
            className="group flex items-center justify-between p-4 rounded-2xl border border-emerald-900/40 bg-[#0b1312] hover:border-[#d4af37]/40 hover:bg-[#121e1c] transition-all"
          >
            <div className="flex items-center gap-4 flex-1 min-w-0 pr-2">
              <span className={`text-sm font-mono font-bold ${chapter.isCompleted ? 'text-[#d4af37]' : 'text-emerald-500'}`}>
                {formattedNumber}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-bold truncate transition-colors ${chapter.isCompleted ? 'text-emerald-300' : 'text-emerald-100 group-hover:text-[#d4af37]'}`}>
                  {chapter.title}
                </h4>
                {chapter.summary && (
                  <p className="text-[11px] text-emerald-400/60 truncate mt-1">
                    {chapter.summary}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3 pl-2">
              {chapter.isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-[#d4af37]" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-900/20 flex items-center justify-center group-hover:bg-[#d4af37]/10 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-emerald-400 group-hover:text-[#d4af37]" />
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
