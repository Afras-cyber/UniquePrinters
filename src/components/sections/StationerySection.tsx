import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { stationeryList } from '../../data/sampleData';
import { siteConfig } from '../../config/siteConfig';

export const StationerySection: React.FC = () => {
  const whatsappBulkUrl = `${siteConfig.socialMedia.whatsappChat}?text=${encodeURIComponent('Hi Unique Printers, I want to inquire about bulk stationery order / wholesale pricing for schools.')}`;

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
          <h3 className="serif" style={{ fontSize: '24px', color: '#FFFFFF', margin: 0 }}>
            Stationery Items
          </h3>
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

        {/* List of items */}
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {stationeryList.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: idx === stationeryList.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(183, 123, 61, 0.2)',
                    border: '1px solid rgba(183, 123, 61, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    color: '#F5D6A8'
                  }}
                >
                  ✦
                </div>
                <span style={{ fontSize: '13.5px', fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>
                  {item.name}
                </span>
              </div>

              <span
                style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  fontWeight: 700
                }}
              >
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bulk wholesale callout */}
      <div
        style={{
          marginTop: '24px',
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
