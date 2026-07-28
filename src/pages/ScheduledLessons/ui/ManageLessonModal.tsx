import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import type { Lesson, LessonType } from "@/shared/api/lessons/types";
import { useTimeSlots } from "@/shared/services/timeSlots/useTimeSlots";
import { useBranches } from "@/shared/services/branches/useBranches";
import { useRescheduleLesson } from "@/shared/services/lessons/useRescheduleLesson";
import { useChangeLessonType } from "@/shared/services/lessons/useChangeLessonType";
import { useChangeLessonBranch } from "@/shared/services/lessons/useChangeLessonBranch";
import { useDeleteLesson } from "@/shared/services/lessons/useDeleteLesson";

type TabKey = "reschedule" | "type" | "branch" | "delete";

interface ManageLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson | null;
}

function formatSlot(start: string | null, end: string | null): string {
  if (!start) return "—";
  const s = new Date(start);
  const date = s.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
  });
  const startStr = s.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endStr = end
    ? new Date(end).toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return endStr ? `${date} ${startStr}–${endStr}` : `${date} ${startStr}`;
}

export default function ManageLessonModal({
  isOpen,
  onClose,
  lesson,
}: ManageLessonModalProps) {
  const { t } = useTranslation();

  const specialistId = lesson?.specialist_id ?? undefined;

  const [activeTab, setActiveTab] = useState<TabKey>("reschedule");
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [newType, setNewType] = useState<LessonType>("online");
  const [typeBranch, setTypeBranch] = useState<number | null>(null);
  const [newBranch, setNewBranch] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (lesson) {
      setActiveTab("reschedule");
      setNewType((lesson.lesson_type as LessonType) ?? "online");
      setTypeBranch(lesson.branch ?? null);
      setNewBranch(lesson.branch ?? null);
      setSelectedSlot(null);
      setConfirmDelete(false);
    }
  }, [lesson]);

  const { data: slotsData, isLoading: slotsLoading } = useTimeSlots(
    {
      specialist: specialistId,
      is_booked: false,
    },
    Boolean(specialistId) && isOpen,
  );
  const { data: branchesData, isLoading: branchesLoading } = useBranches();

  const slots = slotsData?.results ?? [];
  const branches = branchesData?.results ?? [];

  const reschedule = useRescheduleLesson();
  const changeType = useChangeLessonType();
  const changeBranch = useChangeLessonBranch();
  const remove = useDeleteLesson();

  const isOffline = newType === "offline";

  const branchOptions = useMemo(
    () =>
      branches.map((b) => (
        <option key={b.id} value={b.id}>
          {b.name ?? `Филиал #${b.id}`}
        </option>
      )),
    [branches],
  );

  if (!lesson) return null;

  const handleReschedule = () => {
    if (!selectedSlot) return;
    reschedule.mutate(
      { id: lesson.id, time_slot: selectedSlot },
      { onSuccess: onClose },
    );
  };

  const handleChangeType = () => {
    if (newType === "offline" && !typeBranch) return;

    const payload =
      newType === "offline"
        ? {
            id: lesson.id,
            lesson_type: newType,
            branch: typeBranch as number,
          }
        : { id: lesson.id, lesson_type: newType };

    changeType.mutate(payload, { onSuccess: onClose });
  };

  const handleChangeBranch = () => {
    if (!newBranch) return;
    changeBranch.mutate(
      { id: lesson.id, branch: newBranch },
      { onSuccess: onClose },
    );
  };

  const handleDelete = () => {
    remove.mutate(lesson.id, { onSuccess: onClose });
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: "reschedule", label: t("lessons.manage.reschedule") },
    { key: "type", label: t("lessons.manage.changeType") },
    { key: "branch", label: t("lessons.manage.changeBranch") },
    { key: "delete", label: t("lessons.manage.delete") },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="px-6 py-5 border-b text-xl font-medium flex flex-col items-start gap-1">
              <span>{lesson.name ?? `Урок #${lesson.id}`}</span>
              <span className="text-sm text-gray-500 font-normal">
                {formatSlot(lesson.start_time, lesson.end_time)}
                {lesson.branch_name ? ` · ${lesson.branch_name}` : ""}
                {lesson.lesson_type ? ` · ${lesson.lesson_type}` : ""}
              </span>
            </ModalHeader>

            <ModalBody className="px-6 py-5">
              <div className="flex gap-2 border-b border-gray-200 mb-4 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-3 pb-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.key
                        ? "border-[#22bb79] text-[#0e6b3f]"
                        : "border-transparent text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === "reschedule" && (
                <div className="flex flex-col gap-3">
                  {!specialistId && (
                    <p className="text-sm text-gray-500">
                      {t("lessons.manage.noSpecialist")}
                    </p>
                  )}
                  {specialistId && slotsLoading && (
                    <div className="flex justify-center py-6">
                      <Spinner />
                    </div>
                  )}
                  {specialistId && !slotsLoading && slots.length === 0 && (
                    <p className="text-sm text-gray-500">
                      {t("lessons.manage.noSlots")}
                    </p>
                  )}
                  {specialistId && !slotsLoading && slots.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[320px] overflow-auto">
                      {slots.map((slot) => {
                        const active = selectedSlot === slot.id;

                        return (
                          <button
                            key={slot.id}
                            type="button"
                            className={`text-sm p-2 rounded-lg border transition-colors ${
                              active
                                ? "border-[#22bb79] bg-[#e7f9f0] text-[#0e6b3f]"
                                : "border-gray-200 bg-white hover:border-gray-400"
                            }`}
                            onClick={() => setSelectedSlot(slot.id)}
                          >
                            {formatSlot(slot.start_time, slot.end_time)}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  <div className="flex justify-end gap-2 pt-3">
                    <Button
                      className="bg-[#2d2d2d] text-white rounded-full px-6"
                      isDisabled={!selectedSlot}
                      isLoading={reschedule.isPending}
                      onPress={handleReschedule}
                    >
                      {t("lessons.manage.applyReschedule")}
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "type" && (
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-medium text-gray-700">
                    {t("lessons.createModal.lessonType")}
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as LessonType)}
                    className="w-full h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm"
                  >
                    <option value="online">
                      {t("lessons.createModal.online")}
                    </option>
                    <option value="offline">
                      {t("lessons.createModal.offline")}
                    </option>
                  </select>

                  {isOffline && (
                    <>
                      <label className="text-sm font-medium text-gray-700">
                        {t("lessons.manage.branch")}
                      </label>
                      <select
                        value={typeBranch ?? ""}
                        onChange={(e) =>
                          setTypeBranch(
                            e.target.value ? Number(e.target.value) : null,
                          )
                        }
                        className="w-full h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm"
                      >
                        <option value="">
                          {branchesLoading
                            ? t("lessons.manage.loading")
                            : t("lessons.manage.selectBranch")}
                        </option>
                        {branchOptions}
                      </select>
                    </>
                  )}

                  <div className="flex justify-end pt-3">
                    <Button
                      className="bg-[#2d2d2d] text-white rounded-full px-6"
                      isLoading={changeType.isPending}
                      isDisabled={isOffline && !typeBranch}
                      onPress={handleChangeType}
                    >
                      {t("lessons.manage.applyType")}
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "branch" && (
                <div className="flex flex-col gap-3">
                  {lesson.lesson_type !== "offline" ? (
                    <p className="text-sm text-gray-500">
                      {t("lessons.manage.onlyOffline")}
                    </p>
                  ) : (
                    <>
                      <label className="text-sm font-medium text-gray-700">
                        {t("lessons.manage.branch")}
                      </label>
                      <select
                        value={newBranch ?? ""}
                        onChange={(e) =>
                          setNewBranch(
                            e.target.value ? Number(e.target.value) : null,
                          )
                        }
                        className="w-full h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm"
                      >
                        <option value="">
                          {branchesLoading
                            ? t("lessons.manage.loading")
                            : t("lessons.manage.selectBranch")}
                        </option>
                        {branchOptions}
                      </select>
                      <div className="flex justify-end pt-3">
                        <Button
                          className="bg-[#2d2d2d] text-white rounded-full px-6"
                          isLoading={changeBranch.isPending}
                          isDisabled={
                            !newBranch || newBranch === lesson.branch
                          }
                          onPress={handleChangeBranch}
                        >
                          {t("lessons.manage.applyBranch")}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === "delete" && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-gray-600">
                    {t("lessons.manage.deleteWarning")}
                  </p>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={confirmDelete}
                      onChange={(e) => setConfirmDelete(e.target.checked)}
                    />
                    {t("lessons.manage.deleteConfirm")}
                  </label>
                  <div className="flex justify-end pt-3">
                    <Button
                      color="danger"
                      className="rounded-full px-6"
                      isLoading={remove.isPending}
                      isDisabled={!confirmDelete}
                      onPress={handleDelete}
                    >
                      {t("lessons.manage.deleteAction")}
                    </Button>
                  </div>
                </div>
              )}
            </ModalBody>

            <ModalFooter className="px-6 pb-5 border-t flex justify-end">
              <Button
                variant="light"
                onPress={onClose}
                className="rounded-full text-gray-600 px-6"
              >
                {t("lessons.createModal.cancel")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
