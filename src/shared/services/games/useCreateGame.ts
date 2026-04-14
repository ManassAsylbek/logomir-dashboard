import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { KEYS_GAMES } from "../keys";

import { createGame } from "@/shared/api/games/createGame";
import { CreateGameRequest, Game } from "@/shared/api/games/types";

type CreateGamePayload = CreateGameRequest | FormData;

export const useCreateGame = () => {
  const queryClient = useQueryClient();

  return useMutation<Game, unknown, CreateGamePayload>({
    mutationFn: async (data: CreateGamePayload) => {
      const response = await createGame(data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS_GAMES.games] });
      toast.success("Игра успешно создана");
    },
    onError: (error: any) => {
      // Обработка различных типов ошибок
      let message = "Ошибка при создании игры";

      if (error?.response?.data) {
        const errorData = error.response.data;

        // Если есть поле detail
        if (errorData.detail) {
          message =
            typeof errorData.detail === "string"
              ? errorData.detail
              : JSON.stringify(errorData.detail);
        }
        // Если есть ошибки валидации полей
        else if (typeof errorData === "object") {
          const errors = Object.entries(errorData)
            .map(([field, msgs]) => {
              const fieldName =
                field === "name"
                  ? "Название"
                  : field === "theme"
                    ? "Тема"
                    : field === "questions"
                      ? "Вопросы"
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
