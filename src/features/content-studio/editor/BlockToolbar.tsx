import React from 'react';

export const BlockToolbar: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-2 p-2 bg-[#0b1312] border border-emerald-900/30 rounded-2xl shadow-xl w-max mx-auto relative before:absolute before:-inset-4 before:opacity-0 hover:before:opacity-100 before:bg-emerald-900/5 before:rounded-3xl before:transition-opacity before:-z-10">
      <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-emerald-900/40 text-emerald-400 hover:text-emerald-200 transition-colors tooltip-trigger relative group">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4H6.5a4.5 4.5 0 0 0 0 9H10"/><path d="M10 4v16"/><path d="M14 4v16"/></svg>
        <div className="absolute -top-8 bg-black text-xs px-2 py-1 rounded border border-emerald-900/50 opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">پاراگراف</div>
      </button>

      <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-emerald-900/40 text-emerald-400 hover:text-emerald-200 transition-colors tooltip-trigger relative group">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16M4 18V6M20 18V6"/></svg>
        <div className="absolute -top-8 bg-black text-xs px-2 py-1 rounded border border-emerald-900/50 opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">تیتر</div>
      </button>

      <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-emerald-900/40 text-emerald-400 hover:text-emerald-200 transition-colors tooltip-trigger relative group">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.99c1.03 0 1.06 0 1.06 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/></svg>
        <div className="absolute -top-8 bg-black text-xs px-2 py-1 rounded border border-emerald-900/50 opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">نقل قول</div>
      </button>

      <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-emerald-900/40 text-emerald-400 hover:text-emerald-200 transition-colors tooltip-trigger relative group">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        <div className="absolute -top-8 bg-black text-xs px-2 py-1 rounded border border-emerald-900/50 opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">تصویر</div>
      </button>

      <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-emerald-900/40 text-emerald-400 hover:text-emerald-200 transition-colors tooltip-trigger relative group">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" x2="19" y1="12" y2="12"/></svg>
        <div className="absolute -top-8 bg-black text-xs px-2 py-1 rounded border border-emerald-900/50 opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">جداکننده</div>
      </button>
    </div>
  );
};
