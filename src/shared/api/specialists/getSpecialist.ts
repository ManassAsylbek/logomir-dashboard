import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { Specialist } from "./types";

export const getSpecialist = (
  id: number
): Promise<AxiosResponse<Specialist>> => {
  return requester.get<Specialist>(`/accounts/logoped/${id}/`);
};
