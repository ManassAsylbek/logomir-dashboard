import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const phones = [
  { img: "/app/1.png", label: "Логомир" },
  { img: "/app/2.png", label: "Игры" },
  { img: "/app/3.png", label: "Вопрос" },
  { img: "/app/4.png", label: "Презент." },
  { img: "/app/5.png", label: "Профиль" },
  { img: "/app/6.png", label: "Профиль" },
];

export function AppSection() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  ]);

  return (
    <section id="app">
      <div className="max-w-5xl mx-auto grid gap-8">
        <div className="p-7  max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              Первое логопедическое
              <br />
              приложение в Кыргызстане
            </h2>
            <p className="text-sm md:text-2xl font-medium">
              Следите за прогрессом ребёнка и получайте
              <br />
              задания от специалистов прямо в телефоне
            </p>
          </div>
          <div className="flex justify-center gap-4 md:mb-10">
            <button className="cursor-pointer h-12 md:h-14 rounded-xl overflow-hidden transition-transform hover:scale-105 active:scale-95">
              <img
                src="/app/apple.png"
                alt="App Store"
                className="h-full w-auto object-contain"
              />
            </button>
            <button className="cursor-pointer h-12 md:h-14 rounded-xl overflow-hidden transition-transform hover:scale-105 active:scale-95">
              <img
                src="/app/google.png"
                alt="Google Play"
                className="h-full w-auto object-contain"
              />
            </button>
          </div>
          {/* Desktop: static grid */}
          <div className="hidden md:flex justify-center gap-3 pb-2">
            {phones.map((phone, i) => (
              <div key={i} className="w-auto h-80">
                <img
                  src={phone.img}
                  alt={phone.label}
                  className="h-full w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Embla carousel with autoplay */}
        <div className="md:hidden overflow-hidden mb-10" ref={emblaRef}>
          <div className="flex gap-3 mr-2">
            {phones.map((phone, i) => (
              <div key={i} className="shrink-0  h-64 ь">
                <img
                  src={phone.img}
                  alt={phone.label}
                  className="h-full w-auto object-contain mx-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
