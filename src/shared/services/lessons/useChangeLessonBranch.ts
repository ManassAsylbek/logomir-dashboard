import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { changeLessonBranch } from "@/shared/api/lessons/changeLessonBranch";
import { ChangeLessonBranchRequest, Lesson } from "@/shared/api/lessons/types";

import { KEYS_LESSONS } from "../keys";

interface Variables extends ChangeLessonBranchRequest {
  id: number;
}

export const useChangeLessonBranch = () => {
  const queryClient = useQueryClient();

  return useMutation<Lesson, any, Variables>({
    mutationFn: async ({ id, ...data }) => {
      const response = await changeLessonBranch(id, data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS_LESSONS.lessons] });
      toast.success("Филиал урока обновлён");
    },
    onError: (error: any) => {
      const data = error?.response?.data;
      const msg =
        data?.branch ??
        data?.detail ??
        "Не удалось сменить филиал";

      toast.error(typeof msg === "string" ? msg : "Не удалось сменить филиал");
    },
  });
};
