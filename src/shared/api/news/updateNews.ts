import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { News, UpdateNewsRequest } from "./types";

export const updateNews = (
  id: number,
  data: UpdateNewsRequest
): Promise<AxiosResponse<News>> => {
  const formData = new FormData();

  if (data.name) formData.append("name", data.name);
  if (data.decription) formData.append("decription", data.decription);
  if (data.link) formData.append("link", data.link);
  if (data.image) formData.append("image", data.image);

  return requester.patch<News>(`/mobile/news/${id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
