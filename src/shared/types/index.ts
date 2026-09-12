/**
 * Greenwich Club Domain Models & Shared TypeScript Interfaces
 */

export type QRStatus = 'active' | 'disabled' | 'rotated' | 'revoked';

export interface QREntryContext {
  qrToken: string;
  tableNumber: string;
  tableName: string;
  branchId: string;
  branchName: string;
  organizationId: string;
  organizationName: string;
  status: QRStatus;
  sessionDurationMinutes: number;
  coverImage?: string;
  welcomeMessage?: string;
}

export type VisitSessionStatus = 'pending_auth' | 'active' | 'ended' | 'expired' | 'revoked';

export interface VisitSession {
  sessionId: string;
  qrToken: string;
  tableNumber: string;
  branchId: string;
  branchName: string;
  organizationName: string;
  guestPhone: string;
  guestName?: string;
  startedAt: string; // ISO String
  expiresAt: string; // ISO String
  status: VisitSessionStatus;
  lastActivityAt: string;
}

export interface ConsentRecord {
  termsAccepted: boolean;
  visitHistoryConsented: boolean;
  personalizationConsented: boolean;
  cafeMarketingConsented: boolean;
  greenwichMarketingConsented: boolean;
  updatedAt: string;
}

export type ContentType = 'article' | 'audio' | 'podcast' | 'together_deck';

// ---- PUBLICATION DOMAIN (Reading System V1) ----

export type PublicationType = 'ARTICLE' | 'BOOK_SUMMARY' | 'BOOK';
export type ReaderFormat = 'NATIVE_STRUCTURED' | 'PDF' | 'EPUB';
export type PublicationStatus = 'DRAFT' | 'IN_REVIEW' | 'PUBLISHED' | 'ARCHIVED';
export type AccessType = 'PUBLIC' | 'CAFE_SESSION' | 'MEMBERSHIP' | 'PURCHASE' | 'PROMOTION' | 'PUBLISHER_GRANT';

export interface Publication {
  id: string;
  public_id?: string;
  slug: string;
  
  title: string;
  subtitle?: string;
  description: string;
  
  publication_type: PublicationType;
  reader_format: ReaderFormat;
  language?: string;
  
  cover_asset_id?: string;
  cover_image?: string; // Fallback or computed URL
  
  estimated_reading_minutes?: number;
  estimated_word_count?: number;
  
  status: PublicationStatus;
  visibility?: string;
  access_type?: AccessType;
  
  related_work_id?: string;
  source_edition_id?: string;
  
  created_by?: string;
  reviewed_by?: string;
  published_by?: string;
  
  // Publisher metadata
  publisher_name?: string;
  original_title?: string;
  isbn?: string;
  publication_year?: number;
  edition?: string;
  source_url?: string;
  
  // Fallbacks for UI if Contributors aren't fully joined yet
  author?: string; 
  translator?: string;
  
  published_at?: string;
  archived_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Contributor {
  id: string;
  public_id?: string;
  display_name: string;
  bio?: string;
  image_url?: string;
}

export interface PublicationContributor {
  id: string;
  publication_id: string;
  contributor_id: string;
  role: 'AUTHOR' | 'TRANSLATOR' | 'EDITOR' | 'COMPILER' | 'NARRATOR';
  order: number;
}

export type SectionType = 'INTRODUCTION' | 'CHAPTER' | 'SECTION' | 'CONCLUSION' | 'APPENDIX';

export interface PublicationSection {
  id: string;
  public_id?: string;
  publication_id: string;
  parent_section_id?: string;
  
  title: string;
  slug?: string;
  section_type: SectionType;
  order: number;
  
  estimated_reading_minutes?: number;
  
  document?: StructuredDocument;
  
  created_at: string;
  updated_at: string;
}

// ---- STRUCTURED DOCUMENT ----

export interface StructuredDocument {
  schemaVersion: number;
  type: 'document';
  blocks: DocumentBlock[];
}

export type DocumentBlock = 
  | ParagraphBlock 
  | HeadingBlock 
  | QuoteBlock 
  | ImageBlock 
  | DividerBlock 
  | CalloutBlock;

export interface InlineText {
  type: 'text';
  text: string;
  marks?: ('bold' | 'italic' | 'link')[];
  url?: string; // If 'link' is in marks
}

export interface ParagraphBlock {
  id: string;
  type: 'paragraph';
  content: InlineText[];
}

export interface HeadingBlock {
  id: string;
  type: 'heading';
  level: 2 | 3;
  content: InlineText[];
}

export interface QuoteBlock {
  id: string;
  type: 'quote';
  content: InlineText[];
  attribution?: string;
}

export interface ImageBlock {
  id: string;
  type: 'image';
  assetId: string;
  alt?: string;
  caption?: string;
}

export interface DividerBlock {
  id: string;
  type: 'divider';
}

export interface CalloutBlock {
  id: string;
  type: 'callout';
  variant: 'note' | 'important' | 'context';
  title?: string;
  content: InlineText[];
}

// ---- PUBLICATION ASSETS ----

export type AssetType = 'COVER_IMAGE' | 'CONTENT_IMAGE' | 'PDF' | 'AUDIO';

export interface PublicationAsset {
  id: string;
  public_id?: string;
  publication_id: string;
  asset_type: AssetType;
  
