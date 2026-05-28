import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { ChangeLessonBranchRequest, Lesson } from "./types";

export const changeLessonBranch = (
  id: number,
  data: ChangeLessonBranchRequest,
): Promise<AxiosResponse<Lesson>> => {
  return requester.post<Lesson>(`/activity/lessons/${id}/change-branch/`, data);
};
