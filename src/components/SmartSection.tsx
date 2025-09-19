import { Brain, Zap, Target, TrendingUp } from "lucide-react";

const smartFeatures = [
  {
    icon: Brain,
    title: "Smart Categorization",
    description: "Automatically categorizes your expenses with 95% accuracy, learning from your spending patterns."
  },
  {
    icon: Zap,
    title: "Instant Calculations",
    description: "Lightning-fast expense splitting with complex scenarios handled seamlessly by our smart engine."
  },
  {
    icon: Target,
    title: "Predictive Insights",
    description: "Get personalized recommendations and spending forecasts based on your group's behavior."
  },
  {
    icon: TrendingUp,
    title: "Optimization Engine",
    description: "Smart algorithms optimize payment routes and suggest the most efficient settlement strategies."
  }
];

export const SmartSection = () => {
  return (
    <section className="py-32 relative bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center space-y-8 mb-20 animate-luxury-fade-in">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-2">
            <Brain className="h-5 w-5 text-emerald-400" />
            <span className="text-emerald-400 font-medium">Smart Technology</span>
          </div>
          
          <h2 className="font-luxury text-4xl md:text-6xl font-bold text-white leading-tight">
            Intelligent
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Expense Management
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Our advanced smart engine transforms the way you split expenses, making every transaction 
            smarter, faster, and more intuitive than ever before.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {smartFeatures.map((feature, index) => (
            <div 
              key={feature.title}
              className="group relative animate-luxury-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-green-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 group-hover:border-emerald-500/50 rounded-2xl p-8 h-full transition-all duration-500 group-hover:transform group-hover:scale-105">
                <div className="text-center space-y-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:border-emerald-400/50 transition-all duration-300">
                    <feature.icon className="h-8 w-8 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white group-hover:text-emerald-100 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 group-hover:text-gray-300 leading-relaxed transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Stats Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              95%
            </div>
            <p className="text-gray-300 font-medium">Accuracy Rate</p>
            <p className="text-sm text-gray-500">In expense categorization</p>
          </div>
          
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              &lt;0.5s
            </div>
            <p className="text-gray-300 font-medium">Processing Time</p>
            <p className="text-sm text-gray-500">For complex calculations</p>
          </div>
          
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              24/7
            </div>
            <p className="text-gray-300 font-medium">Smart Monitoring</p>
            <p className="text-sm text-gray-500">Continuous optimization</p>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/6 w-64 h-64 bg-emerald-500 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/6 w-48 h-48 bg-green-500 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  );
};