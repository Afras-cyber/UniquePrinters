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
        padding: '44px 16px'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px'
        }}
      >
        {stats.map((item, idx) => (
          <div
            key={idx}
            style={{
              borderRadius: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '22px 20px'
            }}
          >
            <div className="serif" style={{ fontSize: '30px', color: '#FFFFFF', lineHeight: 1 }}>
              {item.num}
            </div>
            <div style={{ marginTop: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.3 }}>
              {item.label}
            </div>
            <div
              style={{
                marginTop: '16px',
                height: '2px',
                width: '40px',
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
