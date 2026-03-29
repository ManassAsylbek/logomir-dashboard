import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { LandingNavbar } from "../../Landing/ui/components/LandingNavbar";
import { LandingFooter } from "../../Landing/ui/components/LandingFooter";
import { BookingModal } from "../../Landing/ui/components/BookingModal";

interface Lesson {
  id: number;
  time: string;
  label: string;
  labelType: "today" | "tomorrow" | "date";
  role: string;
  name: string;
  meetLink: string;
}

const mockLessons: Lesson[] = [
  {
    id: 1,
    time: "С 10:00 ПО 11:00",
    label: "СЕГОДНЯ",
    labelType: "today",
    role: "Логопед",
    name: "София Морозова",
    meetLink: "https://meet.google.com",
  },
  {
    id: 2,
    time: "С 10:00 ПО 11:00",
    label: "ЗАВТРА",
    labelType: "tomorrow",
    role: "Логопед",
    name: "Бегимай Айтматова",
    meetLink: "https://meet.google.com",
  },
  {
    id: 3,
    time: "С 10:00 ПО 11:00",
    label: "02.02.2026",
    labelType: "date",
    role: "Логопед",
    name: "Александр Волков",
    meetLink: "https://meet.google.com",
  },
  {
    id: 4,
    time: "С 10:00 ПО 11:00",
    label: "3.02.2026",
    labelType: "date",
    role: "Логопед",
    name: "Анастасия Дятлова",
    meetLink: "https://meet.google.com",
  },
];

function LessonBadge({
  label,
  type,
}: {
  label: string;
  type: Lesson["labelType"];
}) {
  if (type === "today") {
    return (
      <span className="text-[10px] font-bold uppercase tracking-wide text-white bg-green-500 rounded-full px-3 py-1 inline-flex items-center gap-1.5">
        {label}
        <span className="w-1.5 h-1.5 bg-white rounded-full" />
      </span>
    );
  }
  if (type === "tomorrow") {
    return (
      <span className="text-[10px] font-bold uppercase tracking-wide text-white bg-yellow-400 rounded-full px-3 py-1 inline-flex items-center gap-1.5">
        {label}
        <span className="w-1.5 h-1.5 bg-white rounded-full" />
      </span>
    );
  }
  return (
    <span className="text-[10px] font-semibold text-gray-500 border border-gray-200 rounded-full px-3 py-1">
      {label}
    </span>
  );
}

export default function LessonsPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-gray-100 flex flex-col">
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Navbar */}
      <LandingNavbar onOpenModal={() => setIsBookingOpen(true)} />

      {/* Content */}
      <main className="max-w-6xl mx-auto w-full px-4 md:px-6 pt-20 pb-16 flex-1 ">
        <p className="text-sm text-gray-400 mb-2">Занятия</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Ваши занятия</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {mockLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-5"
            >
              {/* Top row: time + label */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-gray-500 border border-gray-200 rounded-full px-3 py-1 uppercase tracking-wide">
                  {lesson.time}
                </span>
                <LessonBadge label={lesson.label} type={lesson.labelType} />
              </div>

              {/* Name */}
              <div>
                <p className="text-xs text-gray-400 mb-1">{lesson.role}</p>
                <h3 className="text-xl font-bold text-gray-900">
                  {lesson.name}
                </h3>
              </div>

              {/* Google Meet button */}
              <a
                href={lesson.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-fit"
              >
                <span className="bg-[#333] text-white text-xs font-semibold px-4 py-2 rounded-full">
                  Google meet
                </span>
                <span className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <ArrowRight size={14} className="text-gray-600" />
                </span>
              </a>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
