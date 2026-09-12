import React from 'react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'خطایی رخ داد',
  message = 'امکان برقراری ارتباط با سرور وجود ندارد. لطفاً اتصال اینترنت یا کد QR را بررسی کنید.',
  onRetry
}) => {
  return (
    <div className="greenwich-card rounded-2xl p-6 text-center border border-amber-900/40 bg-amber-950/20 my-4">
      <div className="w-10 h-10 rounded-full bg-amber-900/40 text-amber-400 mx-auto mb-2 flex items-center justify-center font-bold text-lg">
        ⚠️
      </div>
      <h4 className="text-sm font-bold text-amber-200 mb-1">{title}</h4>
      <p className="text-xs text-amber-200/80 mb-4 max-w-sm mx-auto">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-amber-600 text-amber-950 hover:bg-amber-500 transition-colors shadow-sm"
        >
          تلاش مجدد
        </button>
      )}
    </div>
  );
};
