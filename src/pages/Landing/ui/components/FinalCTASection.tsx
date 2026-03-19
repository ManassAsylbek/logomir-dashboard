interface FinalCTASectionProps {
  onOpenModal: () => void;
}

export function FinalCTASection({ onOpenModal }: FinalCTASectionProps) {
  return (
    <section className="py-16 px-6 bg-[#fafaf7] text-center">
      <div className="max-w-3xl mx-auto">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
          <span className="text-2xl font-bold text-[#3cb96a] leading-none text-center">
            Лого
            <br />
            мир
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-snug">
          Мы подберём специалиста и формат занятий, который подойдёт именно
          вашему ребёнку.
        </h2>
        <button
          onClick={onOpenModal}
          className="bg-[#3cb96a] text-white px-8 py-3 rounded-full font-semibold text-base hover:bg-[#2fa85e] transition-colors inline-flex items-center gap-2 mb-10"
        >
          Записаться 📅
        </button>
        <div className="flex justify-center items-center gap-6 flex-wrap">
          <div className="w-48 h-80 rounded-3xl border-4 border-gray-200 bg-white shadow-xl flex items-center justify-center">
            <span className="text-6xl">📱</span>
          </div>
          <span className="text-8xl">🐻</span>
        </div>
      </div>
    </section>
  );
}
