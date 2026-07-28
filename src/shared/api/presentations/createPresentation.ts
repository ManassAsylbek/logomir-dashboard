import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { Presentation, CreatePresentationRequest } from "./types";

export const createPresentation = (
  data: CreatePresentationRequest,
): Promise<AxiosResponse<Presentation>> => {
  const formData = new FormData();

  if (data.name) formData.append("name", data.name);
  if (data.description) formData.append("description", data.description);
  if (data.link) formData.append("link", data.link);
  if (data.file) formData.append("file", data.file);

  return requester.post<Presentation>(`/mobile/presentations/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
