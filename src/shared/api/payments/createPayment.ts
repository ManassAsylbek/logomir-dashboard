import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { CreatePaymentRequest, Payment } from "./types";

export const createPayment = (
  data: CreatePaymentRequest,
): Promise<AxiosResponse<Payment>> => {
  return requester.post<Payment>(`/mobile/payments/`, data);
};
