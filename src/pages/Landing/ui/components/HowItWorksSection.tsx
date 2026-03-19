const steps = [
  {
    num: "01",
    color: "text-pink-400",
    bg: "bg-pink-50",
    title: "Выбираете логопеда",
    emoji: "📱",
  },
  {
    num: "02",
    color: "text-purple-500",
    bg: "bg-purple-50",
    title: "Выбираете удобное время",
    emoji: "📅",
  },
  {
    num: "03",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    title: "Проходите консультацию",
    emoji: "👩‍🏫",
  },
  {
    num: "04",
    color: "text-green-500",
    bg: "bg-green-50",
    title: "Получаете план развития ребёнка",
    emoji: "🐻",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how" className="py-16 px-6 bg-[#fafcfa]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Как это работает
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {steps.map((item) => (
            <div
              key={item.num}
              className={`${item.bg} rounded-2xl p-5 flex flex-col gap-3`}
            >
              <span className={`text-4xl font-extrabold ${item.color}`}>
                {item.num}
              </span>
              <div className="text-4xl">{item.emoji}</div>
              <p className="text-sm font-medium text-gray-700 leading-snug">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
