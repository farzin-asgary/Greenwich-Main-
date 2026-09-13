import React, { useState } from 'react';
import { Save, Eye, Send, FileEdit, LayoutTemplate } from 'lucide-react';
import { BlockEditor } from './BlockEditor';
import { MarkdownEditor } from './MarkdownEditor';
import { PreviewPane } from './PreviewPane';
import { ValidationPanel } from './ValidationPanel';

export const StudioLayout: React.FC = () => {
  const [mode, setMode] = useState<'block' | 'markdown'>('block');
  const [showPreview, setShowPreview] = useState(false);
  const [hasErrors, setHasErrors] = useState(true); // Example state to control error presence

  return (
    <div className="h-screen flex flex-col bg-[#050a09] text-emerald-50 font-['Vazirmatn',sans-serif] dir-rtl overflow-hidden">
      {/* Top Bar */}
      <header className="h-14 shrink-0 bg-[#0b1312] border-b border-emerald-900/40 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-emerald-100 text-sm">میز کنار پنجره</h1>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-1 rounded-md bg-emerald-900/20 text-emerald-400 border border-emerald-900/30">
              نسخه ۳
            </span>
            <span className="text-emerald-500/60 flex items-center gap-1">
              <Save className="w-3 h-3" />
              ذخیره‌ی خودکار ۲ دقیقه پیش
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-emerald-950/40 p-1 rounded-lg border border-emerald-900/30">
            <button
              onClick={() => setMode('block')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-2 transition-colors ${mode === 'block' ? 'bg-emerald-900/60 text-[#d4af37]' : 'text-emerald-500 hover:text-emerald-300'}`}
            >
              <LayoutTemplate className="w-3.5 h-3.5" />
              بلوکی
            </button>
            <button
              onClick={() => setMode('markdown')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-2 transition-colors ${mode === 'markdown' ? 'bg-emerald-900/60 text-[#d4af37]' : 'text-emerald-500 hover:text-emerald-300'}`}
            >
              <FileEdit className="w-3.5 h-3.5" />
              متنی
            </button>
          </div>

          <div className="w-px h-6 bg-emerald-900/30 mx-1"></div>

          <button 
            onClick={() => setShowPreview(!showPreview)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors border ${showPreview ? 'bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/30' : 'bg-[#050a09] text-emerald-400 border-emerald-900/40 hover:bg-emerald-900/20'}`}
          >
            <Eye className="w-3.5 h-3.5" />
            پیش‌نمایش
          </button>

          <div className="relative group">
            <button 
              disabled={hasErrors}
              className="px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 bg-[#d4af37] text-black hover:bg-[#b5952f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5" />
              ارسال برای بررسی
            </button>
            {hasErrors && (
              <div className="absolute top-full mt-2 left-0 bg-black text-red-400 text-xs px-2 py-1 rounded border border-red-900/50 opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-50">
                سند دارای خطا است و قابل ارسال نیست.
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Area (stretch) */}
        <main className="flex-1 flex flex-col min-w-0 relative">
          {mode === 'block' ? <BlockEditor /> : <MarkdownEditor />}
        </main>

        {/* Preview Panel */}
        {showPreview && (
          <aside className="w-[450px] shrink-0 border-l border-emerald-900/40 flex flex-col z-10">
            <PreviewPane />
          </aside>
        )}

        {/* Sidebar (330px) */}
        <aside className="w-[330px] shrink-0 bg-[#0b1312] border-r border-emerald-900/40 flex flex-col z-20">
          <div className="p-4 border-b border-emerald-900/40">
            <h2 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-4">اعتبارسنجی</h2>
            <ValidationPanel />
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <h2 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-4">نسخه‌ها و یادداشت‌ها</h2>
          </div>
        </aside>
      </div>
    </div>
  );
};
