import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { TimeSlotsListParams, TimeSlotsListResponse } from "./types";

export const getTimeSlots = (
  params: TimeSlotsListParams = {},
): Promise<AxiosResponse<TimeSlotsListResponse>> => {
  return requester.get<TimeSlotsListResponse>(`/accounts/logoped_slot/`, {
    params,
  });
};
