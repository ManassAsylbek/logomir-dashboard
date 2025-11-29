import axios from "axios";

import { API_BASE_URL } from "@/shared/config/api";

const requester = axios.create({
  baseURL: API_BASE_URL,
});

console.log(API_BASE_URL);

const getAccessToken = () => localStorage.getItem("access_token");

export const setAccessToken = (token: string | null) => {
  if (token) localStorage.setItem("access_token", token);
  else localStorage.removeItem("access_token");
};

requester.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

requester.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      setAccessToken(null);
    }

    return Promise.reject(error);
  }
);

export { requester };
