export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  chips: string[];
  type: 'service' | 'product';
  whatsappMessage?: string;
  slug?: string;
  badge?: string;
  active?: boolean;
}

export interface DesignItem {
  id: number;
  cat: string;
  title: string;
  subtitle: string;
  image?: string;
  grad?: string;
  tag?: string;
  paperSpec?: string;
  priceNote?: string;
  price?: number;
  discountPercent?: number;
  originalPrice?: number;
  inStock?: boolean;
}

export interface BookItem {
  id: number;
  title: string;
  grade: string;
  price: number;
  old?: number | null;
  discountPercent?: number;
  color: string;
  accent: string;
  inStock?: boolean;
  category?: string;
  image_url?: string;
  description?: string;
}

export interface StationeryItem {
  id: string | number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number | null;
  discountPercent?: number;
  count?: string;
  icon?: string;
  image?: string;
  description?: string;
  inStock: boolean;
}

export interface OfferItem {
  id: number;
  title: string;
  price: number;
  old?: number;
  badge?: string;
  off?: string;
  image?: string;
  icon?: string;
  tag?: string;
  isActive: boolean;
  discountPercent?: number;
  promoCode?: string;
  description?: string;
  validUntil?: string;
  category?: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  type: 'book' | 'product' | 'stationery';
  image?: string;
}

export interface CustomerEnquiry {
  id: string;
  name: string;
  phone: string;
  serviceType: string;
  notes: string;
  created_at?: string;
  status?: 'pending' | 'contacted' | 'completed';
}
