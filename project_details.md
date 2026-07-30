# Project Details — Printer, Stationery & Book Shop Web App

## 1. Overview

A colorful, interactive, and user-friendly catalog/showcase web application for a small-to-medium printer's, stationery, and book shop. The site displays products, categories, offers, and shop information to customers, and gives the shop owner a full admin dashboard to manage everything without touching code.

| | |
|---|---|
| **Type** | Catalog/showcase website (no online checkout) |
| **Audience** | General public — all ages, so readability and simplicity matter |
| **Admin** | Full dashboard to manage products, categories, stock, and site content |
| **Repo style** | Monorepo (two apps + shared packages) |

### 1.1 Service categories

The shop offers both physical products and in-store services. These are the core categories shown on the storefront (navigation, home page, and category filters):

| Category | Type | Notes |
|---|---|---|
| Printing | Service | Document/photo printing |
| Scanning | Service | Scan-to-file/email service |
| Photocopy | Service | Black & white / color copies |
| Typing | Service | Document typing/formatting help |
| Books | Product | Has its own dedicated showcase page — see 5.5 |
| Reload | Service | Mobile reload / top-up |
| Stationary Items | Product | Pens, notebooks, office/school supplies |
| Toys | Product | Kids' toys and stationery-adjacent items |

Services (Printing, Scanning, Photocopy, Typing, Reload) are shown as simple info cards — name, short description, and a "Visit us" or WhatsApp-enquiry call to action, since these aren't purchased online. Products (Books, Stationary Items, Toys) link through to browsable listings with prices and stock status. Category list and labels are editable from the config file / admin dashboard, so adding or renaming a category doesn't need a code change.

## 2. Tech stack

| Layer | Technology | Purpose |
|---|---|---|
| Build tool | Vite | Fast dev server, optimized production builds |
| Framework | React + TypeScript | Component-based UI, type safety |
| Styling | Tailwind CSS | Utility-first styling, easy theming |
| Components | shadcn/ui + Radix primitives | Accessible, unstyled base components |
| Animation | Framer Motion | Smooth, interactive transitions |
| Data fetching | TanStack Query | Caching, background refetch, performance |
| Forms | react-hook-form + Zod | Admin forms with validation |
| Backend (BaaS) | Supabase | Postgres database, Auth, Storage (images) |
| Monorepo tooling | pnpm workspaces + Turborepo | Shared packages, fast cached builds |
| Hosting | Vercel (free tier) | Storefront + admin as two projects |

## 3. Monorepo structure

