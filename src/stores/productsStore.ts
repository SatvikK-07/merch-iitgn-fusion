import { create } from 'zustand';
import { Product } from '@/types/product';
import { products as initialProducts } from '@/data/products';

interface ProductsStore {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

export const useProductsStore = create<ProductsStore>()((set, get) => ({
  products: initialProducts,

  addProduct: (product) => {
    set((state) => ({
      products: [...state.products, product]
    }));
  },

  updateProduct: (id, updates) => {
    set((state) => ({
      products: state.products.map(product =>
        product.id === id ? { ...product, ...updates } : product
      )
    }));
  },

  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter(product => product.id !== id)
    }));
  },

  getProduct: (id) => {
    return get().products.find(product => product.id === id);
  },
}));