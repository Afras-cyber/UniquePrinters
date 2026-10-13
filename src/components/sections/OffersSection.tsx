import React, { useState, useEffect } from 'react';
import { Sparkles, Copy, Check, ArrowRight, Tag, Clock, MessageCircle } from 'lucide-react';
import { useShopStore } from '../../store/shopStore';
import { buildProductWhatsAppUrl } from '../../lib/whatsapp';
import { siteConfig } from '../../config/siteConfig';

interface OffersSectionProps {
  onAddToCart: (item: { id: string; title: string; price: number; type: 'product' }) => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ onAddToCart }) => {
  const { offers } = useShopStore();
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 12,
    mins: 38,
    secs: 19
  });

  // Only display ACTIVE offers on the frontend!
  const activeOffers = offers.filter((o) => o.isActive !== false);

  // Group into new arrivals / single items and bundles
  const arrivalOffers = activeOffers.filter((o) => o.category === 'New Arrival' || !o.old);
  const bundleOffers = activeOffers.filter((o) => o.category === 'Discount Bundle' || (o.old && o.old > o.price));

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

  if (activeOffers.length === 0) {
    return null; // When admin hides all offers, section cleanly collapses
  }

  return (
    <section id="offers" style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 16px 60px 16px' }}>
      {/* 1. New Arrivals Cards (Filtered to Active Only) */}
      {arrivalOffers.length > 0 && (
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
              Active New Arrivals & Deals
            </h3>
            <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '999px', backgroundColor: '#FFFBF5', border: '1px solid rgba(0,0,0,0.08)', fontWeight: 600 }}>
              Live in Wilgoda • {arrivalOffers.length} items
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
            {arrivalOffers.map((item) => {
              const waOfferUrl = buildProductWhatsAppUrl({
                productName: item.title,
                price: item.price,
                originalPrice: item.old,
                discountPercent: item.discountPercent,
                category: 'New Arrival Offer',
                productPath: '#/offers'
              });

              return (
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
                      {item.icon || '🎁'}
                    </div>

                    <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '999px', backgroundColor: '#121212', color: '#FFFFFF', fontSize: '9.5px', fontWeight: 800 }}>
                        {item.badge || 'DEAL'}
                      </span>
                      {item.discountPercent && item.discountPercent > 0 && (
                        <span style={{ padding: '2px 6px', borderRadius: '999px', backgroundColor: '#B77B3D', color: '#FFFFFF', fontSize: '9.5px', fontWeight: 800 }}>
                          {item.discountPercent}% OFF
                        </span>
                      )}
                      <span style={{ fontSize: '11px', color: 'rgba(0,0,0,0.5)' }}>In stock</span>
                    </div>

                    <h4 style={{ marginTop: '6px', fontSize: '13.5px', fontWeight: 700, color: '#121212', lineHeight: 1.3 }} className="line-clamp-2">
                      {item.title}
                    </h4>
                  </div>

                  <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontWeight: 800, fontSize: '14px', color: '#121212' }}>
                        Rs. {item.price.toLocaleString()}
                      </span>
                      {item.old && item.old > item.price && (
                        <div style={{ fontSize: '11px', textDecoration: 'line-through', color: 'rgba(0,0,0,0.4)' }}>
                          Rs. {item.old.toLocaleString()}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button
                        onClick={() => onAddToCart({ id: `offer-${item.id}`, title: item.title, price: item.price, type: 'product' })}
                        style={{
                          height: '28px',
                          padding: '0 10px',
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
                      <a
                        href={waOfferUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Order on WhatsApp"
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: '#25D366',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textDecoration: 'none'
                        }}
                      >
                        <MessageCircle size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Banner with Live Countdown Timer & Promo Code */}
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
              BACK TO SCHOOL • ACTIVE OFFER
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
                href={buildProductWhatsAppUrl({
                  productName: 'Back to School 20% OFF Promo (SCHOOL20)',
                  category: 'Special Promo',
                  productPath: '#/offers',
                  customNote: 'I would like to claim the SCHOOL20 promo voucher at your shop.'
                })}
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
                <MessageCircle size={16} style={{ color: '#25D366' }} />
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
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
              Promotion Ends In:
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { label: 'DAYS', val: timeLeft.days },
                { label: 'HRS', val: timeLeft.hours },
                { label: 'MINS', val: timeLeft.mins },
                { label: 'SECS', val: timeLeft.secs }
              ].map((box, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '14px',
                    padding: '12px 14px',
                    textAlign: 'center',
                    minWidth: '60px'
                  }}
                >
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#F5D6A8' }}>
                    {String(box.val).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>
                    {box.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Sale Bundles */}
      {bundleOffers.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#121212', margin: 0 }}>
              Special Discount Bundles & Packages
            </h3>
            <span style={{ fontSize: '12px', color: '#B77B3D', fontWeight: 700 }}>
              Active In Store
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px'
            }}
          >
            {bundleOffers.map((bundle) => {
              const waBundleUrl = buildProductWhatsAppUrl({
                productName: bundle.title,
                price: bundle.price,
                originalPrice: bundle.old,
                discountPercent: bundle.discountPercent,
                category: 'Sale Bundle',
                productPath: '#/offers'
              });

              return (
                <div
                  key={bundle.id}
                  style={{
                    borderRadius: '20px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.08)',
                    padding: '20px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                  className="hover-lift"
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '28px' }}>{bundle.icon || '🎒'}</span>
                      <span
                        style={{
                          padding: '3px 10px',
                          borderRadius: '999px',
                          backgroundColor: '#121212',
                          color: '#FFFFFF',
                          fontSize: '11px',
                          fontWeight: 800
                        }}
                      >
                        {bundle.off || (bundle.discountPercent ? `${bundle.discountPercent}% OFF` : 'DEAL')}
                      </span>
                    </div>

                    <h4 style={{ marginTop: '14px', fontSize: '15px', fontWeight: 700, color: '#121212', lineHeight: 1.3 }}>
                      {bundle.title}
                    </h4>

                    {bundle.description && (
                      <p style={{ marginTop: '6px', fontSize: '12px', color: 'rgba(0,0,0,0.5)', lineHeight: 1.4 }}>
                        {bundle.description}
                      </p>
                    )}
                  </div>

                  <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#121212' }}>
                        Rs. {bundle.price.toLocaleString()}
                      </div>
                      {bundle.old && (
                        <div style={{ fontSize: '11.5px', textDecoration: 'line-through', color: 'rgba(0,0,0,0.4)' }}>
                          Rs. {bundle.old.toLocaleString()}
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => onAddToCart({ id: `bundle-${bundle.id}`, title: bundle.title, price: bundle.price, type: 'product' })}
                        style={{
                          height: '32px',
                          padding: '0 14px',
                          borderRadius: '999px',
                          backgroundColor: '#121212',
                          color: '#FFFFFF',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Add to Cart
                      </button>
                      <a
                        href={waBundleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          height: '32px',
                          padding: '0 10px',
                          borderRadius: '999px',
                          backgroundColor: '#25D366',
                          color: '#FFFFFF',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          textDecoration: 'none'
                        }}
                      >
                        <MessageCircle size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
