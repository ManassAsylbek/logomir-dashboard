import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { PaymentListResponse } from "./types";

export const getPayments = (
  page: number = 1
): Promise<AxiosResponse<PaymentListResponse>> => {
  return requester.get<PaymentListResponse>(`/mobile/payments/`, {
    params: { page },
  });
};
