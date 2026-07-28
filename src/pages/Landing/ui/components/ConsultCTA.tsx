import { useTranslation } from "react-i18next";

interface ConsultCTAProps {
  onOpenModal: () => void;
}

export function ConsultCTA({ onOpenModal }: ConsultCTAProps) {
  const { t } = useTranslation();

  return (
    <section className="p-7 md:p-16 max-w-6xl mx-auto">
      <div className="relative max-w-5xl mx-auto bg-gradient-to-br from-[#3cb96a] to-[#2fa85e] rounded-4xl p-8 md:p-14 text-center text-white shadow-lg shadow-[#3cb96a]/30 overflow-hidden">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          {t("landing.cta.title")}
        </h2>
        <p className="text-md md:text-xl text-green-50 mb-8 max-w-2xl mx-auto leading-relaxed">
          {t("landing.cta.subtitle")}
        </p>
        <button
          onClick={onOpenModal}
          className="bg-white text-[#3cb96a] px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-xl md:text-2xl hover:scale-105 transition-all shadow-lg inline-flex items-center gap-3"
        >
          {t("landing.cta.btn")}
          <img
            src="/how_is_work/bear-icon.png"
            alt=""
            aria-hidden="true"
            className="w-8 h-8 md:w-10 md:h-10 object-contain"
          />
        </button>
      </div>
    </section>
  );
}
