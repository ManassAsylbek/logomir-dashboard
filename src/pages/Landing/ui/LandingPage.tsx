import { useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { LandingNavbar } from "./components/LandingNavbar";
import { LoginModal } from "./components/LoginModal";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { WhyUsSection } from "./components/WhyUsSection";
import { AboutSection } from "./components/AboutSection";
import { HowLessonsGoSection } from "./components/HowLessonsGoSection";
import { AppSection } from "./components/AppSection";
import { FormatsSection } from "./components/FormatsSection";
import { LandingFooter } from "./components/LandingFooter";
import { BookingModal } from "./components/BookingModal";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-white">
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
      <LandingNavbar onOpenModal={() => setIsModalOpen(true)} />
      <HeroSection onOpenModal={() => setIsModalOpen(true)} />
      <div className="bg-gradient-to-b from-[#CFF2E8] via-white via-55% to-[#FFFDF8]">
        <HowItWorksSection onOpenModal={() => setIsBookingOpen(true)} />

        <div id="why"><WhyUsSection /></div>
        <AboutSection />
        <HowLessonsGoSection />
        <div id="app"><AppSection /></div>
        <div id="formats"><FormatsSection onOpenModal={() => setIsModalOpen(true)} /></div>
        <LandingFooter />
      </div>
    </div>
  );
}
