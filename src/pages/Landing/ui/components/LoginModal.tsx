import React, { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [form, setForm] = useState({ name: "", phone: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForm({ name: "", phone: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-8 w-full max-w-sm relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors text-sm"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-1">Войдите в Logomir</h2>
        <p className="text-gray-400 text-sm mb-6">
          Вы сможете посмотреть ваши записи
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">
              Имя родителя
            </label>
            <input
              type="text"
              placeholder="Имя родителя"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#4cd080]"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Телефон</label>
            <input
              type="tel"
              placeholder="+ 996 000 000 000"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#4cd080]"
            />
          </div>
          <button
            type="submit"
            className="bg-[#4cd080] text-white rounded-full py-3 px-6 font-semibold text-sm hover:bg-[#3ab86c] transition-colors"
          >
            Войти →
          </button>
        </form>
      </div>
    </div>
  );
}
