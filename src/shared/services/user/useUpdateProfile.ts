import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateProfile,
  UpdateProfileRequest,
} from "@/shared/api/auth/updateProfile";
import { KEYS_USER } from "../keys";
import { toast } from "react-hot-toast";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileRequest) => {
      const response = await updateProfile(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS_USER.user] });
      toast.success("Профиль успешно обновлен");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.detail || "Ошибка при обновлении профиля";
      toast.error(message);
    },
  });
};
