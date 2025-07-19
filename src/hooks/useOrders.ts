import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  payment_status: string;
  payment_method?: string;
  stripe_session_id?: string;
  shipping_address?: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
  product?: {
    name: string;
    image_url: string;
  };
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, userRole } = useAuth();

  const fetchOrders = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      let query = supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products!inner (
              name,
              image_url
            )
          )
        `)
        .order('created_at', { ascending: false });

      // If not admin, only show user's orders
      if (userRole !== 'admin') {
        query = query.eq('user_id', user.id);
      }

      const { data, error } = await query;

      if (error) throw error;

      setOrders(data || []);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (
    items: { product_id: string; quantity: number; price: number; size?: string; color?: string }[],
    shippingAddress?: string
  ) => {
    if (!user) {
      toast.error('Please log in to place an order');
      return { data: null, error: new Error('Not authenticated') };
    }

    try {
      const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: totalAmount,
          status: 'pending',
          payment_status: 'pending',
          shipping_address: shippingAddress
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        color: item.color
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      await fetchOrders();
      toast.success('Order created successfully!');
      return { data: order, error: null };
    } catch (error: any) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order');
      return { data: null, error };
    }
  };

  const updateOrderStatus = async (orderId: string, status: string, paymentStatus?: string) => {
    try {
      const updates: any = { status };
      if (paymentStatus) {
        updates.payment_status = paymentStatus;
      }

      const { error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', orderId);

      if (error) throw error;

      await fetchOrders();
      toast.success('Order status updated successfully!');
      return { error: null };
    } catch (error: any) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
      return { error };
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();

      // Set up real-time subscription
      const subscription = supabase
        .channel('orders')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, 
          () => {
            fetchOrders();
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user, userRole]);

  return {
    orders,
    loading,
    createOrder,
    updateOrderStatus,
    refetch: fetchOrders
  };
};