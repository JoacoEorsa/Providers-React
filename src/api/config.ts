import axios, { type AxiosRequestConfig } from "axios";

const baseURL = `${(import.meta.env.VITE_API_BASE_URL as string) ?? "http://localhost:3000"}/api/`;

const axiosRequestConfig: AxiosRequestConfig = { baseURL };

export const api = axios.create(axiosRequestConfig);
