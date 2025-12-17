import { useQuery } from "@tanstack/react-query";

import { KEYS_GAMES } from "../keys";
import { getGames } from "@/shared/api/games/getGames";

export const useGames = (page?: number) => {
  return useQuery({
    queryKey: [KEYS_GAMES.games, page],
    queryFn: async () => {
      const response = await getGames(page);

      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
