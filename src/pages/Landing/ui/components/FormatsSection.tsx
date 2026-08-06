import { useTranslation } from "react-i18next";

interface FormatsSectionProps {
  onOpenModal: () => void;
  onOpenTariff: (tariffNumber: number) => void;
}

// `img` sizes differ per icon: the source PNGs have unequal ink boxes inside
// their 64×64 frame (48×53, 60×54, 49×48, 64×62), so a single size would make
// the last illustration read ~30% larger than the third.
const FORMATS = [
  {
    icon: "/format/1.png",
    labelKey: "format1Label",
    descKey: "format1Desc",
    img: "h-[4.25rem] w-[4.25rem] md:h-[5.25rem] md:w-[5.25rem]",
    stage:
      "bg-[radial-gradient(circle_at_50%_38%,#c4f0d8_0%,#e9faf0_52%,#ffffff_100%)]",
    glow: "bg-[#3cb96a]/30",
    hover: "hover:ring-[#3cb96a]/30 hover:shadow-[#3cb96a]/15",
  },
  {
    icon: "/format/2.png",
    labelKey: "format2Label",
    descKey: "format2Desc",
    img: "h-[3.75rem] w-[3.75rem] md:h-[4.75rem] md:w-[4.75rem]",
    stage:
      "bg-[radial-gradient(circle_at_50%_38%,#fdeabd_0%,#fdf7e6_52%,#ffffff_100%)]",
    glow: "bg-amber-400/30",
    hover: "hover:ring-amber-400/30 hover:shadow-amber-400/15",
  },
  {
    icon: "/format/3.png",
    labelKey: "format3Label",
    descKey: "format3Desc",
    img: "h-[4.5rem] w-[4.5rem] md:h-[5.5rem] md:w-[5.5rem]",
    stage:
      "bg-[radial-gradient(circle_at_50%_38%,#d7e6fd_0%,#ecf3fe_52%,#ffffff_100%)]",
    glow: "bg-blue-400/30",
    hover: "hover:ring-blue-400/30 hover:shadow-blue-400/15",
  },
  {
    icon: "/format/4.png",
    labelKey: "format4Label",
    descKey: "format4Desc",
    img: "h-14 w-14 md:h-[4.5rem] md:w-[4.5rem]",
    stage:
      "bg-[radial-gradient(circle_at_50%_38%,#f6d9ec_0%,#fceef6_52%,#ffffff_100%)]",
    glow: "bg-pink-400/30",
    hover: "hover:ring-pink-400/30 hover:shadow-pink-400/15",
  },
];

export function FormatsSection({
  onOpenModal,
  onOpenTariff,
}: FormatsSectionProps) {
  const { t } = useTranslation();

  return (
    <section
      className="bg-gradient-to-b from-[#CFF2E8] via-white via-50% to-[#FFFDF8] p-7 md:pb-0 md:p-16 max-w-6xl mx-auto rounded-t-4xl md:rounded-[48px"
      id="formats"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-10">
          {t("landing.formats.title")}
        </h2>
        <div className="grid grid-cols-2 auto-rows-fr gap-4 xs:gap-5 md:grid-cols-4 md:gap-6">
          {FORMATS.map((item, i) => (
            <button
              key={item.labelKey}
              className={`group relative flex h-full flex-col overflow-hidden rounded-4xl bg-white text-left cursor-pointer shadow-sm shadow-black/5 ring-1 ring-black/5 transition-all duration-300 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3cb96a] motion-safe:hover:-translate-y-1.5 motion-reduce:transition-none ${item.hover}`}
              type="button"
              onClick={() => onOpenTariff(i + 1)}
            >
              {/* Illustration stage */}
              <span
                className={`relative block overflow-hidden px-4 pt-7 pb-6 md:pt-9 md:pb-8 ${item.stage}`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-1/2 left-1/2 h-32 w-32 md:h-40 md:w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none ${item.glow}`}
                />
                <span className="relative mx-auto flex h-24 w-24 md:h-28 md:w-28 items-center justify-center rounded-[28px] bg-white shadow-[0_12px_26px_rgba(16,42,30,0.10)] ring-1 ring-black/5 transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:-rotate-3 motion-safe:group-hover:scale-105 motion-reduce:transition-none">
                  <img
                    alt=""
                    aria-hidden="true"
                    className={`${item.img} object-contain`}
                    loading="lazy"
                    src={item.icon}
                  />
                </span>
              </span>

              {/* Copy */}
              <span className="flex flex-1 flex-col px-5 pb-5 md:px-6 md:pb-6">
                <h3 className="text-base md:text-lg font-bold text-gray-900 leading-snug text-balance">
                  {t(`landing.formats.${item.labelKey}`)}
                </h3>
                <p className="mt-1.5 text-xs md:text-sm text-gray-500 leading-snug">
                  {t(`landing.formats.${item.descKey}`)}
                </p>
                <span className="mt-auto flex items-center justify-between gap-2 pt-5">
                  <span className="text-xs md:text-sm font-semibold text-[#178f57]">
                    {t("landing.formats.detailsBtn")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-full bg-[#3cb96a]/10 text-[#178f57] transition-colors duration-300 group-hover:bg-[#3cb96a] group-hover:text-white motion-reduce:transition-none"
                  >
                    <svg
                      className="h-3.5 w-3.5 md:h-4 md:w-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.25}
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="text-center mx-auto mt-20 md:mt-44">
        <div className="max-w-4xl mx-auto ">
          <div className="w-24 h-24 bg-[#CFF2E8] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <img alt="Logomir" className="h-20 w-auto" src="/logo.png" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 w-full">
            {t("landing.formats.ctaTitle")}
          </h2>
          <button
            className="bg-[#3cb96a] text-white px-10 py-5 md:px-12 md:py-6 rounded-2xl font-bold text-2xl md:text-3xl hover:bg-[#2fa85e] hover:scale-105 transition-all shadow-lg shadow-[#3cb96a]/30 inline-flex items-center gap-2"
            onClick={onOpenModal}
          >
            {t("landing.formats.ctaBtn")}
          </button>
          <div className="flex-1 flex justify-center">
            <img
              alt="Запись на консультацию"
              className="w-full max-w-5xl object-contain"
              src="/format/online.webp"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
