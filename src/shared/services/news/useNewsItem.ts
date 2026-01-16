import { useQuery } from "@tanstack/react-query";

import { KEYS_NEWS } from "../keys";

import { getNewsItem } from "@/shared/api/news/getNewsItem";

export const useNewsItem = (id: number) => {
  return useQuery({
    queryKey: [KEYS_NEWS.newsItem(String(id))],
    queryFn: async () => {
      const response = await getNewsItem(id);

      return response.data;
    },
    enabled: !!id,
  });
};
