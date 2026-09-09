export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  bgImage: string;
  heroColor: string;
  shortDesc: string;
  fullDesc: string[];
  features: Array<{ title: string; desc: string; icon: string }>;
  specs?: Array<{ label: string; value: string }>;
  carriers?: Array<{ name: string; color: string; desc: string }>;
  turnaroundTime: string;
  whatsappMessage: string;
  ctaText?: string;
  linkToPage?: { text: string; page: string };
}

export const serviceDetailsData: Record<string, ServiceDetail> = {
  reload: {
    id: 'reload',
    title: 'Instant Mobile Reload & Data Packages',
    subtitle: 'All Sri Lankan Mobile Networks & Utility Bill Payments',
    badge: 'INSTANT SERVICE • ALL NETWORKS',
    bgImage: 'linear-gradient(135deg, #1E3A5F 0%, #0F2D3D 100%)',
    heroColor: '#1E3A5F',
    shortDesc: 'Get fast, hassle-free reloads for Mobitel, Dialog, Airtel, and Hutch. We offer anytime data bundles, voice packs, and monthly bill payments with instant printed receipts.',
    fullDesc: [
      'At Unique Printers Wilgoda, we provide instant electronic reloads and recharge cards for all major telecommunication operators in Sri Lanka.',
      'Whether you need quick emergency credit, an unlimited social media pack, work-from-home data add-ons, or want to settle your monthly postpaid bills, our counter staff will process your transaction within seconds.',
      'We also support DTH TV reloads (Dialog TV, Peo TV) and pre-paid electricity/water utility payments.'
    ],
    carriers: [
      { name: 'Dialog', color: '#B91C1C', desc: 'Prepaid Reloads, 4G Anytime Data, Postpaid Bill Settle, Dialog TV' },
      { name: 'Mobitel', color: '#1D9E75', desc: 'Upahara Packages, Unlimited Data Bundles, Mobile Reloads, e-Channelling' },
      { name: 'Airtel', color: '#DC2626', desc: 'Freedom Packs, Unlimited Calling & Data, Top-ups' },
      { name: 'Hutch', color: '#D97706', desc: 'Hutch Junior, Work & Learn Packs, 4G Super Reloads' }
    ],
    features: [
      {
        title: 'Zero Waiting Time',
        desc: 'Instant e-reload machine processing direct to your number with SMS confirmation.',
        icon: '⚡'
      },
      {
        title: 'All Networks Under One Roof',
        desc: 'Never run between shops — Dialog, Mobitel, Airtel, and Hutch are always in stock.',
        icon: '📱'
      },
      {
        title: 'Printed Receipts Provided',
        desc: 'Official transaction receipt printed for peace of mind, especially on larger reload amounts.',
        icon: '🧾'
      },
      {
        title: 'Remote WhatsApp Reloads',
        desc: 'Transfer online via bank and receive instant reload without leaving your home.',
        icon: '💬'
      }
    ],
    specs: [
      { label: 'Available Networks', value: 'Dialog, Mobitel, Airtel, Hutch' },
      { label: 'Service Types', value: 'Prepaid Reload, Postpaid Bills, Data Packs, TV' },
      { label: 'Minimum Reload', value: 'Rs. 50' },
      { label: 'Operating Hours', value: '8:00 AM - 8:00 PM (7 Days a week)' }
    ],
    turnaroundTime: 'Instant (Under 60 seconds)',
    whatsappMessage: 'Hi Unique Printers, I would like to make an instant mobile reload / data top-up.',
    ctaText: 'Reload via WhatsApp'
  },

  books: {
    id: 'books',
    title: 'School Books & Educational Materials',
    subtitle: 'Textbooks, Past Papers, Workbooks & Exam Packs in Wilgoda',
    badge: 'GOVERNMENT SYLLABUS • GRADES 1-13',
    bgImage: 'linear-gradient(135deg, #B77B3D 0%, #5A3210 100%)',
    heroColor: '#B77B3D',
    shortDesc: 'We stock a comprehensive range of school books, Grade 5 scholarship revision packs, G.C.E O/L and A/L 10-year past paper collections, and student exercise workbooks.',
    fullDesc: [
      'Education is at the heart of what we do at Unique Printers. We partner with leading Sri Lankan educational publishers to ensure local students have direct access to required syllabus materials.',
      'From foundational Grade 1-5 learning aids to comprehensive G.C.E. Advanced Level model papers and short notes, we keep books in stock year-round.',
      'Browse our books online or visit our shop in Wilgoda, Kurunegala to pick up what you need today.'
    ],
    features: [
      {
        title: 'Grade 5 Scholarship Packs',
        desc: 'Model papers, IQ books, Tamil/Sinhala language guides, and timed practice tests.',
        icon: '🎒'
      },
      {
        title: 'O/L & A/L 10-Year Past Papers',
        desc: 'Subject-wise past paper collections with marking schemes and model answers.',
        icon: '📚'
      },
      {
        title: 'Exercise & Workbooks',
        desc: 'Science workbooks, English grammar drills, and Mathematics problem sets.',
        icon: '✏️'
      },
      {
        title: 'School Bulk Discounts',
        desc: 'Special bulk rates for teachers, tuition masters, and school libraries.',
        icon: '🏫'
      }
    ],
    specs: [
      { label: 'Grades Covered', value: 'Grade 1 to Grade 13 (Scholarship, O/L, A/L)' },
      { label: 'Languages', value: 'Sinhala & English Medium' },
      { label: 'Publisher Lines', value: 'Atlas, Godage, M.D. Gunasena, Educational Publications' },
      { label: 'Stock Status', value: 'Wilgoda In-Shop Stock' }
    ],
    turnaroundTime: 'Available immediately in-store',
    whatsappMessage: 'Hi Unique Printers, I want to inquire about school book availability and prices.',
    ctaText: 'Inquire on WhatsApp',
    linkToPage: {
      text: 'Go to Bookshelf / Browse All Books →',
      page: 'books'
    }
  },

  stationery: {
    id: 'stationery',
    title: 'Complete A-Z Stationery & School Supplies',
    subtitle: 'From Everyday CR Books to Premium Geometry & Art Supplies',
    badge: 'A-Z BRANDS • ATLAS, DELI, CASIO',
    bgImage: 'linear-gradient(135deg, #2D5A4A 0%, #153328 100%)',
    heroColor: '#2D5A4A',
    shortDesc: 'Quality stationery for students, teachers, artists, and offices. We carry genuine brands with wholesale rates available for institutions.',
    fullDesc: [
      'Unique Printers maintains a fully-stocked stationery showroom in Wilgoda with pens, notebooks, files, adhesives, compass boxes, and school bags.',
      'Whether you are preparing a student for the new school term or stocking an office with printing paper and filing systems, we have everything ready.',
      'Wholesale orders and customized school supply packages are welcomed with door-to-door delivery in Kurunegala district.'
    ],
    features: [
      {
        title: 'CR & Ruled Books',
        desc: '80 to 400 pages, hard cover and soft cover, single rule, square rule, and blank.',
        icon: '📓'
      },
      {
        title: 'Writing & Art Instruments',
        desc: 'Gel pens, ballpoints, pastel highlighters, watercolors, clay, and sketchbooks.',
        icon: '🎨'
      },
      {
        title: 'Mathematical Geometry Sets',
        desc: 'Deli metal compass sets, Casio scientific calculators with warranty.',
        icon: '📐'
      },
      {
        title: 'School Bags & Water Bottles',
        desc: 'Durable, waterproof bags and BPA-free bottles for primary and secondary students.',
        icon: '🎒'
      }
    ],
    specs: [
      { label: 'Brand Portfolio', value: 'Atlas, Deli, Casio, Pilot, Mango, Nataraj' },
      { label: 'Office Supplies', value: 'A4 Reams, Box Files, Envelopes, Stamps' },
      { label: 'Wholesale Discount', value: 'Available on orders over Rs. 10,000' }
    ],
    turnaroundTime: 'Available in-store',
    whatsappMessage: 'Hi Unique Printers, I would like to inquire about stationery supplies / school bulk pricing.',
    ctaText: 'Inquire Stationery on WhatsApp'
  },

  printing: {
    id: 'printing',
    title: 'Custom Printing Works & Graphic Design',
    subtitle: 'Wedding Invitations, Posters, Banners, Business Cards & Flyers',
    badge: 'PREMIUM COLOR PRINTING • SAME-DAY OPTIONS',
    bgImage: 'linear-gradient(135deg, #6B1D2A 0%, #3D0D15 100%)',
    heroColor: '#6B1D2A',
    shortDesc: 'Elevate your special moments and business promotions with high-precision printing, gold foil finishes, ribbon ties, and heavy board stocks.',
    fullDesc: [
      'Our printing department produces bespoke wedding invitations, Waleema ceremony cards, birthday posters, event banners, and corporate business cards.',
      'We work with 260gsm to 350gsm premium textured cardstocks, pearl shimmer boards, frosted vellums, and glossy art papers.',
      'Our in-house design team can customize an existing template or create a 100% unique design tailored to your vision.'
    ],
    features: [
      {
        title: 'Custom Wedding & Waleema Cards',
        desc: 'Gold foil stamping, laser die-cut borders, satin ribbons, and floral bouquets.',
        icon: '💌'
      },
      {
        title: 'Posters & Large Format Vinyl',
        desc: 'A4, A3, and large vinyl banners with vibrant, weather-resistant inks.',
        icon: '🖼️'
      },
      {
        title: 'Executive Business Cards',
        desc: 'Matte & gloss laminated 350gsm cards, spot UV highlights, and rounded edges.',
        icon: '💼'
      },
      {
        title: 'Certificates & Diplomas',
        desc: 'Formal parchment printing with embossed starburst gold seals.',
        icon: '📜'
      }
    ],
    specs: [
      { label: 'Paper Weights', value: '80gsm to 350gsm (Board, Pearl, Vellum, Matte)' },
      { label: 'Finishing Options', value: 'Gold Foil, Emboss, Ribbon Tie, Gloss / Matte Lamination' },
      { label: 'Turnaround', value: 'Same-day for posters & cards; 2-4 days for luxury invites' }
    ],
    turnaroundTime: 'Same-day to 3 days depending on quantity',
    whatsappMessage: 'Hi Unique Printers, I need a quotation for custom printing works (invitations / posters / cards).',
    ctaText: 'Request Print Quote',
    linkToPage: {
      text: 'View Sample Designs & Invitations →',
      page: 'designs'
    }
  },

  laminating: {
    id: 'laminating',
    title: 'Document & ID Card Laminating Service',
    subtitle: 'Protect Your Vital Certificates, NIC Cards & Documents',
    badge: 'HEAVY-DUTY POUCH • SCRATCH RESISTANT',
    bgImage: 'linear-gradient(135deg, #0F2D3D 0%, #1A1A1A 100%)',
    heroColor: '#0F2D3D',
    shortDesc: 'Keep your birth certificates, educational degrees, vehicle permits, and National Identity Cards waterproof, tamper-proof, and preserved for decades.',
    fullDesc: [
      'We use professional thermal pouch and roll laminators with high-grade micron films that seal your documents permanently without bubbling or peeling.',
      'Available in both high-gloss finish for vivid contrast and matte finish for glare-free readability.',
      'Bring your document in and have it laminated securely while you wait.'
    ],
    features: [
      {
        title: 'NIC & Driving License Pouch',
        desc: 'Card-sized rigid pouches that fit standard wallets with smooth edge sealing.',
        icon: '🪪'
      },
      {
        title: 'A4 & A3 Document Sealing',
        desc: 'Perfect for certificates, engineering drawings, menu cards, and notices.',
        icon: '📄'
      },
      {
        title: 'Gloss & Matte Finishes',
        desc: 'Choose glossy for vibrant photo protection or matte to prevent glare under lights.',
        icon: '✨'
      },
      {
        title: 'Waterproof & UV Protected',
        desc: 'Prevents fading, moisture damage, tears, and oil stains.',
        icon: '🛡️'
      }
    ],
    specs: [
      { label: 'Supported Sizes', value: 'NIC, Driving License, A5, A4, A3, Custom' },
      { label: 'Thickness Options', value: '80 micron, 125 micron, 250 micron heavy duty' },
      { label: 'Processing Time', value: 'Under 5 minutes while you wait' }
    ],
    turnaroundTime: 'Immediate (2 - 5 mins)',
    whatsappMessage: 'Hi Unique Printers, do you have laminating service available today?',
    ctaText: 'Inquire on WhatsApp'
  },

  computer: {
    id: 'computer',
    title: 'Computer Work, Typing & Online Services',
    subtitle: 'Sinhala & English Document Typing, Scanning, Photocopy & CVs',
    badge: 'SINHALA / ENGLISH TYPING • CV PREPARATION',
    bgImage: 'linear-gradient(135deg, #3A2510 0%, #121212 100%)',
    heroColor: '#3A2510',
    shortDesc: 'Fast typing, clear color and B&W photocopying, high-resolution scanning to email/USB, CV preparation, and assistance with online government and exam forms.',
    fullDesc: [
      'Need a letter typed in Sinhala or English? Preparing a professional Curriculum Vitae (CV) for a job application? Applying online for university or foreign exams?',
      'Our experienced computer operators provide accurate document formatting, layout design, and fast scanning to PDF.',
      'High-speed digital copiers ensure sharp text and accurate photo duplication at very affordable per-page rates.'
    ],
    features: [
      {
        title: 'Bilingual Document Typing',
        desc: 'Professional typing in Sinhala (Unicode / FM fonts) and English with proofreading.',
        icon: '⌨️'
      },
      {
        title: 'Professional CV / Resume Design',
        desc: 'Modern ATS-friendly resume templates customized for your career path.',
        icon: '💼'
      },
      {
        title: 'Scan to Email / WhatsApp / USB',
        desc: 'High-res color scans saved to PDF or JPEG and sent directly to your destination.',
        icon: '📧'
      },
      {
        title: 'Online Application Submissions',
        desc: 'Government exam forms, passport appointments, job portals, and university registrations.',
        icon: '🌐'
      }
    ],
    specs: [
      { label: 'Photocopy Types', value: 'Black & White and Full Color (A4, A3, Legal)' },
      { label: 'Typing Languages', value: 'Sinhala, English, Tamil' },
      { label: 'Digital Transfer', value: 'Direct email, WhatsApp send, Bluetooth, Flash drive' }
    ],
    turnaroundTime: 'While you wait or same-day',
    whatsappMessage: 'Hi Unique Printers, I need assistance with document typing / CV creation / computer work.',
    ctaText: 'Inquire on WhatsApp'
  }
};
