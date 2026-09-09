import React from 'react';
import { X, MessageCircle, Sparkles } from 'lucide-react';
import { DesignItem } from '../../types';
import { siteConfig } from '../../config/siteConfig';

interface ImageModalProps {
  design: DesignItem | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ design, onClose }) => {
  if (!design) return null;

  const whatsappInquireUrl = `${siteConfig.socialMedia.whatsappChat}?text=${encodeURIComponent(
    `Hi Unique Printers, I'm interested in ordering / customizing this design: "${design.title}" (${design.cat}). Could you please share options and quotation?`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          maxWidth: '560px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: '#FFFFFF',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)'
          }}
        >
          <X size={18} />
        </button>

        {/* Media Preview */}
        <div
          style={{
            height: '380px',
            backgroundColor: '#1E1E1E',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {design.image ? (
            <img
              src={design.image}
              alt={design.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: design.grad
                  ? `linear-gradient(135deg, #B77B3D, #121212)`
                  : 'linear-gradient(135deg, #FF8A3D, #FFE9C6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px'
              }}
            >
              <div className="serif" style={{ fontSize: '32px', color: '#FFFFFF', textAlign: 'center' }}>
                {design.title}
              </div>
            </div>
          )}

          {design.tag && (
            <span
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                padding: '4px 12px',
                borderRadius: '999px',
                backgroundColor: '#FFFFFF',
                color: '#121212',
                fontSize: '11px',
                fontWeight: 800,
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
            >
              {design.tag}
            </span>
          )}
        </div>

        {/* Details & CTA */}
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF' }}>
          <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#B77B3D', letterSpacing: '0.08em' }}>
            {design.cat.toUpperCase()} • UNIQUE PRINTERS SAMPLE
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#121212', marginTop: '4px', lineHeight: 1.2 }}>
            {design.title}
          </h3>

          <p style={{ fontSize: '13.5px', color: '#666666', marginTop: '6px' }}>
            {design.subtitle}
          </p>

          <div
            style={{
              marginTop: '16px',
              padding: '12px 16px',
              borderRadius: '14px',
              backgroundColor: '#FFFBF5',
              border: '1px solid rgba(0,0,0,0.06)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12.5px'
            }}
          >
            <div>
              <div style={{ color: '#888888' }}>Material & Finishing:</div>
              <div style={{ fontWeight: 700, color: '#121212', marginTop: '2px' }}>
                {design.paperSpec || '300gsm Premium Board'}
              </div>
            </div>

            {design.priceNote && (
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#888888' }}>Pricing Estimate:</div>
                <div style={{ fontWeight: 800, color: '#B77B3D', marginTop: '2px' }}>
                  {design.priceNote}
                </div>
              </div>
            )}
          </div>

          {/* Action button */}
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <a
              href={whatsappInquireUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                height: '46px',
                borderRadius: '999px',
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)'
              }}
              className="hover-lift"
            >
              <MessageCircle size={18} />
              Inquire on WhatsApp
            </a>

            <button
              onClick={onClose}
              style={{
                padding: '0 20px',
                height: '46px',
                borderRadius: '999px',
                backgroundColor: '#F5F5F5',
                color: '#444444',
                fontWeight: 600,
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
