import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { Lesson, RescheduleLessonRequest } from "./types";

export const rescheduleLesson = (
  id: number,
  data: RescheduleLessonRequest,
): Promise<AxiosResponse<Lesson>> => {
  return requester.post<Lesson>(`/activity/lessons/${id}/reschedule/`, data);
};
