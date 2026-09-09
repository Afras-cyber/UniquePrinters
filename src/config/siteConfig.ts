import rawConfig from '../../site.config.json';

export interface ShopConfig {
  name: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  currency: string;
  locale: string;
}

export interface ContactConfig {
  phone: string;
  whatsapp: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    province: string;
    country: string;
    mapUrl: string;
  };
  businessHours: {
    monToFri: string;
    saturday: string;
    sunday: string;
  };
}

export interface SocialConfig {
  facebook: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  whatsappChat: string;
  whatsappMessage: string;
}

export interface AnnouncementConfig {
  enabled: boolean;
  message: string;
  type: 'info' | 'urgent';
  startDate: string;
  endDate: string;
  dismissible: boolean;
}

export interface SiteConfig {
  shop: ShopConfig;
  contact: ContactConfig;
  socialMedia: SocialConfig;
  announcement: AnnouncementConfig;
  categories: Array<{ name: string; type: string }>;
  features: {
    showOffersBanner: boolean;
    showSocialLinksInFooter: boolean;
    enableDarkModeToggle: boolean;
    enableWhatsappFloatingButton: boolean;
  };
}

export const siteConfig: SiteConfig = {
  ...rawConfig,
  shop: {
    ...rawConfig.shop,
    name: "Unique Printers",
    tagline: "Printers, Stationery & Books for Everyone",
    logoUrl: "/assets/logo.png"
  },
  contact: {
    ...rawConfig.contact,
    phone: "+94 77 123 4567",
    whatsapp: "+94 77 123 4567",
    email: "unique.printers.wilgoda@gmail.com",
    address: {
      line1: "Main Road, Wilgoda",
      line2: "Near Wilgoda Junction",
      city: "Kurunegala",
      province: "North Western Province",
      country: "Sri Lanka",
      mapUrl: "https://maps.google.com/?q=Wilgoda+Kurunegala+Unique+Printers"
    },
    businessHours: {
      monToFri: "8:00 AM - 8:00 PM",
      saturday: "8:00 AM - 8:00 PM",
      sunday: "8:00 AM - 1:00 PM"
    }
  },
  socialMedia: {
    ...rawConfig.socialMedia,
    whatsappChat: "https://wa.me/94771234567",
    whatsappMessage: "Hi Unique Printers, I would like to inquire about printing / stationery services."
  }
} as SiteConfig;

export default siteConfig;
