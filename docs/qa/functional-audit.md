# Functional Audit

## Button System
- **Status**: FIXED
- **Notes**: Consolidated buttons into `Button` component with standard variants (primary, secondary, tertiary, ghost, danger, link) and sizes. 
Replaced old `<button>` tags with the standard `<Button>` in:
- CatalogBookDetailPage
- ChapterManagerPage
- MediaPage
- SessionExpiredPage
- TogetherDeckPage
- QRLandingPage
- CatalogBookListPage

## Forms
- **Status**: NOT_VERIFIED
- **Notes**: Next step to check form labels, states, and error handling.

## Typography
- **Status**: PARTIAL
- **Notes**: Updated `index.css` to use Vazirmatn font correctly with appropriate `line-height` and fallback.
Added `prefers-reduced-motion`.

## Accessibility
- **Status**: PARTIAL
- **Notes**: Global focus styles added. Still need to audit specific semantic tags.

## General Code Cleanliness
- **Status**: IN_PROGRESS
- **Notes**: Completed standardizing standard button interactions on public pages to uniform `<Button>` usage.
