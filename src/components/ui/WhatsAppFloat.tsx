import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const WhatsAppFloat: React.FC = () => {
  return (
    <aside
      aria-label="Contact options"
      style={{
        position: 'fixed',
        bottom: '80px', // Raised so it doesn't overlap mobile bottom nav
        right: '20px',
        zIndex: 45
      }}
      className="whatsapp-floating-wrap"
    >
      <a
        href={siteConfig.socialMedia.whatsappChat}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Unique Printers on WhatsApp"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45)',
          textDecoration: 'none',
          position: 'relative',
          transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        className="hover-lift"
      >
        <MessageCircle size={28} />
        {/* Pulsing online badge */}
        <span
          style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: '2px solid #25D366',
            boxShadow: '0 0 6px rgba(255,255,255,0.8)'
          }}
        />
      </a>
    </aside>
  );
};
