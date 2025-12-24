import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { validateOtp } from "@/shared/api/auth/validate-otp";

export const useValidateOtp = () => {
  return useMutation({
    mutationFn: validateOtp,
    onSuccess: () => {
      toast.success("OTP код подтвержден");
    },
    onError: () => {
      toast.error("Неверный OTP код");
    },
  });
};
