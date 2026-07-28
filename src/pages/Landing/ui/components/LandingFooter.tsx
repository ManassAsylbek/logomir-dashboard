import { useTranslation } from "react-i18next";

export function LandingFooter() {
  const { t } = useTranslation();
  return (
    <footer className="bg-[#3a7d44] text-white w-full  p-7 md:p-16 md:pb-7 max-w-6xl mx-auto rounded-t-4xl md:rounded-t-[48px]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-8">
          <div className="max-w-sm">
            <div className="w-16 h-16 bg-[#CFF2E8] rounded-2xl flex items-center justify-center md:justify-start mb-4 shadow-sm">
              <img src="/logo.png" alt="Logomir" className="h-15 w-auto" />
            </div>
            <p className="text-white text-md mb-4">
              {t("landing.footer.desc")}
            </p>
            <div className="flex gap-3">
              <button className="cursor-pointer h-8 md:h-10 transition-transform hover:scale-105 active:scale-95">
                <img
                  src="/app/apple.png"
                  alt="App Store"
                  className="h-full w-auto object-contain"
                />
              </button>
              <button className="cursor-pointer h-8 md:h-10 transition-transform hover:scale-105 active:scale-95">
                <img
                  src="/app/google.png"
                  alt="Google Play"
                  className="h-full w-auto object-contain"
                />
              </button>
            </div>
          </div>
          <div className="flex gap-16 text-md">
            <div className="flex flex-col gap-2 text-green-200">
              <a href="#app" className="hover:text-white transition-colors">
                {t("landing.footer.appMobile")}
              </a>
              <a href="#formats" className="hover:text-white transition-colors">
                {t("landing.footer.tariffs")}
              </a>
              <a href="#why" className="hover:text-white transition-colors">
                {t("landing.footer.whyUs")}
              </a>
            </div>
            <div className="flex flex-col gap-2 text-green-200">
              <span className="text-white font-semibold mb-1">
                {t("landing.footer.phone")}
              </span>
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
          <span className="text-green-100 text-xs">
            {t("landing.footer.copyright")}
          </span>
          <span className="text-green-100 text-xs">
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
