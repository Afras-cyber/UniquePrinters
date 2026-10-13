import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, ArrowRight, BookOpen, LayoutList, LayoutGrid } from 'lucide-react';
import { useShopStore } from '../../store/shopStore';
import { BookItem } from '../../types';

interface BooksSectionProps {
  searchQuery: string;
  onAddToCart: (item: { id: string; title: string; price: number; type: 'book' }) => void;
  onViewMore?: () => void;
}

export const BooksSection: React.FC<BooksSectionProps> = ({
  searchQuery,
  onAddToCart,
  onViewMore
}) => {
  const { books } = useShopStore();
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [addedIds, setAddedIds] = useState<{ [id: number]: boolean }>({});

  const grades = ['All', 'Grade 5', 'Grade 6', 'Grade 8', 'Grade 10', 'O/L', 'A/L'];

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        book.title.toLowerCase().includes(q) ||
        (book.accent && book.accent.toLowerCase().includes(q)) ||
        book.grade.toLowerCase().includes(q) ||
        (book.category && book.category.toLowerCase().includes(q));

      const matchesGrade = selectedGrade === 'All' || book.grade === selectedGrade;

      return matchesSearch && matchesGrade;
    });
  }, [books, searchQuery, selectedGrade]);

  const handleAdd = (book: BookItem) => {
    onAddToCart({
      id: `book-${book.id}`,
      title: book.title,
      price: book.price,
      type: 'book'
    });

    setAddedIds((prev) => ({ ...prev, [book.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [book.id]: false }));
    }, 1200);
  };

  return (
    <div className="books-section-card">
      <div>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
          <div>
            <h3 className="serif" style={{ fontSize: 'clamp(21px, 5vw, 26px)', color: '#121212', margin: 0, lineHeight: 1.2 }}>
              Available School Books
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
              <p style={{ fontSize: '11.5px', color: 'rgba(0,0,0,0.55)', margin: 0, fontWeight: 500 }}>
                Wilgoda stock • Showing {filteredBooks.length} books
              </p>
            </div>
          </div>

          {/* Desktop Grade filter pills */}
          <div className="desktop-only" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {grades.map((grade) => {
              const isSelected = selectedGrade === grade;
              return (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  style={{
                    padding: '4px 11px',
                    borderRadius: '999px',
                    fontSize: '11.5px',
                    fontWeight: isSelected ? 700 : 500,
                    backgroundColor: isSelected ? '#121212' : '#FFFBF5',
                    color: isSelected ? '#FFFFFF' : '#121212',
                    border: '1px solid rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {grade}
                </button>
              );
            })}
          </div>

          {/* Mobile View Switcher (List vs Grid) */}
          <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#F5F5F5', padding: '3px', borderRadius: '8px' }}>
            <button
              onClick={() => setViewMode('list')}
              aria-label="List view"
              style={{
                width: '30px',
                height: '28px',
                borderRadius: '6px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: viewMode === 'list' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'list' ? '#121212' : '#888888',
                boxShadow: viewMode === 'list' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer'
              }}
            >
              <LayoutList size={15} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              style={{
                width: '30px',
                height: '28px',
                borderRadius: '6px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: viewMode === 'grid' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'grid' ? '#121212' : '#888888',
                boxShadow: viewMode === 'grid' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer'
              }}
            >
              <LayoutGrid size={15} />
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Grade Filter Strip */}
        <div className="mobile-only">
          <div className="books-filter-strip no-scrollbar">
            {grades.map((grade) => {
              const isSelected = selectedGrade === grade;
              return (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: isSelected ? 800 : 600,
                    backgroundColor: isSelected ? '#121212' : '#FFFBF5',
                    color: isSelected ? '#FFFFFF' : '#444444',
                    border: isSelected ? '1px solid #121212' : '1px solid rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {grade}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= MOBILE VIEW CONTAINER ================= */}
        <div className="books-mobile-container">
          {viewMode === 'list' ? (
            /* --- Mobile List Mode (Horizontal Cards) --- */
            filteredBooks.slice(0, 6).map((book) => {
              const isAdded = addedIds[book.id];
              return (
                <div
                  key={`mob-list-${book.id}`}
                  style={{
                    borderRadius: '16px',
                    backgroundColor: '#FFFBF5',
                    border: '1px solid rgba(183, 123, 61, 0.16)',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                  }}
                >
                  {/* Miniature 3D Book Spine Preview */}
                  <div
                    style={{
                      width: '74px',
                      minWidth: '74px',
                      height: '96px',
                      borderRadius: '8px',
                      backgroundColor: book.color && book.color.startsWith('bg-') ? undefined : (book.color || '#1E3A5F'),
                      color: '#FFFFFF',
                      padding: '8px 6px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: 'inset 4px 0 8px rgba(0,0,0,0.25), 0 3px 8px rgba(0,0,0,0.12)',
                      border: '1px solid rgba(255,255,255,0.15)'
                    }}
                    className={book.color && book.color.startsWith('bg-') ? book.color : ''}
                  >
                    {/* Spine line */}
                    <div style={{ position: 'absolute', top: 0, left: '5px', bottom: 0, width: '1px', backgroundColor: 'rgba(255,255,255,0.18)' }} />
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '3px' }}>
                      <span
                        style={{
                          fontSize: '9px',
                          fontWeight: 800,
                          padding: '1px 5px',
                          borderRadius: '4px',
                          backgroundColor: 'rgba(255,255,255,0.25)'
                        }}
                      >
                        {book.grade}
                      </span>
                      <BookOpen size={11} style={{ opacity: 0.9 }} />
                    </div>

                    <div style={{ fontSize: '10px', fontWeight: 700, paddingLeft: '3px', opacity: 0.95, lineHeight: 1.15 }}>
                      {book.accent}
                    </div>
                  </div>

                  {/* Book Details & Add Action */}
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'stretch' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                        {book.category && (
                          <span style={{ fontSize: '9.5px', fontWeight: 800, color: '#B77B3D', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                            {book.category}
                          </span>
                        )}
                        <span style={{ fontSize: '10px', color: '#10B981', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
                          In Stock
                        </span>
                      </div>

                      <h4
                        style={{
                          marginTop: '3px',
                          fontSize: '13px',
                          fontWeight: 700,
                          color: '#121212',
                          lineHeight: 1.3
                        }}
                        className="line-clamp-2"
                      >
                        {book.title}
                      </h4>
                    </div>

                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '14.5px', fontWeight: 800, color: '#121212' }}>
                          Rs. {book.price.toLocaleString()}
                        </span>
                        {book.old && book.old > book.price && (
                          <span style={{ fontSize: '10.5px', textDecoration: 'line-through', color: 'rgba(0,0,0,0.4)' }}>
                            Rs. {book.old.toLocaleString()}
                          </span>
                        )}
                        {book.discountPercent && book.discountPercent > 0 && (
                          <span style={{ fontSize: '9px', fontWeight: 800, color: '#B77B3D', backgroundColor: '#FFF2DF', padding: '1px 4px', borderRadius: '3px' }}>
                            {book.discountPercent}% OFF
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAdd(book)}
                        style={{
                          height: '32px',
                          padding: '0 12px',
                          borderRadius: '999px',
                          backgroundColor: isAdded ? '#10B981' : '#121212',
                          color: '#FFFFFF',
                          fontSize: '11px',
                          fontWeight: 700,
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          flexShrink: 0,
                          boxShadow: isAdded ? '0 3px 8px rgba(16, 185, 129, 0.3)' : '0 2px 6px rgba(0,0,0,0.15)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {isAdded ? (
                          <>
                            <Check size={12} />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus size={12} />
                            Add
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            /* --- Mobile Grid Mode (Compact 2-Column Grid) --- */
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {filteredBooks.slice(0, 6).map((book) => {
                const isAdded = addedIds[book.id];
                return (
                  <div
                    key={`mob-grid-${book.id}`}
                    style={{
                      borderRadius: '14px',
                      backgroundColor: '#FFFBF5',
                      border: '1px solid rgba(183, 123, 61, 0.16)',
                      padding: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      {/* Mini cover banner */}
                      <div
                        style={{
                          height: '70px',
                          borderRadius: '8px',
                          backgroundColor: book.color && book.color.startsWith('bg-') ? undefined : (book.color || '#1E3A5F'),
                          color: '#FFFFFF',
                          padding: '6px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        className={book.color && book.color.startsWith('bg-') ? book.color : ''}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span
                            style={{
                              fontSize: '9px',
                              fontWeight: 700,
                              padding: '1px 5px',
                              borderRadius: '3px',
                              backgroundColor: 'rgba(255,255,255,0.2)'
                            }}
                          >
                            {book.grade}
                          </span>
                          <BookOpen size={11} style={{ opacity: 0.8 }} />
                        </div>
                        <div style={{ fontSize: '9.5px', fontWeight: 600, opacity: 0.9 }}>
                          {book.accent}
                        </div>
                      </div>

                      <div style={{ marginTop: '8px' }}>
                        {book.category && (
                          <span style={{ fontSize: '9px', fontWeight: 700, color: '#B77B3D', textTransform: 'uppercase' }}>
                            {book.category}
                          </span>
                        )}
                        <h4
                          style={{
                            marginTop: '2px',
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#121212',
                            lineHeight: 1.25
                          }}
                          className="line-clamp-2"
                        >
                          {book.title}
                        </h4>
                      </div>
                    </div>

                    <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#121212' }}>
                          Rs. {book.price.toLocaleString()}
                        </span>
                        {book.discountPercent && book.discountPercent > 0 && (
                          <span style={{ fontSize: '8.5px', fontWeight: 700, color: '#B77B3D', backgroundColor: '#FFF2DF', padding: '1px 3px', borderRadius: '3px' }}>
                            {book.discountPercent}% OFF
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAdd(book)}
                        style={{
                          width: '100%',
                          height: '30px',
                          borderRadius: '999px',
                          backgroundColor: isAdded ? '#10B981' : '#121212',
                          color: '#FFFFFF',
                          fontSize: '10.5px',
                          fontWeight: 700,
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          transition: 'background-color 0.2s'
                        }}
                      >
                        {isAdded ? (
                          <>
                            <Check size={11} />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus size={11} />
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ================= DESKTOP VIEW GRID ================= */}
        <div className="books-desktop-grid">
          {filteredBooks.slice(0, 6).map((book) => {
            const isAdded = addedIds[book.id];
            return (
              <div
                key={`desk-${book.id}`}
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
                  {/* Book Spine Icon banner */}
                  <div
                    style={{
                      height: '80px',
                      borderRadius: '10px',
                      backgroundColor: book.color && book.color.startsWith('bg-') ? undefined : (book.color || '#1E3A5F'),
                      color: '#FFFFFF',
                      padding: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    className={book.color && book.color.startsWith('bg-') ? book.color : ''}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          backgroundColor: 'rgba(255,255,255,0.2)'
                        }}
                      >
                        {book.grade}
                      </span>
                      <BookOpen size={14} style={{ opacity: 0.8 }} />
                    </div>

                    <div style={{ fontSize: '11px', fontWeight: 600, opacity: 0.9 }}>
                      {book.accent}
                    </div>
                  </div>

                  {/* Title & Category */}
                  <div style={{ marginTop: '10px' }}>
                    {book.category && (
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#B77B3D', textTransform: 'uppercase' }}>
                        {book.category}
                      </span>
                    )}
                    <h4
                      style={{
                        marginTop: '2px',
                        fontSize: '13.5px',
                        fontWeight: 700,
                        color: '#121212',
                        lineHeight: 1.3
                      }}
                      className="line-clamp-2"
                    >
                      {book.title}
                    </h4>
                  </div>
                </div>

                <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: '#121212' }}>
                      Rs. {book.price.toLocaleString()}
                    </span>
                    {book.old && book.old > book.price && (
                      <span style={{ fontSize: '11.5px', textDecoration: 'line-through', color: 'rgba(0,0,0,0.4)' }}>
                        Rs. {book.old.toLocaleString()}
                      </span>
                    )}
                    {book.discountPercent && book.discountPercent > 0 && (
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#B77B3D', backgroundColor: '#FFF2DF', padding: '1px 5px', borderRadius: '4px' }}>
                        {book.discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAdd(book)}
                    style={{
                      height: '30px',
                      padding: '0 12px',
                      borderRadius: '999px',
                      backgroundColor: isAdded ? '#10B981' : '#121212',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      width: 'fit-content',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    {isAdded ? (
                      <>
                        <Check size={12} />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus size={12} />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredBooks.length === 0 && (
          <div style={{ textAlign: 'center', padding: '36px 16px', color: 'rgba(0,0,0,0.5)', fontSize: '13.5px' }}>
            No books found matching your query.
          </div>
        )}
      </div>

      {/* View More Link Button to dedicated Bookshelf Page with filters */}
      <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <button
          onClick={() => {
            if (onViewMore) {
              onViewMore();
            } else {
              window.location.hash = '#/books';
            }
          }}
          style={{
            width: '100%',
            height: '42px',
            borderRadius: '999px',
            backgroundColor: '#FFFBF5',
            border: '1px solid rgba(0,0,0,0.12)',
            color: '#121212',
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
          <span>Explore All School Books ({books.length}+)</span>
          <ArrowRight size={15} style={{ color: '#B77B3D' }} />
        </button>
      </div>
    </div>
  );
};

