import { useTranslation } from "react-i18next";

const splitLines = (text: string) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const splitStat = (line: string) => {
  const [value, label = ""] = line.split("|");

  return { value: value.trim(), label: label.trim() };
};

const TILE_BGS = [
  "bg-pink-50",
  "bg-yellow-50",
  "bg-blue-50",
  "bg-purple-50",
  "bg-green-50",
];

export function StorySection() {
  const { t } = useTranslation();

  const stats = splitLines(t("landing.about.stats")).map(splitStat);
  const conditions = splitLines(t("landing.about.conditions"));

  return (
    <section id="about" className="p-7 md:p-16 max-w-6xl mx-auto">
      <div className="max-w-5xl mx-auto grid gap-14">
        {/* Story */}
        <div className="bg-white rounded-4xl p-8 md:p-12 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              {t("landing.about.storyTitle")}
            </h2>
          </div>
          <div className="space-y-4 text-gray-500 text-md md:text-lg leading-relaxed max-w-4xl mx-auto text-center">
            <p>{t("landing.about.storyPara1")}</p>
            <p>{t("landing.about.storyPara2")}</p>
            <p>{t("landing.about.storyPara3")}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-4xl p-6 shadow-sm">
              <div className="text-4xl md:text-6xl font-bold text-[#3cb96a] leading-none">
                {s.value}
              </div>
              <div className="text-sm md:text-base text-gray-600 mt-2 leading-tight">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Conditions */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              {t("landing.about.conditionsTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mb-6">
            {conditions.map((c, i) => {
              const bg = TILE_BGS[i % TILE_BGS.length];

              return (
                <div
                  key={c}
                  className="bg-white rounded-4xl shadow-sm flex flex-col h-full"
                >
                  <div
                    className={`${bg} rounded-2xl rounded-b-none overflow-hidden`}
                  >
                    <img
                      src={`/whom_we_help/${i + 1}.png`}
                      alt={c}
                      className="w-full aspect-square object-contain"
                    />
                  </div>
                  <div className="flex-1 flex items-center justify-center p-4">
                    <p className="font-bold text-center text-md md:text-lg text-gray-800 leading-snug">
                      {c}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-gray-600 text-md md:text-lg italic">
            {t("landing.about.conditionsClosing")}
          </p>
        </div>
      </div>
    </section>
  );
}
