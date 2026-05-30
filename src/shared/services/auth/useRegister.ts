import { useMutation } from "@tanstack/react-query";

import { register } from "@/shared/api/auth/register";

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};
