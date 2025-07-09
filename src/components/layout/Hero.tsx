import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="hero-section">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-overlay" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in-up">
            <Sparkles className="h-4 w-4 text-iitgn-orange" />
            <span className="text-sm font-medium">Official IIT Gandhinagar Store</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 animate-fade-in-up [animation-delay:200ms]">
            Merch-IITGn
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl lg:text-3xl font-heading font-medium mb-4 text-iitgn-orange animate-fade-in-up [animation-delay:400ms]">
            Culture Redefined
          </p>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:600ms]">
            Discover exclusive merchandise from IITGN's premier events - Amalthea, Blithchron, Hallabol, and more. 
            Wear your pride, celebrate our culture.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up [animation-delay:800ms]">
            <Button size="lg" className="cta-button text-lg px-8 py-6 rounded-xl font-semibold">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 rounded-xl font-semibold bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              Explore Collections
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-md mx-auto animate-fade-in-up [animation-delay:1000ms]">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-iitgn-orange">50+</div>
              <div className="text-sm text-white/80">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-iitgn-orange">5+</div>
              <div className="text-sm text-white/80">Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-iitgn-orange">1000+</div>
              <div className="text-sm text-white/80">Happy Students</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-iitgn-orange/20 rounded-full animate-float [animation-delay:2s] hidden lg:block" />
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-white/10 rounded-full animate-float [animation-delay:3s] hidden lg:block" />
      <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-iitgn-blue/30 rounded-full animate-float [animation-delay:4s] hidden lg:block" />
    </section>
  );
};