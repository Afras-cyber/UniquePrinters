import { ServiceItem, DesignItem, BookItem, StationeryItem, OfferItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'reload',
    icon: '📱',
    title: 'Reload Service',
    desc: 'Mobitel, Dialog, Airtel, Hutch — instant mobile top-ups, data bundles, and bill payments with printed receipts.',
    chips: ['All Networks', 'Instant Topup', 'Data Packs'],
    type: 'service',
    whatsappMessage: 'Hi Unique Printers, I need a reload / data pack top-up.'
  },
  {
    id: 'books',
    icon: '📚',
    title: 'School Books Selling',
    desc: 'Government syllabus school textbooks, past paper booklets, workbooks, Grade 5 scholarship packs, O/L & A/L guides.',
    chips: ['Scholarship Packs', 'O/L & A/L Past Papers', 'Workbooks'],
    type: 'product',
    whatsappMessage: 'Hi Unique Printers, I want to inquire about school book availability.'
  },
  {
    id: 'stationery',
    icon: '✏️',
    title: 'Stationery Items',
    desc: 'Complete A-Z stationery supplies: CR books, branded pens, art supplies, mathematical instruments, school bags, and files.',
    chips: ['Atlas & Deli', 'Casio Calculators', 'Wholesale School Sets'],
    type: 'product',
    whatsappMessage: 'Hi Unique Printers, I would like to inquire about stationery items.'
  },
  {
    id: 'printing',
    icon: '🖨️',
    title: 'Printing Works',
    desc: 'High-quality wedding invitations, birthday posters, event banners, business cards, photo prints, flyers, flex & vinyl.',
    chips: ['Gold Foil & Emboss', 'Matte & Gloss', 'Same-Day Fast Print'],
    type: 'service',
    whatsappMessage: 'Hi Unique Printers, I need custom printing for invitations / banners.'
  },
  {
    id: 'laminating',
    icon: '🛡️',
    title: 'Laminating',
    desc: 'A4, A3, and NIC/driving license ID card lamination. Heavy duty pouch & roll laminating with scratch-resistant gloss and matte finishes.',
    chips: ['NIC & ID Cards', 'A4 / A3 Documents', 'Heavy Duty Pouch'],
    type: 'service',
    whatsappMessage: 'Hi Unique Printers, do you have document and card lamination available right now?'
  },
  {
    id: 'computer',
    icon: '💻',
    title: 'Computer Work',
    desc: 'Sinhala & English document typing, color photocopy, high-resolution scanning, email service, online job applications & CV preparation.',
    chips: ['Sinhala / English Typing', 'Colour Photocopy', 'CV & Online Forms'],
    type: 'service',
    whatsappMessage: 'Hi Unique Printers, I need document typing / computer assistance.'
  }
];

export const sampleDesigns: DesignItem[] = [
  {
    id: 1,
    cat: 'Invitations',
    title: 'Waleema & Wedding Invitation',
    subtitle: 'Classic Floral • Gold Script Typography',
    image: '/assets/samples/wedding_invite_classic.jpg',
    grad: 'from-[#3a2510] via-[#b77b3d] to-[#f5d6a8]',
    tag: 'Popular',
    paperSpec: '300gsm Textured Pearl Card',
    priceNote: 'Starting from Rs. 120 / card'
  },
  {
    id: 2,
    cat: 'Invitations',
    title: 'Handcrafted Satin Ribbon Collection',
    subtitle: 'Baby Blue Silk Ribbon • Envelope Bundles',
    image: '/assets/samples/wedding_ribbon_collection.jpg',
    grad: 'from-[#1e3a5f] via-[#2a7a8a] to-[#b6e6e0]',
    tag: 'Trending',
    paperSpec: 'Frosted Vellum & Pearl Cardstock',
    priceNote: 'Custom Ribbon Finishing'
  },
  {
    id: 3,
    cat: 'Invitations',
    title: 'Lilac & Lavender Floral Keepsake',
    subtitle: '3D Foam Flower • Gold Cord Accents',
    image: '/assets/samples/purple_floral_invitation_closeup.jpg',
    grad: 'from-[#4a154b] via-[#7a1f7d] to-[#d48ad8]',
    tag: 'Best Seller',
    paperSpec: 'Glitter Lavender Board with Wax Ribbon',
    priceNote: 'Includes RSVP & Envelope'
  },
  {
    id: 4,
    cat: 'Invitations',
    title: 'Royal Gold Crest Wedding Card',
    subtitle: 'Imperial Border • Arabic & English Script',
    image: '/assets/samples/waleema_floral_invite.jpg',
    grad: 'from-[#7a1f2a] via-[#c96a5a] to-[#f8d9b0]',
    tag: 'Signature',
    paperSpec: 'Ivory Shimmer Board • Gold Foil Details',
    priceNote: 'Custom Layout & Envelope Seal'
  },
  {
    id: 5,
    cat: 'Certificates',
    title: 'Official Institute Certificate',
    subtitle: 'Gold Embossed Starburst Seal • High Res',
    image: '/assets/samples/certificate_with_seal.jpg',
    grad: 'from-[#121212] via-[#5a3a18] to-[#b77b3d]',
    tag: 'Official',
    paperSpec: '260gsm Heavy Certificate Parchment',
    priceNote: 'Bulk discounts for institutes'
  },
  {
    id: 6,
    cat: 'Invitations',
    title: 'Luxury Violet Ensemble with Envelopes',
    subtitle: 'Matching Outer Jackets & Gold Ties',
    image: '/assets/samples/purple_wedding_envelope_set.jpg',
    grad: 'from-[#2e2e2e] via-[#5e2b5c] to-[#f5f1e8]',
    tag: 'Handmade',
    paperSpec: 'Layered Pocket Fold with Ribbon Bouquet',
    priceNote: 'Full matching set available'
  },
  {
    id: 7,
    cat: 'Posters',
    title: 'Grand Opening & Promotional Poster',
    subtitle: 'A3 Glossy • Bold High Contrast Print',
    image: '',
    grad: 'from-[#ff8a3d] via-[#ffb86a] to-[#ffe9c6]',
    tag: 'New',
    paperSpec: '300gsm Art Card • Gloss Laminated',
    priceNote: 'Same-day print from Rs. 250'
  },
  {
    id: 8,
    cat: 'Business Cards',
    title: 'Executive Salon & Shop Business Card',
    subtitle: 'Matte Lamination • Rounded Corners',
    image: '',
    grad: 'from-[#1a1a1a] via-[#b77b3d] to-[#ffd7a0]',
    tag: 'Popular',
    paperSpec: '350gsm Board • Double Sided Print',
    priceNote: 'Box of 100 cards from Rs. 1,200'
  }
];

