import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, Plus, Check, BookOpen, MessageCircle, Filter, Sparkles } from 'lucide-react';
import { sampleBooks } from '../../data/sampleData';
import { BookItem } from '../../types';
import { siteConfig } from '../../config/siteConfig';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';

interface BooksPageProps {
  onBack: () => void;
  onAddToCart: (item: { id: string; title: string; price: number; type: 'book' }) => void;
}

export const BooksPage: React.FC<BooksPageProps> = ({
  onBack,
  onAddToCart
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [addedIds, setAddedIds] = useState<{ [id: number]: boolean }>({});

  const { data: books = [], isLoading } = useQuery({
    queryKey: ['publicBooks'],
    queryFn: async () => {
      const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data as BookItem[];
    }
  });

  const grades = ['All', 'Grade 5', 'Grade 6', 'Grade 8', 'Grade 10', 'O/L', 'A/L'];
  const categories = ['All', 'Workbooks', 'Past Papers', 'Exam Packs', 'Language', 'Short Notes'];

  const filteredBooks = useMemo(() => {
    let result = [...books].filter((book) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.accent.toLowerCase().includes(q) ||
        book.grade.toLowerCase().includes(q) ||
        (book.category && book.category.toLowerCase().includes(q));

      const matchesGrade = selectedGrade === 'All' || book.grade === selectedGrade;
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;

      return matchesSearch && matchesGrade && matchesCategory;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, selectedGrade, selectedCategory, sortBy, books]);

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

  const whatsappInquireBooks = `${siteConfig.socialMedia.whatsappChat}?text=${encodeURIComponent(
    'Hi Unique Printers, I want to check availability for school books / past papers / syllabus workbooks.'
  )}`;

  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#FFFBF5', paddingBottom: '60px' }}>
      {/* Header Breadcrumb */}
      <div style={{ backgroundColor: '#121212', color: '#FFFFFF', padding: '12px 16px' }}>
        <div
          className="site-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <button
            onClick={onBack}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>

          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
            Bookshelf / <span style={{ color: '#F5D6A8' }}>School Books Catalog</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div
        style={{
          backgroundColor: '#B77B3D',
          backgroundImage: 'linear-gradient(135deg, #B77B3D 0%, #5A3210 100%)',
          color: '#FFFFFF',
          padding: '48px 16px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
        }}
      >
        <div className="site-container">
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              marginBottom: '12px'
            }}
          >
            <BookOpen size={12} />
            WILGODA BOOKSHOP & EDUCATIONAL MATERIALS
          </span>

          <h1
            className="serif"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 50px)',
              lineHeight: 1.05,
              fontWeight: 400,
              margin: '0 0 12px 0'
            }}
          >
            School Books & Past Papers
          </h1>

          <p style={{ fontSize: '15.5px', color: 'rgba(255,255,255,0.85)', maxWidth: '640px', lineHeight: 1.6, margin: 0 }}>
            Official government syllabus workbooks, Grade 5 scholarship revision packs, 10-year G.C.E. O/L & A/L past papers with answer schemes in Sinhala and English medium.
          </p>
        </div>
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="site-container" style={{ marginTop: '30px' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '20px',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 6px 24px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {/* Search Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
            <div
              style={{
                flex: 1,
                minWidth: '260px',
                height: '46px',
                borderRadius: '999px',
                backgroundColor: '#FFFBF5',
                border: '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                gap: '10px'
              }}
            >
              <Search size={18} style={{ color: '#B77B3D' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by book title, grade, or subject (e.g. Science, Maths)..."
                style={{
                  width: '100%',
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '14px',
                  color: '#121212'
                }}
              />
            </div>

            {/* Sort Select */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12.5px', color: '#666666' }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  height: '42px',
                  padding: '0 12px',
                  borderRadius: '12px',
                  backgroundColor: '#FFFBF5',
                  border: '1px solid rgba(0,0,0,0.1)',
                  fontSize: '13px',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="featured">Featured Stock</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Grade Filter Pills */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#666666', marginBottom: '8px' }}>
              Filter by Grade:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {grades.map((grade) => {
                const isActive = selectedGrade === grade;
                return (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    style={{
                      height: '34px',
                      padding: '0 14px',
                      borderRadius: '999px',
                      fontSize: '12.5px',
                      fontWeight: isActive ? 700 : 500,
                      backgroundColor: isActive ? '#121212' : '#FFFBF5',
                      color: isActive ? '#FFFFFF' : '#121212',
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
          </div>
        </div>

        {/* Results Count & Inquire Box */}
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontSize: '13.5px', color: 'rgba(18,18,18,0.7)' }}>
            Showing <b>{filteredBooks.length}</b> books available in Wilgoda shop
          </div>

          <a
            href={whatsappInquireBooks}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12.5px',
              fontWeight: 700,
              color: '#1D9E75',
              textDecoration: 'none'
            }}
          >
            <MessageCircle size={15} />
            Looking for a specific book not listed? Ask on WhatsApp
          </a>
        </div>

        {/* Books Cards Grid */}
        <div
          style={{
            marginTop: '18px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px'
          }}
        >
          {filteredBooks.map((book) => {
            const isAdded = addedIds[book.id];

            return (
              <div
                key={book.id}
                style={{
                  borderRadius: '20px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  padding: '16px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  gap: '14px',
                  transition: 'all 0.2s ease'
                }}
                className="hover-lift"
              >
                {/* Book Spine / Cover preview */}
                {book.image_url ? (
                  <img 
                    src={book.image_url} 
                    alt={book.title}
                    style={{
                      width: '82px',
                      height: '112px',
                      borderRadius: '12px',
                      objectFit: 'cover',
                      flexShrink: 0,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                  />
                ) : (
                  <div
                    className={book.color}
                    style={{
                      width: '82px',
                      height: '112px',
                      borderRadius: '12px',
                      padding: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      flexShrink: 0,
                      color: '#FFFFFF',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                  >
                    <span style={{ fontSize: '9px', letterSpacing: '0.12em', fontWeight: 800, opacity: 0.85 }}>
                      {book.accent.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '12px', lineHeight: 1.15, fontWeight: 800 }}>
                      {book.grade}
                    </span>
                  </div>
                )}

                {/* Details & Actions */}
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '999px',
                        backgroundColor: '#FFFBF5',
                        border: '1px solid rgba(0,0,0,0.08)',
                        fontSize: '9.5px',
                        fontWeight: 700,
                        color: '#666666'
                      }}
                    >
                      {book.category || 'School Book'}
                    </span>

                    <h3
                      style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        lineHeight: 1.3,
                        color: '#121212',
                        marginTop: '4px'
                      }}
                      className="line-clamp-2"
                    >
                      {book.title}
                    </h3>

                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                      <span style={{ fontWeight: 800, fontSize: '15px', color: '#121212' }}>
                        Rs. {book.price.toLocaleString()}
                      </span>
                      {book.old && (
                        <span style={{ fontSize: '11.5px', textDecoration: 'line-through', opacity: 0.45 }}>
                          Rs. {book.old}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '10.5px', color: '#059669', fontWeight: 700 }}>
                      ● In Stock
                    </span>

                    <button
                      onClick={() => handleAdd(book)}
                      style={{
                        height: '32px',
                        padding: '0 14px',
                        borderRadius: '999px',
                        backgroundColor: isAdded ? '#10B981' : '#121212',
                        color: '#FFFFFF',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      {isAdded ? (
                        <>
                          <Check size={13} /> Added
                        </>
                      ) : (
                        <>
                          <Plus size={13} /> Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredBooks.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 16px', color: 'rgba(0,0,0,0.5)' }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>📖</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#121212' }}>
              No books found
            </div>
            <p style={{ fontSize: '13px', marginTop: '4px' }}>
              Try selecting "All Grades" or ask on WhatsApp to order specific titles.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
