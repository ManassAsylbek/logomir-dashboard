import { useState } from "react";

import { HeroSection } from "./components/HeroSection";
import { LandingNavbar } from "./components/LandingNavbar";
import { LoginModal } from "./components/LoginModal";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { WhyUsSection } from "./components/WhyUsSection";
import { AboutSection } from "./components/AboutSection";
import { HowLessonsGoSection } from "./components/HowLessonsGoSection";
import { WeAndChildrenSection } from "./components/WeAndChildrenSection";
import { NewsSection } from "./components/NewsSection";
import { FormatsSection } from "./components/FormatsSection";
import { LandingFooter } from "./components/LandingFooter";
import { BookingModal } from "./components/BookingModal";
import { BookingPreset, TariffModal } from "./components/TariffModal";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [tariffNumber, setTariffNumber] = useState<number | null>(null);
  const [bookingPreset, setBookingPreset] = useState<BookingPreset | null>(
    null,
  );

  const openBooking = (preset: BookingPreset | null) => {
    setTariffNumber(null);
    setBookingPreset(preset);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-white">
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <BookingModal
        isOpen={isBookingOpen}
        preset={bookingPreset}
        onClose={() => setIsBookingOpen(false)}
      />
      <TariffModal
        isOpen={tariffNumber !== null}
        tariffNumber={tariffNumber}
        onBook={(preset) => openBooking(preset)}
        onClose={() => setTariffNumber(null)}
      />
      <LandingNavbar onOpenModal={() => setIsModalOpen(true)} />
      <HeroSection onOpenModal={() => setIsModalOpen(true)} />
      <div className="bg-gradient-to-b from-[#CFF2E8] via-white via-55% to-[#FFFDF8]">
        <div id="why">
          <WhyUsSection />
        </div>

        <AboutSection />
        <HowLessonsGoSection />

        <HowItWorksSection onOpenModal={() => openBooking(null)} />
        <WeAndChildrenSection />

        <NewsSection />
        <div id="formats">
          <FormatsSection
            onOpenModal={() => openBooking(null)}
            onOpenTariff={setTariffNumber}
          />
        </div>
        <LandingFooter />
      </div>
    </div>
  );
}
