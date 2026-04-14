import { useQuery } from "@tanstack/react-query";

import { getLessons } from "../../api/lessons/getLessons";
import { KEYS_LESSONS } from "../keys";

export const useLessons = (page = 1) => {
  return useQuery({
    queryKey: [KEYS_LESSONS.lessons, page],
    queryFn: async () => {
      const response = await getLessons(page);

      return response.data;
    },
  });
};
