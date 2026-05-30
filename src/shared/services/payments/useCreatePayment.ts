import { useMutation } from "@tanstack/react-query";

import { createPayment } from "@/shared/api/payments/createPayment";

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: createPayment,
  });
};
