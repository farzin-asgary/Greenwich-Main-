const fs = require('fs');
let code = fs.readFileSync('src/app/router/AppRouter.tsx', 'utf8');

const imports = `
import { GuestHomePage } from '../../features/guest-home/GuestHomePage';
import { OffersPage } from '../../features/offer-claim/OffersPage';
import { CustomerHomePage } from '../../features/customer/CustomerHomePage';
import { CustomerVisitsPage } from '../../features/customer/CustomerVisitsPage';
import { CustomerOffersPage } from '../../features/customer/CustomerOffersPage';
import { CustomerProfilePage } from '../../features/customer/CustomerProfilePage';
import { CustomerPrivacyPage } from '../../features/customer/CustomerPrivacyPage';
`;

code = code.replace(/import \{ AuthProvider \}/, imports + 'import { AuthProvider }');
fs.writeFileSync('src/app/router/AppRouter.tsx', code);
