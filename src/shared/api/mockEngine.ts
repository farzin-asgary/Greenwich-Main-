/**
 * Greenwich Club - Contract-Compliant In-Memory Mock Engine
 * Stores session, consents, offers, coupons, feedback, and events.
 */

import {
  QREntryContext,
  VisitSession,
  ConsentRecord,
  ContentItem,
  QuestionDeck,
  Offer,
  Coupon,
  ProductEvent,
  GuestFeedback,
  CustomerProfile,
  DashboardSummary,
  Publication,
  PublicationSection,
  ReadingProgress,
  LibraryItem,
  Person,
  Publisher,
  BookWork,
  BookEdition,
  WorkContributor,
  EditionContributor,
  Category,
  CuratedCollection,
  Retailer,
  ExternalPurchaseLink,
  CollectionItem
} from '../types';

const INITIAL_QR_ENTRIES: Record<string, QREntryContext> = {
  'demo-table-12': {
    qrToken: 'demo-table-12',
    tableNumber: '۱۲',
    tableName: 'میز ۱۲ (کنار پنجره)',
    branchId: 'br-naderi-01',
    branchName: 'کافه نادری (شعبه جمهوری)',
    organizationId: 'org-greenwich-01',
    organizationName: 'مجموعه گرینویچ کلاب',
    status: 'active',
    sessionDurationMinutes: 120,
    welcomeMessage: 'به کافه نادری خوش آمدید. لحظات خوشی را برای شما آرزومندیم.',
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop'
  },
  'demo-table-05': {
    qrToken: 'demo-table-05',
    tableNumber: '۵',
    tableName: 'میز ۵ (تراس)',
    branchId: 'br-naderi-01',
    branchName: 'کافه نادری (شعبه جمهوری)',
    organizationId: 'org-greenwich-01',
    organizationName: 'مجموعه گرینویچ کلاب',
    status: 'active',
    sessionDurationMinutes: 120,
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop'
  },
  'invalid-qr': {
    qrToken: 'invalid-qr',
    tableNumber: '0',
    tableName: 'نامعتبر',
    branchId: 'br-naderi-01',
    branchName: 'کافه نادری',
    organizationId: 'org-greenwich-01',
    organizationName: 'مجموعه گرینویچ کلاب',
    status: 'revoked',
    sessionDurationMinutes: 120
  }
};

