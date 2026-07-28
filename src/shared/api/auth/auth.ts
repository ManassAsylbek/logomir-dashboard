import { AxiosResponse } from "axios";

import { requester } from "../axios";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  refresh: string;
  access: string;
  id: number;
  role: "student" | "therapist" | string;
}

export const auth = (
  data: LoginRequest,
): Promise<AxiosResponse<LoginResponse>> => {
  return requester.post<LoginResponse>(`/accounts/login/`, {
    username: data.username,
    password: data.password,
  });
};
