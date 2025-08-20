import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Users, TrendingUp, Shield, Smartphone, Zap } from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: "Smart Expense Tracking",
    description: "Automatically categorize and track expenses with AI-powered suggestions and real-time calculations.",
    gradient: "from-emerald-500/20 to-green-500/20"
  },
  {
    icon: Users,
    title: "Group Management",
    description: "Create and manage groups effortlessly. Invite friends, set permissions, and track group dynamics.",
    gradient: "from-blue-500/20 to-emerald-500/20"
  },
  {
    icon: TrendingUp,
    title: "Analytics Dashboard",
    description: "Beautiful insights into your spending patterns with luxury-grade charts and comprehensive reports.",
    gradient: "from-purple-500/20 to-emerald-500/20"
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Your financial data is protected with enterprise-level encryption and security protocols.",
    gradient: "from-orange-500/20 to-emerald-500/20"
  },
  {
    icon: Smartphone,
    title: "Cross-Platform Sync",
    description: "Seamlessly sync across all your devices with real-time updates and offline capabilities.",
    gradient: "from-cyan-500/20 to-emerald-500/20"
  },
  {
    icon: Zap,
    title: "Instant Settlements",
    description: "Split and settle instantly with integrated payment systems and smart settlement suggestions.",
    gradient: "from-yellow-500/20 to-emerald-500/20"
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-dark opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center space-y-6 mb-20 animate-luxury-fade-in">
          <h2 className="font-luxury text-4xl md:text-6xl font-bold text-foreground">
            Premium Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the perfect blend of luxury design and powerful functionality. 
            Every feature crafted with precision and elegance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="glass-card hover:shadow-glow transition-all duration-500 group animate-luxury-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center">
                <div className={`mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-luxury text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-center leading-relaxed">
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