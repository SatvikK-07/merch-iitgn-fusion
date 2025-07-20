import { useState } from "react";
import { Menu, ShoppingCart, User, Home, Package, Phone, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { useCartStore } from "@/stores/cartStore";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const cartItemsCount = useCartStore((state) => state.getTotalItems());
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleGoogleAuth = () => {
    const userEmail = prompt("Enter your email for admin access:");
    if (userEmail === "satvikkadian1@gmail.com") {
      const password = prompt("Enter admin password:");
      if (password === "Satvik@962") {
        alert("Admin access granted!");
        window.open("/admin", "_blank");
      } else {
        alert("Incorrect password. Access denied.");
      }
    } else {
      alert("Access denied. Only authorized users can access admin panel.");
    }
  };

  const NavItems = () => (
    <>
      <button 
        onClick={() => navigate("/")} 
        className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
      >
        <Home className="h-4 w-4" />
        Home
      </button>
      <button 
        onClick={() => navigate("/shop")} 
        className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
      >
        <Package className="h-4 w-4" />
        Shop
      </button>
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogTrigger asChild>
          <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium">
            <Phone className="h-4 w-4" />
            Contact
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center gap-4 p-6">
            <div className="sr-only">
              <h2>Contact Information</h2>
            </div>
            <Phone className="h-12 w-12 text-primary" />
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="space-y-2 text-center">
              <p className="text-sm">
                <strong>Email:</strong> satvikkadian1@gmail.com
              </p>
              <p className="text-sm">
                <strong>Mobile:</strong> 7988437954
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <button 
        onClick={handleGoogleAuth}
        className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
      >
        <Shield className="h-4 w-4" />
        Admin
      </button>
    </>
  );

  return (
    <header className="sticky top-0 z-50 nav-glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img 
            src={logoImage}
            alt="The GN Collective" 
            className="h-10 w-auto"
          />
          <div className="hidden sm:block">
            <h1 className="text-xl font-heading font-bold gradient-text">
              The GN Collective
            </h1>
            <p className="text-xs text-muted-foreground -mt-1">Official Merchandise</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavItems />
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">

          {/* Cart */}
          <CartSidebar>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-secondary text-secondary-foreground text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </CartSidebar>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/orders')}>
                <Package className="h-4 w-4 mr-2" />
                My Orders
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut} className="text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex flex-col gap-4">
                  <NavItems />
                </div>
                <hr />
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={handleGoogleAuth}
                    className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    Admin
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};