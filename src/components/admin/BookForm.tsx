import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X, Upload, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAdminStore } from '../../store/adminStore';

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  grade: z.string().min(1, 'Grade is required'),
  price: z.coerce.number().min(0, 'Price must be non-negative'),
  old: z.coerce.number().optional().nullable(),
  color: z.string().min(1, 'Color class is required (e.g. bg-blue-500)'),
  accent: z.string().min(1, 'Accent text is required'),
  category: z.string().optional(),
  description: z.string().optional(),
  inStock: z.boolean().default(true),
});

type BookFormData = z.infer<typeof bookSchema>;

export const BookForm: React.FC = () => {
  const queryClient = useQueryClient();
  const { isBookFormOpen, editingBook, closeBookForm } = useAdminStore();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookSchema),
    defaultValues: editingBook ? {
      title: editingBook.title,
      grade: editingBook.grade,
      price: editingBook.price,
      old: editingBook.old || null,
      color: editingBook.color,
      accent: editingBook.accent,
      category: editingBook.category || '',
      description: editingBook.description || '',
      inStock: editingBook.inStock !== false,
    } : {
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

  const mutation = useMutation({
    mutationFn: async (data: BookFormData & { image_url?: string }) => {
      let imageUrl = editingBook?.image_url;

      // Handle Image Upload if a new file is selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { error: uploadErr, data: uploadData } = await supabase.storage
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
      setUploadError(error.message);
    }
  });

  if (!isBookFormOpen) return null;

  const onSubmit = (data: any) => {
    setUploadError('');
    mutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
          <button onClick={closeBookForm} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {uploadError && <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">{uploadError}</div>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input {...register('title')} className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              {errors.title && <span className="text-xs text-red-500">{errors.title.message}</span>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
              <input {...register('grade')} className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              {errors.grade && <span className="text-xs text-red-500">{errors.grade.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input type="number" step="0.01" {...register('price')} className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              {errors.price && <span className="text-xs text-red-500">{errors.price.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Old Price (Optional)</label>
              <input type="number" step="0.01" {...register('old')} className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input {...register('category')} className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color Class (for default UI)</label>
              <input {...register('color')} placeholder="e.g. bg-blue-600" className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Accent Text</label>
              <input {...register('accent')} placeholder="e.g. blue" className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea rows={4} {...register('description')} className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter book description..." />
            </div>

            <div className="flex items-center mt-2 md:col-span-2">
              <input type="checkbox" {...register('inStock')} className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-2" />
              <label className="text-sm font-medium text-gray-700">In Stock</label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Book Cover Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
              <Upload className="w-6 h-6 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">{imageFile ? imageFile.name : 'Click or drag image here'}</span>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="absolute w-full h-full opacity-0 cursor-pointer max-w-sm"
              />
            </div>
            {editingBook?.image_url && !imageFile && (
              <p className="text-xs text-gray-500 mt-2">Current image will be kept. Upload a new one to replace it.</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={closeBookForm} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              Cancel
            </button>
            <button type="submit" disabled={mutation.isPending} className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-70">
              {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {editingBook ? 'Update Book' : 'Save Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
