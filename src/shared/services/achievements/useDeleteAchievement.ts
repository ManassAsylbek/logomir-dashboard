import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteAchievement } from "@/shared/api/achievements/deleteAchievement";

import { KEYS_ACHIEVEMENTS, KEYS_USER_ACHIEVEMENTS } from "../keys";

export const useDeleteAchievement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAchievement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS_ACHIEVEMENTS.list] });
      queryClient.invalidateQueries({
        queryKey: [KEYS_USER_ACHIEVEMENTS.list],
      });
      toast.success("Ачивка удалена");
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.detail ?? "Не удалось удалить ачивку";

      toast.error(typeof msg === "string" ? msg : "Не удалось удалить ачивку");
    },
  });
};
