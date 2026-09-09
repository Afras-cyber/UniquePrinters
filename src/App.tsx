import React, { useState, useEffect } from 'react';
import { AnnouncementBanner } from './components/layout/AnnouncementBanner';
import { Header } from './components/layout/Header';
import { MobileHeaderHero } from './components/layout/MobileHeaderHero';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { DesktopHero } from './components/sections/DesktopHero';
import { ServicesSection } from './components/sections/ServicesSection';
import { DesignsPortfolio } from './components/sections/DesignsPortfolio';
import { BooksSection } from './components/sections/BooksSection';
import { StationerySection } from './components/sections/StationerySection';
import { OffersSection } from './components/sections/OffersSection';
import { StatsBar } from './components/sections/StatsBar';
import { Footer } from './components/layout/Footer';
import { ImageModal } from './components/ui/ImageModal';
import { CartDrawer } from './components/ui/CartDrawer';
import { WhatsAppFloat } from './components/ui/WhatsAppFloat';
import { CartItem, DesignItem } from './types';
import { siteConfig } from './config/siteConfig';

export const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [forceDesktop, setForceDesktop] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDesign, setSelectedDesign] = useState<DesignItem | null>(null);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 'book-1', title: 'Grade 6 Science Workbook', price: 850, quantity: 1, type: 'book' },
    { id: 'book-2', title: 'G.C.E O/L Mathematics Past Papers', price: 1200, quantity: 1, type: 'book' }
  ]);

  // Screen size detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Theme synchronization
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  const handleAddToCart = (item: { id: string; title: string; price: number; type: 'book' | 'product' | 'stationery' }) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const showMobileHeader = isMobile && !forceDesktop;
  const cartTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Announcement notice if enabled in site.config.json */}
      <AnnouncementBanner />

      {/* Header View: Exact Mobile Hero on mobile; Baseline Desktop Header on Desktop */}
      {showMobileHeader ? (
        <MobileHeaderHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggleForceDesktop={() => setForceDesktop(true)}
          isForcedDesktop={forceDesktop}
        />
      ) : (
        <Header
          cartCount={cartTotalCount}
          onOpenCart={() => setCartOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          activeNav={activeTab}
          onNavClick={scrollToSection}
        />
      )}

      {/* Main Content Area */}
      <main className={showMobileHeader ? 'mobile-bottom-space' : ''}>
        {/* Desktop Hero Section: Always shown on desktop; hidden on mobile because mobile has its dedicated Hero */}
        {!showMobileHeader && (
          <div id="home">
            <DesktopHero
              onExploreServices={() => scrollToSection('services')}
              onViewDesigns={() => scrollToSection('designs')}
            />
          </div>
        )}

        {/* 1. Services Section */}
        <ServicesSection />

        {/* 2. Sample Designs & Printing Portfolio (with Real Photos from Images/) */}
        <DesignsPortfolio onSelectDesign={(design) => setSelectedDesign(design)} />

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
              onAddToCart={handleAddToCart}
            />
            <StationerySection />
          </div>
        </section>

        {/* 4. Special Offers, Countdown Banner & Sale Items */}
        <OffersSection onAddToCart={handleAddToCart} />

        {/* 5. Value Proposition & Quality Guarantee */}
        <StatsBar />

        {/* 6. Comprehensive Footer with Map Link & Shop Info */}
        <Footer onNavClick={scrollToSection} />
      </main>

      {/* Mobile Bottom Navigation (Preserved from Mobile UI PDF) */}
      {showMobileHeader && (
        <MobileBottomNav
          activeTab={activeTab}
          onTabChange={scrollToSection}
        />
      )}

      {/* Lightbox Modal for Design Preview */}
      <ImageModal
        design={selectedDesign}
        onClose={() => setSelectedDesign(null)}
      />

      {/* Slide-out Cart Drawer with WhatsApp Order Formatting */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />

      {/* Floating WhatsApp Quick Action Button */}
      {siteConfig.features.enableWhatsappFloatingButton && <WhatsAppFloat />}
    </div>
  );
};

export default App;
