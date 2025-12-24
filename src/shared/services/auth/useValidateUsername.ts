import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { validateUsername } from "@/shared/api/auth/validate-username";

export const useValidateUsername = () => {
  return useMutation({
    mutationFn: validateUsername,
    onSuccess: () => {
      toast.success("OTP код отправлен на ваш номер");
    },
    onError: () => {
      toast.error("Ошибка при отправке OTP кода");
    },
  });
};
