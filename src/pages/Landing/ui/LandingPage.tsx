import { useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { LandingNavbar } from "./components/LandingNavbar";
import { LoginModal } from "./components/LoginModal";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { CTASection } from "./components/CTASection";
import { WhyUsSection } from "./components/WhyUsSection";
import { HowLessonsGoSection } from "./components/HowLessonsGoSection";
import { AppSection } from "./components/AppSection";
import { FormatsSection } from "./components/FormatsSection";
import { FinalCTASection } from "./components/FinalCTASection";
import { LandingFooter } from "./components/LandingFooter";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-white">
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <LandingNavbar onOpenModal={() => setIsModalOpen(true)} />
      <HeroSection onOpenModal={() => setIsModalOpen(true)} />
      <HowItWorksSection />
      <CTASection onOpenModal={() => setIsModalOpen(true)} />
      <WhyUsSection />
      <HowLessonsGoSection />
      <AppSection />
      <FormatsSection onOpenModal={() => setIsModalOpen(true)} />
      <FinalCTASection onOpenModal={() => setIsModalOpen(true)} />
      <LandingFooter />
    </div>
  );
}
