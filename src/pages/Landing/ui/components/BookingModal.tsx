import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

type Step = "time" | "form" | "payment" | "success";

const slideVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<Step>("time");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({
    parentName: "",
    childName: "",
    phone: "",
    childAge: "",
  });

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("time");
      setSelectedTime(null);
      setForm({ parentName: "", childName: "", phone: "", childAge: "" });
    }, 300);
  };

  const handleTimeNext = () => {
    if (selectedTime) setStep("form");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentDone = () => {
    setStep("success");
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });

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
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors text-sm z-10"
        >
          ✕
        </button>

        <AnimatePresence mode="wait">
          {/* Step 1: Time Selection */}
          {step === "time" && (
            <motion.div
              key="time"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-xl font-bold mb-1">
                Запишитесь на консультацию в Logomir
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                Выберите удобную дату и время
              </p>

              <div className="grid grid-cols-4 gap-3 mb-8">
                {TIME_SLOTS.map((time) => {
                  const isDisabled = [
                    "13:00",
                    "14:00",
                    "17:00",
                    "18:00",
                  ].includes(time);
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      disabled={isDisabled}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2.5 rounded-xl text-sm font-medium border transition-all
                        ${
                          isDisabled
                            ? "text-gray-300 border-gray-100 cursor-not-allowed bg-gray-50"
                            : isSelected
                              ? "border-[#3cb96a] text-[#3cb96a] bg-white shadow-sm"
                              : "border-gray-200 text-gray-700 hover:border-gray-300 bg-white"
                        }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleTimeNext}
                disabled={!selectedTime}
                className="bg-[#3cb96a] text-white rounded-xl py-3 px-8 font-semibold text-sm hover:bg-[#2fa85e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Далее 🐻
              </button>
            </motion.div>
          )}

          {/* Step 2: Form */}
          {step === "form" && (
            <motion.div
              key="form"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-xl font-bold mb-1">
                Запишитесь на консультацию в Logomir
              </h2>
              <p className="text-gray-400 text-sm mb-6">Заполните форму</p>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Имя родителя
                    </label>
                    <input
                      type="text"
                      placeholder="Имя родителя"
                      required
                      value={form.parentName}
                      onChange={(e) =>
                        setForm({ ...form, parentName: e.target.value })
                      }
                      className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#4cd080]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Имя ребенка
                    </label>
                    <input
                      type="text"
                      placeholder="Имя ребенка"
                      required
                      value={form.childName}
                      onChange={(e) =>
                        setForm({ ...form, childName: e.target.value })
                      }
                      className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#4cd080]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      placeholder="+ 996 000 000 000"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#4cd080]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Возраст ребёнка
                    </label>
                    <input
                      type="text"
                      placeholder="Возраст"
                      required
                      value={form.childAge}
                      onChange={(e) =>
                        setForm({ ...form, childAge: e.target.value })
                      }
                      className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#4cd080]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 bg-[#3cb96a] text-white rounded-xl py-3 px-8 font-semibold text-sm hover:bg-[#2fa85e] transition-colors flex items-center gap-2 w-fit"
                >
                  Перейти к оплате 🐻
                </button>
              </form>
            </motion.div>
          )}

          {/* Step 3: Payment QR */}
          {step === "payment" && (
            <motion.div
              key="payment"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-xl font-bold mb-1">Консультация — 700 сом</h2>
              <p className="text-gray-400 text-sm mb-6">
                Дата — {formattedDate}, {selectedTime}
              </p>

              <div className="bg-gray-50 rounded-2xl p-6 flex items-center justify-center mb-6">
                {/* QR Code placeholder — replace with real QR */}
                <div className="w-56 h-56 flex items-center justify-center">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=224x224&data=${encodeURIComponent(
                      `logomir-payment:700som:${formattedDate}:${selectedTime}`,
                    )}`}
                    alt="QR для оплаты"
                    className="w-full h-full"
                  />
                </div>
              </div>

              <button
                onClick={handlePaymentDone}
                className="bg-[#3cb96a] text-white rounded-xl py-3 px-8 font-semibold text-sm hover:bg-[#2fa85e] transition-colors flex items-center gap-2"
              >
                Я оплатил 🐻
              </button>
            </motion.div>
          )}

          {/* Step 4: Success */}
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
                <span className="inline-block bg-white/90 text-[#3cb96a] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                  {formattedDate}, {selectedTime}
                </span>
                <h2 className="text-2xl font-bold text-white leading-tight mb-3">
                  Вы успешно записались
                  <br />
                  на консультацию!
                </h2>
                <p className="text-white/80 text-sm">
                  Мы пришлём напоминание в WhatsApp
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
