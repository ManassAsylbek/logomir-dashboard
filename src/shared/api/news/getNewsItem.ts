import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { News } from "./types";

export const getNewsItem = (id: number): Promise<AxiosResponse<News>> => {
  return requester.get<News>(`/mobile/news/${id}/`);
};
