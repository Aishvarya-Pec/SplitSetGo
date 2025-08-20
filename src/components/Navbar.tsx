import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/7ac35f37-7312-4713-824e-f1d0e46f3c62.png" 
              alt="SplitSetGo" 
              className="h-8 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="luxury" className="glow-effect" asChild>
              <a href="/dashboard">Get Started</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 border-t border-border pt-4">
            <a href="#features" className="block text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#pricing" className="block text-muted-foreground hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#about" className="block text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="block text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
            <Button variant="luxury" className="w-full glow-effect" asChild>
              <a href="/dashboard">Get Started</a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};