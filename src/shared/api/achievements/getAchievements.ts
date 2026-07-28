import { AxiosResponse } from "axios";

import { requester } from "../axios";

import {
  AchievementsListParams,
  AchievementsListResponse,
} from "./types";

export const getAchievements = (
  params: AchievementsListParams = {},
): Promise<AxiosResponse<AchievementsListResponse>> => {
  return requester.get<AchievementsListResponse>(`/activity/achievements/`, {
    params,
  });
};
