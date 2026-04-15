import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import { ArrowRight, Download, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import AddCommentModal from "./AddCommentModal";
import { CreateLessonModal } from "./CreateLessonModal";
import { useLessons } from "@/shared/services/lessons/useLessons";
import type { Lesson } from "@/shared/api/lessons/types";
import { useTranslation } from "react-i18next";

function formatTime(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateRange(start: string | null, end: string | null): string {
  if (!start) return "—";
  const startStr = formatTime(start);
  const endStr = end ? formatTime(end) : "";
  return endStr ? `С ${startStr} ПО ${endStr}` : `С ${startStr}`;
}

function getLessonTypeLabel(lesson: Lesson): string {
  if (!lesson.lesson_type) return "";
  return lesson.lesson_type === "online"
    ? "ОНЛАЙН"
    : lesson.lesson_type.toUpperCase();
}

export default function ScheduledLessonsPage() {
  const { t } = useTranslation();
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useLessons();
  const lessons = data?.results ?? [];

  const filtered = useMemo(() => {
    if (!search.trim()) return lessons;
    const q = search.toLowerCase();
    return lessons.filter(
      (l) =>
        (l.name ?? "").toLowerCase().includes(q) ||
        (l.branch_name ?? "").toLowerCase().includes(q),
    );
  }, [lessons, search]);

  const handleOpenModal = (lessonId: number) => {
    setSelectedLesson(lessonId);
  };

  const handleCloseModal = () => {
    setSelectedLesson(null);
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Search */}
        <div className="flex items-center justify-between gap-4">
          <Input
            placeholder={t("lessons.search")}
            startContent={<Search className="text-default-400" size={20} />}
            className="max-w-4xl"
            classNames={{ inputWrapper: "bg-white" }}
            variant="bordered"
            size="lg"
            radius="full"
            value={search}
            onValueChange={setSearch}
          />
          <Button
            size="lg"
            radius="full"
            className="bg-[#2d2d2d] text-white pr-2 shrink-0"
            startContent={<Plus size={18} />}
            endContent={
              <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-gray-800" />
              </div>
            }
            onPress={() => setIsCreateOpen(true)}
          >
            {t("lessons.addLesson")}
          </Button>
        </div>

        <h1 className="text-3xl font-medium">{t("lessons.title")}</h1>

        {isLoading && (
          <div className="flex justify-center py-16">
            <Spinner size="lg" />
          </div>
        )}

        {isError && (
          <div className="flex justify-center py-16 text-red-400">
            {t("lessons.loadError")}
          </div>
        )}

        {!isLoading && !isError && filtered.length === 0 && (
          <div className="flex justify-center py-16 text-gray-400">
            {t("lessons.notFound")}
          </div>
        )}

        {!isLoading && !isError && filtered.length > 0 && (
          <div className="flex flex-row flex-wrap gap-4">
            {filtered.map((lesson) => (
              <Card
                key={lesson.id}
                className="bg-white shadow-sm w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
              >
                <CardBody className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs px-3 py-1 bg-white rounded-full border border-gray-200">
                        {formatDateRange(lesson.start_time, lesson.end_time)}
                      </span>
                      {getLessonTypeLabel(lesson) && (
                        <span className="text-xs px-3 py-1 bg-white rounded-full border border-gray-200">
                          {getLessonTypeLabel(lesson)}
                        </span>
                      )}
                      {lesson.branch_name && (
                        <span className="text-xs px-3 py-1 bg-white rounded-full border border-gray-200">
                          {lesson.branch_name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-500">
                      {(lesson.name ?? "?")[0].toUpperCase()}
                    </div>
                    <h3 className="text-lg font-medium">
                      {lesson.name ?? `Занятие #${lesson.id}`}
                    </h3>
                  </div>

                  {lesson.description && (
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {lesson.description}
                    </p>
                  )}

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">
                        {lesson.user_tariff ?? 0}/33
                      </span>
                    </div>
                    <Progress
                      value={((lesson.user_tariff ?? 0) / 33) * 100}
                      color="success"
                      size="md"
                      className="max-w-[200px]"
                    />
                  </div>

                  <div className="flex gap-3">
                    {lesson.record_file ? (
                      <Button
                        as="a"
                        href={lesson.record_file}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="md"
                        radius="full"
                        className="bg-[#2d2d2d] text-white flex-1 flex justify-between"
                        endContent={
                          <div className="absolute right-2 w-7 h-7 bg-green-400 rounded-full flex items-center justify-center">
                            <ArrowRight className="w-4 h-4 text-gray-800" />
                          </div>
                        }
                      >
                        {t("lessons.record")}
                      </Button>
                    ) : (
                      <Button
                        size="md"
                        radius="full"
                        isDisabled
                        className="bg-[#2d2d2d] text-white flex-1 flex justify-between opacity-50"
                        endContent={
                          <div className="absolute right-2 w-7 h-7 bg-green-400 rounded-full flex items-center justify-center">
                            <ArrowRight className="w-4 h-4 text-gray-800" />
                          </div>
                        }
                      >
                        {t("lessons.googleMeet")}
                      </Button>
                    )}
                    <Button
                      size="md"
                      radius="full"
                      variant="bordered"
                      className="bg-white border-gray-300 flex-1"
                      onPress={() => handleOpenModal(lesson.id)}
                    >
                      {t("lessons.addNote")}
                    </Button>
                    <Button
                      size="md"
                      radius="full"
                      isIconOnly
                      className="bg-[#22bb79] text-white min-w-[44px]"
                      isDisabled={!lesson.record_file}
                      as={lesson.record_file ? "a" : "button"}
                      href={lesson.record_file ?? undefined}
                    >
                      <Download size={20} />
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AddCommentModal
        isOpen={selectedLesson !== null}
        onClose={handleCloseModal}
        lessonId={selectedLesson}
      />

      <CreateLessonModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </>
  );
}
