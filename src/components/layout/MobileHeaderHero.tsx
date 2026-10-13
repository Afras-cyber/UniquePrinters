import React, { useState, useEffect } from 'react';
import { Search, Mic, Phone, MessageCircle, Monitor, MapPin, Moon, Sun, ShoppingBag } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface MobileHeaderHeroProps {
  onOpenSearch: () => void;
  onToggleForceDesktop?: () => void;
  isForcedDesktop?: boolean;
  cartCount?: number;
  onOpenCart?: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const MobileHeaderHero: React.FC<MobileHeaderHeroProps> = ({
  onOpenSearch,
  onToggleForceDesktop,
  isForcedDesktop = false,
  cartCount = 0,
  onOpenCart,
  darkMode = false,
  onToggleDarkMode
}) => {
  const [timeString, setTimeString] = useState('');
  const [dateString, setDateString] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      // Format: TUE, 13 OCT
      const datePart = now.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
      }).toUpperCase();
      setDateString(datePart);

      // Format: 04:13:56 PM
      const timePart = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setTimeString(timePart);

      // Open hours: 8:00 AM to 8:00 PM (20:00)
      const currentHour = now.getHours();
      setIsOpen(currentHour >= 8 && currentHour < 20);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '100%' }}>
      {/* Top Status Bar: Sleek, Single-Line, Never Wraps */}
      <div
        style={{
          backgroundColor: '#111111',
          color: '#F5E9D3',
          padding: '7px 14px',
          fontSize: '11px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          letterSpacing: '0.03em',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          lineHeight: 1
        }}
      >
        {/* Left: Location & Date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0, overflow: 'hidden' }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              display: 'inline-block',
              boxShadow: '0 0 6px #10B981',
              flexShrink: 0
            }}
          />
          <span
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: '10.5px',
              color: '#F5E9D3',
              fontWeight: 600
            }}
          >
            KURUNEGALA • {dateString || 'SRI LANKA'}
          </span>
        </div>

        {/* Right: Clock & Desktop Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <span
            style={{
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: '10.5px',
              color: '#FFFFFF',
              letterSpacing: '0.02em'
            }}
          >
            {timeString}
          </span>

          {onToggleForceDesktop && (
            <button
              onClick={onToggleForceDesktop}
              aria-label="Switch to desktop view"
              style={{
                backgroundColor: 'rgba(255,255,255,0.12)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '6px',
                padding: '3px 7px',
                fontSize: '9.5px',
                fontWeight: 600,
                letterSpacing: '0.03em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              <Monitor size={10} />
              <span>{isForcedDesktop ? 'Mobile' : 'Desktop'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Brand Card Container */}
      <div style={{ padding: '10px 12px 6px 12px', maxWidth: '520px', margin: '0 auto' }}>
        <div
          style={{
            backgroundColor: darkMode ? '#1A1A1A' : '#FFFFFF',
            borderRadius: '20px',
            padding: '14px 14px 12px 14px',
            boxShadow: darkMode
              ? '0 6px 24px rgba(0,0,0,0.45)'
              : '0 4px 20px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.03)',
            border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
            transition: 'background-color 0.25s ease'
          }}
        >
          {/* Top Row: Brand Info + Status Badge & Quick Actions */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
            {/* Brand Logo & Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: '#121212',
                  border: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.08)',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}
              >
                <img
                  src={siteConfig.shop.logoUrl}
                  alt={siteConfig.shop.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              <div style={{ minWidth: 0 }}>
                <h1
                  style={{
                    fontSize: '15px',
                    fontWeight: 800,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.15,
                    color: darkMode ? '#F5E9D3' : '#121212',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  UNIQUE PRINTERS
                </h1>
                <div
                  style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    color: darkMode ? '#A1A1AA' : '#6B7280',
                    marginTop: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}
                >
                  <MapPin size={11} style={{ color: '#B77B3D', flexShrink: 0 }} />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Wilgoda, Kurunegala
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Status Pill & Quick Action Tools */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
              {/* Sleek Open Now Status Pill */}
              <div
                style={{
                  backgroundColor: isOpen
                    ? (darkMode ? 'rgba(16, 185, 129, 0.16)' : '#ECFDF5')
                    : (darkMode ? 'rgba(239, 68, 68, 0.16)' : '#FEF2F2'),
                  border: isOpen
                    ? (darkMode ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid #A7F3D0')
                    : (darkMode ? '1px solid rgba(239, 68, 68, 0.35)' : '1px solid #FECACA'),
                  borderRadius: '999px',
                  padding: '3px 8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: isOpen ? '#10B981' : '#EF4444',
                    display: 'inline-block',
                    boxShadow: isOpen ? '0 0 6px #10B981' : '0 0 6px #EF4444'
                  }}
                />
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: isOpen ? (darkMode ? '#34D399' : '#059669') : (darkMode ? '#F87171' : '#DC2626'),
                    letterSpacing: '0.02em'
                  }}
                >
                  {isOpen ? 'OPEN' : 'CLOSED'}
                </span>
                <span style={{ fontSize: '9px', color: darkMode ? '#A1A1AA' : '#6B7280', fontWeight: 500 }}>
                  {isOpen ? '· Closes 8 PM' : '· Opens 8 AM'}
                </span>
              </div>

              {/* Quick Action Icons: Dark Mode & Cart (if handlers provided) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {onToggleDarkMode && (
                  <button
                    onClick={onToggleDarkMode}
                    aria-label="Toggle dark mode"
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: darkMode ? '#262626' : '#F5F5F7',
                      border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: darkMode ? '#F5E9D3' : '#121212',
                      transition: 'all 0.2s'
                    }}
                  >
                    {darkMode ? <Sun size={14} style={{ color: '#F2A15E' }} /> : <Moon size={14} />}
                  </button>
                )}

                {onOpenCart && (
                  <button
                    onClick={onOpenCart}
                    aria-label={`Cart with ${cartCount} items`}
                    style={{
                      position: 'relative',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: darkMode ? '#262626' : '#F5F5F7',
                      border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: darkMode ? '#F5E9D3' : '#121212',
                      transition: 'all 0.2s'
                    }}
                  >
                    <ShoppingBag size={14} />
                    {cartCount > 0 && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '-3px',
                          right: '-3px',
                          minWidth: '16px',
                          height: '16px',
                          padding: '0 3px',
                          borderRadius: '999px',
                          backgroundColor: '#B77B3D',
                          color: '#FFFFFF',
                          fontSize: '9.5px',
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
                )}
              </div>
            </div>
          </div>

          {/* Search Bar (Triggers Global Search Modal) */}
          <div
            onClick={onOpenSearch}
            role="button"
            tabIndex={0}
            aria-label="Open search dialog"
            style={{
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: darkMode ? '#242424' : '#F5F5F7',
              borderRadius: '999px',
              padding: '9px 14px',
              border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Search size={15} style={{ color: '#B77B3D', flexShrink: 0 }} />
            <span
              style={{
                fontSize: '13px',
                color: darkMode ? 'rgba(255,255,255,0.5)' : '#71717A',
                fontWeight: 500,
                flex: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              Search books, invitations, services...
            </span>
            <Mic size={15} style={{ color: darkMode ? '#71717A' : '#A1A1AA', flexShrink: 0 }} />
          </div>

          {/* Dual Quick Action CTA Buttons */}
          <div
            style={{
              marginTop: '10px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px'
            }}
          >
            {/* Call Shop CTA */}
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
                height: '40px',
                borderRadius: '999px',
                backgroundColor: darkMode ? '#27272A' : '#121212',
                color: '#FFFFFF',
                fontSize: '12.5px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
                transition: 'all 0.2s',
                border: darkMode ? '1px solid rgba(255,255,255,0.1)' : 'none'
              }}
            >
              <Phone size={14} style={{ color: '#F5E9D3' }} />
              <span>Call Shop</span>
            </a>

            {/* WhatsApp CTA */}
            <a
              href={siteConfig.socialMedia.whatsappChat}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
                height: '40px',
                borderRadius: '999px',
                backgroundColor: '#10B981',
                color: '#FFFFFF',
                fontSize: '12.5px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 2px 12px rgba(16, 185, 129, 0.3)',
                transition: 'all 0.2s'
              }}
            >
              <MessageCircle size={15} />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Quick Value Trust Strip */}
          <div
            style={{
              marginTop: '10px',
              paddingTop: '8px',
              borderTop: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '10px',
              color: darkMode ? '#A1A1AA' : '#71717A',
              fontWeight: 500,
              letterSpacing: '0.01em'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              ⚡ Wilgoda Pickup
            </span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              📄 Free Quotations
            </span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              ⭐ 10+ Yrs Trusted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
