import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface HeroSectionProps {
  onOpenModal: () => void;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

export function HeroSection({ onOpenModal: _onOpenModal }: HeroSectionProps) {
  const { t } = useTranslation();
  return (
    <section
      className="relative overflow-hidden text-white min-h-[70vh] xs:min-h-[60vh] sm:min-h-[50vh] md:min-h-[70vh] lg:min-h-[90vh] xl:min-h-[110vh] "
      style={{
        background: "#5BA16A",
      }}
    >
      {/* <div className="relative z-10 h-[300px] w-full bg-[#3BB96A]" /> */}

      {/* Иллюстрация как абсолютный фон — прибита к низу, на всю ширину */}
      <motion.img
        src="/hero/hero.webp"
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full object-contain object-bottom pointer-events-none pt-14vh"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      />

      {/* Текст поверх фона */}
      <div className="relative z-10 text-center px-6 pt-28 pb-6">
        <motion.h1
          {...fadeUp(0.1)}
          className="text-4xl md:text-7xl font-bold leading-tight mb-4"
        >
          {t("landing.hero.title")}
        </motion.h1>

        <motion.p
          {...fadeUp(0.25)}
          className="text-green-100 text-xl md:text-2xl leading-relaxed mb-8  mx-auto"
        >
          {t("landing.hero.subtitle")}
        </motion.p>

        {/* <motion.div
          {...fadeUp(0.4)}
          className="flex gap-4 justify-center flex-wrap"
        >
          <motion.button
            onClick={onOpenModal}
            className="bg-white text-[#3cb96a] px-8 py-3.5 rounded-full font-bold text-base shadow-lg inline-flex items-center gap-2"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Записаться 📅
          </motion.button>
        </motion.div> */}
      </div>
    </section>
  );
}
