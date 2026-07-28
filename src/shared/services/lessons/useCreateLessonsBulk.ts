import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createLessonsBulk } from "@/shared/api/lessons/createLessonsBulk";
import {
  BulkCreateLessonsRequest,
  BulkCreateLessonsResponse,
} from "@/shared/api/lessons/types";

import { KEYS_LESSONS, KEYS_TIME_SLOTS, KEYS_USER_TARIFFS } from "../keys";

export const useCreateLessonsBulk = () => {
  const queryClient = useQueryClient();

  return useMutation<
    BulkCreateLessonsResponse,
    any,
    BulkCreateLessonsRequest
  >({
    mutationFn: async (data) => {
      const response = await createLessonsBulk(data);

      return response.data;
    },
    onSuccess: (result, variables) => {
      queryClient.invalidateQueries({ queryKey: [KEYS_LESSONS.lessons] });
      queryClient.invalidateQueries({ queryKey: [KEYS_TIME_SLOTS.timeSlots] });
      queryClient.invalidateQueries({
        queryKey: [KEYS_USER_TARIFFS.list, variables.user],
      });
      toast.success(`Создано занятий: ${result.created}`);
    },
    onError: (error: any) => {
      const data = error?.response?.data;
      const msg =
        data?.time_slots ??
        data?.user_tariff ??
        data?.detail ??
        data?.non_field_errors?.[0] ??
        "Не удалось записать на занятия";

      toast.error(
        typeof msg === "string" ? msg : "Не удалось записать на занятия",
      );
    },
  });
};
