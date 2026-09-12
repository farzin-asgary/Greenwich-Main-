import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookWork } from '../types';
import { BookOpen } from 'lucide-react';

interface BookCardProps {
  book: BookWork;
  authorName?: string;
  statusText?: string;
}

export const BookCard: React.FC<BookCardProps> = ({ book, authorName, statusText }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/app/books/${book.slug}`)}
      className="greenwich-card rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform group flex flex-col h-full"
    >
      <div className="aspect-[2/3] overflow-hidden bg-emerald-900/40 relative">
        {book.cover_image_url ? (
          <img 
            src={book.cover_image_url} 
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-emerald-700">
            <BookOpen className="w-12 h-12" />
          </div>
        )}
        
        {statusText && (
          <div className="absolute top-2 right-2 bg-emerald-950/80 text-emerald-300 text-[10px] px-2 py-1 rounded-md backdrop-blur-sm border border-emerald-800/50">
            {statusText}
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-emerald-100 text-sm line-clamp-2 mb-1 group-hover:text-emerald-300 transition-colors">{book.title}</h3>
        {authorName ? (
          <p className="text-xs text-emerald-400/80 line-clamp-1 mt-auto pt-2">{authorName}</p>
        ) : book.original_title ? (
          <p className="text-xs text-emerald-400/60 line-clamp-1 mt-auto pt-2" dir="ltr">{book.original_title}</p>
        ) : null}
      </div>
    </div>
  );
};
