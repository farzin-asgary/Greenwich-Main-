import React, { useState } from 'react';

const MOCK_MD = `---
title: میز کنار پنجره
slug: miz-e-kenar-e-panjereh
summary: مردی هر پنجشنبه سر همان میز می‌نشیند.
---
## پنجشنبه‌ها

سه سال طول کشید تا بپرسم.`;

interface MarkdownEditorProps {
  warnings?: { line: number; message: string }[];
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ warnings = [] }) => {
  const [value, setValue] = useState(MOCK_MD);

  const lines = value.split('\n');
  const warningLines = new Set(warnings.map(w => w.line));

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-[#050a09]">
      <div className="flex-1 flex overflow-hidden">
        {/* Line numbers */}
        <div className="w-12 shrink-0 bg-[#0b1312] border-l border-emerald-900/40 font-mono text-xs flex flex-col py-4 items-center select-none overflow-y-auto">
          {lines.map((_, i) => {
            const isWarning = warningLines.has(i + 1);
            return (
              <div 
                key={i} 
                className={`leading-6 h-6 w-full text-center ${isWarning ? 'bg-red-950/40 text-red-400 font-bold border-r-2 border-red-500' : 'text-emerald-600/50'}`}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
        
        {/* Text area */}
        <textarea
          className="flex-1 bg-transparent text-emerald-100 font-mono text-[14px] leading-6 p-4 outline-none resize-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          spellCheck={false}
          dir="rtl"
        />
      </div>
    </div>
  );
};
