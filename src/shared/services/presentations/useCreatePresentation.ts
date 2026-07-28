import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { KEYS_PRESENTATIONS } from "../keys";

import { createPresentation } from "@/shared/api/presentations/createPresentation";
import { CreatePresentationRequest } from "@/shared/api/presentations/types";

export const useCreatePresentation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePresentationRequest) => {
      const response = await createPresentation(data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS_PRESENTATIONS.presentations],
      });
      toast.success("Презентация успешно создана");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.detail || "Ошибка при создании презентации";

      toast.error(message);
    },
  });
};
