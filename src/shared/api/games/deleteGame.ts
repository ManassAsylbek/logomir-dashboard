import { AxiosResponse } from "axios";

import { requester } from "../axios";

export const deleteGame = (id: string): Promise<AxiosResponse<void>> => {
  return requester.delete(`/web-admin/games/${id}/`);
};
