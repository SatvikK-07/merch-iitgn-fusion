import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useOrders } from '@/hooks/useOrders';
import { Loader2, Package, Calendar, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

const Orders = () => {
  const { orders, loading } = useOrders();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">Track and manage your orders</p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground text-center">
              When you place orders, they will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      Order #{order.id.slice(-8).toUpperCase()}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {format(new Date(order.created_at), 'PPP')}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <Badge className={getPaymentStatusColor(order.payment_status)}>
                      Payment: {order.payment_status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items */}
                  {order.order_items && order.order_items.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">Items:</h4>
                      {order.order_items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                          <img
                            src={item.product?.image_url || '/placeholder.svg'}
                            alt={item.product?.name || 'Product'}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium">{item.product?.name}</h5>
                            <div className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                              {item.size && ` • Size: ${item.size}`}
                              {item.color && ` • Color: ${item.color}`}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">₹{item.price}</p>
                            <p className="text-sm text-muted-foreground">
                              Total: ₹{item.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Order Summary */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-semibold">Total Amount:</span>
                      </div>
                      <span className="text-lg font-bold">₹{order.total_amount}</span>
                    </div>
                    
                    {order.shipping_address && (
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground">
                          <strong>Shipping Address:</strong> {order.shipping_address}
                        </p>
                      </div>
                    )}
                    
                    {order.payment_method && (
                      <div className="mt-1">
                        <p className="text-sm text-muted-foreground">
                          <strong>Payment Method:</strong> {order.payment_method}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;