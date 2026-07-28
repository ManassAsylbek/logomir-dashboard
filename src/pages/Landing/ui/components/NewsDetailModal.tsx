import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";

import { News } from "@/shared/api/news/types";

interface Props {
  news: News | null;
  onClose: () => void;
}

const formatDate = (iso: string | null | undefined) =>
  iso
    ? new Date(iso).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

export function NewsDetailModal({ news, onClose }: Props) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {news && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl w-full max-w-2xl relative shadow-2xl overflow-hidden my-8"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-gray-700 hover:bg-white transition-colors text-sm z-10 shadow-sm"
              aria-label={t("landing.news.close")}
            >
              ✕
            </button>

            {news.image && (
              <div className="w-full h-64 md:h-80 bg-gray-100 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6 md:p-8 flex flex-col gap-4">
              <div className="text-xs text-gray-400">
                {formatDate(news.created_at)}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {news.name}
              </h2>
              <p className="text-gray-700 text-md md:text-lg leading-relaxed whitespace-pre-line">
                {news.decription}
              </p>
              {news.link && (
                <a
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start inline-flex items-center gap-2 mt-2 bg-[#3cb96a] text-white rounded-xl px-5 py-2.5 font-semibold text-sm hover:bg-[#2fa85e] transition-colors"
                >
                  {t("landing.news.openLink")}
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
