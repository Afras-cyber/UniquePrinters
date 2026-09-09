import React from 'react';
import { Home, Palette, BookOpen, Tag, PhoneCall } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'designs', label: 'Designs', icon: Palette },
    { id: 'books', label: 'Books', icon: BookOpen },
    { id: 'offers', label: 'Offers', icon: Tag },
    { id: 'contact', label: 'Contact', icon: PhoneCall }
  ];

  return (
    <nav
      aria-label="Mobile bottom navigation"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
        padding: '6px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
      className="mobile-bottom-nav"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: isActive ? '#121212' : 'transparent',
              color: isActive ? '#FFFFFF' : '#666666',
              border: 'none',
              borderRadius: '16px',
              padding: isActive ? '6px 14px' : '6px 8px',
              cursor: 'pointer',
              minWidth: '58px',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
            <span
              style={{
                fontSize: '10px',
                fontWeight: isActive ? 700 : 500,
                marginTop: '2px',
                letterSpacing: '0.01em'
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
