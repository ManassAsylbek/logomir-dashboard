import { useMutation } from "@tanstack/react-query";

import { createConsultation } from "@/shared/api/consultations/createConsultation";
import {
  ConsultationRequest,
  CreateConsultationRequest,
} from "@/shared/api/consultations/types";

/**
 * Public mutation — used on the landing wizard. No cache invalidation
 * here (the landing isn't logged in and doesn't show the CRM list).
 */
export const useCreateConsultation = () => {
  return useMutation<ConsultationRequest, any, CreateConsultationRequest>({
    mutationFn: async (data) => {
      const response = await createConsultation(data);

      return response.data;
    },
  });
};
