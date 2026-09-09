import React, { useState } from 'react';
import { AlertCircle, X, Bell } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const AnnouncementBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const { announcement } = siteConfig;

  if (!announcement.enabled || dismissed) {
    return null;
  }

  const isUrgent = announcement.type === 'urgent';

  return (
    <div
      role="region"
      aria-label="Announcement"
      style={{
        backgroundColor: isUrgent ? '#7A1F2A' : '#1D9E75',
        color: '#FFFFFF',
        padding: '10px 16px',
        fontSize: '13.5px',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 50,
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '1200px', margin: '0 auto' }}>
        {isUrgent ? <AlertCircle size={16} /> : <Bell size={16} />}
        <span>{announcement.message}</span>
      </div>

      {announcement.dismissible && (
        <button
          onClick={() => setDismissed(true)}
          aria-label="Close announcement"
          style={{
            position: 'absolute',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            opacity: 0.8
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
