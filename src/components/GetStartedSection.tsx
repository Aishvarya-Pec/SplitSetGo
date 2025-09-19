import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const GetStartedSection = () => {
  return (
    <section className="py-32 relative bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/10 via-transparent to-green-500/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12 animate-luxury-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-3">
            <Sparkles className="h-5 w-5 text-emerald-400" />
            <span className="text-emerald-400 font-medium">Ready to Transform Your Experience?</span>
          </div>
          
          {/* Main Heading */}
          <div className="space-y-6">
            <h2 className="font-luxury text-5xl md:text-7xl font-bold text-white leading-tight">
              Start Splitting
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                Smarter Today
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join thousands of users who've discovered the perfect way to manage group expenses. 
              Experience luxury, simplicity, and intelligence in one powerful app.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Button 
              size="lg" 
              className="text-xl px-12 py-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 group"
              asChild
            >
              <a href="/dashboard">
                Get Started Free
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="pt-16 space-y-6">
            <p className="text-gray-400 text-lg">Trusted by industry leaders</p>
            
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
              <div className="text-2xl font-bold text-gray-500">10K+ Users</div>
              <div className="w-px h-8 bg-gray-700" />
              <div className="text-2xl font-bold text-gray-500">99.9% Uptime</div>
              <div className="w-px h-8 bg-gray-700" />
              <div className="text-2xl font-bold text-gray-500">Bank-Grade Security</div>
              <div className="w-px h-8 bg-gray-700" />
              <div className="text-2xl font-bold text-gray-500">24/7 Support</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
    </section>
  );
};