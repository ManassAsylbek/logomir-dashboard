const reasons = [
  {
    icon: "/why_us/abc.png",
    title: "Индивидуальный подход",
    desc: "После диагностики мы составляем персональный план занятий с учётом речи и особенностей развития ребёнка.",
  },
  {
    icon: "/why_us/puzzle.png",
    title: "Игровой формат",
    desc: "Занятия проходят через игры, карточки и упражнения, которые помогают ребёнку говорить и развивать внимание.",
  },
  {
    icon: "/why_us/doctor.png",
    title: "Команда специалистов",
    desc: "Над развитием ребёнка работают логопед, дефектолог и нейропсихолог, мы смотрим на проблему комплексно.",
  },
  {
    icon: "/why_us/family.png",
    title: "Поддержка родителей",
    desc: "После каждого занятия вы получаете рекомендации и простые задания, которые можно выполнять дома.",
  },
];

export function WhyUsSection() {
  return (
    <section id="why" className="p-7 md:p-16 max-w-6xl mx-auto">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className=" w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <img src="/logo.png" alt="Logomir" className="h-20 w-auto" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-2">
            Почему родители
            <br />
            выбирают Логомир
          </h2>
          <p className="text-sm md:text-2xl font-medium">
            Спокойный и понятный подход
            <br />к развитию речи ребёнка
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-4xl p-6 shadow-sm"
            >
              <div className="text-3xl mb-4">
                <img src={item.icon} alt={item.title} className="w-11 h-11" />
              </div>
              <h3 className="font-medium text-[#3cb96a] text-xl mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-md leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
