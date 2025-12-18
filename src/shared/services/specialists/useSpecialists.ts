import { useQuery } from "@tanstack/react-query";

import { KEYS_SPECIALISTS } from "../keys";
import { getSpecialists } from "@/shared/api/specialists/getSpecialists";

export const useSpecialists = (page?: number) => {
  return useQuery({
    queryKey: [KEYS_SPECIALISTS.specialists, page],
    queryFn: async () => {
      const response = await getSpecialists(page);

      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
