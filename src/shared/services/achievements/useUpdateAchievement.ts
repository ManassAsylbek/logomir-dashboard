import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateAchievement } from "@/shared/api/achievements/updateAchievement";
import {
  Achievement,
  AchievementFormPayload,
} from "@/shared/api/achievements/types";

import { KEYS_ACHIEVEMENTS } from "../keys";

interface Variables extends Partial<AchievementFormPayload> {
  id: number;
}

export const useUpdateAchievement = () => {
  const queryClient = useQueryClient();

  return useMutation<Achievement, any, Variables>({
    mutationFn: async ({ id, ...data }) => {
      const response = await updateAchievement(id, data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS_ACHIEVEMENTS.list] });
      toast.success("Ачивка обновлена");
    },
    onError: (error: any) => {
      const data = error?.response?.data;
      const msg = data?.detail ?? "Ошибка при обновлении ачивки";

      toast.error(typeof msg === "string" ? msg : "Ошибка при обновлении ачивки");
    },
  });
};
