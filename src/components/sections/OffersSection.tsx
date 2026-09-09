import React, { useState, useEffect } from 'react';
import { Sparkles, Copy, Check, ArrowRight, Tag, Clock } from 'lucide-react';
import { newArrivals, saleBundles } from '../../data/sampleData';
import { siteConfig } from '../../config/siteConfig';

interface OffersSectionProps {
  onAddToCart: (item: { id: string; title: string; price: number; type: 'product' }) => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ onAddToCart }) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 12,
    mins: 38,
    secs: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) {
          return { ...prev, secs: prev.secs - 1 };
        }
        if (prev.mins > 0) {
          return { ...prev, mins: 59, secs: 59 };
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        }
        if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText('SCHOOL20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="offers" style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 16px 60px 16px' }}>
      {/* 1. New Arrivals Cards */}
      <div
        style={{
          borderRadius: '24px',
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(0,0,0,0.1)',
          padding: '24px',
          boxShadow: '0 10px 28px rgba(0,0,0,0.04)',
          marginBottom: '28px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#121212', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#B77B3D', display: 'inline-block' }} />
            New Arrivals
          </h3>
          <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '999px', backgroundColor: '#FFFBF5', border: '1px solid rgba(0,0,0,0.08)', fontWeight: 600 }}>
            This week • 4 items
          </span>
        </div>

        <div
          style={{
            marginTop: '18px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '14px'
          }}
        >
          {newArrivals.map((item) => (
            <div
              key={item.id}
              style={{
                borderRadius: '16px',
                backgroundColor: '#FFFBF5',
                border: '1px solid rgba(0,0,0,0.08)',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              className="hover-lift"
            >
              <div>
                <div
                  style={{
                    height: '96px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #FFFFFF, #F0D9B5)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px'
                  }}
                >
                  {item.icon}
                </div>

                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '999px', backgroundColor: '#121212', color: '#FFFFFF', fontSize: '9.5px', fontWeight: 800 }}>
                    {item.badge}
                  </span>
                  <span style={{ fontSize: '11px', color: 'rgba(0,0,0,0.5)' }}>In stock</span>
                </div>

                <h4 style={{ marginTop: '6px', fontSize: '13.5px', fontWeight: 700, color: '#121212', lineHeight: 1.3 }} className="line-clamp-2">
                  {item.title}
                </h4>
              </div>

              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 800, fontSize: '14px', color: '#121212' }}>
                  Rs. {item.price.toLocaleString()}
                </span>
                <button
                  onClick={() => onAddToCart({ id: `new-${item.id}`, title: item.title, price: item.price, type: 'product' })}
                  style={{
                    height: '28px',
                    padding: '0 12px',
                    borderRadius: '999px',
                    backgroundColor: '#121212',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Banner with Live Countdown Timer */}
      <div
        style={{
          position: 'relative',
          borderRadius: '28px',
          overflow: 'hidden',
          backgroundColor: '#121212',
          color: '#FFFFFF',
          padding: '32px',
          boxShadow: '0 18px 48px rgba(0,0,0,0.25)',
          marginBottom: '28px'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(600px 400px at 20% 0%, rgba(183,123,61,0.35), transparent), radial-gradient(500px 300px at 90% 100%, rgba(255,215,160,0.2), transparent)',
            pointerEvents: 'none'
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            alignItems: 'center'
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '999px',
                backgroundColor: '#B77B3D',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.06em'
              }}
            >
              <Clock size={12} />
              BACK TO SCHOOL • LIMITED TIME OFFER
            </div>

            <h3
              className="serif"
              style={{
                marginTop: '14px',
                fontSize: 'clamp(28px, 4.5vw, 40px)',
                lineHeight: 1.05,
                fontWeight: 400
              }}
            >
              Up to <span style={{ color: '#B77B3D' }}>20% OFF</span> on
              <br />
              Books & Stationery
            </h3>

            <p style={{ marginTop: '12px', fontSize: '14px', color: 'rgba(255,255,255,0.7)', maxWidth: '460px', lineHeight: 1.5 }}>
              Grade 5 scholarship bundles, CR notebooks, geometry boxes, and backpacks. Claim discount directly at the Wilgoda shop or order on WhatsApp.
            </p>

            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <a
                href={`${siteConfig.socialMedia.whatsappChat}?text=${encodeURIComponent('Hi Unique Printers, I want to claim the SCHOOL20 promo offer.')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  height: '42px',
                  padding: '0 20px',
                  borderRadius: '999px',
                  backgroundColor: '#FFFFFF',
                  color: '#121212',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none'
                }}
                className="hover-lift"
              >
                Claim Offer on WhatsApp →
              </a>

              <button
                onClick={copyCode}
                style={{
                  height: '42px',
                  padding: '0 16px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#FFFFFF',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                {copied ? <Check size={14} style={{ color: '#10B981' }} /> : <Copy size={14} />}
                Use code: <b style={{ color: '#F5D6A8' }}>SCHOOL20</b>
              </button>
            </div>
          </div>

          {/* Countdown Clock Squares */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {[
                { label: 'Days', val: String(timeLeft.days).padStart(2, '0') },
                { label: 'Hours', val: String(timeLeft.hours).padStart(2, '0') },
                { label: 'Mins', val: String(timeLeft.mins).padStart(2, '0') },
                { label: 'Secs', val: String(timeLeft.secs).padStart(2, '0') }
              ].map((c) => (
                <div
                  key={c.label}
                  style={{
                    borderRadius: '16px',
                    backgroundColor: '#FFFFFF',
                    color: '#121212',
                    padding: '12px 6px',
                    textAlign: 'center',
                    border: '1px solid rgba(0,0,0,0.1)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                >
                  <div style={{ fontSize: '24px', fontWeight: 800, lineHeight: 1 }}>{c.val}</div>
                  <div style={{ fontSize: '9.5px', letterSpacing: '0.12em', marginTop: '4px', opacity: 0.65 }}>
                    {c.label.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '12px', fontSize: '11px', color: 'rgba(255,255,255,0.55)', textAlign: 'center' }}>
              Offer ends soon • 112 people claimed in Wilgoda
            </div>
          </div>
        </div>
      </div>

      {/* 3. Sale Bundles */}
      <div
        style={{
          borderRadius: '24px',
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(0,0,0,0.1)',
          padding: '24px',
          boxShadow: '0 10px 28px rgba(0,0,0,0.04)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#121212', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444', display: 'inline-block' }} />
            Discounted Sale Bundles
          </h3>
          <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '999px', backgroundColor: '#FEF2F2', color: '#B91C1C', border: '1px solid #FECACA', fontWeight: 700 }}>
            SAVE UP TO 22%
          </span>
        </div>

        <div
          style={{
            marginTop: '18px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px'
          }}
        >
          {saleBundles.map((item) => (
            <div
              key={item.id}
              style={{
                borderRadius: '18px',
                backgroundColor: '#FFFBF5',
                border: '1px solid rgba(0,0,0,0.08)',
                padding: '16px',
                display: 'flex',
                gap: '14px',
                alignItems: 'center'
              }}
              className="hover-lift"
            >
              <div
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '14px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px',
                  flexShrink: 0
                }}
              >
                {item.icon}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ padding: '2px 8px', borderRadius: '999px', backgroundColor: '#B77B3D', color: '#FFFFFF', fontSize: '9.5px', fontWeight: 800 }}>
                  {item.off}
                </span>
                <h4 style={{ marginTop: '4px', fontSize: '13.5px', fontWeight: 700, color: '#121212', lineHeight: 1.3 }} className="line-clamp-1">
                  {item.title}
                </h4>

                <div style={{ marginTop: '4px', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontWeight: 800, fontSize: '14px', color: '#121212' }}>
                    Rs. {item.price.toLocaleString()}
                  </span>
                  {item.old && (
                    <span style={{ fontSize: '11px', textDecoration: 'line-through', opacity: 0.45 }}>
                      Rs. {item.old.toLocaleString()}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onAddToCart({ id: `sale-${item.id}`, title: item.title, price: item.price, type: 'product' })}
                  style={{
                    marginTop: '8px',
                    height: '28px',
                    padding: '0 14px',
                    borderRadius: '999px',
                    backgroundColor: '#121212',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
