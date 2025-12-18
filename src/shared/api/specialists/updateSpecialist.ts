import { AxiosResponse } from "axios";
import { requester } from "../axios";
import { Specialist, UpdateSpecialistRequest } from "./types";

export const updateSpecialist = (
  id: number,
  data: UpdateSpecialistRequest
): Promise<AxiosResponse<Specialist>> => {
  return requester.patch<Specialist>(`/accounts/logoped/${id}/`, data);
};
