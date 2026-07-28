import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { LessonsListParams, LessonsListResponse } from "./types";

export const getLessons = (
  params: LessonsListParams = {},
): Promise<AxiosResponse<LessonsListResponse>> => {
  const { page = 1, ...rest } = params;
  return requester.get<LessonsListResponse>(`/activity/lessons/`, {
    params: { page, ...rest },
  });
};
