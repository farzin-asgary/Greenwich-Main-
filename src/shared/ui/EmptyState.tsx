import React from 'react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'موردی یافت نشد',
  description = 'در حال حاضر اطلاعاتی برای نمایش وجود ندارد.',
  actionText,
  onAction,
  icon
}) => {
  return (
    <div className="greenwich-card rounded-2xl p-8 text-center flex flex-col items-center justify-center border border-emerald-900/30">
      <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-[#d4af37] mb-3">
        {icon || '📭'}
      </div>
      <h4 className="text-base font-bold text-emerald-100 mb-1">{title}</h4>
      <p className="text-xs text-emerald-300/70 max-w-sm mb-4">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#2d6a4f] text-emerald-50 hover:bg-[#1b4332] transition-colors shadow-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
