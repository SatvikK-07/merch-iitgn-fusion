import { useState } from "react";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/stores/cartStore";
import { Link } from "react-router-dom";

interface CartSidebarProps {
  children: React.ReactNode;
}

export const CartSidebar = ({ children }: CartSidebarProps) => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, getTotalItems, getTotalPrice } = useCartStore();

  const subtotal = getTotalPrice();
  const delivery = 0; // Free delivery
  const total = subtotal + delivery;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({getTotalItems()})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-auto py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">Add some amazing IITGN merchandise to get started!</p>
              <Link to="/shop">
                <Button onClick={() => setIsOpen(false)} className="cta-button">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-sm leading-tight line-clamp-2">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.product.club}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Variants */}
                        <div className="flex gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {item.selectedSize}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {item.selectedColor}
                          </Badge>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">₹{item.product.price}</span>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {items.length > 0 && (
          <div className="border-t pt-6">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery</span>
                <span className="text-green-600">Free</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link to="/checkout">
                <Button className="w-full cta-button text-lg py-6" onClick={() => setIsOpen(false)}>
                  Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/shop">
                <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};