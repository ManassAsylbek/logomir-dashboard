import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { LessonsListResponse } from "./types";

export const getLessons = (
  page = 1,
): Promise<AxiosResponse<LessonsListResponse>> => {
  return requester.get<LessonsListResponse>(`/activity/lessons/`, {
    params: { page },
  });
};
