import {
  BulkCreateLessonsRequest,
  LessonType,
} from "@/shared/api/lessons/types";

export interface BulkPayloadInput {
  user: number;
  lessonType: LessonType;
  branch: number | null;
  deductTariff: number | null;
  timeSlots: number[];
  name: string;
}

export const buildBulkLessonsPayload = ({
  user,
  lessonType,
  branch,
  deductTariff,
  timeSlots,
  name,
}: BulkPayloadInput): BulkCreateLessonsRequest => {
  const isOffline = lessonType === "offline";

  return {
    user,
    ...(deductTariff ? { user_tariff: deductTariff } : {}),
    lesson_type: lessonType,
    ...(isOffline ? { branch } : {}),
    time_slots: timeSlots,
    name: name.trim() || "Курс",
  };
};
