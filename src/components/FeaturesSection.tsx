import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Users, TrendingUp, Shield, Smartphone, Zap } from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: "Smart Expense Tracking",
    description: "Automatically categorize and track expenses with intelligent suggestions and real-time calculations.",
    gradient: "from-emerald-500/10 to-green-500/10"
  },
  {
    icon: Users,
    title: "Group Management",
    description: "Create and manage groups effortlessly. Invite friends, set permissions, and track group dynamics.",
    gradient: "from-emerald-400/10 to-green-600/10"
  },
  {
    icon: TrendingUp,
    title: "Analytics Dashboard",
    description: "Beautiful insights into your spending patterns with luxury-grade charts and comprehensive reports.",
    gradient: "from-green-500/10 to-emerald-500/10"
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Your financial data is protected with enterprise-level encryption and security protocols.",
    gradient: "from-emerald-600/10 to-green-400/10"
  },
  {
    icon: Smartphone,
    title: "Cross-Platform Sync",
    description: "Seamlessly sync across all your devices with real-time updates and offline capabilities.",
    gradient: "from-green-400/10 to-emerald-600/10"
  },
  {
    icon: Zap,
    title: "Instant Settlements",
    description: "Split and settle instantly with integrated payment systems and smart settlement suggestions.",
    gradient: "from-emerald-500/10 to-green-500/10"
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 sm:py-24 lg:py-32 relative bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
      
      <div className="container-responsive relative z-10">
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 lg:mb-20 animate-luxury-fade-in">
          <h2 className="font-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Premium Features
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Experience the perfect blend of luxury design and powerful functionality. 
            Every feature crafted with precision and elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 group animate-luxury-scale hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center">
                <div className={`mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} border border-emerald-500/20 group-hover:border-emerald-400/40 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-300`}>
                  <feature.icon className="h-8 w-8 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl font-semibold text-white group-hover:text-emerald-100 transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 text-center leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};