import React, { useState } from 'react';
import { Table, QRCodeModel } from '../../../shared/types';
import { Button } from '../../../shared/ui/Button';
import { Download, FileArchive, Printer } from 'lucide-react';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { QRCodeSVG } from 'qrcode.react';
import { renderToString } from 'react-dom/server';

interface Props {
  tables: Table[];
  qrs: Record<string, QRCodeModel>;
  branchQr: QRCodeModel;
}

export const BulkQrDownload: React.FC<Props> = ({ tables, qrs, branchQr }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateZip = async () => {
    setIsGenerating(true);
    const zip = new JSZip();

    const generateSvgString = (value: string) => {
      const svgElement = <QRCodeSVG value={value} size={250} level="H" includeMargin={true} fgColor="#0b1312" bgColor="#ffffff" />;
      return renderToString(svgElement);
    };

    // Add Branch QR
    zip.file(`branch-general.svg`, generateSvgString(`${window.location.origin}/g/${branchQr.token}`));

    // Add Table QRs
    tables.forEach(table => {
      const qr = qrs[table.id];
      if (qr && qr.status === 'active') {
        const svgStr = generateSvgString(`${window.location.origin}/g/${qr.token}`);
        zip.file(`table-${table.name}.svg`, svgStr);
      }
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'greenwich-qr-codes.zip');
    setIsGenerating(false);
  };

  const generatePDF = () => {
    setIsGenerating(true);
    const doc = new jsPDF('p', 'mm', 'a4');
    
    // Simplistic representation, real implementation would convert SVG to Canvas to add to PDF, 
    // or use jsPDF's SVG capabilities. For this prototype, we'll draw text indicating where QRs go
    // and instruct the owner. Wait, jsPDF addSvgAsImage works if we use Canvg.
    // Let's keep it simple: we can generate a basic printable HTML window.
    
    setIsGenerating(false);
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    let html = `
      <html>
        <head>
          <title>Print QRs</title>
          <style>
            body { font-family: sans-serif; display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; padding: 20px; background: #fbf9f5; }
            .card { width: 300px; padding: 20px; border: 2px solid #2d6a4f; border-radius: 12px; text-align: center; background: white; margin-bottom: 20px; page-break-inside: avoid; }
            .card h1 { color: #d4af37; font-size: 24px; margin: 0 0 10px 0; }
            .card h2 { color: #1b4332; font-size: 18px; margin: 0 0 20px 0; }
            .card img { max-width: 100%; height: auto; }
            .footer { margin-top: 15px; font-size: 12px; color: #2d6a4f; }
            @media print { body { background: white; } .card { border: 1px solid #ccc; } }
          </style>
        </head>
        <body>
    `;

    const getSvgDataUrl = (value: string) => {
      const svgStr = renderToString(<QRCodeSVG value={value} size={250} level="H" includeMargin={true} fgColor="#0b1312" bgColor="#ffffff" xmlns="http://www.w3.org/2000/svg" />);
      return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgStr)));
    };

    // Add branch
    html += `
      <div class="card">
        <h1>Greenwich Club</h1>
        <h2>QR عمومی شعبه</h2>
        <img src="${getSvgDataUrl(`${window.location.origin}/g/${branchQr.token}`)}" />
        <div class="footer">اسکن کنید برای ورود</div>
      </div>
    `;

    // Add tables
    tables.forEach(table => {
      const qr = qrs[table.id];
      if (qr && qr.status === 'active') {
        html += `
          <div class="card">
            <h1>Greenwich Club</h1>
            <h2>${table.display_name}</h2>
            <img src="${getSvgDataUrl(`${window.location.origin}/g/${qr.token}`)}" />
            <div class="footer">اسکن کنید برای ورود</div>
          </div>
        `;
      }
    });

    html += `
        <script>
          setTimeout(() => { window.print(); }, 500);
        </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div className="flex gap-2">
      <Button 
        variant="secondary" 
        size="sm" 
        leftIcon={<FileArchive className="w-4 h-4" />}
        onClick={generateZip}
        disabled={isGenerating}
      >
        دانلود فایل‌های ZIP
      </Button>
      <Button 
        variant="secondary" 
        size="sm" 
        leftIcon={<Printer className="w-4 h-4" />}
        onClick={generatePDF}
        disabled={isGenerating}
      >
        چاپ همه کارت‌ها
      </Button>
    </div>
  );
};
