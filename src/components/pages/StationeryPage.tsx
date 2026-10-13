import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  Check, 
  MessageCircle, 
  Filter, 
  Sparkles, 
  Tag, 
  CheckCircle2, 
  ShoppingBag,
  ExternalLink 
} from 'lucide-react';
import { useShopStore } from '../../store/shopStore';
import { StationeryItem } from '../../types';
import { buildProductWhatsAppUrl } from '../../lib/whatsapp';
import { updateSEO } from '../../lib/seo';
import { siteConfig } from '../../config/siteConfig';

interface StationeryPageProps {
  onBack: () => void;
  onAddToCart: (item: { id: string; title: string; price: number; type: 'stationery' }) => void;
}

export const StationeryPage: React.FC<StationeryPageProps> = ({
  onBack,
  onAddToCart
}) => {
  const { stationeryItems, stationeryCategories } = useShopStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stockOnly, setStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'discount'>('featured');
  const [addedIds, setAddedIds] = useState<{ [id: string]: boolean }>({});

  // Dynamic SEO setup
  useEffect(() => {
    updateSEO({
      title: 'Stationery & School Supplies Catalog',
      description: 'Explore our complete A-Z stationery supplies: CR books, Atlas & Deli pens, Casio calculators, geometry boxes, and art supplies in Wilgoda Kurunegala.',
      path: '#/stationery',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Stationery & School Supplies - Unique Printers',
        description: 'Complete range of school and office stationery items available at Unique Printers Wilgoda Kurunegala.'
      }
    });
  }, []);

  const categories = useMemo(() => {
    return ['All', ...stationeryCategories];
  }, [stationeryCategories]);

  const filteredItems = useMemo(() => {
    let result = stationeryItems.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q));

      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesStock = !stockOnly || item.inStock !== false;

      return matchesSearch && matchesCat && matchesStock;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'discount') {
      result.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    }

    return result;
  }, [stationeryItems, searchQuery, selectedCategory, stockOnly, sortBy]);

  const handleAdd = (item: StationeryItem) => {
    onAddToCart({
      id: String(item.id),
      title: item.name,
      price: item.price,
      type: 'stationery'
    });

    setAddedIds((prev) => ({ ...prev, [String(item.id)]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [String(item.id)]: false }));
    }, 1200);
  };

  const wholesaleWaLink = `${siteConfig.socialMedia.whatsappChat}?text=${encodeURIComponent(
    'Hello Unique Printers! 👋 I would like to inquire about bulk wholesale stationery packages for school / office orders.'
  )}`;

  return (
    <div style={{ minHeight: '85vh', backgroundColor: '#FFFBF5', paddingBottom: '70px' }}>
      {/* Breadcrumb Top Bar */}
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
            Store / <span style={{ color: '#F5D6A8' }}>Stationery & School Supplies</span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1C1917 0%, #292524 50%, #44403C 100%)',
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
            backgroundImage: 'radial-gradient(600px 300px at 80% 20%, rgba(183,123,61,0.25), transparent)',
            pointerEvents: 'none'
          }}
        />

        <div className="site-container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '999px', backgroundColor: 'rgba(255,255,255,0.14)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#F5D6A8' }}>
            <Sparkles size={12} />
            WILGODA COUNTER STOCK • A-Z SUPPLIES
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
            Stationery & School Supplies
          </h1>

          <p
            style={{
              marginTop: '12px',
              fontSize: '14.5px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.75)',
              maxWidth: '680px'
            }}
          >
            From CR notebooks and genuine Casio calculators to branded Atlas pens and art supplies. 
            All items are available in-store with percentage discounts and direct WhatsApp ordering.
          </p>

          <div style={{ marginTop: '22px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <a
              href={wholesaleWaLink}
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
              Inquire Wholesale School Rates
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
                placeholder="Search CR books, pens, calculators, pastels..."
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

            {/* Controls: Stock toggle + Sort By */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: '#121212',
                  backgroundColor: '#FFFBF5',
                  padding: '8px 14px',
                  borderRadius: '999px',
                  border: '1px solid rgba(0,0,0,0.08)'
                }}
              >
                <input
                  type="checkbox"
                  checked={stockOnly}
                  onChange={(e) => setStockOnly(e.target.checked)}
                  style={{ accentColor: '#B77B3D' }}
                />
                In Stock Only
              </label>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12.5px', color: 'rgba(0,0,0,0.5)' }}>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  style={{
                    height: '38px',
                    borderRadius: '999px',
                    padding: '0 12px',
                    border: '1px solid rgba(0,0,0,0.12)',
                    backgroundColor: '#FFFBF5',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#121212',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="featured">Featured</option>
                  <option value="discount">Highest Discount %</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div
            style={{
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(0,0,0,0.06)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '12.5px',
                    fontWeight: isSelected ? 700 : 500,
                    backgroundColor: isSelected ? '#121212' : '#FFFBF5',
                    color: isSelected ? '#FFFFFF' : '#121212',
                    border: isSelected ? '1px solid #121212' : '1px solid rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Counter & Status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ fontSize: '13.5px', color: 'rgba(0,0,0,0.6)' }}>
            Showing <b>{filteredItems.length}</b> stationery items
          </div>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#B77B3D',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Clear Category Filter
            </button>
          )}
        </div>

        {/* Items Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}
        >
          {filteredItems.map((item) => {
            const isAdded = addedIds[String(item.id)];
            const waLink = buildProductWhatsAppUrl({
              productName: item.name,
              category: item.category,
              price: item.price,
              originalPrice: item.oldPrice || undefined,
              discountPercent: item.discountPercent,
              productPath: `#/stationery?item=${item.id}`,
              customNote: item.count ? `Stock type: ${item.count}` : undefined
            });

            return (
              <div
                key={item.id}
                style={{
                  borderRadius: '20px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.08)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                className="hover-lift"
              >
                <div>
                  {/* Top Row: Icon/Image + Badges */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        backgroundColor: '#FFFBF5',
                        border: '1px solid rgba(183,123,61,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '22px',
                        flexShrink: 0
                      }}
                    >
                      {item.icon || '✏️'}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'flex-end' }}>
                      {item.discountPercent && item.discountPercent > 0 && (
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: '999px',
                            backgroundColor: '#B77B3D',
                            color: '#FFFFFF',
                            fontSize: '10.5px',
                            fontWeight: 800,
                            letterSpacing: '0.04em'
                          }}
                        >
                          {item.discountPercent}% OFF
                        </span>
                      )}
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: '999px',
                          backgroundColor: item.inStock ? '#E8F5E9' : '#FFEBEE',
                          color: item.inStock ? '#2E7D32' : '#C62828',
                          fontSize: '10.5px',
                          fontWeight: 700
                        }}
                      >
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>

                  {/* Category Pill */}
                  <div style={{ marginTop: '14px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#9A652F',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase'
                      }}
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      marginTop: '6px',
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#121212',
                      lineHeight: 1.35
                    }}
                  >
                    {item.name}
                  </h3>

                  {/* Description / Count */}
                  {item.description && (
                    <p
                      style={{
                        marginTop: '8px',
                        fontSize: '12.5px',
                        color: 'rgba(0,0,0,0.6)',
                        lineHeight: 1.5
                      }}
                      className="line-clamp-2"
                    >
                      {item.description}
                    </p>
                  )}

                  {item.count && (
                    <div style={{ marginTop: '8px', fontSize: '11.5px', color: 'rgba(0,0,0,0.5)', fontWeight: 500 }}>
                      Package: <b>{item.count}</b>
                    </div>
                  )}
                </div>

                {/* Price & CTA Action Buttons */}
                <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: '#121212' }}>
                      Rs. {item.price.toLocaleString()}
                    </span>
                    {item.oldPrice && item.oldPrice > item.price && (
                      <span style={{ fontSize: '13px', textDecoration: 'line-through', color: 'rgba(0,0,0,0.4)' }}>
                        Rs. {item.oldPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button
                      onClick={() => handleAdd(item)}
                      disabled={!item.inStock}
                      style={{
                        height: '38px',
                        borderRadius: '999px',
                        backgroundColor: isAdded ? '#10B981' : '#121212',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: item.inStock ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        opacity: item.inStock ? 1 : 0.5,
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
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        height: '38px',
                        borderRadius: '999px',
                        backgroundColor: '#25D366',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
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

        {filteredItems.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 16px',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              marginTop: '20px'
            }}
          >
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔍</div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#121212', margin: 0 }}>
              No stationery products found
            </h4>
            <p style={{ fontSize: '13.5px', color: 'rgba(0,0,0,0.5)', marginTop: '6px' }}>
              Try searching with different keywords or clearing your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setStockOnly(false);
              }}
              style={{
                marginTop: '16px',
                padding: '8px 20px',
                borderRadius: '999px',
                backgroundColor: '#121212',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
