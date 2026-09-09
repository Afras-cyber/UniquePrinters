import React, { useState } from 'react';
import { Search, ShoppingBag, Moon, Sun, Clock, Phone, MapPin, Command } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  activeNav: string;
  onNavClick: (pageOrSection: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  darkMode,
  onToggleDarkMode,
  activeNav,
  onNavClick
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Designs & Printing', id: 'designs' },
    { label: 'School Books', id: 'books' },
    { label: 'Stationery', id: 'stationery' },
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
          fontSize: '11.5px',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        <div
          className="site-container"
          style={{
            paddingTop: '8px',
            paddingBottom: '8px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#B77B3D', display: 'inline-block' }} />
              <MapPin size={12} style={{ color: '#B77B3D' }} />
              Wilgoda, Kurunegala, Sri Lanka
            </span>
            <span style={{ opacity: 0.3 }} className="desktop-only">|</span>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
              style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'inherit', textDecoration: 'none' }}
            >
              <Phone size={12} style={{ color: '#B77B3D' }} />
              {siteConfig.contact.phone}
            </a>
            <span style={{ opacity: 0.3 }} className="desktop-only">|</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={12} style={{ color: '#B77B3D' }} />
              Open 8AM - 8PM • 7 Days
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                padding: '2px 9px',
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
              Trusted local shop since 2013
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
          backgroundColor: darkMode ? 'rgba(26,26,26,0.94)' : 'rgba(255,251,245,0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(18,18,18,0.06)',
          transition: 'background-color 0.3s'
        }}
      >
        <div
          className="site-container"
          style={{
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          {/* Brand Logo & Name (Decreased font size per user request) */}
          <div
            onClick={() => onNavClick('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 3px 12px rgba(0,0,0,0.06)',
                border: '1px solid rgba(18,18,18,0.1)',
                padding: '4px',
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
                  letterSpacing: '-0.01em',
                  fontSize: '15px', // Decreased size for clean proportion
                  lineHeight: 1.15,
                  color: darkMode ? '#F5E9D3' : '#121212'
                }}
              >
                UNIQUE PRINTERS
              </div>
              <div
                style={{
                  fontSize: '9.5px', // Decreased location label size
                  letterSpacing: '0.16em',
                  fontWeight: 700,
                  color: '#9A652F',
                  marginTop: '1px'
                }}
              >
                WILGODA • KURUNEGALA
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links (Re-sized font for better readability) */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              fontSize: '14.5px', // Enhanced readability font size
              fontWeight: 500
            }}
            className="desktop-only"
          >
            {navLinks.map((link) => {
              const isActive = activeNav === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavClick(link.id)}
                  style={{
                    position: 'relative',
                    padding: '6px 0',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: isActive
                      ? (darkMode ? '#F5E9D3' : '#121212')
                      : (darkMode ? 'rgba(245,233,211,0.65)' : 'rgba(18,18,18,0.65)'),
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '14.5px',
                    transition: 'color 0.2s',
                    outline: 'none'
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
                </button>
              );
            })}
          </nav>

          {/* Header Action Tools (Global Search Modal Trigger, Theme, Cart) */}
          {/* Note: 'Order on WhatsApp' removed in desktop view per user request */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Global Search Trigger Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Open global search"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                height: '40px',
                padding: '0 14px',
                borderRadius: '999px',
                backgroundColor: darkMode ? '#222222' : '#FFFFFF',
                border: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(18,18,18,0.1)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                color: darkMode ? '#F5E9D3' : '#121212',
                transition: 'all 0.2s'
              }}
              className="hover-lift"
            >
              <Search size={15} style={{ opacity: 0.5, color: '#B77B3D' }} />
              <span style={{ fontSize: '13px', color: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)', marginRight: '6px' }} className="desktop-only">
                Search products...
              </span>
              <span
                style={{
                  padding: '2px 6px',
                  borderRadius: '6px',
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: darkMode ? '#FFF' : '#666'
                }}
                className="desktop-only"
              >
                ⌘K
              </span>
            </button>

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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
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
          </div>
        )}
      </header>
    </>
  );
};
