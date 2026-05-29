import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createUserTariff } from "@/shared/api/userTariffs/createUserTariff";
import {
  CreateUserTariffRequest,
  UserTariff,
} from "@/shared/api/userTariffs/types";

import { KEYS_USER_TARIFFS } from "../keys";

export const useCreateUserTariff = () => {
  const queryClient = useQueryClient();

  return useMutation<UserTariff, any, CreateUserTariffRequest>({
    mutationFn: async (data) => {
      const response = await createUserTariff(data);

      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS_USER_TARIFFS.list, variables.user],
      });
      toast.success("Тариф выдан");
    },
    onError: (error: any) => {
      const data = error?.response?.data;
      const msg =
        data?.detail ??
        data?.non_field_errors?.[0] ??
        "Ошибка при выдаче тарифа";

      toast.error(typeof msg === "string" ? msg : "Ошибка при выдаче тарифа");
    },
  });
};
