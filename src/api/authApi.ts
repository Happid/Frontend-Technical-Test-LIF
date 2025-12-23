import api from "./axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export const loginApi = async (
  payload: LoginRequest,
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/api/auth/login", payload);
  return data;
};

export const registerApi = async (payload: RegisterRequest): Promise<void> => {
  await api.post("/api/auth/register", payload);
};
