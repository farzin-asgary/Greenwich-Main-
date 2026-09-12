import React from 'react';
import { QRCodeModel } from '../../../shared/types';
import { QrCode, MoreHorizontal } from 'lucide-react';

interface Props {
  qr: QRCodeModel;
  onView: () => void;
}

export const BranchQrCard: React.FC<Props> = ({ qr, onView }) => {
  return (
    <div className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-[#121e1c] p-3 rounded-xl border border-emerald-800">
          <QrCode className="w-6 h-6 text-[#d4af37]" />
        </div>
        <div>
          <h4 className="font-bold text-emerald-100 text-sm">{qr.label}</h4>
          <span className={`text-[10px] px-2 py-0.5 rounded border inline-block mt-1 ${
            qr.status === 'active' 
              ? 'bg-emerald-950 text-emerald-300 border-emerald-800' 
              : 'bg-red-950/30 text-red-400 border-red-900/50'
          }`}>
            {qr.status === 'active' ? 'ACTIVE' : 'REVOKED'}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onView}
          className="text-xs font-bold text-[#d4af37] bg-[#0b1312] border border-[#d4af37]/40 px-4 py-2 rounded-xl hover:bg-[#121e1c] transition-colors"
        >
          مشاهده QR
        </button>
      </div>
    </div>
  );
};
