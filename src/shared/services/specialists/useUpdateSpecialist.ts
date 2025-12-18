import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSpecialist } from "@/shared/api/specialists/updateSpecialist";
import { UpdateSpecialistRequest } from "@/shared/api/specialists/types";
import { KEYS_SPECIALISTS } from "../keys";
import { toast } from "react-hot-toast";

export const useUpdateSpecialist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateSpecialistRequest;
    }) => {
      const response = await updateSpecialist(id, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS_SPECIALISTS.specialists],
      });
      queryClient.invalidateQueries({
        queryKey: [KEYS_SPECIALISTS.specialist(variables.id)],
      });
      toast.success("Специалист успешно обновлен");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.detail || "Ошибка при обновлении специалиста";
      toast.error(message);
    },
  });
};
