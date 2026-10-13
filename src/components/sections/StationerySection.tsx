import React from 'react';
import { ArrowUpRight, Sparkles, ArrowRight } from 'lucide-react';
import { useShopStore } from '../../store/shopStore';
import { siteConfig } from '../../config/siteConfig';

interface StationerySectionProps {
  onViewMore?: () => void;
}

export const StationerySection: React.FC<StationerySectionProps> = ({ onViewMore }) => {
  const { stationeryItems } = useShopStore();
  const displayItems = stationeryItems.slice(0, 6);

  const whatsappBulkUrl = `${siteConfig.socialMedia.whatsappChat}?text=${encodeURIComponent(
    'Hi Unique Printers, I want to inquire about bulk stationery order / wholesale pricing for schools and offices.'
  )}`;

  return (
    <div
      style={{
        borderRadius: '24px',
        backgroundColor: '#121212',
        color: '#F5E9D3',
        padding: '24px',
        boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 className="serif" style={{ fontSize: '24px', color: '#FFFFFF', margin: 0 }}>
              Stationery & School Supplies
            </h3>
            <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>
              CR Books, Atlas & Deli Pens, Math Tools & Art Supplies
            </p>
          </div>
          <span
            style={{
              padding: '3px 10px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255,255,255,0.12)',
              fontSize: '10.5px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#F5D6A8'
            }}
          >
            A-Z STOCK
          </span>
        </div>

        {/* List of items from Store */}
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {displayItems.map((item, idx) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: idx === displayItems.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(183, 123, 61, 0.2)',
                    border: '1px solid rgba(183, 123, 61, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '15px',
                    flexShrink: 0
                  }}
                >
                  {item.icon || '✏️'}
                </div>
                <div style={{ minWidth: 0, paddingRight: '8px' }}>
                  <div 
                    style={{ 
                      fontSize: '13.5px', 
                      fontWeight: 600, 
                      color: 'rgba(255,255,255,0.95)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {item.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                    {item.category}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                {item.discountPercent && item.discountPercent > 0 && (
                  <span
                    style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(183,123,61,0.3)',
                      color: '#F5D6A8',
                      fontWeight: 700
                    }}
                  >
                    -{item.discountPercent}%
                  </span>
                )}
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#FFFFFF'
                  }}
                >
                  Rs. {item.price.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View More Link Button to dedicated Stationery Page */}
        <button
          onClick={() => {
            if (onViewMore) {
              onViewMore();
            } else {
              window.location.hash = '#/stationery';
            }
          }}
          style={{
            marginTop: '16px',
            width: '100%',
            height: '42px',
            borderRadius: '999px',
            backgroundColor: '#1E1E1E',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#F5D6A8',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'background-color 0.2s'
          }}
          className="hover-lift"
        >
          <span>View More Stationery & School Supplies (with filters)</span>
          <ArrowRight size={15} />
        </button>
      </div>

      {/* Bulk wholesale callout */}
      <div
        style={{
          marginTop: '22px',
          borderRadius: '16px',
          backgroundColor: '#FFFFFF',
          color: '#121212',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#B77B3D',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <Sparkles size={18} />
        </div>

        <div style={{ flex: 1, fontSize: '12px', lineHeight: 1.3 }}>
          <div style={{ fontWeight: 800 }}>Bulk orders for schools & offices?</div>
          <div style={{ color: 'rgba(0,0,0,0.6)', marginTop: '2px' }}>
            Wholesale prices available — chat with us on WhatsApp
          </div>
        </div>

        <a
          href={whatsappBulkUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Inquire about bulk orders on WhatsApp"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#121212',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none'
          }}
          className="hover-lift"
        >
          <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  );
};
