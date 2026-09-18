import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { LogOut, Book, MessageSquare, Trash2, Edit, Plus, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAdminStore } from '../../store/adminStore';
import { BookForm } from '../admin/BookForm';

export const AdminPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'books' | 'enquiries'>('books');
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

  const { data: books, isLoading: booksLoading } = useQuery({
    queryKey: ['adminBooks'],
    queryFn: async () => {
      const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!session && activeTab === 'books',
  });

  const { data: enquiries, isLoading: enquiriesLoading } = useQuery({
    queryKey: ['adminEnquiries'],
    queryFn: async () => {
      const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!session && activeTab === 'enquiries',
  });

  const deleteBookMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from('books').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['adminBooks'] })
  });

  const deleteEnquiryMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('enquiries').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['adminEnquiries'] })
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

  const handleDeleteBook = (id: number) => {
    if (window.confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
      deleteBookMutation.mutate(id);
    }
  };

  const handleDeleteEnquiry = (id: string) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      deleteEnquiryMutation.mutate(id);
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-blue-600" /></div>;
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Admin Login</h2>
            <p className="mt-2 text-center text-sm text-gray-600">Enter your credentials to access the dashboard</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {authError && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">{authError}</div>}
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={authLoading}
                className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-70"
              >
                {authLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <BookForm />
      
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white/90 backdrop-blur-sm border-r border-gray-200 flex flex-col hidden md:flex min-h-screen sticky top-0 rounded-tr-lg rounded-br-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-xs text-gray-500 truncate mt-1">{session.user.email}</p>
        </div>
        <div className="flex-1 py-4 flex flex-col gap-1 px-3">
          <button
            onClick={() => setActiveTab('books')}
            className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'books' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            <Book className="w-5 h-5" /> Books Inventory
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'enquiries' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            <MessageSquare className="w-5 h-5" /> Enquiries
          </button>
        </div>
        <div className="p-4 border-t border-gray-200">
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium w-full px-2 py-2 rounded-md hover:bg-red-50 transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'books' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Books Inventory</h2>
                <button 
                  onClick={() => openBookForm()}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Book
                </button>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Image</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Grade/Cat</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Stock</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {booksLoading ? (
                      <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500"><Loader2 className="w-5 h-5 animate-spin mx-auto" /></td></tr>
                    ) : !books || books.length === 0 ? (
                      <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No books found. Add one!</td></tr>
                    ) : (
                      books.map((book: any) => (
                        <tr key={book.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {book.image_url ? (
                              <img src={book.image_url} alt={book.title} className="w-10 h-14 object-cover rounded shadow-sm" />
                            ) : (
                              <div className={`w-10 h-14 rounded shadow-sm flex items-center justify-center text-[8px] text-white font-bold ${book.color}`}>{book.accent}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{book.title}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{book.grade} {book.category ? `(${book.category})` : ''}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">Rs. {book.price}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${book.inStock !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {book.inStock !== false ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-right font-medium">
                            <button onClick={() => openBookForm(book)} className="text-blue-600 hover:text-blue-900 mr-4" title="Edit">
                              <Edit className="w-4 h-4 inline" />
                            </button>
                            <button disabled={deleteBookMutation.isPending} onClick={() => handleDeleteBook(book.id)} className="text-red-600 hover:text-red-900 disabled:opacity-50" title="Delete">
                              <Trash2 className="w-4 h-4 inline" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'enquiries' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Enquiries</h2>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Service</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Notes</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {enquiriesLoading ? (
                      <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500"><Loader2 className="w-5 h-5 animate-spin mx-auto" /></td></tr>
                    ) : !enquiries || enquiries.length === 0 ? (
                      <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No enquiries found.</td></tr>
                    ) : (
                      enquiries.map((enq: any) => (
                        <tr key={enq.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{new Date(enq.created_at).toLocaleDateString()}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="font-medium">{enq.name}</div>
                            <div className="text-gray-500">{enq.phone}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{enq.serviceType}</td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={enq.notes}>{enq.notes || '-'}</td>
                          <td className="px-6 py-4 text-sm text-right font-medium">
                            <button disabled={deleteEnquiryMutation.isPending} onClick={() => handleDeleteEnquiry(enq.id)} className="text-red-600 hover:text-red-900 disabled:opacity-50" title="Delete">
                              <Trash2 className="w-4 h-4 inline" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
