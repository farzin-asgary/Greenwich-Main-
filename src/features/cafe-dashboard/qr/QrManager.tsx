import React, { useState } from 'react';
import { Table, QRCodeModel } from '../../../shared/types';
import { QrCode, Plus } from 'lucide-react';
import { TableQrCard } from './TableQrCard';
import { BranchQrCard } from './BranchQrCard';
import { BulkQrGenerator } from './BulkQrGenerator';
import { BulkQrDownload } from './BulkQrDownload';
import { QrDetailDialog } from './QrDetailDialog';
import { Button } from '../../../shared/ui/Button';

// Mock initial data
const MOCK_BRANCH_QR: QRCodeModel = {
  id: 'qr-b-1',
  public_id: 'pub-qr-b-1',
  organization_id: 'org-1',
  branch_id: 'br-1',
  entry_type: 'branch',
  token: 'branch-naderi-jomhouri',
  status: 'active',
  label: 'QR عمومی شعبه',
  created_at: new Date().toISOString(),
};

const MOCK_TABLES: Table[] = [
  { id: 't1', branch_id: 'br-1', name: '۱۲', display_name: 'میز ۱۲', status: 'active', created_at: new Date().toISOString() },
  { id: 't2', branch_id: 'br-1', name: '۵', display_name: 'میز ۵ (تراس)', status: 'active', created_at: new Date().toISOString() },
];

const MOCK_QRS: Record<string, QRCodeModel> = {
  't1': { id: 'qr-t-1', public_id: 'pub-qr-t-1', organization_id: 'org-1', branch_id: 'br-1', table_id: 't1', entry_type: 'table', token: 'demo-table-12', status: 'active', label: 'میز ۱۲', created_at: new Date().toISOString() },
  't2': { id: 'qr-t-2', public_id: 'pub-qr-t-2', organization_id: 'org-1', branch_id: 'br-1', table_id: 't2', entry_type: 'table', token: 'demo-table-05', status: 'active', label: 'میز ۵ (تراس)', created_at: new Date().toISOString() },
};

export const QrManager: React.FC = () => {
  const [tables, setTables] = useState<Table[]>(MOCK_TABLES);
  const [qrs, setQrs] = useState<Record<string, QRCodeModel>>(MOCK_QRS);
  const [branchQr, setBranchQr] = useState<QRCodeModel>(MOCK_BRANCH_QR);

  const [selectedQr, setSelectedQr] = useState<QRCodeModel | null>(null);
  const [showBulk, setShowBulk] = useState(false);

  const handleRotateQr = (qrId: string, tableId?: string) => {
    const newToken = `token-${Math.random().toString(36).substring(2, 10)}`;
    if (tableId) {
      setQrs(prev => ({
        ...prev,
        [tableId]: { ...prev[tableId], token: newToken, rotated_at: new Date().toISOString() }
      }));
      if (selectedQr && selectedQr.id === qrId) {
        setSelectedQr({ ...qrs[tableId], token: newToken, rotated_at: new Date().toISOString() });
      }
    } else {
      setBranchQr(prev => ({ ...prev, token: newToken, rotated_at: new Date().toISOString() }));
      if (selectedQr && selectedQr.id === qrId) {
        setSelectedQr({ ...branchQr, token: newToken, rotated_at: new Date().toISOString() });
      }
    }
  };

  const handleRevokeQr = (qrId: string, tableId?: string) => {
    if (tableId) {
      setQrs(prev => ({
        ...prev,
        [tableId]: { ...prev[tableId], status: 'revoked', revoked_at: new Date().toISOString() }
      }));
      if (selectedQr && selectedQr.id === qrId) {
        setSelectedQr({ ...qrs[tableId], status: 'revoked', revoked_at: new Date().toISOString() });
      }
    } else {
      setBranchQr(prev => ({ ...prev, status: 'revoked', revoked_at: new Date().toISOString() }));
      if (selectedQr && selectedQr.id === qrId) {
        setSelectedQr({ ...branchQr, status: 'revoked', revoked_at: new Date().toISOString() });
      }
    }
  };

  const handleBulkGenerate = (from: number, to: number) => {
    const newTables: Table[] = [];
    const newQrs: Record<string, QRCodeModel> = { ...qrs };

    for (let i = from; i <= to; i++) {
      const id = `t-bulk-${i}`;
      const name = `${i}`;
      newTables.push({
        id,
        branch_id: 'br-1',
        name,
        display_name: `میز ${i}`,
        status: 'active',
        created_at: new Date().toISOString(),
      });
      newQrs[id] = {
        id: `qr-bulk-${i}`,
        public_id: `pub-qr-bulk-${i}`,
        organization_id: 'org-1',
        branch_id: 'br-1',
        table_id: id,
        entry_type: 'table',
        token: `token-table-${i}-${Math.random().toString(36).substring(2, 8)}`,
        status: 'active',
        label: `میز ${i}`,
        created_at: new Date().toISOString(),
      };
    }

    setTables(prev => [...prev, ...newTables]);
    setQrs(newQrs);
    setShowBulk(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-emerald-100 flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#d4af37]" />
            میزها و QR
          </h2>
          <p className="text-xs text-emerald-300/70">
            میزهای شعبه و QRهای ورودی را مدیریت کنید.
          </p>
        </div>
        <div className="flex gap-2">
          <BulkQrDownload tables={tables} qrs={qrs} branchQr={branchQr} />
          <Button variant="secondary" size="sm" onClick={() => setShowBulk(true)}>
            ساخت چند میز
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            افزودن میز
          </Button>
        </div>
      </div>

      {showBulk && (
        <BulkQrGenerator onGenerate={handleBulkGenerate} onCancel={() => setShowBulk(false)} />
      )}

      {/* Branch QR Section */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold text-[#d4af37]">QR عمومی شعبه</h3>
        <BranchQrCard qr={branchQr} onView={() => setSelectedQr(branchQr)} />
      </section>

      {/* Tables List */}
      <section className="space-y-3 pt-4">
        <h3 className="text-sm font-bold text-[#d4af37]">میزهای شعبه</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tables.map(table => (
            <TableQrCard
              key={table.id}
              table={table}
              qr={qrs[table.id]}
              onView={() => setSelectedQr(qrs[table.id])}
            />
          ))}
        </div>
      </section>

      {selectedQr && (
        <QrDetailDialog
          qr={selectedQr}
          table={selectedQr.table_id ? tables.find(t => t.id === selectedQr.table_id) : undefined}
          isOpen={!!selectedQr}
          onClose={() => setSelectedQr(null)}
          onRotate={() => handleRotateQr(selectedQr.id, selectedQr.table_id)}
          onRevoke={() => handleRevokeQr(selectedQr.id, selectedQr.table_id)}
        />
      )}
    </div>
  );
};
