import { useTranslation } from "react-i18next";

export const steps = [
  {
    num: "01",
    color: "text-pink-400",
    bg: "bg-pink-50",
    img: "/how_is_work/1.png",
    key: "step1",
  },
  {
    num: "02",
    color: "text-purple-500",
    bg: "bg-purple-50",
    img: "/how_is_work/2.png",
    key: "step2",
  },
  {
    num: "03",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    img: "/how_is_work/3.png",
    key: "step3",
  },
  {
    num: "04",
    color: "text-green-500",
    bg: "bg-green-50",
    img: "/how_is_work/4.png",
    key: "step4",
  },
];

export function HowItWorksSection({
  onOpenModal,
}: {
  onOpenModal: () => void;
}) {
  const { t } = useTranslation();
  return (
    <section
      id="how"
      // className="p-7 md:p-16 max-w-6xl mx-auto"
      className="mt-2 p-7 md:p-16 max-w-6xl mx-auto rounded-4xl md:rounded-[48px] bg-white grid  gap-10 relative z-10 -mt-8 "
    >
      <div>
        {/* <div className=" w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <img src="/logo.png" alt="Logomir" className="h-20 w-auto" />
        </div> */}
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-10">
          {t("landing.howItWorks.title")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {steps.map((item) => (
            <div>
              <div
                key={item.num}
                className={`${item.bg} rounded-2xl  p-0 flex flex-col gap-3`}
              >
                <span
                  className={`text-5xl mt-4 ml-4 font-semibold ${item.color}`}
                >
                  {item.num}
                </span>
                <div className="w-full aspect-square overflow-hidden rounded-xl">
                  <img
                    src={item.img}
                    alt={t(`landing.howItWorks.${item.key}`)}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="mt-4 font-bold text-lg text-gray-800 leading-snug">
                {t(`landing.howItWorks.${item.key}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full flex-1 flex flex-col items-center md:items-start text-center md:text-start gap-4 mb-10 md:mb-0">
          <h2 className="text-4xl text-center md:text-start md:text-5xl font-extrabold leading-tight mb-4">
            {t("landing.howItWorks.consultTitle")}
          </h2>
          <p className="w-full mb-6 text-lg text-center md:text-start font-bold">
            {t("landing.howItWorks.consultDesc")}
          </p>
          <button
            onClick={onOpenModal}
            className="bg-[#3cb96a] text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-2xl md:text-3xl hover:bg-[#2fa85e] hover:scale-105 transition-all shadow-lg shadow-[#3cb96a]/30 flex items-center gap-3"
          >
            {t("landing.howItWorks.consultBtn")}
            <img
              src={"/how_is_work/bear-icon.png"}
              alt="Мишка"
              className="w-9 h-9 md:w-11 md:h-11 object-contain"
            />
          </button>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="/how_is_work/consultation.webp"
            alt="Запись на консультацию"
            className="w-full max-w-lg object-contain"
          />
        </div>
      </div>
    </section>
  );
}
