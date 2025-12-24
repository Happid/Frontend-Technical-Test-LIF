import { create } from "zustand";

interface User {
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  username: string | null;
  login: (token: string, email: string, username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),

  login: (token, email, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    set({ token, user: { email } });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    set({ token: null, user: null });
  },
}));
