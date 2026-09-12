import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button';
import { Plus, MapPin, QrCode, Store, Settings, ChevronLeft } from 'lucide-react';

export const BranchesPage: React.FC = () => {
  const navigate = useNavigate();
  
  const mockBranches = [
    {
      id: 'br-001',
      name: 'شعبه جمهوری',
      address: 'خیابان جمهوری، روبروی سفارت',
      status: 'active',
      tables: 24,
      menu: 'منوی اصلی',
      activeQRs: 18
    },
    {
      id: 'br-002',
      name: 'شعبه ولیعصر',
      address: 'خیابان ولیعصر، بالاتر از پارک وی',
      status: 'active',
      tables: 15,
      menu: 'منوی ولیعصر (مختصر)',
      activeQRs: 15
    },
    {
      id: 'br-003',
      name: 'شعبه انقلاب (در حال تجهیز)',
      address: 'میدان انقلاب، ابتدای کارگر شمالی',
      status: 'inactive',
      tables: 0,
      menu: '-',
      activeQRs: 0
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            شعب کافه
          </h1>
          <p className="text-xs text-emerald-300/70">
            مدیریت اطلاعات، منو و میزهای هر شعبه
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="w-4 h-4" />}
        >
          شعبه جدید
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBranches.map(branch => (
          <div 
            key={branch.id}
            className={`greenwich-card rounded-2xl p-5 border transition-colors cursor-pointer group ${
              branch.status === 'active' 
                ? 'border-emerald-900/60 hover:border-emerald-700' 
                : 'border-zinc-800/60 opacity-80'
            }`}
            onClick={() => navigate(`/dashboard/branches/${branch.id}`)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                  branch.status === 'active' 
                    ? 'bg-emerald-950/60 border-emerald-800 text-emerald-400'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                }`}>
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-100 text-sm">{branch.name}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full inline-flex mt-1 ${
                    branch.status === 'active' ? 'bg-emerald-900 text-emerald-300' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {branch.status === 'active' ? 'فعال' : 'غیرفعال'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2 text-xs text-emerald-200">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{branch.address}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-emerald-900/40 pt-4 mb-4">
              <div className="text-center">
                <span className="block text-[10px] text-emerald-400/70 mb-1">میزها</span>
                <span className="font-bold text-emerald-100 text-sm font-mono">{branch.tables}</span>
              </div>
              <div className="text-center border-r border-emerald-900/40">
                <span className="block text-[10px] text-emerald-400/70 mb-1">QR فعال</span>
                <span className="font-bold text-[#d4af37] text-sm font-mono">{branch.activeQRs}</span>
              </div>
              <div className="text-center border-r border-emerald-900/40">
                <span className="block text-[10px] text-emerald-400/70 mb-1">وضعیت منو</span>
                <span className="font-bold text-emerald-100 text-xs truncate block px-1">{branch.menu}</span>
              </div>
            </div>

            <Button 
              variant="tertiary" 
              className="w-full justify-between opacity-0 group-hover:opacity-100 transition-opacity"
              size="sm"
              rightIcon={<ChevronLeft className="w-4 h-4" />}
            >
              مدیریت شعبه
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
