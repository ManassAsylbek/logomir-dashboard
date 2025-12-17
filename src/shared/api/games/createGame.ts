import { AxiosResponse } from "axios";
import { requester } from "../axios";
import { Game, CreateGameRequest } from "./types";

export const createGame = (
  data: CreateGameRequest
): Promise<AxiosResponse<Game>> => {
  return requester.post<Game>(`/web-admin/games/`, data);
};
