import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { rescheduleLesson } from "@/shared/api/lessons/rescheduleLesson";
import { Lesson, RescheduleLessonRequest } from "@/shared/api/lessons/types";

import { KEYS_LESSONS, KEYS_TIME_SLOTS } from "../keys";

interface Variables extends RescheduleLessonRequest {
  id: number;
}

export const useRescheduleLesson = () => {
  const queryClient = useQueryClient();

  return useMutation<Lesson, any, Variables>({
    mutationFn: async ({ id, ...data }) => {
      const response = await rescheduleLesson(id, data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS_LESSONS.lessons] });
      queryClient.invalidateQueries({ queryKey: [KEYS_TIME_SLOTS.timeSlots] });
      toast.success("Урок перенесён");
    },
    onError: (error: any) => {
      const data = error?.response?.data;
      const msg =
        data?.time_slot ??
        data?.detail ??
        data?.non_field_errors?.[0] ??
        "Не удалось перенести урок";

      toast.error(typeof msg === "string" ? msg : "Не удалось перенести урок");
    },
  });
};
