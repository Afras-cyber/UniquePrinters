import React, { useEffect } from 'react';
import { DesktopHero } from '../sections/DesktopHero';
import { ServicesSection } from '../sections/ServicesSection';
import { DesignsPortfolio } from '../sections/DesignsPortfolio';
import { BooksSection } from '../sections/BooksSection';
import { StationerySection } from '../sections/StationerySection';
import { OffersSection } from '../sections/OffersSection';
import { StatsBar } from '../sections/StatsBar';
import { DesignItem } from '../../types';
import { updateSEO } from '../../lib/seo';
import { siteConfig } from '../../config/siteConfig';

interface HomePageProps {
  showDesktopHero: boolean;
  onSelectService: (serviceId: string) => void;
  onSelectDesign: (design: DesignItem) => void;
  onNavigatePage: (page: string) => void;
  onAddToCart: (item: { id: string; title: string; price: number; type: 'book' | 'product' | 'stationery' }) => void;
  searchQuery: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  showDesktopHero,
  onSelectService,
  onSelectDesign,
  onNavigatePage,
  onAddToCart,
  searchQuery
}) => {
  useEffect(() => {
    updateSEO({
      title: 'Unique Printers & Stationery | Printing, Books & Mobile Reload Wilgoda Kurunegala',
      description: 'Your premier shop for custom wedding invitation printing, school textbooks, past papers, A-Z stationery supplies, instant mobile reloads, and photocopy services in Wilgoda, Kurunegala.',
      path: '#/'
    });
  }, []);

  return (
    <>
      {/* Desktop Hero Section */}
      {showDesktopHero && (
        <div id="home">
          <DesktopHero
            onExploreServices={() => {
              const el = document.getElementById('services');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onViewDesigns={() => onNavigatePage('designs')}
          />
        </div>
      )}

      {/* 1. Services Section */}
      <ServicesSection onSelectService={onSelectService} />

      {/* 2. Sample Designs & Printing Portfolio */}
      <DesignsPortfolio
        onSelectDesign={onSelectDesign}
        onViewAllDesigns={() => onNavigatePage('designs')}
      />

      {/* 3. Books & Stationery Showcase Grid with View More Navigation */}
      <section
        id="books-stationery"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(28px, 4vw, 50px) 16px clamp(36px, 5vw, 65px) 16px'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px'
          }}
        >
          <BooksSection
            searchQuery={searchQuery}
            onAddToCart={onAddToCart}
            onViewMore={() => onNavigatePage('books')}
          />
          <StationerySection
            onViewMore={() => onNavigatePage('stationery')}
            onAddToCart={onAddToCart}
          />
        </div>
      </section>

      {/* 4. Special Offers, Countdown Banner & Sale Items */}
      <OffersSection onAddToCart={onAddToCart} />

      {/* 5. Value Proposition & Quality Guarantee */}
      <StatsBar />
    </>
  );
};
