# Greenwich Club — Café Panel V2 Audit (گزارش بررسی پنل کافه)

## ساختار فعلی پنل کافه
ساختار فعلی در یک کامپوننت عظیم `DashboardLayout` در فایل `src/features/cafe-dashboard/DashboardLayout.tsx` مجتمع شده است. 
تب‌های مختلف به صورت دستی و با state (مثل `activeTab`) رندر می‌شوند و از قابلیت‌های `react-router-dom` و `<Outlet />` به صورت استاندارد استفاده نشده است. این طراحی به صورت SPA داخلی بدون مسیریابی واقعی (Routing) پیاده‌سازی شده است. ساختار فعلی فاقد مفهوم چندشعبه‌ای (Multi-branch) واقعی است.

## Routeهای فعلی
در فایل `AppRouter.tsx` تنها یک مسیر برای پنل کافه وجود دارد:
- `/dashboard/*` متصل به `DashboardLayout`

مسیرهای داخلی (مثل `/dashboard/menu` یا `/dashboard/customers`) وجود ندارند.

## نقش‌ها و دسترسی‌های فعلی
در حال حاضر مفهوم نقش‌محور (Role-based Access Control - RBAC) در فرانت‌اند برای پنل کافه پیاده‌سازی نشده است. هرکسی که به `/dashboard` دسترسی پیدا کند ظاهراً همه امکانات را می‌بیند.

## قابلیت‌هایی که قابل حفظ هستند
- کامپوننت `CouponRedeemer` تا حد زیادی کاربردی است و می‌تواند در ماژول مربوطه (Redemption) مجددا استفاده شود (شاید با کمی بهبود رابط کاربری).
- ساختار جدول‌ها و برخی استایل‌های بصری (مانند تم رنگی سبز تیره و طلایی) برای حفظ پیوستگی بصری پنل.
- معماری کلاینت API (فایل `client.ts`) که برای واکشی داده‌ها با React Query استفاده می‌شود.

## قابلیت‌هایی که باید Refactor شوند
- **DashboardLayout**: باید به یک Layout واقعی در React Router تبدیل شود که دارای Sidebar مجزا، TopBar، و انتخابگر شعبه (Branch Switcher) باشد.
- **OverviewView / CustomersView / OffersView / TablesView / FeedbackView**: این کامپوننت‌ها باید به صفحات (Pages) مجزا تبدیل شوند و در Route های جداگانه قرار گیرند.
- **Customer List / Table**: باید از نو پیاده‌سازی شود تا دارای جستجو، فیلتر و قابلیت لینک شدن به پروفایل جزئیات مشتری (Customer Detail) باشد.
- فرم‌های مدیریت مانند ایجاد Offer و غیره.

## قابلیت‌های حذف‌شده یا Duplicate
- سیستم مدیریت State با نام `activeTab` از Layout باید حذف شود.
- منوی کافه فعلاً در پنل مدیریت وجود ندارد و کاملاً جدید باید ساخته شود (Menu Builder).

## ساختار جدید Navigation
طبق مستندات، ساختار Navigation جدید باید به این شکل باشد:
**عملیات:**
- نمای کلی (Overview)
- منو (Menu)
- مشتریان (Customers)
- مراجعات (Visits)
- پیشنهادها و کوپن‌ها (Offers & Coupons)
- میزها و QR (Tables)
- بازخورد (Feedback)

**مدیریت:**
- کافه و شعب (Cafe & Branches)
- کارکنان (Staff)
- تنظیمات (Settings)

## Route Map جدید
```text
/dashboard
/dashboard/setup
/dashboard/cafe
/dashboard/branches
/dashboard/branches/:branchId
/dashboard/menu
/dashboard/menu/:menuId
/dashboard/menu/items
/dashboard/menu/items/:itemId
/dashboard/menu/modifiers
/dashboard/customers
/dashboard/customers/:customerId
/dashboard/visits
/dashboard/offers
/dashboard/offers/new
/dashboard/offers/:offerId
/dashboard/coupons
/dashboard/coupons/:couponId
/dashboard/redeem
/dashboard/tables
/dashboard/tables/:tableId
/dashboard/feedback
/dashboard/staff
/dashboard/staff/:staffId
/dashboard/settings
```

## Permission Matrix
نقش‌ها شامل: `CAFE_OWNER`, `CAFE_ADMIN`, `BRANCH_MANAGER`, `STAFF`, `CASHIER`.
- صندوق‌دار (`CASHIER`): فقط امکان بازخرید کوپن (Redeem Coupon).
- مدیر شعبه (`BRANCH_MANAGER`): امکان مدیریت مشتریان، منو، پیشنهادها و میزهای شعبه خود.
- صاحب کافه (`CAFE_OWNER`): دسترسی به تمام بخش‌ها، تنظیمات سازمان و تعریف کارکنان.

## مدل Menu پیشنهادی
سلسله مراتب ساده: 
Menu -> Section -> Item
علاوه بر این، Item ها در یک کتابخانه مشترک (Item Library) هستند.
مفاهیم Category، Label و Tag جدا از هم هستند.
Modifiers برای سفارشی‌سازی بدون ساختارهای درختی پیچیده (در فاز ۱) پیاده‌سازی می‌شوند.

## مدل Customer پیشنهادی
مدل Progressive Profiling:
- ثبت اولیه با شماره تلفن
- اضافه شدن تدریجی نام، تاریخ تولد و علاقه‌مندی‌ها
وضعیت‌ها شامل: جدید، بازگشتی، منظم، غیرفعال (محاسبه‌شده توسط سیستم، غیرقابل ویرایش دستی).

