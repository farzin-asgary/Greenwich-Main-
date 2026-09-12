import React from 'react';
import { Table, QRCodeModel } from '../../../shared/types';
import { QrCode } from 'lucide-react';

interface Props {
  table: Table;
  qr?: QRCodeModel;
  onView: () => void;
}

export const TableQrCard: React.FC<Props> = ({ table, qr, onView }) => {
  return (
    <div className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 space-y-4">
      <div className="flex justify-between items-center border-b border-emerald-900/40 pb-3">
        <span className="font-bold text-sm text-[#d4af37]">{table.display_name}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded border ${
          qr?.status === 'active' 
            ? 'bg-emerald-950 text-emerald-300 border-emerald-800' 
            : 'bg-red-950/30 text-red-400 border-red-900/50'
        }`}>
          {qr?.status === 'active' ? 'QR فعال' : 'غیرفعال'}
        </span>
      </div>
      
      <div className="flex items-center gap-2 text-[11px] text-emerald-400/80">
        <span>آخرین اسکن:</span>
        <span className="font-medium text-emerald-300 dir-ltr">
          {qr?.last_scanned_at ? new Date(qr.last_scanned_at).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }) : 'بدون اسکن'}
        </span>
      </div>

      <div className="pt-2">
        <button
          onClick={onView}
          disabled={!qr}
          className="w-full text-xs font-bold text-[#d4af37] bg-[#0b1312] border border-[#d4af37]/40 px-4 py-2 rounded-xl hover:bg-[#121e1c] transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>QR</span>
        </button>
      </div>
    </div>
  );
};
