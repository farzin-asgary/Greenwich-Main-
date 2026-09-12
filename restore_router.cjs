const fs = require('fs');
let code = fs.readFileSync('src/app/router/AppRouter.tsx', 'utf8');

// Restore imports
const importsToRestore = `
// Guest App
import { GuestHomePage } from '../../features/guest-home/GuestHomePage';
import { TogetherDeckPage } from '../../features/together/TogetherDeckPage';
import { OffersPage } from '../../features/offer-claim/OffersPage';
import { FeedbackPage } from '../../features/customer/FeedbackPage';
import { SessionExpiredPage } from '../../features/customer/SessionExpiredPage';

// Customer Panel
import { CustomerHomePage } from '../../features/customer/CustomerHomePage';
import { CustomerVisitsPage } from '../../features/customer/CustomerVisitsPage';
import { CustomerOffersPage } from '../../features/customer/CustomerOffersPage';
import { CustomerProfilePage } from '../../features/customer/CustomerProfilePage';
import { CustomerPrivacyPage } from '../../features/customer/CustomerPrivacyPage';

import { MyLibraryPage } from '../../features/reader/MyLibraryPage';
import { LibraryFavoritesPage } from '../../features/reader/LibraryFavoritesPage';
import { LibraryCompletedPage } from '../../features/reader/LibraryCompletedPage';
`;

code = code.replace(/import \{ CustomerHomePage \} from '\.\.\/\.\.\/features\/customer\/pages\/CustomerHomePage';/, importsToRestore);
code = code.replace(/import \{ CustomerDiscoverPage \} from '\.\.\/\.\.\/features\/customer\/pages\/CustomerDiscoverPage';/, '');
code = code.replace(/import \{ CustomerCafePage \} from '\.\.\/\.\.\/features\/customer\/pages\/CustomerCafePage';/, '');
code = code.replace(/import \{ CustomerLibraryPage \} from '\.\.\/\.\.\/features\/customer\/pages\/CustomerLibraryPage';/, '');
code = code.replace(/import \{ CustomerProfilePage \} from '\.\.\/\.\.\/features\/customer\/pages\/CustomerProfilePage';/, '');
code = code.replace(/import \{ CustomerLayout \} from '\.\.\/\.\.\/layouts\/customer\/CustomerLayout';/, '');

// Replace routes
const routesToRestore = `
          {/* Guest App & Library Hub */}
          <Route path="/app/home" element={<GuestHomePage />} />
          <Route path="/app/discover" element={<GuestHomePage />} />
          <Route path="/app/together" element={<TogetherDeckPage />} />
          <Route path="/app/offers" element={<OffersPage />} />
          <Route path="/app/feedback" element={<FeedbackPage />} />
          <Route path="/app/session-expired" element={<SessionExpiredPage />} />

          {/* Reading System V1 */}
          <Route path="/app/library" element={<MyLibraryPage />} />
          <Route path="/app/library/favorites" element={<LibraryFavoritesPage />} />
          <Route path="/app/library/completed" element={<LibraryCompletedPage />} />
`;

code = code.replace(/\{\/\* Unified Customer App V1 \*\/\}[\s\S]*?(?=\{\/\* Reader \(Immersive, outside CustomerLayout\) \*\/})/m, routesToRestore);

const customerPanelToRestore = `
          {/* Customer / User Panel */}
          <Route path="/panel/user" element={<Navigate to="/panel/user/home" replace />} />
          <Route path="/panel/user/home" element={<CustomerHomePage />} />
          <Route path="/panel/user/visits" element={<CustomerVisitsPage />} />
          <Route path="/panel/user/saved" element={<Navigate to="/app/library/favorites" replace />} />
          <Route path="/panel/user/offers" element={<CustomerOffersPage />} />
          <Route path="/panel/user/profile" element={<CustomerProfilePage />} />
          <Route path="/panel/user/privacy" element={<CustomerPrivacyPage />} />
`;

code = code.replace(/\{\/\* Customer \/ User Panel \(Deprecated - Redirect to App\) \*\/\}[\s\S]*?(?=\{\/\* Content Writer Studio \*\/})/m, customerPanelToRestore);

fs.writeFileSync('src/app/router/AppRouter.tsx', code);
