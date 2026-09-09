# Unique Printers — Project Modifications & Architecture Log

> **Location:** Main Road, Wilgoda, Kurunegala, Sri Lanka  
> **Tech Stack:** Vite.js + React 18 + TypeScript + Supabase BaaS + Vanilla CSS  
> **Last Updated:** 2026-09-09

This document serves as the project's persistent single source of truth for all modifications, component structures, asset references, design decisions, and future roadmap items across sessions and token resets.

---

## 1. Overview of Architecture

The project is structured as a high-performance, responsive catalog & showcase web application for **Unique Printers**, a beloved local printing, stationery, and book shop operating in Wilgoda, Kurunegala for over 10 years.

```
Unique_Printers/
├── public/
│   ├── assets/
│   │   ├── logo.png                              ← Official logo from icon/unique_printer_icon.png
│   │   └── samples/                              ← Real customer products from Images/
│   │       ├── wedding_invite_classic.jpg        ← Waleema floral gold script card (e.jpeg)
│   │       ├── wedding_ribbon_collection.jpg     ← Baby blue ribbon sets
│   │       ├── wedding_cards_flatlay.jpg         ← Full table collection
│   │       ├── waleema_floral_invite.jpg         ← Royal gold crest & Arabic/English calligraphy
│   │       ├── royal_gold_wedding_card.jpg       ← High-contrast gold wedding card
│   │       ├── certificate_with_seal.jpg         ← Official certificate with gold starburst seal
│   │       ├── purple_floral_invitation_closeup  ← Lavender flower with gold thread
│   │       ├── purple_wedding_envelope_set.jpg   ← Layered violet envelopes with tie
│   │       └── handcrafted_ribbon_invitations.jpg← Ribbon bouquet invitations
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AnnouncementBanner.tsx            ← Toggleable emergency notice banner
│   │   │   ├── Header.tsx                        ← Baseline desktop sticky navigation & top bar
│   │   │   ├── MobileHeaderHero.tsx              ← Preserved Mobile Hero (Time, Open status, Call, WhatsApp)
│   │   │   ├── MobileBottomNav.tsx               ← Preserved Mobile 5-tab bottom dock
│   │   │   └── Footer.tsx                        ← Comprehensive footer with maps & contact
│   │   ├── sections/
│   │   │   ├── DesktopHero.tsx                   ← Baseline desktop 3D layered cards hero
│   │   │   ├── ServicesSection.tsx               ← 6 core services with WhatsApp inquiry links
│   │   │   ├── DesignsPortfolio.tsx              ← Sample designs with category filters & lightbox
│   │   │   ├── BooksSection.tsx                  ← School books catalog with live search & cart
│   │   │   ├── StationerySection.tsx             ← A-Z stationery list + wholesale school callout
│   │   │   ├── OffersSection.tsx                 ← New arrivals, countdown timer, promo code & sale bundles
│   │   │   └── StatsBar.tsx                      ← 4 trust value metrics
│   │   └── ui/
│   │       ├── ImageModal.tsx                    ← Fullscreen lightbox modal with WhatsApp quotation CTA
│   │       ├── CartDrawer.tsx                    ← Slide-out drawer with formatted WhatsApp order generator
│   │       └── WhatsAppFloat.tsx                 ← Floating WhatsApp badge
│   ├── config/
│   │   └── siteConfig.ts                         ← Typed configuration reader for site.config.json
│   ├── data/
│   │   └── sampleData.ts                         ← Comprehensive catalog datasets with prices in LKR
│   ├── lib/
│   │   └── supabase.ts                           ← Supabase client with offline/mock resilience
│   ├── types/
│   │   └── index.ts                              ← Strict TypeScript interfaces
│   ├── App.tsx                                   ← Main layout coordinator & view switcher
│   ├── index.css                                 ← Design system tokens, typography, and animations
│   ├── main.tsx                                  ← React DOM mount
│   └── vite-env.d.ts                             ← Vite environment typings
├── site.config.json                              ← Non-code shop configuration
├── project_details.md                            ← Original specification
└── MODIFICATIONS.md                              ← This modification history
```

---

## 2. Key Design & Specification Decisions

### 2.1 Baseline Desktop View (`Unique_printers_Desktop_View_UI.pdf`)
- Maintained exact visual harmony and color palette:
  - Cream Background: `#FFFBF5`
  - High-Contrast Dark: `#121212`
  - Warm Gold Accent: `#B77B3D`, hover `#9A652F`
  - Emerald Green: `#10B981` / `#1D9E75`
