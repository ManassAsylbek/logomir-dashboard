import { useMutation, useQueryClient } from "@tanstack/react-query";

import { confirmPayment } from "@/shared/api/payments/confirmPayment";

import { KEYS_LESSONS, KEYS_TIME_SLOTS, KEYS_USER_TARIFFS } from "../keys";

export const useConfirmPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentId: number) => confirmPayment(paymentId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [KEYS_LESSONS.lessons] });
      queryClient.invalidateQueries({ queryKey: [KEYS_TIME_SLOTS.timeSlots] });
      const userId = response.data.payment.user;

      if (userId != null) {
        queryClient.invalidateQueries({
          queryKey: [KEYS_USER_TARIFFS.list, userId],
        });
      }
    },
  });
};
