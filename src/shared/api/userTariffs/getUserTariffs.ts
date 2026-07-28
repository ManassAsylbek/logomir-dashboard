import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { UserTariffsResponse } from "./types";

export const getUserTariffs = (
  userId: number,
): Promise<AxiosResponse<UserTariffsResponse>> => {
  return requester.get<UserTariffsResponse>(`/mobile/user-tariffs/`, {
    params: { user: userId },
  });
};
