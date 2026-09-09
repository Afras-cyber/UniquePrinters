import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { servicesData } from '../../data/sampleData';
import { siteConfig } from '../../config/siteConfig';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="services" style={{ padding: '40px 16px 50px 16px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '28px'
        }}
      >
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '0.18em', fontWeight: 800, color: '#9A652F' }}>
            WHAT WE DO
          </div>
          <h2
            className="serif"
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              marginTop: '8px',
              color: '#121212'
            }}
          >
            Our Services
          </h2>
        </div>

        <p style={{ fontSize: '14.5px', color: 'rgba(18, 18, 18, 0.65)', maxWidth: '440px', margin: 0 }}>
          Six essential services under one roof in Wilgoda — each with dedicated equipment, expert staff, and fast turnaround. Tap any service to explore options.
        </p>
      </div>

      {/* Services Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px'
        }}
      >
        {servicesData.map((service) => (
          <div
            key={service.id}
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
