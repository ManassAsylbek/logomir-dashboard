import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { Payment, UpdatePaymentRequest } from "./types";

export const updatePayment = (
  id: number,
  data: UpdatePaymentRequest
): Promise<AxiosResponse<Payment>> => {
  const formData = new FormData();

  if (data.status) formData.append("status", data.status);
  if (data.receipt) formData.append("receipt", data.receipt);

  return requester.patch<Payment>(`/mobile/payments/${id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
