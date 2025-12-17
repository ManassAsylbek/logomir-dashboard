import { useQuery } from "@tanstack/react-query";

import { getMe, UserProfile } from "@/shared/api/auth/me";
import { KEYS_USER } from "@/shared/services/keys";
import { getAccessToken } from "@/shared/api/axios";

export const useUser = () => {
  const token = getAccessToken();

  return useQuery<UserProfile>({
    queryKey: [KEYS_USER.user],
    queryFn: async () => {
      const res = await getMe();

      return res.data;
    },
    enabled: Boolean(token),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useUser;
