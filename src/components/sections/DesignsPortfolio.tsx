import React, { useState } from 'react';
import { Eye, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { useShopStore } from '../../store/shopStore';
import { DesignItem } from '../../types';
import { buildProductWhatsAppUrl } from '../../lib/whatsapp';

interface DesignsPortfolioProps {
  onSelectDesign: (design: DesignItem) => void;
  onViewAllDesigns?: () => void;
}

export const DesignsPortfolio: React.FC<DesignsPortfolioProps> = ({
  onSelectDesign,
  onViewAllDesigns
}) => {
  const { designs, designCategories } = useShopStore();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...designCategories];

  const filteredDesigns = activeCategory === 'All'
    ? designs
    : designs.filter((d) => d.cat === activeCategory);

  return (
    <section
      id="designs"
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid rgba(18, 18, 18, 0.08)',
        borderBottom: '1px solid rgba(18, 18, 18, 0.08)',
        padding: 'clamp(28px, 4vw, 50px) 16px clamp(36px, 5vw, 65px) 16px'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header & Category Filters */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '24px'
          }}
        >
          <div>
            <div style={{ fontSize: '10.5px', letterSpacing: '0.18em', fontWeight: 800, color: '#9A652F' }}>
              PORTFOLIO & SAMPLES
            </div>
            <h2
              className="serif"
              style={{
                fontSize: 'clamp(24px, 3.8vw, 40px)',
                lineHeight: 1.05,
                marginTop: '6px',
                color: '#121212'
              }}
            >
              Sample Design & Printing Works
            </h2>
          </div>

          {/* Filter Chips from dynamic categories */}
          <div
            className="no-scrollbar"
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              gap: '6px',
              overflowX: 'auto',
              paddingBottom: '4px',
              maxWidth: '100%',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    height: '34px',
                    padding: '0 14px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: isActive ? 700 : 500,
                    border: isActive ? '1px solid #121212' : '1px solid rgba(0,0,0,0.1)',
                    backgroundColor: isActive ? '#121212' : '#FFFBF5',
                    color: isActive ? '#FFFFFF' : '#121212',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile 2-Column Gallery Grid */}
        <div className="designs-mobile-grid">
          {filteredDesigns.slice(0, 8).map((design) => {
            const waQuoteUrl = buildProductWhatsAppUrl({
              productName: `${design.title} (${design.cat})`,
              category: design.cat,
              price: design.price,
              productPath: `#/designs?item=${design.id}`,
              customNote: design.paperSpec ? `Material requested: ${design.paperSpec}` : undefined
            });

            return (
              <div
                key={`mob-design-${design.id}`}
                style={{
                  borderRadius: '16px',
                  backgroundColor: '#FFFBF5',
                  border: '1px solid rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
                className="hover-lift"
              >
                <div
                  onClick={() => onSelectDesign(design)}
                  style={{
                    height: '135px',
                    position: 'relative',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    backgroundColor: '#1E1E1E'
                  }}
                >
                  {design.image ? (
                    <img
                      src={design.image}
                      alt={design.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
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
                        padding: '12px'
                      }}
                    >
                      <div className="serif" style={{ fontSize: '16px', color: '#FFFFFF', textAlign: 'center' }}>
                        {design.title}
                      </div>
                    </div>
                  )}

                  {design.tag && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        padding: '2px 7px',
                        borderRadius: '999px',
                        backgroundColor: '#FFFFFF',
                        color: '#121212',
                        fontSize: '9px',
                        fontWeight: 800,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                      }}
                    >
                      {design.tag}
                    </span>
                  )}
                </div>

                <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                  <div>
                    <div style={{ fontSize: '9px', fontWeight: 800, color: '#B77B3D', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      {design.cat}
                    </div>
                    <h4
                      style={{
                        marginTop: '2px',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#121212',
                        lineHeight: 1.25
                      }}
                      className="line-clamp-1"
                    >
                      {design.title}
                    </h4>
                    {design.priceNote && (
                      <div style={{ fontSize: '10px', color: '#B77B3D', fontWeight: 700, marginTop: '2px' }}>
                        {design.priceNote}
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                    <button
                      onClick={() => onSelectDesign(design)}
                      style={{
                        height: '26px',
                        padding: '0 8px',
                        borderRadius: '999px',
                        backgroundColor: '#121212',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '10px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                    >
                      <Eye size={11} />
                      Preview
                    </button>
                    <a
                      href={waQuoteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Inquire on WhatsApp"
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: '#25D366',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none'
                      }}
                    >
                      <MessageCircle size={12} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Gallery Grid */}
        <div className="designs-desktop-grid">
          {filteredDesigns.slice(0, 8).map((design) => {
            const waQuoteUrl = buildProductWhatsAppUrl({
              productName: `${design.title} (${design.cat})`,
              category: design.cat,
              price: design.price,
              productPath: `#/designs?item=${design.id}`,
              customNote: design.paperSpec ? `Material requested: ${design.paperSpec}` : undefined
            });

            return (
              <div
                key={design.id}
                style={{
                  borderRadius: '20px',
                  backgroundColor: '#FFFBF5',
                  border: '1px solid rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                className="hover-lift"
              >
                {/* Image / Gradient Preview Frame */}
                <div
                  onClick={() => onSelectDesign(design)}
                  style={{
                    height: '220px',
                    position: 'relative',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    backgroundColor: '#1E1E1E'
                  }}
                >
                  {design.image ? (
                    <img
                      src={design.image}
                      alt={design.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      className="hover-scale"
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #B77B3D, #3A2510)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontSize: '36px'
                      }}
                    >
                      🎨
                    </div>
                  )}

                  {/* Category & Badge Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      right: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      pointerEvents: 'none'
                    }}
                  >
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '999px',
                        backgroundColor: 'rgba(18,18,18,0.75)',
                        backdropFilter: 'blur(8px)',
                        color: '#FFFFFF',
                        fontSize: '10.5px',
                        fontWeight: 700
                      }}
                    >
                      {design.cat}
                    </span>
                    {design.tag && (
                      <span
                        style={{
                          padding: '4px 10px',
                          borderRadius: '999px',
                          backgroundColor: '#B77B3D',
                          color: '#FFFFFF',
                          fontSize: '10.5px',
                          fontWeight: 800
                        }}
                      >
                        {design.tag}
                      </span>
                    )}
                  </div>

                  {/* Zoom Overlay on Hover */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      opacity: 0,
                      transition: 'opacity 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: 700
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                  >
                    <Eye size={18} />
                    <span>Click to Preview</span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#121212', margin: 0, lineHeight: 1.3 }}>
                      {design.title}
                    </h3>
                    <p style={{ fontSize: '12.5px', color: 'rgba(0,0,0,0.6)', marginTop: '6px', lineHeight: 1.4 }}>
                      {design.subtitle}
                    </p>

                    {design.paperSpec && (
                      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#9A652F', fontWeight: 600 }}>
                        <span>📜</span>
                        <span>{design.paperSpec}</span>
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <button
                      onClick={() => onSelectDesign(design)}
                      style={{
                        height: '34px',
                        padding: '0 12px',
                        borderRadius: '999px',
                        backgroundColor: '#121212',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <Eye size={13} />
                      Preview
                    </button>

                    <a
                      href={waQuoteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        height: '34px',
                        padding: '0 12px',
                        borderRadius: '999px',
                        backgroundColor: '#25D366',
                        color: '#FFFFFF',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        textDecoration: 'none'
                      }}
                      className="hover-lift"
                    >
                      <MessageCircle size={13} />
                      Inquire
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Gallery Button */}
        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <button
            onClick={() => {
              if (onViewAllDesigns) {
                onViewAllDesigns();
              } else {
                window.location.hash = '#/designs';
              }
            }}
            style={{
              height: '46px',
              padding: '0 28px',
              borderRadius: '999px',
              backgroundColor: '#121212',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}
            className="hover-lift"
          >
            <span>Explore All Sample Designs & Printing Portfolio</span>
            <ArrowRight size={16} style={{ color: '#F5D6A8' }} />
          </button>
        </div>
      </div>
    </section>
  );
};
