import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Search, Plus, Check, BookOpen, MessageCircle, Filter, Sparkles, Tag } from 'lucide-react';
import { useShopStore } from '../../store/shopStore';
import { BookItem } from '../../types';
import { buildProductWhatsAppUrl } from '../../lib/whatsapp';
import { updateSEO } from '../../lib/seo';
import { siteConfig } from '../../config/siteConfig';

interface BooksPageProps {
  onBack: () => void;
  onAddToCart: (item: { id: string; title: string; price: number; type: 'book' }) => void;
}

export const BooksPage: React.FC<BooksPageProps> = ({
  onBack,
  onAddToCart
}) => {
  const { books, bookCategories } = useShopStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'discount'>('featured');
  const [addedIds, setAddedIds] = useState<{ [id: number]: boolean }>({});

  useEffect(() => {
    updateSEO({
      title: 'School Bookshelf & Syllabuses Catalog',
      description: 'Find Sri Lankan school textbooks, past paper sets, workbooks, and Grade 5 scholarship revision packs at Unique Printers Wilgoda Kurunegala.',
      path: '#/books',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'School Bookshelf - Unique Printers',
        description: 'Complete catalog of school syllabus books, O/L past papers, and workbooks in Wilgoda Kurunegala.'
      }
    });
  }, []);

  const grades = ['All', 'Grade 5', 'Grade 6', 'Grade 8', 'Grade 10', 'O/L', 'A/L'];
  const categories = ['All', ...bookCategories];

  const filteredBooks = useMemo(() => {
    let result = [...books].filter((book) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        book.title.toLowerCase().includes(q) ||
        (book.accent && book.accent.toLowerCase().includes(q)) ||
        book.grade.toLowerCase().includes(q) ||
        (book.category && book.category.toLowerCase().includes(q)) ||
        (book.description && book.description.toLowerCase().includes(q));

      const matchesGrade = selectedGrade === 'All' || book.grade === selectedGrade;
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;

      return matchesSearch && matchesGrade && matchesCategory;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'discount') {
      result.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
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

  const whatsappInquireGeneral = `${siteConfig.socialMedia.whatsappChat}?text=${encodeURIComponent(
    'Hello Unique Printers! 👋 I would like to inquire about school textbook & past paper availability.'
  )}`;

  return (
    <div style={{ minHeight: '85vh', backgroundColor: '#FFFBF5', paddingBottom: '70px' }}>
      {/* Breadcrumb Navigation */}
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
            Store / <span style={{ color: '#F5D6A8' }}>Available School Books</span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1E3A5F 0%, #0F2D3D 100%)',
          color: '#FFFFFF',
          padding: '48px 16px 54px 16px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(600px 300px at 80% 20%, rgba(255,255,255,0.12), transparent)',
            pointerEvents: 'none'
          }}
        />

        <div className="site-container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '999px', backgroundColor: 'rgba(255,255,255,0.18)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#F5D6A8' }}>
            <Sparkles size={12} />
            GOVERNMENT SYLLABUS • GRADES 1-13
          </div>

          <h1
            className="serif"
            style={{
              fontSize: 'clamp(28px, 4.5vw, 44px)',
              lineHeight: 1.1,
              marginTop: '14px',
              color: '#FFFFFF',
              fontWeight: 400
            }}
          >
            Available School Books & Syllabuses
          </h1>

          <p
            style={{
              marginTop: '12px',
              fontSize: '14.5px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '680px'
            }}
          >
            Complete range of national syllabus workbooks, past paper collections, and revision guides. 
            All books are in stock in Wilgoda with instant order confirmation via WhatsApp.
          </p>

          <div style={{ marginTop: '22px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <a
              href={whatsappInquireGeneral}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                height: '42px',
                padding: '0 20px',
                borderRadius: '999px',
                backgroundColor: '#B77B3D',
                color: '#FFFFFF',
                fontSize: '13.5px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none'
              }}
              className="hover-lift"
            >
              <MessageCircle size={16} />
              Inquire Book Stock on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="site-container" style={{ marginTop: '32px' }}>
        {/* Search & Filter Bar */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid rgba(0,0,0,0.08)',
            padding: '20px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.03)',
            marginBottom: '28px'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            {/* Search Input */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#FFFBF5',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '999px',
                padding: '0 16px',
                height: '44px',
                flex: '1 1 280px',
                maxWidth: '460px'
              }}
            >
              <Search size={16} style={{ color: '#B77B3D' }} />
              <input
                type="text"
                placeholder="Search by book name, subject, or grade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '13.5px',
                  width: '100%',
                  color: '#121212'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: 'rgba(0,0,0,0.4)',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: 'rgba(0,0,0,0.5)' }}>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  height: '40px',
                  borderRadius: '999px',
                  padding: '0 14px',
                  border: '1px solid rgba(0,0,0,0.12)',
                  backgroundColor: '#FFFBF5',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#121212',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="featured">Featured Stock</option>
                <option value="discount">Highest Discount %</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Grade Pills */}
          <div
            style={{
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(0,0,0,0.06)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px'
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(0,0,0,0.4)', marginRight: '6px', alignSelf: 'center' }}>
              Grade:
            </span>
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
                    fontWeight: isSelected ? 700 : 500,
                    backgroundColor: isSelected ? '#121212' : '#FFFBF5',
                    color: isSelected ? '#FFFFFF' : '#121212',
                    border: isSelected ? '1px solid #121212' : '1px solid rgba(0,0,0,0.08)',
                    cursor: 'pointer'
                  }}
                >
                  {grade}
                </button>
              );
            })}
          </div>

          {/* Category Filter Pills */}
          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px'
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(0,0,0,0.4)', marginRight: '6px', alignSelf: 'center' }}>
              Category:
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '999px',
                    fontSize: '11.5px',
                    fontWeight: isSelected ? 700 : 500,
                    backgroundColor: isSelected ? '#B77B3D' : '#FFFBF5',
                    color: isSelected ? '#FFFFFF' : '#121212',
                    border: isSelected ? '1px solid #B77B3D' : '1px solid rgba(0,0,0,0.08)',
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Counter */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ fontSize: '13.5px', color: 'rgba(0,0,0,0.6)' }}>
            Showing <b>{filteredBooks.length}</b> books in stock
          </div>
        </div>

        {/* Books Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}
        >
          {filteredBooks.map((book) => {
            const isAdded = addedIds[book.id];
            const waBookUrl = buildProductWhatsAppUrl({
              productName: `${book.title} (${book.grade})`,
              category: book.category || 'School Book',
              price: book.price,
              originalPrice: book.old || undefined,
              discountPercent: book.discountPercent,
              productPath: `#/books?item=${book.id}`,
              customNote: `Grade: ${book.grade} • Subject: ${book.accent}`
            });

            return (
              <div
                key={book.id}
                style={{
                  borderRadius: '20px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.08)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                className="hover-lift"
              >
                <div>
                  {/* Book Spine Graphic */}
                  <div
                    style={{
                      height: '110px',
                      borderRadius: '12px',
                      backgroundColor: book.color && book.color.startsWith('bg-') ? undefined : (book.color || '#1E3A5F'),
                      color: '#FFFFFF',
                      padding: '14px',
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
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(255,255,255,0.25)'
                        }}
                      >
                        {book.grade}
                      </span>
                      <BookOpen size={18} style={{ opacity: 0.8 }} />
                    </div>

                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700 }}>
                        {book.accent}
                      </div>
                      <div style={{ fontSize: '10.5px', opacity: 0.8, marginTop: '2px' }}>
                        {book.category || 'Government Syllabus'}
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div style={{ marginTop: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#B77B3D', textTransform: 'uppercase' }}>
                        {book.category || 'Textbook'}
                      </span>
                      {book.discountPercent && book.discountPercent > 0 && (
                        <span style={{ padding: '2px 8px', borderRadius: '999px', backgroundColor: '#B77B3D', color: '#FFFFFF', fontSize: '10px', fontWeight: 800 }}>
                          {book.discountPercent}% OFF
                        </span>
                      )}
                    </div>

                    <h3
                      style={{
                        marginTop: '4px',
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#121212',
                        lineHeight: 1.35
                      }}
                    >
                      {book.title}
                    </h3>

                    {book.description && (
                      <p style={{ marginTop: '6px', fontSize: '12.5px', color: 'rgba(0,0,0,0.6)', lineHeight: 1.45 }} className="line-clamp-2">
                        {book.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Price & Actions */}
                <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: '#121212' }}>
                      Rs. {book.price.toLocaleString()}
                    </span>
                    {book.old && book.old > book.price && (
                      <span style={{ fontSize: '13px', textDecoration: 'line-through', color: 'rgba(0,0,0,0.4)' }}>
                        Rs. {book.old.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button
                      onClick={() => handleAdd(book)}
                      style={{
                        height: '38px',
                        borderRadius: '999px',
                        backgroundColor: isAdded ? '#10B981' : '#121212',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      {isAdded ? (
                        <>
                          <Check size={14} />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus size={14} />
                          Add to Cart
                        </>
                      )}
                    </button>

                    <a
                      href={waBookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        height: '38px',
                        borderRadius: '999px',
                        backgroundColor: '#25D366',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        textDecoration: 'none'
                      }}
                      className="hover-lift"
                    >
                      <MessageCircle size={14} />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredBooks.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 16px',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              marginTop: '20px'
            }}
          >
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>📚</div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#121212', margin: 0 }}>
              No school books found
            </h4>
            <p style={{ fontSize: '13.5px', color: 'rgba(0,0,0,0.5)', marginTop: '6px' }}>
              Try searching with different subject terms or selecting "All Grades".
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
