import { useMutation } from "@tanstack/react-query";

import { validateUsername } from "@/shared/api/auth/validate-username";

export const useValidateUsername = () => {
  return useMutation({
    mutationFn: validateUsername,
  });
};
