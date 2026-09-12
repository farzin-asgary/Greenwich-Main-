import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { GuestHomePage } from '../../features/guest-home/GuestHomePage';
import { OffersPage } from '../../features/offer-claim/OffersPage';
import { CustomerHomePage } from '../../features/customer/CustomerHomePage';
import { CustomerVisitsPage } from '../../features/customer/CustomerVisitsPage';
import { CustomerOffersPage } from '../../features/customer/CustomerOffersPage';
import { CustomerProfilePage } from '../../features/customer/CustomerProfilePage';
import { CustomerPrivacyPage } from '../../features/customer/CustomerPrivacyPage';
import { AuthProvider } from '../auth/AuthContext';
import { RequireRole } from '../auth/RouteGuards';

// Marketing / Public pages
import { LandingPage } from '../../features/marketing/LandingPage';
import { FeaturesPage } from '../../features/marketing/FeaturesPage';
import { PricingPage } from '../../features/marketing/PricingPage';
import { ForCafesPage } from '../../features/marketing/ForCafesPage';
import { AboutPage } from '../../features/marketing/AboutPage';
import { BlogPage } from '../../features/marketing/BlogPage';
import { ContactPage } from '../../features/marketing/ContactPage';
import { LoginPage } from '../../features/marketing/LoginPage';
import { PrivacyPage } from '../../features/marketing/PrivacyPage';
import { TermsPage } from '../../features/marketing/TermsPage';

// Guest QR Flow Pages
import { QRLandingPage } from '../../features/guest-entry/QRLandingPage';
import { PhoneAuthPage } from '../../features/otp-auth/PhoneAuthPage';
import { OTPVerifyPage } from '../../features/otp-auth/OTPVerifyPage';
import { ConsentPage } from '../../features/consent/ConsentPage';



import { TogetherDeckPage } from '../../features/together-deck/TogetherDeckPage';
import { StaffPage } from '../../features/cafe-dashboard/pages/StaffPage';
import { SettingsPage } from '../../features/cafe-dashboard/pages/SettingsPage';
import { FeedbackPage } from '../../features/guest-feedback/FeedbackPage';
import { SessionExpiredPage } from '../../features/visit-session/SessionExpiredPage';

// Reading System V1 Pages
import { MyLibraryPage } from '../../features/reading/library/MyLibraryPage';
import { LibraryFavoritesPage } from '../../features/reading/favorites/LibraryFavoritesPage';
import { LibraryCompletedPage } from '../../features/reading/completed/LibraryCompletedPage';
import { PublicationDetailPage } from '../../features/reading/publication-detail/PublicationDetailPage';
import { PublicationReaderPage } from '../../features/reading/readers/PublicationReaderPage';

// Catalog Pages
import { CatalogBookListPage } from '../../features/catalog/book-list/CatalogBookListPage';
import { CatalogBookDetailPage } from '../../features/catalog/book-detail/CatalogBookDetailPage';
import { CatalogCategoryPage } from '../../features/catalog/categories/CatalogCategoryPage';
import { CatalogCollectionPage } from '../../features/catalog/collections/CatalogCollectionPage';
import { CatalogPersonProfilePage } from '../../features/people/person-profile/CatalogPersonProfilePage';

// Cafe Dashboard
import { DashboardLayout } from '../../features/cafe-dashboard/DashboardLayout';
import { OverviewPage } from '../../features/cafe-dashboard/pages/OverviewPage';
import { MenuHomePage } from '../../features/cafe-dashboard/pages/MenuHomePage';
import { MenuCreatePage } from '../../features/cafe-dashboard/pages/MenuCreatePage';
import { TablesPage } from '../../features/cafe-dashboard/pages/TablesPage';
import { RedeemPage } from '../../features/cafe-dashboard/pages/RedeemPage';
import { OffersHomePage } from '../../features/cafe-dashboard/pages/OffersHomePage';
import { CustomersListPage } from '../../features/cafe-dashboard/pages/CustomersListPage';
import { MenuBuilderPage } from '../../features/cafe-dashboard/pages/MenuBuilderPage';
import { ItemLibraryPage } from '../../features/cafe-dashboard/pages/ItemLibraryPage';
import { BranchesPage } from '../../features/cafe-dashboard/pages/BranchesPage';
import { BranchDetailPage } from '../../features/cafe-dashboard/pages/BranchDetailPage';
import { CafeProfilePage } from '../../features/cafe-dashboard/pages/CafeProfilePage';









// Content Writer Panel
import { WriterDashboardPage } from '../../features/content-studio/WriterDashboardPage';
import { PublicationsListPage } from '../../features/content-studio/publications/PublicationsListPage';
import { PublicationEditorPage } from '../../features/content-studio/editor/PublicationEditorPage';
import { ChapterManagerPage } from '../../features/content-studio/chapter-manager/ChapterManagerPage';
import { CollectionsPage } from '../../features/content-studio/CollectionsPage';
import { MediaPage } from '../../features/content-studio/MediaPage';
import { WriterProfilePage } from '../../features/content-studio/WriterProfilePage';

