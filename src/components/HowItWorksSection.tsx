import { CheckCircle, Users, Calculator, CreditCard } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: Users,
      title: "Create Your Group",
      description: "Start by creating a group and inviting friends, family, or colleagues to join your expense sharing circle.",
      step: "01"
    },
    {
      icon: CreditCard,
      title: "Add Expenses",
      description: "Simply snap a photo of your receipt or manually enter expenses. Our smart engine will automatically categorize and split them.",
      step: "02"
    },
    {
      icon: Calculator,
      title: "Smart Calculations",
      description: "Our intelligent system calculates who owes what, considering different splitting methods and previous payments.",
      step: "03"
    },
    {
      icon: CheckCircle,
      title: "Settle Up",
      description: "Get notified when it's time to settle up. Pay through integrated payment methods or mark as paid when settled offline.",
      step: "04"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container-responsive relative z-10">
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 lg:mb-20 animate-luxury-fade-in">
          <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6">
            <span className="text-emerald-400 font-medium text-sm sm:text-base">Simple & Elegant Process</span>
          </div>
          <h2 className="font-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Splitting expenses has never been easier. Follow these simple steps to start managing your group expenses like a pro.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-emerald-500/50 to-transparent z-0" />
              )}
              
              {/* Step Card */}
              <div className="glass-card p-6 sm:p-8 rounded-3xl text-center relative z-10 hover:shadow-glow transition-all duration-500 group-hover:scale-105">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-glow">
                  {step.step}
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-luxury font-semibold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-300 mb-8 text-lg">
            Ready to simplify your expense sharing?
          </p>
          <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-8 py-4 rounded-xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 glow-effect">
            <a href="/dashboard" className="flex items-center">
              Get Started Now
            </a>
          </button>
        </div>
      </div>
    </section>
  );
};