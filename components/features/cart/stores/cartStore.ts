import { create } from "zustand";
import { persist } from "zustand/middleware";
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

const loadCartFromStorage = (): CartItem[] => {
  try {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("wemovie-cart");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn("Erro ao carregar carrinho do localStorage:", error);
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem("wemovie-cart", JSON.stringify(items));
  } catch (error) {
    console.warn("Erro ao salvar carrinho no localStorage:", error);
  }
};

export const cartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: loadCartFromStorage(),

      addItem: (movie: Movie) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === movie.id);
          let newItems: CartItem[];

          if (existingItem) {
            newItems = state.items.map((item) =>
              item.id === movie.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            newItems = [...state.items, { ...movie, quantity: 1 }];
          }

          saveCartToStorage(newItems);
          return { items: newItems };
        });
      },

      removeItem: (movieId: number) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== movieId);
          saveCartToStorage(newItems);
          return { items: newItems };
        });
      },

      updateQuantity: (movieId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(movieId);
          return;
        }

        set((state) => {
          const newItems = state.items.map((item) =>
            item.id === movieId ? { ...item, quantity } : item
          );
          saveCartToStorage(newItems);
          return { items: newItems };
        });
      },

      clearCart: () => {
        set({ items: [] });
        saveCartToStorage([]);
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
    }),
    {
      name: "wemovie-cart-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
