import { AxiosResponse } from "axios";

import { requester } from "../axios";

export interface GoogleOauthStartResponse {
  authorization_url?: string;
  url?: string;
  redirect_url?: string;
}

export const startGoogleOauth = (): Promise<
  AxiosResponse<GoogleOauthStartResponse | string>
> => {
  return requester.get(`/activity/google/oauth2/start/`);
};
