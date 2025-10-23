import { create } from "zustand";
import type { Movie, CartItem } from "@/types/movie";

interface CartState {
  items: CartItem[];
  addItem: (movie: Movie) => void;
  removeItem: (movieId: number) => void;
  updateQuantity: (movieId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const cartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (movie: Movie) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === movie.id);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === movie.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { ...movie, quantity: 1 }],
      };
    });
  },

  removeItem: (movieId: number) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== movieId),
    }));
  },

  updateQuantity: (movieId: number, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(movieId);
      return;
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.id === movieId ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
}));
