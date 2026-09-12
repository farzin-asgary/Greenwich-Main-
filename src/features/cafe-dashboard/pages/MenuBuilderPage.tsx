import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button';
import { ArrowRight, Plus, GripVertical, Settings, Eye, Trash2, Edit } from 'lucide-react';

export const MenuBuilderPage: React.FC = () => {
  const { menuId } = useParams();
  const navigate = useNavigate();
  
  const [sections, setSections] = useState([
    { id: 's1', name: 'اسپرسو بار', items: [
      { id: 'i1', name: 'اسپرسو سینگل', price: 65000 },
      { id: 'i2', name: 'لاته', price: 95000 },
      { id: 'i3', name: 'آمریکانو', price: 75000 },
    ]},
    { id: 's2', name: 'قهوه‌های دمی', items: [
      { id: 'i4', name: 'V60', price: 120000 },
      { id: 'i5', name: 'کمکس', price: 130000 },
    ]},
  ]);

  const [activeSectionId, setActiveSectionId] = useState('s1');

  const activeSection = sections.find(s => s.id === activeSectionId);

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/menu')}>
            <ArrowRight className="w-5 h-5 text-emerald-300" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
              {menuId === 'new' ? 'منوی جدید' : 'ویرایش منوی اصلی کافه'}
            </h1>
            <p className="text-xs text-emerald-300/70 font-mono mt-1">
              مدیریت دسته‌بندی‌ها و آیتم‌ها
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="md" leftIcon={<Eye className="w-4 h-4" />}>
            پیش‌نمایش
          </Button>
          <Button variant="primary" size="md">
            ذخیره منو
          </Button>
        </div>
      </div>

      {/* Builder Workspace */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        {/* Sections Column */}
        <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-emerald-200">بخش‌های منو (Sections)</h2>
            <Button variant="tertiary" size="sm" leftIcon={<Plus className="w-3 h-3" />}>افزودن</Button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {sections.map(section => (
              <div 
                key={section.id}
                onClick={() => setActiveSectionId(section.id)}
                className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${
                  activeSectionId === section.id 
                    ? 'bg-[#1b4332] border-emerald-700' 
                    : 'bg-[#121e1c] border-emerald-900/40 hover:border-emerald-800'
                }`}
              >
                <GripVertical className="w-4 h-4 text-emerald-700 cursor-move shrink-0" />
                <span className={`font-bold text-sm truncate flex-1 ${activeSectionId === section.id ? 'text-emerald-50' : 'text-emerald-200'}`}>
                  {section.name}
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full">
                  {section.items.length}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Items Column */}
        <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col bg-[#121e1c] border border-emerald-900/60 rounded-2xl overflow-hidden">
          {activeSection ? (
            <>
              <div className="p-4 border-b border-emerald-900/60 flex justify-between items-center bg-[#152421]">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-emerald-100">{activeSection.name}</h2>
                  <Button variant="ghost" size="icon" className="h-6 w-6"><Edit className="w-3 h-3" /></Button>
                </div>
                <Button variant="secondary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                  افزودن آیتم به این بخش
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {activeSection.items.length > 0 ? (
                  activeSection.items.map(item => (
                    <div key={item.id} className="bg-[#0b1312] border border-emerald-900/40 rounded-xl p-3 flex items-center justify-between group hover:border-emerald-700 transition-colors">
                      <div className="flex items-center gap-3">
                        <GripVertical className="w-4 h-4 text-emerald-800 cursor-move" />
                        <div>
                          <div className="font-bold text-emerald-100 text-sm">{item.name}</div>
                          <div className="text-xs text-emerald-400 mt-0.5 font-mono">{(item.price).toLocaleString('fa-IR')} تومان</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="tertiary" size="sm" onClick={() => navigate(`/dashboard/menu/items/${item.id}`)}>
                          ویرایش آیتم
                        </Button>
                        <Button variant="danger" size="icon">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-emerald-500/70 space-y-2">
                    <p>این بخش خالی است.</p>
                    <Button variant="tertiary" size="sm">افزودن اولین آیتم</Button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-emerald-500">
              یک بخش را از لیست انتخاب کنید.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
