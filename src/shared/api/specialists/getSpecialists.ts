import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { SpecialistsListResponse } from "./types";

export interface SpecialistsListParams {
  page?: number;
  branch?: number;
}

export const getSpecialists = (
  params: SpecialistsListParams | number = {},
): Promise<AxiosResponse<SpecialistsListResponse>> => {
  const normalized: SpecialistsListParams =
    typeof params === "number" ? { page: params } : params;

  return requester.get<SpecialistsListResponse>(`/accounts/logoped/`, {
    params: normalized,
  });
};
