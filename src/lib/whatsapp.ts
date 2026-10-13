import { siteConfig } from '../config/siteConfig';

export interface WhatsAppInquiryParams {
  productName: string;
  productPath: string; // e.g. '#/services/reload' or '#/books?item=2' or '#/stationery?item=3'
  price?: number;
  originalPrice?: number;
  discountPercent?: number;
  category?: string;
  customNote?: string;
}

/**
 * Builds a friendly, polite WhatsApp inquiry link with:
 * 1. Product Name
 * 2. Full Shareable Product URL
 * 3. Friendly, polite tone message
 */
export function buildProductWhatsAppUrl(params: WhatsAppInquiryParams): string {
  const cleanPath = params.productPath.startsWith('#')
    ? params.productPath
    : `#${params.productPath.startsWith('/') ? '' : '/'}${params.productPath}`;

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://uniqueprinters.lk';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const fullUrl = `${origin}${pathname}${cleanPath}`;

  let priceText = '';
  if (params.price !== undefined) {
    if (params.originalPrice && params.originalPrice > params.price) {
      priceText = `💰 Price: Rs. ${params.price.toLocaleString()} (Discounted from Rs. ${params.originalPrice.toLocaleString()}${params.discountPercent ? ` • ${params.discountPercent}% OFF` : ''})`;
    } else {
      priceText = `💰 Price: Rs. ${params.price.toLocaleString()}`;
    }
  }

  const lines = [
    `Hello Unique Printers team! 👋✨`,
    ``,
    `I was browsing your website and I'm very interested in:`,
    `📌 *${params.productName}*`,
    params.category ? `🏷️ Category: ${params.category}` : null,
    priceText || null,
    `🔗 Product Link: ${fullUrl}`,
    params.customNote ? `💬 Note: ${params.customNote}` : null,
    ``,
    `Could you please share more details and confirm availability for this item? Looking forward to hearing from you. Thank you so much! 😊`
  ].filter(Boolean) as string[];

  const fullMessage = lines.join('\n');
  const baseWaChat = siteConfig.socialMedia.whatsappChat.split('?')[0];

  return `${baseWaChat}?text=${encodeURIComponent(fullMessage)}`;
}
