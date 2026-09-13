import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Layers } from 'lucide-react';

export type ContentVariant = 'short' | 'serial' | 'compact';

export interface ContentCardProps {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverImage?: string;
  authorName: string;
  readingTime?: number; // in minutes
  variant?: ContentVariant;
  progress?: number; // 0 to 100
  chapterCount?: number;
  tags?: string[];
}

export const ContentCard: React.FC<ContentCardProps> = ({
  slug,
  title,
  summary,
  coverImage,
  authorName,
  readingTime,
  variant = 'short',
  progress,
  chapterCount,
  tags = [],
}) => {
  const isSerial = variant === 'serial';
  const isCompact = variant === 'compact';

  if (isCompact) {
    return (
      <Link
        to={`/app/publications/${slug}`}
        className="greenwich-card group flex items-center gap-4 p-3 rounded-2xl border border-emerald-900/40 bg-[#0b1312] hover:border-[#d4af37]/40 transition-all hover:bg-[#121e1c]"
      >
        <div className="w-16 h-20 rounded-xl bg-emerald-950/50 overflow-hidden shrink-0 border border-emerald-900/30">
          {coverImage ? (
            <img src={coverImage} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-emerald-800">
              <BookOpen className="w-6 h-6" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-emerald-100 truncate">{title}</h4>
          <p className="text-xs text-emerald-400/70 mt-1">{authorName}</p>
          
          {progress !== undefined && progress > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1 bg-emerald-950 rounded-full overflow-hidden">
                <div className="h-full bg-[#d4af37] rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <span className="text-[10px] text-emerald-500 font-mono">{progress}%</span>
            </div>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/app/publications/${slug}`}
      className="greenwich-card group flex flex-col rounded-3xl overflow-hidden border border-emerald-900/40 bg-[#0b1312] hover:border-[#d4af37]/40 hover:shadow-xl hover:shadow-emerald-900/10 transition-all h-full"
    >
      <div className="relative aspect-[4/3] bg-emerald-950/30 overflow-hidden border-b border-emerald-900/30">
        {coverImage ? (
          <img src={coverImage} alt={title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-emerald-900/40">
            <BookOpen className="w-12 h-12" />
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {isSerial && (
            <div className="bg-[#0b1312]/80 backdrop-blur-sm border border-emerald-900/50 px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-[10px] font-bold text-[#d4af37]">
              <Layers className="w-3 h-3" />
              <span>سریالی ({chapterCount} فصل)</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2 overflow-x-auto no-scrollbar pb-1">
          {tags.slice(0, 2).map((tag, i) => (
            <span key={i} className="whitespace-nowrap px-2 py-0.5 rounded-md bg-emerald-900/20 text-emerald-400 text-[10px] font-bold">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-base font-bold text-emerald-100 leading-snug line-clamp-2 group-hover:text-[#d4af37] transition-colors">{title}</h3>
        
        <p className="text-xs text-emerald-300/70 mt-2 line-clamp-2 leading-relaxed flex-1">
          {summary}
        </p>
        
        <div className="mt-5 pt-4 border-t border-emerald-900/30 flex items-center justify-between text-[11px] text-emerald-400/60">
          <span className="font-bold text-emerald-300">{authorName}</span>
          {readingTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{readingTime} دقیقه</span>
            </div>
          )}
        </div>

        {/* Progress Bar (Only if started) */}
        {progress !== undefined && progress > 0 && (
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-emerald-950 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-l from-[#d4af37] to-emerald-600 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="text-[10px] text-[#d4af37] font-mono font-bold">{progress}%</span>
          </div>
        )}
      </div>
    </Link>
  );
};
