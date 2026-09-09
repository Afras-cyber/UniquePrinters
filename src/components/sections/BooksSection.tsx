import React, { useState, useMemo } from 'react';
import { Search, Plus, Check } from 'lucide-react';
import { sampleBooks } from '../../data/sampleData';
import { BookItem } from '../../types';

interface BooksSectionProps {
  searchQuery: string;
  onAddToCart: (item: { id: string; title: string; price: number; type: 'book' }) => void;
}

export const BooksSection: React.FC<BooksSectionProps> = ({
  searchQuery,
  onAddToCart
}) => {
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [addedIds, setAddedIds] = useState<{ [id: number]: boolean }>({});

  const grades = ['All', 'Grade 5', 'Grade 6', 'Grade 8', 'Grade 10', 'O/L', 'A/L'];

  const filteredBooks = useMemo(() => {
    return sampleBooks.filter((book) => {
      const matchesSearch = !searchQuery || 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.accent.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.grade.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGrade = selectedGrade === 'All' || book.grade === selectedGrade;

      return matchesSearch && matchesGrade;
    });
  }, [searchQuery, selectedGrade]);

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

        {/* Books Grid */}
        <div
          style={{
            marginTop: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '12px'
          }}
        >
          {filteredBooks.map((book) => {
            const isAdded = addedIds[book.id];

            return (
              <div
                key={book.id}
                style={{
                  borderRadius: '18px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  padding: '12px',
                  display: 'flex',
                  gap: '12px',
                  backgroundColor: '#FFFBF5',
                  transition: 'all 0.2s ease'
                }}
                className="hover-lift"
              >
                {/* Book Spine Graphic */}
                <div
                  className={book.color}
                  style={{
                    width: '70px',
                    height: '92px',
                    borderRadius: '12px',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flexShrink: 0,
                    color: '#FFFFFF',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.12)'
                  }}
                >
                  <span style={{ fontSize: '8.5px', letterSpacing: '0.12em', fontWeight: 800, opacity: 0.85 }}>
                    {book.accent.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '10.5px', lineHeight: 1.1, fontWeight: 800 }}>
                    {book.grade}
                  </span>
                </div>

                {/* Info & CTA */}
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        lineHeight: 1.3,
                        color: '#121212',
                        margin: 0
                      }}
                      className="line-clamp-2"
                    >
                      {book.title}
                    </h4>

                    <div style={{ marginTop: '6px', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                      <span style={{ fontWeight: 800, fontSize: '14px', color: '#121212' }}>
                        Rs. {book.price.toLocaleString()}
                      </span>
                      {book.old && (
                        <span style={{ fontSize: '11px', textDecoration: 'line-through', opacity: 0.45 }}>
                          Rs. {book.old}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAdd(book)}
                    style={{
                      marginTop: '8px',
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
    </div>
  );
};
