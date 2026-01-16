import { useQuery } from "@tanstack/react-query";

import { KEYS_PAYMENTS } from "../keys";
import { getPayment } from "@/shared/api/payments/getPayment";

export const usePayment = (id: number) => {
  return useQuery({
    queryKey: [KEYS_PAYMENTS.payment(String(id))],
    queryFn: () => getPayment(id).then((res) => res.data),
    enabled: !!id,
  });
};
