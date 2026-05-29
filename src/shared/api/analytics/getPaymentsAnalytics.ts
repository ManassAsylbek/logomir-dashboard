import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { AnalyticsParams, PaymentsAnalytics } from "./types";

export const getPaymentsAnalytics = (
  params: AnalyticsParams = {},
): Promise<AxiosResponse<PaymentsAnalytics>> => {
  return requester.get<PaymentsAnalytics>(`/mobile/payments/analytics/`, {
    params,
  });
};
