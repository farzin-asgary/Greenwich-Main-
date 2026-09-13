import React, { useState, useRef, useEffect } from 'react';

export interface Footnote {
  id: string;
  order: number;
  content: string;
}

interface FootnotePopoverProps {
  footnoteId: string;
  footnotes: Footnote[];
}

export const FootnotePopover: React.FC<FootnotePopoverProps> = ({ footnoteId, footnotes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const footnote = footnotes.find((f) => f.id === footnoteId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!footnote) return null;

  return (
    <span className="relative inline-block" ref={popoverRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-5 h-5 mx-0.5 rounded-full bg-emerald-900/30 text-[#d4af37] text-[10px] font-mono hover:bg-[#d4af37] hover:text-emerald-950 transition-colors align-super cursor-pointer"
        aria-label={`پانویس ${footnote.order}`}
      >
        {footnote.order}
      </button>

      {isOpen && (
        <div className="absolute z-50 left-1/2 -translate-x-1/2 top-full mt-2 w-64 md:w-80 bg-[#121e1c] border border-[#d4af37]/30 rounded-xl shadow-2xl shadow-black/50 p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#121e1c] border-t border-l border-[#d4af37]/30 rotate-45"></div>
          <div className="relative z-10 flex gap-3 text-sm">
            <span className="font-mono text-[#d4af37] font-bold shrink-0">{footnote.order}.</span>
            <p className="text-emerald-100/90 leading-relaxed text-right m-0">
              {footnote.content}
            </p>
          </div>
        </div>
      )}
    </span>
  );
};
