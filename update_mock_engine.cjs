const fs = require('fs');
let code = fs.readFileSync('src/shared/api/mockEngine.ts', 'utf8');

const targetFunction = `  getQREntry(qrToken: string) {
    return state.qrEntries[qrToken] || null;
  }`;

const replacement = `  getQREntry(qrToken: string) {
    if (state.qrEntries[qrToken]) {
      return state.qrEntries[qrToken];
    }
    // Fallback for dynamically generated QRs in the demo
    return {
      qrToken: qrToken,
      tableNumber: qrToken.split('-').pop() || 'جدید',
      tableName: 'میز ' + (qrToken.split('-').pop() || 'جدید'),
      branchId: 'br-naderi-01',
      branchName: 'کافه نادری (شعبه جمهوری)',
      organizationId: 'org-greenwich-01',
      organizationName: 'مجموعه گرینویچ کلاب',
      status: 'active',
      sessionDurationMinutes: 120,
      coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop'
    };
  }`;

code = code.replace(targetFunction, replacement);
fs.writeFileSync('src/shared/api/mockEngine.ts', code);
