import { useQuery } from "@tanstack/react-query";

import { KEYS_PAYMENTS } from "../keys";
import { getPayments } from "@/shared/api/payments/getPayments";

export const usePayments = (page: number = 1) => {
  return useQuery({
    queryKey: [KEYS_PAYMENTS.payments, page],
    queryFn: () => getPayments(page).then((res) => res.data),
  });
};
