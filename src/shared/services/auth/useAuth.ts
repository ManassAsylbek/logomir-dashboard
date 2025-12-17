import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { KEYS_AUTH } from "../keys";

import { auth, LoginRequest } from "@/shared/api/auth/auth";
import { formatDjangoError } from "@/shared/helpers/formatDjangoError";
import { setAccessToken, setRefreshToken } from "@/shared/api/axios";
import { getRouteMain } from "@/shared/const/router";

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      try {
        const response = await auth(data);

        return response; // return full axios response for flexibility
      } catch (error: unknown) {
        console.error("auth error:", error);

        if (isAxiosError(error)) {
          throw new Error(formatDjangoError(error.response?.data));
        }

        throw new Error("Неизвестная ошибка");
      }
    },

    onSuccess: (response) => {
      // Backend returns: { refresh: string, access: string }
      const { access, refresh } = response.data;

      setAccessToken(access);
      setRefreshToken(refresh);

      navigate(getRouteMain());
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
