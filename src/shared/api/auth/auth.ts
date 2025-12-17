import { AxiosResponse } from "axios";
import { requester } from "../axios";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  refresh: string;
  access: string;
}

// Login against the API. The project config should set
// VITE_PUBLIC_API_BASE_URL to something like "http://31.3.216.168:8000/api"
// so the final call will be POST {base}/accounts/login/
export const auth = (
  data: LoginRequest
): Promise<AxiosResponse<LoginResponse>> => {
  return requester.post<LoginResponse>(`/accounts/login/`, {
    username: data.username,
    password: data.password,
  });
};
