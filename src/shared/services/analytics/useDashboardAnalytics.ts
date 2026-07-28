import { useQuery } from "@tanstack/react-query";

import { getDashboardAnalytics } from "@/shared/api/analytics/getDashboardAnalytics";
import { AnalyticsParams } from "@/shared/api/analytics/types";

import { KEYS_ANALYTICS } from "../keys";

export const useDashboardAnalytics = (params: AnalyticsParams = {}) => {
  return useQuery({
    queryKey: [KEYS_ANALYTICS.dashboard, params],
    queryFn: async () => {
      const response = await getDashboardAnalytics(params);

      return response.data;
    },
  });
};
