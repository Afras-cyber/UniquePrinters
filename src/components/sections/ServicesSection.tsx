import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, LayoutGrid, MoveHorizontal } from 'lucide-react';
import { servicesData } from '../../data/sampleData';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [mobileView, setMobileView] = useState<'grid' | 'carousel'>('grid');
  const [activeSlide, setActiveSlide] = useState(0);

  const handleCarouselScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollLeft = target.scrollLeft;
    const cardWidth = target.offsetWidth * 0.85;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex !== activeSlide && newIndex >= 0 && newIndex < servicesData.length) {
      setActiveSlide(newIndex);
    }
  };

  return (
    <section id="services" style={{ padding: 'clamp(28px, 4vw, 44px) 16px clamp(36px, 5vw, 54px) 16px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        <div>
          <div style={{ fontSize: '10.5px', letterSpacing: '0.18em', fontWeight: 800, color: '#9A652F' }}>
            WHAT WE DO
          </div>
          <h2
            className="serif"
            style={{
              fontSize: 'clamp(26px, 4vw, 40px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginTop: '6px',
              color: '#121212',
              margin: '6px 0 0 0'
            }}
          >
            Our Services
          </h2>
        </div>

        {/* Desktop Description */}
        <p className="desktop-only" style={{ fontSize: '14px', color: 'rgba(18, 18, 18, 0.65)', maxWidth: '440px', margin: 0 }}>
          Six essential services under one roof in Wilgoda — each with dedicated equipment, expert staff, and fast turnaround. Tap any service to explore options.
        </p>

        {/* Mobile Subtitle & View Toggle */}
        <div className="mobile-only" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginTop: '2px' }}>
          <p style={{ fontSize: '12px', color: 'rgba(18, 18, 18, 0.65)', margin: 0, fontWeight: 500 }}>
            6 services in Wilgoda • Tap to view pricing
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', backgroundColor: '#F5F5F5', padding: '2px', borderRadius: '8px' }}>
            <button
              onClick={() => setMobileView('grid')}
              aria-label="Grid view"
              title="Compact 2-Column Grid"
              style={{
                width: '28px',
                height: '26px',
                borderRadius: '6px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: mobileView === 'grid' ? '#FFFFFF' : 'transparent',
                color: mobileView === 'grid' ? '#121212' : '#888888',
                boxShadow: mobileView === 'grid' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer'
              }}
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setMobileView('carousel')}
              aria-label="Swipe view"
              title="Swipe Carousel"
              style={{
                width: '28px',
                height: '26px',
                borderRadius: '6px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: mobileView === 'carousel' ? '#FFFFFF' : 'transparent',
                color: mobileView === 'carousel' ? '#121212' : '#888888',
                boxShadow: mobileView === 'carousel' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer'
              }}
            >
              <MoveHorizontal size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE VIEW CONTAINER ================= */}
      <div className="services-mobile-container">
        {mobileView === 'grid' ? (
          /* --- Compact 2-Column Grid (Shows all 6 services with NO long scrolling) --- */
          <div className="services-mobile-grid">
            {servicesData.map((service) => (
              <div
                key={`mob-grid-${service.id}`}
                onClick={() => onSelectService(service.id)}
                style={{
                  borderRadius: '16px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(18, 18, 18, 0.08)',
                  padding: '13px 11px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  minHeight: '142px',
                  transition: 'all 0.2s ease'
                }}
                className="hover-lift"
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFBF5',
                        border: '1px solid rgba(183, 123, 61, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px'
                      }}
                    >
                      {service.icon}
                    </div>

                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: '#121212',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <ArrowUpRight size={12} />
                    </div>
                  </div>

                  <h3
                    style={{
                      marginTop: '9px',
                      fontSize: '13px',
                      fontWeight: 800,
                      color: '#121212',
                      lineHeight: 1.25
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      marginTop: '3px',
                      fontSize: '10.5px',
                      lineHeight: 1.35,
                      color: 'rgba(18, 18, 18, 0.65)'
                    }}
                    className="line-clamp-2"
                  >
                    {service.desc}
                  </p>
                </div>

                <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      color: '#B77B3D',
                      backgroundColor: '#FFF8ED',
                      padding: '2px 5px',
                      borderRadius: '4px'
                    }}
                  >
                    {service.chips[0]}
                  </span>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#B77B3D', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                    View <ArrowRight size={9} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* --- Horizontal Swipe Carousel (Interactive full cards with peek) --- */
          <div>
            <div
              className="services-mobile-carousel no-scrollbar"
              onScroll={handleCarouselScroll}
            >
              {servicesData.map((service) => (
                <div
                  key={`mob-car-${service.id}`}
                  onClick={() => onSelectService(service.id)}
                  className="services-mobile-carousel-card hover-lift"
                  style={{
                    borderRadius: '20px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(18, 18, 18, 0.08)',
                    padding: '18px 16px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          backgroundColor: '#FFFBF5',
                          border: '1px solid rgba(183, 123, 61, 0.25)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '22px'
                        }}
                      >
                        {service.icon}
                      </div>

                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          backgroundColor: '#121212',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <ArrowUpRight size={15} />
                      </div>
                    </div>

                    <h3
                      style={{
                        marginTop: '12px',
                        fontSize: '16px',
                        fontWeight: 800,
                        color: '#121212'
                      }}
                    >
                      {service.title}
                    </h3>

                    <p
                      style={{
                        marginTop: '6px',
                        fontSize: '12.5px',
                        lineHeight: 1.5,
                        color: 'rgba(18, 18, 18, 0.65)'
                      }}
                    >
                      {service.desc}
                    </p>
                  </div>

                  <div>
                    <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {service.chips.map((chip) => (
                        <span
                          key={chip}
                          style={{
                            padding: '3px 8px',
                            borderRadius: '999px',
                            backgroundColor: 'rgba(18, 18, 18, 0.04)',
                            fontSize: '10.5px',
                            fontWeight: 600,
                            color: '#444444'
                          }}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    <div
                      style={{
                        marginTop: '14px',
                        paddingTop: '10px',
                        borderTop: '1px solid rgba(0,0,0,0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#B77B3D'
                      }}
                    >
                      <span>View Full Details & Pricing</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination indicator dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '10px' }}>
              {servicesData.map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    width: activeSlide === idx ? '18px' : '6px',
                    height: '6px',
                    borderRadius: '999px',
                    backgroundColor: activeSlide === idx ? '#B77B3D' : 'rgba(0,0,0,0.15)',
                    transition: 'all 0.25s ease'
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ================= DESKTOP SERVICES GRID ================= */}
      <div className="services-desktop-grid">
        {servicesData.map((service) => (
          <div
            key={`desk-${service.id}`}
            onClick={() => onSelectService(service.id)}
            style={{
              position: 'relative',
              borderRadius: '22px',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(18, 18, 18, 0.08)',
              padding: '24px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            className="hover-lift"
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFBF5',
                    border: '1px solid rgba(183, 123, 61, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px'
                  }}
                >
                  {service.icon}
                </div>

                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#121212',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ArrowUpRight size={16} />
                </div>
              </div>

              <h3
                style={{
                  marginTop: '16px',
                  fontSize: '17px',
                  fontWeight: 800,
                  letterSpacing: '-0.01em',
                  color: '#121212'
                }}
              >
                {service.title}
              </h3>

              <p
                style={{
                  marginTop: '8px',
                  fontSize: '13.5px',
                  lineHeight: 1.55,
                  color: 'rgba(18, 18, 18, 0.65)'
                }}
              >
                {service.desc}
              </p>
            </div>

            <div>
              <div style={{ marginTop: '18px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {service.chips.map((chip) => (
                  <span
                    key={chip}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(18, 18, 18, 0.04)',
                      border: '1px solid rgba(18, 18, 18, 0.06)',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#444444'
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div
                style={{
                  marginTop: '18px',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: '#B77B3D'
                }}
              >
                <span>View Full Details & Pricing</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

