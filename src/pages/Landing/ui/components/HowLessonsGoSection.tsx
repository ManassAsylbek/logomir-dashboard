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
        <div className="flex flex-col md:flex-row gap-4 rounded-[32px] p-2 bg-white shadow-xl shadow-[#3cb96a]/10 ring-1 ring-[#3cb96a]/10">
          <div className="relative overflow-hidden flex-1 md:flex-9/12 bg-gradient-to-br from-[#d4efe3] via-[#e6f5ec] to-[#f2faf5] rounded-[26px] p-6 lg:p-10 flex flex-col">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#22bb79]/15 blur-3xl" />
            {/* Watermark quote */}
            <span className="pointer-events-none absolute -bottom-8 right-2 text-[10rem] leading-none font-serif text-[#3cb96a]/10 select-none">
              ”
            </span>

            {/* Badge */}
            <span className="relative self-start inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#178f57] bg-white px-3.5 py-1.5 rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22bb79]" />
              {t("landing.howLessonsGo.leaderBadge")}
            </span>

            {/* Name + role */}
            <div className="relative mt-5 flex items-stretch gap-3">
              <span className="w-1 rounded-full bg-gradient-to-b from-[#22bb79] to-[#3cb96a]" />
              <div>
                <h3 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 leading-none">
                  {t("landing.about.founderName")}
                </h3>
                <span className="mt-2 inline-block text-sm lg:text-base font-semibold text-[#178f57]">
                  {t("landing.about.founderRole")}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="relative my-5 h-px bg-[#3cb96a]/20" />

            {/* Intro */}
            <p className="relative text-gray-700 text-base lg:text-lg font-medium leading-relaxed">
              {t("landing.about.founderIntro")}
            </p>

            {/* Bullets */}
            <ul className="relative mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {founderBullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-gray-600 text-sm lg:text-[15px] leading-snug"
                >
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[#22bb79] text-white flex items-center justify-center text-[11px] font-bold shadow-sm shadow-[#22bb79]/40">
                    ✓
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Closing quote */}
            <blockquote className="relative mt-6 border-l-[3px] border-[#22bb79] bg-white/70 backdrop-blur-sm rounded-r-xl pl-4 pr-3 py-3 text-gray-600 text-sm lg:text-base italic leading-relaxed shadow-sm">
              {t("landing.about.founderClosing")}
            </blockquote>
          </div>
          <div className="relative flex-1 md:flex-7/12 rounded-[26px] overflow-hidden bg-gray-200 min-h-[320px]">
            <img
              src={"/lessons/specialist.webp"}
              alt={t("landing.about.founderName")}
              className="w-full h-full object-cover"
            />
            {/* Bottom gradient for legibility */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            {/* Floating experience badge */}
            <div className="absolute left-4 bottom-4 flex items-center gap-3 rounded-2xl bg-white/90 backdrop-blur-md pl-3 pr-4 py-2.5 shadow-xl shadow-black/10 ring-1 ring-white/70">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#22bb79] to-[#178f57] text-white shadow-md shadow-[#22bb79]/40">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-xl lg:text-2xl font-black text-gray-900 leading-none">
                  {t("landing.howLessonsGo.expBadgeValue")}
                </span>
                <span className="mt-0.5 text-xs lg:text-sm font-medium text-gray-500 leading-tight">
                  {t("landing.howLessonsGo.expBadgeLabel")}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
