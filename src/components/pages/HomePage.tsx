import React from 'react';
import { DesktopHero } from '../sections/DesktopHero';
import { ServicesSection } from '../sections/ServicesSection';
import { DesignsPortfolio } from '../sections/DesignsPortfolio';
import { BooksSection } from '../sections/BooksSection';
import { StationerySection } from '../sections/StationerySection';
import { OffersSection } from '../sections/OffersSection';
import { StatsBar } from '../sections/StatsBar';
import { DesignItem } from '../../types';

interface HomePageProps {
  showDesktopHero: boolean;
  onSelectService: (serviceId: string) => void;
  onSelectDesign: (design: DesignItem) => void;
  onNavigatePage: (page: string) => void;
  onAddToCart: (item: { id: string; title: string; price: number; type: 'book' | 'product' }) => void;
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
      <DesignsPortfolio onSelectDesign={onSelectDesign} />

      {/* 3. Books & Stationery Showcase Grid */}
      <section
        id="books-stationery"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '50px 16px 65px 16px'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          <BooksSection
            searchQuery={searchQuery}
            onAddToCart={onAddToCart}
          />
          <StationerySection />
        </div>
      </section>

      {/* 4. Special Offers, Countdown Banner & Sale Items */}
      <OffersSection onAddToCart={onAddToCart} />

      {/* 5. Value Proposition & Quality Guarantee */}
      <StatsBar />
    </>
  );
};
