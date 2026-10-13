import { create } from 'zustand';
import { 
  BookItem, 
  DesignItem, 
  StationeryItem, 
  OfferItem, 
  ServiceItem, 
  CustomerEnquiry 
} from '../types';
import { 
  sampleBooks, 
  sampleDesigns, 
  servicesData, 
  newArrivals, 
  saleBundles 
} from '../data/sampleData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const STORAGE_KEY = 'unique_printers_crm_db_v2';

// Initial Stationery catalog
const initialStationery: StationeryItem[] = [
  {
    id: 'stat-1',
    name: 'Atlas CR Book 80 Pages (Single Rule)',
    category: 'CR Books & Notebooks',
    price: 180,
    oldPrice: 220,
    discountPercent: 18,
    count: 'In Stock',
    icon: '📓',
    description: 'High quality 70gsm smooth white paper with durable laminated cover. Essential for school students.',
    inStock: true
  },
  {
    id: 'stat-2',
    name: 'Atlas CR Book 120 Pages (Square Rule)',
    category: 'CR Books & Notebooks',
    price: 260,
    oldPrice: 300,
    discountPercent: 13,
    count: 'In Stock',
    icon: '📓',
    description: 'Ideal for mathematics and graphs. Clean grid lines and heavy-duty binding.',
    inStock: true
  },
  {
    id: 'stat-3',
    name: 'Atlas Chooty Blue Ballpoint Pen (Pack of 10)',
    category: 'Pens & Writing',
    price: 350,
    oldPrice: 400,
    discountPercent: 12,
    count: 'Box of 10',
    icon: '🖊️',
    description: '0.5mm ultra-fine ballpoint pens with quick-dry waterproof ink. Smooth handwriting flow.',
    inStock: true
  },
  {
    id: 'stat-4',
    name: 'Deli Smooth Gel Ink Pen Set (0.7mm Black/Blue/Red)',
    category: 'Pens & Writing',
    price: 480,
    oldPrice: 600,
    discountPercent: 20,
    count: '3 Pens',
    icon: '✒️',
    description: 'Ergonomic rubber grip and Japanese gel ink technology. smudge-free writing.',
    inStock: true
  },
  {
    id: 'stat-5',
    name: 'Casio FX-991ES Plus 2nd Edition Scientific Calculator',
    category: 'Geometry & Math',
    price: 7850,
    oldPrice: 9200,
    discountPercent: 15,
    count: 'Original Genuine',
    icon: '🧮',
    description: 'Official 417 functions Natural Textbook Display calculator for G.C.E O/L, A/L and University engineering students.',
    inStock: true
  },
  {
    id: 'stat-6',
    name: 'Maped Complete Metal Geometry Instrument Box',
    category: 'Geometry & Math',
    price: 1450,
    oldPrice: 1750,
    discountPercent: 17,
    count: '10 Pcs Set',
    icon: '📐',
    description: 'Sturdy metal tin with precision compass, divider, 15cm ruler, 180-degree protractor, set squares and pencil.',
    inStock: true
  },
  {
    id: 'stat-7',
    name: 'Camel 24 Shades Oil Pastels Set',
    category: 'Art & Craft',
    price: 950,
    oldPrice: 1100,
    discountPercent: 14,
    count: '24 Colors',
    icon: '🎨',
    description: 'Rich vivid pigments, non-toxic and blendable colors suitable for school art competitions and creative projects.',
    inStock: true
  },
  {
    id: 'stat-8',
    name: 'A4 Premium Color Bristol Board Assorted (Pack of 25)',
    category: 'Art & Craft',
    price: 650,
    oldPrice: 750,
    discountPercent: 13,
    count: '25 Sheets',
    icon: '📄',
    description: 'Heavy 180gsm cardstock in pastel and vibrant colors. Perfect for school assignments and models.',
    inStock: true
  },
  {
    id: 'stat-9',
    name: 'Heavy Duty Lever Arch Box File (A4 Size)',
    category: 'Office & Filing',
    price: 750,
    oldPrice: 850,
    discountPercent: 12,
    count: 'In Stock',
    icon: '📁',
    description: 'Metal reinforced edges with label holder and strong lock-spring mechanism for documents.',
    inStock: true
  },
  {
    id: 'stat-10',
    name: 'Double A A4 80gsm Copier Paper Ream (500 Sheets)',
    category: 'Office & Filing',
    price: 1850,
    oldPrice: 2100,
    discountPercent: 12,
    count: '500 Sheets',
    icon: '📦',
    description: 'World-renowned high opacity white paper for sharp printing and photocopying.',
    inStock: true
  }
];

