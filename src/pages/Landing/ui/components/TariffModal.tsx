import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export interface BookingPreset {
  tariffLabel: string;
  planLabel: string;
  price: string;
}

export const TARIFF_PLANS = ["Trial", "Single", "Week", "Month"] as const;

export type TariffPlan = (typeof TARIFF_PLANS)[number];

interface TariffModalProps {
  isOpen: boolean;
  /** 1-based index of the tariff (matches format1..format4 i18n keys) */
  tariffNumber: number | null;
  onClose: () => void;
  onBook: (preset: BookingPreset) => void;
}

export function TariffModal({
  isOpen,
  tariffNumber,
  onClose,
  onBook,
}: TariffModalProps) {
  const { t } = useTranslation();
  const [plan, setPlan] = useState<TariffPlan>("Single");

  // Reset to the default plan whenever another tariff is opened
  useEffect(() => {
    if (isOpen) setPlan("Single");
  }, [isOpen, tariffNumber]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);

    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !tariffNumber) return null;

  const base = `landing.formats.format${tariffNumber}`;
  const label = t(`${base}Label`);
  const price = t(`${base}Price${plan}`);
  const planLabel = t(`landing.formats.plan${plan}Label`);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        aria-label="Закрыть"
        className="absolute inset-0 w-full h-full bg-black/50 cursor-default"
        type="button"
        onClick={onClose}
      />
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        aria-modal="true"
        className="bg-white rounded-3xl p-7 md:p-8 w-full max-w-lg relative shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        role="dialog"
        transition={{ duration: 0.2 }}
      >
        <button
          aria-label="Закрыть"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors text-sm z-10"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Plan switcher */}
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          {t("landing.formats.planSwitchTitle")}
        </p>
        <div
          aria-label={t("landing.formats.planSwitchTitle")}
          className="grid grid-cols-2 xs:grid-cols-4 gap-2 mb-6"
          role="tablist"
        >
          {TARIFF_PLANS.map((p) => {
            const selected = plan === p;

            return (
              <button
                key={p}
                aria-selected={selected}
                className={`py-2.5 px-2 rounded-xl text-xs md:text-sm font-semibold border-2 transition-all ${
                  selected
                    ? "border-[#3cb96a] text-[#178f57] bg-[#f0fdf4]"
                    : "border-gray-200 text-gray-600 hover:border-gray-400 bg-white"
                }`}
                role="tab"
                type="button"
                onClick={() => setPlan(p)}
              >
                {t(`landing.formats.plan${p}Label`)}
              </button>
            );
          })}
        </div>

        {/* Tariff description */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
          {label}
        </h2>
        <p className="text-gray-500 text-sm md:text-base mt-1.5 leading-relaxed">
          {t(`${base}Desc`)}
        </p>

        <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
          <span className="bg-gray-100 rounded-full px-3 py-1">
            ⏱ {t(`${base}Time`)}
          </span>
          <span className="bg-[#CFF2E8] text-[#127546] rounded-full px-3 py-1 font-medium">
            {t(`landing.formats.plan${plan}Note`)}
          </span>
        </div>

        {/* Price */}
        <div className="mt-6 rounded-2xl bg-[#FFFDF8] ring-1 ring-black/5 p-5 flex flex-col xs:flex-row xs:items-end xs:justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">{planLabel}</p>
            <motion.p
              key={price}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-[#3cb96a] leading-none whitespace-nowrap"
              initial={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
            >
              {price}
            </motion.p>
          </div>
          <button
            className="bg-[#3cb96a] text-white px-6 py-3.5 rounded-2xl font-bold text-base hover:bg-[#2fa85e] transition-colors shadow-lg shadow-[#3cb96a]/25 shrink-0 w-full xs:w-auto"
            type="button"
            onClick={() => onBook({ tariffLabel: label, planLabel, price })}
          >
            {t("landing.formats.modalBookBtn")}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
