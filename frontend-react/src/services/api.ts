import axios from "axios";
import { AuthResponse, User, Pet } from "../types/api";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5002";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const auth = {
  login: (username: string, password: string) =>
    api.post<AuthResponse>("/api/users/login", { username, password }),
  register: (username: string, password: string) =>
    api.post<AuthResponse>("/api/users/register", { username, password }),
  getProfile: () => api.get<User>("/api/users/profile"),
};

export const pets = {
  getAll: () => api.get<Pet[]>("/api/pets"),
  getById: (id: string) => api.get<Pet>(`/api/pets/${id}`),
  create: (petData: Omit<Pet, "_id" | "createdAt" | "owner">) =>
    api.post<Pet>("/api/pets", petData),
  update: (id: string, petData: Partial<Pet>) =>
    api.put<Pet>(`/api/pets/${id}`, petData),
  delete: (id: string) => api.delete(`/api/pets/${id}`),
};

export default api;
