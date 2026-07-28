import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { KEYS_PRESENTATIONS } from "../keys";

import { updatePresentation } from "@/shared/api/presentations/updatePresentation";
import { UpdatePresentationRequest } from "@/shared/api/presentations/types";

export const useUpdatePresentation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdatePresentationRequest;
    }) => {
      const response = await updatePresentation(id, data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS_PRESENTATIONS.presentations],
      });
      toast.success("Презентация успешно обновлена");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.detail || "Ошибка при обновлении презентации";

      toast.error(message);
    },
  });
};
