import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/product';
import { toast } from 'sonner';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedProducts: Product[] = data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        price: parseFloat(item.price.toString()),
        originalPrice: item.original_price ? parseFloat(item.original_price.toString()) : undefined,
        image: item.image_url || '/placeholder.svg',
        category: item.category,
        type: item.type,
        event: item.event || undefined,
        club: item.club || undefined,
        stock: item.stock,
        rating: parseFloat(item.rating?.toString() || '0'),
        reviews: item.rating_count || 0,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Navy']
      }));

      setProducts(formattedProducts);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: product.name,
          description: product.description,
          price: product.price,
          original_price: product.originalPrice,
          category: product.category,
          type: product.type,
          event: product.event,
          club: product.club,
          image_url: product.image,
          stock: product.stock || 0
        })
        .select()
        .single();

      if (error) throw error;

      await fetchProducts();
      toast.success('Product added successfully!');
      return { data, error: null };
    } catch (error: any) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
      return { data: null, error };
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: updates.name,
          description: updates.description,
          price: updates.price,
          original_price: updates.originalPrice,
          category: updates.category,
          type: updates.type,
          event: updates.event,
          club: updates.club,
          image_url: updates.image,
          stock: updates.stock
        })
        .eq('id', id);

      if (error) throw error;

      await fetchProducts();
      toast.success('Product updated successfully!');
      return { error: null };
    } catch (error: any) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
      return { error };
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      await fetchProducts();
      toast.success('Product deleted successfully!');
      return { error: null };
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
      return { error };
    }
  };

  const getProduct = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
  };

  useEffect(() => {
    fetchProducts();

    // Set up real-time subscription
    const subscription = supabase
      .channel('products')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, 
        () => {
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    refetch: fetchProducts
  };
};