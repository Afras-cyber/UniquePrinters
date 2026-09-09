import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Eye, Sparkles, Filter, Check } from 'lucide-react';
import { sampleDesigns } from '../../data/sampleData';
import { DesignItem } from '../../types';
import { siteConfig } from '../../config/siteConfig';

interface DesignsPageProps {
  onBack: () => void;
  onSelectDesign: (design: DesignItem) => void;
}

export const DesignsPage: React.FC<DesignsPageProps> = ({
  onBack,
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

  const customInviteUrl = `${siteConfig.socialMedia.whatsappChat}?text=${encodeURIComponent(
    'Hi Unique Printers, I would like to request a custom invitation style! I have reference photos and details to share.'
  )}`;

  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#FFFBF5', paddingBottom: '60px' }}>
      {/* Header Bar */}
      <div style={{ backgroundColor: '#121212', color: '#FFFFFF', padding: '12px 16px' }}>
        <div
          className="site-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <button
            onClick={onBack}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>

          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
            Gallery / <span style={{ color: '#F5D6A8' }}>Design & Printing Works</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div
        style={{
          backgroundColor: '#121212',
          color: '#FFFFFF',
          padding: '50px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div className="site-container">
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '999px',
              backgroundColor: 'rgba(183, 123, 61, 0.2)',
              border: '1px solid rgba(183, 123, 61, 0.4)',
              color: '#F5D6A8',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              marginBottom: '14px'
            }}
          >
            <Sparkles size={12} />
            PRINTING PORTFOLIO & INVITATIONS
          </span>

          <h1
            className="serif"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 50px)',
              lineHeight: 1.05,
              fontWeight: 400,
              margin: '0 0 14px 0'
            }}
          >
            Sample Designs & Printing Works
          </h1>

          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', maxWidth: '640px', lineHeight: 1.6, margin: 0 }}>
            Explore our crafted wedding invitations, Waleema cards, birthday posters, event banners, and executive business cards. Tap any design to view details or message our shop on WhatsApp with your favorite style.
          </p>
        </div>
      </div>

      {/* Custom Style Banner */}
      <div className="site-container" style={{ marginTop: '24px' }}>
        <div
          style={{
            borderRadius: '20px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(183, 123, 61, 0.3)',
            padding: '20px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: '#FFFBF5',
                border: '1px solid rgba(183,123,61,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px'
              }}
            >
              💌
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#121212' }}>
                Need a Custom Invitation Style?
              </div>
              <div style={{ fontSize: '13px', color: '#666666', marginTop: '2px' }}>
                Send us your own photo, Pinterest concept, or theme ideas on WhatsApp!
              </div>
            </div>
          </div>

          <a
            href={customInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              height: '42px',
              padding: '0 20px',
              borderRadius: '999px',
              backgroundColor: '#25D366',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '13.5px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(37,211,102,0.3)'
            }}
            className="hover-lift"
          >
            <MessageCircle size={17} />
            Request Custom Invitation Style
          </a>
        </div>
      </div>

      {/* Filter Tabs & Gallery */}
      <div className="site-container" style={{ marginTop: '30px' }}>
        {/* Category Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            marginBottom: '24px'
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  height: '40px',
                  padding: '0 18px',
                  borderRadius: '999px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  border: isActive ? '1px solid #121212' : '1px solid rgba(0,0,0,0.1)',
                  backgroundColor: isActive ? '#121212' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#121212',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}
        >
          {filteredDesigns.map((item) => {
            const itemWhatsAppUrl = `${siteConfig.socialMedia.whatsappChat}?text=${encodeURIComponent(
              `Hi Unique Printers, I need this style invitation: "${item.title}" (${item.cat}). Can you please share pricing and quantity options?`
            )}`;

            return (
              <div
                key={item.id}
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid rgba(0, 0, 0, 0.09)',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s ease'
                }}
                className="hover-lift"
              >
                {/* Image / Gradient Container */}
                <div
                  onClick={() => onSelectDesign(item)}
                  style={{
                    height: '230px',
                    position: 'relative',
                    cursor: 'pointer',
                    backgroundColor: '#1E1E1E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
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
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <div className="serif" style={{ fontSize: '26px', color: '#FFFFFF', textAlign: 'center' }}>
                        {item.title}
                      </div>
                    </div>
                  )}

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

                  {/* Eye preview hint button */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(6px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF'
                    }}
                  >
                    <Eye size={16} />
                  </div>
                </div>

                {/* Card Info & WhatsApp Action */}
                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#B77B3D', letterSpacing: '0.06em' }}>
                      {item.cat.toUpperCase()}
                    </div>
                    <h3
                      style={{
                        fontSize: '15px',
                        fontWeight: 800,
                        color: '#121212',
                        lineHeight: 1.3,
                        marginTop: '4px'
                      }}
                      className="line-clamp-1"
                    >
                      {item.title}
                    </h3>
                    <div style={{ fontSize: '12.5px', color: '#666666', marginTop: '2px' }} className="line-clamp-1">
                      {item.subtitle}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#888888', marginTop: '6px' }}>
                      Paper: <span style={{ fontWeight: 600, color: '#333333' }}>{item.paperSpec || '300gsm'}</span>
                    </div>
                  </div>

                  {/* Action Row */}
                  <div
                    style={{
                      marginTop: '16px',
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(0,0,0,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px'
                    }}
                  >
                    <button
                      onClick={() => onSelectDesign(item)}
                      style={{
                        height: '32px',
                        padding: '0 12px',
                        borderRadius: '999px',
                        backgroundColor: '#FFFBF5',
                        border: '1px solid rgba(0,0,0,0.1)',
                        color: '#121212',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Preview
                    </button>

                    {/* Direct WhatsApp button with pre-filled message */}
                    <a
                      href={itemWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="I need this style invitation"
                      style={{
                        height: '32px',
                        padding: '0 14px',
                        borderRadius: '999px',
                        backgroundColor: '#25D366',
                        color: '#FFFFFF',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        textDecoration: 'none'
                      }}
                      className="hover-lift"
                    >
                      <MessageCircle size={14} />
                      I Need This Style
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
