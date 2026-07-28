import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { Lesson, CreateLessonRequest } from "./types";

export const createLesson = (
  data: CreateLessonRequest,
): Promise<AxiosResponse<Lesson>> => {
  return requester.post<Lesson>(`/activity/lessons/`, data);
};
