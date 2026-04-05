import { AxiosResponse } from "axios";

import { requester } from "../axios";

export const deletePresentation = (
  id: number,
): Promise<AxiosResponse<void>> => {
  return requester.delete(`/mobile/presentations/${id}/`);
};
