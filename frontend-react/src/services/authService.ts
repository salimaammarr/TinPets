import axios, { AxiosError } from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5002/api";

// Configure axios defaults
axios.defaults.withCredentials = true;

export interface AuthResponse {
  token: string;
  userId: string;
  username: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData extends LoginData {}

export interface ApiError {
  message: string;
}

const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/users/login`,
        data
      );
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        throw new Error(
          axiosError.response?.data?.message || "Failed to login"
        );
      }
      throw error;
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/users/register`,
        data
      );
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        throw new Error(
          axiosError.response?.data?.message || "Failed to register"
        );
      }
      throw error;
    }
  },

  logout(): void {
    localStorage.removeItem("user");
  },

  getCurrentUser(): AuthResponse | null {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        localStorage.removeItem("user");
        return null;
      }
    }
    return null;
  },

  getAuthHeader(): { Authorization: string } | {} {
    const user = this.getCurrentUser();
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  },
};

export default authService;