const INITIAL_CONTENT: ContentItem[] = [
  {
    id: 'cnt-1',
    slug: 'boof-koor',
    title: 'کتاب بوف کور',
    author: 'صادق هدایت',
    category: 'داستان کوتاه',
    summary: 'داستانی اثرگذار و شاهکار ادبیات مدرن ایران درباره تنهایی، هویت و جستجوی معنا در دنیای گمشده...',
    body: `آن روز، در بازار قونیه، همه چیز بوی دیگری داشت. بوی ادویه‌ها، رنگ پارچه‌ها، صدای دوره‌گردها و فریاد کودکان در کوچه‌های تنگ، همه در هم آمیخته بود.
شمس، با ردایی کهنه و چشمانی که گویی از جهانی دیگر می‌نگریست، آرام قدم می‌زد. نه کسی او را می‌شناخت و نه او کسی را می‌جست.

مولانا، در آن هنگام، خطی در رساله‌ای می‌نوشت که ناگهان، بی‌دلیل، دلش لرزید. گویی دستی از درون، قلمش را متوقف کرد. در همان لحظه، شمس وارد شد. نگاه‌شان تلاقی کرد.

«دیر آمدی ای نور بی‌پایان...»
و جهان، برای مولانا، از همان لحظه، دیگر هرگز همان جهان پیشین نبود.

در بوف کور، هدایت با نثر آهنگین و تصاویر سوررئال خود، نقبی می‌زند به لایه‌های پنهان روان انسان. این داستان بازتابی است از دغدغه‌های عمیق فیلسوفانه درباره زندگی، مرگ و غربت روح آدمی.`,
    readTimeMinutes: 23,
    audioDurationMinutes: 15,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=piano-moment-114227.mp3',
    type: 'article',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop',
    mood: 'thinking',
    publishedAt: '2026-07-15T10:00:00Z',
    viewsCount: 12450,
    likesCount: 890,
    featured: true
  },
  {
    id: 'cnt-2',
    slug: 'dastan-yek-shahr',
    title: 'داستان یک شهر',
    author: 'جویس کارول اوتس',
    category: 'داستان کوتاه',
    summary: 'روایتی صمیمی و شاعرانه از لحظه‌های خلوت، صبر و مسیر دشوار خلق اثر ماندگار در دل شب‌های بیدار...',
    body: `شب در شهر آرام گرفته بود. چراغ‌های خیابان زیر باران ملایم می‌درخشیدند و صدای قدم‌های عابری تنها از دور به گوش می‌رسید.
کافه‌ای کوچک در گوشه خیابان هنوز روشن بود. عطر قهوه و بوی کاغذ کهنه فضای کافه را پر کرده بود.
در این داستان، نویسنده خاطرات سال‌های نوجوانی و آشنایی با کوی و برزن شهری قدیمی را مرور می‌کند...`,
    readTimeMinutes: 18,
    type: 'article',
    coverImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop',
    mood: 'relaxation',
    publishedAt: '2026-07-20T14:30:00Z',
    viewsCount: 8700,
    likesCount: 620,
    featured: true
  },
  {
    id: 'cnt-3',
    slug: 'se-porsesh',
    title: 'سه پرسش فلسفی بزرگ',
    author: 'لئو تولستوی',
    category: 'فلسفه و اندیشه',
    summary: 'مهم‌ترین زمان چه زمانی است؟ مهم‌ترین فرد کیست؟ و مهم‌ترین کاری که باید انجام داد چیست؟',
    body: `پادشاهی فکر می‌کرد اگر پاسخ سه پرسش را بداند، هرگز در هیچ کاری شکست نخواهد خورد:
۱. بهترین زمان برای شروع هر کار چیست؟
۲. مهم‌ترین افرادی که باید به آن‌ها گوش داد کیستند؟
۳. مهم‌ترین کاری که باید در هر لحظه انجام داد چیست؟

او پس از سفرها و گفتگو با دانشمندان گوناگون، سرانجام به دیداری زاهد در کوهستان رفت و دریافت که مهم‌ترین زمان «همین حالا» است...`,
    readTimeMinutes: 16,
    type: 'article',
    coverImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop',
    mood: 'inspiration',
    publishedAt: '2026-07-28T09:15:00Z',
    viewsCount: 6200,
    likesCount: 540
  },
  {
    id: 'cnt-4',
    slug: 'symphony-7-beethoven',
    title: 'سمفونی شماره ۷ بتهوون',
    author: 'بتهوون / ارکستر فیلارمونیک',
    category: 'موسیقی کلاسیک',
    summary: 'یکی از شاداب‌ترین و ریتمیک‌ترین شاهکارهای موسیقی کلاسیک جهانی مناسب برای تمرکز و آرامش ذهن.',
    audioDurationMinutes: 38,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73213.mp3?filename=orchestral-suite-10486.mp3',
    type: 'audio',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    mood: 'focus',
    publishedAt: '2026-08-01T12:00:00Z',
    viewsCount: 15400,
    likesCount: 1200,
    featured: true
  },
  {
    id: 'cnt-5',
    slug: 'radio-falsafeh-ep4',
    title: 'پادکست رادیو فلسفه - فصل ۲ اپیزود ۴',
    author: 'استودیو فلسفه و هنر',
    category: 'پادکست',
    summary: 'بررسی مفهوم زمان در اندیشه هایدگر و معنای حضور در لحظه حال پای یک استکان چای.',
    audioDurationMinutes: 32,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/25/audio_226b5e0220.mp3?filename=ambient-piano-documentary-124846.mp3',
    type: 'podcast',
    coverImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800&auto=format&fit=crop',
    mood: 'thinking',
    publishedAt: '2026-08-02T16:00:00Z',
    viewsCount: 9800,
    likesCount: 810
  },
  {
    id: 'cnt-6',
    slug: 'piano-relaxation-einaudi',
    title: 'پیانو آرامش‌بخش شبانه',
    author: 'لودویکو اینائودی',
    category: 'موسیقی بی‌کلام',
    summary: 'مجموعه‌ای از قطعات دلنشین پیانو برای کاهش استرس و لحظات آرامش‌بخش گفتگو در کافه.',
    audioDurationMinutes: 60,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=relaxing-piano-10269.mp3',
    type: 'audio',
    coverImage: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800&auto=format&fit=crop',
    mood: 'romantic',
    publishedAt: '2026-08-03T18:00:00Z',
    viewsCount: 18200,
    likesCount: 1500
  }
];

const INITIAL_OFFERS: Offer[] = [
  {
    id: 'off-1',
    title: '۲۰٪ تخفیف ویژه نوشیدنی‌های گرم',
    description: 'برای شما که دوستدار قهوه و چای در کافه نادری هستید. قابل استفاده برای تمامی نوشیدنی‌های منوی گرم.',
    offerType: 'percentage',
    valueDisplay: '۲۰٪ تخفیف',
    branchId: 'br-naderi-01',
    branchName: 'کافه نادری',
    status: 'active',
    eligibility: 'all_guests',
    terms: 'امکان استفاده یک‌بار در هر نشست. فقط برای سفارش حضوری پای میز.',
    maxRedemptions: 100,
    claimedCount: 34,
    redeemedCount: 22,
    startsAt: '2026-08-01T00:00:00Z',
    expiresAt: '2026-08-31T23:59:59Z'
  },
  {
    id: 'off-2',
    title: 'کیک روز رایگان با سفارش ۲ قهوه',
    description: 'با سفارش ۲ فنجان قهوه تخصصی، یک برش کیک هویج و گردوی تازه مهمان کافه باشید.',
    offerType: 'freebie',
    valueDisplay: 'کیک رایگان',
    branchId: 'br-naderi-01',
    branchName: 'کافه نادری',
    status: 'active',
    eligibility: 'returning_guest',
    terms: 'مخصوص مهمانان وفادار. اعتبار تا پایان هفته جاری.',
    maxRedemptions: 50,
    claimedCount: 18,
    redeemedCount: 12,
    startsAt: '2026-08-01T00:00:00Z',
    expiresAt: '2026-08-15T23:59:59Z'
  },
  {
    id: 'off-3',
    title: '۳۰٪ تخفیف خریدهای فرهنگی (کتاب و CD)',
    description: 'تخفیف ویژه روی محصولات فروشگاه کتاب و آلبوم‌های سنتی کافه نادری.',
    offerType: 'percentage',
    valueDisplay: '۳۰٪ تخفیف فرهنگی',
    branchId: 'br-naderi-01',
    branchName: 'کافه نادری',
    status: 'active',
    eligibility: 'first_visit',
    terms: 'ارائه کد به صندوق‌دار هنگام تسویه خرید فرهنگی.',
    maxRedemptions: 30,
    claimedCount: 8,
    redeemedCount: 5,
    startsAt: '2026-08-01T00:00:00Z',
    expiresAt: '2026-08-20T23:59:59Z'
  }
];

