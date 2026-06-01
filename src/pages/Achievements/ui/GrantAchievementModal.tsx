import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import { useEffect, useMemo, useState } from "react";

import { Achievement } from "@/shared/api/achievements/types";
import { useAchievements } from "@/shared/services/achievements/useAchievements";
import { useUserAchievements } from "@/shared/services/achievements/useUserAchievements";
import { useCreateUserAchievement } from "@/shared/services/achievements/useCreateUserAchievement";
import { useStudents } from "@/shared/services/students/useStudents";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  /** Pre-pick a student (when opened from a row action) */
  initialStudentId?: number | null;
  /** Pre-pick an achievement (when opened from a catalog row "Grant") */
  initialAchievement?: Achievement | null;
}

export default function GrantAchievementModal({
  isOpen,
  onClose,
  initialStudentId,
  initialAchievement,
}: Props) {
  const [studentId, setStudentId] = useState<number | null>(null);
  const [achievementId, setAchievementId] = useState<number | null>(null);
  const [lessonId, setLessonId] = useState<string>("");
  const [comment, setComment] = useState("");

  const { data: studentsData } = useStudents();
  const { data: achievements = [], isLoading: achievementsLoading } =
    useAchievements();
  const { data: userAchievements = [] } = useUserAchievements(
    { user: studentId ?? undefined },
    Boolean(studentId) && isOpen,
  );

  const grant = useCreateUserAchievement();

  useEffect(() => {
    if (!isOpen) return;
    setStudentId(initialStudentId ?? null);
    setAchievementId(initialAchievement?.id ?? null);
    setLessonId("");
    setComment("");
  }, [isOpen, initialStudentId, initialAchievement]);

  const grantedIds = useMemo(
    () => new Set(userAchievements.map((ua) => ua.achievement)),
    [userAchievements],
  );

  const availableAchievements = useMemo(
    () => achievements.filter((a) => !grantedIds.has(a.id)),
    [achievements, grantedIds],
  );

  const handleSubmit = () => {
    if (!studentId || !achievementId) return;
    grant.mutate(
      {
        user: studentId,
        achievement: achievementId,
        ...(lessonId ? { lesson: Number(lessonId) } : {}),
        ...(comment.trim() ? { comment: comment.trim() } : {}),
      },
      { onSuccess: () => onClose() },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="px-6 py-5 border-b text-xl font-medium">
              Выдать ачивку ученику
            </ModalHeader>

            <ModalBody className="px-6 py-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Ученик
                </label>
                <select
                  value={studentId ?? ""}
                  onChange={(e) => {
                    setStudentId(e.target.value ? Number(e.target.value) : null);
                    setAchievementId(null);
                  }}
                  className="w-full h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm"
                >
                  <option value="">— Выберите ученика —</option>
                  {studentsData?.results?.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.full_name || s.username}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Ачивка{" "}
                  {studentId &&
                    grantedIds.size > 0 &&
                    `(скрыто уже выданных: ${grantedIds.size})`}
                </label>
                {achievementsLoading ? (
                  <div className="flex justify-center py-6">
                    <Spinner size="sm" />
                  </div>
                ) : availableAchievements.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    {studentId
                      ? "Все ачивки уже выданы этому ученику."
                      : "Каталог ачивок пуст."}
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[280px] overflow-auto">
                    {availableAchievements.map((a) => {
                      const active = achievementId === a.id;

                      return (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => setAchievementId(a.id)}
                          className={`flex items-center gap-2 p-2 rounded-xl border-2 text-left transition-colors ${
                            active
                              ? "border-[#22bb79] bg-[#e7f9f0]"
                              : "border-gray-200 bg-white hover:border-gray-400"
                          }`}
                        >
                          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
                            {a.icon ? (
                              <img
                                src={a.icon}
                                alt={a.name}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <span className="text-xs text-gray-400">🏆</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-gray-800 truncate">
                              {a.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {a.points} б.
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <Input
                label="ID занятия (опционально)"
                placeholder="Например, 12"
                type="number"
                value={lessonId}
                onValueChange={setLessonId}
                size="lg"
                variant="bordered"
                classNames={{ inputWrapper: "bg-white" }}
              />

              <Textarea
                label="Комментарий"
                placeholder="Например, «Молодец, отлично справился!»"
                value={comment}
                onValueChange={setComment}
                minRows={2}
                variant="bordered"
                classNames={{ inputWrapper: "bg-white" }}
              />
            </ModalBody>

            <ModalFooter className="px-6 pb-5 border-t flex justify-end gap-2">
              <Button
                variant="light"
                onPress={onClose}
                className="rounded-full text-gray-600 px-6"
              >
                Отмена
              </Button>
              <Button
                className="bg-[#2d2d2d] text-white rounded-full px-6"
                isDisabled={!studentId || !achievementId}
                isLoading={grant.isPending}
                onPress={handleSubmit}
              >
                Выдать
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
