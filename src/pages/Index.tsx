import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { MoneySection } from "@/components/MoneySection";
import { SmartSection } from "@/components/SmartSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { GetStartedSection } from "@/components/GetStartedSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <MoneySection />
      <SmartSection />
      <WhyChooseUsSection />
      <ReviewsSection />
      <GetStartedSection />
      <Footer />
    </div>
  );
};

export default Index;