// Platform Admin Panel
import { AdminOverviewPage } from '../../features/admin/AdminOverviewPage';
import { AdminOrganizationsPage } from '../../features/admin/AdminOrganizationsPage';
import { AdminBranchesPage } from '../../features/admin/AdminBranchesPage';
import { AdminUsersPage } from '../../features/admin/AdminUsersPage';
import { AdminGuestsPage } from '../../features/admin/AdminGuestsPage';
import { AdminContentPage } from '../../features/admin/AdminContentPage';
import { AdminActivityPage } from '../../features/admin/AdminActivityPage';
import { AdminSupportPage } from '../../features/admin/AdminSupportPage';
import { AdminSettingsPage } from '../../features/admin/AdminSettingsPage';

export const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Marketing Site */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/for-cafes" element={<ForCafesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Entry QR Landing & Table Guest Experience */}
          <Route path="/g/:qrToken" element={<QRLandingPage />} />
          <Route path="/auth/phone" element={<PhoneAuthPage />} />
          <Route path="/auth/verify" element={<OTPVerifyPage />} />
          <Route path="/auth/consent" element={<ConsentPage />} />

          
          
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
{/* Reader (Immersive, outside CustomerLayout) */}
          <Route path="/app/publications/:slug" element={<PublicationDetailPage />} />
          <Route path="/app/read/:publicationId" element={<PublicationReaderPage />} />
          <Route path="/app/read/:publicationId/:sectionId" element={<PublicationReaderPage />} />

          {/* Catalog & People */}
          <Route path="/app/books" element={<CatalogBookListPage />} />
          <Route path="/app/books/:slug" element={<CatalogBookDetailPage />} />
          <Route path="/app/people/:slug" element={<CatalogPersonProfilePage />} />
          <Route path="/app/categories/:slug" element={<CatalogCategoryPage />} />
          <Route path="/app/collections/:slug" element={<CatalogCollectionPage />} />

          
          
          {/* Customer / User Panel */}
          <Route path="/panel/user" element={<Navigate to="/panel/user/home" replace />} />
          <Route path="/panel/user/home" element={<CustomerHomePage />} />
          <Route path="/panel/user/visits" element={<CustomerVisitsPage />} />
          <Route path="/panel/user/saved" element={<Navigate to="/app/library/favorites" replace />} />
          <Route path="/panel/user/offers" element={<CustomerOffersPage />} />
          <Route path="/panel/user/profile" element={<CustomerProfilePage />} />
          <Route path="/panel/user/privacy" element={<CustomerPrivacyPage />} />
{/* Content Writer Studio */}
          <Route path="/content-studio" element={<Navigate to="/content-studio/dashboard" replace />} />
          <Route path="/content-studio/dashboard" element={<WriterDashboardPage />} />
          <Route path="/content-studio/publications" element={<PublicationsListPage />} />
          <Route path="/content-studio/publications/new" element={<PublicationEditorPage />} />
          <Route path="/content-studio/publications/:id" element={<PublicationEditorPage />} />
          <Route path="/content-studio/publications/:id/chapters" element={<ChapterManagerPage />} />
          <Route path="/content-studio/collections" element={<CollectionsPage />} />
          <Route path="/content-studio/media" element={<MediaPage />} />
          <Route path="/content-studio/profile" element={<WriterProfilePage />} />

          {/* Café Management Dashboard */}
                    {/* Café Management Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<OverviewPage />} />
            {/* Stubs for future pages */}
            <Route path="setup" element={<div className="p-8 text-emerald-300">Setup Page</div>} />
            <Route path="cafe" element={<CafeProfilePage />} />
            <Route path="branches" element={<BranchesPage />} />
            <Route path="branches/:branchId" element={<BranchDetailPage />} />
            <Route path="menu" element={<MenuHomePage />} />
            <Route path="menu/new" element={<MenuCreatePage />} />
            <Route path="menu/:menuId" element={<MenuBuilderPage />} />
            <Route path="menu/items" element={<ItemLibraryPage />} />
            <Route path="customers" element={<CustomersListPage />} />
            <Route path="customers/:customerId" element={<div className="p-8 text-emerald-300">Customer Detail Page</div>} />
            <Route path="visits" element={<div className="p-8 text-emerald-300">Visits List</div>} />
            <Route path="offers" element={<OffersHomePage />} />
            <Route path="offers/new" element={<div className="p-8 text-emerald-300">Offer Wizard</div>} />
            <Route path="offers/:offerId" element={<div className="p-8 text-emerald-300">Offer Detail</div>} />
            <Route path="redeem" element={<RedeemPage />} />
            <Route path="tables" element={<TablesPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="staff" element={<StaffPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Platform Super Admin Panel */}
          <Route path="/admin-panel" element={<Navigate to="/admin-panel/overview" replace />} />
          <Route path="/admin-panel/overview" element={<AdminOverviewPage />} />
          <Route path="/admin-panel/organizations" element={<AdminOrganizationsPage />} />
          <Route path="/admin-panel/branches" element={<AdminBranchesPage />} />
          <Route path="/admin-panel/users" element={<AdminUsersPage />} />
          <Route path="/admin-panel/guests" element={<AdminGuestsPage />} />
          <Route path="/admin-panel/content" element={<AdminContentPage />} />
          <Route path="/admin-panel/activity" element={<AdminActivityPage />} />
          <Route path="/admin-panel/support" element={<AdminSupportPage />} />
          <Route path="/admin-panel/settings" element={<AdminSettingsPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
