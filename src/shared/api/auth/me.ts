import { AxiosResponse } from "axios";

import { requester } from "../axios";

export interface Tariff {
  id: number;
  name: string;
  price: number;
  description: string;
  time: "one_time" | string;
  image: string;
  lesson_count: number;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: number;
  username: string;
  full_name: string;
  phone_number: string;
  age: number;
  gender: "Male" | "Female" | string;
  avatar: string;
  is_child: boolean;
  tariff: Tariff;
}

export const getMe = (): Promise<AxiosResponse<UserProfile>> => {
  return requester.get<UserProfile>(`/accounts/me/`);
};
