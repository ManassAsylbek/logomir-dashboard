import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { Game } from "./types";

export const getGame = (id: number): Promise<AxiosResponse<Game>> => {
  return requester.get<Game>(`/web-admin/games/${id}/`);
};
