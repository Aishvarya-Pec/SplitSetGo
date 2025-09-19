import { Shield, Users, Zap, Award, Globe, Clock } from "lucide-react";

const stats = [
  {
    number: "10,000+",
    label: "Happy Users",
    description: "Trust us with their finances",
    icon: Users
  },
  {
    number: "$2M+",
    label: "Split Successfully",
    description: "In total transactions",
    icon: Zap
  },
  {
    number: "99.9%",
    label: "Uptime",
    description: "Reliable service guarantee",
    icon: Shield
  },
  {
    number: "150+",
    label: "Countries",
    description: "Worldwide coverage",
    icon: Globe
  }
];

const reasons = [
  {
    icon: Award,
    title: "Industry Leading",
    description: "The most advanced expense splitting engine with intelligent insights and luxury design."
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Your financial data is protected with enterprise-level encryption and security protocols."
  },
  {
    icon: Clock,
    title: "Instant Processing",
    description: "Lightning-fast calculations and real-time synchronization across all your devices."
  }
];

export const WhyChooseUsSection = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent" />
      
      <div className="container-responsive relative z-10">
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 lg:mb-20 animate-luxury-fade-in">
          <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6">
            <span className="text-emerald-400 font-medium text-sm sm:text-base">Why Choose Us</span>
          </div>
          <h2 className="font-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Built for <span className="text-gradient-primary">Excellence</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Experience the difference with our premium expense splitting platform. 
            Designed with luxury and functionality in perfect harmony.
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="group text-center animate-luxury-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 group-hover:border-emerald-500/50 rounded-2xl p-8 transition-all duration-500 group-hover:transform group-hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:border-emerald-400/50 transition-all duration-300">
                    <stat.icon className="h-8 w-8 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                  </div>
                  
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-emerald-100 transition-colors duration-300">
                      {stat.label}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Divider */}
        <div className="relative my-20">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
          </div>
          <div className="relative flex justify-center">
            <div className="bg-black px-6">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full" />
            </div>
          </div>
        </div>
        
        {/* Reasons Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={reason.title}
              className="group text-center animate-luxury-scale"
              style={{ animationDelay: `${(index + 4) * 0.1}s` }}
            >
              <div className="relative bg-gray-900/30 backdrop-blur-sm border border-gray-800 group-hover:border-emerald-500/50 rounded-2xl p-8 h-full transition-all duration-500 group-hover:transform group-hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative space-y-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:border-emerald-400/50 transition-all duration-300">
                    <reason.icon className="h-8 w-8 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-white group-hover:text-emerald-100 transition-colors duration-300">
                    {reason.title}
                  </h3>
                  
                  <p className="text-gray-400 group-hover:text-gray-300 leading-relaxed transition-colors duration-300">
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>
    </section>
  );
};