- Typography:
  - Headers: **Instrument Serif** (`.serif`)
  - Body & UI: **Plus Jakarta Sans**
- Desktop Hero features the signature 3D layered floating cards:
  - Card 1: Gold Foil Wedding Invitation (*Anu & Nimali*) rotated `-5deg`.
  - Card 2: Poster card (*A3 Grand Opening Sale 50% Off, Printed Today*) rotated `+7deg`.
  - Card 3: School books card (*Grade 6 Science, O/L Past Papers, In Stock*) rotated `-2deg`.

### 2.2 Mobile View (`Unique_printers_Mobile_View_UI.pdf`)
As explicitly specified by the user:
- **Hero Section (Kept as is)**:
  - Top black bar with Sri Lanka live date & time clock (`SRI LANKA • WED, 09 SEPT  01:46:22 PM`) and `[DESKTOP VIEW]` switch.
  - Official Unique Printers logo with Wilgoda Kurunegala label.
  - Live store status badge: `● OPEN NOW`, `Closes 8:00 PM`, `LIVE • Colombo`.
  - Search bar with microphone/voice search icon.
  - High-conversion dual CTA buttons:
    - **"📞 Call Shop"** (`tel:+94771234567`)
    - **"💬 WhatsApp"** (`wa.me/94771234567`)
- **Bottom Navbar (Kept as is)**:
  - Fixed 5-item bottom dock:
    1. `Home`
    2. `Designs`
    3. `Books`
    4. `Offers`
    5. `Contact`
  - Responsive padding (`.mobile-bottom-space`) ensures no page content is hidden behind the dock.
- **Enhanced Middle Sections**:
  - The sample mobile PDF had rudimentary placeholder boxes for services and products.
  - These were upgraded into touch-friendly, cards maintaining desktop visual richness while fitting mobile viewports without horizontal scrolling.

### 2.3 Real Assets Integration
- Official logo from `icon/unique_printer_icon.png` is integrated into both desktop & mobile headers and footer.
- 9 real sample images from `Images/` were copied to `public/assets/samples/` and mapped to the **Sample Designs & Printing Works** section with:
  - Category tags (Invitations, Certificates, Posters, Business Cards).
  - Material details (e.g. *300gsm Textured Pearl Card*, *Frosted Vellum*, *Embossed Seal*).
  - Clicking any card opens a high-resolution lightbox modal (`ImageModal.tsx`) with an instant "Inquire on WhatsApp" pre-filled message.

---

## 3. Interactive Features & E-Commerce Workflow

1. **WhatsApp Order Generator (`CartDrawer.tsx`)**:
   - Customers can add school books, new arrivals, or sale packages to their cart.
   - Clicking "Confirm & Order on WhatsApp" automatically opens WhatsApp with a pre-formatted message:
     ```
     *NEW ORDER / INQUIRY - UNIQUE PRINTERS*
     ---------------------------------
     1. Grade 6 Science Workbook (x1) - Rs. 850
     2. G.C.E O/L Mathematics Past Papers (x1) - Rs. 1,200
     ---------------------------------
     *Total Amount:* Rs. 2,050
     Hi Unique Printers, please let me know availability and delivery/pickup details at your Wilgoda shop!
     ```
   - Eliminates customer checkout friction, perfectly suited for local Sri Lankan retail.

2. **Live Promo Countdown (`OffersSection.tsx`)**:
   - Active countdown timer for the "Back to School" promotion.
   - One-click copy for promo code `SCHOOL20`.

3. **Emergency Notice Banner (`AnnouncementBanner.tsx`)**:
   - Configurable via `site.config.json` (`announcement.enabled`).
   - Supports `urgent` (maroon) and `info` (emerald) styling with dismiss action.

4. **Live Search Filter**:
   - Synchronized across the header search bar and books catalog.

5. **Supabase Integration (`src/lib/supabase.ts`)**:
   - Typed client initialized with environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
   - Graceful offline/development fallback so the site remains fully operational without remote database downtime.

---

## 4. Build & Verification Status

- **Build Command:** `npm run build` (`tsc && vite build`)
- **Status:** **PASSING (0 errors, 0 warnings)**
- **Output Bundle:**
  - `dist/index.html` (1.05 kB)
  - `dist/assets/index-*.css` (2.66 kB)
  - `dist/assets/index-*.js` (232 kB)
- **Dev Server:** `npm run dev` running on `http://localhost:5173`
