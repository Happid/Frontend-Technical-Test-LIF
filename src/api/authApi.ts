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

export const loginApi = (data: LoginRequest) => {
  return api.post("/api/auth/login", data);
};

export const registerApi = (data: RegisterRequest) => {
  return api.post("/api/auth/register", data);
};
