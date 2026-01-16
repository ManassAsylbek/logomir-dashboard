import { useMutation, useQueryClient } from "@tanstack/react-query";

import { KEYS_NEWS } from "../keys";
import { deleteNews } from "@/shared/api/news/deleteNews";
import { toast } from "react-hot-toast";

export const useDeleteNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await deleteNews(id);

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS_NEWS.news] });
      toast.success("Новость успешно удалена");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.detail || "Ошибка при удалении новости";

      toast.error(message);
    },
  });
};