const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'GREENWICH-20-8912',
    offerId: 'off-1',
    offerTitle: '۲۰٪ تخفیف ویژه نوشیدنی‌های گرم',
    offerValueDisplay: '۲۰٪ تخفیف',
    branchId: 'br-naderi-01',
    branchName: 'کافه نادری',
    guestPhone: '09123456789',
    status: 'claimed',
    claimedAt: '2026-08-04T09:30:00Z',
    expiresAt: '2026-08-04T12:00:00Z'
  }
];

const INITIAL_CUSTOMERS: CustomerProfile[] = [
  {
    id: 'cust-1',
    phone: '09123456789',
    name: 'امیرحسین رضایی',
    totalVisits: 4,
    firstVisitAt: '2026-07-10T11:20:00Z',
    lastVisitAt: '2026-08-04T10:00:00Z',
    favoriteMood: 'thinking',
    consents: {
      termsAccepted: true,
      visitHistoryConsented: true,
      personalizationConsented: true,
      cafeMarketingConsented: true,
      greenwichMarketingConsented: false,
      updatedAt: '2026-08-04T10:00:00Z'
    },
    claimedCouponsCount: 3,
    redeemedCouponsCount: 2
  },
  {
    id: 'cust-2',
    phone: '09351112233',
    name: 'سارا محمدی',
    totalVisits: 2,
    firstVisitAt: '2026-07-25T15:10:00Z',
    lastVisitAt: '2026-08-03T18:45:00Z',
    favoriteMood: 'romantic',
    consents: {
      termsAccepted: true,
      visitHistoryConsented: true,
      personalizationConsented: true,
      cafeMarketingConsented: true,
      greenwichMarketingConsented: true,
      updatedAt: '2026-08-03T18:45:00Z'
    },
    claimedCouponsCount: 1,
    redeemedCouponsCount: 1
  }
];

const INITIAL_VISITS: VisitSession[] = [
  {
    sessionId: 'sess-active-12',
    qrToken: 'demo-table-12',
    tableNumber: '۱۲',
    branchId: 'br-naderi-01',
    branchName: 'کافه نادری',
    organizationName: 'گرینویچ کلاب',
    guestPhone: '09123456789',
    guestName: 'امیرحسین رضایی',
    startedAt: new Date(Date.now() - 38 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 82 * 60 * 1000).toISOString(),
    status: 'active',
    lastActivityAt: new Date().toISOString()
  },
  {
    sessionId: 'sess-active-05',
    qrToken: 'demo-table-05',
    tableNumber: '۵',
    branchId: 'br-naderi-01',
    branchName: 'کافه نادری',
    organizationName: 'گرینویچ کلاب',
    guestPhone: '09351112233',
    guestName: 'سارا محمدی',
    startedAt: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
    status: 'active',
    lastActivityAt: new Date().toISOString()
  }
];

const INITIAL_EVENTS: ProductEvent[] = [
  {
    id: 'evt-1',
    eventName: 'qr_scanned',
    sessionId: 'sess-active-12',
    guestPhone: '09123456789',
    branchId: 'br-naderi-01',
    objectType: 'qr_token',
    objectId: 'demo-table-12',
    occurredAt: new Date(Date.now() - 38 * 60 * 1000).toISOString()
  },
  {
    id: 'evt-2',
    eventName: 'content_opened',
    sessionId: 'sess-active-12',
    guestPhone: '09123456789',
    branchId: 'br-naderi-01',
    objectType: 'content',
    objectId: 'boof-koor',
    occurredAt: new Date(Date.now() - 20 * 60 * 1000).toISOString()
  }
];

const INITIAL_FEEDBACK: GuestFeedback[] = [
  {
    id: 'fb-1',
    guestPhone: '09123456789',
    tableNumber: '۱۲',
    rating: 5,
    comment: 'محیط بسیار آرام با موسیقی فوق‌العاده. پیشنهاد کتاب‌ها عالی بود.',
    tags: ['کیفیت قهوه', 'موسیقی عالی', 'برخورد پرسنل'],
    createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString()
  }
];

