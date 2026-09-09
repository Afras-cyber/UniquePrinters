import React, { useState, useEffect } from 'react';
import { AnnouncementBanner } from './components/layout/AnnouncementBanner';
import { Header } from './components/layout/Header';
import { MobileHeaderHero } from './components/layout/MobileHeaderHero';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { ImageModal } from './components/ui/ImageModal';
import { CartDrawer } from './components/ui/CartDrawer';
import { WhatsAppFloat } from './components/ui/WhatsAppFloat';

// Pages
import { HomePage } from './components/pages/HomePage';
import { BooksPage } from './components/pages/BooksPage';
import { DesignsPage } from './components/pages/DesignsPage';
import { ServiceDetailPage } from './components/pages/ServiceDetailPage';

import { CartItem, DesignItem, BookItem } from './types';
import { siteConfig } from './config/siteConfig';

type Page = 'home' | 'books' | 'designs' | 'service';

export const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [forceDesktop, setForceDesktop] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('home');

  // Page routing state
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');

  // Modals
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
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

  // Keyboard shortcut: Ctrl/Cmd+K opens search
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

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
    // If we're on a sub-page, navigate home first
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        if (id === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const el = document.getElementById(id);
        if (el) {
          const offset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 300);
      return;
    }
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleNavigatePage = (page: string) => {
    if (page === 'home') {
      setCurrentPage('home');
      setActiveTab('home');
    } else if (page === 'books') {
      setCurrentPage('books');
      setActiveTab('books');
    } else if (page === 'designs') {
      setCurrentPage('designs');
      setActiveTab('designs');
    }
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentPage('service');
    setActiveTab('services');
  };

  const handleSelectDesign = (design: DesignItem) => {
    setSelectedDesign(design);
    // Optionally also navigate to designs page
  };

  const handleSelectBook = (book: BookItem) => {
    // Navigate to books page and the search will highlight it
    setCurrentPage('books');
    setActiveTab('books');
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
          onOpenSearch={() => setSearchOpen(true)}
          onToggleForceDesktop={() => setForceDesktop(true)}
          isForcedDesktop={forceDesktop}
        />
      ) : (
        <Header
          cartCount={cartTotalCount}
          onOpenCart={() => setCartOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          activeNav={activeTab}
          onNavClick={scrollToSection}
        />
      )}

      {/* Main Content Area */}
      <main className={showMobileHeader ? 'mobile-bottom-space' : ''} style={{ flex: 1 }}>
        {/* ── Page Router ── */}
        {currentPage === 'home' && (
          <>
            <HomePage
              showDesktopHero={!showMobileHeader}
              onSelectService={handleSelectService}
              onSelectDesign={handleSelectDesign}
              onNavigatePage={handleNavigatePage}
              onAddToCart={handleAddToCart}
              searchQuery=""
            />
            <Footer onNavClick={scrollToSection} />
          </>
        )}

        {currentPage === 'books' && (
          <BooksPage
            onBack={() => setCurrentPage('home')}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'designs' && (
          <DesignsPage
            onBack={() => setCurrentPage('home')}
            onSelectDesign={handleSelectDesign}
          />
        )}

        {currentPage === 'service' && (
          <ServiceDetailPage
            serviceId={selectedServiceId}
            onBack={() => setCurrentPage('home')}
            onNavigatePage={handleNavigatePage}
            onAddToCart={handleAddToCart}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation (Preserved from Mobile UI PDF) */}
      {showMobileHeader && (
        <MobileBottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            if (tab === 'designs') {
              handleNavigatePage('designs');
            } else if (tab === 'books') {
              handleNavigatePage('books');
            } else {
              scrollToSection(tab);
            }
          }}
        />
      )}

      {/* Global Search Modal (Ctrl+K or search icon click) */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectBook={handleSelectBook}
        onSelectDesign={(design) => {
          setSelectedDesign(design);
          setSearchOpen(false);
        }}
        onSelectService={(serviceId) => {
          setSearchOpen(false);
          handleSelectService(serviceId);
        }}
        onAddToCart={handleAddToCart}
      />

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
