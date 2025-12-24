import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { ValidateOtpRequest } from "./types";

export const validateOtp = (
  data: ValidateOtpRequest
): Promise<AxiosResponse<{ message: string }>> => {
  return requester.post("/accounts/validate-otp/", data);
};
