import { useState } from "react";
import { ShoppingCart, Heart, Star, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { useCartStore } from "@/stores/cartStore";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case "Bestseller": return "bg-iitgn-orange text-white";
    case "Limited Edition": return "bg-purple-500 text-white";
    case "Premium": return "bg-yellow-500 text-black";
    case "Winter Special": return "bg-blue-500 text-white";
    case "Tech Fest": return "bg-cyan-500 text-white";
    case "Sports": return "bg-green-500 text-white";
    case "Official": return "bg-iitgn-blue text-white";
    default: return "bg-muted text-muted-foreground";
  }
};

export const ProductCard = ({ product, viewMode = "grid" }: ProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, selectedSize, selectedColor);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, selectedSize, selectedColor);
  };

  if (viewMode === "list") {
    return (
      <Link to={`/product/${product.id}`}>
        <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              {/* Image */}
              <div className="relative w-full sm:w-48 h-48 bg-muted overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.badge && (
                    <Badge className={getBadgeColor(product.badge)}>
                      {product.badge}
                    </Badge>
                  )}
                  {product.isNew && (
                    <Badge variant="secondary" className="bg-green-500 text-white">
                      New
                    </Badge>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-primary font-medium">{product.club}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{product.category}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{product.name}</h3>
                  </div>
                  
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                  
                  <Button onClick={handleAddToCart} className="cta-button">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/product/${product.id}`}>
      <Card 
        className="group bg-card border-0 shadow-md hover:shadow-xl transition-all duration-500 product-card-hover overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="relative h-64 overflow-hidden bg-muted">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.badge && (
                <Badge className={getBadgeColor(product.badge)}>
                  {product.badge}
                </Badge>
              )}
              {product.isNew && (
                <Badge variant="secondary" className="bg-green-500 text-white">
                  New
                </Badge>
              )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white">
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Add Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="space-y-2">
                {/* Size Selector */}
                {product.sizes.length > 1 && (
                  <div className="flex gap-1 justify-center">
                    {product.sizes.slice(0, 4).map((size) => (
                      <button
                        key={size}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedSize(size);
                        }}
                        className={`px-2 py-1 text-xs rounded ${
                          selectedSize === size 
                            ? 'bg-white text-black' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
                
                <Button onClick={handleQuickAdd} className="w-full cta-button" size="sm">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Quick Add
                </Button>
              </div>
            </div>

            {/* Stock Status */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive" className="text-lg px-4 py-2">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6">
            {/* Club & Category */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-primary font-medium">{product.club}</span>
              <span className="text-xs text-muted-foreground">{product.category}</span>
            </div>

            {/* Product Name */}
            <h3 className="font-heading font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-foreground">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <Badge variant="destructive" className="text-xs">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                </Badge>
              )}
            </div>

            {/* Available Sizes */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sizes:</span>
              <div className="flex gap-1">
                {product.sizes.slice(0, 4).map((size) => (
                  <span key={size} className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground">
                    {size}
                  </span>
                ))}
                {product.sizes.length > 4 && (
                  <span className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground">
                    +{product.sizes.length - 4}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};