import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGame } from "@/shared/api/games/deleteGame";
import { KEYS_GAMES } from "../keys";
import { toast } from "react-hot-toast";

export const useDeleteGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await deleteGame(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS_GAMES.games] });
      toast.success("Игра успешно удалена");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.detail || "Ошибка при удалении игры";
      toast.error(message);
    },
  });
};
