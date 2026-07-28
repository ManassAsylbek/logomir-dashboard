import { useQuery } from "@tanstack/react-query";

import { getAchievements } from "@/shared/api/achievements/getAchievements";
import { AchievementsListParams } from "@/shared/api/achievements/types";
import { unwrapList } from "@/shared/helpers/unwrapList";

import { KEYS_ACHIEVEMENTS } from "../keys";

export const useAchievements = (params: AchievementsListParams = {}) => {
  return useQuery({
    queryKey: [KEYS_ACHIEVEMENTS.list, params],
    queryFn: async () => {
      const response = await getAchievements(params);

      return unwrapList(response.data);
    },
  });
};
