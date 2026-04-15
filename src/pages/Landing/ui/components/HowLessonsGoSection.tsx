import { useTranslation } from "react-i18next";

const lessonStepsMeta = [
  { num: "01", color: "text-orange-400", img: "/lessons/1.png", key: "step1" },
  { num: "02", color: "text-green-500", img: "/lessons/2.png", key: "step2" },
  { num: "03", color: "text-blue-400", img: "/lessons/3.png", key: "step3" },
  { num: "04", color: "text-purple-500", img: "/lessons/4.png", key: "step4" },
];

export function HowLessonsGoSection() {
  const { t } = useTranslation();
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

        {/* Specialist block */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-4 rounded-3xl overflow-hidden">
          <div className="flex-1 md:flex-9/12 bg-[#d4efe3] rounded-3xl p-5 lg:p-8 flex flex-col justify-between">
            <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-lg inline-block w-min">
              {t("landing.howLessonsGo.leaderBadge")}
            </span>
            <h3 className="text-xl lg:text-3xl font-bold mb-3 leading-snug mt-auto">
              {t("landing.howLessonsGo.leaderTitle")}
            </h3>
            <p className="text-gray-600 text-md lg:text-xl leading-relaxed">
              {t("landing.howLessonsGo.leaderDesc")}
            </p>
          </div>
          <div className="flex-1 md:flex-7/12 bg-gray-200 rounded-3xl min-h-44 flex items-center justify-center">
            <div className="w-full aspect-square overflow-hidden rounded-3xl">
              <img
                src={"/lessons/specialist.webp"}
                alt="Специалист"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