const INITIAL_PUBLICATIONS: Publication[] = [
  {
    id: 'pub-1',
    slug: 'boof-koor-book',
    title: 'بوف کور',
    author: 'صادق هدایت',
    description: 'داستانی اثرگذار و شاهکار ادبیات مدرن ایران درباره تنهایی، هویت و جستجوی معنا در دنیای گمشده...',
    publication_type: 'BOOK',
    reader_format: 'NATIVE_STRUCTURED',
    cover_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop',
    estimated_reading_minutes: 120,
    status: 'PUBLISHED',
    created_at: '2026-07-15T10:00:00Z',
    updated_at: '2026-07-15T10:00:00Z',
    published_at: '2026-07-15T10:00:00Z',
  },
  {
    id: 'pub-2',
    slug: 'dastan-yek-shahr-article',
    title: 'داستان یک شهر',
    author: 'جویس کارول اوتس',
    description: 'روایتی صمیمی و شاعرانه از لحظه‌های خلوت، صبر و مسیر دشوار خلق اثر ماندگار در دل شب‌های بیدار...',
    publication_type: 'ARTICLE',
    reader_format: 'NATIVE_STRUCTURED',
    cover_image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop',
    estimated_reading_minutes: 18,
    status: 'PUBLISHED',
    created_at: '2026-07-20T14:30:00Z',
    updated_at: '2026-07-20T14:30:00Z',
    published_at: '2026-07-20T14:30:00Z',
  },
  {
    id: 'pub-3',
    slug: 'philosophy-summary',
    title: 'خلاصه فلسفه وجودی',
    author: 'آلبر کامو',
    description: 'نگاهی گذرا به مفاهیم کلیدی فلسفه اگزیستانسیالیسم در آثار کامو.',
    publication_type: 'BOOK_SUMMARY',
    reader_format: 'NATIVE_STRUCTURED',
    cover_image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop',
    estimated_reading_minutes: 25,
    status: 'PUBLISHED',
    created_at: '2026-07-28T09:15:00Z',
    updated_at: '2026-07-28T09:15:00Z',
    published_at: '2026-07-28T09:15:00Z',
  }
];

const INITIAL_SECTIONS: PublicationSection[] = [
  {
    id: 'sec-1',
    publication_id: 'pub-1',
    title: 'فصل اول',
    order: 1,
    section_type: 'CHAPTER',
    document: {
      schemaVersion: 1,
      type: 'document',
      blocks: [
        { id: 'blk-1', type: 'paragraph', content: [{ type: 'text', text: 'در زندگی دردهایی هست که روح را منزوی می‌کند و در تنهایی می‌تراشد...' }] },
        { id: 'blk-2', type: 'paragraph', content: [{ type: 'text', text: 'من سعی خواهم کرد آنچه را که یادم هست بنویسم.' }] }
      ]
    },
    created_at: '2026-07-15T10:00:00Z',
    updated_at: '2026-07-15T10:00:00Z'
  },
  {
    id: 'sec-2',
    publication_id: 'pub-1',
    title: 'فصل دوم',
    order: 2,
    section_type: 'CHAPTER',
    document: {
      schemaVersion: 1,
      type: 'document',
      blocks: [
        { id: 'blk-3', type: 'paragraph', content: [{ type: 'text', text: 'اتاق من یک دخمه است...' }] },
        { id: 'blk-4', type: 'paragraph', content: [{ type: 'text', text: 'اینها همه برای من یک واقعیت محض است.' }] }
      ]
    },
    created_at: '2026-07-15T10:00:00Z',
    updated_at: '2026-07-15T10:00:00Z'
  },
  {
    id: 'sec-3',
    publication_id: 'pub-2',
    title: 'متن اصلی',
    order: 1,
    section_type: 'SECTION',
    document: {
      schemaVersion: 1,
      type: 'document',
      blocks: [
        { id: 'blk-5', type: 'paragraph', content: [{ type: 'text', text: 'شب در شهر آرام گرفته بود...' }] },
        { id: 'blk-6', type: 'paragraph', content: [{ type: 'text', text: 'کافه‌ای کوچک در گوشه خیابان هنوز روشن بود.' }] }
      ]
    },
    created_at: '2026-07-20T14:30:00Z',
    updated_at: '2026-07-20T14:30:00Z'
  }
];

const INITIAL_PEOPLE: Person[] = [
  {
    id: 'person-dostoevsky',
    slug: 'fyodor-dostoevsky',
    display_name: 'فئودور داستایفسکی',
    latin_name: 'Fyodor Dostoevsky',
    short_bio: 'نویسنده برجسته روس و خالق شاهکارهایی چون جنایت و مکافات و برادران کارامازوف.',
    biography: 'فئودور میخاییلوویچ داستایِفسکی نویسندهٔ مشهور و تأثیرگذار اهل روسیه بود. ویژگی منحصر به فرد آثار وی روانکاوی و بررسی زوایای روانی شخصیت‌های داستان است.',
    portrait_image_url: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Vasily_Perov_-_%D0%9F%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82_%D0%A4.%D0%9C.%D0%94%D0%BE%D1%81%D1%82%D0%BE%D0%B5%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_-_Google_Art_Project.jpg',
    nationality: 'Russian',
    birth_date: '1821-11-11',
    death_date: '1881-02-09',
    status: 'PUBLISHED',
    created_at: '2026-08-01T10:00:00Z',
    updated_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'person-ahmad-golshiri',
    slug: 'ahmad-golshiri',
    display_name: 'احمد گلشیری',
    short_bio: 'مترجم برجسته ایرانی.',
    status: 'PUBLISHED',
    created_at: '2026-08-01T10:00:00Z',
    updated_at: '2026-08-01T10:00:00Z'
  }
];