// Initial Offers combining arrivals and bundles
const initialOffers: OfferItem[] = [
  ...newArrivals.map((arr) => ({
    ...arr,
    isActive: true,
    discountPercent: 10,
    category: 'New Arrival',
    description: 'Brand new stock just arrived at our Wilgoda counter.'
  })),
  ...saleBundles.map((b) => ({
    ...b,
    isActive: true,
    discountPercent: b.off ? parseInt(b.off.replace(/[^0-9]/g, '')) || 20 : 20,
    category: 'Discount Bundle',
    promoCode: 'SCHOOL20',
    description: 'Limited-time special bundle package with guaranteed savings.'
  }))
];

interface ShopState {
  // 1. School Books
  books: BookItem[];
  bookCategories: string[];
  addBook: (book: Omit<BookItem, 'id'>) => void;
  updateBook: (id: number, book: Partial<BookItem>) => void;
  deleteBook: (id: number) => void;

  // 2. Sample Designs & Printing Works
  designs: DesignItem[];
  designCategories: string[];
  addDesign: (design: Omit<DesignItem, 'id'>) => void;
  updateDesign: (id: number, design: Partial<DesignItem>) => void;
  deleteDesign: (id: number) => void;
  addDesignCategory: (category: string) => void;
  updateDesignCategory: (oldCategory: string, newCategory: string) => void;
  deleteDesignCategory: (category: string) => void;

  // 3. Stationery Items
  stationeryItems: StationeryItem[];
  stationeryCategories: string[];
  addStationery: (item: Omit<StationeryItem, 'id'>) => void;
  updateStationery: (id: string | number, item: Partial<StationeryItem>) => void;
  deleteStationery: (id: string | number) => void;
  addStationeryCategory: (category: string) => void;

  // 4. Offers & Promos
  offers: OfferItem[];
  addOffer: (offer: Omit<OfferItem, 'id'>) => void;
  updateOffer: (id: number, offer: Partial<OfferItem>) => void;
  toggleOfferActive: (id: number) => void;
  deleteOffer: (id: number) => void;

  // 5. Services Registry
  services: ServiceItem[];
  updateService: (id: string, partial: Partial<ServiceItem>) => void;

  // 6. Customer Enquiries
  enquiries: CustomerEnquiry[];
  addEnquiry: (enquiry: Omit<CustomerEnquiry, 'id' | 'created_at'>) => void;
  updateEnquiryStatus: (id: string, status: 'pending' | 'contacted' | 'completed') => void;
  deleteEnquiry: (id: string) => void;

  // Sync / Reset
  resetToDefaults: () => void;
}

// Load persisted state or defaults
function loadPersistedState() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Could not read persisted shop store:', err);
    return null;
  }
}

