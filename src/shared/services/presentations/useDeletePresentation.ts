import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { KEYS_PRESENTATIONS } from "../keys";

import { deletePresentation } from "@/shared/api/presentations/deletePresentation";

export const useDeletePresentation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await deletePresentation(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS_PRESENTATIONS.presentations],
      });
      toast.success("Презентация успешно удалена");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.detail || "Ошибка при удалении презентации";

      toast.error(message);
    },
  });
};