const INITIAL_PUBLISHERS: Publisher[] = [
  {
    id: 'pub-cheshmeh',
    slug: 'cheshmeh',
    name: 'نشر چشمه',
    status: 'PUBLISHED'
  },
  {
    id: 'pub-negah',
    slug: 'negah',
    name: 'انتشارات نگاه',
    status: 'PUBLISHED'
  }
];

const INITIAL_BOOK_WORKS: BookWork[] = [
  {
    id: 'work-crime-punishment',
    slug: 'crime-and-punishment',
    title: 'جنایت و مکافات',
    original_title: 'Преступление и наказание',
    original_language: 'Russian',
    original_publication_year: 1866,
    description: 'داستان دانشجویی به نام راسکولنیکف که به خاطر اصول خود مرتکب قتل می‌شود...',
    cover_image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop',
    status: 'PUBLISHED',
    created_at: '2026-08-01T10:00:00Z',
    updated_at: '2026-08-01T10:00:00Z'
  }
];

const INITIAL_BOOK_EDITIONS: BookEdition[] = [
  {
    id: 'edition-crime-negah',
    work_id: 'work-crime-punishment',
    title: 'جنایت و مکافات (ترجمه گلشیری)',
    language: 'Persian',
    publisher_id: 'pub-negah',
    publication_year: 1390,
    page_count: 776,
    format: 'PAPERBACK',
    status: 'PUBLISHED',
    created_at: '2026-08-01T10:00:00Z',
    updated_at: '2026-08-01T10:00:00Z'
  }
];

const INITIAL_WORK_CONTRIBUTORS: WorkContributor[] = [
  {
    id: 'wc-1',
    work_id: 'work-crime-punishment',
    person_id: 'person-dostoevsky',
    role: 'AUTHOR',
    order: 1
  }
];

const INITIAL_EDITION_CONTRIBUTORS: EditionContributor[] = [
  {
    id: 'ec-1',
    edition_id: 'edition-crime-negah',
    person_id: 'person-ahmad-golshiri',
    role: 'TRANSLATOR',
    order: 1
  }
];

const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-fiction',
    slug: 'fiction',
    name: 'ادبیات داستانی',
    status: 'PUBLISHED',
    sort_order: 1
  },
  {
    id: 'cat-russian-lit',
    slug: 'russian-literature',
    name: 'ادبیات روسیه',
    parent_id: 'cat-fiction',
    status: 'PUBLISHED',
    sort_order: 2
  }
];

const INITIAL_COLLECTIONS: CuratedCollection[] = [
  {
    id: 'col-russian-classics',
    slug: 'russian-classics',
    title: 'شاهکارهای ادبیات روسیه',
    description: 'مجموعه‌ای از برترین رمان‌های کلاسیک روسی',
    status: 'PUBLISHED'
  }
];

const INITIAL_RETAILERS: Retailer[] = [
  {
    id: 'retailer-iranketab',
    slug: 'iranketab',
    name: 'ایران‌کتاب',
    status: 'ACTIVE'
  }
];

const INITIAL_PURCHASE_LINKS: ExternalPurchaseLink[] = [
  {
    id: 'link-1',
    edition_id: 'edition-crime-negah',
    retailer_id: 'retailer-iranketab',
    url: 'https://iranketab.ir/book/123',
    affiliate_enabled: false,
    priority: 1,
    is_active: true,
    created_at: '2026-08-01T10:00:00Z',
    updated_at: '2026-08-01T10:00:00Z'
  }
];

// Helper to persist in localStorage
const STORAGE_KEY = 'greenwich_mock_state_v1';

function getStoredState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to load mock state', e);
  }
  return {
    qrEntries: INITIAL_QR_ENTRIES,
    content: INITIAL_CONTENT,
    offers: INITIAL_OFFERS,
    coupons: INITIAL_COUPONS,
    customers: INITIAL_CUSTOMERS,
    visits: INITIAL_VISITS,
    events: INITIAL_EVENTS,
    feedback: INITIAL_FEEDBACK,
    publications: INITIAL_PUBLICATIONS,
    sections: INITIAL_SECTIONS,
    progress: [] as ReadingProgress[],
    library: [] as LibraryItem[],
    
    people: INITIAL_PEOPLE,
    publishers: INITIAL_PUBLISHERS,
    bookWorks: INITIAL_BOOK_WORKS,
    bookEditions: INITIAL_BOOK_EDITIONS,
    workContributors: INITIAL_WORK_CONTRIBUTORS,
    editionContributors: INITIAL_EDITION_CONTRIBUTORS,
    categories: INITIAL_CATEGORIES,
    collections: INITIAL_COLLECTIONS,
    retailers: INITIAL_RETAILERS,
    purchaseLinks: INITIAL_PURCHASE_LINKS,
    
    activeSession: INITIAL_VISITS[0] as VisitSession | null,
    consents: {
      termsAccepted: true,
      visitHistoryConsented: true,
      personalizationConsented: true,
      cafeMarketingConsented: true,
      greenwichMarketingConsented: false,
      updatedAt: new Date().toISOString()
    } as ConsentRecord
  };
}

