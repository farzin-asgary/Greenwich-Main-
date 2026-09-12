const fs = require('fs');
let code = fs.readFileSync('src/features/cafe-dashboard/qr/QrManager.tsx', 'utf8');

const importBulkDownload = "import { BulkQrDownload } from './BulkQrDownload';";
if (!code.includes('BulkQrDownload')) {
  code = code.replace("import { BulkQrGenerator } from './BulkQrGenerator';", "import { BulkQrGenerator } from './BulkQrGenerator';\n" + importBulkDownload);
}

// Add BulkQrDownload next to BulkQrGenerator trigger
const buttonsBlock = `          <Button variant="secondary" size="sm" onClick={() => setShowBulk(true)}>
            ساخت چند میز
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            افزودن میز
          </Button>`;

const newButtonsBlock = `          <BulkQrDownload tables={tables} qrs={qrs} branchQr={branchQr} />
          <Button variant="secondary" size="sm" onClick={() => setShowBulk(true)}>
            ساخت چند میز
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            افزودن میز
          </Button>`;

code = code.replace(buttonsBlock, newButtonsBlock);

fs.writeFileSync('src/features/cafe-dashboard/qr/QrManager.tsx', code);