function saveState(state: Partial<ShopState>) {
  if (typeof window === 'undefined') return;
  try {
    const payload = {
      books: state.books,
      bookCategories: state.bookCategories,
      designs: state.designs,
      designCategories: state.designCategories,
      stationeryItems: state.stationeryItems,
      stationeryCategories: state.stationeryCategories,
      offers: state.offers,
      services: state.services,
      enquiries: state.enquiries
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn('Could not persist shop store:', err);
  }
}

const saved = loadPersistedState();

export const useShopStore = create<ShopState>((set, get) => ({
  // Books
  books: saved?.books || sampleBooks.map((b) => {
    const discount = b.old && b.old > b.price 
      ? Math.round(((b.old - b.price) / b.old) * 100) 
      : 0;
    return { ...b, discountPercent: discount };
  }),
  bookCategories: saved?.bookCategories || [
    'Workbooks', 
    'Past Papers', 
    'Exam Packs', 
    'Language', 
    'Short Notes', 
    'A/L Guides',
    'Scholarship Packs',
    'General'
  ],
  addBook: (bookData) => {
    const id = Date.now();
    let price = bookData.price;
    let old = bookData.old || null;
    if (bookData.discountPercent && bookData.discountPercent > 0) {
      if (!old || old <= price) {
        old = price;
        price = Math.round(price * (1 - bookData.discountPercent / 100));
      }
    }
    const newBook: BookItem = {
      id,
      ...bookData,
      price,
      old,
      inStock: bookData.inStock !== false
    };
    set((state) => {
      const updated = [newBook, ...state.books];
      saveState({ ...state, books: updated });
      return { books: updated };
    });
    // Async Supabase sync attempt
    if (isSupabaseConfigured) {
      (async () => {
        try {
          await supabase.from('books').insert([newBook]);
        } catch (e) {
          console.log('Supabase sync notice:', e);
        }
      })();
    }
  },
  updateBook: (id, partial) => {
    set((state) => {
      const updated = state.books.map((b) => {
        if (b.id !== id) return b;
        const merged = { ...b, ...partial };
        // Recalculate discount if discountPercent changed
        if (partial.discountPercent !== undefined && partial.discountPercent > 0) {
          const base = merged.old || merged.price;
          merged.old = base;
          merged.price = Math.round(base * (1 - partial.discountPercent / 100));
        }
        return merged;
      });
      saveState({ ...state, books: updated });
      return { books: updated };
    });
    if (isSupabaseConfigured) {
      (async () => {
        try {
          await supabase.from('books').update(partial).eq('id', id);
        } catch (e) {
          console.log('Supabase update notice:', e);
        }
      })();
    }
  },
  deleteBook: (id) => {
    set((state) => {
      const updated = state.books.filter((b) => b.id !== id);
      saveState({ ...state, books: updated });
      return { books: updated };
    });
    if (isSupabaseConfigured) {
      (async () => {
        try {
          await supabase.from('books').delete().eq('id', id);
        } catch (e) {
          console.log('Supabase delete notice:', e);
        }
      })();
    }
  },

  // Sample Designs & Printing Works
  designs: saved?.designs || sampleDesigns.map((d) => ({
    ...d,
    price: 150,
    originalPrice: 180,
    discountPercent: 15,
    inStock: true
  })),
  designCategories: saved?.designCategories || [
    'Invitations',
    'Posters',
    'Banners',
    'Business Cards',
    'Certificates',
    'Labels & Stickers'
  ],
  addDesign: (designData) => {
    const id = Date.now();
    const newDesign: DesignItem = {
      id,
      ...designData,
      price: designData.price || 150,
      inStock: designData.inStock !== false
    };
    set((state) => {
      const updated = [newDesign, ...state.designs];
      // Auto register category if new
      let cats = state.designCategories;
      if (designData.cat && !cats.includes(designData.cat)) {
        cats = [...cats, designData.cat];
      }
      saveState({ ...state, designs: updated, designCategories: cats });
      return { designs: updated, designCategories: cats };
    });
  },
  updateDesign: (id, partial) => {
    set((state) => {
      const updated = state.designs.map((d) => (d.id === id ? { ...d, ...partial } : d));
      saveState({ ...state, designs: updated });
      return { designs: updated };
    });
  },
  deleteDesign: (id) => {
    set((state) => {
      const updated = state.designs.filter((d) => d.id !== id);
      saveState({ ...state, designs: updated });
      return { designs: updated };
    });
  },
  addDesignCategory: (category) => {
    const trimmed = category.trim();
    if (!trimmed) return;
    set((state) => {
      if (state.designCategories.includes(trimmed)) return state;
      const updated = [...state.designCategories, trimmed];
      saveState({ ...state, designCategories: updated });
      return { designCategories: updated };
    });
  },
  updateDesignCategory: (oldCat, newCat) => {
    const trimmed = newCat.trim();
    if (!trimmed || oldCat === trimmed) return;
    set((state) => {
      const cats = state.designCategories.map((c) => (c === oldCat ? trimmed : c));
      const designs = state.designs.map((d) => (d.cat === oldCat ? { ...d, cat: trimmed } : d));
      saveState({ ...state, designCategories: cats, designs });
      return { designCategories: cats, designs };
    });
  },
  deleteDesignCategory: (category) => {
    set((state) => {
      const cats = state.designCategories.filter((c) => c !== category);
      // Remap any designs under this category to 'General' or first category
      const fallback = cats[0] || 'General';
      const designs = state.designs.map((d) => (d.cat === category ? { ...d, cat: fallback } : d));
      saveState({ ...state, designCategories: cats, designs });
      return { designCategories: cats, designs };
    });
  },

  // Stationery
  stationeryItems: saved?.stationeryItems || initialStationery,
  stationeryCategories: saved?.stationeryCategories || [
    'CR Books & Notebooks',
    'Pens & Writing',
    'Geometry & Math',
    'Art & Craft',
    'Office & Filing',
    'School Bags & Accessories'
  ],
  addStationery: (itemData) => {
    const id = `stat-${Date.now()}`;
    let price = Number(itemData.price) || 0;
    let oldPrice: number | null = itemData.oldPrice ? Number(itemData.oldPrice) : null;
    if (itemData.discountPercent && itemData.discountPercent > 0) {
      if (!oldPrice || oldPrice <= price) {
        oldPrice = price;
        price = Math.round(price * (1 - itemData.discountPercent / 100));
      }
    }
    const newItem: StationeryItem = {
      id,
      ...itemData,
      category: itemData.category || 'CR Books & Notebooks',
      price,
      oldPrice,
      inStock: itemData.inStock !== false
    };
    set((state) => {
      const updated = [newItem, ...state.stationeryItems];
      let cats = state.stationeryCategories;
      if (itemData.category && !cats.includes(itemData.category)) {
        cats = [...cats, itemData.category];
      }
      saveState({ ...state, stationeryItems: updated, stationeryCategories: cats });
      return { stationeryItems: updated, stationeryCategories: cats };
    });
  },
  updateStationery: (id, partial) => {
    set((state) => {
      const updated = state.stationeryItems.map((item) => {
        if (item.id !== id) return item;
        const merged = { ...item, ...partial };
        if (partial.discountPercent !== undefined && partial.discountPercent > 0) {
          const base = Number(merged.oldPrice || merged.price) || 0;
          merged.oldPrice = base;
          merged.price = Math.round(base * (1 - partial.discountPercent / 100));
        }
        return merged;
      });
      saveState({ ...state, stationeryItems: updated });
      return { stationeryItems: updated };
    });
  },
  deleteStationery: (id) => {
    set((state) => {
      const updated = state.stationeryItems.filter((item) => item.id !== id);
      saveState({ ...state, stationeryItems: updated });
      return { stationeryItems: updated };
    });
  },
  addStationeryCategory: (category) => {
    const trimmed = category.trim();
    if (!trimmed) return;
    set((state) => {
      if (state.stationeryCategories.includes(trimmed)) return state;
      const updated = [...state.stationeryCategories, trimmed];
      saveState({ ...state, stationeryCategories: updated });
      return { stationeryCategories: updated };
    });
  },

  // Offers
  offers: saved?.offers || initialOffers,
  addOffer: (offerData) => {
    const id = Date.now();
    let price = offerData.price;
    let old = offerData.old;
    if (offerData.discountPercent && offerData.discountPercent > 0) {
      if (!old || old <= price) {
        old = price;
        price = Math.round(price * (1 - offerData.discountPercent / 100));
      }
    }
    const newOffer: OfferItem = {
      id,
      ...offerData,
      price,
      old,
      isActive: offerData.isActive !== false
    };
    set((state) => {
      const updated = [newOffer, ...state.offers];
      saveState({ ...state, offers: updated });
      return { offers: updated };
    });
  },
  updateOffer: (id, partial) => {
    set((state) => {
      const updated = state.offers.map((o) => {
        if (o.id !== id) return o;
        const merged = { ...o, ...partial };
        if (partial.discountPercent !== undefined && partial.discountPercent > 0) {
          const base = merged.old || merged.price;
          merged.old = base;
          merged.price = Math.round(base * (1 - partial.discountPercent / 100));
        }
        return merged;
      });
      saveState({ ...state, offers: updated });
      return { offers: updated };
    });
  },
  toggleOfferActive: (id) => {
    set((state) => {
      const updated = state.offers.map((o) => (o.id === id ? { ...o, isActive: !o.isActive } : o));
      saveState({ ...state, offers: updated });
      return { offers: updated };
    });
  },
  deleteOffer: (id) => {
    set((state) => {
      const updated = state.offers.filter((o) => o.id !== id);
      saveState({ ...state, offers: updated });
      return { offers: updated };
    });
  },

  // Services
  services: saved?.services || servicesData.map((s) => ({
    ...s,
    slug: s.id,
    active: true
  })),
  updateService: (id, partial) => {
    set((state) => {
      const updated = state.services.map((s) => (s.id === id ? { ...s, ...partial } : s));
      saveState({ ...state, services: updated });
      return { services: updated };
    });
  },

  // Enquiries
  enquiries: saved?.enquiries || [
    {
      id: 'enq-1',
      name: 'Nimal Jayawardena',
      phone: '077 123 4567',
      serviceType: 'Printing Works',
      notes: 'Need 150 gold foil wedding invitation cards printed with RSVP cards by next Friday.',
      created_at: '2026-09-27T10:30:00Z',
      status: 'pending'
    },
    {
      id: 'enq-2',
      name: 'Kavindi Perera',
      phone: '071 987 6543',
      serviceType: 'School Books Selling',
      notes: 'Looking for Grade 10 Mathematics and Science English medium workbooks.',
      created_at: '2026-09-26T15:12:00Z',
      status: 'contacted'
    }
  ],
  addEnquiry: (enqData) => {
    const newEnq: CustomerEnquiry = {
      id: `enq-${Date.now()}`,
      created_at: new Date().toISOString(),
      status: 'pending',
      ...enqData
    };
    set((state) => {
      const updated = [newEnq, ...state.enquiries];
      saveState({ ...state, enquiries: updated });
      return { enquiries: updated };
    });
    if (isSupabaseConfigured) {
      (async () => {
        try {
          await supabase.from('enquiries').insert([newEnq]);
        } catch (e) {
          console.log('Enquiry sync notice:', e);
        }
      })();
    }
  },
  updateEnquiryStatus: (id, status) => {
    set((state) => {
      const updated = state.enquiries.map((e) => (e.id === id ? { ...e, status } : e));
      saveState({ ...state, enquiries: updated });
      return { enquiries: updated };
    });
  },
  deleteEnquiry: (id) => {
    set((state) => {
      const updated = state.enquiries.filter((e) => e.id !== id);
      saveState({ ...state, enquiries: updated });
      return { enquiries: updated };
    });
  },

  resetToDefaults: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    set({
      books: sampleBooks,
      designs: sampleDesigns,
      stationeryItems: initialStationery,
      offers: initialOffers,
      services: servicesData
    });
  }
}));
