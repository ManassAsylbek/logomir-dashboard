import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGame } from "@/shared/api/games/updateGame";
import { UpdateGameRequest } from "@/shared/api/games/types";
import { KEYS_GAMES } from "../keys";
import { toast } from "react-hot-toast";

export const useUpdateGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateGameRequest;
    }) => {
      const response = await updateGame(id, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [KEYS_GAMES.games] });
      queryClient.invalidateQueries({
        queryKey: [KEYS_GAMES.game(variables.id)],
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
