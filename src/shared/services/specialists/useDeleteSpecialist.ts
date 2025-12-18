import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSpecialist } from "@/shared/api/specialists/deleteSpecialist";
import { KEYS_SPECIALISTS } from "../keys";
import { toast } from "react-hot-toast";

export const useDeleteSpecialist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await deleteSpecialist(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS_SPECIALISTS.specialists],
      });
      toast.success("Специалист успешно удален");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.detail || "Ошибка при удалении специалиста";
      toast.error(message);
    },
  });
};
