import { create } from "zustand";

interface User {
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (token: string, email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),

  login: (token, email) => {
    localStorage.setItem("token", token);
    set({ token, user: { email } });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },
}));
