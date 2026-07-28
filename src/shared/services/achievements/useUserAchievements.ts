import { useQuery } from "@tanstack/react-query";

import { getUserAchievements } from "@/shared/api/achievements/getUserAchievements";
import { UserAchievementsListParams } from "@/shared/api/achievements/types";
import { unwrapList } from "@/shared/helpers/unwrapList";

import { KEYS_USER_ACHIEVEMENTS } from "../keys";

export const useUserAchievements = (
  params: UserAchievementsListParams = {},
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: [KEYS_USER_ACHIEVEMENTS.list, params],
    enabled,
    queryFn: async () => {
      const response = await getUserAchievements(params);

      return unwrapList(response.data);
    },
  });
};
