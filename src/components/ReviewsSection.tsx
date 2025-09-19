import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    avatar: "SC",
    rating: 5,
    review: "SplitSetGo transformed how our team handles expenses. The interface is absolutely stunning and the functionality is flawless. It's like having a luxury concierge for expense management."
  },
  {
    name: "Michael Rodriguez",
    role: "Startup Founder",
    avatar: "MR",
    rating: 5,
    review: "I've tried every expense app out there, but nothing comes close to SplitSetGo's elegance. The premium feel and smooth interactions make splitting bills an actually enjoyable experience."
  },
  {
    name: "Emily Foster",
    role: "Travel Blogger",
    avatar: "EF",
    rating: 5,
    review: "Perfect for group travels! The analytics are incredibly detailed and the design feels like a premium Apple product. My friends are always impressed when I use it."
  },
  {
    name: "David Kim",
    role: "Finance Director",
    avatar: "DK",
    rating: 5,
    review: "The security features and professional interface make this perfect for business use. It has the sophistication of enterprise software with the beauty of consumer apps."
  },
  {
    name: "Lisa Thompson",
    role: "Event Planner",
    avatar: "LT",
    rating: 5,
    review: "Managing event expenses has never been easier. The group features are intuitive and the real-time updates keep everyone in sync. Absolutely love the premium design!"
  },
  {
    name: "Alex Johnson",
    role: "Software Engineer",
    avatar: "AJ",
    rating: 5,
    review: "As someone who appreciates good design, SplitSetGo exceeds all expectations. The attention to detail and smooth animations make it a joy to use daily."
  }
];

export const ReviewsSection = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 relative bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-green-500/5" />
      
      <div className="container-responsive relative z-10">
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 lg:mb-20 animate-luxury-fade-in">
          <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6">
            <span className="text-emerald-400 font-medium text-sm sm:text-base">Trusted by people who value transparency</span>
          </div>
          <h2 className="font-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Loved by
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Thousands
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Join the community of satisfied users who have transformed their expense management 
            with our premium platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((review, index) => (
            <Card 
              key={review.name}
              className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-emerald-500/50 rounded-2xl transition-all duration-500 hover:transform hover:scale-105 animate-luxury-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="p-6 sm:p-8 space-y-4 sm:space-y-6 relative">
                {/* Rating */}
                <div className="flex space-x-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-emerald-400 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-300 group-hover:text-gray-200 leading-relaxed text-base sm:text-lg transition-colors duration-300">
                  "{review.review}"
                </p>

                {/* User Info */}
                <div className="flex items-center space-x-3 sm:space-x-4 pt-4 sm:pt-6 border-t border-gray-800 group-hover:border-emerald-500/30 transition-colors duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 font-semibold text-sm sm:text-base group-hover:scale-110 group-hover:border-emerald-400/50 transition-all duration-300">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm sm:text-base group-hover:text-emerald-100 transition-colors duration-300">{review.name}</p>
                    <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors duration-300">{review.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Overall Rating */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20 space-y-4 sm:space-y-6">
          <div className="flex justify-center items-center space-x-1 sm:space-x-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-8 w-8 sm:h-10 sm:w-10 fill-emerald-400 text-emerald-400 animate-glow-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
          <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">4.9/5 Average Rating</p>
          <p className="text-gray-400 text-base sm:text-lg px-4">Based on 2,500+ reviews from verified users</p>
        </div>
      </div>
    </section>
  );
};