import { useTranslation } from "react-i18next";

const splitLines = (text: string) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const lessonStepsMeta = [
  { num: "01", color: "text-orange-400", img: "/lessons/1.png", key: "step1" },
  { num: "02", color: "text-green-500", img: "/lessons/2.png", key: "step2" },
  { num: "03", color: "text-blue-400", img: "/lessons/3.png", key: "step3" },
  { num: "04", color: "text-purple-500", img: "/lessons/4.png", key: "step4" },
];

export function HowLessonsGoSection() {
  const { t } = useTranslation();
  const founderBullets = splitLines(t("landing.about.founderBullets"));

  return (
    <section id="lessons" className="p-7 md:p-16 max-w-6xl mx-auto">
      <div className="max-w-5xl mx-auto grid gap-14">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">
            {t("landing.howLessonsGo.title")}
          </h2>
          <p className="text-sm md:text-2xl font-medium">
            {t("landing.howLessonsGo.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {lessonStepsMeta.map((item) => (
            <div>
              <div
                key={item.num}
                className={`bg-white rounded-2xl p-0 flex flex-col`}
              >
                <span
                  className={`text-5xl mt-4 ml-4 font-semibold ${item.color}`}
                >
                  {item.num}
                </span>
                <div className="w-full aspect-square overflow-hidden rounded-xl">
                  <img
                    src={item.img}
                    alt={t(`landing.howLessonsGo.${item.key}Title`)}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="mt-4 font-bold text-lg text-gray-800 leading-snug">
                {t(`landing.howLessonsGo.${item.key}Title`)}
              </p>
              <p className="text-sm text-gray-500 leading-snug">
                {t(`landing.howLessonsGo.${item.key}Desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* Founder / Leader block */}
        <div className="flex flex-col md:flex-row gap-4 rounded-3xl overflow-hidden">
          <div className="flex-1 md:flex-9/12 bg-[#d4efe3] rounded-3xl p-5 lg:p-8 flex flex-col gap-3">
            <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-lg inline-block w-min whitespace-nowrap">
              {t("landing.howLessonsGo.leaderBadge")}
            </span>
            <h3 className="text-xl lg:text-3xl font-bold leading-snug">
              {t("landing.about.founderName")}
            </h3>
            <span className="text-sm text-gray-600 -mt-1">
              {t("landing.about.founderRole")}
            </span>
            <p className="text-gray-600 text-md lg:text-lg leading-relaxed">
              {t("landing.about.founderIntro")}
            </p>
            <ul className="space-y-2 mt-2">
              {founderBullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-gray-700 text-sm md:text-base leading-snug"
                >
                  <span className="text-[#3cb96a] font-bold mt-0.5 shrink-0">
                    ✓
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-600 text-sm md:text-md italic mt-3">
              {t("landing.about.founderClosing")}
            </p>
          </div>
          <div className="flex-1 md:flex-7/12 rounded-3xl overflow-hidden bg-gray-200 min-h-[300px]">
            <img
              src={"/lessons/specialist.webp"}
              alt={t("landing.about.founderName")}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
