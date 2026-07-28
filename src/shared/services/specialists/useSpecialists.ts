import { useQuery } from "@tanstack/react-query";

import {
  getSpecialists,
  SpecialistsListParams,
} from "@/shared/api/specialists/getSpecialists";

import { KEYS_SPECIALISTS } from "../keys";

export const useSpecialists = (
  params: SpecialistsListParams | number = {},
) => {
  const normalized: SpecialistsListParams =
    typeof params === "number" ? { page: params } : params;

  return useQuery({
    queryKey: [KEYS_SPECIALISTS.specialists, normalized],
    queryFn: async () => {
      const response = await getSpecialists(normalized);

      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
