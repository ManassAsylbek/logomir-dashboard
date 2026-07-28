import { useQuery } from "@tanstack/react-query";

import { getTariffs } from "@/shared/api/tariffs/getTariffs";
import { unwrapList } from "@/shared/helpers/unwrapList";

import { KEYS_TARIFFS } from "../keys";

export const useTariffs = () => {
  return useQuery({
    queryKey: [KEYS_TARIFFS.tariffs],
    queryFn: async () => {
      const response = await getTariffs();

      return unwrapList(response.data);
    },
  });
};
