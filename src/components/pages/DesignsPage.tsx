import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageCircle, Eye, Sparkles, Filter, Check, ArrowRight } from 'lucide-react';
import { useShopStore } from '../../store/shopStore';
import { DesignItem } from '../../types';
import { buildProductWhatsAppUrl } from '../../lib/whatsapp';
import { updateSEO } from '../../lib/seo';
import { siteConfig } from '../../config/siteConfig';

interface DesignsPageProps {
  onBack: () => void;
  onSelectDesign: (design: DesignItem) => void;
}

export const DesignsPage: React.FC<DesignsPageProps> = ({
  onBack,
  onSelectDesign
}) => {
  const { designs, designCategories } = useShopStore();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    updateSEO({
      title: 'Sample Design & Printing Works Portfolio',
      description: 'Explore custom wedding invitations, birthday posters, flex banners, business cards, and certificates designed & printed by Unique Printers in Wilgoda Kurunegala.',
      path: '#/designs',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Sample Designs & Printing Works - Unique Printers',
        description: 'Portfolio of custom wedding cards, business cards, posters and banners printed in Kurunegala.'
      }
    });
  }, []);

  const categories = ['All', ...designCategories];

  const filteredDesigns = activeCategory === 'All'
    ? designs
    : designs.filter((d) => d.cat === activeCategory);

  const customInviteUrl = `${siteConfig.socialMedia.whatsappChat}?text=${encodeURIComponent(
    'Hello Unique Printers team! 👋 I would like to request a custom invitation / banner design quotation. I have reference photos and details to discuss. Could you please advise?'
  )}`;

  return (
    <div style={{ minHeight: '85vh', backgroundColor: '#FFFBF5', paddingBottom: '70px' }}>
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
            Gallery / <span style={{ color: '#F5D6A8' }}>Sample Designs & Printing</span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #2D1A0E 0%, #1A0F08 50%, #121212 100%)',
          color: '#FFFFFF',
          padding: '48px 16px 54px 16px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(600px 300px at 80% 20%, rgba(183,123,61,0.3), transparent)',
            pointerEvents: 'none'
          }}
        />

        <div className="site-container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '999px', backgroundColor: 'rgba(255,255,255,0.14)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#F5D6A8' }}>
            <Sparkles size={12} />
            REAL WORK SAMPLES • WILGODA SHOP
          </div>

          <h1
            className="serif"
            style={{
              fontSize: 'clamp(28px, 4.5vw, 44px)',
              lineHeight: 1.1,
              marginTop: '14px',
              color: '#FFFFFF',
              fontWeight: 400
            }}
          >
            Sample Designs & Printing Works
          </h1>

          <p
            style={{
              marginTop: '12px',
              fontSize: '14.5px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.75)',
              maxWidth: '680px'
            }}
          >
            Every sample below was custom-designed and printed right here at Unique Printers Wilgoda. 
            Choose any design as a starting point, or bring your own idea and reference images to WhatsApp.
          </p>

          <div style={{ marginTop: '22px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <a
              href={customInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                height: '42px',
                padding: '0 20px',
                borderRadius: '999px',
                backgroundColor: '#B77B3D',
                color: '#FFFFFF',
                fontSize: '13.5px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none'
              }}
              className="hover-lift"
            >
              <MessageCircle size={16} />
              Request Custom Design on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Category Pills & Gallery */}
      <div className="site-container" style={{ marginTop: '32px' }}>
        {/* Category Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '8px',
            marginBottom: '24px'
          }}
        >
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
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
                  border: isSelected ? '1px solid #121212' : '1px solid rgba(0,0,0,0.1)',
                  backgroundColor: isSelected ? '#121212' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#121212',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.12)' : 'none'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Designs Count */}
        <div style={{ fontSize: '13.5px', color: 'rgba(0,0,0,0.6)', marginBottom: '20px' }}>
          Showing <b>{filteredDesigns.length}</b> printed samples {activeCategory !== 'All' ? `under ${activeCategory}` : ''}
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}
        >
          {filteredDesigns.map((design) => {
            const waQuoteUrl = buildProductWhatsAppUrl({
              productName: `${design.title} (${design.cat})`,
              category: design.cat,
              price: design.price,
              productPath: `#/designs?item=${design.id}`,
              customNote: design.paperSpec ? `Paper / Finishing: ${design.paperSpec}` : undefined
            });

            return (
              <div
                key={design.id}
                style={{
                  borderRadius: '20px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                className="hover-lift"
              >
                {/* Image Frame */}
                <div
                  onClick={() => onSelectDesign(design)}
                  style={{
                    height: '240px',
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
                </div>

                {/* Content */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#121212', margin: 0, lineHeight: 1.3 }}>
                      {design.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'rgba(0,0,0,0.6)', marginTop: '6px', lineHeight: 1.45 }}>
                      {design.subtitle}
                    </p>

                    {design.paperSpec && (
                      <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#9A652F', fontWeight: 600 }}>
                        <span>📜</span>
                        <span>{design.paperSpec}</span>
                      </div>
                    )}

                    {design.priceNote && (
                      <div style={{ marginTop: '4px', fontSize: '11.5px', color: 'rgba(0,0,0,0.5)' }}>
                        {design.priceNote}
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button
                      onClick={() => onSelectDesign(design)}
                      style={{
                        height: '38px',
                        borderRadius: '999px',
                        backgroundColor: '#121212',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Eye size={14} />
                      Full Preview
                    </button>

                    <a
                      href={waQuoteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        height: '38px',
                        borderRadius: '999px',
                        backgroundColor: '#25D366',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        textDecoration: 'none'
                      }}
                      className="hover-lift"
                    >
                      <MessageCircle size={14} />
                      Get Quote
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
