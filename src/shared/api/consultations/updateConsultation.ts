import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { ConsultationRequest, UpdateConsultationRequest } from "./types";

export const updateConsultation = (
  id: number,
  data: UpdateConsultationRequest,
): Promise<AxiosResponse<ConsultationRequest>> => {
  return requester.patch<ConsultationRequest>(
    `/web-admin/consultation-requests/${id}/`,
    data,
  );
};
