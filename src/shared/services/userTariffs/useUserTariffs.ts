import { useQuery } from "@tanstack/react-query";

import { getUserTariffs } from "@/shared/api/userTariffs/getUserTariffs";
import { unwrapList } from "@/shared/helpers/unwrapList";

import { KEYS_USER_TARIFFS } from "../keys";

export const useUserTariffs = (userId?: number) => {
  return useQuery({
    queryKey: [KEYS_USER_TARIFFS.list, userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const response = await getUserTariffs(userId as number);

      return unwrapList(response.data);
    },
  });
};
