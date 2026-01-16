import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { KEYS_PAYMENTS } from "../keys";
import { deletePayment } from "@/shared/api/payments/deletePayment";

export const useDeletePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      return deletePayment(id).then(() => {
        return id;
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS_PAYMENTS.payments] });
      toast.success("Платеж успешно удален");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        "Ошибка при удалении платежа";

      toast.error(message);
    },
  });
};
