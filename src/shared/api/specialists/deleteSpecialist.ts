import { AxiosResponse } from "axios";
import { requester } from "../axios";

export const deleteSpecialist = (id: number): Promise<AxiosResponse<void>> => {
  return requester.delete(`/accounts/logoped/${id}/`);
};
