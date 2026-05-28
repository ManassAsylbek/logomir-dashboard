import { useQuery } from "@tanstack/react-query";

import { getLessons } from "../../api/lessons/getLessons";
import { LessonsListParams } from "../../api/lessons/types";
import { KEYS_LESSONS } from "../keys";

export const useLessons = (params: LessonsListParams | number = {}) => {
  const normalized: LessonsListParams =
    typeof params === "number" ? { page: params } : params;

  return useQuery({
    queryKey: [KEYS_LESSONS.lessons, normalized],
    queryFn: async () => {
      const response = await getLessons(normalized);

      return response.data;
    },
  });
};
