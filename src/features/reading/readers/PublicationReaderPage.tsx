import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { LoadingState } from '../../../shared/ui/LoadingState';
import { ErrorState } from '../../../shared/ui/ErrorState';
import { FootnotePopover, Footnote } from './FootnotePopover';

// Final Shape Blocks Provided in Task Description
type Mark =
  | { type: 'bold' }
  | { type: 'italic' }
  | { type: 'link'; url: string }
  | { type: 'footnoteRef'; footnoteId: string };

interface InlineText {
  type: 'text';
  text: string;
  marks?: Mark[];
}

interface ParagraphBlock { id: string; type: 'paragraph'; schemaVersion: number; content: InlineText[] }
interface HeadingBlock   { id: string; type: 'heading';   schemaVersion: number; level: 2|3; content: InlineText[] }
interface QuoteBlock     { id: string; type: 'quote';     schemaVersion: number; content: InlineText[]; attribution?: string }
interface ImageBlock     { id: string; type: 'image';     schemaVersion: number; assetId: string; alt: string; caption?: string }
interface DividerBlock   { id: string; type: 'divider';   schemaVersion: number }

type DocumentBlock = ParagraphBlock | HeadingBlock | QuoteBlock | ImageBlock | DividerBlock;

interface StructuredDocument {
  documentSchemaVersion: number;
  blocks: DocumentBlock[];
  footnotes: Footnote[];
}

// Mock Data
const MOCK_DOCUMENT: StructuredDocument = {
  documentSchemaVersion: 1,
  footnotes: [
    { id: 'fn_1', order: 1, content: 'متن کامل پانویس. در کافه‌ی ما رسم است فنجان دست‌نخورده را تا پایان شیفت جمع نکنیم.' },
  ],
  blocks: [
    {
      id: 'b1', type: 'heading', schemaVersion: 1, level: 2,
      content: [{ type: 'text', text: 'پنجشنبه‌ها' }]
    },
    {
      id: 'b2', type: 'paragraph', schemaVersion: 1,
      content: [{ type: 'text', text: 'سه سال طول کشید تا بپرسم. هر پنجشنبه ساعت پنج می‌آمد و دو قهوه سفارش می‌داد.' }]
    },
    {
      id: 'b3', type: 'quote', schemaVersion: 1, attribution: 'چیزی که پدرم می‌گفت',
      content: [{ type: 'text', text: 'آدم‌ها با غیبت‌ها زندگی می‌کنند، نه با حضورها.' }]
    },
    { id: 'b4', type: 'divider', schemaVersion: 1 },
    {
      id: 'b5', type: 'heading', schemaVersion: 1, level: 2,
      content: [{ type: 'text', text: 'آن پنجشنبه' }]
    },
    {
      id: 'b6', type: 'paragraph', schemaVersion: 1,
      content: [
        { type: 'text', text: 'آن روز باران می‌آمد و کافه خالی بود. فنجان دوم را که آوردم، سرش را بالا آورد و گفت: «' },
        { type: 'text', text: 'بنشین', marks: [{ type: 'bold' }] },
        { type: 'text', text: '».' }
      ]
    },
    {
      id: 'b7', type: 'image', schemaVersion: 1, assetId: 'img1', alt: 'میز چوبی خالی کنار پنجره‌ی بارانی', caption: 'غروب پنجشنبه، ساعت پنج و ربع'
    },
    {
      id: 'b8', type: 'paragraph', schemaVersion: 1,
      content: [
        { type: 'text', text: 'فنجان دوم را آن روز نبردم. تا بسته شدن کافه همان‌جا ماند' },
        { type: 'text', text: '.', marks: [{ type: 'footnoteRef', footnoteId: 'fn_1' }] }
      ]
    },
  ]
};

