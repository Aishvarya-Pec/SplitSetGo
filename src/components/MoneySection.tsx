import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const MoneySection = () => {
  return (
    <section className="min-h-screen relative bg-gradient-to-b from-black to-gray-900 overflow-hidden flex items-center">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center space-y-8 animate-luxury-fade-in">
          {/* Main Heading */}
          <h2 className="font-luxury text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
            You After Getting
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Money On Time
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Experience the joy of seamless payments and instant settlements. 
            No more awkward reminders or delayed payments.
          </p>
        </div>
      </div>
      
      {/* Full Screen Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60 z-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-5" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 z-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500 rounded-full blur-3xl" />
      </div>
    </section>
  );
};