import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { ValidateUsernameRequest } from "./types";

export const validateUsername = (
  data: ValidateUsernameRequest
): Promise<AxiosResponse<{ message: string }>> => {
  return requester.post("/accounts/validate-username/", data);
};
