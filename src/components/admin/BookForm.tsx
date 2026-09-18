import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X, Upload, Loader2, Image as ImageIcon, Sparkles, Check, BookOpen } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAdminStore } from '../../store/adminStore';

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  grade: z.string().min(1, 'Grade is required'),
  price: z.coerce.number().min(0, 'Price must be non-negative'),
  old: z.coerce.number().optional().nullable(),
  color: z.string().min(1, 'Color class is required (e.g. bg-blue-600)'),
  accent: z.string().min(1, 'Accent text is required'),
  category: z.string().optional(),
  description: z.string().optional(),
  inStock: z.boolean().default(true),
});

type BookFormData = z.infer<typeof bookSchema>;

const COLOR_PRESETS = [
  { name: 'Blue', color: 'bg-blue-600', accent: 'blue' },
  { name: 'Emerald', color: 'bg-emerald-600', accent: 'emerald' },
  { name: 'Amber', color: 'bg-amber-600', accent: 'amber' },
  { name: 'Purple', color: 'bg-purple-600', accent: 'purple' },
  { name: 'Rose', color: 'bg-rose-600', accent: 'rose' },
  { name: 'Indigo', color: 'bg-indigo-600', accent: 'indigo' },
  { name: 'Slate', color: 'bg-slate-700', accent: 'slate' },
];

