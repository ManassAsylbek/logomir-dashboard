import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { TariffsResponse } from "./types";

export const getTariffs = (): Promise<AxiosResponse<TariffsResponse>> => {
  return requester.get<TariffsResponse>(`/mobile/tariffs/`);
};
