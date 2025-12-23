import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { registerApi, type RegisterRequest } from "../api/authApi";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterRequest>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerApi(form);
      toast.success("Register successful");
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Register failed");
      } else {
        toast.error("Unexpected error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        name="username"
        placeholder="username"
        value={form.username}
        onChange={handleChange}
      />

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

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