  file_url: string; // Resolves to bucket/storage
  mime_type: string;
  file_size: number;
  
  width?: number;
  height?: number;
  duration_seconds?: number;
  
  rights_status?: string;
  
  created_by?: string;
  created_at: string;
}

// ---- READING LOCATOR & PROGRESS ----

export type ReadingLocator = NativeLocator | PdfLocator | EpubLocator;

export interface NativeLocator {
  format: 'native';
  publicationId: string;
  sectionId?: string;
  blockId?: string;
  blockOffset?: number;
  sectionProgression?: number;
  totalProgression: number;
}

export interface PdfLocator {
  format: 'pdf';
  publicationId: string;
  pageNumber: number;
  pageProgression?: number;
  totalProgression: number;
}

export interface EpubLocator {
  format: 'epub';
  publicationId: string;
  href?: string;
  cfi?: string;
  totalProgression: number;
}

export interface ReadingProgress {
  id: string;
  public_id?: string;
  reader_identity: string; // Could be user_id or guest_session_id
  publication_id: string;
  
  locator_json: ReadingLocator;
  progress_percent: number;
  
  started_at: string;
  last_read_at: string;
  completed_at?: string;
  
  created_at: string;
  updated_at: string;
}

export interface LibraryItem {
  id: string;
  reader_identity: string;
  publication_id: string;
  is_favorite: boolean;
  favorited_at: string;
  created_at: string;
  updated_at: string;
}

// ---- CATALOG DOMAIN ----

export interface Person {
  id: string;
  public_id?: string;
  slug: string;
  display_name: string;
  native_name?: string;
  latin_name?: string;
  short_bio?: string;
  biography?: string;
  portrait_asset_id?: string;
  portrait_image_url?: string;
  birth_date?: string;
  death_date?: string;
  birth_place?: string;
  nationality?: string;
  website_url?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  created_at: string;
  updated_at: string;
}

export interface Publisher {
  id: string;
  public_id?: string;
  slug: string;
  name: string;
  latin_name?: string;
  description?: string;
  logo_url?: string;
  website_url?: string;
  country?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

export interface BookWork {
  id: string;
  public_id?: string;
  slug: string;
  title: string;
  original_title?: string;
  description?: string;
  original_language?: string;
  original_publication_year?: number;
  cover_image_url?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  created_at: string;
  updated_at: string;
}

export interface BookEdition {
  id: string;
  public_id?: string;
  work_id: string;
  title: string;
  subtitle?: string;
  language: string;
  publisher_id?: string;
  publication_year?: number;
  edition_number?: string;
  isbn10?: string;
  isbn13?: string;
  page_count?: number;
  binding_type?: string;
  format?: 'PAPERBACK' | 'HARDCOVER' | 'EBOOK' | 'AUDIOBOOK' | 'PDF' | 'OTHER';
  cover_image_url?: string;
  description_override?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  created_at: string;
  updated_at: string;
}

export type WorkContributorRole = 'AUTHOR' | 'CO_AUTHOR' | 'COMPILER';
export interface WorkContributor {
  id: string;
  work_id: string;
  person_id: string;
  role: WorkContributorRole;
  order: number;
}

export type EditionContributorRole = 'TRANSLATOR' | 'EDITOR' | 'ILLUSTRATOR' | 'PREFACE_AUTHOR' | 'ANNOTATOR' | 'NARRATOR';
export interface EditionContributor {
  id: string;
  edition_id: string;
  person_id: string;
  role: EditionContributorRole;
  order: number;
}

export interface Category {
  id: string;
  public_id?: string;
  slug: string;
  name: string;
  description?: string;
  parent_id?: string;
  image_url?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  sort_order: number;
}

export interface CuratedCollection {
  id: string;
  public_id?: string;
  slug: string;
  title: string;
  description?: string;
  cover_image_url?: string;
  curator?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  published_at?: string;
}

export interface CollectionItem {
  id: string;
  collection_id: string;
  work_id: string;
  position: number;
  editor_note?: string;
}

export interface Retailer {
  id: string;
  public_id?: string;
  slug: string;
  name: string;
  logo_url?: string;
  base_url?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface ExternalPurchaseLink {
  id: string;
  edition_id: string;
  retailer_id: string;
  url: string;
  region?: string;
  label?: string;
  affiliate_enabled: boolean;
  affiliate_campaign?: string;
  priority: number;
  is_active: boolean;
  last_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface PublicationRelatedWork {
  id: string;
  publication_id: string;
  work_id: string;
  relation_type: 'ABOUT' | 'REVIEW' | 'MENTION';
}

export interface PublicationRelatedPerson {
  id: string;
  publication_id: string;
  person_id: string;
  relation_type: 'ABOUT' | 'BY' | 'INTERVIEW' | 'REVIEW';
}

export interface BookWorkAlias {
  id: string;
  work_id: string;
  alias: string;
}

export interface PersonAlias {
  id: string;
  person_id: string;
  alias: string;
}


export interface ContentItem {
  id: string;
  slug: string;
  title: string;
  author: string;
  category: string;
  summary: string;
  body?: string;
  readTimeMinutes?: number;
  audioDurationMinutes?: number;
  audioUrl?: string;
  type: ContentType;
  coverImage: string;
  mood: 'relaxation' | 'focus' | 'inspiration' | 'romantic' | 'thinking' | 'excitement';
  publishedAt: string;
  viewsCount: number;
  likesCount: number;
  featured?: boolean;
}

export interface QuestionCard {
  id: string;
  question: string;
  category: 'romantic' | 'deep_talk' | 'fun' | 'memories';
}

export interface QuestionDeck {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  cards: QuestionCard[];
}

export type OfferStatus = 'draft' | 'active' | 'paused' | 'expired' | 'cancelled';
export type OfferType = 'percentage' | 'freebie' | 'fixed_amount';
export type OfferEligibility = 'all_guests' | 'first_visit' | 'returning_guest' | 'birthday_month';

export interface Offer {
  id: string;
  title: string;
  description: string;
  offerType: OfferType;
  valueDisplay: string; // e.g. "۲۰٪ تخفیف" or "یک فنجان اسپرسو رایگان"
  branchId: string;
  branchName: string;
  status: OfferStatus;
  eligibility: OfferEligibility;
  terms: string;
  maxRedemptions?: number;
  claimedCount: number;
  redeemedCount: number;
  startsAt: string;
  expiresAt: string;
}

export type CouponStatus = 'claimed' | 'redeemed' | 'expired' | 'cancelled';

export interface Coupon {
  code: string;
  offerId: string;
  offerTitle: string;
  offerValueDisplay: string;
  branchId: string;
  branchName: string;
  guestPhone: string;
  status: CouponStatus;
  claimedAt: string;
  redeemedAt?: string;
  expiresAt: string;
}

export interface ProductEvent {
  id: string;
  eventName: string;
  sessionId?: string;
  guestPhone?: string;
  branchId?: string;
  objectType?: string;
  objectId?: string;
  occurredAt: string;
  metadata?: Record<string, unknown>;
}

export interface GuestFeedback {
  id: string;
  guestPhone: string;
  tableNumber: string;
  rating: number; // 1-5
  comment: string;
  tags: string[];
  createdAt: string;
}

export interface CustomerProfile {
  id: string;
  phone: string;
  name?: string;
  totalVisits: number;
  firstVisitAt: string;
  lastVisitAt: string;
  favoriteMood?: string;
  consents: ConsentRecord;
  claimedCouponsCount: number;
  redeemedCouponsCount: number;
}

export interface DashboardSummary {
  activeVisitsCount: number;
  todayTotalGuests: number;
  offersClaimedToday: number;
  couponsRedeemedToday: number;
  avgVisitDurationMinutes: number;
  recentVisits: VisitSession[];
  recentEvents: ProductEvent[];
  topContent: ContentItem[];
}

// ---- CAFÉ QR ENTRY FOUNDATION ----

export type TableStatus = 'active' | 'inactive';

export interface Table {
  id: string;
  public_id?: string;
  branch_id: string;
  name: string; // e.g., '12' or 'تراس ۳'
  display_name: string;
  status: TableStatus;
  sort_order?: number;
  created_at: string;
  updated_at?: string;
}

export type EntryPointType = 'branch' | 'table';

export interface QRCodeModel {
  id: string;
  public_id: string;
  organization_id: string;
  branch_id: string;
  table_id?: string;
  entry_type: EntryPointType;
  token: string;
  status: QRStatus;
  label: string; // e.g., "میز ۱۲" or "QR عمومی شعبه"
  created_at: string;
  activated_at?: string;
  revoked_at?: string;
  rotated_at?: string;
  last_scanned_at?: string;
}
