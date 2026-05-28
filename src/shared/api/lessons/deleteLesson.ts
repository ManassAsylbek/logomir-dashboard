import { AxiosResponse } from "axios";

import { requester } from "../axios";

export const deleteLesson = (id: number): Promise<AxiosResponse<void>> => {
  return requester.delete(`/activity/lessons/${id}/`);
};
