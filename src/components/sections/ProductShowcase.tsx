import { ShoppingCart, Heart, Star, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const featuredProducts = [
  {
    id: "blithchron-wave-tshirt",
    name: "Blithchron'25 Wave T-Shirt",
    price: 500,
    originalPrice: 650,
    image: "https://blithchron.iitgn.ac.in/_astro/BLACK%20SHIRT.DpHgCvy4.webp",
    club: "Blithchron",
    category: "T-Shirts",
    rating: 4.8,
    reviews: 24,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy"],
    badge: "Bestseller",
    isNew: false,
    inStock: true
  },
  {
    id: "blithchron-twilight-tshirt",
    name: "Blithchron'25 Twilight T-Shirt",
    price: 550,
    originalPrice: null,
    image: "https://blithchron.iitgn.ac.in/_astro/CREAM%20SHIRT.CdzsRkM4.webp",
    club: "Blithchron",
    category: "T-Shirts",
    rating: 4.6,
    reviews: 18,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream", "Beige"],
    badge: "Limited Edition",
    isNew: true,
    inStock: true
  },
  {
    id: "blithchron-dune-oversized",
    name: "Blithchron'25 Dune Oversized Tee",
    price: 600,
    originalPrice: null,
    image: "https://blithchron.iitgn.ac.in/_astro/OVERSIZE.HkYBaJDi.webp",
    club: "Blithchron",
    category: "Oversized",
    rating: 4.9,
    reviews: 31,
    sizes: ["M", "L", "XL"],
    colors: ["Sand", "Brown"],
    badge: "Premium",
    isNew: false,
    inStock: true
  },
  {
    id: "blithchron-eclipse-hoodie",
    name: "Blithchron'25 Eclipse Hoodie",
    price: 1200,
    originalPrice: 1400,
    image: "https://blithchron.iitgn.ac.in/_astro/BLACK%20HOODIE.DrJTeaaj.webp",
    club: "Blithchron",
    category: "Hoodies",
    rating: 4.9,
    reviews: 15,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Charcoal"],
    badge: "Winter Special",
    isNew: false,
    inStock: true
  },
  {
    id: "amalthea-tech-tshirt",
    name: "Amalthea'24 Tech T-Shirt",
    price: 450,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    club: "Amalthea",
    category: "T-Shirts",
    rating: 4.7,
    reviews: 22,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "White"],
    badge: "Tech Fest",
    isNew: false,
    inStock: true
  },
  {
    id: "iitgn-official-mug",
    name: "IITGN Official Mug",
    price: 200,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=500&fit=crop",
    club: "IITGN Official",
    category: "Accessories",
    rating: 4.5,
    reviews: 45,
    sizes: ["One Size"],
    colors: ["White", "Blue"],
    badge: "Official",
    isNew: false,
    inStock: true
  }
];

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case "Bestseller": return "bg-iitgn-orange text-white";
    case "Limited Edition": return "bg-purple-500 text-white";
    case "Premium": return "bg-yellow-500 text-black";
    case "Winter Special": return "bg-blue-500 text-white";
    case "Tech Fest": return "bg-cyan-500 text-white";
    case "Official": return "bg-iitgn-blue text-white";
    default: return "bg-muted text-muted-foreground";
  }
};

export const ProductShowcase = () => {
  return (
    <section className="py-20 bg-background-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/10 rounded-full px-4 py-2 mb-4">
            <Zap className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Featured Products</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">
            Trending
            <span className="block text-secondary">Merchandise</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most popular items from our collections. Quality assured, style guaranteed.
          </p>
        </div>

        {/* Products Grid */}
        <div className="product-grid mb-12">
          {featuredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="group bg-card border-0 shadow-md hover:shadow-xl transition-all duration-500 product-card-hover overflow-hidden"
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
                    <Badge className={getBadgeColor(product.badge)}>
                      {product.badge}
                    </Badge>
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
                  </div>

                  {/* Add to Cart Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button className="w-full cta-button" size="sm">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Club & Category */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-primary font-medium">{product.club}</span>
                    <span className="text-xs text-muted-foreground">{product.category}</span>
                  </div>

                  {/* Product Name */}
                  <h3 className="font-heading font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
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

                  {/* Sizes */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Sizes:</span>
                    <div className="flex gap-1">
                      {product.sizes.map((size) => (
                        <span key={size} className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-6 rounded-xl font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};