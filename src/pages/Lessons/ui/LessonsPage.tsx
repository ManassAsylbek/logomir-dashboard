import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { LandingNavbar } from "../../Landing/ui/components/LandingNavbar";
import { LandingFooter } from "../../Landing/ui/components/LandingFooter";
import { BookingModal } from "../../Landing/ui/components/BookingModal";
import { useLessons } from "../../../shared/services/lessons/useLessons";
import type { Lesson } from "../../../shared/api/lessons/types";

// ─── helpers ────────────────────────────────────────────────────────────────

function formatTime(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

type LabelType = "today" | "tomorrow" | "date";

function getDateLabel(iso: string | null): { label: string; type: LabelType } {
  if (!iso) return { label: "—", type: "date" };
  const lessonDate = new Date(iso);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (isSameDay(lessonDate, today)) return { label: "СЕГОДНЯ", type: "today" };
  if (isSameDay(lessonDate, tomorrow))
    return { label: "ЗАВТРА", type: "tomorrow" };

  const label = lessonDate.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return { label, type: "date" };
}

// ─── badge component ─────────────────────────────────────────────────────────

function LessonBadge({ label, type }: { label: string; type: LabelType }) {
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

// ─── card component ───────────────────────────────────────────────────────────

function LessonCard({ lesson }: { lesson: Lesson }) {
  const { label, type } = getDateLabel(lesson.start_time);

  const timeRange =
    lesson.start_time && lesson.end_time
      ? `С ${formatTime(lesson.start_time)} ПО ${formatTime(lesson.end_time)}`
      : "—";

  const displayName = lesson.name ?? `Занятие #${lesson.id}`;
  const lessonTypeLabel =
    lesson.lesson_type === "online" ? "Онлайн" : (lesson.lesson_type ?? "—");
  const branchLabel = lesson.branch_name ?? lessonTypeLabel;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-5">
      {/* Top row: time + label */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold text-gray-500 border border-gray-200 rounded-full px-3 py-1 uppercase tracking-wide">
          {timeRange}
        </span>
        <LessonBadge label={label} type={type} />
      </div>

      {/* Name */}
      <div>
        <p className="text-xs text-gray-400 mb-1">{branchLabel}</p>
        <h3 className="text-xl font-bold text-gray-900">{displayName}</h3>
        {lesson.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {lesson.description}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        {lesson.record_file ? (
          <a
            href={lesson.record_file}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 w-fit"
          >
            <span className="bg-[#333] text-white text-xs font-semibold px-4 py-2 rounded-full">
              Запись занятия
            </span>
            <span className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ArrowRight size={14} className="text-gray-600" />
            </span>
          </a>
        ) : (
          <span className="text-xs text-gray-400 italic">
            Запись недоступна
          </span>
        )}
      </div>
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function LessonsPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { data, isLoading, isError } = useLessons();

  const lessons = data?.results ?? [];

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-gray-100 flex flex-col">
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Navbar */}
      <LandingNavbar onOpenModal={() => setIsBookingOpen(true)} />

      {/* Content */}
      <main className="max-w-6xl mx-auto w-full px-4 md:px-6 pt-20 pb-16 flex-1">
        <p className="text-sm text-gray-400 mb-2">Занятия</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Ваши занятия</h1>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <span className="text-gray-400">Загрузка...</span>
          </div>
        )}

        {isError && (
          <div className="flex justify-center items-center py-20">
            <span className="text-red-400">
              Не удалось загрузить занятия. Попробуйте позже.
            </span>
          </div>
        )}

        {!isLoading && !isError && lessons.length === 0 && (
          <div className="flex justify-center items-center py-20">
            <span className="text-gray-400">У вас пока нет занятий.</span>
          </div>
        )}

        {!isLoading && !isError && lessons.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
