import { useTranslation } from "react-i18next";

const PHOTO_COUNT = 11;

const photos = Array.from({ length: PHOTO_COUNT }, (_, i) => i + 1);

export function WeAndChildrenSection() {
  const { t } = useTranslation();

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

        <div className="columns-2 md:columns-3 gap-4 [&>*]:mb-4">
          {photos.map((n) => (
            <div
              key={n}
              className="break-inside-avoid overflow-hidden rounded-3xl shadow-sm bg-gray-100"
            >
              <img
                src={`/we_and_child/${n}.webp`}
                alt={t("landing.weAndChildren.title")}
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
