import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { Lesson } from "./types";

export const getLesson = (id: number): Promise<AxiosResponse<Lesson>> => {
  return requester.get<Lesson>(`/activity/lessons/${id}/`);
};
