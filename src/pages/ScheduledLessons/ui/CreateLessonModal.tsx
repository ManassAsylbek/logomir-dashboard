import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useCreateLesson } from "@/shared/services/lessons/useCreateLesson";
import { useStudents } from "@/shared/services/students/useStudents";
import type { CreateLessonRequest } from "@/shared/api/lessons/types";
import { useTranslation } from "react-i18next";

interface FormData {
  name: string;
  user: string;
  lesson_type: "online" | "offline";
  description: string;
  user_tariff: string;
  time_slot: string;
}

interface CreateLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateLessonModal({ isOpen, onClose }: CreateLessonModalProps) {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      user: "",
      lesson_type: "online",
      description: "",
      user_tariff: "",
      time_slot: "",
    },
  });

  const { mutate: createLesson, isPending } = useCreateLesson();
  const { data: studentsData } = useStudents();

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = (data: FormData) => {
    const payload: CreateLessonRequest = {
      name: data.name,
      user: Number(data.user),
      lesson_type: data.lesson_type,
      ...(data.description && { description: data.description }),
      ...(data.user_tariff && { user_tariff: Number(data.user_tariff) }),
      ...(data.time_slot && { time_slot: Number(data.time_slot) }),
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

              <div className="grid grid-cols-2 gap-3">
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

                {/* Слот */}
                <Controller
                  name="time_slot"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label={t("lessons.createModal.timeSlot")}
                      placeholder={t("lessons.createModal.timeSlotPlaceholder")}
                      type="number"
                      size="lg"
                      variant="bordered"
                      classNames={{ inputWrapper: "bg-white" }}
                    />
                  )}
                />
              </div>
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
