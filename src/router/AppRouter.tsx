import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/Login.tsx";
import TodoPage from "../pages/Todo.tsx";
import { useAuthStore } from "../store/authStore.ts";
import Register from "../pages/Register.tsx";

export const AppRouter = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/todos" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/todos" /> : <Register />}
        />
        <Route
          path="/todos"
          element={token ? <TodoPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};
