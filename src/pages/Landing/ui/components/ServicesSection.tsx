import { useTranslation } from "react-i18next";

const splitLines = (text: string) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const TILE_BGS = [
  "bg-pink-50",
  "bg-yellow-50",
  "bg-blue-50",
  "bg-purple-50",
  "bg-green-50",
];

export function ServicesSection() {
  const { t } = useTranslation();

  const services = splitLines(t("landing.about.services"));

  return (
    <section className="p-7 md:p-16 max-w-6xl mx-auto">
      <div className="max-w-5xl mx-auto grid gap-14">
        {/* Services */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              {t("landing.about.servicesTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {services.map((s, i) => {
              const bg = TILE_BGS[i % TILE_BGS.length];

              return (
                <div
                  key={s}
                  className={`${bg} rounded-2xl p-5 flex flex-col items-center text-center gap-3`}
                >
                  <img
                    src={`/napravleniya/${i + 1}.svg`}
                    alt={s}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain"
                  />
                  <p className="font-bold text-sm md:text-md text-gray-800 leading-snug">
                    {s}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Closing */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-7xl md:text-8xl font-serif leading-none text-[#3cb96a]/40 select-none">
            «
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-800 leading-snug italic -mt-2">
            {t("landing.about.closingTag")}
          </p>
          <div className="text-7xl md:text-8xl font-serif leading-none text-[#3cb96a]/40 select-none mt-1">
            »
          </div>
        </div>
      </div>
    </section>
  );
}
