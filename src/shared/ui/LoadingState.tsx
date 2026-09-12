import React from 'react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'در حال بارگذاری اطلاعات...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[240px] text-center">
      <div className="relative w-14 h-14 mb-4 flex items-center justify-center">
        {/* Outer compass ring animation */}
        <div className="absolute inset-0 rounded-full border-2 border-emerald-800 border-t-[#d4af37] animate-spin"></div>
        {/* Inner emerald pulse */}
        <div className="w-8 h-8 rounded-full bg-[#1b4332] flex items-center justify-center text-[#d4af37] animate-pulse">
          ❖
        </div>
      </div>
      <p className="text-sm font-medium text-emerald-200/80 animate-pulse">{message}</p>
    </div>
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <div className="greenwich-card rounded-2xl p-4 animate-pulse space-y-3 border border-emerald-900/30">
      <div className="w-full h-36 bg-emerald-950/40 rounded-xl"></div>
      <div className="h-4 bg-emerald-900/40 rounded w-3/4"></div>
      <div className="h-3 bg-emerald-900/20 rounded w-1/2"></div>
    </div>
  );
};
