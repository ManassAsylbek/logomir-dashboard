import { useQuery } from "@tanstack/react-query";

import { getBranches } from "@/shared/api/branches/getBranches";

import { KEYS_BRANCHES } from "../keys";

export const useBranches = (page?: number) => {
  return useQuery({
    queryKey: [KEYS_BRANCHES.branches, page],
    queryFn: async () => {
      const response = await getBranches(page);

      return response.data;
    },
  });
};