export const sampleBooks: BookItem[] = [
  {
    id: 1,
    title: 'Grade 6 Science Workbook (Sinhala/English)',
    grade: 'Grade 6',
    price: 850,
    old: 950,
    color: 'bg-[#1e3a5f]',
    accent: 'Science',
    inStock: true,
    category: 'Workbooks'
  },
  {
    id: 2,
    title: 'G.C.E O/L Mathematics 10 Years Past Papers',
    grade: 'O/L',
    price: 1200,
    old: 1350,
    color: 'bg-[#b77b3d]',
    accent: 'Maths',
    inStock: true,
    category: 'Past Papers'
  },
  {
    id: 3,
    title: 'Grade 10 English Grammar & Practice Guide',
    grade: 'Grade 10',
    price: 680,
    old: 750,
    color: 'bg-[#2d5a4a]',
    accent: 'English',
    inStock: true,
    category: 'Language'
  },
  {
    id: 4,
    title: 'Grade 5 Scholarship Model Exam Papers & Pack',
    grade: 'Grade 5',
    price: 1450,
    old: 1650,
    color: 'bg-[#6b1d2a]',
    accent: 'Scholarship',
    inStock: true,
    category: 'Exam Packs'
  },
  {
    id: 5,
    title: 'G.C.E A/L Science Past Papers with Answers',
    grade: 'A/L',
    price: 1600,
    old: 1800,
    color: 'bg-[#1f2937]',
    accent: 'Combined Maths',
    inStock: true,
    category: 'A/L Guides'
  },
  {
    id: 6,
    title: 'Grade 8 History & Geography Short Notes',
    grade: 'Grade 8',
    price: 550,
    old: null,
    color: 'bg-[#854d0e]',
    accent: 'History',
    inStock: true,
    category: 'Short Notes'
  }
];

export const stationeryList: StationeryItem[] = [
  { name: 'CR Books & Drawing Books (80 - 400 Pgs)', count: '120+ types' },
  { name: 'Ballpoint, Gel & Permanent Pens (Atlas, Deli, Pilot)', count: 'A-Z Brands' },
  { name: 'Art & Craft Supplies (Water colours, Clay, Pastels)', count: 'Full Range' },
  { name: 'Files, Box Files, Sleeves & Envelopes', count: 'All Sizes' },
  { name: 'School Bags, Water Bottles & Lunch Boxes', count: 'Latest Stock' },
  { name: 'Geometry Boxes, Protractors & Casio Scientific Calculators', count: 'Genuine' }
];

export const newArrivals: OfferItem[] = [
  {
    id: 1,
    title: 'Deli Metal Compass & Geometry Box',
    price: 1250,
    badge: 'NEW',
    icon: '📐'
  },
  {
    id: 2,
    title: 'A4 Premium Colour Printing Paper 80gsm (Pack of 100)',
    price: 450,
    badge: 'NEW',
    icon: '📄'
  },
  {
    id: 3,
    title: 'Pastel Aesthetic Highlighters (6 Pcs Set)',
    price: 890,
    badge: 'NEW',
    icon: '🖍️'
  },
  {
    id: 4,
    title: 'Hard Cover Premium CR 200 Pages (Checked & Ruled)',
    price: 580,
    badge: 'RESTOCK',
    icon: '📓'
  }
];

export const saleBundles: OfferItem[] = [
  {
    id: 1,
    title: 'School Bag + Water Bottle Combo',
    price: 3250,
    old: 4200,
    off: '22% OFF',
    icon: '🎒'
  },
  {
    id: 2,
    title: 'Complete Grade 6 Stationery Starter Bundle',
    price: 2850,
    old: 3500,
    off: '18% OFF',
    icon: '✏️'
  },
  {
    id: 3,
    title: 'A4 White Printing Paper Bundle — 5 Reams (Double A)',
    price: 5100,
    old: 6500,
    off: '21% OFF',
    icon: '📦'
  }
];
