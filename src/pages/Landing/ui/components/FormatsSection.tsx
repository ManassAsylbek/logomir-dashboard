const formats = [
  {
    time: "30 минут",
    price: "700 сом",
    label: "Старт речи",
    desc: "Для мягкого начала и адаптации",
    icon: "/format/1.png",
  },
  {
    time: "35 минут",
    price: "800 сом",
    label: "Речевой шаг",
    desc: "Оптимальный формат для регулярных занятий",
    icon: "/format/2.png",
  },
  {
    time: "50 минут",
    price: "900 сом",
    label: "Речевой прорыв",
    desc: "Глубокая работа с речью и мышлением",
    icon: "/format/3.png",
  },
  {
    time: "50 минут",
    price: "900 сом",
    label: "Баланс тела и мозга",
    desc: "Сенсорная интеграция и работа с телом",
    icon: "/format/4.png",
  },
];

interface FormatsSectionProps {
  onOpenModal: () => void;
}

export function FormatsSection({ onOpenModal }: FormatsSectionProps) {
  return (
    <section
      id="formats"
      className="bg-gradient-to-b from-[#CFF2E8] via-white via-50% to-[#FFFDF8] p-7 md:pb-0 md:p-16 max-w-6xl mx-auto rounded-t-4xl md:rounded-[48px"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-10">
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
                <div className="text-2xl mb-3">
                  <img src={item.icon} alt={item.label} className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-[#3cb96a] text-md md:text-lg mb-1">
                  {item.label}
                </h3>
                <p className="text-gray-400 text-sm md:text-md leading-snug mb-4">
                  {item.desc}
                </p>
              </div>
              <div className="mt-1 md:mt-20">
                <p className="text-gray-500 text-sm">{item.time}</p>
                <p className="text-2xl font-bold text-[#3cb96a]">
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mx-auto mt-20 md:mt-44">
        <div className="max-w-4xl mx-auto ">
          <div className="w-24 h-24 bg-[#CFF2E8] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <img src="/logo.png" alt="Logomir" className="h-20 w-auto" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 w-full">
            Мы подберём специалиста и формат занятий, который подойдёт именно
            вашему ребёнку.
          </h2>
          <button
            onClick={onOpenModal}
            className="bg-[#3cb96a] text-white px-8 py-3 rounded-xl font-semibold text-2xl hover:bg-[#2fa85e] transition-colors inline-flex items-center gap-2"
          >
            Записаться 📅
          </button>
          <div className="flex-1 flex justify-center">
            <img
              src="/format/online.webp"
              alt="Запись на консультацию"
              className="w-full max-w-5xl object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
