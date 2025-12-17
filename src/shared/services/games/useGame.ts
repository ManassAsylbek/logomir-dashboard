import { useQuery } from "@tanstack/react-query";

import { KEYS_GAMES } from "../keys";
import { getGame } from "@/shared/api/games/getGame";

export const useGame = (id: number) => {
  return useQuery({
    queryKey: [KEYS_GAMES.game(id)],
    queryFn: async () => {
      const response = await getGame(id);

      return response.data;
    },
    enabled: !!id,
  });
};
