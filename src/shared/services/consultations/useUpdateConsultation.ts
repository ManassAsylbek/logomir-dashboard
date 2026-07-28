import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateConsultation } from "@/shared/api/consultations/updateConsultation";
import {
  ConsultationRequest,
  UpdateConsultationRequest,
} from "@/shared/api/consultations/types";

import { KEYS_CONSULTATIONS } from "../keys";

interface Variables extends UpdateConsultationRequest {
  id: number;
}

export const useUpdateConsultation = () => {
  const queryClient = useQueryClient();

  return useMutation<ConsultationRequest, any, Variables>({
    mutationFn: async ({ id, ...data }) => {
      const response = await updateConsultation(id, data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS_CONSULTATIONS.list] });
    },
    onError: (error: any) => {
      const data = error?.response?.data;
      const msg =
        data?.non_field_errors?.[0] ??
        data?.detail ??
        data?.scheduled_datetime ??
        data?.specialist ??
        "Не удалось обновить заявку";

      toast.error(typeof msg === "string" ? msg : "Не удалось обновить заявку");
    },
  });
};
