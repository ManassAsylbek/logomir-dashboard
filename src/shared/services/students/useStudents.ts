import { useQuery } from "@tanstack/react-query";

import { KEYS_STUDENTS } from "../keys";

import { getStudents } from "@/shared/api/students/getStudents";

export const useStudents = (page?: number) => {
  return useQuery({
    queryKey: [KEYS_STUDENTS.students, page],
    queryFn: async () => {
      const response = await getStudents(page);

      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
