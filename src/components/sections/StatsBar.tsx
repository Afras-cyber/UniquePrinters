import React from 'react';

export const StatsBar: React.FC = () => {
  const stats = [
    { num: '1000+', label: 'Happy Customers in Kurunegala' },
    { num: 'Same-Day', label: 'Fast Printing & Delivery' },
    { num: 'Premium', label: 'Quality Paper & True Ink' },
    { num: 'Affordable', label: 'Best Local Price in Wilgoda' }
  ];

  return (
    <section
      style={{
        backgroundColor: '#121212',
        color: '#F5E9D3',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: 'clamp(24px, 4vw, 44px) 16px'
      }}
    >
      <div
        className="stats-grid"
        style={{
          maxWidth: '1280px',
          margin: '0 auto'
        }}
      >
        {stats.map((item, idx) => (
          <div
            key={idx}
            style={{
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: 'clamp(14px, 2.5vw, 22px) clamp(12px, 2vw, 20px)'
            }}
          >
            <div className="serif" style={{ fontSize: 'clamp(20px, 3.5vw, 30px)', color: '#FFFFFF', lineHeight: 1 }}>
              {item.num}
            </div>
            <div style={{ marginTop: '8px', fontSize: 'clamp(11.5px, 2vw, 13px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.3 }}>
              {item.label}
            </div>
            <div
              style={{
                marginTop: '12px',
                height: '2px',
                width: '32px',
                backgroundColor: '#B77B3D',
                borderRadius: '999px'
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