export const BookForm: React.FC = () => {
  const queryClient = useQueryClient();
  const { isBookFormOpen, editingBook, closeBookForm } = useAdminStore();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      grade: 'Grade 10',
      price: 0,
      old: null,
      color: 'bg-blue-600',
      accent: 'blue',
      category: 'Workbooks',
      description: '',
      inStock: true,
    },
  });

  const currentColor = watch('color');

  useEffect(() => {
    if (editingBook) {
      reset({
        title: editingBook.title,
        grade: editingBook.grade,
        price: editingBook.price,
        old: editingBook.old || null,
        color: editingBook.color || 'bg-blue-600',
        accent: editingBook.accent || 'blue',
        category: editingBook.category || '',
        description: editingBook.description || '',
        inStock: editingBook.inStock !== false,
      });
      setPreviewUrl(editingBook.image_url || null);
    } else {
      reset({
        title: '',
        grade: 'Grade 10',
        price: 0,
        old: null,
        color: 'bg-blue-600',
        accent: 'blue',
        category: 'Workbooks',
        description: '',
        inStock: true,
      });
      setPreviewUrl(null);
    }
    setImageFile(null);
    setUploadError('');
  }, [editingBook, isBookFormOpen, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      let imageUrl = editingBook?.image_url;

      // Handle Image Upload if a new file is selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { error: uploadErr } = await supabase.storage
          .from('book-covers')
          .upload(filePath, imageFile);

        if (uploadErr) {
          throw new Error('Image upload failed: ' + uploadErr.message);
        }

        const { data: publicUrlData } = supabase.storage
          .from('book-covers')
          .getPublicUrl(filePath);
          
        imageUrl = publicUrlData.publicUrl;
      }

      const payload = { ...data, image_url: imageUrl };

      if (editingBook) {
        const { error } = await supabase.from('books').update(payload).eq('id', editingBook.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('books').insert([payload]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBooks'] });
      closeBookForm();
    },
    onError: (error: any) => {
      setUploadError(error.message || 'Failed to save book');
    }
  });

  if (!isBookFormOpen) return null;

  const onSubmit = (data: any) => {
    setUploadError('');
    mutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
      <div className="relative bg-white dark:bg-[#1e2330] rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-100 dark:border-gray-800 my-8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800/80 bg-gradient-to-r from-gray-50/80 to-white dark:from-[#1b202c] dark:to-[#1e2330]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {editingBook ? 'Edit Book Item' : 'Add New Book'}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {editingBook ? `Update details for "${editingBook.title}"` : 'Fill in the book details to add to catalog'}
              </p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={closeBookForm} 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {uploadError && (
            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 rounded-xl text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              {uploadError}
            </div>
          )}

          {/* Section 1: Book Info */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Book Title *</label>
                <input 
                  {...register('title')} 
                  placeholder="e.g. Grade 10 Science Past Papers & Answers"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/60 text-gray-900 dark:text-white text-sm focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all" 
                />
                {errors.title && <span className="text-xs text-rose-500 mt-1 block">{errors.title.message}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Grade / Level *</label>
                <input 
                  {...register('grade')} 
                  placeholder="e.g. Grade 10, O/L, A/L"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/60 text-gray-900 dark:text-white text-sm focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all" 
                />
                {errors.grade && <span className="text-xs text-rose-500 mt-1 block">{errors.grade.message}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Category</label>
                <input 
                  {...register('category')} 
                  placeholder="e.g. Workbooks, Past Papers, Textbooks"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/60 text-gray-900 dark:text-white text-sm focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all" 
                />
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Stock */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Pricing & Inventory</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Selling Price (Rs.) *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">Rs.</span>
                  <input 
                    type="number" 
                    step="1" 
                    {...register('price')} 
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/60 text-gray-900 dark:text-white text-sm font-semibold focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all" 
                  />
                </div>
                {errors.price && <span className="text-xs text-rose-500 mt-1 block">{errors.price.message}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Original Price (Rs.)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">Rs.</span>
                  <input 
                    type="number" 
                    step="1" 
                    {...register('old')} 
                    placeholder="Optional original price"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/60 text-gray-900 dark:text-white text-sm focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all" 
                  />
                </div>
              </div>

              <div className="pt-5 md:pt-0">
                <label className="relative flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40 cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-800/70 transition-colors">
                  <input 
                    type="checkbox" 
                    {...register('inStock')} 
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 focus:ring-offset-0 border-gray-300 dark:border-gray-600" 
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-gray-900 dark:text-white block">In Stock</span>
                    <span className="text-gray-500 dark:text-gray-400 text-[11px]">Available for customer orders</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: Visuals & Color Theme */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Cover Image & Styling</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Image Uploader & Preview */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Book Cover Image</label>
                <div className="relative group border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-amber-500/50 dark:hover:border-amber-500/50 rounded-xl p-4 flex items-center gap-4 bg-gray-50/40 dark:bg-gray-800/30 transition-all cursor-pointer">
                  <div className="w-16 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-sm">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Cover preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-800 dark:text-gray-200">
                      {imageFile ? imageFile.name : previewUrl ? 'Cover image attached' : 'Upload book cover image'}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Click to browse or drag file (PNG, JPG, WebP)</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </div>
              </div>

              {/* Color Preset Palette for Cover Fallback */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Color Badge Theme</label>
                <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/40 dark:bg-gray-800/30">
                  <div className="flex items-center gap-2 flex-wrap mb-2.5">
                    {COLOR_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          setValue('color', preset.color);
                          setValue('accent', preset.accent);
                        }}
                        className={`w-7 h-7 rounded-lg ${preset.color} flex items-center justify-center text-white transition-transform ${currentColor === preset.color ? 'ring-2 ring-offset-2 ring-amber-500 scale-110 shadow-md' : 'opacity-80 hover:opacity-100'}`}
                        title={preset.name}
                      >
                        {currentColor === preset.color && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <input 
                      {...register('color')} 
                      placeholder="e.g. bg-blue-600" 
                      className="px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <input 
                      {...register('accent')} 
                      placeholder="e.g. blue" 
                      className="px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Book Description</label>
              <textarea 
                rows={3} 
                {...register('description')} 
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/60 text-gray-900 dark:text-white text-sm focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all resize-none" 
                placeholder="Include details about the syllabus, past paper years, key highlights..." 
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button 
              type="button" 
              onClick={closeBookForm} 
              className="px-4 py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={mutation.isPending} 
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 shadow-md shadow-amber-600/25 rounded-xl transition-all disabled:opacity-60"
            >
              {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              {editingBook ? 'Update Book' : 'Publish Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
