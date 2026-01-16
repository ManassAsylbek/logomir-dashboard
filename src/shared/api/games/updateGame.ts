import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { Game, UpdateGameRequest } from "./types";

export const updateGame = (
  id: string,
  data: UpdateGameRequest
): Promise<AxiosResponse<Game>> => {
  return requester.patch<Game>(`/web-admin/games/${id}/`, data);
};
