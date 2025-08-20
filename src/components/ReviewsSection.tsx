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
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-emerald opacity-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center space-y-6 mb-20 animate-luxury-fade-in">
          <h2 className="font-luxury text-4xl md:text-6xl font-bold text-foreground">
            Loved by Thousands
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join the community of satisfied users who have transformed their expense management 
            with our premium platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card 
              key={review.name}
              className="glass-card hover:shadow-glow transition-all duration-500 animate-luxury-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 space-y-4">
                {/* Rating */}
                <div className="flex space-x-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-muted-foreground leading-relaxed">
                  "{review.review}"
                </p>

                {/* User Info */}
                <div className="flex items-center space-x-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Overall Rating */}
        <div className="text-center mt-16 space-y-4">
          <div className="flex justify-center items-center space-x-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-8 w-8 fill-primary text-primary" />
            ))}
          </div>
          <p className="text-2xl font-bold text-foreground">4.9/5 Average Rating</p>
          <p className="text-muted-foreground">Based on 2,500+ reviews</p>
        </div>
      </div>
    </section>
  );
};