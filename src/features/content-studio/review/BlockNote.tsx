import React from 'react';
import { MessageSquare, User } from 'lucide-react';

interface BlockNoteProps {
  author: string;
  date: string;
  content: string;
}

export const BlockNote: React.FC<BlockNoteProps> = ({ author, date, content }) => {
  return (
    <div className="bg-[#121e1c] border border-emerald-900/40 rounded-xl p-3 shadow-lg relative ml-8 mt-2 w-64 before:absolute before:top-4 before:-right-2 before:w-2 before:h-2 before:bg-[#121e1c] before:border-r before:border-t before:border-emerald-900/40 before:rotate-45">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-5 h-5 rounded-full bg-emerald-900/50 flex items-center justify-center shrink-0">
          <User className="w-3 h-3 text-emerald-400" />
        </div>
        <div className="flex-1 min-w-0 flex items-baseline justify-between gap-2">
          <span className="text-[10px] font-bold text-emerald-200 truncate">{author}</span>
          <span className="text-[9px] text-emerald-500/70 font-mono whitespace-nowrap">{date}</span>
        </div>
      </div>
      <p className="text-xs text-emerald-100 leading-relaxed text-justify">{content}</p>
    </div>
  );
};
