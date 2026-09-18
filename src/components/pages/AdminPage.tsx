import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { LogOut, Book, MessageSquare, Trash2, Edit, Plus, Loader2 } from 'lucide-react';
import { BookItem } from '../../types';

export const AdminPage: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'books' | 'enquiries'>('books');
  const [books, setBooks] = useState<BookItem[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

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

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session, activeTab]);

  const fetchData = async () => {
    setDataLoading(true);
    if (activeTab === 'books') {
      const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false });
      if (data) setBooks(data);
    } else {
      const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
      if (data) setEnquiries(data);
    }
    setDataLoading(false);
  };

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

  const handleDeleteBook = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await supabase.from('books').delete().eq('id', id);
      fetchData();
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      await supabase.from('enquiries').delete().eq('id', id);
      fetchData();
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-blue-600" /></div>;
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
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
                  className="relative block w-full rounded-t-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="relative block w-full rounded-b-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={authLoading}
                className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-70"
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
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex min-h-screen sticky top-0">
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
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" /> Add Book
                </button>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Grade/Cat</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dataLoading ? (
                      <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
                    ) : books.length === 0 ? (
                      <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No books found. Add one!</td></tr>
                    ) : (
                      books.map(book => (
                        <tr key={book.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{book.title}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{book.grade} {book.category ? `(${book.category})` : ''}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">Rs. {book.price}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${book.inStock !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {book.inStock !== false ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-right font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-4" title="Edit"><Edit className="w-4 h-4 inline" /></button>
                            <button onClick={() => handleDeleteBook(book.id)} className="text-red-600 hover:text-red-900" title="Delete"><Trash2 className="w-4 h-4 inline" /></button>
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
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dataLoading ? (
                      <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
                    ) : enquiries.length === 0 ? (
                      <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No enquiries found.</td></tr>
                    ) : (
                      enquiries.map(enq => (
                        <tr key={enq.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{new Date(enq.created_at).toLocaleDateString()}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="font-medium">{enq.name}</div>
                            <div className="text-gray-500">{enq.phone}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{enq.serviceType}</td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={enq.notes}>{enq.notes || '-'}</td>
                          <td className="px-6 py-4 text-sm text-right font-medium">
                            <button onClick={() => handleDeleteEnquiry(enq.id)} className="text-red-600 hover:text-red-900" title="Delete"><Trash2 className="w-4 h-4 inline" /></button>
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
