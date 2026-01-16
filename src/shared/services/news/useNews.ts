import { useQuery } from "@tanstack/react-query";

import { KEYS_NEWS } from "../keys";

import { getNews } from "@/shared/api/news/getNews";

export const useNews = (page: number = 1) => {
  return useQuery({
    queryKey: [KEYS_NEWS.news, page],
    queryFn: async () => {
      const response = await getNews(page);

      return response.data;
    },
  });
};
