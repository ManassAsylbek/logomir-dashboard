import { AxiosResponse } from "axios";

import { requester } from "../axios";

import {
  ConsultationsListParams,
  ConsultationsListResponse,
} from "./types";

export const getConsultations = (
  params: ConsultationsListParams = {},
): Promise<AxiosResponse<ConsultationsListResponse>> => {
  const { page = 1, ...rest } = params;

  return requester.get<ConsultationsListResponse>(
    `/web-admin/consultation-requests/`,
    { params: { page, ...rest } },
  );
};
