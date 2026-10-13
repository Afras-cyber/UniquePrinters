import { siteConfig } from '../config/siteConfig';

export interface SEOProps {
  title: string;
  description: string;
  path: string; // e.g. '#/services/reload' or '#/books'
  image?: string;
  type?: 'website' | 'article' | 'product';
  jsonLd?: Record<string, any>;
}

/**
 * Dynamically applies SEO metadata to the DOM:
 * - document.title
 * - meta[name="description"]
 * - OpenGraph tags (title, description, url, image, type)
 * - Canonical link
 * - Schema.org JSON-LD structured data for Google Search
 */
export function updateSEO({
  title,
  description,
  path,
  image,
  type = 'website',
  jsonLd
}: SEOProps): void {
  if (typeof document === 'undefined') return;

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://uniqueprinters.lk';
  const fullTitle = `${title} | ${siteConfig.shop.name}`;
  const fullUrl = `${origin}${path.startsWith('/') ? path : `/${path}`}`;
  const defaultImage = `${origin}/assets/logo.png`;
  const shareImage = image ? (image.startsWith('http') ? image : `${origin}${image}`) : defaultImage;

  // 1. Update Title
  document.title = fullTitle;

  // 2. Helper to set or create meta tag
  const setMetaTag = (attrName: string, attrVal: string, content: string) => {
    let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Standard Description
  setMetaTag('name', 'description', description);

  // Open Graph
  setMetaTag('property', 'og:title', fullTitle);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:url', fullUrl);
  setMetaTag('property', 'og:image', shareImage);
  setMetaTag('property', 'og:type', type);
  setMetaTag('property', 'og:site_name', siteConfig.shop.name);

  // Twitter Card
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', fullTitle);
  setMetaTag('name', 'twitter:description', description);
  setMetaTag('name', 'twitter:image', shareImage);

  // Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', fullUrl);

  // Structured Data (JSON-LD)
  let script = document.getElementById('seo-json-ld') as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = 'seo-json-ld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.shop.name,
    description: siteConfig.shop.tagline,
    url: origin,
    telephone: siteConfig.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${siteConfig.contact.address.line1}, ${siteConfig.contact.address.line2}`,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.province,
      addressCountry: siteConfig.contact.address.country
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '22:00'
      }
    ]
  };

  script.textContent = JSON.stringify(jsonLd || defaultStructuredData, null, 2);
}
