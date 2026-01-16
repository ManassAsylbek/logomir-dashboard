import { AxiosResponse } from "axios";

import { requester } from "../axios";

export const deleteNews = (id: number): Promise<AxiosResponse<void>> => {
  return requester.delete(`/mobile/news/${id}/`);
};
