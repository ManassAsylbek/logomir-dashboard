import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { UserRegisterRequest, UserRegisterResponse } from "./types";

export const register = (
  data: UserRegisterRequest,
): Promise<AxiosResponse<UserRegisterResponse>> => {
  return requester.post<UserRegisterResponse>("/accounts/register/", data);
};
