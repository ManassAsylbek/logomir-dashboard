import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteLesson } from "@/shared/api/lessons/deleteLesson";

import { KEYS_LESSONS } from "../keys";

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation<void, any, number>({
    mutationFn: async (id) => {
      await deleteLesson(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS_LESSONS.lessons] });
      toast.success("Урок удалён");
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.detail ?? "Не удалось удалить урок";

      toast.error(msg);
    },
  });
};
