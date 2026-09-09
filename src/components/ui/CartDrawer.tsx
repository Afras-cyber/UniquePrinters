import React from 'react';
import { X, Plus, Minus, Trash2, MessageCircle, ShoppingBag } from 'lucide-react';
import { CartItem } from '../../types';
import { siteConfig } from '../../config/siteConfig';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const generateWhatsAppOrderUrl = () => {
    let message = `*NEW ORDER / INQUIRY - UNIQUE PRINTERS*\n`;
    message += `---------------------------------\n`;
    items.forEach((item, idx) => {
      message += `${idx + 1}. ${item.title} (x${item.quantity}) - Rs. ${(item.price * item.quantity).toLocaleString()}\n`;
    });
    message += `---------------------------------\n`;
    message += `*Total Amount:* Rs. ${totalAmount.toLocaleString()}\n\n`;
    message += `Hi Unique Printers, please let me know availability and delivery/pickup details at your Wilgoda shop!`;

    return `${siteConfig.socialMedia.whatsappChat}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 70,
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.25)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          animation: 'slideIn 0.25s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} style={{ color: '#B77B3D' }} />
            <h3 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: '#121212' }}>
              Your Order ({items.reduce((s, i) => s + i.quantity, 0)} items)
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close cart"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              border: '1px solid rgba(0,0,0,0.1)',
              backgroundColor: '#F7F7F7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 16px', color: '#888888' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🛍️</div>
              <div style={{ fontWeight: 700, fontSize: '16px', color: '#121212' }}>Your cart is empty</div>
              <p style={{ fontSize: '13px', marginTop: '6px' }}>
                Browse our school books, stationery, or sale bundles to add items.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '14px',
                    backgroundColor: '#FFFBF5',
                    border: '1px solid rgba(0,0,0,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#121212' }} className="line-clamp-1">
                      {item.title}
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#B77B3D', fontWeight: 800, marginTop: '2px' }}>
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(0,0,0,0.1)',
                        borderRadius: '999px',
                        padding: '2px 8px'
                      }}
                    >
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '12px', fontWeight: 700, minWidth: '16px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#C0392B',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout info */}
        {items.length > 0 && (
          <div
            style={{
              padding: '20px',
              borderTop: '1px solid rgba(0,0,0,0.08)',
              backgroundColor: '#FFFFFF'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '14px', color: '#666666' }}>Subtotal:</span>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#121212' }}>
                Rs. {totalAmount.toLocaleString()}
              </span>
            </div>

            <a
              href={generateWhatsAppOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '100%',
                height: '48px',
                borderRadius: '999px',
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '14.5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(37,211,102,0.35)'
              }}
              className="hover-lift"
            >
              <MessageCircle size={18} />
              Confirm & Order on WhatsApp
            </a>

            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#888888' }}>
              <span>No pre-payment required</span>
              <button
                onClick={onClearCart}
                style={{ background: 'transparent', border: 'none', color: '#888888', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