```
shop-monorepo/
├── apps/
│   ├── storefront/        → public-facing catalog site
│   └── admin/              → admin dashboard (protected, Supabase Auth)
├── packages/
│   ├── ui/                 → shared components (buttons, cards, nav, etc.)
│   ├── supabase-client/     → typed Supabase client + queries
│   └── config/              → shared eslint / tailwind / tsconfig
│       └── site.config.json → editable shop settings (see section 6)
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## 4. Design system

### 4.1 Typography

- **Font family:** Poppins (Google Fonts), applied globally across both apps.
- **Readability-first sizing** — built for a wide range of ages, including older and middle-aged users who need clear, comfortable text:

| Use | Size | Weight |
|---|---|---|
| Body text | 16–18px | 400 |
| Secondary text / captions | 14px minimum (never smaller) | 400 |
| Section headings | 22–26px | 600 |
| Page titles | 28–34px | 700 |
| Buttons / interactive labels | 16px minimum | 500–600 |
| Line height | 1.6–1.7 | — |

Guiding rule: **nothing below 14px anywhere in the app**, generous line-height, and strong color contrast (see below) so text stays legible for all visitors.

### 4.2 Color system

Colors are theme-driven (see `site.config.json`), not hardcoded, so the shop owner can change the brand palette without a developer. The app ships with:

- A **primary** brand color (buttons, links, highlights)
- A **secondary/accent** color (badges, offers, category tags)
- Neutral surface/text tokens for both **light mode** and **dark mode**
- Semantic colors for success/warning/error (stock status, form validation)

All colors are defined as CSS variables so light/dark mode is a single class toggle (`data-theme="light" | "dark"` on `<html>`), not a rebuild.

### 4.3 Interactivity

- Hover/tap animations on product cards (scale + shadow lift)
- Smooth page and section transitions (Framer Motion)
- Category filter chips with animated active state
- Sticky, collapsible navigation on scroll
- Image zoom/lightbox on product detail view
- Skeleton loaders while data fetches (no blank/jarring loading states)

## 5. Features

### 5.1 Storefront (public site)

- Home page with hero banner, featured products, and current offers
- **Announcement / emergency notice banner** (see 5.3)
- Category browsing (printers, stationery, books, office supplies, etc.)
- **Books showcase page** with prices, status tags, and related-book suggestions (see 5.5)
- Product listing with search, filter, and sort
- Product detail page (images, description, price, stock status)
- Shop info page: address, map, contact number, opening hours, social links
- Contact/enquiry form (sends email or stores enquiry in Supabase)
- **WhatsApp chat button** (see 5.4)
- Fully responsive: mobile, tablet, desktop
- Light/dark mode toggle, remembered per visitor

### 5.2 Admin dashboard

- Secure login (Supabase Auth)
- Product management: add/edit/delete, images, price, stock, category
- Category management
- Offers/banners management for the homepage
- Shop settings editor: name, logo, address, phone, social links, business hours (writes to the same config the storefront reads)
- Basic stock-level indicators (in stock / low stock / out of stock)
- **Announcement banner editor** — turn the banner on/off and edit its message from the dashboard, no code changes needed
- Simple analytics: most-viewed products (optional, phase 2)

### 5.3 Announcement / emergency notice banner

A small, always-visible text banner (top of the storefront, above or just below the header) for short, time-sensitive notices — closures, holidays, delivery delays, etc.

**Examples:**
- "We will be closed on 26th October"
- "Tomorrow the shop is closed"
- "Today closed — sorry for the inconvenience"
- "Closing early today at 4 PM"

**How it works:**
- Owner toggles it on/off and edits the message from the admin dashboard (writes to `announcement` in the config — see section 6)
- Optional start/end date so a notice can auto-expire (e.g. only show until the 26th, then disappear on its own)
- Optional type/severity — `info` (blue/neutral, e.g. a delivery note) vs `urgent` (red/amber, e.g. today closed) so the color signals importance at a glance
- Dismissible by the visitor (small close "x"), but reappears on next visit while still active
- Kept compact and single-line on mobile so it never pushes important content too far down
- Text stays within the same accessible font-size rules as the rest of the site (never below 14px)

### 5.4 WhatsApp chat feature

Lets a visitor message the shop directly on WhatsApp without saving a number or opening a separate app.

**How it works:**
- Floating WhatsApp icon button, bottom-right corner, visible on every page (mobile + desktop)
- Tapping it opens `wa.me/<shop-number>` with a **pre-filled starter message** (e.g. "Hi, I'm interested in a product from your shop"), so the visitor doesn't have to type an opener
- Number and default message both come from the config file (`socialMedia.whatsappChat` / `whatsappMessage`) — easy to update, no code change
- Works as a direct link on mobile (opens the WhatsApp app) and via WhatsApp Web on desktop
- Optionally, individual product pages can pass a product-specific message (e.g. "Hi, I'd like to ask about [Product Name]") so enquiries arrive with context
- Simple, high-contrast icon sized for easy tapping (44x44px minimum touch target), so it's easy to spot and use for all age groups

### 5.5 Books showcase page

A dedicated page (separate from the general product listing) where customers can browse the shop's book collection online before visiting.

**Each book card/detail shows:**
- Cover image, title, author
- Price
- **Status tag** — e.g. `New Arrival`, `Most Popular`, `Best Seller`, `Limited Stock`, `Out of Stock` — shown as a small colored badge on the cover
- Category/genre (e.g. kids, fiction, textbooks, exam guides)
- Availability (in stock / out of stock), so customers don't make a trip for nothing

**Browsing & filtering:**
- Filter by status (e.g. show only "New Arrivals" or "Most Popular")
- Filter by genre/category
- Sort by price or newest added
- Search by title or author

**Book detail page:**
- Larger cover image, full description, price, author, status, availability
- **Relevant / related books** section at the bottom ("You may also like") — pulls other books from the same genre or author, so customers keep browsing instead of hitting a dead end
- WhatsApp enquiry button pre-filled with the book title (from 5.4), so a customer can ask about a specific book in one tap

**Admin side:**
- Add/edit books with cover image upload, price, author, genre, and status tag
- Status tags are simple dropdown selects in the admin form (`New Arrival`, `Most Popular`, `Best Seller`, `Limited Stock`, `Out of Stock`, or a custom label) — no code changes to add a new tag type

## 6. Configuration system

All shop-specific and brand details live in one editable configuration file, `site.config.json` (see attached), so non-developers can update:

- Shop name, tagline, logo
- Address, phone, WhatsApp, email
- Social media links (Facebook, Instagram, TikTok, YouTube)
- Business hours
- Theme colors (light & dark mode)
- Font family and base font size
- Currency and locale

The storefront and admin apps both import this single file, so a change made here (or through the admin dashboard's settings page, which edits the same underlying values) reflects everywhere instantly — no code changes needed for everyday updates.

## 7. Responsive design & accessibility

- Mobile-first layout, breakpoints for tablet and desktop
- Touch-friendly tap targets (minimum 44x44px) for older/less tech-savvy users
- High color contrast in both light and dark themes (WCAG AA minimum)
- Clear focus states for keyboard navigation
- No text below 14px; body copy defaults to 16–18px
- Simple, predictable navigation — no hidden or overly complex gestures

## 8. Dark mode & light mode

- Toggle available in the header (sun/moon icon)
- Preference saved locally and respected on return visits
- Falls back to system preference (`prefers-color-scheme`) on first visit
- All theme colors defined as CSS variables — switching themes is instant, no flash of unstyled content

## 9. Performance & optimization

- Route-based code splitting (per-page bundles)
- Lazy-loaded images with responsive/resized variants via Supabase image transforms
- TanStack Query caching to avoid redundant network requests
- Turborepo build caching across the monorepo
- Lighthouse targets: 90+ on Performance, Accessibility, Best Practices, SEO

## 10. Hosting & deployment

| Piece | Platform | Notes |
|---|---|---|
| Storefront | Vercel (free tier) | Auto-deploy from `apps/storefront` |
| Admin dashboard | Vercel (free tier), second project | Auto-deploy from `apps/admin`, password/auth protected |
| Database, Auth, Storage | Supabase (free tier) | Postgres DB, product images, admin login |

## 11. Roadmap (future enhancements)

- Online ordering / cart + payment gateway
- Customer accounts and order history
- Multi-language support (e.g. English + local language)
- WhatsApp "click to enquire" ordering flow
- Basic sales/inventory analytics for the admin