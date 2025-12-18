import { useMutation, useQueryClient } from "@tanstack/react-query";

import { KEYS_SPECIALISTS } from "../keys";
import { createSpecialist } from "@/shared/api/specialists/createSpecialist";
import { CreateSpecialistRequest } from "@/shared/api/specialists/types";
import { toast } from "react-hot-toast";

export const useCreateSpecialist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateSpecialistRequest) => {
      const response = await createSpecialist(data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS_SPECIALISTS.specialists],
      });
      toast.success("Специалист успешно добавлен");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.detail || "Ошибка при добавлении специалиста";

      toast.error(message);
    },
  });
};
