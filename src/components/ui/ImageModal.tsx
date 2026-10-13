import React, { useEffect, useState } from 'react';
import { X, MessageCircle, Sparkles, Check, Truck } from 'lucide-react';
import { DesignItem } from '../../types';
import { buildProductWhatsAppUrl } from '../../lib/whatsapp';

interface ImageModalProps {
  design: DesignItem | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ design, onClose }) => {
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  useEffect(() => {
    if (!design) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [design, onClose]);

  if (!design) return null;

  const whatsappInquireUrl = buildProductWhatsAppUrl({
    productName: `${design.title} (${design.cat})`,
    category: design.cat,
    price: design.price,
    productPath: `#/designs?item=${design.id}`,
    customNote: design.paperSpec ? `Material: ${design.paperSpec}` : undefined
  });

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY !== null) {
      const touchEndY = e.changedTouches[0].clientY;
      // If dragged down by more than 50px, dismiss the sheet
      if (touchEndY - touchStartY > 50) {
        onClose();
      }
    }
    setTouchStartY(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
      className="image-modal-overlay"
      onClick={onClose}
    >
      <div
        className="image-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Pull Down Handle */}
        <div
          className="image-modal-drag-area"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={onClose}
          title="Swipe or tap to close"
        >
          <div className="image-modal-drag-handle" />
        </div>

        {/* Top Close Button (Accessible in both mobile & desktop) */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="image-modal-close-btn"
        >
          <X size={18} />
        </button>

        {/* Main Body (Horizontal on desktop, smooth scrolling column on mobile) */}
        <div className="image-modal-scrollable-body">
          {/* Media Preview (Left side on desktop, top of sheet on mobile) */}
          <div className="image-modal-media">
            {design.image ? (
              <img
                src={design.image}
                alt={design.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: '12px'
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
                  top: '14px',
                  left: '16px',
                  padding: '5px 14px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.96)',
                  color: '#121212',
                  fontSize: '11px',
                  fontWeight: 800,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
                  letterSpacing: '0.02em',
                  backdropFilter: 'blur(4px)'
                }}
              >
                {design.tag}
              </span>
            )}
          </div>

          {/* Details & CTA (Right side on desktop, bottom flow on mobile) */}
          <div className="image-modal-content">
            <div>
              <div style={{ paddingRight: '36px' }}>
                <div
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 800,
                    color: '#B77B3D',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  {design.cat} • UNIQUE PRINTERS SAMPLE
                </div>

                <h3
                  id="image-modal-title"
                  style={{
                    fontSize: '21px',
                    fontWeight: 800,
                    color: '#121212',
                    marginTop: '5px',
                    lineHeight: 1.25
                  }}
                >
                  {design.title}
                </h3>
              </div>

              <p
                style={{
                  fontSize: '13.5px',
                  color: '#666666',
                  marginTop: '7px',
                  lineHeight: 1.5
                }}
              >
                {design.subtitle}
              </p>

              {/* Material & Pricing Specification Box */}
              <div
                style={{
                  marginTop: '16px',
                  padding: '13px 16px',
                  borderRadius: '16px',
                  backgroundColor: '#FFFBF5',
                  border: '1px solid rgba(183, 123, 61, 0.2)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '12px'
                }}
              >
                <div>
                  <div style={{ color: '#888888', fontSize: '11px', fontWeight: 600 }}>Material & Finishing:</div>
                  <div style={{ fontWeight: 700, color: '#121212', marginTop: '2px', fontSize: '13px' }}>
                    {design.paperSpec || '300gsm Premium Board'}
                  </div>
                </div>

                {design.priceNote && (
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#888888', fontSize: '11px', fontWeight: 600 }}>Pricing Estimate:</div>
                    <div style={{ fontWeight: 800, color: '#B77B3D', marginTop: '2px', fontSize: '13.5px' }}>
                      {design.priceNote}
                    </div>
                  </div>
                )}
              </div>

              {/* Reassuring Trust Perks for Fast Ordering */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '14px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#555555',
                    backgroundColor: '#F8F8F8',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    border: '1px solid rgba(0,0,0,0.05)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Sparkles size={11} style={{ color: '#B77B3D' }} />
                  Custom names & theme
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#555555',
                    backgroundColor: '#F8F8F8',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    border: '1px solid rgba(0,0,0,0.05)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Check size={11} style={{ color: '#25D366' }} />
                  Free digital proof
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#555555',
                    backgroundColor: '#F8F8F8',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    border: '1px solid rgba(0,0,0,0.05)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Truck size={11} style={{ color: '#B77B3D' }} />
                  Islandwide delivery
                </span>
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="desktop-only" style={{ marginTop: '24px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
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
                    padding: '0 22px',
                    height: '46px',
                    borderRadius: '999px',
                    backgroundColor: '#F5F5F5',
                    color: '#444444',
                    fontWeight: 600,
                    fontSize: '13px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#EEEEEE')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F5F5F5')}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Action Footer (Docked right at thumb reach for effortless ordering) */}
        <div className="image-modal-footer mobile-only">
          <a
            href={whatsappInquireUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              height: '48px',
              borderRadius: '999px',
              backgroundColor: '#25D366',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '14.5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)'
            }}
            className="hover-lift"
          >
            <MessageCircle size={19} />
            Inquire on WhatsApp
          </a>

          <button
            onClick={onClose}
            style={{
              padding: '0 18px',
              height: '48px',
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
  );
};

