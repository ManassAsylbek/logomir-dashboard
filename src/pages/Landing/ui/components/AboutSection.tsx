import { useTranslation } from "react-i18next";

import { AppSection } from "./AppSection";

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

const MAIN_DIRECTIONS_META = [
  {
    tile: "bg-green-50",
    accent: "text-[#178f57]",
    glow: "bg-[#3cb96a]/20",
    hover: "hover:ring-[#3cb96a]/30 hover:shadow-[#3cb96a]/15",
    bar: "from-[#22bb79] to-[#3cb96a]",
    icon: (
      <>
        <rect height="12.5" rx="4" width="17" x="3.5" y="4" />
        <path d="M8.5 16.5v3.2l3.6-3.2" />
        <path d="M8.5 8.6v3.3M12 7.4v5.7M15.5 8.6v3.3" />
      </>
    ),
  },
  {
    tile: "bg-blue-50",
    accent: "text-blue-600",
    glow: "bg-blue-400/20",
    hover: "hover:ring-blue-400/30 hover:shadow-blue-400/15",
    bar: "from-blue-400 to-blue-600",
    icon: (
      <>
        <circle cx="7.6" cy="7.6" r="3.3" />
        <rect height="6.6" rx="1.6" width="6.6" x="13.1" y="4.3" />
        <path d="M7.6 13.2 11 19.7H4.2z" />
        <path d="m16.4 13.2 3.3 3.3-3.3 3.3-3.3-3.3z" />
      </>
    ),
  },
  {
    tile: "bg-purple-50",
    accent: "text-purple-600",
    glow: "bg-purple-400/20",
    hover: "hover:ring-purple-400/30 hover:shadow-purple-400/15",
    bar: "from-purple-400 to-purple-600",
    icon: (
      <>
        <path d="M3.6 20.4h4.3v-4.3h4.3v-4.3h4.3" />
        <path d="M17.8 3.8c.45 2.4 1.15 3.15 3.6 3.6-2.45.45-3.15 1.15-3.6 3.6-.45-2.4-1.15-3.15-3.6-3.6 2.45-.45 3.15-1.15 3.6-3.6Z" />
      </>
    ),
  },
  {
    tile: "bg-yellow-50",
    accent: "text-amber-700",
    glow: "bg-amber-400/20",
    hover: "hover:ring-amber-400/30 hover:shadow-amber-400/15",
    bar: "from-amber-400 to-amber-600",
    icon: (
      <>
        <path d="M8.5 7.5V6.2a3.5 3.5 0 0 1 7 0v1.3" />
        <rect height="13" rx="4" width="15" x="4.5" y="7.5" />
        <path d="M4.6 12.6h14.8" />
        <path d="M9.4 20.5v-4.4c0-.7.6-1.3 1.3-1.3h2.6c.7 0 1.3.6 1.3 1.3v4.4" />
      </>
    ),
  },
];

export function AboutSection() {
  const { t } = useTranslation();

  const stats = splitLines(t("landing.about.stats")).map(splitStat);
  const conditions = splitLines(t("landing.about.conditions"));
  const services = splitLines(t("landing.about.services"));
  const mainDirections = splitLines(t("landing.about.mainDirections")).map(
    splitStat,
  );

  return (
    <section className="p-7 md:p-16 max-w-6xl mx-auto" id="about">
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

        <div id="app">
          <AppSection />
        </div>

        {/* Conditions */}
        <div className="mt-2 p-7 md:p-16 max-w-6xl mx-auto rounded-4xl md:rounded-[48px] bg-white grid  gap-10 relative z-10 -mt-8 ">
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
                  className={`${bg} rounded-4xl shadow-sm flex flex-col h-full`}
                >
                  <div className="rounded-2xl rounded-b-none overflow-hidden bg-white/40">
                    <img
                      alt={c}
                      className="w-full aspect-square object-contain"
                      src={`/whom_we_help/${i + 1}.png`}
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

        {/* Mission */}
        <div className="relative bg-gradient-to-br from-[#d4efe3] via-white to-[#FEF9C3] rounded-3xl p-10 md:p-16 text-center overflow-hidden">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <img
              alt="Logomir"
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
              src="/logo.png"
            />
          </div>
          <p className="text-gray-500 text-md md:text-xl leading-relaxed whitespace-pre-line max-w-3xl mx-auto">
            {t("landing.about.missionText")}
          </p>
        </div>

        {/* Main directions */}
        <div>
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-[#127546] bg-white px-3.5 py-1.5 rounded-full shadow-sm ring-1 ring-[#3cb96a]/25">
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-[#22bb79]"
              />
              {t("landing.about.mainDirectionsEyebrow")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              {t("landing.about.mainDirectionsTitle")}
            </h2>
            <p className="text-sm md:text-xl font-medium text-gray-600 max-w-2xl mx-auto">
              {t("landing.about.mainDirectionsSubtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {mainDirections.map((d, i) => {
              const meta = MAIN_DIRECTIONS_META[i];

              if (!meta) return null;

              return (
                <div
                  key={d.value}
                  className={`group relative flex flex-col overflow-hidden bg-white rounded-4xl p-7 md:p-9 shadow-sm shadow-black/5 ring-1 ring-black/5 transition-all duration-300 hover:shadow-xl motion-safe:hover:-translate-y-1.5 motion-reduce:transition-none ${meta.hover}`}
                >
                  <div
                    className={`pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${meta.glow}`}
                  />
                  <div
                    className={`relative flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl ring-1 ring-black/5 transition-transform duration-300 motion-safe:group-hover:scale-105 motion-reduce:transition-none ${meta.tile} ${meta.accent}`}
                  >
                    <svg
                      aria-hidden="true"
                      className="h-8 w-8 md:h-9 md:w-9"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      viewBox="0 0 24 24"
                    >
                      {meta.icon}
                    </svg>
                  </div>
                  <h3 className="relative mt-5 text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                    {d.value}
                  </h3>
                  <p className="relative mt-2 flex-1 text-gray-500 text-sm md:text-base leading-relaxed">
                    {d.label}
                  </p>
                  <div
                    className={`relative mt-6 h-1.5 w-10 rounded-full bg-gradient-to-r transition-all duration-300 group-hover:w-20 motion-reduce:transition-none ${meta.bar}`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Services */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-700">
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
                    alt={s}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain"
                    src={`/napravleniya/${i + 1}.svg`}
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
