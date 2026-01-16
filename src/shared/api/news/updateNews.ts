import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { News, UpdateNewsRequest } from "./types";

export const updateNews = (
  id: number,
  data: UpdateNewsRequest
): Promise<AxiosResponse<News>> => {
  const formData = new FormData();

  if (data.title) formData.append("title", data.title);
  if (data.description) formData.append("description", data.description);
  if (data.image) formData.append("image", data.image);

  return requester.patch<News>(`/mobile/news/${id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
