import React from 'react';
import { ContentStudioLayout } from '../../layouts/content/ContentStudioLayout';
import { Layers, Plus, Sparkles } from 'lucide-react';

export const CollectionsPage: React.FC = () => {
  const decks = [
    { id: '1', title: 'کارت‌های گفتگو: عمیق و صمیمانه', cardsCount: 12, category: 'زوج‌ها' },
    { id: '2', title: 'کارت‌های گفتگو: خاطره‌بازی تهران', cardsCount: 10, category: 'دوستانه' },
  ];

  return (
    <ContentStudioLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-emerald-900/60 pb-3">
          <div>
            <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
              مجموعه‌های کارت و سوالات گفتگوی پای میز
            </h1>
            <p className="text-xs text-emerald-300/70">طراحی دسته کارت‌های سوال جهت سرگرمی و تعامل عمیق مهمانان</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {decks?.map((deck) => (
            <div key={deck.id} className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="bg-[#1b4332] text-[#d4af37] font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                  {deck.category}
                </span>
                <span className="font-mono text-emerald-400">{deck.cardsCount} کارت</span>
              </div>
              <h3 className="font-bold text-emerald-100 text-sm">{deck.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </ContentStudioLayout>
  );
};
