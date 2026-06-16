import { useState } from "react";
import { useTranslation } from "react-i18next";

const INITIAL_VISIBLE = 6;

// Порядок показа: первые 6 (вертикальные кадры) — в свёрнутом виде,
// горизонтальные (5, 6, 9) открываются по кнопке.
const photos = [1, 2, 3, 4, 7, 8, 10, 11, 5, 6, 9];

export function WeAndChildrenSection() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const visiblePhotos = expanded ? photos : photos.slice(0, INITIAL_VISIBLE);

  return (
    <section id="we-and-children" className="p-7 md:p-16 max-w-6xl mx-auto">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">
            {t("landing.weAndChildren.title")}
          </h2>
          <p className="text-sm md:text-2xl font-medium text-gray-600">
            {t("landing.weAndChildren.subtitle")}
          </p>
        </div>

        <div className="relative">
          <div className="columns-2 md:columns-3 gap-4 [&>*]:mb-4">
            {visiblePhotos.map((n) => (
              <div
                key={n}
                className="group relative break-inside-avoid overflow-hidden rounded-3xl bg-gray-100 shadow-md shadow-black/5 ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#3cb96a]/15 hover:ring-[#3cb96a]/20"
              >
                <img
                  src={`/we_and_child/${n}.webp`}
                  alt={t("landing.weAndChildren.title")}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07]"
                />
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-black/30 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>

          {!expanded && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FFFDF8] via-[#FFFDF8]/80 to-transparent" />
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 bg-white text-[#178f57] font-bold px-7 py-3.5 rounded-full shadow-sm ring-1 ring-[#3cb96a]/20 hover:ring-[#3cb96a]/40 hover:shadow-md transition-all"
          >
            {expanded
              ? t("landing.weAndChildren.showLess")
              : t("landing.weAndChildren.showMore")}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-5 w-5 transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
