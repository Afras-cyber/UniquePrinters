import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Palette, Briefcase, Sparkles, ArrowRight, Plus } from 'lucide-react';
import { sampleBooks, sampleDesigns, servicesData, stationeryList } from '../../data/sampleData';
import { BookItem, DesignItem } from '../../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBook: (book: BookItem) => void;
  onSelectDesign: (design: DesignItem) => void;
  onSelectService: (serviceId: string) => void;
  onAddToCart: (item: { id: string; title: string; price: number; type: 'book' | 'product' }) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectBook,
  onSelectDesign,
  onSelectService,
  onAddToCart
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQ = query.trim().toLowerCase();

  // Filter matching results dynamically
  const matchingBooks = sampleBooks.filter(
    (b) =>
      !cleanQ ||
      b.title.toLowerCase().includes(cleanQ) ||
      b.grade.toLowerCase().includes(cleanQ) ||
      b.accent.toLowerCase().includes(cleanQ)
  );

  const matchingDesigns = sampleDesigns.filter(
    (d) =>
      !cleanQ ||
      d.title.toLowerCase().includes(cleanQ) ||
      d.cat.toLowerCase().includes(cleanQ) ||
      d.subtitle.toLowerCase().includes(cleanQ)
  );

  const matchingServices = servicesData.filter(
    (s) =>
      !cleanQ ||
      s.title.toLowerCase().includes(cleanQ) ||
      s.desc.toLowerCase().includes(cleanQ) ||
      s.chips.some((c) => c.toLowerCase().includes(cleanQ))
  );

  const matchingStationery = stationeryList.filter(
    (st) => !cleanQ || st.name.toLowerCase().includes(cleanQ)
  );

  const totalResults =
    matchingBooks.length +
    matchingDesigns.length +
    matchingServices.length +
    matchingStationery.length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '60px 16px 20px 16px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh',
          animation: 'modalPop 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            backgroundColor: '#FFFBF5'
          }}
        >
          <Search size={20} style={{ color: '#B77B3D', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search school books, invitation designs, services..."
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '16px',
              fontWeight: 500,
              color: '#121212'
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#888888',
                padding: '4px'
              }}
            >
              <X size={16} />
            </button>
          )}
          <span
            style={{
              padding: '3px 8px',
              borderRadius: '6px',
              backgroundColor: 'rgba(0,0,0,0.06)',
              fontSize: '11px',
              fontWeight: 700,
              color: '#666666'
            }}
          >
            ESC
          </span>
        </div>

        {/* Results Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {totalResults === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 16px', color: '#888888' }}>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>🔍</div>
              <div style={{ fontWeight: 700, color: '#121212', fontSize: '15px' }}>
                No products found matching "{query}"
              </div>
              <p style={{ fontSize: '13px', marginTop: '4px' }}>
                Try searching for "Science", "Maths", "Wedding", "Reload", or "CR Books".
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Category 1: School Books */}
              {matchingBooks.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      color: '#B77B3D',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <BookOpen size={13} />
                    SCHOOL BOOKS ({matchingBooks.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {matchingBooks.slice(0, 4).map((book) => (
                      <div
                        key={book.id}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '12px',
                          backgroundColor: '#F9F8F6',
                          border: '1px solid rgba(0,0,0,0.04)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          onSelectBook(book);
                          onClose();
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                          <span
                            style={{
                              padding: '3px 8px',
                              borderRadius: '6px',
                              backgroundColor: '#121212',
                              color: '#FFFFFF',
                              fontSize: '10px',
                              fontWeight: 700
                            }}
                          >
                            {book.grade}
                          </span>
                          <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#121212' }} className="line-clamp-1">
                            {book.title}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                          <span style={{ fontWeight: 800, fontSize: '13.5px', color: '#B77B3D' }}>
                            Rs. {book.price}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToCart({
                                id: `book-${book.id}`,
                                title: book.title,
                                price: book.price,
                                type: 'book'
                              });
                            }}
                            style={{
                              height: '26px',
                              padding: '0 10px',
                              borderRadius: '999px',
                              backgroundColor: '#121212',
                              color: '#FFFFFF',
                              fontSize: '11px',
                              fontWeight: 700,
                              border: 'none',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Plus size={12} /> Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category 2: Sample Designs */}
              {matchingDesigns.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      color: '#B77B3D',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Palette size={13} />
                    PRINTING & INVITATION DESIGNS ({matchingDesigns.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {matchingDesigns.slice(0, 4).map((design) => (
                      <div
                        key={design.id}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '12px',
                          backgroundColor: '#F9F8F6',
                          border: '1px solid rgba(0,0,0,0.04)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          onSelectDesign(design);
                          onClose();
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                          {design.image ? (
                            <img
                              src={design.image}
                              alt={design.title}
                              style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }}
                            />
                          ) : (
                            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#B77B3D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '12px', fontWeight: 800 }}>
                              ✦
                            </div>
                          )}
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#121212' }} className="line-clamp-1">
                              {design.title}
                            </div>
                            <div style={{ fontSize: '11px', color: '#777777' }}>
                              {design.cat} • {design.paperSpec || 'Premium Board'}
                            </div>
                          </div>
                        </div>

                        <span style={{ fontSize: '12px', color: '#B77B3D', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          Preview <ArrowRight size={13} />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category 3: Services */}
              {matchingServices.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      color: '#B77B3D',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Briefcase size={13} />
                    SERVICES ({matchingServices.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {matchingServices.map((service) => (
                      <div
                        key={service.id}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '12px',
                          backgroundColor: '#F9F8F6',
                          border: '1px solid rgba(0,0,0,0.04)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          onSelectService(service.id);
                          onClose();
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '20px' }}>{service.icon}</span>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#121212' }}>
                              {service.title}
                            </div>
                            <div style={{ fontSize: '11px', color: '#777777' }} className="line-clamp-1">
                              {service.desc}
                            </div>
                          </div>
                        </div>

                        <span style={{ fontSize: '12px', color: '#121212', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          View Page <ArrowRight size={13} />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category 4: Stationery Items */}
              {matchingStationery.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      color: '#B77B3D',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Sparkles size={13} />
                    STATIONERY SUPPLIES
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {matchingStationery.map((st, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '10px',
                          backgroundColor: '#F9F8F6',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '12.5px'
                        }}
                      >
                        <span style={{ fontWeight: 600, color: '#121212' }}>{st.name}</span>
                        <span style={{ fontSize: '11px', color: '#777777' }}>{st.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div
          style={{
            padding: '12px 20px',
            backgroundColor: '#F4F2EB',
            borderTop: '1px solid rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11.5px',
            color: '#777777'
          }}
        >
          <span>Quick tip: Select any book or design to view full details</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
