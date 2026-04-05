import { useQuery } from "@tanstack/react-query";

import { KEYS_PRESENTATIONS } from "../keys";

import { getPresentationItem } from "@/shared/api/presentations/getPresentationItem";

export const usePresentationItem = (id: number) => {
  return useQuery({
    queryKey: [KEYS_PRESENTATIONS.presentation(String(id))],
    queryFn: async () => {
      const response = await getPresentationItem(id);

      return response.data;
    },
    enabled: !!id,
  });
};
