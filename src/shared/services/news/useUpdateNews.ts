import { useMutation, useQueryClient } from "@tanstack/react-query";

import { KEYS_NEWS } from "../keys";
import { updateNews } from "@/shared/api/news/updateNews";
import { UpdateNewsRequest } from "@/shared/api/news/types";
import { toast } from "react-hot-toast";

export const useUpdateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateNewsRequest;
    }) => {
      const response = await updateNews(id, data);

      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [KEYS_NEWS.news] });
      queryClient.invalidateQueries({
        queryKey: [KEYS_NEWS.newsItem(String(variables.id))],
      });
      toast.success("Новость успешно обновлена");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.detail || "Ошибка при обновлении новости";

      toast.error(message);
    },
  });
};
