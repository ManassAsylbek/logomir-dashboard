import { AxiosResponse } from "axios";
import { requester } from "../axios";
import { UserProfile } from "./me";

export interface UpdateProfileRequest {
  full_name?: string;
  phone_number?: string;
  age?: number;
  gender?: "Male" | "Female";
  avatar?: string;
}

export const updateProfile = (
  data: UpdateProfileRequest
): Promise<AxiosResponse<UserProfile>> => {
  return requester.patch<UserProfile>(`/accounts/me/`, data);
};
