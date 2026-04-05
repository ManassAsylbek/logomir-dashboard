import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { PresentationListResponse } from "./types";

export const getPresentations = (
  page: number = 1,
): Promise<AxiosResponse<PresentationListResponse>> => {
  return requester.get<PresentationListResponse>(`/mobile/presentations/`, {
    params: { page },
  });
};
