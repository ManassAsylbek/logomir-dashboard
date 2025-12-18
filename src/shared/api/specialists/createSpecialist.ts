import { AxiosResponse } from "axios";
import { requester } from "../axios";
import { Specialist, CreateSpecialistRequest } from "./types";

export const createSpecialist = (
  data: CreateSpecialistRequest
): Promise<AxiosResponse<Specialist>> => {
  return requester.post<Specialist>(`/accounts/logoped/`, data);
};
