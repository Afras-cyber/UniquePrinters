import React, { useState } from 'react';
import { Search, ShoppingBag, MessageCircle, Moon, Sun, Clock, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  activeNav: string;
  onNavClick: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  darkMode,
  onToggleDarkMode,
  activeNav,
  onNavClick
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Designs', id: 'designs' },
    { label: 'Books & Stationery', id: 'books-stationery' },
    { label: 'Offers', id: 'offers' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <>
      {/* Top Bar (Notice / Address / Phone / Hours) */}
      <div
        style={{
          backgroundColor: '#121212',
          color: '#F5E9D3',
          fontSize: '12px',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        <div
          className="site-container"
          style={{
            paddingTop: '9px',
            paddingBottom: '9px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#B77B3D', display: 'inline-block' }} />
              <MapPin size={13} style={{ color: '#B77B3D' }} />
              Wilgoda, Kurunegala, Sri Lanka
            </span>
            <span style={{ opacity: 0.3 }} className="desktop-only">|</span>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'inherit', textDecoration: 'none' }}
            >
              <Phone size={13} style={{ color: '#B77B3D' }} />
              {siteConfig.contact.phone}
            </a>
            <span style={{ opacity: 0.3 }} className="desktop-only">|</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={13} style={{ color: '#B77B3D' }} />
              Open 8AM - 8PM • 7 Days
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span
              style={{
                padding: '2px 10px',
                borderRadius: '999px',
                backgroundColor: '#1F1F1F',
                border: '1px solid rgba(255,255,255,0.12)',
                fontSize: '11px',
                fontWeight: 500
              }}
            >
              සිංහල | English
            </span>
            <span style={{ opacity: 0.65, fontSize: '11px' }} className="desktop-only">
              Trusted since 2013 • 10+ Years
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Main Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: darkMode ? 'rgba(26,26,26,0.92)' : 'rgba(255,251,245,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(18,18,18,0.06)',
          transition: 'background-color 0.3s'
        }}
      >
        <div
          className="site-container"
          style={{
            height: '76px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          {/* Brand Logo & Name */}
          <div
            onClick={() => onNavClick('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: '1px solid rgba(18,18,18,0.1)',
                padding: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <img
                src={siteConfig.shop.logoUrl}
                alt={siteConfig.shop.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div>
              <div
                style={{
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  fontSize: '17px',
                  lineHeight: 1.1,
                  color: darkMode ? '#F5E9D3' : '#121212'
                }}
              >
                UNIQUE PRINTERS
              </div>
              <div
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  fontWeight: 700,
                  color: '#9A652F',
                  marginTop: '2px'
                }}
              >
                WILGODA • KURUNEGALA
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '26px',
              fontSize: '14px',
              fontWeight: 500
            }}
            className="desktop-only"
          >
            {navLinks.map((link) => {
              const isActive = activeNav === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick(link.id);
                  }}
                  style={{
                    position: 'relative',
                    padding: '6px 0',
                    color: isActive
                      ? (darkMode ? '#F5E9D3' : '#121212')
                      : (darkMode ? 'rgba(245,233,211,0.65)' : 'rgba(18,18,18,0.65)'),
                    textDecoration: 'none',
                    fontWeight: isActive ? 700 : 500,
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#9A652F')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? (darkMode ? '#F5E9D3' : '#121212') : (darkMode ? 'rgba(245,233,211,0.65)' : 'rgba(18,18,18,0.65)'))}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '2px',
                        backgroundColor: '#B77B3D',
                        borderRadius: '999px'
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Header Action Tools (Search, Cart, DarkMode, WhatsApp) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Live Search Input */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: '40px',
                padding: '0 14px',
                borderRadius: '999px',
                backgroundColor: darkMode ? '#222222' : '#FFFFFF',
                border: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(18,18,18,0.1)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                width: '210px',
                transition: 'border 0.2s'
              }}
              className="desktop-only"
            >
              <Search size={14} style={{ opacity: 0.45, color: darkMode ? '#FFF' : '#000' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search books, papers..."
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '13px',
                  color: darkMode ? '#F5E9D3' : '#121212'
                }}
              />
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              aria-label="Toggle theme mode"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: darkMode ? '#242424' : '#FFFFFF',
                border: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(18,18,18,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: darkMode ? '#F5E9D3' : '#121212',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              {darkMode ? <Sun size={17} style={{ color: '#F2A15E' }} /> : <Moon size={17} />}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              aria-label={`Cart with ${cartCount} items`}
              style={{
                position: 'relative',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: darkMode ? '#242424' : '#FFFFFF',
                border: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(18,18,18,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                color: darkMode ? '#F5E9D3' : '#121212'
              }}
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-3px',
                    minWidth: '18px',
                    height: '18px',
                    padding: '0 4px',
                    borderRadius: '999px',
                    backgroundColor: '#B77B3D',
                    color: '#FFFFFF',
                    fontSize: '10px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* WhatsApp Ordering Button */}
            <a
              href={siteConfig.socialMedia.whatsappChat}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: '40px',
                padding: '0 18px',
                borderRadius: '999px',
                backgroundColor: '#121212',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
                transition: 'background-color 0.2s, transform 0.15s'
              }}
              className="desktop-only hover-lift"
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#25D366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}
              >
                <MessageCircle size={12} />
              </div>
              Order on WhatsApp
            </a>

            {/* Mobile Hamburger Toggle for Quick Links */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#121212',
                color: '#FFFFFF',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: 'none'
              }}
              className="mobile-hamburger"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Secondary navigation) */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '16px',
              backgroundColor: darkMode ? '#1B1B1B' : '#FFFFFF',
              borderTop: '1px solid rgba(0,0,0,0.08)'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavClick(link.id);
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    backgroundColor: darkMode ? '#282828' : '#FFFBF5',
                    border: '1px solid rgba(0,0,0,0.06)',
                    textAlign: 'center',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    color: darkMode ? '#F5E9D3' : '#121212',
                    cursor: 'pointer'
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <a
              href={siteConfig.socialMedia.whatsappChat}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                height: '44px',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                borderRadius: '999px',
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              <MessageCircle size={16} />
              WhatsApp Direct Chat
            </a>
          </div>
        )}
      </header>
    </>
  );
};
