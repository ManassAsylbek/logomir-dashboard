import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/shared/services/auth/useAuth";
import { getRouteMain, getRouteLessons } from "@/shared/const/router";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { mutate: login, isPending } = useAuth({ noRedirect: true });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { username: form.username, password: form.password },
      {
        onSuccess: () => {
          onClose();
          const role = localStorage.getItem("user_role");
          navigate(role === "student" ? getRouteLessons() : getRouteMain());
        },
      },
    );
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
          Введите ваши данные для входа
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Логин</label>
            <input
              type="text"
              placeholder="Введите логин"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#4cd080]"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Пароль</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Введите пароль"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-gray-100 rounded-2xl px-4 py-3 pr-11 text-sm outline-none focus:ring-2 focus:ring-[#4cd080]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="bg-[#4cd080] text-white rounded-full py-3 px-6 font-semibold text-sm hover:bg-[#3ab86c] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? "Входим..." : "Войти →"}
          </button>
        </form>
      </div>
    </div>
  );
}
