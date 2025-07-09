import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Share2, ShoppingCart, Star, Truck, Shield, RotateCcw, Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";

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

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Initialize selections if not set
  if (!selectedSize && product.sizes.length > 0) {
    setSelectedSize(product.sizes[0]);
  }
  if (!selectedColor && product.colors.length > 0) {
    setSelectedColor(product.colors[0]);
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      return;
    }
    addItem(product, selectedSize, selectedColor, quantity);
  };

  const images = product.images || [product.image];
  const relatedProducts = products.filter(p => 
    p.id !== product.id && 
    (p.club === product.club || p.category === product.category)
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          <span className="text-muted-foreground">/</span>
          <Link to="/shop" className="text-muted-foreground hover:text-foreground">Shop</Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link to="/shop">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>
        </Link>

        {/* Product Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img 
                src={images[selectedImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 bg-muted rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary font-medium">{product.club}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{product.category}</span>
              </div>
              
              <h1 className="text-4xl font-heading font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
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
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
                  <Badge variant="destructive">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                  </Badge>
                </>
              )}
            </div>

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Size</h3>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      className="min-w-12"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Color</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stock} items in stock
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button 
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor || !product.inStock}
                className="flex-1 cta-button text-lg py-6"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <Button variant="outline" size="icon" className="py-6 px-4">
                <Heart className="h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="icon" className="py-6 px-4">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Truck className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Free Delivery</span>
                    <span className="text-xs text-muted-foreground">On campus orders</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <RotateCcw className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Easy Returns</span>
                    <span className="text-xs text-muted-foreground">7 day return</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Quality Assured</span>
                    <span className="text-xs text-muted-foreground">Premium materials</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  {product.features && (
                    <div>
                      <h3 className="font-semibold mb-2">Features</h3>
                      <ul className="space-y-1">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {product.material && (
                    <div>
                      <h3 className="font-semibold mb-2">Material</h3>
                      <p>{product.material}</p>
                    </div>
                  )}
                  
                  {product.care && (
                    <div>
                      <h3 className="font-semibold mb-2">Care Instructions</h3>
                      <ul className="space-y-1">
                        {product.care.map((instruction, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-blue-500" />
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Reviews feature coming soon!</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Current rating: {product.rating}/5 from {product.reviews} reviews
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Delivery Options</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>On-campus pickup (Free) - 1-2 days</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Hostel delivery (Free) - 2-3 days</span>
                      </li>
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold mb-2">Return Policy</h3>
                    <p className="text-muted-foreground">
                      7-day return policy for all items. Items must be in original condition with tags attached.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-heading font-bold mb-8">Related Products</h2>
            <div className="product-grid">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}