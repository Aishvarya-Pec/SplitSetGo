import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute inset-0 bg-gradient-emerald opacity-30" />
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="text-center space-y-8 animate-luxury-fade-in">
          {/* Hero Text */}
          <div className="space-y-6">
            <h1 className="font-luxury text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight">
              Split Expenses.
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Share Smiles.
              </span>
              <br />
              Pay Smarter.
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The most luxurious way to manage group expenses. 
              Experience premium splitting with elegant design and seamless payments.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative mt-16 animate-luxury-scale">
            <div className="absolute inset-0 bg-gradient-emerald rounded-3xl blur-3xl opacity-50" />
            <img
              src="/lovable-uploads/2b4e8f7e-0e3b-4e58-b266-2fd5cedf3aa0.png"
              alt="SplitSetGo App Preview"
              className="relative max-w-4xl mx-auto w-full h-auto rounded-3xl shadow-luxury animate-glow-pulse"
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            <Button 
              size="lg" 
              variant="luxury" 
              className="text-lg px-8 py-4 glow-effect group"
            >
              Start Splitting Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="glass" 
              className="text-lg px-8 py-4 group"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">Trusted by thousands of users worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-muted-foreground">|</div>
              <div className="text-2xl font-bold">$2M+</div>
              <div className="text-muted-foreground">|</div>
              <div className="text-2xl font-bold">99%</div>
            </div>
            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground mt-2">
              <div>Active Users</div>
              <div></div>
              <div>Split Amount</div>
              <div></div>
              <div>Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};