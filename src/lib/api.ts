import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const apiClient = axios.create({
  baseURL: API_URL,
});

export const shortenUrl = async (originalUrl: string) => {
  const response = await apiClient.post("/shorten", { originalUrl });
  return response.data;
};

export const getAnalytics = async (code: string) => {
  const response = await apiClient.get(`/analytics/${code}`);
  return response.data;
};

export const getAllUrl = async () => {
  const response = await apiClient.get("/urls");
  return response.data;
};

export const getPaginatedUrls = async (page: number, limit: number) => {
  const response = await apiClient.get(`/all/url?page=${page}&limit=${limit}`);
  return response.data;
};
