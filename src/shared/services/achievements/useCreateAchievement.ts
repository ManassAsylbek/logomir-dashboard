import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createAchievement } from "@/shared/api/achievements/createAchievement";
import {
  Achievement,
  AchievementFormPayload,
} from "@/shared/api/achievements/types";

import { KEYS_ACHIEVEMENTS } from "../keys";

export const useCreateAchievement = () => {
  const queryClient = useQueryClient();

  return useMutation<Achievement, any, AchievementFormPayload>({
    mutationFn: async (data) => {
      const response = await createAchievement(data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS_ACHIEVEMENTS.list] });
      toast.success("Ачивка создана");
    },
    onError: (error: any) => {
      const data = error?.response?.data;
      const msg =
        data?.detail ??
        data?.non_field_errors?.[0] ??
        "Ошибка при создании ачивки";

      toast.error(typeof msg === "string" ? msg : "Ошибка при создании ачивки");
    },
  });
};
