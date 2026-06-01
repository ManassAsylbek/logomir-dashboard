import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { CreateUserAchievementRequest, UserAchievement } from "./types";

export const createUserAchievement = (
  data: CreateUserAchievementRequest,
): Promise<AxiosResponse<UserAchievement>> => {
  return requester.post<UserAchievement>(
    `/activity/user-achievements/`,
    data,
  );
};
