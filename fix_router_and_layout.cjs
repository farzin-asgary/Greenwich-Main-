const fs = require('fs');

// 1. Update PublicLayout
let layoutCode = fs.readFileSync('src/layouts/public/PublicLayout.tsx', 'utf8');
const oldNav = "    { path: '/for-cafes', label: 'ویژه کافه‌ها' },";
const newNav = "    { path: '/for-cafes', label: 'ویژه کافه‌ها' },\n    { path: '/interactive-personas', label: 'پرسوناهای روایی' },";
layoutCode = layoutCode.replace(oldNav, newNav);
fs.writeFileSync('src/layouts/public/PublicLayout.tsx', layoutCode);

// 2. Update AppRouter
let routerCode = fs.readFileSync('src/app/router/AppRouter.tsx', 'utf8');

// Add import
const importMarker = "import { TermsPage } from '../../features/marketing/TermsPage';";
const newImport = "import { TermsPage } from '../../features/marketing/TermsPage';\nimport { InteractivePersonasPage } from '../../features/marketing/InteractivePersonasPage';";
routerCode = routerCode.replace(importMarker, newImport);

// Add Route
const routeMarker = '<Route path="/terms" element={<TermsPage />} />';
const newRoute = '<Route path="/terms" element={<TermsPage />} />\n          <Route path="/interactive-personas" element={<InteractivePersonasPage />} />\n          <Route path="/auth" element={<Navigate to="/login" replace />} />';
routerCode = routerCode.replace(routeMarker, newRoute);

// Add alias routes
const aliasMarker = '{/* Fallback */}';
const newAliases = `{/* Aliases requested by architecture */}
          <Route path="/app/cafe-panel/*" element={<Navigate to="/dashboard" replace />} />
          <Route path="/app/writers-studio/*" element={<Navigate to="/content-studio/dashboard" replace />} />
          <Route path="/app/admin/*" element={<Navigate to="/admin-panel/overview" replace />} />
          
          {/* Fallback */}`;
routerCode = routerCode.replace(aliasMarker, newAliases);

fs.writeFileSync('src/app/router/AppRouter.tsx', routerCode);

