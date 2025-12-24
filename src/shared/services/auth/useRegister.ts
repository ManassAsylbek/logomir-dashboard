import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { register } from "@/shared/api/auth/register";

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Регистрация успешна");
    },
    onError: () => {
      toast.error("Ошибка при регистрации");
    },
  });
};
