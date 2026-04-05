import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { Presentation } from "./types";

export const getPresentationItem = (
  id: number,
): Promise<AxiosResponse<Presentation>> => {
  return requester.get<Presentation>(`/mobile/presentations/${id}/`);
};
