import { create } from 'zustand';
import { CartItem, Product } from '@/types/product';

interface CartStore {
  items: (CartItem & { product?: Product })[];
  addItem: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  addItem: (productId: string, quantity: number) => {
    set((state) => {
      const existing = state.items.find((item) => item.productId === productId);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return { items: [...state.items, { productId, quantity }] };
    });
  },
  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.productId !== productId),
    }));
  },
  updateQuantity: (productId: string, quantity: number) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    }));
  },
  clearCart: () => set({ items: [] }),
  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + price * item.quantity;
    }, 0);
  },
  getItemCount: () => {
    const { items } = get();
    return items.reduce((count, item) => count + item.quantity, 0);
  },
}));
