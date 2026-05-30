import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { ConfirmPaymentResponse } from "./types";

export const confirmPayment = (
  paymentId: number,
): Promise<AxiosResponse<ConfirmPaymentResponse>> => {
  return requester.post<ConfirmPaymentResponse>(
    `/mobile/payments/${paymentId}/confirm/`,
    {},
  );
};
