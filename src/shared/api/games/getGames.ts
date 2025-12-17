import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { GamesListResponse } from "./types";

export const getGames = (
  page?: number
): Promise<AxiosResponse<GamesListResponse>> => {
  return requester.get<GamesListResponse>(`/web-admin/games/`, {
    params: { page },
  });
};
