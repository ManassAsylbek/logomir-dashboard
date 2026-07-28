import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { ChangeLessonTypeRequest, Lesson } from "./types";

export const changeLessonType = (
  id: number,
  data: ChangeLessonTypeRequest,
): Promise<AxiosResponse<Lesson>> => {
  return requester.post<Lesson>(`/activity/lessons/${id}/change-type/`, data);
};
