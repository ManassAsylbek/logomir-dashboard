import { useQuery } from "@tanstack/react-query";

import { getConsultations } from "@/shared/api/consultations/getConsultations";
import { ConsultationsListParams } from "@/shared/api/consultations/types";

import { KEYS_CONSULTATIONS } from "../keys";

export const useConsultations = (params: ConsultationsListParams = {}) => {
  return useQuery({
    queryKey: [KEYS_CONSULTATIONS.list, params],
    queryFn: async () => {
      const response = await getConsultations(params);

      return response.data;
    },
  });
};
