import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token"),

  login: (token: string, email: string) => {
    localStorage.setItem("token", token);
    set({ token, user: { email } });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },
}));
