import { AxiosResponse } from "axios";

import { requester } from "../axios";

import {
  UserAchievementsListParams,
  UserAchievementsListResponse,
} from "./types";

export const getUserAchievements = (
  params: UserAchievementsListParams = {},
): Promise<AxiosResponse<UserAchievementsListResponse>> => {
  return requester.get<UserAchievementsListResponse>(
    `/activity/user-achievements/`,
    { params },
  );
};
