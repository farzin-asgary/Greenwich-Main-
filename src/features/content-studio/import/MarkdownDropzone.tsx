import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertTriangle, Loader2, X } from 'lucide-react';

export interface ImportError {
  line?: number;
  message: string;
  canFix: boolean;
}

export interface ImportResult {
  success: boolean;
  title?: string;
  type?: string;
  blockCount?: number;
  footnoteCount?: number;
  missingImages?: string[];
  errors?: ImportError[];
}

export interface MarkdownDropzoneProps {
  onUpload: (files: File[]) => Promise<ImportResult>;
}

export const MarkdownDropzone: React.FC<MarkdownDropzoneProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [state, setState] = useState<'idle' | 'processing' | 'error' | 'success'>('idle');
  const [result, setResult] = useState<ImportResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFiles = async (files: File[]) => {
    const validFiles = files.filter(f => f.name.endsWith('.md') || f.name.endsWith('.zip'));
    if (validFiles.length === 0) return;

    setState('processing');
    try {
      // Mock delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      const res = await onUpload(validFiles);
      setResult(res);
      setState(res.success ? 'success' : 'error');
    } catch (err) {
      setResult({ success: false, errors: [{ message: 'خطای ناشناخته در پردازش فایل.', canFix: false }] });
      setState('error');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
  };

  const reset = () => {
    setState('idle');
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (state === 'processing') {
    return (
      <div className="w-full p-12 rounded-3xl border-2 border-dashed border-emerald-900/40 bg-[#0b1312] flex flex-col items-center justify-center text-emerald-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#d4af37]" />
        <p className="font-bold">در حال پردازش فایل...</p>
        <p className="text-xs text-emerald-500/70 mt-2">لطفاً شکیبا باشید</p>
      </div>
    );
  }

  if (state === 'success' && result) {
    return (
      <div className="w-full p-8 rounded-3xl border border-[#d4af37]/30 bg-[#0b1312] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="flex items-start justify-between mb-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[#d4af37]" />
            </div>
            <div>
              <h3 className="font-bold text-emerald-50 text-lg">پردازش موفق</h3>
              <p className="text-xs text-emerald-400/70 mt-1">فایل آماده‌ی ویرایش در استودیو است.</p>
            </div>
          </div>
          <button onClick={reset} className="p-2 text-emerald-500 hover:text-emerald-300 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          <div className="bg-[#050a09] border border-emerald-900/30 p-4 rounded-2xl">
            <p className="text-[10px] text-emerald-500 uppercase font-mono mb-1">عنوان</p>
            <p className="font-bold text-emerald-100 text-sm truncate">{result.title}</p>
          </div>
          <div className="bg-[#050a09] border border-emerald-900/30 p-4 rounded-2xl">
            <p className="text-[10px] text-emerald-500 uppercase font-mono mb-1">نوع</p>
            <p className="font-bold text-emerald-100 text-sm truncate">{result.type}</p>
          </div>
          <div className="bg-[#050a09] border border-emerald-900/30 p-4 rounded-2xl">
            <p className="text-[10px] text-emerald-500 uppercase font-mono mb-1">تعداد بلوک</p>
            <p className="font-bold font-mono text-emerald-100 text-sm">{result.blockCount}</p>
          </div>
          <div className="bg-[#050a09] border border-emerald-900/30 p-4 rounded-2xl">
            <p className="text-[10px] text-emerald-500 uppercase font-mono mb-1">پانویس‌ها</p>
            <p className="font-bold font-mono text-emerald-100 text-sm">{result.footnoteCount}</p>
          </div>
        </div>

        {result.missingImages && result.missingImages.length > 0 && (
          <div className="mt-6 p-4 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-start gap-3 text-sm text-[#d4af37]">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div>
              <p className="font-bold mb-2">تصاویر زیر یافت نشدند:</p>
              <ul className="list-disc list-inside space-y-1 font-mono text-[11px] opacity-80">
                {result.missingImages.map((img, i) => <li key={i}>{img}</li>)}
              </ul>
              <p className="text-[11px] mt-2 opacity-80">در ویرایشگر باید آن‌ها را آپلود کنید.</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (state === 'error' && result?.errors) {
    return (
      <div className="w-full p-8 rounded-3xl border border-red-900/40 bg-[#0b1312]">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-950 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 className="font-bold text-emerald-50 text-lg">خطا در پردازش فایل</h3>
              <p className="text-xs text-emerald-400/70 mt-1">لطفاً موارد زیر را برطرف کرده و دوباره تلاش کنید.</p>
            </div>
          </div>
          <button onClick={reset} className="p-2 text-emerald-500 hover:text-emerald-300 transition-colors bg-emerald-900/20 rounded-full">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {result.errors.map((err, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-[#050a09] border border-red-900/20">
              <div className="flex items-start gap-3">
                {err.line ? (
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-red-900/20 text-red-400 font-mono text-xs flex items-center justify-center">
                    {err.line}
                  </span>
                ) : (
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-red-900/20 text-red-400 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </span>
                )}
                <p className="text-sm text-emerald-100 leading-relaxed py-1">{err.message}</p>
              </div>
              {err.canFix && (
                <button className="shrink-0 px-4 py-2 rounded-lg bg-emerald-900/30 text-emerald-300 hover:bg-emerald-800/50 hover:text-emerald-100 text-xs font-bold transition-colors">
                  اصلاح خودکار
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Idle state
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`w-full relative group cursor-pointer transition-all duration-300 ${
        isDragging 
          ? 'border-[#d4af37] bg-[#d4af37]/5 scale-[1.01] shadow-2xl shadow-[#d4af37]/10' 
          : 'border-emerald-900/40 bg-[#0b1312] hover:border-[#d4af37]/50 hover:bg-[#121e1c]'
      } border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center`}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept=".md,.zip"
        multiple
      />
      
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${
        isDragging ? 'bg-[#d4af37]/20 rotate-12 scale-110' : 'bg-emerald-950 group-hover:bg-emerald-900/60'
      }`}>
        <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-[#d4af37]' : 'text-emerald-500 group-hover:text-emerald-400'}`} />
      </div>

      <h3 className="text-lg font-bold text-emerald-50 mb-2">
        فایل خود را اینجا رها کنید
      </h3>
      <p className="text-sm text-emerald-400/60 mb-8 max-w-sm">
        فایل تک <span className="font-mono text-emerald-300">.md</span> برای داستان کوتاه، یا فایل <span className="font-mono text-emerald-300">.zip</span> برای مجموعه‌ی سریالی.
      </p>

      <div className="px-6 py-3 rounded-xl bg-[#050a09] border border-emerald-900/50 text-emerald-300 text-xs font-bold font-mono inline-flex items-center gap-2 group-hover:border-[#d4af37]/40 transition-colors">
        <FileText className="w-4 h-4" />
        <span>انتخاب از سیستم</span>
      </div>
    </div>
  );
};
