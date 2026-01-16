import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { Payment } from "./types";

export const getPayment = (id: number): Promise<AxiosResponse<Payment>> => {
  return requester.get<Payment>(`/mobile/payments/${id}/`);
};
