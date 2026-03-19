const formats = [
  {
    time: "30 минут",
    price: "700 сом",
    label: "Старт речи",
    desc: "Для мягкого начала и адаптации",
    icon: "🌱",
  },
  {
    time: "35 минут",
    price: "800 сом",
    label: "Речевой шаг",
    desc: "Оптимальный формат для регулярных занятий",
    icon: "🪜",
  },
  {
    time: "50 минут",
    price: "900 сом",
    label: "Речевой прорыв",
    desc: "Глубокая работа с речью и мышлением",
    icon: "🚀",
  },
  {
    time: "50 минут",
    price: "900 сом",
    label: "Баланс тела и мозга",
    desc: "Сенсорная интеграция и работа с телом",
    icon: "🎯",
  },
];

interface FormatsSectionProps {
  onOpenModal: () => void;
}

export function FormatsSection({ onOpenModal }: FormatsSectionProps) {
  return (
    <section id="formats" className="py-16 px-6 bg-[#e8f5f0]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Форматы занятий
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {formats.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={onOpenModal}
            >
              <div>
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#3cb96a] text-sm mb-1">
                  {item.label}
                </h3>
                <p className="text-gray-400 text-xs leading-snug mb-4">
                  {item.desc}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">{item.time}</p>
                <p className="text-2xl font-extrabold text-[#3cb96a]">
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
