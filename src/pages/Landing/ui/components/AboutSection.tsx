import { useTranslation } from "react-i18next";

const splitLines = (text: string) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const splitService = (line: string) => {
  const idx = line.indexOf(" ");

  if (idx === -1) return { emoji: "", label: line };

  return { emoji: line.slice(0, idx), label: line.slice(idx + 1) };
};

const splitStat = (line: string) => {
  const [value, label = ""] = line.split("|");

  return { value: value.trim(), label: label.trim() };
};

const CONDITION_BGS = [
  "bg-[#ECFDF5]",
  "bg-[#FEF9C3]",
  "bg-[#E0F2FE]",
  "bg-[#EDE9FE]",
  "bg-[#FCE7F3]",
];

const SERVICE_TILES = [
  "bg-[#ECFDF5]",
  "bg-[#FEF9C3]",
  "bg-[#E0F2FE]",
  "bg-[#EDE9FE]",
  "bg-[#FCE7F3]",
];

export function AboutSection() {
  const { t } = useTranslation();

  const stats = splitLines(t("landing.about.stats")).map(splitStat);
  const conditions = splitLines(t("landing.about.conditions"));
  const founderBullets = splitLines(t("landing.about.founderBullets"));
  const services = splitLines(t("landing.about.services")).map(splitService);

  return (
    <section
      id="about"
      className="px-7 md:px-16 py-12 md:py-20 max-w-6xl mx-auto"
    >
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 md:gap-6 mb-10 md:mb-14">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-3xl p-5 md:p-8 text-center shadow-sm border border-[#CFF2E8] transition-transform hover:-translate-y-1"
          >
            <div className="text-3xl md:text-5xl font-extrabold text-[#3cb96a] mb-1 leading-none">
              {s.value}
            </div>
            <div className="text-xs md:text-base text-gray-700 leading-tight mt-2">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Story */}
      <div className="relative bg-white rounded-4xl p-8 md:p-14 shadow-sm mb-8 overflow-hidden">
        {/* decorative background blobs */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#ECFDF5] opacity-60 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#FEF9C3] opacity-40 pointer-events-none" />

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Headline column */}
          <div className="flex flex-col gap-4">
            <span className="self-start inline-block px-3 py-1 rounded-full bg-[#E7F9F0] text-[#0e6b3f] text-xs font-semibold uppercase tracking-wider">
              {t("landing.about.storyEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {t("landing.about.storyTitle")}
            </h2>
            <div className="w-12 h-1 bg-[#3cb96a] rounded-full" />
          </div>

          {/* Story paragraphs */}
          <div className="md:col-span-2 space-y-5">
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
              {t("landing.about.storyPara1")}
            </p>
            <p className="text-md md:text-lg text-gray-600 leading-relaxed">
              {t("landing.about.storyPara2")}
            </p>
            <p className="text-md md:text-lg text-gray-600 leading-relaxed">
              {t("landing.about.storyPara3")}
            </p>
          </div>
        </div>
      </div>

      {/* Conditions */}
      <div className="bg-white rounded-4xl p-8 md:p-12 shadow-sm mb-8">
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 text-center md:text-left">
          {t("landing.about.conditionsTitle")}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5 mb-8">
          {conditions.map((c, i) => {
            const bg = CONDITION_BGS[i % CONDITION_BGS.length];

            return (
              <div
                key={c}
                className="flex flex-col gap-3 transition-transform hover:-translate-y-1"
              >
                <div className={`${bg} rounded-3xl overflow-hidden`}>
                  <img
                    src={`/whom_we_help/${i + 1}.png`}
                    alt={c}
                    className="w-full aspect-square object-contain"
                  />
                </div>
                <h4 className="text-md md:text-lg font-bold text-gray-900 leading-tight px-1">
                  {c}
                </h4>
              </div>
            );
          })}
        </div>
        <div className="bg-[#E7F9F0] rounded-2xl p-5 md:p-6 border-l-4 border-[#3cb96a]">
          <p className="text-gray-700 text-md md:text-lg font-medium italic leading-snug">
            {t("landing.about.conditionsClosing")}
          </p>
        </div>
      </div>

      {/* Founder */}
      <div className="bg-white rounded-4xl p-6 md:p-12 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-start mb-8">
          {/* Avatar card */}
          <div className="bg-gradient-to-br from-[#ECFDF5] to-[#CFF2E8] rounded-3xl p-6 md:p-8 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-[#3cb96a]/30 rounded-full blur-xl" />
              <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-[#3cb96a] to-[#5BA16A] flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-lg ring-4 ring-white">
                СК
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              {t("landing.about.founderName")}
            </h3>
            <span className="mt-2 inline-block px-3 py-1 rounded-full bg-white text-[#0e6b3f] text-xs md:text-sm font-medium shadow-sm">
              {t("landing.about.founderRole")}
            </span>
          </div>

          {/* Intro + bullets */}
          <div className="md:col-span-2">
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-medium mb-6">
              {t("landing.about.founderIntro")}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {founderBullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-gray-700 text-sm md:text-md leading-relaxed bg-[#F9FAFB] rounded-xl px-4 py-3"
                >
                  <span className="w-5 h-5 rounded-full bg-[#3cb96a] text-white text-xs flex items-center justify-center mt-0.5 shrink-0 font-bold">
                    ✓
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing as accent quote */}
        <div className="bg-[#E7F9F0] rounded-2xl p-5 md:p-6 border-l-4 border-[#3cb96a]">
          <p className="text-gray-700 text-md md:text-lg font-medium italic leading-snug">
            {t("landing.about.founderClosing")}
          </p>
        </div>
      </div>

      {/* Mission — quote on green gradient */}
      <div className="relative bg-gradient-to-br from-[#3cb96a] to-[#5BA16A] rounded-4xl p-8 md:p-14 mb-8 text-center text-white overflow-hidden">
        <div className="absolute top-2 left-6 text-7xl md:text-8xl font-serif leading-none opacity-20 select-none">
          «
        </div>
        <div className="absolute bottom-0 right-6 text-7xl md:text-8xl font-serif leading-none opacity-20 select-none">
          »
        </div>
        <h3 className="relative text-2xl md:text-3xl font-bold mb-4">
          {t("landing.about.missionTitle")}
        </h3>
        <p className="relative text-white/95 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto whitespace-pre-line">
          {t("landing.about.missionText")}
        </p>
      </div>

      {/* Services — tile grid */}
      <div className="mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
          {t("landing.about.servicesTitle")}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {services.map((s, i) => {
            const bg = SERVICE_TILES[i % SERVICE_TILES.length];

            return (
              <div
                key={`${s.label}-${i}`}
                className={`${bg} rounded-3xl p-5 md:p-6 hover:-translate-y-1 transition-transform flex flex-col items-center text-center gap-3`}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white flex items-center justify-center text-3xl md:text-4xl shadow-sm">
                  {s.emoji}
                </div>
                <div className="text-gray-800 text-sm md:text-md font-semibold leading-snug">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Closing quote */}
      <div className="relative bg-gradient-to-br from-[#ECFDF5] to-[#CFF2E8] rounded-4xl px-8 py-12 md:px-12 md:py-16 text-center overflow-hidden">
        <div className="absolute top-0 left-6 md:left-10 text-7xl md:text-9xl font-serif leading-none text-[#3cb96a]/25 select-none pointer-events-none">
          «
        </div>
        <div className="absolute bottom-0 right-6 md:right-10 text-7xl md:text-9xl font-serif leading-none text-[#3cb96a]/25 select-none pointer-events-none">
          »
        </div>
        <div className="relative">
          <div className="text-3xl md:text-4xl mb-4">💙</div>
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 max-w-3xl mx-auto leading-snug">
            {t("landing.about.closingTag")}
          </p>
        </div>
      </div>
    </section>
  );
}
