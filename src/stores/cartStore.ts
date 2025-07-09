import { create } from 'zustand';
import { CartItem, Product } from '@/types/product';
import { toast } from '@/hooks/use-toast';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  setIsOpen: (open: boolean) => void;
}

export const useCartStore = create<CartStore>()((set, get) => ({
  items: [],
  isOpen: false,
      
      addItem: (product, size, color, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(
          item => 
            item.product.id === product.id && 
            item.selectedSize === size && 
            item.selectedColor === color
        );

        if (existingItem) {
          set({
            items: items.map(item =>
              item.product.id === product.id && 
              item.selectedSize === size && 
              item.selectedColor === color
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({
            items: [...items, { product, selectedSize: size, selectedColor: color, quantity }]
          });
        }

        toast({
          title: "Added to cart",
          description: `${product.name} (${size}, ${color}) added to your cart.`,
        });
      },

      removeItem: (productId, size, color) => {
        const { items } = get();
        set({
          items: items.filter(
            item => !(
              item.product.id === productId && 
              item.selectedSize === size && 
              item.selectedColor === color
            )
          )
        });

        toast({
          title: "Removed from cart",
          description: "Item removed from your cart.",
        });
      },

      updateQuantity: (productId, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, color);
          return;
        }

        const { items } = get();
        set({
          items: items.map(item =>
            item.product.id === productId && 
            item.selectedSize === size && 
            item.selectedColor === color
              ? { ...item, quantity }
              : item
          )
        });
      },

      clearCart: () => {
        set({ items: [] });
        toast({
          title: "Cart cleared",
          description: "All items removed from your cart.",
        });
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },

      setIsOpen: (open) => set({ isOpen: open }),
    })
  );