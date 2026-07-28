import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { BulkCreateLessonsRequest, BulkCreateLessonsResponse } from "./types";

export const createLessonsBulk = (
  data: BulkCreateLessonsRequest,
): Promise<AxiosResponse<BulkCreateLessonsResponse>> => {
  return requester.post<BulkCreateLessonsResponse>(
    `/activity/lessons/bulk/`,
    data,
  );
};
