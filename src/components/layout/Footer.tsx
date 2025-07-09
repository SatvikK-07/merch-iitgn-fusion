import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

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
                src="https://iitgn.ac.in/sites/default/files/2023-06/IITGN%20Logo.png" 
                alt="IIT Gandhinagar" 
                className="h-12 w-auto brightness-0 invert"
              />
              <div>
                <h3 className="text-xl font-heading font-bold">Merch-IITGn</h3>
                <p className="text-sm text-primary-foreground/80">Official Store</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Your one-stop destination for official IIT Gandhinagar merchandise. 
              Representing the spirit of innovation, culture, and excellence.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Home</a></li>
              <li><a href="/shop" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Shop All</a></li>
              <li><a href="/collections" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Collections</a></li>
              <li><a href="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Collections</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/collections/blithchron" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Blithchron'25</a></li>
              <li><a href="/collections/amalthea" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Amalthea'24</a></li>
              <li><a href="/collections/hallabol" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Hallabol</a></li>
              <li><a href="/collections/tedx" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">TEDxIITGN</a></li>
              <li><a href="/collections/official" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">IITGN Official</a></li>
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
                <span className="text-primary-foreground/80">merch@iitgn.ac.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/80">+91 79 2432 5001</span>
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
            <a href="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
            <a href="/returns" className="hover:text-primary-foreground transition-colors">Return Policy</a>
            <a href="/admin" className="hover:text-primary-foreground transition-colors">Admin</a>
          </div>
          
          <div>
            <span>© 2025 Merch-IITGn. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};