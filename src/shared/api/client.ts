/**
 * Greenwich Club Typed API Client
 * Wraps backend endpoints with asynchronous simulated network calls and contract response schemas.
 */

import { mockEngine } from './mockEngine';
import {
  QREntryContext,
  VisitSession,
  ConsentRecord,
  ContentItem,
  QuestionDeck,
  Offer,
  Coupon,
  GuestFeedback,
  CustomerProfile,
  DashboardSummary,
  Publication,
  PublicationSection,
  ReadingProgress,
  LibraryItem
} from '../types';

const delay = (ms: number = 200) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Public Entry
  async getQREntry(qrToken: string): Promise<{ data: QREntryContext }> {
    await delay();
    const data = mockEngine.getQREntry(qrToken);
    if (!data) throw new Error('کد QR معتبر نیست یا منقضی شده است.');
    return { data };
  },

  // Auth
  async requestOTP(phone: string, qrToken: string) {
    await delay(300);
    return mockEngine.requestOTP(phone, qrToken);
  },

  async verifyOTP(phone: string, code: string, qrToken: string): Promise<{ data: VisitSession }> {
    await delay(350);
    const data = mockEngine.verifyOTP(phone, code, qrToken);
    return { data };
  },

  async updateConsent(consents: Partial<ConsentRecord>): Promise<{ data: ConsentRecord }> {
    await delay(150);
    const data = mockEngine.updateConsent(consents);
    return { data };
  },

  // Session
  async getGuestSession(): Promise<{ data: VisitSession | null }> {
    await delay(100);
    const data = mockEngine.getGuestSession();
    return { data };
  },

  async endGuestSession(): Promise<{ success: boolean }> {
    await delay(150);
    const success = mockEngine.endGuestSession();
    return { success };
  },

  // Content
  async getContentList(category?: string, mood?: string, search?: string): Promise<{ data: ContentItem[] }> {
    await delay(200);
    const data = mockEngine.getContentList(category, mood, search);
    return { data };
  },

  async getContentBySlug(slug: string): Promise<{ data: ContentItem }> {
    await delay(200);
    const data = mockEngine.getContentBySlug(slug);
    if (!data) throw new Error('محتوای مورد نظر یافت نشد.');
    return { data };
  },

  async getTogetherDeck(): Promise<{ data: QuestionDeck }> {
    await delay(150);
    const data = mockEngine.getTogetherDeck();
    return { data };
  },

  // ---- Reading System V1 ----
  async getPublications(): Promise<{ data: Publication[] }> {
    await delay(200);
    const data = mockEngine.getPublications();
    return { data };
  },

  async getPublicationBySlug(slug: string): Promise<{ data: Publication }> {
    await delay(200);
    const data = mockEngine.getPublicationBySlug(slug);
    if (!data) throw new Error('محتوای مورد نظر یافت نشد.');
    return { data };
  },

  async getPublicationSections(publicationId: string): Promise<{ data: PublicationSection[] }> {
    await delay(200);
    const data = mockEngine.getPublicationSections(publicationId);
    return { data };
  },

  async getReadingProgress(publicationId: string): Promise<{ data: ReadingProgress | null }> {
    await delay(150);
    const data = mockEngine.getReadingProgress(publicationId);
    return { data };
  },

  async saveReadingProgress(publicationId: string, locator: any, progress_percent: number): Promise<{ data: ReadingProgress }> {
    await delay(150);
    const data = mockEngine.saveReadingProgress(publicationId, locator, progress_percent);
    return { data };
  },

  async getLibraryItems(): Promise<{ data: LibraryItem[] }> {
    await delay(150);
    const data = mockEngine.getLibraryItems();
    return { data };
  },

  async toggleFavorite(publicationId: string): Promise<{ success: boolean }> {
    await delay(150);
    mockEngine.toggleFavorite(publicationId);
    return { success: true };
  },

  // Offers
  async getOffers(): Promise<{ data: Offer[] }> {
    await delay(200);
    const data = mockEngine.getOffers();
    return { data };
  },

  async claimOffer(offerId: string): Promise<{ data: Coupon }> {
    await delay(350);
    const data = mockEngine.claimOffer(offerId);
    return { data };
  },

  async redeemCoupon(code: string, staffPin: string): Promise<{ success: boolean; message: string; coupon: Coupon }> {
    await delay(400);
    return mockEngine.redeemCoupon(code, staffPin);
  },

  // Feedback
  async submitFeedback(rating: number, comment: string, tags: string[]): Promise<{ data: GuestFeedback }> {
    await delay(250);
    const data = mockEngine.submitFeedback(rating, comment, tags);
    return { data };
  },

  // ---- Catalog & People V1 APIs ----
  async getCatalogBooks() {
    await delay(300);
    return { data: mockEngine.getCatalogBooks() };
  },
  
  async getBookWorkBySlug(slug: string) {
    await delay(300);
    return { data: mockEngine.getBookWorkBySlug(slug) };
  },
  
  async getBookEditions(workId: string) {
    await delay(300);
    return { data: mockEngine.getBookEditions(workId) };
  },
  
  async getPeople() {
    await delay(300);
    return { data: mockEngine.getPeople() };
  },
  
  async getPersonBySlug(slug: string) {
    await delay(300);
    return { data: mockEngine.getPersonBySlug(slug) };
  },
  
  async getWorkContributors(workId: string) {
    await delay(100);
    return { data: mockEngine.getWorkContributors(workId) };
  },
  
  async getEditionContributors(editionId: string) {
    await delay(100);
    return { data: mockEngine.getEditionContributors(editionId) };
  },
  
  async getCategories() {
    await delay(300);
    return { data: mockEngine.getCategories() };
  },
  
  async getCollections() {
    await delay(300);
    return { data: mockEngine.getCollections() };
  },
  
  async getPurchaseLinks(editionId: string) {
    await delay(200);
    return { data: mockEngine.getPurchaseLinks(editionId) };
  },
  
  async getRetailer(retailerId: string) {
    await delay(100);
    return { data: mockEngine.getRetailer(retailerId) };
  },

  // Analytics Event
  async recordEvent(eventName: string, objectType?: string, objectId?: string, metadata?: Record<string, unknown>) {
    return mockEngine.recordEvent(eventName, objectType, objectId, metadata);
  },

  // Cafe Dashboard
  async getDashboardSummary(): Promise<{ data: DashboardSummary }> {
    await delay(250);
    const data = mockEngine.getDashboardSummary();
    return { data };
  },

  async getDashboardCustomers(): Promise<{ data: CustomerProfile[] }> {
    await delay(200);
    const data = mockEngine.getDashboardCustomers();
    return { data };
  },

  async getDashboardVisits(): Promise<{ data: VisitSession[] }> {
    await delay(200);
    const data = mockEngine.getDashboardVisits();
    return { data };
  },

  async getDashboardOffers(): Promise<{ data: Offer[] }> {
    await delay(200);
    const data = mockEngine.getDashboardOffers();
    return { data };
  },

  async createDashboardOffer(data: Omit<Offer, 'id' | 'claimedCount' | 'redeemedCount'>): Promise<{ data: Offer }> {
    await delay(300);
    const res = mockEngine.createDashboardOffer(data);
    return { data: res };
  },

  async getDashboardFeedback(): Promise<{ data: GuestFeedback[] }> {
    await delay(200);
    const data = mockEngine.getDashboardFeedback();
    return { data };
  }
};
