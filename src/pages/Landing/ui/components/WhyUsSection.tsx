import { useTranslation } from "react-i18next";

export function WhyUsSection() {
  const { t } = useTranslation();

  const reasons = [
    {
      icon: "/why_us/abc.png",
      titleKey: "reason1Title",
      descKey: "reason1Desc",
    },
    {
      icon: "/why_us/puzzle.png",
      titleKey: "reason2Title",
      descKey: "reason2Desc",
    },
    {
      icon: "/why_us/doctor.png",
      titleKey: "reason3Title",
      descKey: "reason3Desc",
    },
    {
      icon: "/why_us/family.png",
      titleKey: "reason4Title",
      descKey: "reason4Desc",
    },
  ];
  return (
    <section
      id="why"
      className="p-7 md:p-16 max-w-6xl mx-auto rounded-4xl md:rounded-[48px] bg-white grid  gap-10 relative z-10 -mt-8 "
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">
            {t("landing.whyUs.title")}
          </h2>
          <p className="text-sm md:text-2xl font-medium">
            {t("landing.whyUs.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reasons.map((item) => (
            <div
              key={item.titleKey}
              className="bg-gray-100 rounded-4xl p-6 shadow-sm"
            >
              <div className="text-3xl mb-4">
                <img
                  src={item.icon}
                  alt={t(`landing.whyUs.${item.titleKey}`)}
                  className="w-11 h-11"
                />
              </div>
              <h3 className="font-medium text-[#3cb96a] text-xl mb-2">
                {t(`landing.whyUs.${item.titleKey}`)}
              </h3>
              <p className="text-gray-500 text-md leading-relaxed">
                {t(`landing.whyUs.${item.descKey}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
