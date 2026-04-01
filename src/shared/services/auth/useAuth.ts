import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { KEYS_AUTH } from "../keys";

import { auth, LoginRequest } from "@/shared/api/auth/auth";
import { getMe } from "@/shared/api/auth/me";
import { formatDjangoError } from "@/shared/helpers/formatDjangoError";
import { setAccessToken, setRefreshToken } from "@/shared/api/axios";
import { getRouteMain, getRouteLessons } from "@/shared/const/router";

export const useAuth = (options?: { noRedirect?: boolean }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      try {
        const response = await auth(data);

        return response;
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          throw new Error(formatDjangoError(error.response?.data));
        }

        throw new Error("Неизвестная ошибка");
      }
    },

    onSuccess: async (response) => {
      const { access, refresh } = response.data;

      setAccessToken(access);
      setRefreshToken(refresh);

      // Determine role from /me
      try {
        const me = await getMe();
        const role = me.data.is_child ? "student" : "therapist";

        localStorage.setItem("user_role", role);

        if (!options?.noRedirect) {
          navigate(role === "student" ? getRouteLessons() : getRouteMain());
        }
      } catch {
        if (!options?.noRedirect) {
          navigate(getRouteMain());
        }
      }

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
