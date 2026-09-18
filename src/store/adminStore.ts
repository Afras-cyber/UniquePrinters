import { create } from 'zustand';
import { BookItem } from '../types';

interface AdminState {
  isBookFormOpen: boolean;
  editingBook: BookItem | null;
  openBookForm: (book?: BookItem) => void;
  closeBookForm: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  isBookFormOpen: false,
  editingBook: null,
  openBookForm: (book) => set({ isBookFormOpen: true, editingBook: book || null }),
  closeBookForm: () => set({ isBookFormOpen: false, editingBook: null }),
}));
