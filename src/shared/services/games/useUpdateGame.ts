import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { KEYS_GAMES } from "../keys";

import { updateGame } from "@/shared/api/games/updateGame";
import { Game } from "@/shared/api/games/types";

type UpdateGamePayload = { id: string; formData: FormData };

export const useUpdateGame = () => {
  const queryClient = useQueryClient();

  return useMutation<Game, unknown, UpdateGamePayload>({
    mutationFn: async ({ id, formData }) => {
      const response = await updateGame(id, formData);

      return response.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [KEYS_GAMES.games] });
      queryClient.invalidateQueries({
        queryKey: [KEYS_GAMES.game(id)],
      });
      toast.success("Игра успешно обновлена");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.detail || "Ошибка при обновлении игры";

      toast.error(message);
    },
  });
};
