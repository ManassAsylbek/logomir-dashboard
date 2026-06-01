import { AxiosResponse } from "axios";

import { publicRequester } from "../axios";

import { ConsultationRequest, CreateConsultationRequest } from "./types";

/**
 * Public endpoint: anonymous landing visitor submits a consultation
 * request. Must go through publicRequester so no Bearer token leaks
 * if a staff session is open in another tab.
 */
export const createConsultation = (
  data: CreateConsultationRequest,
): Promise<AxiosResponse<ConsultationRequest>> => {
  return publicRequester.post<ConsultationRequest>(
    `/web-admin/consultation-requests/`,
    data,
  );
};
