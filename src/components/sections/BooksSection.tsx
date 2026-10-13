import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, ArrowRight, BookOpen } from 'lucide-react';
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
    <div
      style={{
        borderRadius: '24px',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.1)',
        padding: '24px',
        boxShadow: '0 12px 32px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div>
        {/* Header row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
          <div>
            <h3 className="serif" style={{ fontSize: '26px', color: '#121212', margin: 0 }}>
              Available School Books
            </h3>
            <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.5)', marginTop: '2px' }}>
              Showing {filteredBooks.length} books in Wilgoda shop stock
            </p>
          </div>

          {/* Grade filter pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {grades.map((grade) => {
              const isSelected = selectedGrade === grade;
              return (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  style={{
                    padding: '3px 10px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: isSelected ? 700 : 500,
                    backgroundColor: isSelected ? '#121212' : '#FFFBF5',
                    color: isSelected ? '#FFFFFF' : '#121212',
                    border: '1px solid rgba(0,0,0,0.08)',
                    cursor: 'pointer'
                  }}
                >
                  {grade}
                </button>
              );
            })}
          </div>
        </div>

        {/* Books Grid Preview (first 6 items) */}
        <div
          style={{
            marginTop: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '14px'
          }}
        >
          {filteredBooks.slice(0, 6).map((book) => {
            const isAdded = addedIds[book.id];
            return (
              <div
                key={book.id}
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
      <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
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
            fontSize: '13.5px',
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
          <span>View More → Bookshelf Page (with filters)</span>
          <ArrowRight size={15} style={{ color: '#B77B3D' }} />
        </button>
      </div>
    </div>
  );
};
