import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, CheckCircle, Star, Users, Shield, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import { useLazyLoading } from "@/hooks/useLazyLoading"

export const HeroSection = () => {
  const { elementRef: videoRef, isLoaded: videoLoaded } = useLazyLoading({
    threshold: 0.1,
    rootMargin: '100px'
  })

  return (
    <section id="main-content" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Background Video */}
      <div 
        ref={videoRef as React.RefObject<HTMLDivElement>}
        className="absolute inset-0 w-full h-full"
      >
        {videoLoaded && (
          <video
            className="w-full h-full object-cover bg-video-responsive performance-optimized"
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-poster.jpg"
            preload="metadata"
          >
            <source src="/hero-video.webm" type="video/webm" />
            <source src="/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20" />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float z-20" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float z-20" style={{ animationDelay: '1s' }} />
      
      <div className="container-responsive py-16 sm:py-24 lg:py-32 relative z-30">
        <div className="text-center space-y-6 sm:space-y-8 animate-luxury-fade-in">
          {/* Hero Text */}
          <div className="space-y-4 sm:space-y-6">
            <h1 className="font-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight drop-shadow-2xl">
              Split Expenses.
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                Share Smiles.
              </span>
              <br />
              Pay Smarter.
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-lg px-4">
              The most luxurious way to manage group expenses. 
              Experience premium splitting with elegant design and seamless payments.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-8 sm:mt-12 px-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 group"
              asChild
            >
              <a href="/dashboard">
                Start Splitting Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 sm:mt-16 text-center px-4">
            <p className="text-gray-300 mb-4 sm:mb-6 text-base sm:text-lg">Trusted by thousands of users worldwide</p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8 opacity-70">
              <div className="flex items-center space-x-2">
                <div className="text-xl sm:text-2xl font-bold text-white">10K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="hidden sm:block text-muted-foreground">|</div>
              <div className="flex items-center space-x-2">
                <div className="text-xl sm:text-2xl font-bold text-white">$2M+</div>
                <div className="text-sm text-muted-foreground">Split Amount</div>
              </div>
              <div className="hidden sm:block text-muted-foreground">|</div>
              <div className="flex items-center space-x-2">
                <div className="text-xl sm:text-2xl font-bold text-white">99%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};