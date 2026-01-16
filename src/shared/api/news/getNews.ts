import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { NewsListResponse } from "./types";

export const getNews = (
  page: number = 1
): Promise<AxiosResponse<NewsListResponse>> => {
  return requester.get<NewsListResponse>(`/mobile/news/`, {
    params: { page },
  });
};
