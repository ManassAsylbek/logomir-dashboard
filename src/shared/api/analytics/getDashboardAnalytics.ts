import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { AnalyticsParams, DashboardAnalytics } from "./types";

export const getDashboardAnalytics = (
  params: AnalyticsParams = {},
): Promise<AxiosResponse<DashboardAnalytics>> => {
  return requester.get<DashboardAnalytics>(`/web-admin/analytics/`, { params });
};
