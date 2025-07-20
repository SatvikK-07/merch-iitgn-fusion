import { Mail, Phone, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import logoImage from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-heading font-bold mb-4">
              Stay Updated with Latest Drops
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              Be the first to know about new collections, exclusive offers, and event merchandise releases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Enter your @iitgn.ac.in email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button variant="secondary" className="cta-button">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={logoImage}
                alt="The GN Collective" 
                className="h-12 w-auto brightness-0 invert"
              />
              <div>
                <h3 className="text-xl font-heading font-bold">The GN Collective</h3>
                <p className="text-sm text-primary-foreground/80">Official Store</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Your one-stop destination for official IIT Gandhinagar merchandise. 
              Representing the spirit of innovation, culture, and excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-primary-foreground/80">Home</span></li>
              <li><span className="text-primary-foreground/80">Shop All</span></li>
              <li><span className="text-primary-foreground/80">Collections</span></li>
              <li><span className="text-primary-foreground/80">About Us</span></li>
              <li><span className="text-primary-foreground/80">Contact</span></li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Collections</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-primary-foreground/80">Blithchron'25</span></li>
              <li><span className="text-primary-foreground/80">Amalthea'24</span></li>
              <li><span className="text-primary-foreground/80">Hallabol</span></li>
              <li><span className="text-primary-foreground/80">TEDxIITGN</span></li>
              <li><span className="text-primary-foreground/80">IITGN Official</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-primary-foreground/60" />
                <div>
                  <p className="text-primary-foreground/80">IIT Gandhinagar</p>
                  <p className="text-primary-foreground/60">Palaj, Gandhinagar, Gujarat</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/80">satvikkadian1@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/80">+91 7988437954</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-primary-foreground/10" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/80">
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span>for IITGN Community</span>
          </div>
          
          <div className="flex flex-wrap gap-6">
            <span className="text-primary-foreground/80">Privacy Policy</span>
            <span className="text-primary-foreground/80">Terms of Service</span>
            <span className="text-primary-foreground/80">Return Policy</span>
          </div>
          
          <div>
            <span>© 2025 The GN Collective. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};