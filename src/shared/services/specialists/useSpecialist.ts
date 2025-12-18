import { useQuery } from "@tanstack/react-query";

import { KEYS_SPECIALISTS } from "../keys";
import { getSpecialist } from "@/shared/api/specialists/getSpecialist";

export const useSpecialist = (id: number) => {
  return useQuery({
    queryKey: [KEYS_SPECIALISTS.specialist(id)],
    queryFn: async () => {
      const response = await getSpecialist(id);

      return response.data;
    },
    enabled: !!id,
  });
};
