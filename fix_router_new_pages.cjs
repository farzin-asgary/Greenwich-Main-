const fs = require('fs');
let code = fs.readFileSync('src/app/router/AppRouter.tsx', 'utf8');

const importMarker = "import { TermsPage } from '../../features/marketing/TermsPage';";
if (!code.includes('FAQPage')) {
  const newImport = "import { TermsPage } from '../../features/marketing/TermsPage';\nimport { DataRetentionPage } from '../../features/marketing/DataRetentionPage';\nimport { FAQPage } from '../../features/marketing/FAQPage';";
  code = code.replace(importMarker, newImport);
}

const routeMarker = '<Route path="/terms" element={<TermsPage />} />';
if (!code.includes('/faq')) {
  const newRoute = '<Route path="/terms" element={<TermsPage />} />\n          <Route path="/legal/data-retention" element={<DataRetentionPage />} />\n          <Route path="/faq" element={<FAQPage />} />';
  code = code.replace(routeMarker, newRoute);
}

fs.writeFileSync('src/app/router/AppRouter.tsx', code);
