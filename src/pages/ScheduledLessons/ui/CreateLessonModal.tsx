import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { useCreateLesson } from "@/shared/services/lessons/useCreateLesson";
import { useStudents } from "@/shared/services/students/useStudents";
import { useSpecialists } from "@/shared/services/specialists/useSpecialists";
import { useBranches } from "@/shared/services/branches/useBranches";
import { useTimeSlots } from "@/shared/services/timeSlots/useTimeSlots";
import type { CreateLessonRequest } from "@/shared/api/lessons/types";
import { useTranslation } from "react-i18next";

interface FormData {
  name: string;
  user: string;
  specialist: string;
  lesson_type: "online" | "offline";
  description: string;
  user_tariff: string;
  time_slot: string;
  branch: string;
}

interface CreateLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export function CreateLessonModal({ isOpen, onClose }: CreateLessonModalProps) {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      user: "",
      specialist: "",
      lesson_type: "online",
      description: "",
      user_tariff: "",
      time_slot: "",
      branch: "",
    },
  });

  const lessonType = useWatch({ control, name: "lesson_type" });
  const specialistId = useWatch({ control, name: "specialist" });

  const { mutate: createLesson, isPending } = useCreateLesson();
  const { data: studentsData } = useStudents();
  const { data: specialistsData } = useSpecialists();
  const { data: branchesData, isLoading: branchesLoading } = useBranches();
  const specialistNum = specialistId ? Number(specialistId) : undefined;
  const { data: slotsData, isLoading: slotsLoading } = useTimeSlots(
    {
      specialist: specialistNum,
      is_booked: false,
    },
    Boolean(specialistNum) && isOpen,
  );

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  useEffect(() => {
    setValue("time_slot", "");
  }, [specialistId, setValue]);

  const isOffline = lessonType === "offline";

  const branchOptions = useMemo(
    () =>
      branchesData?.results?.map((b) => (
        <option key={b.id} value={b.id}>
          {b.name ?? `Филиал #${b.id}`}
        </option>
      )) ?? [],
    [branchesData],
  );

  const onSubmit = (data: FormData) => {
    const payload: CreateLessonRequest = {
      name: data.name,
      user: Number(data.user),
      lesson_type: data.lesson_type,
      ...(data.description && { description: data.description }),
      ...(data.user_tariff && { user_tariff: Number(data.user_tariff) }),
      ...(data.time_slot && { time_slot: Number(data.time_slot) }),
      ...(isOffline && data.branch && { branch: Number(data.branch) }),
    };

    createLesson(payload, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="px-6 py-5 border-b text-xl font-medium">
              {t("lessons.createModal.title")}
            </ModalHeader>

            <ModalBody className="px-6 py-5 flex flex-col gap-4">
              {/* Название */}
              <Controller
                name="name"
                control={control}
                rules={{ required: t("lessons.createModal.nameRequired") }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={t("lessons.createModal.name")}
                    placeholder={t("lessons.createModal.namePlaceholder")}
                    size="lg"
                    variant="bordered"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                    classNames={{ inputWrapper: "bg-white" }}
                  />
                )}
              />

              {/* Ученик */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  {t("lessons.createModal.student")}
                </label>
                <Controller
                  name="user"
                  control={control}
                  rules={{ required: t("lessons.createModal.studentRequired") }}
                  render={({ field }) => (
                    <div>
                      <select
                        {...field}
                        className={`w-full h-12 rounded-xl border px-3 text-sm bg-white ${
                          errors.user ? "border-danger-400" : "border-gray-300"
                        }`}
                      >
                        <option value="">
                          {t("lessons.createModal.selectStudent")}
                        </option>
                        {studentsData?.results?.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.full_name || s.username}
                          </option>
                        ))}
                      </select>
                      {errors.user && (
                        <p className="text-danger text-xs mt-1">
                          {errors.user.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              {/* Специалист */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  {t("lessons.createModal.specialist")}
                </label>
                <Controller
                  name="specialist"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm"
                    >
                      <option value="">
                        {t("lessons.createModal.selectSpecialist")}
                      </option>
                      {specialistsData?.results?.map((sp) => (
                        <option key={sp.id} value={sp.id}>
                          {[sp.name, sp.last_name].filter(Boolean).join(" ") ||
                            `#${sp.id}`}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>

              {/* Тип урока */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  {t("lessons.createModal.lessonType")}
                </label>
                <Controller
                  name="lesson_type"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm"
                    >
                      <option value="online">
                        {t("lessons.createModal.online")}
                      </option>
                      <option value="offline">
                        {t("lessons.createModal.offline")}
                      </option>
                    </select>
                  )}
                />
              </div>

              {/* Филиал — только для оффлайн */}
              {isOffline && (
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    {t("lessons.createModal.branch")}
                  </label>
                  <Controller
                    name="branch"
                    control={control}
                    rules={{
                      validate: (v) =>
                        !isOffline || !!v || t("lessons.createModal.branchRequired"),
                    }}
                    render={({ field }) => (
                      <div>
                        <select
                          {...field}
                          className={`w-full h-12 rounded-xl border px-3 text-sm bg-white ${
                            errors.branch
                              ? "border-danger-400"
                              : "border-gray-300"
                          }`}
                        >
                          <option value="">
                            {branchesLoading
                              ? t("lessons.manage.loading")
                              : t("lessons.createModal.selectBranch")}
                          </option>
                          {branchOptions}
                        </select>
                        {errors.branch && (
                          <p className="text-danger text-xs mt-1">
                            {errors.branch.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              )}

              {/* Описание */}
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={t("lessons.createModal.description")}
                    placeholder={t(
                      "lessons.createModal.descriptionPlaceholder",
                    )}
                    size="lg"
                    variant="bordered"
                    classNames={{ inputWrapper: "bg-white" }}
                  />
                )}
              />

              {/* Слот времени — выбор из списка по специалисту */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  {t("lessons.createModal.timeSlot")}
                </label>
                {!specialistNum ? (
                  <p className="text-xs text-gray-500">
                    {t("lessons.createModal.selectSpecialist")}
                  </p>
                ) : slotsLoading ? (
                  <div className="flex items-center gap-2">
                    <Spinner size="sm" />
                    <span className="text-xs text-gray-500">
                      {t("lessons.createModal.loadingSlots")}
                    </span>
                  </div>
                ) : (slotsData?.results?.length ?? 0) === 0 ? (
                  <p className="text-xs text-gray-500">
                    {t("lessons.createModal.noSlots")}
                  </p>
                ) : (
                  <Controller
                    name="time_slot"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm"
                      >
                        <option value="">
                          {t("lessons.createModal.selectSlot")}
                        </option>
                        {slotsData?.results?.map((slot) => (
                          <option key={slot.id} value={slot.id}>
                            {formatSlot(slot.start_time, slot.end_time)}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                )}
              </div>

              {/* Тариф */}
              <Controller
                name="user_tariff"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={t("lessons.createModal.tariff")}
                    placeholder={t("lessons.createModal.tariffPlaceholder")}
                    type="number"
                    size="lg"
                    variant="bordered"
                    classNames={{ inputWrapper: "bg-white" }}
                  />
                )}
              />
            </ModalBody>

            <ModalFooter className="px-6 pb-5 border-t flex justify-end gap-3">
              <Button
                variant="light"
                onPress={onClose}
                className="rounded-full text-gray-600 px-6"
              >
                {t("lessons.createModal.cancel")}
              </Button>
              <Button
                className="bg-[#2d2d2d] text-white rounded-full px-8"
                isLoading={isPending}
                onPress={() => handleSubmit(onSubmit)()}
              >
                {t("lessons.createModal.submit")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
