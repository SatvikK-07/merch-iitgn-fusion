import { ArrowRight, Calendar, Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const collections = [
  {
    id: "blithchron",
    name: "Blithchron'25",
    tagline: "Unleash the Cultural Vibe",
    description: "Experience the magic of IITGN's premier cultural festival with exclusive merchandise that captures the essence of creativity and celebration.",
    image: "https://blithchron.iitgn.ac.in/_astro/BLACK%20SHIRT.DpHgCvy4.webp",
    color: "from-purple-600 to-pink-600",
    textColor: "text-purple-100",
    badge: "Cultural Festival",
    stats: { products: 12, popularity: "Most Popular" }
  },
  {
    id: "amalthea",
    name: "Amalthea'24",
    tagline: "Innovation Meets Excellence",
    description: "Celebrate IITGN's technical festival with merchandise that represents innovation, technology, and the spirit of engineering excellence.",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=500&h=600&fit=crop",
    color: "from-blue-600 to-cyan-600",
    textColor: "text-blue-100",
    badge: "Tech Festival",
    stats: { products: 8, popularity: "Trending" }
  },
  {
    id: "hallabol",
    name: "Hallabol",
    tagline: "Sports Spirit Unleashed",
    description: "Gear up for IITGN's sports festival with athletic wear and merchandise that embodies the competitive spirit and sportsmanship.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop",
    color: "from-green-600 to-emerald-600",
    textColor: "text-green-100",
    badge: "Sports Festival",
    stats: { products: 6, popularity: "New Arrival" }
  },
  {
    id: "iitgn-official",
    name: "IITGN Official",
    tagline: "Wear Your Pride",
    description: "Official IITGN merchandise featuring the institute's logo and colors. Perfect for everyday wear and representing your alma mater.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
    color: "from-iitgn-blue to-iitgn-blue-dark",
    textColor: "text-blue-100",
    badge: "Official Store",
    stats: { products: 15, popularity: "Bestseller" }
  }
];

export const FeaturedCollections = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Featured Collections</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">
            Discover Our
            <span className="block text-primary">Signature Collections</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From cultural festivals to technical events, explore merchandise that tells the story of IITGN's vibrant campus life.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {collections.map((collection, index) => (
            <Card 
              key={collection.id} 
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 product-card-hover"
            >
              <div className="relative h-80 overflow-hidden">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${collection.image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${collection.color} opacity-85`} />
                
                {/* Content */}
                <CardContent className="relative h-full p-8 flex flex-col justify-between text-white">
                  <div>
                    <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                      {collection.badge}
                    </Badge>
                    
                    <h3 className="text-3xl font-heading font-bold mb-2">
                      {collection.name}
                    </h3>
                    
                    <p className={`text-xl font-medium mb-4 ${collection.textColor}`}>
                      {collection.tagline}
                    </p>
                    
                    <p className="text-white/90 mb-6 leading-relaxed">
                      {collection.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{collection.stats.products} Products</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{collection.stats.popularity}</span>
                      </div>
                    </div>
                    
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all duration-300 group-hover:translate-x-1"
                    >
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="cta-button text-lg px-8 py-6 rounded-xl font-semibold"
          >
            View All Collections
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};