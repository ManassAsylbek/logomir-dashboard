import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useBranches } from "@/shared/services/branches/useBranches";
import { useCreateConsultation } from "@/shared/services/consultations/useCreateConsultation";
import {
  ConsultationFormat,
  CreateConsultationRequest,
} from "@/shared/api/consultations/types";
import {
  PHONE_COUNTRY_CODE,
  isValidPhone,
  normalizePhone,
} from "@/shared/lib/phone";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "format" | "branch" | "datetime" | "data" | "success";

const slideVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

/** Local datetime → ISO 8601 with timezone offset (e.g. 2026-06-05T11:00:00+06:00) */
const toIsoWithOffset = (local: string): string => {
  if (!local) return "";
  const d = new Date(local);

  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  const tz = -d.getTimezoneOffset();
  const sign = tz >= 0 ? "+" : "-";
  const hh = pad(Math.floor(Math.abs(tz) / 60));
  const mm = pad(Math.abs(tz) % 60);

  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}:00${sign}${hh}:${mm}`
  );
};

/** local datetime-input min value = now (rounded down to current minute) */
const nowLocalInputValue = (): string => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}`
  );
};

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<Step>("format");
  const [format, setFormat] = useState<ConsultationFormat | null>(null);
  const [branchId, setBranchId] = useState<number | null>(null);
  const [desiredLocal, setDesiredLocal] = useState("");
  const [form, setForm] = useState({
    parent_name: "",
    phone: PHONE_COUNTRY_CODE,
    child_name: "",
    child_age: "",
    message: "",
    website: "", // honeypot — must stay empty
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { data: branchesData } = useBranches();
  const branches = branchesData?.results ?? [];
  const create = useCreateConsultation();

  // Reset state when modal closes
  useEffect(() => {
    if (isOpen) return;
    const t = setTimeout(() => {
      setStep("format");
      setFormat(null);
      setBranchId(null);
      setDesiredLocal("");
      setForm({
        parent_name: "",
        phone: PHONE_COUNTRY_CODE,
        child_name: "",
        child_age: "",
        message: "",
        website: "",
      });
      setFieldErrors({});
      setSubmitError(null);
    }, 300);

    return () => clearTimeout(t);
  }, [isOpen]);

  const goNextFromFormat = () => {
    if (!format) return;
    setStep(format === "offline" ? "branch" : "datetime");
  };

  const goNextFromBranch = () => {
    if (!branchId) return;
    setStep("datetime");
  };

  const goNextFromDatetime = () => {
    if (!desiredLocal) return;
    if (new Date(desiredLocal) <= new Date()) {
      setFieldErrors({ desired_datetime: "Выберите будущее время" });

      return;
    }
    setFieldErrors({});
    setStep("data");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setFieldErrors({});

    const errs: Record<string, string> = {};

    if (form.parent_name.trim().length < 2) {
      errs.parent_name = "Минимум 2 символа";
    }
    if (!isValidPhone(form.phone)) {
      errs.phone = "Введите телефон в формате +996 XXX XXX XXX";
    }
    if (Object.keys(errs).length) {
      setFieldErrors(errs);

      return;
    }

    if (!format) return;

    const payload: CreateConsultationRequest = {
      format,
      full_name: form.parent_name.trim(),
      phone: form.phone.trim(),
      website: form.website,
      ...(branchId ? { branch: branchId } : {}),
      ...(desiredLocal ? { desired_datetime: toIsoWithOffset(desiredLocal) } : {}),
      ...(form.child_name.trim() ? { child_name: form.child_name.trim() } : {}),
      ...(form.child_age ? { child_age: Number(form.child_age) } : {}),
      ...(form.message.trim() ? { message: form.message.trim() } : {}),
    };

    create.mutate(payload, {
      onSuccess: () => setStep("success"),
      onError: (error: any) => {
        const status = error?.response?.status;
        const data = error?.response?.data;

        if (status === 429) {
          setSubmitError(
            "Слишком много заявок с этого устройства. Попробуйте позже.",
          );

          return;
        }
        if (status === 400 && data && typeof data === "object") {
          const next: Record<string, string> = {};
          let nonField = "";

          for (const [key, val] of Object.entries(data)) {
            const text = Array.isArray(val) ? val[0] : String(val);

            if (key === "non_field_errors") nonField = text;
            else next[key === "full_name" ? "parent_name" : key] = text;
          }
          setFieldErrors(next);
          if (nonField) setSubmitError(nonField);

          return;
        }
        setSubmitError(
          data?.detail ?? "Не удалось отправить заявку. Попробуйте ещё раз.",
        );
      },
    });
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-3xl p-8 w-full max-w-lg relative shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors text-sm z-10"
          aria-label="Закрыть"
        >
          ✕
        </button>

        <AnimatePresence mode="wait">
          {/* Step 1: Format */}
          {step === "format" && (
            <motion.div
              key="format"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-xl font-bold mb-1">
                Запишитесь на консультацию в Logomir
              </h2>
              <p className="text-gray-400 text-sm mb-6">Выберите формат</p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {(
                  [
                    { v: "online" as const, label: "Онлайн", emoji: "💻" },
                    { v: "offline" as const, label: "Оффлайн", emoji: "🏢" },
                  ]
                ).map((opt) => {
                  const selected = format === opt.v;

                  return (
                    <button
                      key={opt.v}
                      onClick={() => setFormat(opt.v)}
                      className={`py-4 rounded-2xl text-base font-semibold border-2 transition-all flex flex-col items-center gap-1 ${
                        selected
                          ? "border-[#3cb96a] text-[#3cb96a] bg-[#f0fdf4]"
                          : "border-gray-200 text-gray-700 hover:border-gray-400 bg-white"
                      }`}
                    >
                      <span className="text-2xl">{opt.emoji}</span>
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={goNextFromFormat}
                disabled={!format}
                className="bg-[#3cb96a] text-white rounded-xl py-3 px-8 font-semibold text-sm hover:bg-[#2fa85e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Далее 🐻
              </button>
            </motion.div>
          )}

          {/* Step 2: Branch (only if offline) */}
          {step === "branch" && (
            <motion.div
              key="branch"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-xl font-bold mb-1">
                Запишитесь на консультацию в Logomir
              </h2>
              <p className="text-gray-400 text-sm mb-6">Выберите филиал</p>

              <div className="grid grid-cols-1 gap-2 mb-6 max-h-[280px] overflow-auto">
                {branches.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Загружаем список филиалов…
                  </p>
                ) : (
                  branches.map((b) => {
                    const selected = branchId === b.id;

                    return (
                      <button
                        key={b.id}
                        onClick={() => setBranchId(b.id)}
                        className={`text-left p-3 rounded-2xl border-2 transition-all ${
                          selected
                            ? "border-[#3cb96a] bg-[#f0fdf4]"
                            : "border-gray-200 hover:border-gray-400 bg-white"
                        }`}
                      >
                        <div className="text-sm font-medium text-gray-900">
                          {b.name ?? `Филиал #${b.id}`}
                        </div>
                        {b.city && (
                          <div className="text-xs text-gray-500">{b.city}</div>
                        )}
                        {b.address && (
                          <div className="text-xs text-gray-400 mt-0.5">
                            {b.address}
                          </div>
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep("format")}
                  className="text-sm text-gray-500 hover:text-gray-800"
                >
                  ← Назад
                </button>
                <button
                  onClick={goNextFromBranch}
                  disabled={!branchId}
                  className="bg-[#3cb96a] text-white rounded-xl py-3 px-8 font-semibold text-sm hover:bg-[#2fa85e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Далее 🐻
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Datetime */}
          {step === "datetime" && (
            <motion.div
              key="datetime"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-xl font-bold mb-1">
                Когда вам удобно?
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                Выберите желаемую дату и время. Точное время мы подтвердим
                звонком.
              </p>

              <input
                type="datetime-local"
                value={desiredLocal}
                min={nowLocalInputValue()}
                onChange={(e) => setDesiredLocal(e.target.value)}
                className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#4cd080] mb-2"
              />
              {fieldErrors.desired_datetime && (
                <p className="text-xs text-red-500 mb-2">
                  {fieldErrors.desired_datetime}
                </p>
              )}

              <div className="flex justify-between mt-4">
                <button
                  onClick={() =>
                    setStep(format === "offline" ? "branch" : "format")
                  }
                  className="text-sm text-gray-500 hover:text-gray-800"
                >
                  ← Назад
                </button>
                <button
                  onClick={goNextFromDatetime}
                  disabled={!desiredLocal}
                  className="bg-[#3cb96a] text-white rounded-xl py-3 px-8 font-semibold text-sm hover:bg-[#2fa85e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Далее 🐻
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Data */}
          {step === "data" && (
            <motion.div
              key="data"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-xl font-bold mb-1">Расскажите о себе</h2>
              <p className="text-gray-400 text-sm mb-6">
                Мы перезвоним и подтвердим запись
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Имя родителя *
                    </label>
                    <input
                      type="text"
                      placeholder="Имя родителя"
                      required
                      value={form.parent_name}
                      onChange={(e) =>
                        setForm({ ...form, parent_name: e.target.value })
                      }
                      className={`w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#4cd080] ${
                        fieldErrors.parent_name ? "ring-2 ring-red-300" : ""
                      }`}
                    />
                    {fieldErrors.parent_name && (
                      <p className="text-xs text-red-500 mt-1">
                        {fieldErrors.parent_name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      inputMode="tel"
                      placeholder="+996 700 000 000"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: normalizePhone(e.target.value),
                        })
                      }
                      onFocus={(e) => {
                        if (!form.phone) {
                          setForm({ ...form, phone: PHONE_COUNTRY_CODE });
                        }
                        // put cursor at end
                        const v = e.currentTarget.value;
                        e.currentTarget.setSelectionRange(v.length, v.length);
                      }}
                      className={`w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#4cd080] ${
                        fieldErrors.phone ? "ring-2 ring-red-300" : ""
                      }`}
                    />
                    {fieldErrors.phone && (
                      <p className="text-xs text-red-500 mt-1">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Имя ребёнка
                    </label>
                    <input
                      type="text"
                      placeholder="Имя ребёнка"
                      value={form.child_name}
                      onChange={(e) =>
                        setForm({ ...form, child_name: e.target.value })
                      }
                      className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#4cd080]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Возраст
                    </label>
                    <input
                      type="number"
                      min={0}
                      placeholder="Возраст"
                      value={form.child_age}
                      onChange={(e) =>
                        setForm({ ...form, child_age: e.target.value })
                      }
                      className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#4cd080]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Комментарий
                  </label>
                  <textarea
                    placeholder="Например, «Хотим по звуку Р»"
                    rows={2}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#4cd080] resize-none"
                  />
                </div>

                {/* Honeypot — invisible to humans, bots fill it.
                    NOT display:none (some bots skip it then). */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                    opacity: 0,
                  }}
                >
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) =>
                      setForm({ ...form, website: e.target.value })
                    }
                  />
                </div>

                {submitError && (
                  <p className="text-sm text-red-600 bg-red-50 rounded-xl px-3 py-2">
                    {submitError}
                  </p>
                )}

                <div className="flex items-center justify-between mt-2">
                  <button
                    type="button"
                    onClick={() => setStep("datetime")}
                    className="text-sm text-gray-500 hover:text-gray-800"
                  >
                    ← Назад
                  </button>
                  <button
                    type="submit"
                    disabled={create.isPending}
                    className="bg-[#3cb96a] text-white rounded-xl py-3 px-8 font-semibold text-sm hover:bg-[#2fa85e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {create.isPending ? "Отправляем…" : "Записаться 🐻"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 5: Success */}
          {step === "success" && (
            <motion.div
              key="success"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
              className="text-center"
            >
              <div className="bg-[#7bcf58] rounded-3xl p-8 mb-6">
                <h2 className="text-2xl font-bold text-white leading-tight mb-3">
                  Спасибо!
                  <br />
                  Мы свяжемся с вами
                  <br />
                  для подтверждения
                </h2>
                <p className="text-white/80 text-sm">
                  Сохраните наш номер, мы перезвоним в ближайшее время
                </p>
              </div>

              <button
                onClick={handleClose}
                className="bg-[#3cb96a] text-white rounded-xl py-3 px-8 font-semibold text-sm hover:bg-[#2fa85e] transition-colors"
              >
                Закрыть
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
