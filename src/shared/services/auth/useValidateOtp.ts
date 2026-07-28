import { useMutation } from "@tanstack/react-query";

import { validateOtp } from "@/shared/api/auth/validate-otp";

export const useValidateOtp = () => {
  return useMutation({
    mutationFn: validateOtp,
  });
};
