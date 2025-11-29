import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { KEYS_AUTH } from "../keys";

import { auth } from "@/shared/api/auth/auth";
import { formatDjangoError } from "@/shared/helpers/formatDjangoError";
import { setAccessToken } from "@/shared/api/axios";
import { getRouteMain } from "@/shared/const/router";

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      try {
        const response = await auth(data);

        return response.data;
      } catch (error: unknown) {
        console.error("auth error:", error);

        if (isAxiosError(error)) {
          throw new Error(formatDjangoError(error.response?.data));
        }

        throw new Error("Неизвестная ошибка");
      }
    },

    onSuccess: (response) => {
      setAccessToken(response.data.accessToken);
      navigate(`${getRouteMain()}`);
      toast.success("Вы успешно вошли в систему");
      queryClient.invalidateQueries({
        queryKey: [KEYS_AUTH.auth],
      });
    },

    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Произошла неизвестная ошибка");
      }
    },
  });
};
