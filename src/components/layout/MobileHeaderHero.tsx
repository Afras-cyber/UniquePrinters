import React, { useState, useEffect } from 'react';
import { Search, Mic, Phone, MessageCircle, Monitor } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface MobileHeaderHeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onToggleForceDesktop?: () => void;
  isForcedDesktop?: boolean;
}

export const MobileHeaderHero: React.FC<MobileHeaderHeroProps> = ({
  searchQuery,
  onSearchChange,
  onToggleForceDesktop,
  isForcedDesktop = false
}) => {
  const [timeString, setTimeString] = useState('');
  const [dateString, setDateString] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      // Format: WED, 09 SEPT
      const datePart = now.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
      }).toUpperCase();
      setDateString(datePart);

      // Format: 01:46:22 PM
      const timePart = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setTimeString(timePart);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '100%' }}>
      {/* Top Black Bar (Preserved from Mobile UI PDF) */}
      <div
        style={{
          backgroundColor: '#121212',
          color: '#F5E9D3',
          padding: '8px 14px',
          fontSize: '11px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          letterSpacing: '0.04em'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              display: 'inline-block',
              boxShadow: '0 0 6px #10B981'
            }}
          />
          <span>SRI LANKA • {dateString || 'LIVE'}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '11px' }}>
            {timeString}
          </span>
          {onToggleForceDesktop && (
            <button
              onClick={onToggleForceDesktop}
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '4px',
                padding: '2px 6px',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              <Monitor size={10} />
              {isForcedDesktop ? 'MOBILE' : 'DESKTOP VIEW'}
            </button>
          )}
        </div>
      </div>

      {/* Main Brand Card Container */}
      <div style={{ padding: '16px 16px 8px 16px', maxWidth: '500px', margin: '0 auto' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.06)'
          }}
        >
          {/* Header Row: Logo + Brand + Open Now Badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: '#000000',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  flexShrink: 0
                }}
              >
                <img
                  src={siteConfig.shop.logoUrl}
                  alt={siteConfig.shop.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              <div>
                <h1
                  style={{
                    fontSize: '15px',
                    fontWeight: 800,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                    color: '#121212',
                    margin: 0
                  }}
                >
                  UNIQUE PRINTERS
                </h1>
                <div style={{ fontSize: '11px', color: '#777777', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <span>📍</span>
                  <span>Wilgoda, Kurunegala</span>
                </div>
              </div>
            </div>

            {/* Open Status Indicator */}
            <div
              style={{
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0',
                borderRadius: '14px',
                padding: '6px 10px',
                textAlign: 'right'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', fontSize: '11px', fontWeight: 700, color: '#059669' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
                <span>OPEN NOW</span>
              </div>
              <div style={{ fontSize: '9px', color: '#6B7280', marginTop: '1px' }}>
                Closes 8:00 PM
              </div>
              <div style={{ fontSize: '8px', color: '#9CA3AF' }}>
                LIVE • Colombo
              </div>
            </div>
          </div>

          {/* Search Box with Voice/Mic */}
          <div
            style={{
              marginTop: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#F7F7F7',
              borderRadius: '999px',
              padding: '10px 14px',
              border: '1px solid rgba(0,0,0,0.06)'
            }}
          >
            <Search size={16} style={{ color: '#999999' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search books, invitations..."
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '13.5px',
                color: '#121212',
                width: '100%'
              }}
            />
            <button
              aria-label="Voice search"
              onClick={() => alert('Voice search activated: speak book title or printing service')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#777777',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}
            >
              <Mic size={16} />
            </button>
          </div>

          {/* Dual Prominent CTA Buttons (Preserved from Mobile UI PDF) */}
          <div
            style={{
              marginTop: '14px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px'
            }}
          >
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                height: '46px',
                borderRadius: '999px',
                backgroundColor: '#121212',
                color: '#FFFFFF',
                fontSize: '13.5px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              <Phone size={15} />
              Call Shop
            </a>

            <a
              href={siteConfig.socialMedia.whatsappChat}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                height: '46px',
                borderRadius: '999px',
                backgroundColor: '#10B981',
                color: '#FFFFFF',
                fontSize: '13.5px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
              }}
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
