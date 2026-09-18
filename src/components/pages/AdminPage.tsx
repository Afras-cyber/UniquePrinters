import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  LogOut, 
  BookOpen, 
  MessageSquare, 
  Trash2, 
  Edit3, 
  Plus, 
  Loader2, 
  Search, 
  Filter, 
  ArrowLeft, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  Grid, 
  List, 
  Phone, 
  MessageCircle, 
  ShoppingBag, 
  TrendingUp, 
  Menu, 
  X, 
  RefreshCw, 
  ShieldCheck, 
  AlertCircle,
  PackageCheck,
  CheckCircle2
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAdminStore } from '../../store/adminStore';
import { BookForm } from '../admin/BookForm';
import { BookItem } from '../../types';

export const AdminPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Admin Dashboard State
  const [activeTab, setActiveTab] = useState<'books' | 'enquiries'>('books');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookViewMode, setBookViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'outOfStock'>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<{ id: string | number; type: 'book' | 'enquiry' } | null>(null);

  const { openBookForm } = useAdminStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch Books
  const { 
    data: books, 
    isLoading: booksLoading, 
    isFetching: booksFetching, 
    refetch: refetchBooks 
  } = useQuery({
    queryKey: ['adminBooks'],
    queryFn: async () => {
      const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as BookItem[];
    },
    enabled: !!session,
  });

  // Fetch Enquiries
  const { 
    data: enquiries, 
    isLoading: enquiriesLoading, 
    isFetching: enquiriesFetching, 
    refetch: refetchEnquiries 
  } = useQuery({
    queryKey: ['adminEnquiries'],
    queryFn: async () => {
      const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!session,
  });

  // Delete Mutations
  const deleteBookMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from('books').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBooks'] });
      setDeleteConfirmId(null);
    }
  });

  const deleteEnquiryMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('enquiries').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminEnquiries'] });
      setDeleteConfirmId(null);
    }
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Navigating back to store
  const handleReturnToStore = () => {
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // KPI Calculations
  const stats = useMemo(() => {
    const totalBooks = books?.length || 0;
    const inStockBooks = books?.filter(b => b.inStock !== false).length || 0;
    const outOfStockBooks = totalBooks - inStockBooks;
    const catalogValue = books?.reduce((acc, b) => acc + (Number(b.price) || 0), 0) || 0;
    const totalEnquiries = enquiries?.length || 0;
    return {
      totalBooks,
      inStockBooks,
      outOfStockBooks,
      catalogValue,
      totalEnquiries
    };
  }, [books, enquiries]);

  // Unique Grades for filtering
  const availableGrades = useMemo(() => {
    if (!books) return [];
    const set = new Set<string>();
    books.forEach(b => {
      if (b.grade) set.add(b.grade.trim());
    });
    return Array.from(set);
  }, [books]);

  // Filtered Books
  const filteredBooks = useMemo(() => {
    if (!books) return [];
    return books.filter(book => {
      const matchesSearch = 
        book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.grade?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStock = 
        stockFilter === 'all' ? true :
        stockFilter === 'inStock' ? book.inStock !== false :
        book.inStock === false;

      const matchesGrade = 
        selectedGrade === 'all' ? true :
        book.grade?.trim().toLowerCase() === selectedGrade.toLowerCase();

      return matchesSearch && matchesStock && matchesGrade;
    });
  }, [books, searchQuery, stockFilter, selectedGrade]);

  // Filtered Enquiries
  const filteredEnquiries = useMemo(() => {
    if (!enquiries) return [];
    return enquiries.filter((enq: any) => {
      const q = searchQuery.toLowerCase();
      return (
        enq.name?.toLowerCase().includes(q) ||
        enq.phone?.toLowerCase().includes(q) ||
        enq.serviceType?.toLowerCase().includes(q) ||
        enq.notes?.toLowerCase().includes(q)
      );
    });
  }, [enquiries, searchQuery]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d1117] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center animate-pulse">
              <BookOpen className="w-8 h-8 text-amber-400" />
            </div>
            <Loader2 className="w-6 h-6 animate-spin text-amber-500 absolute -top-1 -right-1" />
          </div>
          <p className="text-sm font-medium text-gray-400 tracking-wide">Loading Unique Printers Console...</p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 1. ADMIN LOGIN VIEW
  // ─────────────────────────────────────────────────────────────
  if (!session) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-[#0b0f19] text-gray-100 p-4 overflow-hidden selection:bg-amber-500/30 selection:text-amber-200">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-amber-600/15 via-orange-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Back to store navigation */}
        <button
          onClick={handleReturnToStore}
          className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold backdrop-blur-md transition-all group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-400" />
          <span>Back to Store</span>
        </button>

        <div className="relative w-full max-w-md">
          {/* Card Container */}
          <div className="relative rounded-3xl bg-[#141b2d]/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] p-8 sm:p-10">
            {/* Header / Brand Mark */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-lg shadow-amber-500/25 mb-4 border border-amber-400/30">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="inline-block px-3 py-1 mb-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-semibold tracking-wider uppercase">
                Staff Administration
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Unique Printers
              </h1>
              <p className="text-xs text-gray-400 mt-1.5">
                Sign in to manage books inventory, customer orders & requests
              </p>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-rose-200">Authentication Failed</p>
                  <p className="mt-0.5 text-rose-300/90">{authError}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Admin Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@uniqueprinters.lk"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-gray-300">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-11 py-3 rounded-xl bg-black/30 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors p-1"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-white font-bold text-sm shadow-lg shadow-amber-600/30 hover:shadow-amber-600/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {authLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in securely...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authenticate & Access Dashboard</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer notice */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protected Enterprise Access • Avissawella, Sri Lanka</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 2. AUTHENTICATED ADMIN DASHBOARD VIEW
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0c101c] text-gray-900 dark:text-gray-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-700">
      <BookForm />

      {/* Confirmation Modal for Delete */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#192033] rounded-2xl p-6 max-w-sm w-full border border-gray-100 dark:border-gray-800 shadow-2xl animate-fade-in">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Confirm Permanent Delete
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Are you sure you want to remove this {deleteConfirmId.type}? This action cannot be reversed.
            </p>
            <div className="flex items-center justify-end gap-2 mt-6">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteConfirmId.type === 'book') {
                    deleteBookMutation.mutate(deleteConfirmId.id as number);
                  } else {
                    deleteEnquiryMutation.mutate(deleteConfirmId.id as string);
                  }
                }}
                disabled={deleteBookMutation.isPending || deleteEnquiryMutation.isPending}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1.5 shadow-md shadow-rose-600/20"
              >
                {(deleteBookMutation.isPending || deleteEnquiryMutation.isPending) && (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                )}
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#121829]/95 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white font-bold shadow-sm shadow-amber-600/30">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm sm:text-base tracking-tight text-gray-900 dark:text-white block leading-tight">
                  Unique Printers
                </span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold tracking-wider uppercase">
                  Admin Dashboard
                </span>
              </div>
            </div>
          </div>

          {/* Center Connection Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Database Live & Synced</span>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleReturnToStore}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Return to Public Website"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">View Store</span>
            </button>

            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate max-w-[150px]">
                {session?.user?.email?.split('@')[0]}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
                {session?.user?.email}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/60 text-xs font-semibold hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors"
              title="Log out of admin panel"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-6 p-4 sm:p-6 lg:p-8">
        {/* Sidebar Navigation */}
        <aside className={`w-full md:w-64 flex flex-col gap-4 flex-shrink-0 ${mobileMenuOpen ? 'block' : 'hidden md:flex'}`}>
          <div className="bg-white dark:bg-[#121829] rounded-2xl p-4 border border-gray-200/80 dark:border-gray-800/80 shadow-sm flex flex-col gap-2">
            <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Management
            </div>

            <button
              onClick={() => {
                setActiveTab('books');
                setSearchQuery('');
                setMobileMenuOpen(false);
              }}
              style={{ padding: '10px 14px' }}
              className={`flex items-center justify-between rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'books'
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25 font-bold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4" />
                <span>Books Catalog</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'books' ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}>
                {stats.totalBooks}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('enquiries');
                setSearchQuery('');
                setMobileMenuOpen(false);
              }}
              style={{ padding: '10px 14px' }}
              className={`flex items-center justify-between rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'enquiries'
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25 font-bold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4" />
                <span>Customer Enquiries</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'enquiries' ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}>
                {stats.totalEnquiries}
              </span>
            </button>
          </div>

          {/* Quick Help Card */}
          <div className="mt-auto hidden md:block bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent rounded-2xl p-5 border border-amber-500/20 text-xs">
            <h4 className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5 mb-1.5">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Unique Printers</span>
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-[11px] leading-relaxed">
              Manage school workbooks, past papers, and review incoming customer print & design inquiries.
            </p>
          </div>
        </aside>

        {/* Main Content View */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* Top KPI Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {/* Card 1: Books */}
            <div className="bg-white dark:bg-[#121829] rounded-2xl p-4 sm:p-5 border border-gray-200/80 dark:border-gray-800/80 shadow-sm relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Books</span>
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2.5 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                  {stats.totalBooks}
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  {stats.inStockBooks} in stock
                </span>
              </div>
            </div>

            {/* Card 2: Catalog Value */}
            <div className="bg-white dark:bg-[#121829] rounded-2xl p-4 sm:p-5 border border-gray-200/80 dark:border-gray-800/80 shadow-sm relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Inventory Value</span>
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2.5">
                <span className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                  Rs. {stats.catalogValue.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Card 3: Out of stock */}
            <div className="bg-white dark:bg-[#121829] rounded-2xl p-4 sm:p-5 border border-gray-200/80 dark:border-gray-800/80 shadow-sm relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Out of Stock</span>
                <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <PackageCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2.5 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                  {stats.outOfStockBooks}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  {stats.outOfStockBooks === 0 ? 'All stocked' : 'Need restock'}
                </span>
              </div>
            </div>

            {/* Card 4: Enquiries */}
            <div className="bg-white dark:bg-[#121829] rounded-2xl p-4 sm:p-5 border border-gray-200/80 dark:border-gray-800/80 shadow-sm relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Enquiries</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2.5 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                  {stats.totalEnquiries}
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  Leads logged
                </span>
              </div>
            </div>
          </div>

          {/* ── TAB 1: BOOKS INVENTORY ── */}
          {activeTab === 'books' && (
            <div className="space-y-4">
              {/* Controls Bar */}
              <div className="bg-white dark:bg-[#121829] rounded-2xl p-4 sm:p-5 border border-gray-200/80 dark:border-gray-800/80 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search books by title, grade, or category..."
                    style={{ paddingLeft: '2.5rem', paddingRight: '2rem', paddingTop: '0.6rem', paddingBottom: '0.6rem' }}
                    className="w-full text-xs rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filters and Actions */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  {/* Stock Filter Pills */}
                  <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 text-xs">
                    <button
                      onClick={() => setStockFilter('all')}
                      style={{ padding: '6px 12px' }}
                      className={`rounded-lg font-medium transition-all ${
                        stockFilter === 'all'
                          ? 'bg-white dark:bg-[#121829] text-gray-900 dark:text-white shadow-sm font-semibold'
                          : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setStockFilter('inStock')}
                      style={{ padding: '6px 12px' }}
                      className={`rounded-lg font-medium transition-all ${
                        stockFilter === 'inStock'
                          ? 'bg-white dark:bg-[#121829] text-emerald-600 shadow-sm font-semibold'
                          : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                      }`}
                    >
                      In Stock
                    </button>
                    <button
                      onClick={() => setStockFilter('outOfStock')}
                      style={{ padding: '6px 12px' }}
                      className={`rounded-lg font-medium transition-all ${
                        stockFilter === 'outOfStock'
                          ? 'bg-white dark:bg-[#121829] text-rose-600 shadow-sm font-semibold'
                          : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                      }`}
                    >
                      Out
                    </button>
                  </div>

                  {/* Grade dropdown */}
                  {availableGrades.length > 0 && (
                    <select
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(e.target.value)}
                      className="px-2.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none"
                    >
                      <option value="all">All Grades</option>
                      {availableGrades.map((grade) => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  )}

                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1 text-xs">
                    <button
                      onClick={() => setBookViewMode('table')}
                      className={`p-1.5 rounded-lg transition-colors ${
                        bookViewMode === 'table'
                          ? 'bg-white dark:bg-[#121829] text-amber-600 shadow-sm'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                      title="Table View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setBookViewMode('grid')}
                      className={`p-1.5 rounded-lg transition-colors ${
                        bookViewMode === 'grid'
                          ? 'bg-white dark:bg-[#121829] text-amber-600 shadow-sm'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                      title="Visual Grid View"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Refresh */}
                  <button
                    onClick={() => refetchBooks()}
                    disabled={booksFetching}
                    className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
                    title="Refresh list"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${booksFetching ? 'animate-spin text-amber-500' : ''}`} />
                  </button>

                  {/* Add Book CTA */}
                  <button
                    onClick={() => openBookForm()}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-sm shadow-amber-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Book</span>
                  </button>
                </div>
              </div>

              {/* Books Content */}
              {booksLoading ? (
                <div className="bg-white dark:bg-[#121829] rounded-2xl p-12 text-center border border-gray-200/80 dark:border-gray-800/80">
                  <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto mb-3" />
                  <p className="text-xs text-gray-500">Loading catalog books...</p>
                </div>
              ) : filteredBooks.length === 0 ? (
                <div className="bg-white dark:bg-[#121829] rounded-2xl p-12 text-center border border-gray-200/80 dark:border-gray-800/80">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 mx-auto flex items-center justify-center mb-3">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">No books found</h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                    {searchQuery || stockFilter !== 'all' || selectedGrade !== 'all'
                      ? 'No books match your active filter criteria. Try resetting filters.'
                      : 'Your store catalog has no books yet. Click "Add Book" above to list your first book.'}
                  </p>
                  {(searchQuery || stockFilter !== 'all' || selectedGrade !== 'all') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setStockFilter('all');
                        setSelectedGrade('all');
                      }}
                      className="mt-4 px-3 py-1.5 text-xs font-semibold text-amber-600 hover:underline"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              ) : bookViewMode === 'table' ? (
                /* ── Table View ── */
                <div className="bg-white dark:bg-[#121829] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-left text-xs">
                      <thead className="bg-gray-50/70 dark:bg-[#161e33] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                        <tr>
                          <th style={{ padding: '14px 20px' }} className="w-16">Cover</th>
                          <th style={{ padding: '14px 20px' }}>Book Title</th>
                          <th style={{ padding: '14px 20px' }}>Grade / Cat</th>
                          <th style={{ padding: '14px 20px' }}>Price</th>
                          <th style={{ padding: '14px 20px' }}>Availability</th>
                          <th style={{ padding: '14px 20px' }} className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 font-medium">
                        {filteredBooks.map((book) => (
                          <tr key={book.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition-colors">
                            {/* Cover */}
                            <td style={{ padding: '14px 20px' }} className="whitespace-nowrap">
                              {book.image_url ? (
                                <img
                                  src={book.image_url}
                                  alt={book.title}
                                  style={{ width: '44px', height: '62px', minWidth: '44px' }}
                                  className="object-cover rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                                />
                              ) : (
                                <div className={`w-11 h-16 rounded-lg shadow-sm flex items-center justify-center text-[9px] text-white font-bold p-1 text-center leading-tight ${book.color || 'bg-amber-600'}`}>
                                  {book.accent || 'Book'}
                                </div>
                              )}
                            </td>

                            {/* Title & Desc */}
                            <td style={{ padding: '14px 20px' }} className="max-w-xs">
                              <span className="font-bold text-gray-900 dark:text-white block leading-snug">
                                {book.title}
                              </span>
                              {book.description && (
                                <span className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 mt-1 block">
                                  {book.description}
                                </span>
                              )}
                            </td>

                            {/* Grade / Cat */}
                            <td style={{ padding: '14px 20px' }} className="whitespace-nowrap">
                              <span className="inline-block px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-[11px]">
                                {book.grade}
                              </span>
                              {book.category && (
                                <span className="block text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                                  {book.category}
                                </span>
                              )}
                            </td>

                            {/* Price */}
                            <td style={{ padding: '14px 20px' }} className="whitespace-nowrap">
                              <span className="font-bold text-gray-900 dark:text-white text-sm">
                                Rs. {book.price}
                              </span>
                              {book.old && (
                                <span className="block text-[11px] text-gray-400 line-through mt-0.5">
                                  Rs. {book.old}
                                </span>
                              )}
                            </td>

                            {/* Stock Status */}
                            <td style={{ padding: '14px 20px' }} className="whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                                book.inStock !== false
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                  : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${book.inStock !== false ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                {book.inStock !== false ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </td>

                            {/* Actions */}
                            <td style={{ padding: '14px 20px' }} className="whitespace-nowrap text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => openBookForm(book)}
                                  className="p-2 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors"
                                  title="Edit Book"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId({ id: book.id, type: 'book' })}
                                  className="p-2 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                                  title="Delete Book"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#161e33] text-[11px] text-gray-500 flex items-center justify-between">
                    <span>Showing {filteredBooks.length} of {stats.totalBooks} books</span>
                    <span>Unique Printers Sri Lanka</span>
                  </div>
                </div>
              ) : (
                /* ── Grid View ── */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBooks.map((book) => (
                    <div
                      key={book.id}
                      className="bg-white dark:bg-[#121829] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm overflow-hidden flex flex-col hover:border-amber-500/40 transition-all group"
                    >
                      <div className="p-4 flex gap-4">
                        {book.image_url ? (
                          <img
                            src={book.image_url}
                            alt={book.title}
                            style={{ width: '80px', height: '112px', minWidth: '80px' }}
                            className="w-20 h-28 object-cover rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex-shrink-0"
                          />
                        ) : (
                          <div className={`w-20 h-28 rounded-xl shadow-sm flex items-center justify-center text-xs text-white font-bold p-2 text-center flex-shrink-0 ${book.color || 'bg-amber-600'}`}>
                            {book.accent || 'Book Cover'}
                          </div>
                        )}

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-[10px]">
                                {book.grade}
                              </span>
                              {book.category && (
                                <span className="text-[10px] text-gray-400 truncate">
                                  {book.category}
                                </span>
                              )}
                            </div>
                            <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white leading-snug line-clamp-2">
                              {book.title}
                            </h4>
                          </div>

                          <div className="mt-2">
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-extrabold text-sm text-gray-900 dark:text-white">
                                Rs. {book.price}
                              </span>
                              {book.old && (
                                <span className="text-[10px] text-gray-400 line-through">
                                  Rs. {book.old}
                                </span>
                              )}
                            </div>

                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold mt-1 ${
                              book.inStock !== false
                                ? 'bg-emerald-500/10 text-emerald-600'
                                : 'bg-rose-500/10 text-rose-600'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${book.inStock !== false ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                              {book.inStock !== false ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="px-4 py-2.5 bg-gray-50/70 dark:bg-gray-800/40 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-end gap-2 mt-auto">
                        <button
                          onClick={() => openBookForm(book)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-amber-600 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId({ id: book.id, type: 'book' })}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── TAB 2: CUSTOMER ENQUIRIES ── */}
          {activeTab === 'enquiries' && (
            <div className="space-y-4">
              {/* Enquiries Top Bar */}
              <div className="bg-white dark:bg-[#121829] rounded-2xl p-4 border border-gray-200/80 dark:border-gray-800/80 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search enquiries by customer name, phone, or service..."
                    className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => refetchEnquiries()}
                    disabled={enquiriesFetching}
                    className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
                    title="Refresh enquiries"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${enquiriesFetching ? 'animate-spin text-amber-500' : ''}`} />
                  </button>
                  <span className="text-xs font-semibold text-gray-500">
                    {filteredEnquiries.length} enquiry record(s)
                  </span>
                </div>
              </div>

              {/* Enquiries List */}
              {enquiriesLoading ? (
                <div className="bg-white dark:bg-[#121829] rounded-2xl p-12 text-center border border-gray-200/80 dark:border-gray-800/80">
                  <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto mb-3" />
                  <p className="text-xs text-gray-500">Loading customer enquiries...</p>
                </div>
              ) : filteredEnquiries.length === 0 ? (
                <div className="bg-white dark:bg-[#121829] rounded-2xl p-12 text-center border border-gray-200/80 dark:border-gray-800/80">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 mx-auto flex items-center justify-center mb-3">
                    <MessageSquare className="w-7 h-7" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">No customer enquiries found</h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                    {searchQuery
                      ? 'No enquiries match your search query.'
                      : 'Customer enquiries submitted via the website service forms will automatically appear here.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredEnquiries.map((enq: any) => {
                    // Clean phone number for WhatsApp link
                    const cleanPhone = enq.phone?.replace(/[^0-9]/g, '') || '';
                    const formattedPhone = cleanPhone.startsWith('0')
                      ? '94' + cleanPhone.substring(1)
                      : cleanPhone;

                    const whatsappMessage = encodeURIComponent(
                      `Hello ${enq.name}, thank you for contacting Unique Printers regarding "${enq.serviceType}". How may we assist you today?`
                    );
                    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${whatsappMessage}`;

                    return (
                      <div
                        key={enq.id}
                        className="bg-white dark:bg-[#121829] rounded-2xl p-4 sm:p-5 border border-gray-200/80 dark:border-gray-800/80 shadow-sm hover:border-amber-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        {/* Customer Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="font-bold text-sm text-gray-900 dark:text-white">
                              {enq.name}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 text-[10px] font-bold">
                              {enq.serviceType}
                            </span>
                            <span className="text-[11px] text-gray-400">
                              {new Date(enq.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>

                          <div className="mt-2 text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/40 rounded-xl p-3 border border-gray-100 dark:border-gray-800/60">
                            <span className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                              Customer Notes / Specifications:
                            </span>
                            <p className="whitespace-pre-line text-gray-600 dark:text-gray-400">
                              {enq.notes || 'No specific notes provided.'}
                            </p>
                          </div>
                        </div>

                        {/* Quick Contact & Delete Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-center">
                          {/* WhatsApp Chat Button */}
                          {cleanPhone && (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 transition-all hover:scale-[1.02]"
                              title="Chat with customer on WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span>WhatsApp</span>
                            </a>
                          )}

                          {/* Direct Call Button */}
                          {enq.phone && (
                            <a
                              href={`tel:${enq.phone}`}
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold transition-colors"
                              title="Call customer"
                            >
                              <Phone className="w-3.5 h-3.5 text-gray-500" />
                              <span className="hidden sm:inline">{enq.phone}</span>
                            </a>
                          )}

                          {/* Delete Button */}
                          <button
                            onClick={() => setDeleteConfirmId({ id: enq.id, type: 'enquiry' })}
                            className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                            title="Delete Enquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

