import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { KEYS_LESSONS } from "../keys";

import { createLesson } from "@/shared/api/lessons/createLesson";
import { CreateLessonRequest, Lesson } from "@/shared/api/lessons/types";

export const useCreateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation<Lesson, unknown, CreateLessonRequest>({
    mutationFn: async (data) => {
      const response = await createLesson(data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS_LESSONS.lessons] });
      toast.success("Урок успешно создан");
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.detail ??
        error?.response?.data?.non_field_errors?.[0] ??
        "Ошибка при создании урока";

      toast.error(msg);
    },
  });
};
