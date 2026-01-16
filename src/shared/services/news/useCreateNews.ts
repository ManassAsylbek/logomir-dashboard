import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { KEYS_NEWS } from "../keys";

import { createNews } from "@/shared/api/news/createNews";
import { CreateNewsRequest } from "@/shared/api/news/types";

export const useCreateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateNewsRequest) => {
      const response = await createNews(data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS_NEWS.news] });
      toast.success("Новость успешно создана");
    },
    onError: (error: any) => {
      let message = "Ошибка при создании новости";

      if (error?.response?.data) {
        const errorData = error.response.data;

        if (errorData.detail) {
          message =
            typeof errorData.detail === "string"
              ? errorData.detail
              : JSON.stringify(errorData.detail);
        } else if (typeof errorData === "object") {
          const errors = Object.entries(errorData)
            .map(([field, msgs]) => {
              const fieldName =
                field === "title"
                  ? "Заголовок"
                  : field === "description"
                    ? "Описание"
                    : field === "image"
                      ? "Изображение"
                      : field;

              const errorMsg = Array.isArray(msgs) ? msgs.join(", ") : msgs;

              return `${fieldName}: ${errorMsg}`;
            })
            .join("; ");

          if (errors) {
            message = errors;
          }
        }
      } else if (error?.message) {
        message = error.message;
      }

      toast.error(message);
    },
  });
};
