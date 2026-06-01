import { AxiosResponse } from "axios";

import { requester } from "../axios";

export const deleteAchievement = (
  id: number,
): Promise<AxiosResponse<void>> => {
  return requester.delete<void>(`/activity/achievements/${id}/`);
};
