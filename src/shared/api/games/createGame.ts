import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { Game, CreateGameRequest } from "./types";

export const createGame = (
  data: CreateGameRequest | FormData,
): Promise<AxiosResponse<Game>> => {
  if (data instanceof FormData) {
    return requester.post<Game>(`/web-admin/games/`, data);
  }

  return requester.post<Game>(`/web-admin/games/`, data, {
    headers: { "Content-Type": "application/json" },
  });
};
