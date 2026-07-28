import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { News, CreateNewsRequest } from "./types";

export const createNews = (
  data: CreateNewsRequest,
): Promise<AxiosResponse<News>> => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("decription", data.decription);
  if (data.link) {
    formData.append("link", data.link);
  }
  if (data.image) {
    formData.append("image", data.image);
  }

  return requester.post<News>(`/mobile/news/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
