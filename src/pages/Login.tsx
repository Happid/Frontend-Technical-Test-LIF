import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { loginApi, type LoginRequest } from "../api/authApi";
import { useAuthStore } from "../store/authStore.ts";

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [form, setForm] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("masuk 1");
      const res = await loginApi(form);
      const token = res.data.token;
      login(token, form.email);
      toast.success("Login successful");
      navigate("/todos");
    } catch (err) {
      console.log("masuk 2");
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Login failed");
      } else {
        toast.error("Unexpected error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        name="email"
        placeholder="email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="password"
        value={form.password}
        onChange={handleChange}
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
