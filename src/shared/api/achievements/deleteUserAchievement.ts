import { AxiosResponse } from "axios";

import { requester } from "../axios";

export const deleteUserAchievement = (
  id: number,
): Promise<AxiosResponse<void>> => {
  return requester.delete<void>(`/activity/user-achievements/${id}/`);
};
