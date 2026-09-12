import React, { useRef, useState } from 'react';
import { QRCodeModel, Table } from '../../../shared/types';
import { QRCodeSVG } from 'qrcode.react';
import { X, ExternalLink, Download, Printer, RefreshCw, Ban } from 'lucide-react';

interface Props {
  qr: QRCodeModel;
  table?: Table;
  isOpen: boolean;
  onClose: () => void;
  onRotate: () => void;
  onRevoke: () => void;
}

export const QrDetailDialog: React.FC<Props> = ({ qr, table, isOpen, onClose, onRotate, onRevoke }) => {
  const qrRef = useRef<SVGSVGElement>(null);
  const entryUrl = `${window.location.origin}/g/${qr.token}`;
  
  const [showRotateConfirm, setShowRotateConfirm] = useState(false);

  if (!isOpen) return null;

  const downloadSVG = () => {
    if (!qrRef.current) return;
    const svgData = new XMLSerializer().serializeToString(qrRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `greenwich-${qr.branch_id}-${qr.entry_type}-${qr.table_id || 'general'}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleTestLink = () => {
    window.open(entryUrl, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(entryUrl);
    alert('لینک کپی شد!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1312]/80 backdrop-blur-sm">
      <div className="bg-[#121e1c] border border-emerald-900/60 rounded-3xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto greenwich-card relative">
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 text-emerald-400 hover:text-emerald-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1 mb-6">
          <h3 className="text-[#d4af37] font-bold text-lg">کافه نادری</h3>
          <p className="text-emerald-300 text-sm">شعبه جمهوری</p>
          <p className="text-emerald-100 font-bold">{table ? table.display_name : 'QR عمومی شعبه'}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl mx-auto w-fit flex flex-col items-center justify-center mb-6">
          <QRCodeSVG 
            id={`qr-svg-${qr.id}`}
            value={entryUrl}
            size={200}
            level="H"
            includeMargin={true}
            ref={qrRef}
            fgColor="#0b1312"
            bgColor="#ffffff"
          />
        </div>

        <div className="space-y-4">
          <div className="bg-[#0b1312] p-3 rounded-xl border border-emerald-900/50 flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-emerald-500">وضعیت:</span>
              <span className={`font-bold ${qr.status === 'active' ? 'text-emerald-400' : 'text-red-400'}`}>
                {qr.status === 'active' ? 'فعال' : 'غیرفعال'}
              </span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-emerald-500">لینک ورود:</span>
              <code className="text-[#d4af37] dir-ltr truncate max-w-[200px]">{entryUrl}</code>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button onClick={downloadSVG} className="py-2.5 bg-[#1b4332] text-emerald-100 rounded-xl text-xs font-bold hover:bg-[#2d6a4f] transition-colors flex justify-center items-center gap-1">
              <Download className="w-4 h-4" /> SVG
            </button>
            <button onClick={handleCopy} className="py-2.5 bg-[#1b4332] text-emerald-100 rounded-xl text-xs font-bold hover:bg-[#2d6a4f] transition-colors flex justify-center items-center gap-1">
               کپی لینک
            </button>
          </div>

          <button onClick={handleTestLink} className="w-full py-2.5 border border-[#d4af37]/40 text-[#d4af37] rounded-xl text-xs font-bold hover:bg-[#d4af37]/10 transition-colors flex justify-center items-center gap-1">
            <ExternalLink className="w-4 h-4" /> تست لینک
          </button>

          <div className="border-t border-emerald-900/40 pt-4 flex gap-2">
            {showRotateConfirm ? (
              <div className="w-full bg-[#0b1312] p-3 rounded-xl border border-amber-900/40 space-y-3">
                <p className="text-xs text-amber-200 text-center leading-relaxed">
                  QR فعلی دیگر برای ورود جدید معتبر نخواهد بود. QR جدید ساخته می‌شود.
                </p>
                <div className="flex gap-2">
                  <button onClick={() => setShowRotateConfirm(false)} className="flex-1 py-2 text-xs text-emerald-300">انصراف</button>
                  <button onClick={() => { onRotate(); setShowRotateConfirm(false); }} className="flex-1 py-2 bg-amber-900/40 text-amber-300 font-bold rounded-lg text-xs">تعویض QR</button>
                </div>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => setShowRotateConfirm(true)}
                  disabled={qr.status !== 'active'}
                  className="flex-1 py-2 bg-[#0b1312] border border-amber-900/40 text-amber-400 rounded-xl text-[11px] font-bold hover:bg-amber-950/20 transition-colors flex justify-center items-center gap-1 disabled:opacity-50"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> تعویض QR
                </button>
                <button 
                  onClick={onRevoke}
                  disabled={qr.status !== 'active'}
                  className="flex-1 py-2 bg-[#0b1312] border border-red-900/40 text-red-400 rounded-xl text-[11px] font-bold hover:bg-red-950/20 transition-colors flex justify-center items-center gap-1 disabled:opacity-50"
                >
                  <Ban className="w-3.5 h-3.5" /> غیرفعال کردن
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
