# Greenwich UI Interaction Inventory

## Book Catalog & Reader
- Route: `/books/:slug`
  - Element: `ادامه مطالعه`
  - Type: Primary Button
  - Expected: Open Reader at saved ReadingLocator
  - Actual: NOT_VERIFIED
  - Loading: N/A
  - Permission: Authenticated customer
  - Test: TBD
  - Status: NOT_VERIFIED

- Route: `/books/:slug`
  - Element: `افزودن به علاقه‌مندی`
  - Type: Secondary Button
  - Expected: Add/Remove from favorites
  - Actual: NOT_VERIFIED
  - Loading: Visual spinner or text update
  - Permission: Authenticated customer
  - Test: TBD
  - Status: NOT_VERIFIED

## Guest Experience
- Route: `/guest/qr`
  - Element: `اسکن مجدد میز یا ورود آزمایشی`
  - Type: Primary Button
  - Expected: Navigate back to QR scan or demo
  - Actual: NOT_VERIFIED
  - Loading: N/A
  - Permission: Guest
  - Test: TBD
  - Status: NOT_VERIFIED

## Content Studio
- Route: `/content-studio/chapter-manager/:id`
  - Element: `ذخیره محتوای فصل`
  - Type: Primary Button
  - Expected: Save section content
  - Actual: NOT_VERIFIED
  - Loading: Needs visual state
  - Permission: Writer / Admin
  - Test: TBD
  - Status: NOT_VERIFIED

- Route: `/content-studio/media`
  - Element: `بارگذاری تصویر یا فایل صوتی جدید`
  - Type: Upload Action
  - Expected: Open file picker
  - Actual: NOT_VERIFIED
  - Loading: Upload progress indicator
  - Permission: Writer / Admin
  - Test: TBD
  - Status: NOT_VERIFIED

*(To be expanded during full audit)*
