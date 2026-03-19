interface CTASectionProps {
  onOpenModal: () => void;
}

export function CTASection({ onOpenModal }: CTASectionProps) {
  return (
    <section className="py-14 px-6 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h2 className="text-4xl font-extrabold leading-tight mb-4">
            Запишитесь
            <br />
            на первую
            <br />
            консультацию
          </h2>
          <p className="text-gray-500 mb-6 text-base">
            Мы подберём специалиста
            <br />и удобное время для вашего
            <br />
            ребёнка
          </p>
          <button
            onClick={onOpenModal}
            className="bg-[#3cb96a] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#2fa85e] transition-colors flex items-center gap-2"
          >
            Записаться онлайн 📅
          </button>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-72 h-56 flex items-center justify-center">
            {/* Schedule illustration */}
            <div className="bg-green-50 rounded-3xl p-5 w-full flex flex-col gap-2 shadow-sm">
              {[
                ["10:00", "10:30", "#dcfce7", "#bbf7d0"],
                ["10:30", "", "#bbf7d0", ""],
                ["11:00", "", "white", ""],
              ].map(([t1, t2, c1, c2], i) => (
                <div key={i} className="flex gap-2">
                  <span
                    className="rounded-lg px-3 py-1 text-sm font-medium text-gray-700"
                    style={{ background: c1 as string }}
                  >
                    {t1}
                  </span>
                  {t2 && (
                    <span
                      className="rounded-lg px-3 py-1 text-sm font-medium text-gray-700"
                      style={{ background: c2 as string }}
                    >
                      {t2}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <span className="absolute -right-4 -bottom-4 text-7xl">🐻</span>
          </div>
        </div>
      </div>
    </section>
  );
}
