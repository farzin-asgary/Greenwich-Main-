# بررسی و گزارش پیش از توسعه Customer App V1 (Greenwich)

این سند خلاصه وضعیت فعلی سیستم Customer/Guest را نشان می‌دهد و مسیر توسعه معماری جدید را مشخص می‌کند.

## ۱. ساختار فعلی Customer/Guest
در حال حاضر دو تجربه جداگانه و موازی در فرانت‌اند وجود دارد که باعث تداخل نقش و هویت مشتری می‌شوند:
- **تجربه Guest (App):** با روت‌های `/app/*` و استفاده از فایل‌هایی نظیر `GuestHomePage.tsx` و نَویگیشن `GuestBottomNav`. این صفحات فاقد Layout اختصاصی مشتری هستند و بیشتر ماهیت یک دمو را دارند.
- **تجربه Customer Panel:** با روت‌های `/panel/user/*` و استفاده از `CustomerLayout.tsx` که شبیه به یک داشبورد است و منوی Sidebar در دسکتاپ دارد.

این دوگانگی بر خلاف دستورالعمل (بند ۷) است که تصریح می‌کند فقط یک اپلیکیشن و تجربه جامع به نام Customer App برای مشتریان (مهمانان کافه) باید وجود داشته باشد.

## ۲. Routeهای فعلی
روت‌های مرتبط با سمت مشتری در `AppRouter.tsx` به شدت پراکنده‌اند:
- `/app/home`, `/app/discover`, `/app/offers`
- `/app/library`, `/app/library/favorites`, `/app/library/completed`
- `/panel/user/home`, `/panel/user/visits`, `/panel/user/offers`, `/panel/user/profile`, `/panel/user/privacy`

این موضوع باعث سردرگمی کاربر و تکرار بی‌دلیل (Data Duplication) صفحات (مثل OffersPage در دو مسیر متفاوت) شده است.

## ۳. Navigation فعلی
- `GuestBottomNav`: شامل گزینه‌های «خانه، مطالعه، گوش کنید، دونفره، پیشنهادها». این چیدمان با استاندارد تعیین شده V1 مغایرت دارد.
- `CustomerLayout`: دارای نویگیشن خطی عمودی مانند پنل مدیریت کافه‌هاست.

## ۴. Guest و Customer Identity فعلی
در وضعیت فعلی، سیستم احراز هویت (AuthContext) نقش‌های مختلفی چون `CUSTOMER`، `CAFE`، `CONTENT_WRITER`، `ADMIN` را مدیریت می‌کند. اما فرانت‌اند بین مهمان و مشتری تمایز ظاهری قائل شده (روت‌های app در مقابل panel). ما باید از همان هویت ماندگار (Guest/Customer) که در دیتابیس پشتیبانی می‌شود استفاده کنیم و این دوگانگی بصری را از بین ببریم.

## ۵. Active Visit State فعلی
SessionTimerHeader و صفحات QRLandingPage در حال حاضر وجود دارند، اما مدیریت و متمرکزسازی `ActiveCafeContext` هنوز یکپارچه نیست و صفحات مختلف به جای تغذیه از یک State معتبر محلی یا API اختصاصی، رفتاری پراکنده دارند.

## ۶. قابلیت‌هایی که حفظ می‌شوند
- جریان اسکن QR و ورود (PhoneAuth, OTPVerify, Consent)
- سیستم Reader و Reading Progress
- API Client فعلی و Mock Engine زیرساخت‌ها

## ۷. قابلیت‌هایی که Refactor یا جایگزین می‌شوند
- `GuestHomePage` و `CustomerHomePage` باید ادغام شده و یک `CustomerHome` واقعی متنی (Contextual) بسازند.
- `CustomerLayout` و `GuestBottomNav` بازنویسی می‌شوند تا `CustomerLayout` جدید و `CustomerBottomNav` استاندارد با ۵ تب اصلی (خانه، کشف، کافه، کتابخانه، من) شکل بگیرد.
- صفحات مرتبط با پروفایل و تنظیمات (Privacy, Preferences) در بخش `من` تجمیع می‌شوند.

## ۸. Data Duplication Risks
- داده‌های منو: نباید برای مشتری دیتای Mock جداگانه ساخته شود. منوی مشتری دقیقاً باید `Projection` دیتای منوی ثبت شده توسط پنل کافه باشد.
- وضعیت Offer ها و تخفیف‌ها: بررسی صلاحیت (Eligibility) باید در بک‌اند باشد، نه اینکه کلاینت دیتای خام Rule ها را پردازش کند.

## ۹. Proposed Customer Navigation
مطابق دستورالعمل، نویگیشن جدید در موبایل باید اینگونه باشد:
1. `خانه` (/app/home)
2. `کشف` (/app/discover)
3. `کافه` (/app/cafe)
4. `کتابخانه` (/app/library)
5. `من` (/app/profile)

## ۱۰. Proposed ActiveCafeContext
ایجاد یک Context یا Store در فرانت‌اند برای نگه داشتن وضعیت قطعی حضور در کافه (Active Visit). این داده باید مستقیماً در Home و Cafe tab نمایش یابد و در صورت خروج از کافه، فقط محتوای لوکیشن‌بیس مخفی شود، اما دیتای کاربر ثابت بماند.

## ۱۱. Café → Customer Data Mapping
طراحی دقیق لایه ترجمه (Translation Layer) به نحوی که اطلاعات عملیاتی مدیریت (مثلاً وضعیت آیتم‌ها یا یادداشت‌های کارکنان) به مشتری نشت پیدا نکند و فقط DTO های عمومی به سمت مشتری بروند.

## ۱۲. اولین بخش توسعه (First Implementation Slice)
طبق دستورالعمل مرحله اول (**CUSTOMER-01**) استقرار Foundation اپلیکیشن مشتری است:
1. **پاک‌سازی Routeها**: ادغام مسیرهای `/panel/user/*` و `/app/*` در یک درخت روت واحد (`/app/*`).
2. **ساخت CustomerLayout و CustomerBottomNav**: با ۵ مسیر اصلی مشخص شده.
3. **ایجاد Skeleton اولیه ۵ مقصد اصلی**: Home, Discover, Cafe, Library, Profile.

با این معماری، Customer App از حالت دمو و پنل کاربری خشک خارج شده و تبدیل به یک اپلیکیشن یکپارچه و مشتری‌محور خواهد شد.
