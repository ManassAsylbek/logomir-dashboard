import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { CreateUserTariffRequest, UserTariff } from "./types";

export const createUserTariff = (
  data: CreateUserTariffRequest,
): Promise<AxiosResponse<UserTariff>> => {
  return requester.post<UserTariff>(`/mobile/user-tariffs/`, data);
};
