const lessonSteps = [
  {
    num: "01",
    color: "text-orange-400",
    title: "Диагностика",
    desc: "Специалист оценивает речь, внимание и поведение ребёнка",
    img: "/lessons/1.png",
  },
  {
    num: "02",
    color: "text-green-500",
    title: "Персональный план",
    desc: "Мы составляем индивидуальный маршрут развития",
    img: "/lessons/2.png",
  },
  {
    num: "03",
    color: "text-blue-400",
    title: "Регулярные занятия",
    desc: "Занятия проходят в игровой форме, с постепенным усложнением",
    img: "/lessons/3.png",
  },
  {
    num: "04",
    color: "text-purple-500",
    title: "Обратная связь",
    desc: "Родители получают рекомендации и задания для дома",
    img: "/lessons/4.png",
  },
];

export function HowLessonsGoSection() {
  return (
    <section id="lessons" className="p-7 md:p-16 max-w-6xl mx-auto">
      <div className="max-w-5xl mx-auto grid gap-14">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">
            Как проходят занятия
          </h2>
          <p className="text-sm md:text-2xl font-medium">
            Индивидуальный маршрут развития
            <br />
            для каждого ребёнка
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {lessonSteps.map((item) => (
            <div>
              <div
                key={item.num}
                className={`bg-white rounded-2xl  p-0 flex flex-col `}
              >
                <span
                  className={`text-5xl mt-4 ml-4 font-semibold ${item.color}`}
                >
                  {item.num}
                </span>
                <div className="w-full aspect-square overflow-hidden rounded-xl">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="mt-4 font-bold text-lg text-gray-800 leading-snug ">
                {item.title}
              </p>
              <p className="text-sm  text-gray-500 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Specialist block */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-2 rounded-3xl overflow-hidden">
          <div className="flex-1 md:flex-9/12 bg-[#d4efe3] rounded-3xl p-8 flex flex-col justify-between">
            <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-lg inline-block mb-4 w-min">
              Руководство
            </span>
            <h3 className="text-2xl font-bold mb-3 leading-snug mt-auto">
              Центр под руководством
              <br />
              практикующего специалиста
            </h3>
            <p className="text-gray-600 text-md leading-relaxed">
              Руководитель Логомира — специалист с многолетним опытом работы с
              детьми с речевыми и поведенческими трудностями.
            </p>
          </div>
          <div className="flex-1 md:flex-7/12 bg-gray-200 rounded-3xl min-h-44 flex items-center justify-center">
            <div className="w-full aspect-auto overflow-hidden rounded-3xl">
              <img
                src={"/lessons/specialist.webp"}
                alt="Специалист"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
