import React from 'react';

interface ReaderLayoutProps {
  children: React.ReactNode;
}

export const ReaderLayout: React.FC<ReaderLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#fbf9f5] dark:bg-[#0b1312] text-[#121e1c] dark:text-[#fbf9f5] font-['Vazirmatn',sans-serif] transition-colors duration-300">
      {children}
    </div>
  );
};
