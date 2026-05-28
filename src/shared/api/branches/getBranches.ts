import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { BranchesListResponse } from "./types";

export const getBranches = (
  page?: number,
): Promise<AxiosResponse<BranchesListResponse>> => {
  return requester.get<BranchesListResponse>(`/accounts/branch/`, {
    params: { page },
  });
};
