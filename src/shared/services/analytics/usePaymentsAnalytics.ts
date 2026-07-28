import { useQuery } from "@tanstack/react-query";

import { getPaymentsAnalytics } from "@/shared/api/analytics/getPaymentsAnalytics";
import { AnalyticsParams } from "@/shared/api/analytics/types";

import { KEYS_ANALYTICS } from "../keys";

export const usePaymentsAnalytics = (params: AnalyticsParams = {}) => {
  return useQuery({
    queryKey: [KEYS_ANALYTICS.payments, params],
    queryFn: async () => {
      const response = await getPaymentsAnalytics(params);

      return response.data;
    },
  });
};
