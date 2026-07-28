import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createUserAchievement } from "@/shared/api/achievements/createUserAchievement";
import {
  CreateUserAchievementRequest,
  UserAchievement,
} from "@/shared/api/achievements/types";

import { KEYS_USER_ACHIEVEMENTS } from "../keys";

export const useCreateUserAchievement = () => {
  const queryClient = useQueryClient();

  return useMutation<UserAchievement, any, CreateUserAchievementRequest>({
    mutationFn: async (data) => {
      const response = await createUserAchievement(data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS_USER_ACHIEVEMENTS.list],
      });
      toast.success("Ачивка выдана");
    },
    onError: (error: any) => {
      const data = error?.response?.data;
      const msg =
        data?.non_field_errors?.[0] ??
        data?.detail ??
        "Не удалось выдать ачивку";

      toast.error(typeof msg === "string" ? msg : "Не удалось выдать ачивку");
    },
  });
};
