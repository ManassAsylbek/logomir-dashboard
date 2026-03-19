interface LandingNavbarProps {
  onOpenModal: () => void;
}

export function LandingNavbar({ onOpenModal }: LandingNavbarProps) {
  return (
    <header className="absolute top-0 left-0 right-0 z-40 pt-3">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="h-14 rounded-2xl bg-[#e9e9e9] border-2 border-white px-4 md:px-5 flex items-center justify-between shadow-[0_1px_0_rgba(255,255,255,0.4)]">
          <a href="#" className="shrink-0">
            <img src="/logo.png" alt="Logomir" className="h-7 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-7 text-[13px] text-[#242424] font-medium">
            <a href="#why" className="hover:text-[#3cb96a] transition-colors">
              Почему мы
            </a>
            <a href="#app" className="hover:text-[#3cb96a] transition-colors">
              Logomir Mobile
            </a>
            <a
              href="#formats"
              className="hover:text-[#3cb96a] transition-colors"
            >
              Тарифы
            </a>
          </nav>
          <button
            onClick={onOpenModal}
            className="h-9 px-5 rounded-xl bg-[#7bcf58] text-white text-sm font-semibold hover:bg-[#6fc44c] transition-colors inline-flex items-center gap-1"
          >
            Войти
            <span aria-hidden="true">↪</span>
          </button>
        </div>
      </div>
    </header>
  );
}
