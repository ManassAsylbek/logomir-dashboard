import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Newspaper, ArrowRight } from "lucide-react";

import { News } from "@/shared/api/news/types";
import { useNews } from "@/shared/services/news/useNews";

import { NewsDetailModal } from "./NewsDetailModal";

const formatDate = (iso: string | null | undefined) =>
  iso
    ? new Date(iso).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

function NewsCard({
  news,
  onOpen,
}: {
  news: News;
  onOpen: (n: News) => void;
}) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={() => onOpen(news)}
      className="bg-white rounded-3xl shadow-sm overflow-hidden text-left flex flex-col h-full transition-transform hover:-translate-y-1"
    >
      <div className="w-full aspect-[16/10] bg-gray-100 overflow-hidden flex items-center justify-center">
        {news.image ? (
          <img
            src={news.image}
            alt={news.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Newspaper size={48} className="text-gray-300" />
        )}
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="text-xs text-gray-400">
          {formatDate(news.created_at)}
        </div>
        <h3 className="font-bold text-gray-900 leading-snug line-clamp-2">
          {news.name}
        </h3>
        {news.decription && (
          <p className="text-sm text-gray-500 leading-snug line-clamp-3">
            {news.decription}
          </p>
        )}
        <span className="mt-auto pt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#3cb96a]">
          {t("landing.news.readMore")}
          <ArrowRight size={14} />
        </span>
      </div>
    </button>
  );
}

export function NewsSection() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<News | null>(null);

  const { data, isLoading, isError } = useNews(1);
  const items = data?.results ?? [];

  // Render nothing when there is no data and the request failed —
  // landing shouldn't show a permanent error block.
  if (!isLoading && (isError || items.length === 0)) {
    return null;
  }

  return (
    <section id="news" className="p-7 md:p-16 max-w-6xl mx-auto">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">
            {t("landing.news.title")}
          </h2>
          <p className="text-sm md:text-2xl font-medium text-gray-500">
            {t("landing.news.subtitle")}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-sm overflow-hidden animate-pulse"
              >
                <div className="w-full aspect-[16/10] bg-gray-100" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.slice(0, 6).map((news) => (
              <NewsCard key={news.id} news={news} onOpen={setSelected} />
            ))}
          </div>
        )}
      </div>

      <NewsDetailModal news={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
