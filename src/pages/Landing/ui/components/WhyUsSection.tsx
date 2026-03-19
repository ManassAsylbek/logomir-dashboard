const reasons = [
  {
    icon: "🔤",
    title: "Индивидуальный подход",
    desc: "После диагностики мы составляем персональный план занятий с учётом речи и особенностей развития ребёнка.",
  },
  {
    icon: "🧩",
    title: "Игровой формат",
    desc: "Занятия проходят через игры, карточки и упражнения, которые помогают ребёнку говорить и развивать внимание.",
  },
  {
    icon: "👩‍💼",
    title: "Команда специалистов",
    desc: "Над развитием ребёнка работают логопед, дефектолог и нейропсихолог, мы смотрим на проблему комплексно.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Поддержка родителей",
    desc: "После каждого занятия вы получаете рекомендации и простые задания, которые можно выполнять дома.",
  },
];

export function WhyUsSection() {
  return (
    <section id="why" className="py-16 px-6 bg-[#e8f5f0]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <span className="text-3xl font-bold text-[#3cb96a] leading-none text-center">
              Лого
              <br />
              мир
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-2">
            Почему родители
            <br />
            выбирают Логомир
          </h2>
          <p className="text-gray-500 text-sm">
            Спокойный и понятный подход
            <br />к развитию речи ребёнка
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-[#3cb96a] text-base mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
