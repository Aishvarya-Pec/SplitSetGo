import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container-responsive py-4">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl lg:text-3xl font-luxury font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              SplitSetGo
            </span>
          </div>

          {/* Desktop Navigation & CTA Button */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="luxury" className="glow-effect">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button variant="luxury" className="glow-effect" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2 rounded-lg hover:bg-muted/50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 border-t border-border pt-4 animate-in slide-in-from-top-2 duration-200">
            <a 
              href="#features" 
              className="block text-muted-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="block text-muted-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <SignedOut>
              <SignInButton mode="modal">
                <Button 
                  variant="luxury" 
                  className="w-full glow-effect mt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button 
                variant="luxury" 
                className="w-full glow-effect mt-4" 
                asChild
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </SignedIn>
          </div>
        )}
      </div>
    </nav>
  );
};