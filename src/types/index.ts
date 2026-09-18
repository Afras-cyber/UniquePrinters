export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  chips: string[];
  type: 'service' | 'product';
  whatsappMessage?: string;
}

export interface DesignItem {
  id: number;
  cat: 'Invitations' | 'Posters' | 'Banners' | 'Business Cards' | 'Certificates';
  title: string;
  subtitle: string;
  image?: string;
  grad?: string;
  tag?: string;
  paperSpec?: string;
  priceNote?: string;
}

export interface BookItem {
  id: number;
  title: string;
  grade: string;
  price: number;
  old?: number | null;
  color: string;
  accent: string;
  inStock?: boolean;
  category?: string;
  image_url?: string;
  description?: string;
}

export interface StationeryItem {
  name: string;
  count: string;
  icon?: string;
  category?: string;
}

export interface OfferItem {
  id: number;
  title: string;
  price: number;
  badge?: string;
  old?: number;
  off?: string;
  image?: string;
  icon?: string;
  tag?: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  type: 'book' | 'product' | 'stationery';
}
