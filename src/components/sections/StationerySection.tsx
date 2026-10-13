import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, ArrowRight, Plus, Check } from 'lucide-react';
import { useShopStore } from '../../store/shopStore';
import { siteConfig } from '../../config/siteConfig';

interface StationerySectionProps {
  onViewMore?: () => void;
  onAddToCart?: (item: { id: string; title: string; price: number; type: 'stationery' }) => void;
}

export const StationerySection: React.FC<StationerySectionProps> = ({ onViewMore, onAddToCart }) => {
  const { stationeryItems } = useShopStore();
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const displayItems = stationeryItems.slice(0, 6);

  const whatsappBulkUrl = `${siteConfig.socialMedia.whatsappChat}?text=${encodeURIComponent(
    'Hi Unique Printers, I want to inquire about bulk stationery order / wholesale pricing for schools and offices.'
  )}`;

  const handleAdd = (item: typeof displayItems[0]) => {
    const key = String(item.id);
    if (onAddToCart) {
      onAddToCart({
        id: `stationery-${key}`,
        title: item.name,
        price: item.price,
        type: 'stationery'
      });
      setAddedIds((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setAddedIds((prev) => ({ ...prev, [key]: false }));
      }, 1200);
    }
  };

  return (
    <div
      style={{
        borderRadius: '24px',
        backgroundColor: '#121212',
        color: '#F5E9D3',
        padding: 'clamp(16px, 3vw, 24px)',
        boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <div>
            <h3 className="serif" style={{ fontSize: 'clamp(21px, 5vw, 26px)', color: '#FFFFFF', margin: 0, lineHeight: 1.2 }}>
              Stationery & School Supplies
            </h3>
            <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.6)', marginTop: '3px' }}>
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
              color: '#F5D6A8',
              whiteSpace: 'nowrap'
            }}
          >
            A-Z STOCK
          </span>
        </div>

        {/* List of items from Store */}
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {displayItems.map((item, idx) => {
            const isAdded = addedIds[String(item.id)];
            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 0',
                  borderBottom: idx === displayItems.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  gap: '8px'
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
                  <div style={{ minWidth: 0, paddingRight: '4px' }}>
                    <div 
                      style={{ 
                        fontSize: '13px', 
                        fontWeight: 600, 
                        color: 'rgba(255,255,255,0.95)',
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {item.name}
                    </div>
                    <div style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>
                      {item.category}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  <div style={{ textAlign: 'right' }}>
                    {item.discountPercent && item.discountPercent > 0 && (
                      <span
                        style={{
                          fontSize: '9.5px',
                          padding: '1px 5px',
                          borderRadius: '999px',
                          backgroundColor: 'rgba(183,123,61,0.3)',
                          color: '#F5D6A8',
                          fontWeight: 700,
                          marginRight: '4px'
                        }}
                      >
                        -{item.discountPercent}%
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: '12.5px',
                        fontWeight: 700,
                        color: '#FFFFFF'
                      }}
                    >
                      Rs. {item.price.toLocaleString()}
                    </span>
                  </div>

                  {onAddToCart && (
                    <button
                      onClick={() => handleAdd(item)}
                      aria-label={`Add ${item.name} to cart`}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: isAdded ? '#10B981' : 'rgba(255,255,255,0.14)',
                        color: '#FFFFFF',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        flexShrink: 0
                      }}
                      className="hover-lift"
                    >
                      {isAdded ? <Check size={13} /> : <Plus size={13} />}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
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
          <span>Explore All Stationery ({stationeryItems.length}+ Items)</span>
          <ArrowRight size={15} />
        </button>
      </div>

      {/* Bulk wholesale callout */}
      <div
        style={{
          marginTop: '18px',
          borderRadius: '16px',
          backgroundColor: '#FFFFFF',
          color: '#121212',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#B77B3D',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <Sparkles size={16} />
        </div>

        <div style={{ flex: 1, fontSize: '11.5px', lineHeight: 1.3 }}>
          <div style={{ fontWeight: 800 }}>Bulk orders for schools & offices?</div>
          <div style={{ color: 'rgba(0,0,0,0.6)', marginTop: '2px' }}>
            Wholesale prices available — chat on WhatsApp
          </div>
        </div>

        <a
          href={whatsappBulkUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Inquire about bulk orders on WhatsApp"
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: '#121212',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            flexShrink: 0
          }}
          className="hover-lift"
        >
          <ArrowUpRight size={15} />
        </a>
      </div>
    </div>
  );
};

