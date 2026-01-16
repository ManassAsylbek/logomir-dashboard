import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { News, CreateNewsRequest } from "./types";

export const createNews = (
  data: CreateNewsRequest
): Promise<AxiosResponse<News>> => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  if (data.image) {
    formData.append("image", data.image);
  }

  return requester.post<News>(`/mobile/news/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