export const PublicationReaderPage: React.FC<{ previewDoc?: any }> = ({ previewDoc }) => {
  const { publicationId } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState<'loading' | 'success' | 'error'>('loading');
  const [document, setDocument] = useState<StructuredDocument | null>(null);

  useEffect(() => {
    // Simulate Fetch
    setTimeout(() => {
      setDocument(MOCK_DOCUMENT);
      setState('success');
    }, 600);
  }, [publicationId]);

  const renderInlineText = (nodes: InlineText[], footnotes: Footnote[]) => {
    return nodes.map((node, i) => {
      let element: React.ReactNode = node.text;

      if (node.marks) {
        node.marks.forEach(mark => {
          if (mark.type === 'bold') element = <strong key={`b-${i}`} className="font-bold text-emerald-50">{element}</strong>;
          if (mark.type === 'italic') element = <em key={`i-${i}`} className="italic">{element}</em>;
          if (mark.type === 'link') element = <a key={`l-${i}`} href={mark.url} className="text-[#d4af37] underline underline-offset-4 hover:text-[#f4cf57] transition-colors">{element}</a>;
        });
      }

      const hasFootnote = node.marks?.find(m => m.type === 'footnoteRef') as { type: 'footnoteRef', footnoteId: string } | undefined;
      
      return (
        <React.Fragment key={i}>
          {element}
          {hasFootnote && <FootnotePopover footnoteId={hasFootnote.footnoteId} footnotes={footnotes} />}
        </React.Fragment>
      );
    });
  };

  const renderBlock = (block: DocumentBlock, footnotes: Footnote[]) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={block.id} className="text-[16px] text-emerald-100/90 leading-[1.8] mb-6">
            {renderInlineText(block.content, footnotes)}
          </p>
        );
      case 'heading':
        if (block.level === 2) {
          return (
            <h2 key={block.id} className="text-[18px] font-bold text-emerald-50 mt-10 mb-4 font-['Playfair_Display',serif]">
              {renderInlineText(block.content, footnotes)}
            </h2>
          );
        }
        return (
          <h3 key={block.id} className="text-[15px] font-bold text-emerald-100 mt-8 mb-3">
            {renderInlineText(block.content, footnotes)}
          </h3>
        );
      case 'quote':
        return (
          <blockquote key={block.id} className="border-s-2 border-[#d4af37] ps-4 my-8 relative">
            <p className="text-[16px] italic text-emerald-200/90 leading-[1.8]">
              {renderInlineText(block.content, footnotes)}
            </p>
            {block.attribution && (
              <footer className="mt-3 text-[12px] text-emerald-500/80">
                — {block.attribution}
              </footer>
            )}
          </blockquote>
        );
      case 'image':
        if (!block.alt) {
          console.warn('ImageBlock is missing alt attribute:', block);
        }
        return (
          <figure key={block.id} className="my-8 rounded-2xl overflow-hidden bg-emerald-950/20">
            <div className="aspect-[4/3] relative border border-emerald-900/30 rounded-2xl overflow-hidden bg-[#070d0c] flex items-center justify-center text-emerald-800">
              <span className="text-sm">تصویر: {block.alt}</span>
            </div>
            {block.caption && (
              <figcaption className="text-center text-[11px] text-emerald-500/70 mt-3 font-mono">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );
      case 'divider':
        return (
          <div key={block.id} className="flex items-center justify-center gap-4 my-12">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-800/50"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/70"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-800/50"></div>
          </div>
        );
      default:
        return null;
    }
  };

  if (state === 'loading') return <LoadingState message="در حال آماده‌سازی متن..." />;
  if (state === 'error' || !document) return <ErrorState message="مشکلی در بارگذاری داستان پیش آمد." onRetry={() => setState('loading')} />;

  return (
    <div className="min-h-screen bg-[#050a09] text-emerald-50 font-['Vazirmatn',sans-serif] dir-rtl selection:bg-[#d4af37] selection:text-black">
      {/* Top Bar - Reader Session */}
      <header className="sticky top-0 z-40 bg-[#050a09]/90 backdrop-blur-md border-b border-emerald-950/60 px-4 h-14 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 -ms-2 rounded-full hover:bg-emerald-900/20 text-emerald-400 transition-colors">
          <ArrowRight className="w-5 h-5" />
        </button>
        
        {/* Session Time - Thin Style */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-900/30 bg-emerald-950/20">
          <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-[11px] font-mono font-light text-emerald-300">ساعت ۱۷:۱۵</span>
        </div>
      </header>

      {/* Reader Canvas */}
      <main className="max-w-[60ch] mx-auto px-6 py-12 pb-32">
        {document.blocks.map(block => renderBlock(block, document.footnotes))}
      </main>
    </div>
  );
};
