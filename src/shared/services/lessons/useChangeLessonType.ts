import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { changeLessonType } from "@/shared/api/lessons/changeLessonType";
import { ChangeLessonTypeRequest, Lesson } from "@/shared/api/lessons/types";

import { KEYS_LESSONS } from "../keys";

interface Variables extends ChangeLessonTypeRequest {
  id: number;
}

export const useChangeLessonType = () => {
  const queryClient = useQueryClient();

  return useMutation<Lesson, any, Variables>({
    mutationFn: async ({ id, ...data }) => {
      const response = await changeLessonType(id, data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS_LESSONS.lessons] });
      toast.success("Тип урока изменён");
    },
    onError: (error: any) => {
      const data = error?.response?.data;
      const msg =
        data?.branch ??
        data?.lesson_type ??
        data?.detail ??
        "Не удалось сменить тип урока";

      toast.error(typeof msg === "string" ? msg : "Не удалось сменить тип урока");
    },
  });
};
