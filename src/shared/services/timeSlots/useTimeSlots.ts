import { useQuery } from "@tanstack/react-query";

import { getTimeSlots } from "@/shared/api/timeSlots/getTimeSlots";
import { TimeSlotsListParams } from "@/shared/api/timeSlots/types";

import { KEYS_TIME_SLOTS } from "../keys";

export const useTimeSlots = (
  params: TimeSlotsListParams = {},
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: [KEYS_TIME_SLOTS.timeSlots, params],
    enabled,
    queryFn: async () => {
      const response = await getTimeSlots(params);

      return response.data;
    },
  });
};
