import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { StudentsListResponse } from "./types";

export const getStudents = (
  page?: number,
): Promise<AxiosResponse<StudentsListResponse>> => {
  return requester.get<StudentsListResponse>(`/accounts/children/`, {
    params: { page },
  });
};
