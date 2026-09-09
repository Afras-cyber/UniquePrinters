import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface DesktopHeroProps {
  onExploreServices: () => void;
  onViewDesigns: () => void;
}

export const DesktopHero: React.FC<DesktopHeroProps> = ({
  onExploreServices,
  onViewDesigns
}) => {
  const serviceTags = [
    'Printing',
    'Books',
    'Stationery',
    'Reload',
    'Laminating',
    'Computer Work'
  ];

  return (
    <section
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '40px 16px 60px 16px'
      }}
      className="desktop-hero-section"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}
      >
        {/* Left Column: Headline, Value Proposition, Action CTAs */}
        <div>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(183, 123, 61, 0.25)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: '#121212'
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#B77B3D',
                display: 'inline-block'
              }}
              className="animate-soft-pulse"
            />
            WILGODA'S MOST TRUSTED PRINT SHOP • 10+ YEARS
          </div>

          {/* Heading */}
          <h1
            className="serif"
            style={{
              marginTop: '20px',
              fontSize: 'clamp(36px, 5.2vw, 58px)',
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              fontWeight: 400,
              color: '#121212'
            }}
          >
            All Your{' '}
            <span style={{ fontStyle: 'italic', color: '#9A652F' }}>Printing,</span>
            <br />
            School & Office
            <br />
            Needs Under
            <br />
            One Roof.
          </h1>

          {/* Description */}
          <p
            style={{
              marginTop: '20px',
              fontSize: '16px',
              lineHeight: 1.65,
              color: 'rgba(18, 18, 18, 0.65)',
              maxWidth: '520px'
            }}
          >
            Unique Printers is Wilgoda's one-stop destination for mobile reloads, school textbooks, A-Z stationery, custom wedding invitations, posters, lamination, and typing. Quality printing, honest pricing, and same-day delivery.
          </p>

          {/* Buttons */}
          <div style={{ marginTop: '28px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <button
              onClick={onExploreServices}
              style={{
                height: '46px',
                padding: '0 26px',
                borderRadius: '999px',
                backgroundColor: '#121212',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 24px rgba(0,0,0,0.18)'
              }}
              className="hover-lift"
            >
              Explore Services <ArrowRight size={16} />
            </button>

            <button
              onClick={onViewDesigns}
              style={{
                height: '46px',
                padding: '0 26px',
                borderRadius: '999px',
                backgroundColor: '#FFFFFF',
                color: '#121212',
                fontWeight: 600,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(18,18,18,0.12)',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
              }}
              className="hover-lift"
            >
              <Sparkles size={15} style={{ color: '#B77B3D' }} />
              View Sample Designs
            </button>
          </div>

          {/* Service Pills */}
          <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {serviceTags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(18, 18, 18, 0.1)',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: '#121212',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Social Proof Avatars */}
          <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex', marginLeft: '6px' }}>
              {['S', 'K', 'R', 'U'].map((initial, i) => (
                <div
                  key={initial}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '2px solid #FFFBF5',
                    background: 'linear-gradient(135deg, #B77B3D, #5A3210)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginLeft: i === 0 ? 0 : '-10px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                  }}
                >
                  {initial}
                </div>
              ))}
            </div>
            <div style={{ fontSize: '12.5px', lineHeight: 1.3 }}>
              <div style={{ fontWeight: 700, color: '#121212', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>Trusted by 1000+ families</span>
                <CheckCircle2 size={13} style={{ color: '#1D9E75' }} />
              </div>
              <div style={{ color: 'rgba(18,18,18,0.5)' }}>in Kurunegala district</div>
            </div>
          </div>
        </div>

        {/* Right Column: Layered 3D Cards Showcase */}
        <div
          style={{
            position: 'relative',
            minHeight: '520px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Background Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '32px',
              background: 'linear-gradient(135deg, #FFF1D9 0%, #FFE8C0 50%, #F6D7A0 100%)',
              border: '1px solid rgba(183, 123, 61, 0.25)',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-80px',
                right: '-80px',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                backgroundColor: 'rgba(183, 123, 61, 0.25)',
                filter: 'blur(50px)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-80px',
                left: '-80px',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                backgroundColor: 'rgba(18, 18, 18, 0.08)',
                filter: 'blur(40px)'
              }}
            />
          </div>

          {/* Card 1: Elegant Wedding Invitation (Rotated -6deg) */}
          <div
            style={{
              position: 'absolute',
              left: '6%',
              top: '8%',
              width: '60%',
              transform: 'rotate(-5deg)',
              borderRadius: '20px',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
              border: '1px solid rgba(0,0,0,0.06)',
              padding: '16px',
              zIndex: 1,
              transition: 'transform 0.3s ease'
            }}
            className="hover-lift"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px', letterSpacing: '0.15em', fontWeight: 800, color: '#B77B3D' }}>
              <span>WEDDING INVITATION</span>
              <span style={{ padding: '2px 8px', borderRadius: '999px', backgroundColor: 'rgba(183, 123, 61, 0.12)', color: '#9A652F' }}>
                GOLD FOIL
              </span>
            </div>

            <div className="serif" style={{ marginTop: '16px', fontSize: '26px', lineHeight: 1, textAlign: 'center', color: '#121212' }}>
              Anu <span style={{ fontStyle: 'italic', color: '#B77B3D' }}>&</span> Nimali
            </div>
            <div style={{ marginTop: '8px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(183,123,61,0.4), transparent)' }} />
            <div style={{ marginTop: '10px', textAlign: 'center', fontSize: '9.5px', letterSpacing: '0.2em', color: '#666666' }}>
              YOU ARE INVITED • 12 DEC 2025
            </div>

            <div style={{ marginTop: '14px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              {[1, 2, 3].map((num) => (
                <div key={num} style={{ height: '36px', borderRadius: '8px', backgroundColor: '#FFFBF5', border: '1px solid rgba(0,0,0,0.06)' }} />
              ))}
            </div>
          </div>

          {/* Card 2: Poster Card (Rotated 8deg) */}
          <div
            style={{
              position: 'absolute',
              right: '5%',
              top: '30%',
              width: '56%',
              transform: 'rotate(7deg)',
              borderRadius: '20px',
              backgroundColor: '#121212',
              color: '#FFFFFF',
              boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
              padding: '16px',
              border: '1px solid rgba(255,255,255,0.12)',
              zIndex: 2,
              transition: 'transform 0.3s ease'
            }}
            className="hover-lift"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#B77B3D', fontWeight: 800 }}>
                POSTER • A3 • 300GSM
              </span>
              <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#FFFFFF', color: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>
                ↗
              </span>
            </div>

            <div style={{ marginTop: '14px', fontSize: '20px', fontWeight: 800, lineHeight: 1.1 }}>
              GRAND OPENING
              <br />
              <span style={{ color: '#B77B3D' }}>SALE 50% OFF</span>
            </div>

            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
              <div style={{ height: '24px', padding: '0 10px', borderRadius: '999px', backgroundColor: '#B77B3D', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                PRINTED TODAY
              </div>
              <div style={{ height: '24px', padding: '0 10px', borderRadius: '999px', backgroundColor: 'rgba(255,255,255,0.1)', fontSize: '10px', display: 'flex', alignItems: 'center' }}>
                Rs. 450
              </div>
            </div>
          </div>

          {/* Card 3: School Books Card (Rotated -2deg) */}
          <div
            style={{
              position: 'absolute',
              left: '16%',
              bottom: '6%',
              width: '74%',
              transform: 'rotate(-2deg)',
              borderRadius: '20px',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 20px 50px rgba(0,0,0,0.16)',
              border: '1px solid rgba(0,0,0,0.06)',
              padding: '12px 14px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              zIndex: 3,
              transition: 'transform 0.3s ease'
            }}
            className="hover-lift"
          >
            <div style={{ width: '90px', flexShrink: 0 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px' }}>
                <div style={{ height: '48px', borderRadius: '8px', backgroundColor: '#1E3A5F', padding: '6px', color: '#FFFFFF', fontSize: '8px', lineHeight: 1.1, fontWeight: 700 }}>
                  GRADE 6<br />SCIENCE<br />WORKBOOK
                </div>
                <div style={{ height: '32px', borderRadius: '8px', backgroundColor: '#B77B3D', padding: '6px', color: '#FFFFFF', fontSize: '8px', fontWeight: 700 }}>
                  O/L PAST PAPERS
                </div>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#121212' }}>School Books Stock</div>
              <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.5)', marginTop: '2px' }} className="line-clamp-1">
                Grade 5 • O/L • A/L • Past Papers • Workbooks
              </div>
              <div style={{ marginTop: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ padding: '3px 8px', borderRadius: '999px', backgroundColor: '#121212', color: '#FFFFFF', fontSize: '9.5px', fontWeight: 600 }}>
                  In Stock • Wilgoda
                </span>
                <span style={{ padding: '3px 8px', borderRadius: '999px', backgroundColor: '#FFFBF5', border: '1px solid rgba(0,0,0,0.1)', fontSize: '9.5px' }}>
                  From Rs. 450
                </span>
              </div>
            </div>

            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#B77B3D', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>
              ↗
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
