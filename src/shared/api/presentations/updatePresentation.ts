import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { Presentation, UpdatePresentationRequest } from "./types";

// PATCH — частичное обновление
export const updatePresentation = (
  id: number,
  data: UpdatePresentationRequest,
): Promise<AxiosResponse<Presentation>> => {
  const formData = new FormData();

  if (data.name) formData.append("name", data.name);
  if (data.description) formData.append("description", data.description);
  if (data.link) formData.append("link", data.link);
  if (data.file) formData.append("file", data.file);

  return requester.patch<Presentation>(
    `/mobile/presentations/${id}/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

// PUT — полное обновление
export const replacePresentation = (
  id: number,
  data: Required<Omit<UpdatePresentationRequest, "file">> & {
    file?: File | null;
  },
): Promise<AxiosResponse<Presentation>> => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("link", data.link);
  if (data.file) formData.append("file", data.file);

  return requester.put<Presentation>(`/mobile/presentations/${id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