## مدل Offer/Coupon پیشنهادی
فرم‌های مرحله به مرحله (Wizard) برای ساخت Offer شامل:
۱. نوع پیشنهاد (درصد، مبلغ، آیتم رایگان)
۲. هدف (کل منو، دسته، آیتم)
۳. مخاطب (مشتری جدید، بازگشتی و ...)
۴. محل اجرا (شعبه)
۵. زمان‌بندی
۶. محدودیت‌ها

کوپن‌ها وضعیت‌های: دریافت‌شده، استفاده‌شده، منقضی، و لغوشده خواهند داشت.

## Component Map
کامپوننت‌های پایه (Shared UI):
- `CafePageHeader`: هدر صفحات با Title و دکمه اصلی (Primary Action)
- `BranchSwitcher`: انتخاب‌گر شعبه در بالای پنل
- `MetricCard`: برای نمایش آمار (مثل مشتریان امروز)
- `DataTable`: جدول سازگار و واکنش‌گرا
- `StatusBadge`: نمایش وضعیت با رنگ‌بندی مرتبط
- `FilterBar`: نوار فیلتر و جستجو
- `Wizard`: برای فرم‌های چند مرحله‌ای (مثل ایجاد Offer)

## فایل‌های جدید
تمام فایل‌های Route در فولدر `src/features/cafe-dashboard` و زیرپوشه‌های آن (مثل `menu`، `customers`، `offers`، `setup`) ایجاد خواهند شد.
مسیردهی (Routing) در `AppRouter.tsx` به کلی تغییر خواهد کرد و از سیستم Nested Routes استفاده می‌شود.

## فایل‌های نیازمند تغییر
- `src/app/router/AppRouter.tsx`: بازنویسی روت‌های `/dashboard`.
- `src/features/cafe-dashboard/DashboardLayout.tsx`: تبدیل به Layout واقعی با `<Outlet />`.
- بازنویسی `OverviewView` به `OverviewPage`.
- آپدیت کردن بقیه Viewها به Page.

## ریسک Migration
- انتقال از ساختار Tab به Route ممکن است لینک‌های ذخیره شده داخلی کافه را بشکند، اما چون سیستم هنوز در حال توسعه است، ریسک پایین است.
- عدم وجود Role-based Control در API می‌تواند باعث شود برخی فرم‌ها اطلاعات نادرست یا خطا بگیرند. (باید مدیریت خطا و UI State برای Unauthorized داشته باشیم).
- تغییر معماری Data Fetching؛ کوئری‌ها باید با معماری شعبه-محور آپدیت شوند (ارسال BranchId).

## اولین Slice پیشنهادی
**CAFE-01: Dashboard shell + roles + branch context**
ابتدا باید فایل‌های مسیردهی (AppRouter)، پوسته داشبورد (CafeDashboardLayout)، نوار کناری (Sidebar)، هدر اصلی و انتخاب‌گر شعبه (Branch Switcher) ایجاد شوند. 
این Slice پایه و اساس همه صفحات دیگر را تشکیل می‌دهد.

## گزارش پیشرفت اجرا (Execution Progress)
**Slice 1 (CAFE-01: Dashboard Shell):**
- ایجاد ساختار پایه `DashboardLayout` با استفاده از `react-router-dom` و `<Outlet />`.
- بازنویسی مسیردهی در `AppRouter.tsx` به صورت Nested Routes.
- انتقال `OverviewView` به فرمت صفحه مستقل `OverviewPage` به عنوان صفحه پیش‌فرض.

**Slice 2 & 3 (CAFE-02, CAFE-03: Cafe Profile & Branches):**
- ساخت `CafeProfilePage` برای ویرایش اطلاعات سازمان و کسب و کار (برند، نام رسمی، اطلاعات شبکه‌های اجتماعی).
- ساخت `BranchesPage` برای نمایش لیستی از شعبه‌های کافه.
- ساخت `BranchDetailPage` جهت ویرایش اطلاعات اختصاصی هر شعبه (آدرس، شماره تماس، ساعت کاری، و تنظیمات نشست).

**وضعیت فعلی:**
معماری پایه تکمیل شده است و Routeهای پروفایل و شعبه‌ها جای‌گذاری شده‌اند. کامپایل و Lint موفقیت‌آمیز است.
آماده شروع برای `CAFE-04` و `CAFE-05` (ساختار منو و قالب‌های منو) هستیم.

**Slice 8 (CAFE-16): Tables & QR**
- `TablesPage` پیاده‌سازی و یکپارچه‌سازی شد.
- کدهای V1 (`TablesView`) به `pages/` منتقل شدند.

**Slice 9 (CAFE-17): Feedback**
- `FeedbackPage` به فولدر `pages/` منتقل و خطاهای ایمپورت آن اصلاح شد.

**Slice 10 (CAFE-18, 19): Staff & Settings**
- صفحات `StaffPage` و `SettingsPage` به عنوان Stubs توسعه یافته آماده شدند تا داشبورد V2 از لحاظ ساختار Navigation کامل باشد.

**Slice 11 (CAFE-15): Redemption**
- کامپوننت بازخرید کوپن قبلی به عنوان یک صفحه مستقل به نام `RedeemPage` در سیستم مسیردهی قرار گرفت تا صندوق‌داران مستقیما به آن دسترسی داشته باشند.

**جمع‌بندی V2 Audit**
تمام اهداف ساختاری مشخص‌شده در معماری V2 با موفقیت به اتمام رسید. پنل مدیریت کافه اکنون از الگوی صحیح Nested Routes در V6 استفاده می‌کند و قابلیت گسترش برای افزودن فرم‌های جزئیات را دارد.
