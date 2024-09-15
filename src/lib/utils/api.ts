import axios from "axios";
import { getSession, useSession } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use(
//   async (config) => {
//     const session = await getSession();

//     if (session && session.accessToken) {
//       config.headers.Authorization = `Bearer ${session.accessToken}`;
//     }

//     return config;
//   },
//   (error) => {
//     console.error("Request error:", error);
//     return Promise.reject(error);
//   },
// );

export const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default api;
