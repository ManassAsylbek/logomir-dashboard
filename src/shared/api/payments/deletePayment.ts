import { AxiosResponse } from "axios";

import { requester } from "../axios";

export const deletePayment = (id: number): Promise<AxiosResponse<void>> => {
  return requester.delete<void>(`/mobile/payments/${id}/`);
};
