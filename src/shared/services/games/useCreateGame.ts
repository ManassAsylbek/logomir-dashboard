import { useMutation, useQueryClient } from "@tanstack/react-query";

import { KEYS_GAMES } from "../keys";
import { createGame } from "@/shared/api/games/createGame";
import { CreateGameRequest } from "@/shared/api/games/types";
import { toast } from "react-hot-toast";

export const useCreateGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateGameRequest) => {
      const response = await createGame(data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS_GAMES.games] });
      toast.success("Игра успешно создана");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.detail || "Ошибка при создании игры";

      toast.error(message);
    },
  });
};
