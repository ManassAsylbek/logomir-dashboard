import axios from "axios";

import { API_BASE_URL } from "@/shared/config/api";

const requester = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

console.log(API_BASE_URL);

const getAccessToken = () => localStorage.getItem("access_token");

export const setAccessToken = (token: string | null) => {
  if (token) localStorage.setItem("access_token", token);
  else localStorage.removeItem("access_token");
};

const getRefreshToken = () => localStorage.getItem("refresh_token");

export const setRefreshToken = (token: string | null) => {
  if (token) localStorage.setItem("refresh_token", token);
  else localStorage.removeItem("refresh_token");
};

// Plain axios instance (no interceptors) for refresh token calls
const plain = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

requester.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    (config.headers as any).Authorization = `Bearer ${token}`;
  }

  return config;
});

requester.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;

    if (!originalRequest) return Promise.reject(error);

    const status = error?.response?.status;

    // If 401 and we haven't already retried this request
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Prevent multiple refresh calls
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((newToken) => {
            if (!newToken) return reject(error);
            // retry the original request with new token
            (originalRequest.headers as any).Authorization =
              `Bearer ${newToken}`;
            resolve(requester(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const refresh = getRefreshToken();

        if (!refresh) {
          // no refresh token: clear access and reject
          setAccessToken(null);
          isRefreshing = false;

          return Promise.reject(error);
        }

        // call refresh endpoint
        const refreshResp = await plain.post(`/accounts/refresh/`, {
          refresh,
        });

        const newAccess =
          refreshResp?.data?.access ?? refreshResp?.data?.token ?? null;
        const newRefresh = refreshResp?.data?.refresh ?? null;

        if (newAccess) {
          setAccessToken(newAccess);
        }

        if (newRefresh) {
          setRefreshToken(newRefresh);
        }

        onRefreshed(newAccess);

        // retry original request
        (originalRequest.headers as any).Authorization = `Bearer ${newAccess}`;
        isRefreshing = false;

        return requester(originalRequest);
      } catch (refreshError) {
        // refresh failed => clear tokens and redirect to login
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem("user_role");
        isRefreshing = false;
        // navigate to login
        try {
          // dynamic import to avoid circular deps

          const { getRouteAuth } = require("@/shared/const/router");

          window.location.href = getRouteAuth();
        } catch (e) {
          window.location.href = "/auth";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export { requester };

export { getAccessToken, getRefreshToken };
