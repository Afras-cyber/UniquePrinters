import React from 'react';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface FooterProps {
  onNavClick: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Sample Designs', id: 'designs' },
    { label: 'Books & Stationery', id: 'books-stationery' },
    { label: 'Special Offers', id: 'offers' },
    { label: 'Contact Details', id: 'contact' }
  ];

  const serviceLinks = [
    'Reload Service',
    'Books Selling',
    'Stationery Items',
    'Invitation Printing',
    'Poster & Banner Printing',
    'Laminating & Computer Work'
  ];

  return (
    <footer
      id="contact"
      style={{
        backgroundColor: '#0E0E0E',
        color: '#F5E9D3',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '48px 16px 36px 16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '36px'
        }}
      >
        {/* Col 1: Brand & Bio */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
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
              <div style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '-0.01em', color: '#FFFFFF' }}>
                UNIQUE PRINTERS
              </div>
              <div style={{ fontSize: '10.5px', letterSpacing: '0.18em', color: '#B77B3D', fontWeight: 700, marginTop: '2px' }}>
                WILGODA • KURUNEGALA
              </div>
            </div>
          </div>

          <p style={{ marginTop: '16px', fontSize: '13px', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', maxWidth: '300px' }}>
            Your trusted local print & school shop in Wilgoda. Custom invitations, posters, school textbooks, full stationery sets, mobile reloads, and computer work — all under one roof.
          </p>

          <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
            {[
              { name: 'FB', url: siteConfig.socialMedia.facebook },
              { name: 'IG', url: siteConfig.socialMedia.instagram },
              { name: 'WA', url: siteConfig.socialMedia.whatsappChat },
              { name: 'TT', url: siteConfig.socialMedia.tiktok }
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s'
                }}
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <div style={{ fontSize: '12px', letterSpacing: '0.18em', fontWeight: 800, color: '#FFFFFF' }}>
            QUICK LINKS
          </div>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {quickLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  textAlign: 'left',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.65)',
                  cursor: 'pointer',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Col 3: Services */}
        <div>
          <div style={{ fontSize: '12px', letterSpacing: '0.18em', fontWeight: 800, color: '#FFFFFF' }}>
            SERVICES
          </div>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {serviceLinks.map((service, idx) => (
              <div key={idx} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* Col 4: Visit Us & Map */}
        <div>
          <div style={{ fontSize: '12px', letterSpacing: '0.18em', fontWeight: 800, color: '#FFFFFF' }}>
            VISIT US
          </div>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <MapPin size={16} style={{ color: '#B77B3D', flexShrink: 0, marginTop: '2px' }} />
              <div>
                Unique Printers, {siteConfig.contact.address.line1}, {siteConfig.contact.address.city}, Sri Lanka
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Phone size={15} style={{ color: '#B77B3D', flexShrink: 0 }} />
              <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                {siteConfig.contact.phone}
              </a>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Mail size={15} style={{ color: '#B77B3D', flexShrink: 0 }} />
              <a href={`mailto:${siteConfig.contact.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                {siteConfig.contact.email}
              </a>
            </div>

            <div
              style={{
                marginTop: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '999px',
                backgroundColor: '#B77B3D',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 700,
                width: 'fit-content'
              }}
            >
              <Clock size={12} />
              OPEN DAILY 8:00 AM - 8:00 PM
            </div>

            {/* Map Link Box */}
            <a
              href={siteConfig.contact.address.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: '12px',
                padding: '14px',
                borderRadius: '14px',
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontSize: '12px'
              }}
              className="hover-lift"
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                📍 View Wilgoda Location on Google Maps
              </span>
              <ExternalLink size={14} style={{ color: '#B77B3D' }} />
            </a>
          </div>
        </div>
      </div>

      {/* Subfooter */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '16px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            fontSize: '11.5px',
            color: 'rgba(255,255,255,0.45)'
          }}
        >
          <div>
            © {new Date().getFullYear()} Unique Printers - Wilgoda, Kurunegala. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>Made with ✦ for the Kurunegala community</span>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.3)' }} />
            <span>Prices in LKR (Rs.)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
