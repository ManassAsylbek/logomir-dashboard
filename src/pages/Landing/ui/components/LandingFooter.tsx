export function LandingFooter() {
  return (
    <footer className="bg-[#3a7d44] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-8">
          <div className="max-w-xs">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3">
              <span className="text-xs font-bold text-[#3cb96a] leading-none text-center">
                Лого
                <br />
                мир
              </span>
            </div>
            <p className="text-green-200 text-sm mb-4">
              Центр развития речи для детей. Индивидуальные занятия с логопедом
              онлайн и офлайн.
            </p>
            <div className="flex gap-3">
              <div className="bg-black text-white px-3 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-gray-900 transition-colors">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-400 leading-none">
                    Download on the
                  </div>
                  <div className="text-xs font-semibold">App Store</div>
                </div>
              </div>
              <div className="bg-black text-white px-3 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-gray-900 transition-colors">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3.18 23.76c.3.17.65.19.97.07l12.92-6.52-2.72-2.72-11.17 9.17zm-1.13-20.4a1.5 1.5 0 0 0-.05.4v16.48c0 .14.02.27.05.4L14 12 2.05 3.36zM20.36 10.5l-2.7-1.36-3.06 3.06 3.06 3.06 2.72-1.37c.78-.39.78-1.5.01-1.99l-.03-.4zM4.15.24a1.03 1.03 0 0 0-.97.07L14.35 9.2l-2.72-2.72L4.15.24z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-400 leading-none">
                    GET IT ON
                  </div>
                  <div className="text-xs font-semibold">Google Play</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-16 text-sm">
            <div className="flex flex-col gap-2 text-green-200">
              <a href="#app" className="hover:text-white transition-colors">
                Logomir Mobile
              </a>
              <a href="#formats" className="hover:text-white transition-colors">
                Тарифы
              </a>
              <a href="#why" className="hover:text-white transition-colors">
                Почему мы
              </a>
            </div>
            <div className="flex flex-col gap-2 text-green-200">
              <span className="text-white font-semibold mb-1">Телефон</span>
              <span className="hover:text-white cursor-pointer transition-colors">
                WhatsApp
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                Telegram
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                Email
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-green-600 pt-6 flex flex-col md:flex-row justify-between items-start gap-4">
          <span className="text-green-300 text-xs">
            Copyright © 2026 Logomir
          </span>
          <span className="text-green-300 text-xs">
            Dubai Silicon Oasis, DDP,
            <br />
            Building A2, 341041 Dubai, UAE
            <br />
            Mon-Fri 10:00 am - 7:00 pm (GST)
          </span>
        </div>
      </div>
    </footer>
  );
}
