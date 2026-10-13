import React, { useState } from 'react';
import { 
  LogOut, 
  BookOpen, 
  Trash2, 
  Edit3, 
  Plus, 
  Search, 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  Percent, 
  ToggleLeft, 
  ToggleRight,
  FolderPlus,
  MessageCircle
} from 'lucide-react';
import { useShopStore } from '../../store/shopStore';
import { BookItem, DesignItem, StationeryItem, OfferItem } from '../../types';

export const AdminPage: React.FC = () => {
  const {
    books, addBook, updateBook, deleteBook,
    designs, addDesign, updateDesign, deleteDesign, designCategories, addDesignCategory, updateDesignCategory, deleteDesignCategory,
    stationeryItems, addStationery, updateStationery, deleteStationery, stationeryCategories,
    offers, addOffer, updateOffer, toggleOfferActive, deleteOffer,
    enquiries, updateEnquiryStatus, deleteEnquiry
  } = useShopStore();

  // Navigation Tab State
  type AdminTab = 'overview' | 'books' | 'designs' | 'stationery' | 'offers' | 'enquiries';
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Modals State
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<BookItem | null>(null);

  const [designModalOpen, setDesignModalOpen] = useState(false);
  const [editingDesign, setEditingDesign] = useState<DesignItem | null>(null);

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryOldName, setEditingCategoryOldName] = useState<string | null>(null);

  const [stationeryModalOpen, setStationeryModalOpen] = useState(false);
  const [editingStationery, setEditingStationery] = useState<StationeryItem | null>(null);

  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<OfferItem | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // ----------------------------------------------------
  // BOOK FORM STATE
  // ----------------------------------------------------
  const [bookForm, setBookForm] = useState({
    title: '',
    grade: 'Grade 10',
    category: 'Workbooks',
    originalPrice: 1000,
    discountPercent: 0,
    accent: 'General',
    color: 'bg-blue-600',
    inStock: true,
    description: ''
  });

  const openAddBookModal = () => {
    setEditingBook(null);
    setBookForm({
      title: '',
      grade: 'Grade 10',
      category: 'Workbooks',
      originalPrice: 1000,
      discountPercent: 0,
      accent: 'General',
      color: 'bg-blue-600',
      inStock: true,
      description: ''
    });
    setBookModalOpen(true);
  };

  const openEditBookModal = (book: BookItem) => {
    setEditingBook(book);
    const orig = book.old || book.price;
    const disc = book.discountPercent || (book.old && book.old > book.price ? Math.round(((book.old - book.price) / book.old) * 100) : 0);
    setBookForm({
      title: book.title,
      grade: book.grade,
      category: book.category || 'Workbooks',
      originalPrice: orig,
      discountPercent: disc,
      accent: book.accent,
      color: book.color || 'bg-blue-600',
      inStock: book.inStock !== false,
      description: book.description || ''
    });
    setBookModalOpen(true);
  };

  const handleSaveBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookForm.title.trim()) return;

    const discount = Number(bookForm.discountPercent) || 0;
    const orig = Number(bookForm.originalPrice) || 0;
    const finalPrice = discount > 0 ? Math.round(orig * (1 - discount / 100)) : orig;

    const payload = {
      title: bookForm.title,
      grade: bookForm.grade,
      category: bookForm.category,
      price: finalPrice,
      old: discount > 0 ? orig : null,
      discountPercent: discount,
      accent: bookForm.accent,
      color: bookForm.color,
      inStock: bookForm.inStock,
      description: bookForm.description
    };

    if (editingBook) {
      updateBook(editingBook.id, payload);
      showToast('✅ Book updated successfully!');
    } else {
      addBook(payload);
      showToast('✅ Book added to catalog!');
    }
    setBookModalOpen(false);
  };

  // ----------------------------------------------------
  // DESIGN FORM STATE
  // ----------------------------------------------------
  const [designForm, setDesignForm] = useState({
    title: '',
    subtitle: '',
    cat: 'Invitations',
    tag: 'Popular',
    paperSpec: '300gsm Textured Pearl Card',
    priceNote: 'Starting from Rs. 150 / card',
    image: '',
    price: 150,
    originalPrice: 180,
    discountPercent: 15,
    inStock: true
  });

  const openAddDesignModal = () => {
    setEditingDesign(null);
    setDesignForm({
      title: '',
      subtitle: 'Custom typography & elegant finish',
      cat: designCategories[0] || 'Invitations',
      tag: 'New',
      paperSpec: '300gsm Pearl Card',
      priceNote: 'Starting from Rs. 150',
      image: '',
      price: 150,
      originalPrice: 180,
      discountPercent: 15,
      inStock: true
    });
    setDesignModalOpen(true);
  };

  const openEditDesignModal = (design: DesignItem) => {
    setEditingDesign(design);
    setDesignForm({
      title: design.title,
      subtitle: design.subtitle,
      cat: design.cat,
      tag: design.tag || '',
      paperSpec: design.paperSpec || '',
      priceNote: design.priceNote || '',
      image: design.image || '',
      price: design.price || 150,
      originalPrice: design.originalPrice || 180,
      discountPercent: design.discountPercent || 0,
      inStock: design.inStock !== false
    });
    setDesignModalOpen(true);
  };

  const handleSaveDesign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!designForm.title.trim()) return;

    const discount = Number(designForm.discountPercent) || 0;
    const orig = Number(designForm.originalPrice) || 0;
    const finalPrice = discount > 0 ? Math.round(orig * (1 - discount / 100)) : (Number(designForm.price) || 150);

    const payload = {
      title: designForm.title,
      subtitle: designForm.subtitle,
      cat: designForm.cat,
      tag: designForm.tag,
      paperSpec: designForm.paperSpec,
      priceNote: designForm.priceNote,
      image: designForm.image || undefined,
      price: finalPrice,
      originalPrice: orig,
      discountPercent: discount,
      inStock: designForm.inStock
    };

    if (editingDesign) {
      updateDesign(editingDesign.id, payload);
      showToast('✅ Sample design updated!');
    } else {
      addDesign(payload);
      showToast('✅ New design sample published!');
    }
    setDesignModalOpen(false);
  };

  // ----------------------------------------------------
  // STATIONERY FORM STATE
  // ----------------------------------------------------
  const [stationeryForm, setStationeryForm] = useState({
    name: '',
    category: 'CR Books & Notebooks',
    originalPrice: 300,
    discountPercent: 10,
    count: 'In Stock',
    icon: '✏️',
    description: '',
    inStock: true
  });

  const openAddStationeryModal = () => {
    setEditingStationery(null);
    setStationeryForm({
      name: '',
      category: stationeryCategories[0] || 'CR Books & Notebooks',
      originalPrice: 300,
      discountPercent: 10,
      count: 'In Stock',
      icon: '✏️',
      description: '',
      inStock: true
    });
    setStationeryModalOpen(true);
  };

  const openEditStationeryModal = (item: StationeryItem) => {
    setEditingStationery(item);
    const orig = item.oldPrice || item.price || 0;
    setStationeryForm({
      name: item.name,
      category: item.category || 'CR Books & Notebooks',
      originalPrice: orig,
      discountPercent: item.discountPercent || 0,
      count: item.count || 'In Stock',
      icon: item.icon || '✏️',
      description: item.description || '',
      inStock: item.inStock !== false
    });
    setStationeryModalOpen(true);
  };

  const handleSaveStationery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stationeryForm.name.trim()) return;

    const discount = Number(stationeryForm.discountPercent) || 0;
    const orig = Number(stationeryForm.originalPrice) || 0;
    const finalPrice = discount > 0 ? Math.round(orig * (1 - discount / 100)) : orig;

    const payload = {
      name: stationeryForm.name,
      category: stationeryForm.category,
      price: finalPrice,
      oldPrice: discount > 0 ? orig : null,
      discountPercent: discount,
      count: stationeryForm.count,
      icon: stationeryForm.icon,
      description: stationeryForm.description,
      inStock: stationeryForm.inStock
    };

    if (editingStationery && editingStationery.id) {
      updateStationery(editingStationery.id, payload);
      showToast('✅ Stationery item updated!');
    } else {
      addStationery(payload);
      showToast('✅ Stationery item added to stock!');
    }
    setStationeryModalOpen(false);
  };

  // ----------------------------------------------------
  // OFFER FORM STATE
  // ----------------------------------------------------
  const [offerForm, setOfferForm] = useState({
    title: '',
    category: 'Discount Bundle',
    originalPrice: 3000,
    discountPercent: 20,
    badge: '20% OFF',
    promoCode: 'SCHOOL20',
    description: '',
    isActive: true,
    icon: '🎁'
  });

  const openAddOfferModal = () => {
    setEditingOffer(null);
    setOfferForm({
      title: '',
      category: 'Discount Bundle',
      originalPrice: 3000,
      discountPercent: 20,
      badge: '20% OFF',
      promoCode: 'SCHOOL20',
      description: 'Special back-to-school discount package with guaranteed savings.',
      isActive: true,
      icon: '🎁'
    });
    setOfferModalOpen(true);
  };

  const openEditOfferModal = (offer: OfferItem) => {
    setEditingOffer(offer);
    const orig = offer.old || offer.price;
    setOfferForm({
      title: offer.title,
      category: offer.category || 'Discount Bundle',
      originalPrice: orig,
      discountPercent: offer.discountPercent || 0,
      badge: offer.badge || offer.off || 'SPECIAL DEAL',
      promoCode: offer.promoCode || '',
      description: offer.description || '',
      isActive: offer.isActive !== false,
      icon: offer.icon || '🎁'
    });
    setOfferModalOpen(true);
  };

  const handleSaveOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerForm.title.trim()) return;

    const discount = Number(offerForm.discountPercent) || 0;
    const orig = Number(offerForm.originalPrice) || 0;
    const finalPrice = discount > 0 ? Math.round(orig * (1 - discount / 100)) : orig;

    const payload = {
      title: offerForm.title,
      category: offerForm.category,
      price: finalPrice,
      old: discount > 0 ? orig : undefined,
      discountPercent: discount,
      badge: offerForm.badge,
      off: discount > 0 ? `${discount}% OFF` : undefined,
      promoCode: offerForm.promoCode,
      description: offerForm.description,
      isActive: offerForm.isActive,
      icon: offerForm.icon
    };

    if (editingOffer) {
      updateOffer(editingOffer.id, payload);
      showToast('✅ Promotional offer updated!');
    } else {
      addOffer(payload);
      showToast('✅ New promotional offer created!');
    }
    setOfferModalOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', color: '#1A1A1A' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#121212',
            color: '#FFFFFF',
            padding: '12px 24px',
            borderRadius: '999px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            zIndex: 9999,
            fontSize: '14px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Sparkles size={16} style={{ color: '#B77B3D' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Navbar */}
      <header
        style={{
          backgroundColor: '#121212',
          color: '#FFFFFF',
          padding: '0 24px',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a
            href="#/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={16} />
            <span>Storefront</span>
          </a>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#B77B3D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '14px'
              }}
            >
              UP
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '15px', letterSpacing: '-0.01em' }}>
                Unique Printers CRM
              </div>
              <div style={{ fontSize: '10px', color: '#F5D6A8', fontWeight: 600 }}>
                ADMIN DASHBOARD • WILGODA
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '999px',
              backgroundColor: 'rgba(16,185,129,0.15)',
              color: '#10B981',
              fontSize: '11.5px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
            Connected & Live
          </span>

          <a
            href="#/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: '#FFFFFF',
              fontSize: '12.5px',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            <span>Preview Site</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </header>

      {/* Main CRM Layout */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 20px' }}>
        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '12px',
            marginBottom: '24px',
            borderBottom: '1px solid #E5E7EB'
          }}
        >
          {[
            { id: 'overview', label: '📊 Dashboard Overview', count: null },
            { id: 'books', label: '📚 School Books', count: books.length },
            { id: 'designs', label: '🎨 Sample Designs & Works', count: designs.length },
            { id: 'stationery', label: '✏️ Stationery Items', count: stationeryItems.length },
            { id: 'offers', label: '🏷️ Offers & Promos', count: offers.length },
            { id: 'enquiries', label: '💬 Customer Quotes', count: enquiries.length }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as AdminTab);
                  setSearchQuery('');
                }}
                style={{
                  height: '42px',
                  padding: '0 18px',
                  borderRadius: '12px',
                  backgroundColor: isActive ? '#121212' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#4B5563',
                  border: isActive ? '1px solid #121212' : '1px solid #E5E7EB',
                  fontSize: '13.5px',
                  fontWeight: isActive ? 700 : 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.02)',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span
                    style={{
                      padding: '2px 7px',
                      borderRadius: '999px',
                      backgroundColor: isActive ? '#B77B3D' : '#F3F4F6',
                      color: isActive ? '#FFFFFF' : '#6B7280',
                      fontSize: '11px',
                      fontWeight: 700
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* --------------------------------------------------------- */}
        {/* TAB 1: OVERVIEW */}
        {/* --------------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              {[
                { title: 'School Books in Stock', value: books.length, icon: '📚', color: '#3B82F6', tab: 'books' },
                { title: 'Sample Designs Portfolio', value: designs.length, icon: '🎨', color: '#B77B3D', tab: 'designs' },
                { title: 'Design Categories', value: designCategories.length, icon: '🏷️', color: '#10B981', tab: 'designs' },
                { title: 'Stationery Catalog Items', value: stationeryItems.length, icon: '✏️', color: '#8B5CF6', tab: 'stationery' },
                { title: 'Active Promotional Offers', value: offers.filter(o => o.isActive !== false).length, icon: '🎁', color: '#EC4899', tab: 'offers' },
                { title: 'Customer Inquiries', value: enquiries.length, icon: '💬', color: '#F59E0B', tab: 'enquiries' }
              ].map((stat, i) => (
                <div
                  key={i}
                  onClick={() => setActiveTab(stat.tab as AdminTab)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E5E7EB',
                    padding: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    cursor: 'pointer',
                    transition: 'transform 0.15s, box-shadow 0.15s'
                  }}
                  className="hover-lift"
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '26px' }}>{stat.icon}</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#B77B3D' }}>Manage →</span>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 800, marginTop: '12px', color: '#121212' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: 500, marginTop: '2px' }}>
                    {stat.title}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions Panel */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #E5E7EB',
                padding: '24px',
                marginBottom: '32px'
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, marginBottom: '16px' }}>
                🚀 Instant Quick Actions
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <button
                  onClick={openAddBookModal}
                  style={{
                    height: '44px',
                    padding: '0 20px',
                    borderRadius: '12px',
                    backgroundColor: '#121212',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Plus size={16} />
                  Add School Book
                </button>

                <button
                  onClick={openAddDesignModal}
                  style={{
                    height: '44px',
                    padding: '0 20px',
                    borderRadius: '12px',
                    backgroundColor: '#B77B3D',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Plus size={16} />
                  Add Sample Design
                </button>

                <button
                  onClick={openAddStationeryModal}
                  style={{
                    height: '44px',
                    padding: '0 20px',
                    borderRadius: '12px',
                    backgroundColor: '#1E3A5F',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Plus size={16} />
                  Add Stationery Product
                </button>

                <button
                  onClick={openAddOfferModal}
                  style={{
                    height: '44px',
                    padding: '0 20px',
                    borderRadius: '12px',
                    backgroundColor: '#0F766E',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Plus size={16} />
                  Create Promotional Offer
                </button>

                <button
                  onClick={() => {
                    setEditingCategoryOldName(null);
                    setNewCategoryName('');
                    setCategoryModalOpen(true);
                  }}
                  style={{
                    height: '44px',
                    padding: '0 20px',
                    borderRadius: '12px',
                    backgroundColor: '#F3F4F6',
                    color: '#121212',
                    border: '1px solid #D1D5DB',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <FolderPlus size={16} />
                  Manage Design Categories
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------- */}
        {/* TAB 2: SCHOOL BOOKS */}
        {/* --------------------------------------------------------- */}
        {activeTab === 'books' && (
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>School Books Management</h2>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: 0, marginTop: '2px' }}>
                  Manage textbooks, syllabus past papers, percentage discounts and stock status.
                </p>
              </div>
              <button
                onClick={openAddBookModal}
                style={{
                  height: '42px',
                  padding: '0 20px',
                  borderRadius: '10px',
                  backgroundColor: '#121212',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Plus size={16} />
                Add Book
              </button>
            </div>

            {/* Books Search Bar */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '14px', border: '1px solid #E5E7EB', display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <Search size={18} style={{ color: '#9CA3AF', alignSelf: 'center' }} />
              <input
                type="text"
                placeholder="Search books by title, grade or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px' }}
              />
            </div>

            {/* Books Table */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontWeight: 600 }}>
                    <th style={{ padding: '14px 16px' }}>Book Title</th>
                    <th style={{ padding: '14px 16px' }}>Grade</th>
                    <th style={{ padding: '14px 16px' }}>Category</th>
                    <th style={{ padding: '14px 16px' }}>Original Price</th>
                    <th style={{ padding: '14px 16px' }}>Discount %</th>
                    <th style={{ padding: '14px 16px' }}>Final Price</th>
                    <th style={{ padding: '14px 16px' }}>Stock</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books
                    .filter(b => !searchQuery || b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.grade.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((book) => (
                      <tr key={book.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                        <td style={{ padding: '14px 16px', fontWeight: 700, color: '#111827' }}>
                          {book.title}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{ padding: '3px 8px', borderRadius: '6px', backgroundColor: '#EFF6FF', color: '#2563EB', fontWeight: 700, fontSize: '12px' }}>
                            {book.grade}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px', color: '#4B5563' }}>
                          {book.category || 'General'}
                        </td>
                        <td style={{ padding: '14px 16px', color: '#6B7280' }}>
                          Rs. {(book.old || book.price).toLocaleString()}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          {book.discountPercent && book.discountPercent > 0 ? (
                            <span style={{ padding: '3px 8px', borderRadius: '999px', backgroundColor: '#FEF3C7', color: '#D97706', fontWeight: 800, fontSize: '11.5px' }}>
                              {book.discountPercent}% OFF
                            </span>
                          ) : (
                            <span style={{ color: '#9CA3AF' }}>0%</span>
                          )}
                        </td>
                        <td style={{ padding: '14px 16px', fontWeight: 800, color: '#111827' }}>
                          Rs. {book.price.toLocaleString()}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <span
                            onClick={() => {
                              updateBook(book.id, { inStock: !book.inStock });
                              showToast(`Stock updated for ${book.title}`);
                            }}
                            style={{
                              padding: '3px 10px',
                              borderRadius: '999px',
                              backgroundColor: book.inStock !== false ? '#DCFCE7' : '#FEE2E2',
                              color: book.inStock !== false ? '#15803D' : '#B91C1C',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            {book.inStock !== false ? '● In Stock' : '✕ Out of Stock'}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '8px' }}>
                            <button
                              onClick={() => openEditBookModal(book)}
                              style={{ padding: '6px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', cursor: 'pointer' }}
                              title="Edit Book"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
                                  deleteBook(book.id);
                                  showToast('Book removed from store');
                                }
                              }}
                              style={{ padding: '6px', borderRadius: '8px', border: '1px solid #FCA5A5', backgroundColor: '#FEF2F2', color: '#DC2626', cursor: 'pointer' }}
                              title="Delete Book"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------- */}
        {/* TAB 3: SAMPLE DESIGNS & CATEGORIES */}
        {/* --------------------------------------------------------- */}
        {activeTab === 'designs' && (
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>Sample Designs & Printing Works</h2>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: 0, marginTop: '2px' }}>
                  Manage portfolio designs and customize design categories (create, edit, delete).
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => {
                    setEditingCategoryOldName(null);
                    setNewCategoryName('');
                    setCategoryModalOpen(true);
                  }}
                  style={{
                    height: '42px',
                    padding: '0 16px',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    color: '#121212',
                    border: '1px solid #D1D5DB',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <FolderPlus size={16} />
                  Categories ({designCategories.length})
                </button>

                <button
                  onClick={openAddDesignModal}
                  style={{
                    height: '42px',
                    padding: '0 20px',
                    borderRadius: '10px',
                    backgroundColor: '#B77B3D',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Plus size={16} />
                  Add Design Item
                </button>
              </div>
            </div>

            {/* Category Badges Manager Row */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #E5E7EB',
                padding: '16px',
                marginBottom: '20px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#6B7280' }}>
                Active Categories:
              </span>
              {designCategories.map((cat) => {
                const count = designs.filter(d => d.cat === cat).length;
                return (
                  <div
                    key={cat}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 12px',
                      borderRadius: '999px',
                      backgroundColor: '#F3F4F6',
                      border: '1px solid #E5E7EB',
                      fontSize: '12.5px',
                      fontWeight: 600
                    }}
                  >
                    <span>{cat}</span>
                    <span style={{ backgroundColor: '#E5E7EB', padding: '1px 6px', borderRadius: '999px', fontSize: '11px', color: '#4B5563' }}>
                      {count}
                    </span>
                    <button
                      onClick={() => {
                        setEditingCategoryOldName(cat);
                        setNewCategoryName(cat);
                        setCategoryModalOpen(true);
                      }}
                      style={{ background: 'transparent', border: 'none', color: '#6B7280', cursor: 'pointer', padding: 0 }}
                      title="Rename Category"
                    >
                      <Edit3 size={12} />
                    </button>
                    {designCategories.length > 1 && (
                      <button
                        onClick={() => {
                          if (confirm(`Delete category "${cat}"? Items will be moved to default.`)) {
                            deleteDesignCategory(cat);
                            showToast(`Category "${cat}" deleted`);
                          }
                        }}
                        style={{ background: 'transparent', border: 'none', color: '#DC2626', cursor: 'pointer', padding: 0 }}
                        title="Delete Category"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Designs Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px'
              }}
            >
              {designs.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E5E7EB',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                  }}
                >
                  <div>
                    <div style={{ height: '160px', backgroundColor: '#1E1E1E', position: 'relative' }}>
                      {item.image ? (
                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
                          🎨
                        </div>
                      )}
                      <span style={{ position: 'absolute', top: '10px', left: '10px', padding: '3px 8px', borderRadius: '6px', backgroundColor: 'rgba(0,0,0,0.7)', color: '#FFFFFF', fontSize: '11px', fontWeight: 700 }}>
                        {item.cat}
                      </span>
                      {item.tag && (
                        <span style={{ position: 'absolute', top: '10px', right: '10px', padding: '3px 8px', borderRadius: '6px', backgroundColor: '#B77B3D', color: '#FFFFFF', fontSize: '11px', fontWeight: 700 }}>
                          {item.tag}
                        </span>
                      )}
                    </div>

                    <div style={{ padding: '16px' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#111827' }}>
                        {item.title}
                      </h4>
                      <p style={{ fontSize: '12.5px', color: '#6B7280', marginTop: '4px', lineHeight: 1.4 }}>
                        {item.subtitle}
                      </p>
                      {item.paperSpec && (
                        <div style={{ fontSize: '11.5px', color: '#B77B3D', fontWeight: 600, marginTop: '6px' }}>
                          📜 {item.paperSpec}
                        </div>
                      )}
                      {item.priceNote && (
                        <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>
                          {item.priceNote}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ padding: '12px 16px', borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#111827' }}>
                      Rs. {(item.price || 150).toLocaleString()}
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => openEditDesignModal(item)}
                        style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Edit3 size={13} />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${item.title}"?`)) {
                            deleteDesign(item.id);
                            showToast('Design item deleted');
                          }
                        }}
                        style={{ padding: '6px', borderRadius: '8px', border: '1px solid #FCA5A5', backgroundColor: '#FEF2F2', color: '#DC2626', cursor: 'pointer' }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --------------------------------------------------------- */}
        {/* TAB 4: STATIONERY ITEMS */}
        {/* --------------------------------------------------------- */}
        {activeTab === 'stationery' && (
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>Stationery Items Management</h2>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: 0, marginTop: '2px' }}>
                  Manage A-Z school & office stationery inventory, prices, and discount percentages.
                </p>
              </div>

              <button
                onClick={openAddStationeryModal}
                style={{
                  height: '42px',
                  padding: '0 20px',
                  borderRadius: '10px',
                  backgroundColor: '#1E3A5F',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Plus size={16} />
                Add Stationery Item
              </button>
            </div>

            {/* Table */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontWeight: 600 }}>
                    <th style={{ padding: '14px 16px' }}>Item Name</th>
                    <th style={{ padding: '14px 16px' }}>Category</th>
                    <th style={{ padding: '14px 16px' }}>Original Price</th>
                    <th style={{ padding: '14px 16px' }}>Discount %</th>
                    <th style={{ padding: '14px 16px' }}>Selling Price</th>
                    <th style={{ padding: '14px 16px' }}>Stock Info</th>
                    <th style={{ padding: '14px 16px' }}>Status</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stationeryItems.map((item) => (
                    <tr key={String(item.id || item.name)} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '18px' }}>{item.icon || '✏️'}</span>
                          <span style={{ fontWeight: 700, color: '#111827' }}>{item.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#4B5563' }}>
                        {item.category || 'General'}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#6B7280' }}>
                        Rs. {(item.oldPrice || item.price || 0).toLocaleString()}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        {item.discountPercent && item.discountPercent > 0 ? (
                          <span style={{ padding: '3px 8px', borderRadius: '999px', backgroundColor: '#FEF3C7', color: '#D97706', fontWeight: 800, fontSize: '11.5px' }}>
                            {item.discountPercent}% OFF
                          </span>
                        ) : (
                          <span style={{ color: '#9CA3AF' }}>0%</span>
                        )}
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: 800, color: '#111827' }}>
                        Rs. {(item.price || 0).toLocaleString()}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#6B7280' }}>
                        {item.count || 'In Stock'}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span
                          onClick={() => {
                            if (item.id) {
                              updateStationery(item.id, { inStock: !item.inStock });
                              showToast(`Stock updated for ${item.name}`);
                            }
                          }}
                          style={{
                            padding: '3px 10px',
                            borderRadius: '999px',
                            backgroundColor: item.inStock ? '#DCFCE7' : '#FEE2E2',
                            color: item.inStock ? '#15803D' : '#B91C1C',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {item.inStock ? '● In Stock' : '✕ Out of Stock'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button
                            onClick={() => openEditStationeryModal(item)}
                            style={{ padding: '6px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', cursor: 'pointer' }}
                            title="Edit Item"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete "${item.name}"?`)) {
                                if (item.id) deleteStationery(item.id);
                                showToast('Stationery item removed');
                              }
                            }}
                            style={{ padding: '6px', borderRadius: '8px', border: '1px solid #FCA5A5', backgroundColor: '#FEF2F2', color: '#DC2626', cursor: 'pointer' }}
                            title="Delete Item"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------- */}
        {/* TAB 5: OFFERS SECTION WITH ACTIVE/INACTIVE TOGGLE */}
        {/* --------------------------------------------------------- */}
        {activeTab === 'offers' && (
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>Offers & Promotions Management</h2>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: 0, marginTop: '2px' }}>
                  Toggle Active/Inactive offers → Frontend automatically shows or hides them in real time.
                </p>
              </div>

              <button
                onClick={openAddOfferModal}
                style={{
                  height: '42px',
                  padding: '0 20px',
                  borderRadius: '10px',
                  backgroundColor: '#0F766E',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Plus size={16} />
                Create New Offer
              </button>
            </div>

            {/* Offers Cards with Toggle Switch */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {offers.map((offer) => {
                const isActive = offer.isActive !== false;
                return (
                  <div
                    key={offer.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      border: isActive ? '2px solid #0F766E' : '1px solid #E5E7EB',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      opacity: isActive ? 1 : 0.65
                    }}
                  >
                    <div>
                      {/* Top Bar with Active Toggle Switch */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '24px' }}>{offer.icon || '🎁'}</span>
                          <span style={{ padding: '3px 8px', borderRadius: '6px', backgroundColor: '#121212', color: '#FFFFFF', fontSize: '11px', fontWeight: 800 }}>
                            {offer.badge || offer.off || 'OFFER'}
                          </span>
                        </div>

                        {/* TOGGLE ACTIVE / INACTIVE */}
                        <button
                          onClick={() => {
                            toggleOfferActive(offer.id);
                            showToast(isActive ? 'Offer hidden from storefront' : 'Offer published to storefront!');
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 12px',
                            borderRadius: '999px',
                            backgroundColor: isActive ? '#DCFCE7' : '#F3F4F6',
                            color: isActive ? '#15803D' : '#6B7280',
                            border: 'none',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                          title="Click to toggle Active/Inactive"
                        >
                          {isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                          <span>{isActive ? 'ACTIVE' : 'INACTIVE'}</span>
                        </button>
                      </div>

                      <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#111827' }}>
                        {offer.title}
                      </h3>

                      {offer.description && (
                        <p style={{ fontSize: '12.5px', color: '#6B7280', marginTop: '6px', lineHeight: 1.4 }}>
                          {offer.description}
                        </p>
                      )}

                      {offer.promoCode && (
                        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                          <span style={{ color: '#6B7280' }}>Promo Code:</span>
                          <span style={{ padding: '2px 8px', borderRadius: '6px', backgroundColor: '#FEF3C7', color: '#92400E', fontWeight: 700, fontFamily: 'monospace' }}>
                            {offer.promoCode}
                          </span>
                        </div>
                      )}
                    </div>

                    <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: '17px', fontWeight: 800, color: '#111827' }}>
                          Rs. {offer.price.toLocaleString()}
                        </div>
                        {offer.old && (
                          <div style={{ fontSize: '12px', textDecoration: 'line-through', color: '#9CA3AF' }}>
                            Rs. {offer.old.toLocaleString()}
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => openEditOfferModal(offer)}
                          style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Edit3 size={13} />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete offer "${offer.title}"?`)) {
                              deleteOffer(offer.id);
                              showToast('Offer deleted');
                            }
                          }}
                          style={{ padding: '6px', borderRadius: '8px', border: '1px solid #FCA5A5', backgroundColor: '#FEF2F2', color: '#DC2626', cursor: 'pointer' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --------------------------------------------------------- */}
        {/* TAB 6: CUSTOMER ENQUIRIES & QUOTES */}
        {/* --------------------------------------------------------- */}
        {activeTab === 'enquiries' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>Customer Quotes & Inquiries</h2>
              <p style={{ fontSize: '13px', color: '#6B7280', margin: 0, marginTop: '2px' }}>
                Customer requests submitted via website. Click WhatsApp to reply directly with inquiry context.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {enquiries.map((enq) => {
                const replyWaUrl = `https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hello ${enq.name}! 👋 Thank you for inquiring at Unique Printers regarding "${enq.serviceType}". We are happy to assist you!`
                )}`;

                return (
                  <div
                    key={enq.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      border: '1px solid #E5E7EB',
                      padding: '20px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px'
                    }}
                  >
                    <div style={{ flex: '1 1 300px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#111827' }}>
                          {enq.name}
                        </h4>
                        <span style={{ padding: '2px 8px', borderRadius: '999px', backgroundColor: '#EFF6FF', color: '#2563EB', fontSize: '11px', fontWeight: 700 }}>
                          {enq.serviceType}
                        </span>
                        <span
                          style={{
                            padding: '2px 8px',
                            borderRadius: '999px',
                            backgroundColor: enq.status === 'completed' ? '#DCFCE7' : (enq.status === 'contacted' ? '#FEF3C7' : '#F3F4F6'),
                            color: enq.status === 'completed' ? '#15803D' : (enq.status === 'contacted' ? '#B45309' : '#6B7280'),
                            fontSize: '11px',
                            fontWeight: 700
                          }}
                        >
                          {(enq.status || 'pending').toUpperCase()}
                        </span>
                      </div>

                      <div style={{ fontSize: '13px', color: '#4B5563', marginTop: '6px' }}>
                        📞 <b>{enq.phone}</b>
                      </div>

                      <div style={{ marginTop: '8px', fontSize: '13px', color: '#1F2937', backgroundColor: '#F9FAFB', padding: '10px 14px', borderRadius: '10px', border: '1px solid #F3F4F6' }}>
                        "{enq.notes}"
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <select
                        value={enq.status || 'pending'}
                        onChange={(e) => {
                          updateEnquiryStatus(enq.id, e.target.value as any);
                          showToast(`Inquiry status updated to ${e.target.value}`);
                        }}
                        style={{
                          height: '38px',
                          borderRadius: '8px',
                          padding: '0 10px',
                          border: '1px solid #D1D5DB',
                          backgroundColor: '#FFFFFF',
                          fontSize: '12.5px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                      </select>

                      <a
                        href={replyWaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          height: '38px',
                          padding: '0 14px',
                          borderRadius: '8px',
                          backgroundColor: '#25D366',
                          color: '#FFFFFF',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          textDecoration: 'none'
                        }}
                      >
                        <MessageCircle size={15} />
                        Reply WhatsApp
                      </a>

                      <button
                        onClick={() => {
                          if (confirm(`Delete inquiry from ${enq.name}?`)) {
                            deleteEnquiry(enq.id);
                            showToast('Inquiry deleted');
                          }
                        }}
                        style={{ padding: '8px', borderRadius: '8px', border: '1px solid #FCA5A5', backgroundColor: '#FEF2F2', color: '#DC2626', cursor: 'pointer' }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* --------------------------------------------------------- */}
      {/* MODAL 1: ADD / EDIT BOOK */}
      {/* --------------------------------------------------------- */}
      {bookModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', width: '100%', maxWidth: '580px', maxHeight: '90vh', overflowY: 'auto', padding: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>
                {editingBook ? 'Edit School Book' : 'Add New School Book'}
              </h3>
              <button onClick={() => setBookModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px' }}>✕</button>
            </div>

            <form onSubmit={handleSaveBook} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Book Title *</label>
                <input
                  type="text"
                  required
                  value={bookForm.title}
                  onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                  placeholder="e.g. Grade 10 Mathematics Workbook (English Medium)"
                  style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 12px', fontSize: '13.5px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Grade *</label>
                  <select
                    value={bookForm.grade}
                    onChange={(e) => setBookForm({ ...bookForm, grade: e.target.value })}
                    style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 12px', fontSize: '13.5px' }}
                  >
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 6">Grade 6</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="O/L">O/L</option>
                    <option value="A/L">A/L</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Category *</label>
                  <input
                    type="text"
                    value={bookForm.category}
                    onChange={(e) => setBookForm({ ...bookForm, category: e.target.value })}
                    placeholder="e.g. Workbooks, Past Papers"
                    style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 12px', fontSize: '13.5px' }}
                  />
                </div>
              </div>

              {/* Price & Discount Calculator */}
              <div style={{ backgroundColor: '#F9FAFB', padding: '16px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#111827', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Percent size={15} style={{ color: '#B77B3D' }} />
                  <span>Pricing & Percentage Discount Setup</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Original Price (Rs.) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={bookForm.originalPrice}
                      onChange={(e) => setBookForm({ ...bookForm, originalPrice: Number(e.target.value) })}
                      style={{ width: '100%', height: '38px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 10px', fontSize: '13.5px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Discount % (0 to 100)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={bookForm.discountPercent}
                      onChange={(e) => setBookForm({ ...bookForm, discountPercent: Number(e.target.value) })}
                      style={{ width: '100%', height: '38px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 10px', fontSize: '13.5px' }}
                    />
                  </div>
                </div>

                {/* Live Calculated Price */}
                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '8px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
                  <span style={{ fontSize: '12.5px', color: '#4B5563' }}>Selling Price to Customer:</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 800, color: '#15803D' }}>
                      Rs. {Math.round(bookForm.originalPrice * (1 - (bookForm.discountPercent || 0) / 100)).toLocaleString()}
                    </span>
                    {bookForm.discountPercent > 0 && (
                      <span style={{ fontSize: '11px', color: '#B77B3D', fontWeight: 700 }}>
                        (Saves Rs. {Math.round(bookForm.originalPrice * (bookForm.discountPercent / 100)).toLocaleString()})
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Subject Accent Label</label>
                <input
                  type="text"
                  value={bookForm.accent}
                  onChange={(e) => setBookForm({ ...bookForm, accent: e.target.value })}
                  placeholder="e.g. Mathematics, Science, History"
                  style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 12px', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={bookForm.inStock}
                    onChange={(e) => setBookForm({ ...bookForm, inStock: e.target.checked })}
                    style={{ accentColor: '#121212', width: '16px', height: '16px' }}
                  />
                  Mark as Available In Stock
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setBookModalOpen(false)}
                  style={{ height: '42px', padding: '0 18px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: '42px', padding: '0 24px', borderRadius: '8px', border: 'none', backgroundColor: '#121212', color: '#FFFFFF', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                >
                  {editingBook ? 'Save Changes' : 'Add Book'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------- */}
      {/* MODAL 2: ADD / EDIT DESIGN ITEM */}
      {/* --------------------------------------------------------- */}
      {designModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', width: '100%', maxWidth: '580px', maxHeight: '90vh', overflowY: 'auto', padding: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>
                {editingDesign ? 'Edit Sample Design' : 'Add Sample Design Item'}
              </h3>
              <button onClick={() => setDesignModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px' }}>✕</button>
            </div>

            <form onSubmit={handleSaveDesign} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Design Title *</label>
                <input
                  type="text"
                  required
                  value={designForm.title}
                  onChange={(e) => setDesignForm({ ...designForm, title: e.target.value })}
                  placeholder="e.g. Royal Gold Crest Wedding Card"
                  style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 12px', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Category *</label>
                <select
                  value={designForm.cat}
                  onChange={(e) => setDesignForm({ ...designForm, cat: e.target.value })}
                  style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 12px', fontSize: '13.5px' }}
                >
                  {designCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Subtitle / Typography Details</label>
                <input
                  type="text"
                  value={designForm.subtitle}
                  onChange={(e) => setDesignForm({ ...designForm, subtitle: e.target.value })}
                  placeholder="e.g. Classic Floral • Gold Script Typography"
                  style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 12px', fontSize: '13.5px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Paper & Material Spec</label>
                  <input
                    type="text"
                    value={designForm.paperSpec}
                    onChange={(e) => setDesignForm({ ...designForm, paperSpec: e.target.value })}
                    placeholder="e.g. 300gsm Textured Pearl Card"
                    style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 12px', fontSize: '13.5px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Badge / Tag</label>
                  <input
                    type="text"
                    value={designForm.tag}
                    onChange={(e) => setDesignForm({ ...designForm, tag: e.target.value })}
                    placeholder="e.g. Popular, Trending, Best Seller"
                    style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 12px', fontSize: '13.5px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Price Guide / Note</label>
                <input
                  type="text"
                  value={designForm.priceNote}
                  onChange={(e) => setDesignForm({ ...designForm, priceNote: e.target.value })}
                  placeholder="e.g. Starting from Rs. 120 / card"
                  style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 12px', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Image URL / Local Asset Path</label>
                <input
                  type="text"
                  value={designForm.image}
                  onChange={(e) => setDesignForm({ ...designForm, image: e.target.value })}
                  placeholder="e.g. /assets/samples/wedding_invite_classic.jpg"
                  style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 12px', fontSize: '13.5px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setDesignModalOpen(false)}
                  style={{ height: '42px', padding: '0 18px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: '42px', padding: '0 24px', borderRadius: '8px', border: 'none', backgroundColor: '#B77B3D', color: '#FFFFFF', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                >
                  {editingDesign ? 'Save Design' : 'Publish Design'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------- */}
      {/* MODAL 3: MANAGE DESIGN CATEGORIES (CREATE / EDIT) */}
      {/* --------------------------------------------------------- */}
      {categoryModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', width: '100%', maxWidth: '440px', padding: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>
                {editingCategoryOldName ? 'Rename Category' : 'Create New Category'}
              </h3>
              <button onClick={() => setCategoryModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px' }}>✕</button>
            </div>

            <p style={{ fontSize: '13px', color: '#6B7280', marginTop: 0, marginBottom: '16px' }}>
              Categories are displayed on the public portfolio filter and available in the design creator dropdown.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newCategoryName.trim()) return;
                if (editingCategoryOldName) {
                  updateDesignCategory(editingCategoryOldName, newCategoryName.trim());
                  showToast(`Category renamed to "${newCategoryName.trim()}"`);
                } else {
                  addDesignCategory(newCategoryName.trim());
                  showToast(`Category "${newCategoryName.trim()}" created`);
                }
                setCategoryModalOpen(false);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Category Name *</label>
                <input
                  type="text"
                  required
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g. Stickers & Decals, Envelopes"
                  style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 12px', fontSize: '13.5px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setCategoryModalOpen(false)}
                  style={{ height: '40px', padding: '0 16px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: '40px', padding: '0 20px', borderRadius: '8px', border: 'none', backgroundColor: '#121212', color: '#FFFFFF', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                >
                  {editingCategoryOldName ? 'Save Name' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------- */}
      {/* MODAL 4: ADD / EDIT STATIONERY PRODUCT */}
      {/* --------------------------------------------------------- */}
      {stationeryModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', width: '100%', maxWidth: '580px', maxHeight: '90vh', overflowY: 'auto', padding: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>
                {editingStationery ? 'Edit Stationery Item' : 'Add Stationery Product'}
              </h3>
              <button onClick={() => setStationeryModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px' }}>✕</button>
            </div>

            <form onSubmit={handleSaveStationery} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Product Name *</label>
                <input
                  type="text"
                  required
                  value={stationeryForm.name}
                  onChange={(e) => setStationeryForm({ ...stationeryForm, name: e.target.value })}
                  placeholder="e.g. Atlas CR Book 200 Pages (Checked Rule)"
                  style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 12px', fontSize: '13.5px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Category *</label>
                  <select
                    value={stationeryForm.category}
                    onChange={(e) => setStationeryForm({ ...stationeryForm, category: e.target.value })}
                    style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 12px', fontSize: '13.5px' }}
                  >
                    {stationeryCategories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Package / Count Tag</label>
                  <input
                    type="text"
                    value={stationeryForm.count}
                    onChange={(e) => setStationeryForm({ ...stationeryForm, count: e.target.value })}
                    placeholder="e.g. Pack of 10, Box of 50"
                    style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 12px', fontSize: '13.5px' }}
                  />
                </div>
              </div>

              {/* Pricing & Percentage Discount */}
              <div style={{ backgroundColor: '#F9FAFB', padding: '16px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#111827', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Percent size={15} style={{ color: '#1E3A5F' }} />
                  <span>Pricing & Percentage Discount</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Original Price (Rs.) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={stationeryForm.originalPrice}
                      onChange={(e) => setStationeryForm({ ...stationeryForm, originalPrice: Number(e.target.value) })}
                      style={{ width: '100%', height: '38px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 10px', fontSize: '13.5px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Discount % (0 to 100)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={stationeryForm.discountPercent}
                      onChange={(e) => setStationeryForm({ ...stationeryForm, discountPercent: Number(e.target.value) })}
                      style={{ width: '100%', height: '38px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 10px', fontSize: '13.5px' }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '8px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
                  <span style={{ fontSize: '12.5px', color: '#4B5563' }}>Customer Selling Price:</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 800, color: '#15803D' }}>
                      Rs. {Math.round(stationeryForm.originalPrice * (1 - (stationeryForm.discountPercent || 0) / 100)).toLocaleString()}
                    </span>
                    {stationeryForm.discountPercent > 0 && (
                      <span style={{ fontSize: '11px', color: '#1E3A5F', fontWeight: 700 }}>
                        ({stationeryForm.discountPercent}% OFF)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Product Description</label>
                <textarea
                  rows={2}
                  value={stationeryForm.description}
                  onChange={(e) => setStationeryForm({ ...stationeryForm, description: e.target.value })}
                  placeholder="e.g. Smooth 70gsm white paper with laminated cover..."
                  style={{ width: '100%', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '8px 12px', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={stationeryForm.inStock}
                    onChange={(e) => setStationeryForm({ ...stationeryForm, inStock: e.target.checked })}
                    style={{ accentColor: '#121212', width: '16px', height: '16px' }}
                  />
                  Item In Stock
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setStationeryModalOpen(false)}
                  style={{ height: '42px', padding: '0 18px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: '42px', padding: '0 24px', borderRadius: '8px', border: 'none', backgroundColor: '#1E3A5F', color: '#FFFFFF', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                >
                  {editingStationery ? 'Save Changes' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------- */}
      {/* MODAL 5: ADD / EDIT PROMOTIONAL OFFER */}
      {/* --------------------------------------------------------- */}
      {offerModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', width: '100%', maxWidth: '580px', maxHeight: '90vh', overflowY: 'auto', padding: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>
                {editingOffer ? 'Edit Promotional Offer' : 'Create Promotional Offer'}
              </h3>
              <button onClick={() => setOfferModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px' }}>✕</button>
            </div>

            <form onSubmit={handleSaveOffer} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Offer Headline / Title *</label>
                <input
                  type="text"
                  required
                  value={offerForm.title}
                  onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                  placeholder="e.g. Complete Grade 6 Stationery Starter Bundle"
                  style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 12px', fontSize: '13.5px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Category / Type</label>
                  <select
                    value={offerForm.category}
                    onChange={(e) => setOfferForm({ ...offerForm, category: e.target.value })}
                    style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 12px', fontSize: '13.5px' }}
                  >
                    <option value="Discount Bundle">Discount Bundle</option>
                    <option value="New Arrival">New Arrival</option>
                    <option value="Special Deal">Special Deal</option>
                    <option value="Flash Sale">Flash Sale</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Promo Code</label>
                  <input
                    type="text"
                    value={offerForm.promoCode}
                    onChange={(e) => setOfferForm({ ...offerForm, promoCode: e.target.value })}
                    placeholder="e.g. SCHOOL20"
                    style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 12px', fontSize: '13.5px' }}
                  />
                </div>
              </div>

              <div style={{ backgroundColor: '#F9FAFB', padding: '16px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Original Price (Rs.) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={offerForm.originalPrice}
                      onChange={(e) => setOfferForm({ ...offerForm, originalPrice: Number(e.target.value) })}
                      style={{ width: '100%', height: '38px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 10px', fontSize: '13.5px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Discount % (0 to 100)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={offerForm.discountPercent}
                      onChange={(e) => setOfferForm({ ...offerForm, discountPercent: Number(e.target.value) })}
                      style={{ width: '100%', height: '38px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 10px', fontSize: '13.5px' }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '8px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
                  <span style={{ fontSize: '12.5px', color: '#4B5563' }}>Discounted Deal Price:</span>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: '#0F766E' }}>
                    Rs. {Math.round(offerForm.originalPrice * (1 - (offerForm.discountPercent || 0) / 100)).toLocaleString()}
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Badge Label</label>
                  <input
                    type="text"
                    value={offerForm.badge}
                    onChange={(e) => setOfferForm({ ...offerForm, badge: e.target.value })}
                    placeholder="e.g. 20% OFF, LIMITED DEAL"
                    style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 12px', fontSize: '13.5px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Icon Emoji</label>
                  <input
                    type="text"
                    value={offerForm.icon}
                    onChange={(e) => setOfferForm({ ...offerForm, icon: e.target.value })}
                    placeholder="e.g. 🎁, 🎒, ✏️, 📦"
                    style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '0 12px', fontSize: '13.5px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Short Description</label>
                <textarea
                  rows={2}
                  value={offerForm.description}
                  onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                  placeholder="Describe the offer details..."
                  style={{ width: '100%', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '8px 12px', fontSize: '13px' }}
                />
              </div>

              {/* ACTIVE / INACTIVE TOGGLE */}
              <div style={{ backgroundColor: '#F0FDF4', padding: '14px 16px', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#166534' }}>
                      Publish Immediately to Frontend?
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#15803D' }}>
                      {offerForm.isActive ? 'Active → Offer is visible on the homepage right now' : 'Inactive → Hidden from customers'}
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={offerForm.isActive}
                    onChange={(e) => setOfferForm({ ...offerForm, isActive: e.target.checked })}
                    style={{ width: '20px', height: '20px', accentColor: '#0F766E' }}
                  />
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setOfferModalOpen(false)}
                  style={{ height: '42px', padding: '0 18px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: '42px', padding: '0 24px', borderRadius: '8px', border: 'none', backgroundColor: '#0F766E', color: '#FFFFFF', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                >
                  {editingOffer ? 'Save Offer' : 'Publish Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
