import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { KEYS_PAYMENTS } from "../keys";

import { updatePayment } from "@/shared/api/payments/updatePayment";
import { UpdatePaymentRequest } from "@/shared/api/payments/types";

export const useUpdatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePaymentRequest }) => {
      return updatePayment(id, data).then((response) => {
        return response.data;
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS_PAYMENTS.payments] });
      toast.success("Платеж успешно обновлен");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        "Ошибка при обновлении платежа";

      toast.error(message);
    },
  });
};
