import { useTranslation } from "react-i18next";

export function MissionSection() {
  const { t } = useTranslation();

  return (
    <section className="p-7 md:p-16 max-w-6xl mx-auto">
      <div className="max-w-5xl mx-auto">
        <div className="relative bg-gradient-to-br from-[#d4efe3] via-white to-[#FEF9C3] rounded-3xl p-10 md:p-16 text-center overflow-hidden">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <img
              src="/logo.png"
              alt="Logomir"
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
            />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {t("landing.about.missionTitle")}
          </h2>
          <p className="text-gray-500 text-md md:text-xl leading-relaxed whitespace-pre-line max-w-3xl mx-auto">
            {t("landing.about.missionText")}
          </p>
        </div>
      </div>
    </section>
  );
}
