import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteUserAchievement } from "@/shared/api/achievements/deleteUserAchievement";

import { KEYS_USER_ACHIEVEMENTS } from "../keys";

export const useDeleteUserAchievement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUserAchievement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS_USER_ACHIEVEMENTS.list],
      });
      toast.success("Ачивка снята");
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.detail ?? "Не удалось снять ачивку";

      toast.error(typeof msg === "string" ? msg : "Не удалось снять ачивку");
    },
  });
};
