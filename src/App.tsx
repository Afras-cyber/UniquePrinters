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
import { StationeryPage } from './components/pages/StationeryPage';
import { DesignsPage } from './components/pages/DesignsPage';
import { ServiceDetailPage } from './components/pages/ServiceDetailPage';
import { AdminPage } from './components/pages/AdminPage';

import { CartItem, DesignItem, BookItem } from './types';
import { siteConfig } from './config/siteConfig';
import { useShopStore } from './store/shopStore';

type Page = 'home' | 'books' | 'stationery' | 'designs' | 'service' | 'admin';

export const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [forceDesktop, setForceDesktop] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('home');

  // Page routing state
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('reload');

  // Modals
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [selectedDesign, setSelectedDesign] = useState<DesignItem | null>(null);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 'book-1', title: 'Grade 6 Science Workbook', price: 850, quantity: 1, type: 'book' },
    { id: 'book-2', title: 'G.C.E O/L Mathematics Past Papers', price: 1200, quantity: 1, type: 'book' }
  ]);

  // Handle URL hash changes (SEO-friendly routing engine)
  useEffect(() => {
    const parseHashRoute = () => {
      const hash = window.location.hash || '';

      if (hash.startsWith('#admin') || hash.startsWith('#/admin')) {
        setCurrentPage('admin');
        setActiveTab('admin');
      } else if (hash.startsWith('#/services/')) {
        const sId = hash.replace('#/services/', '').split('?')[0];
        setSelectedServiceId(sId || 'reload');
        setCurrentPage('service');
        setActiveTab('services');
      } else if (hash.startsWith('#/books') || hash.startsWith('#books') || hash.startsWith('#/bookshelf')) {
        setCurrentPage('books');
        setActiveTab('books');
      } else if (hash.startsWith('#/stationery') || hash.startsWith('#stationery') || hash.startsWith('#/stationery-supplies')) {
        setCurrentPage('stationery');
        setActiveTab('stationery');
      } else if (hash.startsWith('#/designs') || hash.startsWith('#designs')) {
        setCurrentPage('designs');
        setActiveTab('designs');

        // Check for specific item preview URL parameter: #/designs?item=1
        if (hash.includes('item=')) {
          const params = new URLSearchParams(hash.split('?')[1]);
          const itemId = params.get('item');
          if (itemId) {
            const allDesigns = useShopStore.getState().designs;
            const match = allDesigns.find((d) => String(d.id) === itemId);
            if (match) {
              setSelectedDesign(match);
            }
          }
        }
      } else if (hash === '#offers' || hash === '#/offers') {
        setCurrentPage('home');
        setActiveTab('offers');
        setTimeout(() => {
          const el = document.getElementById('offers');
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else if (hash === '#services' || hash === '#/services') {
        setCurrentPage('home');
        setActiveTab('services');
        setTimeout(() => {
          const el = document.getElementById('services');
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        setCurrentPage('home');
        setActiveTab('home');
      }
    };

    parseHashRoute();
    window.addEventListener('hashchange', parseHashRoute);
    return () => window.removeEventListener('hashchange', parseHashRoute);
  }, []);

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
  }, [currentPage, selectedServiceId]);

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

  const handleNavigatePage = (page: string, param?: string) => {
    if (page === 'home') {
      window.location.hash = '#/';
    } else if (page === 'books') {
      window.location.hash = '#/books';
    } else if (page === 'stationery') {
      window.location.hash = '#/stationery';
    } else if (page === 'designs') {
      window.location.hash = param ? `#/designs?item=${param}` : '#/designs';
    } else if (page === 'service') {
      window.location.hash = `#/services/${param || 'reload'}`;
    } else if (page === 'admin') {
      window.location.hash = '#/admin';
    }
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    if (id === 'books') {
      handleNavigatePage('books');
      return;
    }
    if (id === 'stationery') {
      handleNavigatePage('stationery');
      return;
    }
    if (id === 'designs') {
      handleNavigatePage('designs');
      return;
    }
    if (id === 'admin') {
      handleNavigatePage('admin');
      return;
    }

    // If we're on a sub-page, navigate home first
    if (currentPage !== 'home') {
      window.location.hash = '#/';
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

  const handleSelectService = (serviceId: string) => {
    handleNavigatePage('service', serviceId);
  };

  const handleSelectDesign = (design: DesignItem) => {
    setSelectedDesign(design);
  };

  const handleSelectBook = (_book: BookItem) => {
    handleNavigatePage('books');
  };

  const showMobileHeader = isMobile && !forceDesktop;
  const cartTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Announcement notice if enabled in site.config.json */}
      {currentPage !== 'admin' && <AnnouncementBanner />}

      {/* Header View: Mobile Header Hero on mobile; Sticky Navigation on Desktop */}
      {currentPage !== 'admin' && (
        showMobileHeader ? (
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
        )
      )}

      {/* Main Content Area */}
      <main className={showMobileHeader ? 'mobile-bottom-space' : ''} style={{ flex: 1 }}>
        {/* ── Page Router with separate URLs ── */}
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
            onBack={() => handleNavigatePage('home')}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'stationery' && (
          <StationeryPage
            onBack={() => handleNavigatePage('home')}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'designs' && (
          <DesignsPage
            onBack={() => handleNavigatePage('home')}
            onSelectDesign={handleSelectDesign}
          />
        )}

        {currentPage === 'service' && (
          <ServiceDetailPage
            serviceId={selectedServiceId}
            onBack={() => handleNavigatePage('home')}
            onNavigatePage={handleNavigatePage}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPage />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      {showMobileHeader && currentPage !== 'admin' && (
        <MobileBottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            if (tab === 'designs') {
              handleNavigatePage('designs');
            } else if (tab === 'books') {
              handleNavigatePage('books');
            } else if (tab === 'stationery') {
              handleNavigatePage('stationery');
            } else {
              scrollToSection(tab);
            }
          }}
        />
      )}

      {/* Global Search Modal */}
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

      {/* Lightbox Modal for Design Preview with direct WhatsApp quote */}
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
