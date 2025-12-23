import { create } from "zustand";
import {
  createTodoApi,
  type CreateTodoRequest,
  deleteTodoApi,
  getTodosApi,
  type Todo,
  updateTodoApi,
  type UpdateTodoRequest,
} from "../api/todoApi.ts";

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;

  fetchTodos: () => Promise<void>;
  addTodo: (payload: CreateTodoRequest) => Promise<void>;
  updateTodo: (id: number, payload: UpdateTodoRequest) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  reset: () => void;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  loading: false,
  error: null,

  fetchTodos: async () => {
    try {
      set({ loading: true, error: null });
      const todos = await getTodosApi();
      set({ todos });
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "Failed to fetch todos" });
    } finally {
      set({ loading: false });
    }
  },

  addTodo: async (payload) => {
    try {
      set({ loading: true, error: null });
      const newTodo = await createTodoApi(payload);
      set({ todos: [...get().todos, newTodo] });
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "Failed to add todo" });
    } finally {
      set({ loading: false });
    }
  },

  updateTodo: async (id, payload) => {
    try {
      set({ loading: true, error: null });
      const updated = await updateTodoApi(id, payload);

      set({
        todos: get().todos.map((todo) => (todo.id === id ? updated : todo)),
      });
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "Failed to update todo" });
    } finally {
      set({ loading: false });
    }
  },

  deleteTodo: async (id) => {
    try {
      set({ loading: true, error: null });
      await deleteTodoApi(id);

      set({
        todos: get().todos.filter((todo) => todo.id !== id),
      });
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "Failed to delete todo" });
    } finally {
      set({ loading: false });
    }
  },

  reset: () => {
    set({ todos: [], loading: false, error: null });
  },
}));