function saveState(state: any) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save mock state', e);
  }
}

let state = getStoredState();

export const mockEngine = {
  // Reset demo state
  resetState() {
    localStorage.removeItem(STORAGE_KEY);
    state = getStoredState();
    return state;
  },

  getQREntry(qrToken: string): QREntryContext | null {
    return state.qrEntries[qrToken] || {
      qrToken,
      tableNumber: '۱',
      tableName: `میز ${qrToken}`,
      branchId: 'br-naderi-01',
      branchName: 'کافه نادری',
      organizationId: 'org-greenwich-01',
      organizationName: 'گرینویچ کلاب',
      status: 'active',
      sessionDurationMinutes: 120,
      coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop'
    };
  },

  requestOTP(phone: string, qrToken: string) {
    if (!phone || !phone.match(/^09\d{9}$/)) {
      throw new Error('شماره همراه وارد شده معتبر نیست. مثال: 09123456789');
    }
    // Record event
    this.recordEvent('otp_requested', 'phone', phone);
    return {
      success: true,
      message: 'کد تایید ۵ رقمی به شماره شما پیامک شد (کد آزمایشی: 12345)',
      expiresInSeconds: 120
    };
  },

  verifyOTP(phone: string, code: string, qrToken: string) {
    if (code !== '12345' && code !== '00000') {
      throw new Error('کد تایید اشتباه است. لطفاً دوباره تلاش کنید.');
    }

    const qr = this.getQREntry(qrToken) || INITIAL_QR_ENTRIES['demo-table-12']!;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + qr.sessionDurationMinutes * 60 * 1000);

    const newSession: VisitSession = {
      sessionId: `sess-${Math.random().toString(36).substring(2, 9)}`,
      qrToken: qr.qrToken,
      tableNumber: qr.tableNumber,
      branchId: qr.branchId,
      branchName: qr.branchName,
      organizationName: qr.organizationName,
      guestPhone: phone,
      guestName: 'مهمان گرینویچ',
      startedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      status: 'active',
      lastActivityAt: now.toISOString()
    };

    state.activeSession = newSession;
    state.visits.unshift(newSession);

    // Update customer in CRM
    let existingCust = state.customers.find((c: CustomerProfile) => c.phone === phone);
    if (!existingCust) {
      existingCust = {
        id: `cust-${Math.random().toString(36).substring(2, 8)}`,
        phone,
        name: 'مهمان کافه',
        totalVisits: 1,
        firstVisitAt: now.toISOString(),
        lastVisitAt: now.toISOString(),
        consents: state.consents,
        claimedCouponsCount: 0,
        redeemedCouponsCount: 0
      };
      state.customers.push(existingCust);
    } else {
      existingCust.totalVisits += 1;
      existingCust.lastVisitAt = now.toISOString();
    }

    saveState(state);
    this.recordEvent('otp_verified', 'session', newSession.sessionId);
    this.recordEvent('session_started', 'session', newSession.sessionId);

    return newSession;
  },

  updateConsent(consents: Partial<ConsentRecord>) {
    state.consents = {
      ...state.consents,
      ...consents,
      updatedAt: new Date().toISOString()
    };
    saveState(state);
    this.recordEvent('consent_updated', 'consent', 'user_consent');
    return state.consents;
  },

  getGuestSession(): VisitSession | null {
    if (!state.activeSession) return null;
    const now = new Date().getTime();
    const exp = new Date(state.activeSession.expiresAt).getTime();
    if (now > exp) {
      state.activeSession.status = 'expired';
      saveState(state);
    }
    return state.activeSession;
  },

  endGuestSession() {
    if (state.activeSession) {
      state.activeSession.status = 'ended';
      this.recordEvent('session_ended', 'session', state.activeSession.sessionId);
      state.activeSession = null;
      saveState(state);
    }
    return true;
  },

  getContentList(category?: string, mood?: string, search?: string): ContentItem[] {
    let items = [...state.content];
    if (category && category !== 'all') {
      items = items.filter(c => c.category === category || c.type === category);
    }
    if (mood && mood !== 'all') {
      items = items.filter(c => c.mood === mood);
    }
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(c => c.title.toLowerCase().includes(q) || c.author.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q));
    }
    return items;
  },

  getContentBySlug(slug: string): ContentItem | null {
    const item = state.content.find((c: ContentItem) => c.slug === slug || c.id === slug);
    if (item) {
      item.viewsCount += 1;
      this.recordEvent('content_opened', 'content', item.id, { slug: item.slug, title: item.title });
      saveState(state);
    }
    return item || null;
  },

  // ---- Reading System V1 APIs ----
  getPublications(): Publication[] {
    return state.publications;
  },

  getPublicationBySlug(slug: string): Publication | null {
    const item = state.publications.find((p: Publication) => p.slug === slug || p.id === slug);
    return item || null;
  },

  getPublicationSections(publicationId: string): PublicationSection[] {
    return state.sections
      .filter((s: PublicationSection) => s.publication_id === publicationId)
      .sort((a: PublicationSection, b: PublicationSection) => a.order - b.order);
  },

  getReadingProgress(publicationId: string): ReadingProgress | null {
    return state.progress.find((p: ReadingProgress) => p.publication_id === publicationId) || null;
  },

  saveReadingProgress(publicationId: string, locator: any, progress_percent: number) {
    let p = state.progress.find((x: ReadingProgress) => x.publication_id === publicationId);
    if (p) {
      p.locator_json = locator;
      p.progress_percent = progress_percent;
      p.last_read_at = new Date().toISOString();
      if (progress_percent >= 1.0 && !p.completed_at) {
        p.completed_at = new Date().toISOString();
      }
    } else {
      p = {
        id: `prog-${Math.random().toString(36).substring(2,8)}`,
        reader_identity: state.activeSession?.guestPhone || 'anonymous',
        publication_id: publicationId,
        locator_json: locator,
        progress_percent,
        started_at: new Date().toISOString(),
        last_read_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      state.progress.push(p);
    }
    saveState(state);
    return p;
  },

  getLibraryItems(): LibraryItem[] {
    return state.library;
  },

  toggleFavorite(publicationId: string) {
    const idx = state.library.findIndex((i: LibraryItem) => i.publication_id === publicationId && i.is_favorite);
    if (idx >= 0) {
      state.library.splice(idx, 1);
    } else {
      state.library.push({
        id: `lib-${Math.random().toString(36).substring(2,8)}`,
        reader_identity: state.activeSession?.guestPhone || 'anonymous',
        publication_id: publicationId,
        is_favorite: true,
        favorited_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
    saveState(state);
  },

  // ---- Catalog & People V1 APIs ----
  getCatalogBooks(): BookWork[] {
    return state.bookWorks;
  },
  
  getBookWorkBySlug(slug: string): BookWork | null {
    return state.bookWorks.find((w: BookWork) => w.slug === slug || w.id === slug) || null;
  },
  
  getBookEditions(workId: string): BookEdition[] {
    return state.bookEditions.filter((e: BookEdition) => e.work_id === workId);
  },
  
  getPeople(): Person[] {
    return state.people;
  },
  
  getPersonBySlug(slug: string): Person | null {
    return state.people.find((p: Person) => p.slug === slug || p.id === slug) || null;
  },
  
  getWorkContributors(workId: string): WorkContributor[] {
    return state.workContributors.filter((wc: WorkContributor) => wc.work_id === workId);
  },
  
  getEditionContributors(editionId: string): EditionContributor[] {
    return state.editionContributors.filter((ec: EditionContributor) => ec.edition_id === editionId);
  },
  
  getCategories(): Category[] {
    return state.categories;
  },
  
  getCollections(): CuratedCollection[] {
    return state.collections;
  },
  
  getPurchaseLinks(editionId: string): ExternalPurchaseLink[] {
    return state.purchaseLinks.filter((pl: ExternalPurchaseLink) => pl.edition_id === editionId);
  },
  
  getRetailer(retailerId: string): Retailer | null {
    return state.retailers.find((r: Retailer) => r.id === retailerId) || null;
  },

  getTogetherDeck(): QuestionDeck {
    return {
      id: 'deck-together-1',
      title: 'سوالات دونفره - گفتگوی عمیق پای میز کافه',
      description: 'مجموعه‌ای از سوالات صمیمی برای زوج‌ها و دوستان برای غنی‌تر کردن زمان حضور در کافه.',
      coverImage: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop',
      cards: [
        { id: 'q1', category: 'romantic', question: 'اولین تصوری که در اولین دیدارت از من داشتی چه بود؟' },
        { id: 'q2', category: 'deep_talk', question: 'اگر می‌توانستی یک رویای بزرگ را بدون هیچ ترسی برآورده کنی، چه کاری انجام می‌دادی؟' },
        { id: 'q3', category: 'memories', question: 'بهترین خاطره‌ای که با هم در یک کافه داشتیم چیست؟' },
        { id: 'q4', category: 'fun', question: 'اگر قهوه امروزمان یک طعم احساسی داشت، چه نامی روی آن می‌گذاشتی؟' },
        { id: 'q5', category: 'deep_talk', question: 'چه ارزشی در زندگی هست که هرگز حاضر نیستی روی آن معامله کنی؟' }
      ]
    };
  },

  getOffers(): Offer[] {
    return state.offers;
  },

  claimOffer(offerId: string): Coupon {
    const offer = state.offers.find((o: Offer) => o.id === offerId);
    if (!offer) {
      throw new Error('پیشنهاد مورد نظر یافت نشد.');
    }
    if (offer.status !== 'active') {
      throw new Error('این پیشنهاد در حال حاضر فعال نیست.');
    }

    const phone = state.activeSession?.guestPhone || '09123456789';
    // Check duplicate claim
    const existing = state.coupons.find((c: Coupon) => c.offerId === offerId && c.guestPhone === phone && c.status === 'claimed');
    if (existing) {
      return existing;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `GREENWICH-${offer.valueDisplay.replace(/\D/g, '') || 'OFF'}-${randomSuffix}`;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 2 * 3600 * 1000); // 2 hours

    const newCoupon: Coupon = {
      code,
      offerId: offer.id,
      offerTitle: offer.title,
      offerValueDisplay: offer.valueDisplay,
      branchId: offer.branchId,
      branchName: offer.branchName,
      guestPhone: phone,
      status: 'claimed',
      claimedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString()
    };

    offer.claimedCount += 1;
    state.coupons.unshift(newCoupon);

    // update customer
    const cust = state.customers.find((c: CustomerProfile) => c.phone === phone);
    if (cust) {
      cust.claimedCouponsCount += 1;
    }

    saveState(state);
    this.recordEvent('offer_claimed', 'coupon', newCoupon.code, { offerId });

    return newCoupon;
  },

  redeemCoupon(code: string, staffPin: string = '1234') {
    if (staffPin !== '1234') {
      throw new Error('پین پرسنل کافه اشتباه است.');
    }

    const coupon = state.coupons.find((c: Coupon) => c.code === code);
    if (!coupon) {
      throw new Error('کد تخفیف معتبر نیست.');
    }
    if (coupon.status === 'redeemed') {
      throw new Error('این کد کوپن قبلاً استفاده و ثبت شده است!');
    }
    if (coupon.status === 'expired') {
      throw new Error('مهلت استفاده از این کوپن به پایان رسیده است.');
    }

    coupon.status = 'redeemed';
    coupon.redeemedAt = new Date().toISOString();

    const offer = state.offers.find((o: Offer) => o.id === coupon.offerId);
    if (offer) {
      offer.redeemedCount += 1;
    }

    const cust = state.customers.find((c: CustomerProfile) => c.phone === coupon.guestPhone);
    if (cust) {
      cust.redeemedCouponsCount += 1;
    }

    saveState(state);
    this.recordEvent('coupon_redeemed', 'coupon', coupon.code, { offerId: coupon.offerId });

    return {
      success: true,
      message: 'کوپن با موفقیت اعمال و بازخرید شد!',
      coupon
    };
  },

  submitFeedback(rating: number, comment: string, tags: string[]) {
    const phone = state.activeSession?.guestPhone || '09123456789';
    const table = state.activeSession?.tableNumber || '۱۲';

    const newFb: GuestFeedback = {
      id: `fb-${Math.random().toString(36).substring(2, 8)}`,
      guestPhone: phone,
      tableNumber: table,
      rating,
      comment,
      tags,
      createdAt: new Date().toISOString()
    };

    state.feedback.unshift(newFb);
    saveState(state);
    this.recordEvent('feedback_submitted', 'feedback', newFb.id, { rating, tagsCount: tags.length });

    return newFb;
  },

  recordEvent(eventName: string, objectType?: string, objectId?: string, metadata?: Record<string, unknown>) {
    const evt: ProductEvent = {
      id: `evt-${Math.random().toString(36).substring(2, 8)}`,
      eventName,
      sessionId: state.activeSession?.sessionId,
      guestPhone: state.activeSession?.guestPhone,
      branchId: state.activeSession?.branchId || 'br-naderi-01',
      objectType,
      objectId,
      occurredAt: new Date().toISOString(),
      metadata
    };
    state.events.unshift(evt);
    saveState(state);
    return evt;
  },

  // Dashboard APIs
  getDashboardSummary(): DashboardSummary {
    const activeVisits = state.visits.filter((v: VisitSession) => v.status === 'active');
    const claimedToday = state.coupons.length;
    const redeemedToday = state.coupons.filter((c: Coupon) => c.status === 'redeemed').length;

    return {
      activeVisitsCount: activeVisits.length,
      todayTotalGuests: state.customers.length + 3,
      offersClaimedToday: claimedToday,
      couponsRedeemedToday: redeemedToday,
      avgVisitDurationMinutes: 48,
      recentVisits: state.visits.slice(0, 10),
      recentEvents: state.events.slice(0, 10),
      topContent: state.content.slice(0, 4)
    };
  },

  getDashboardCustomers() {
    return state.customers;
  },

  getDashboardVisits() {
    return state.visits;
  },

  getDashboardOffers() {
    return state.offers;
  },

  createDashboardOffer(data: Omit<Offer, 'id' | 'claimedCount' | 'redeemedCount'>): Offer {
    const newOffer: Offer = {
      ...data,
      id: `off-${Math.random().toString(36).substring(2, 8)}`,
      claimedCount: 0,
      redeemedCount: 0
    };
    state.offers.unshift(newOffer);
    saveState(state);
    return newOffer;
  },

  getDashboardFeedback() {
    return state.feedback;
  }
};
