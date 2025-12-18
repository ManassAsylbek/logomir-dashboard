import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { SpecialistsListResponse } from "./types";

export const getSpecialists = (
  page?: number
): Promise<AxiosResponse<SpecialistsListResponse>> => {
  return requester.get<SpecialistsListResponse>(`/accounts/logoped/`, {
    params: { page },
  });
};
