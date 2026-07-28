import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { startGoogleOauth } from "@/shared/api/google/startOauth";

import { KEYS_GOOGLE_OAUTH } from "../keys";

const extractUrl = (data: unknown): string | null => {
  if (!data) return null;
  if (typeof data === "string" && data.startsWith("http")) return data;

  if (typeof data === "object") {
    const obj = data as Record<string, unknown>;
    const candidate =
      obj.authorization_url ?? obj.url ?? obj.redirect_url ?? null;

    if (typeof candidate === "string") return candidate;
  }

  return null;
};

export const useStartGoogleOauth = () => {
  return useMutation({
    mutationKey: [KEYS_GOOGLE_OAUTH.start],
    mutationFn: async () => {
      const response = await startGoogleOauth();
      const url = extractUrl(response.data);

      if (!url) {
        throw new Error("Не удалось получить ссылку для авторизации Google");
      }

      window.location.href = url;

      return url;
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.detail ??
        error?.message ??
        "Ошибка при запуске авторизации Google";

      toast.error(msg);
    },
  });
};
