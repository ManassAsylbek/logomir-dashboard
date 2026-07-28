import { useQuery } from "@tanstack/react-query";

import { KEYS_PRESENTATIONS } from "../keys";

import { getPresentations } from "@/shared/api/presentations/getPresentations";

export const usePresentations = (page: number = 1) => {
  return useQuery({
    queryKey: [KEYS_PRESENTATIONS.presentations, page],
    queryFn: async () => {
      const response = await getPresentations(page);

      return response.data;
    },
  });
};
