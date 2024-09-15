import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.token) {
      config.headers["Authorization"] = `Bearer ${session.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default api;
