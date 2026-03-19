const phones = [
  { bg: "#e8f5f0", emoji: "🐻", label: "Лого\nмир" },
  { bg: "#fff", emoji: "📊", label: "Игры" },
  { bg: "#fff", emoji: "❓", label: "Вопрос" },
  { bg: "#fff", emoji: "🎯", label: "Презент." },
  { bg: "#fff", emoji: "👤", label: "Профиль" },
];

export function AppSection() {
  return (
    <section id="app" className="py-16 px-6 bg-[#fafaf7] text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-3">
          Первое логопедическое
          <br />
          приложение в Кыргызстане
        </h2>
        <p className="text-gray-500 mb-8">
          Следите за прогрессом ребёнка и получайте
          <br />
          задания от специалистов прямо в телефоне
        </p>
        <div className="flex justify-center gap-4 mb-10">
          <div className="bg-black text-white px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-gray-900 transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <div className="text-xs text-gray-400">Download on the</div>
              <div className="text-sm font-semibold">App Store</div>
            </div>
          </div>
          <div className="bg-black text-white px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-gray-900 transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.76c.3.17.65.19.97.07l12.92-6.52-2.72-2.72-11.17 9.17zm-1.13-20.4a1.5 1.5 0 0 0-.05.4v16.48c0 .14.02.27.05.4L14 12 2.05 3.36zM20.36 10.5l-2.7-1.36-3.06 3.06 3.06 3.06 2.72-1.37c.78-.39.78-1.5.01-1.99l-.03-.4zM4.15.24a1.03 1.03 0 0 0-.97.07L14.35 9.2l-2.72-2.72L4.15.24z" />
            </svg>
            <div className="text-left">
              <div className="text-xs text-gray-400">GET IT ON</div>
              <div className="text-sm font-semibold">Google Play</div>
            </div>
          </div>
        </div>
        {/* Phone mockups */}
        <div className="flex justify-center gap-3 overflow-x-auto pb-2">
          {phones.map((phone, i) => (
            <div
              key={i}
              className="w-28 h-52 rounded-3xl border-4 border-gray-800 flex flex-col items-center justify-center gap-2 shrink-0 shadow-lg"
              style={{ background: phone.bg }}
            >
              <span className="text-4xl">{phone.emoji}</span>
              <span className="text-xs text-gray-500 text-center whitespace-pre-line">
                {phone.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
