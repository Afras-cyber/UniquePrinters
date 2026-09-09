import React, { useState } from 'react';
import { Eye, Sparkles } from 'lucide-react';
import { sampleDesigns } from '../../data/sampleData';
import { DesignItem } from '../../types';

interface DesignsPortfolioProps {
  onSelectDesign: (design: DesignItem) => void;
}

export const DesignsPortfolio: React.FC<DesignsPortfolioProps> = ({
  onSelectDesign
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Invitations',
    'Posters',
    'Banners',
    'Business Cards',
    'Certificates'
  ];

  const filteredDesigns = activeCategory === 'All'
    ? sampleDesigns
    : sampleDesigns.filter((d) => d.cat === activeCategory);

  return (
    <section
      id="designs"
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid rgba(18, 18, 18, 0.08)',
        borderBottom: '1px solid rgba(18, 18, 18, 0.08)',
        padding: '50px 16px 65px 16px'
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
            gap: '16px',
            marginBottom: '30px'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.18em', fontWeight: 800, color: '#9A652F' }}>
              PORTFOLIO & SAMPLES
            </div>
            <h2
              className="serif"
              style={{
                fontSize: 'clamp(26px, 3.8vw, 40px)',
                lineHeight: 1.05,
                marginTop: '6px',
                color: '#121212'
              }}
            >
              Sample Designs & Printing Works
            </h2>
          </div>

          {/* Filter Chips */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px'
            }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    height: '38px',
                    padding: '0 16px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: 600,
                    border: isActive ? '1px solid #121212' : '1px solid rgba(0,0,0,0.1)',
                    backgroundColor: isActive ? '#121212' : '#FFFBF5',
                    color: isActive ? '#FFFFFF' : '#121212',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid (1 col on small mobile, 2 on tablet, 4 on desktop) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '18px'
          }}
        >
          {filteredDesigns.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectDesign(item)}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(0, 0, 0, 0.09)',
                backgroundColor: '#FFFBF5',
                boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column'
              }}
              className="hover-lift"
            >
              {/* Image / Gradient Preview Area */}
              <div
                style={{
                  height: '210px',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: '#2A2A2A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                    loading="lazy"
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: item.grad
                        ? `linear-gradient(135deg, #B77B3D, #121212)`
                        : 'linear-gradient(135deg, #FF8A3D, #FFE9C6)',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div className="serif" style={{ fontSize: '24px', color: '#FFFFFF', textAlign: 'center', marginTop: 'auto' }}>
                      {item.title}
                    </div>
                  </div>
                )}

                {/* Tag / Badge */}
                {item.tag && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(255,255,255,0.92)',
                      color: '#121212',
                      fontSize: '10px',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
                    }}
                  >
                    {item.tag}
                  </span>
                )}

                {/* Hover overlay hint */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(6px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF'
                  }}
                >
                  <Eye size={15} />
                </div>
              </div>

              {/* Card Meta Content */}
              <div
                style={{
                  padding: '14px 16px',
                  backgroundColor: '#FFFFFF',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(0,0,0,0.06)'
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#B77B3D', letterSpacing: '0.05em' }}>
                    {item.cat}
                  </div>
                  <h3
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#121212',
                      lineHeight: 1.3,
                      marginTop: '3px'
                    }}
                    className="line-clamp-1"
                  >
                    {item.title}
                  </h3>
                  <div style={{ fontSize: '12px', color: '#666666', marginTop: '2px' }} className="line-clamp-1">
                    {item.subtitle}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '12px',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(0,0,0,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '11px'
                  }}
                >
                  <span style={{ color: '#888888', fontWeight: 500 }}>
                    {item.paperSpec || '300gsm'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDesign(item);
                    }}
                    style={{
                      height: '28px',
                      padding: '0 12px',
                      borderRadius: '999px',
                      backgroundColor: '#121212',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    View Design
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div style={{ marginTop: '36px', textAlign: 'center' }}>
          <a
            href="https://wa.me/94771234567?text=Hi%20Unique%20Printers%2C%20I%20would%20like%20to%20see%20more%20invitation%20and%20printing%20samples."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              height: '46px',
              padding: '0 26px',
              borderRadius: '999px',
              backgroundColor: '#FFFBF5',
              border: '1px solid rgba(0,0,0,0.12)',
              color: '#121212',
              fontWeight: 700,
              fontSize: '13.5px',
              textDecoration: 'none'
            }}
            className="hover-lift"
          >
            <Sparkles size={16} style={{ color: '#B77B3D' }} />
            Inquire for 50+ Custom Sample Templates on WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
};
