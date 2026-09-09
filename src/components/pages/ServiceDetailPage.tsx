import React from 'react';
import { ArrowLeft, MessageCircle, Clock, CheckCircle, Sparkles, Phone, ExternalLink } from 'lucide-react';
import { serviceDetailsData } from '../../data/serviceDetailsData';
import { sampleBooks } from '../../data/sampleData';
import { siteConfig } from '../../config/siteConfig';

interface ServiceDetailPageProps {
  serviceId: string;
  onBack: () => void;
  onNavigatePage: (page: string) => void;
  onAddToCart?: (item: { id: string; title: string; price: number; type: 'book' }) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceId,
  onBack,
  onNavigatePage,
  onAddToCart
}) => {
  const service = serviceDetailsData[serviceId] || serviceDetailsData.reload;

  const whatsappInquireUrl = `${siteConfig.socialMedia.whatsappChat}?text=${encodeURIComponent(
    service.whatsappMessage || `Hi Unique Printers, I'm inquiring about ${service.title}`
  )}`;

  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#FFFBF5', paddingBottom: '60px' }}>
      {/* Breadcrumb & Navigation */}
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
            Services / <span style={{ color: '#F5D6A8' }}>{service.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Banner with Custom Background */}
      <div
        style={{
          position: 'relative',
          background: service.bgImage,
          color: '#FFFFFF',
          padding: '60px 16px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(500px 300px at 90% 10%, rgba(255,255,255,0.15), transparent)',
            pointerEvents: 'none'
          }}
        />

        <div className="site-container" style={{ position: 'relative', zIndex: 2 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255,255,255,0.18)',
              border: '1px solid rgba(255,255,255,0.25)',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              marginBottom: '16px'
            }}
          >
            {service.badge}
          </span>

          <h1
            className="serif"
            style={{
              fontSize: 'clamp(32px, 5vw, 54px)',
              lineHeight: 1.05,
              fontWeight: 400,
              maxWidth: '750px',
              margin: '0 0 16px 0'
            }}
          >
            {service.title}
          </h1>

          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '640px',
              margin: '0 0 24px 0'
            }}
          >
            {service.shortDesc}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <a
              href={whatsappInquireUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                height: '46px',
                padding: '0 24px',
                borderRadius: '999px',
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(37,211,102,0.4)'
              }}
              className="hover-lift"
            >
              <MessageCircle size={18} />
              {service.ctaText || 'Inquire on WhatsApp'}
            </a>

            {service.linkToPage && (
              <button
                onClick={() => onNavigatePage(service.linkToPage!.page)}
                style={{
                  height: '46px',
                  padding: '0 24px',
                  borderRadius: '999px',
                  backgroundColor: '#FFFFFF',
                  color: '#121212',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
                }}
                className="hover-lift"
              >
                {service.linkToPage.text}
              </button>
            )}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.8)',
                marginLeft: '8px'
              }}
            >
              <Clock size={15} style={{ color: '#F5D6A8' }} />
              Turnaround: <b style={{ color: '#FFFFFF' }}>{service.turnaroundTime}</b>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="site-container" style={{ marginTop: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {/* Left Column: Detailed Information */}
          <div>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                border: '1px solid rgba(0,0,0,0.08)',
                padding: '30px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
              }}
            >
              <h2 className="serif" style={{ fontSize: '26px', color: '#121212', marginBottom: '16px' }}>
                Service Overview
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: 'rgba(18,18,18,0.75)', lineHeight: 1.7, fontSize: '15px' }}>
                {service.fullDesc.map((p, idx) => (
                  <p key={idx} style={{ margin: 0 }}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Special Carriers Section for Reload */}
              {service.carriers && (
                <div style={{ marginTop: '28px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#121212', marginBottom: '12px' }}>
                    Supported Telecommunication Networks
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                    {service.carriers.map((carrier) => (
                      <div
                        key={carrier.name}
                        style={{
                          padding: '14px',
                          borderRadius: '16px',
                          backgroundColor: '#FFFBF5',
                          border: '1px solid rgba(0,0,0,0.08)'
                        }}
                      >
                        <div style={{ fontSize: '16px', fontWeight: 800, color: carrier.color }}>
                          {carrier.name}
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#666666', marginTop: '4px', lineHeight: 1.4 }}>
                          {carrier.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Sample Books Section if this is the Books Service */}
              {service.id === 'books' && (
                <div style={{ marginTop: '30px', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#121212', margin: 0 }}>
                      Featured School Books
                    </h3>
                    <button
                      onClick={() => onNavigatePage('books')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#B77B3D',
                        fontWeight: 700,
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      View All 100+ Books →
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                    {sampleBooks.slice(0, 3).map((b) => (
                      <div
                        key={b.id}
                        style={{
                          padding: '12px',
                          borderRadius: '14px',
                          backgroundColor: '#FFFBF5',
                          border: '1px solid rgba(0,0,0,0.06)',
                          display: 'flex',
                          gap: '10px'
                        }}
                      >
                        <div className={b.color} style={{ width: '50px', height: '65px', borderRadius: '8px', color: '#FFF', padding: '6px', fontSize: '8px', fontWeight: 800, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <span>{b.accent.toUpperCase()}</span>
                          <span>{b.grade}</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#121212' }} className="line-clamp-2">
                            {b.title}
                          </div>
                          <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#B77B3D', marginTop: '4px' }}>
                            Rs. {b.price}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <button
                      onClick={() => onNavigatePage('books')}
                      style={{
                        height: '42px',
                        padding: '0 22px',
                        borderRadius: '999px',
                        backgroundColor: '#121212',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '13px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      className="hover-lift"
                    >
                      Browse Complete Bookshelf Catalog →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Features & Quick Specifications */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Features list */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                border: '1px solid rgba(0,0,0,0.08)',
                padding: '24px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#121212', marginBottom: '16px' }}>
                Why Choose Unique Printers?
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {service.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFBF5',
                        border: '1px solid rgba(183,123,61,0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        flexShrink: 0
                      }}
                    >
                      {feat.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#121212' }}>
                        {feat.title}
                      </div>
                      <div style={{ fontSize: '12.5px', color: '#666666', marginTop: '2px', lineHeight: 1.4 }}>
                        {feat.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications Card */}
            {service.specs && (
              <div
                style={{
                  backgroundColor: '#121212',
                  color: '#F5E9D3',
                  borderRadius: '24px',
                  padding: '24px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.18)'
                }}
              >
                <h3 className="serif" style={{ fontSize: '20px', color: '#FFFFFF', marginBottom: '16px' }}>
                  Service Details & Timing
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {service.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingBottom: '10px',
                        borderBottom: idx === service.specs!.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                        fontSize: '13px'
                      }}
                    >
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>{spec.label}</span>
                      <span style={{ fontWeight: 700, color: '#FFFFFF', textAlign: 'right' }}>{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '20px' }}>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      height: '42px',
                      borderRadius: '999px',
                      backgroundColor: '#FFFFFF',
                      color: '#121212',
                      fontWeight: 700,
                      fontSize: '13px',
                      textDecoration: 'none'
                    }}
                  >
                    <Phone size={15} />
                    Call Us: {siteConfig.contact.phone}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
