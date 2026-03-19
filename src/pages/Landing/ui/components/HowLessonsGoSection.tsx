const lessonSteps = [
  {
    num: "01",
    color: "text-orange-400",
    title: "Диагностика",
    desc: "Специалист оценивает речь, внимание и поведение ребёнка",
    emoji: "🧒",
  },
  {
    num: "02",
    color: "text-green-500",
    title: "Персональный план",
    desc: "Мы составляем индивидуальный маршрут развития",
    emoji: "🐻",
  },
  {
    num: "03",
    color: "text-blue-400",
    title: "Регулярные занятия",
    desc: "Занятия проходят в игровой форме, с постепенным усложнением",
    emoji: "🧒",
  },
  {
    num: "04",
    color: "text-purple-500",
    title: "Обратная связь",
    desc: "Родители получают рекомендации и задания для дома",
    emoji: "👩‍💼",
  },
];

export function HowLessonsGoSection() {
  return (
    <section id="lessons" className="py-16 px-6 bg-[#f0faf5]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">
          Как проходят занятия
        </h2>
        <p className="text-center text-gray-400 text-sm mb-10">
          Индивидуальный маршрут развития
          <br />
          для каждого ребёнка
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
          {lessonSteps.map((item) => (
            <div key={item.num} className="flex flex-col gap-3">
              <div className="bg-white rounded-2xl p-4 flex items-end justify-center h-32 shadow-sm">
                <span className="text-6xl">{item.emoji}</span>
              </div>
              <span className={`text-3xl font-extrabold ${item.color}`}>
                {item.num}
              </span>
              <p className="font-semibold text-sm text-gray-800">
                {item.title}
              </p>
              <p className="text-xs text-gray-400 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Specialist block */}
        <div className="flex flex-col md:flex-row gap-5 rounded-3xl overflow-hidden">
          <div className="flex-1 bg-[#d4efe3] rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full inline-block mb-4">
                Руководство
              </span>
              <h3 className="text-2xl font-bold mb-3 leading-snug">
                Центр под руководством
                <br />
                практикующего специалиста
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Руководитель Логомира — специалист с многолетним опытом работы с
                детьми с речевыми и поведенческими трудностями.
              </p>
            </div>
          </div>
          <div className="flex-1 bg-gray-200 rounded-3xl min-h-48 flex items-center justify-center">
            <span className="text-8xl">👩</span>
          </div>
        </div>
      </div>
    </section>
  );
}
