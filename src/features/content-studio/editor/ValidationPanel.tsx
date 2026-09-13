import React from 'react';
import { AlertCircle, AlertTriangle, Info, Wrench } from 'lucide-react';
import { ValidationIssue } from '../../../shared/content/schema';

const MOCK_ISSUES: ValidationIssue[] = [
  { severity: 'error', path: 'meta.slug', message: 'اسلاگ تکراری است.', fix: 'generate-slug' },
  { severity: 'warning', path: 'document.blocks', message: 'تصویر توضیح (alt) ندارد.', blockId: 'blk_04' },
  { severity: 'hint', path: 'document.blocks', message: 'پانویس ارجاع داده نشده.', line: 12 }
];

export const ValidationPanel: React.FC = () => {
  const issues = MOCK_ISSUES;

  if (issues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-emerald-500/50">
        <div className="w-12 h-12 rounded-full bg-emerald-950/30 flex items-center justify-center mb-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <p className="text-xs">سند معتبر است.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {issues.map((issue, idx) => (
        <div 
          key={idx} 
          className={`p-3 rounded-xl border flex flex-col gap-2 transition-colors cursor-pointer ${
            issue.severity === 'error' 
              ? 'bg-red-950/20 border-red-900/30 hover:border-red-900/50' 
              : issue.severity === 'warning'
                ? 'bg-[#d4af37]/5 border-[#d4af37]/20 hover:border-[#d4af37]/40'
                : 'bg-emerald-950/20 border-emerald-900/20 hover:border-emerald-900/40'
          }`}
        >
          <div className="flex items-start gap-2">
            {issue.severity === 'error' && <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />}
            {issue.severity === 'warning' && <AlertTriangle className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />}
            {issue.severity === 'hint' && <Info className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />}
            <p className="text-xs text-emerald-100 leading-relaxed flex-1">{issue.message}</p>
          </div>

          <div className="flex items-center gap-2 pr-6 mt-1">
            {issue.fix && (
              <button className="flex items-center gap-1.5 px-2 py-1 bg-emerald-900/40 text-emerald-300 hover:text-emerald-100 hover:bg-emerald-900/60 rounded text-[10px] font-bold transition-colors">
                <Wrench className="w-3 h-3" />
                {issue.fix === 'generate-slug' ? 'ساخت خودکار' : 'اصلاح'}
              </button>
            )}
            {issue.blockId && (
              <span className="text-[10px] font-mono text-emerald-600 px-1.5 py-0.5 rounded bg-emerald-950/50">
                {issue.blockId}
              </span>
            )}
            {issue.line && (
              <span className="text-[10px] font-mono text-emerald-600 px-1.5 py-0.5 rounded bg-emerald-950/50">
                سطر {issue.line}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
